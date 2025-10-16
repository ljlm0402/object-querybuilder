import { QueryBuilderError, ErrorCodes } from './errors/queryBuilderError';
import { ComparisonOperator, SortCriteria, AggregateFunction } from './types';
import { validateSelectList, validateDataSource, validateOperator, validateSortOrder, validateLimit, validateOffset, isNullOrUndefined } from './utils/validators';
import { createComparator, createSortComparator, deepClone } from './utils/comparators';

export class QueryBuilder<T = any> {
    private selectList: (keyof T | '*' | string)[];
    private objectList: T[];
    private limitCount: number | null;
    private offsetCount: number | null;

    constructor() {
        this.selectList = [];
        this.objectList = [];
        this.limitCount = null;
        this.offsetCount = null;
    }

    static create<T = any>(): QueryBuilder<T> {
        return new QueryBuilder<T>();
    }

    select(selectList: (keyof T | '*' | string)[]): this {
        validateSelectList(selectList as string[]);
        this.selectList = selectList;
        return this;
    }

    from(data: T | T[]): this {
        validateDataSource(data);
        this.objectList = Array.isArray(data) ? [...data] : [data];
        return this;
    }

    join<U = any>(data: U[], key: string): this {
        if (!Array.isArray(data)) {
            throw new QueryBuilderError('JOIN clause needs an array of objects!', ErrorCodes.INVALID_JOIN_DATA);
        }
        const lookupMap = new Map<any, U>();
        data.forEach(item => lookupMap.set((item as any)[key], item));
        this.objectList = this.objectList
            .filter(item => lookupMap.has((item as any)[key]))
            .map(item => ({ ...item, ...lookupMap.get((item as any)[key]) } as T));
        return this;
    }

    leftJoin<U = any>(data: U[], key: string): this {
        if (!Array.isArray(data)) {
            throw new QueryBuilderError('LEFT JOIN clause needs an array of objects!', ErrorCodes.INVALID_JOIN_DATA);
        }
        const lookupMap = new Map<any, U>();
        data.forEach(item => lookupMap.set((item as any)[key], item));
        this.objectList = this.objectList.map(item => {
            const joinData = lookupMap.get((item as any)[key]);
            return joinData ? { ...item, ...joinData } as T : item;
        });
        return this;
    }

    where(key: keyof T | string, operator: ComparisonOperator | 'like' | 'in' | 'not in', value: any): this {
        if (!key || !operator || isNullOrUndefined(value)) {
            throw new QueryBuilderError('WHERE clause requires key, operator, and value!', ErrorCodes.INVALID_WHERE_CONDITION);
        }
        if (operator !== 'like' && operator !== 'in' && operator !== 'not in') {
            validateOperator(operator);
        }
        if (typeof value === 'string' && !['=', '!=', 'like'].includes(operator)) {
            throw new QueryBuilderError("String values must use '=', '!=', or 'like' operator!", ErrorCodes.INVALID_OPERATOR);
        }
        const comparator = createComparator(key as string, operator, value);
        this.objectList = this.objectList.filter(item => comparator(item));
        return this;
    }

    whereIn(key: keyof T | string, values: any[]): this {
        if (!Array.isArray(values)) {
            throw new QueryBuilderError('whereIn requires an array of values!', ErrorCodes.INVALID_WHERE_CONDITION);
        }
        this.objectList = this.objectList.filter(item => values.includes((item as any)[key]));
        return this;
    }

    whereNotIn(key: keyof T | string, values: any[]): this {
        if (!Array.isArray(values)) {
            throw new QueryBuilderError('whereNotIn requires an array of values!', ErrorCodes.INVALID_WHERE_CONDITION);
        }
        this.objectList = this.objectList.filter(item => !values.includes((item as any)[key]));
        return this;
    }

    orderBy(key: keyof T | string, order: 'asc' | 'desc' = 'asc'): this {
        validateSortOrder(order);
        const comparator = createSortComparator<T>(key as string, order);
        this.objectList = this.objectList.sort(comparator);
        return this;
    }

    orderByMultiple(criteria: SortCriteria<T>[]): this {
        if (!criteria || criteria.length === 0) return this;
        this.objectList = this.objectList.sort((a, b) => {
            for (const { key, order } of criteria) {
                validateSortOrder(order);
                const comparator = createSortComparator<T>(key as string, order);
                const result = comparator(a, b);
                if (result !== 0) return result;
            }
            return 0;
        });
        return this;
    }

    limit(count: number): this {
        validateLimit(count);
        this.limitCount = count;
        return this;
    }

    offset(count: number): this {
        validateOffset(count);
        this.offsetCount = count;
        return this;
    }

    distinct(): this {
        const seen = new Set<string>();
        this.objectList = this.objectList.filter(item => {
            const key = JSON.stringify(item);
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
        return this;
    }

    groupBy(key: keyof T | string): Record<string, T[]> {
        const groups: Record<string, T[]> = {};
        this.objectList.forEach(item => {
            const groupKey = String((item as any)[key]);
            if (!groups[groupKey]) groups[groupKey] = [];
            groups[groupKey].push(item);
        });
        return groups;
    }

    count(): number {
        return this.objectList.length;
    }

    aggregate(func: AggregateFunction, key: keyof T | string): number | null {
        if (this.objectList.length === 0) return null;
        const values = this.objectList.map(item => Number((item as any)[key])).filter(val => !isNaN(val));
        if (values.length === 0) return null;
        switch (func) {
            case 'count': return values.length;
            case 'sum': return values.reduce((sum, val) => sum + val, 0);
            case 'avg': return values.reduce((sum, val) => sum + val, 0) / values.length;
            case 'min': return Math.min(...values);
            case 'max': return Math.max(...values);
            default: return null;
        }
    }

    first(): T | null {
        return this.objectList.length > 0 ? this.objectList[0] : null;
    }

    last(): T | null {
        return this.objectList.length > 0 ? this.objectList[this.objectList.length - 1] : null;
    }

    run(): T[] {
        let results = [...this.objectList];
        if (this.offsetCount !== null && this.offsetCount > 0) {
            results = results.slice(this.offsetCount);
        }
        if (this.limitCount !== null && this.limitCount >= 0) {
            results = results.slice(0, this.limitCount);
        }
        if (!this.selectList.find(item => item === '*')) {
            results = results.map(item => {
                const projected: any = {};
                this.selectList.forEach(key => {
                    projected[key as string] = (item as any)[key];
                });
                return projected as T;
            });
        }
        this.reset();
        return results;
    }

    private reset(): void {
        this.selectList = [];
        this.objectList = [];
        this.limitCount = null;
        this.offsetCount = null;
    }

    clone(): QueryBuilder<T> {
        const cloned = new QueryBuilder<T>();
        cloned.selectList = [...this.selectList];
        cloned.objectList = deepClone(this.objectList);
        cloned.limitCount = this.limitCount;
        cloned.offsetCount = this.offsetCount;
        return cloned;
    }
}

const query = {
    select: (fields: string[]) => QueryBuilder.create().select(fields),
};

export default QueryBuilder;
export { query };
