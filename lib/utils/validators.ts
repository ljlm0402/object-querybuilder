import { QueryBuilderError, ErrorCodes } from '../errors/queryBuilderError';
import { ComparisonOperator } from '../types';

export function validateSelectList(selectList: string[]): void {
    if (!selectList || selectList.length === 0) {
        throw new QueryBuilderError('SELECT clause must have at least one search condition!', ErrorCodes.EMPTY_SELECT);
    }
    if (selectList.some(item => item === '*') && selectList.length > 1) {
        throw new QueryBuilderError('SELECT clause, if all searches exist, no other search conditions exist!', ErrorCodes.INVALID_SELECT);
    }
}

export function validateDataSource(data: any): void {
    if (!data) {
        throw new QueryBuilderError('No data source specified!', ErrorCodes.NO_DATA_SOURCE);
    }
    if (Array.isArray(data)) {
        const hasInvalidItem = data.some((item) => typeof item !== 'object' || item === null);
        if (hasInvalidItem) {
            throw new QueryBuilderError('FROM clause needs an object or an array of objects!', ErrorCodes.INVALID_DATA_SOURCE);
        }
    } else if (typeof data !== 'object' || data === null) {
        throw new QueryBuilderError('FROM clause needs an object or an array of objects!', ErrorCodes.INVALID_DATA_SOURCE);
    }
}

export function validateOperator(operator: string): asserts operator is ComparisonOperator {
    const validOperators: ComparisonOperator[] = ['>', '<', '>=', '<=', '=', '!='];
    if (!validOperators.includes(operator as ComparisonOperator)) {
        throw new QueryBuilderError(`Invalid operator: ${operator}`, ErrorCodes.INVALID_OPERATOR);
    }
}

export function validateSortOrder(order: string): asserts order is 'asc' | 'desc' {
    if (order !== 'asc' && order !== 'desc') {
        throw new QueryBuilderError(`Invalid sort order: ${order}`, ErrorCodes.INVALID_SORT_ORDER);
    }
}

export function validateLimit(limit: number): void {
    if (!Number.isInteger(limit) || limit < 0) {
        throw new QueryBuilderError('LIMIT must be a non-negative integer', ErrorCodes.INVALID_LIMIT);
    }
}

export function validateOffset(offset: number): void {
    if (!Number.isInteger(offset) || offset < 0) {
        throw new QueryBuilderError('OFFSET must be a non-negative integer', ErrorCodes.INVALID_OFFSET);
    }
}

export function isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
}
