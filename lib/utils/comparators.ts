import { ComparisonOperator } from '../types';

export function createComparator(key: string, operator: ComparisonOperator | 'like' | 'in' | 'not in', operand: any): (item: any) => boolean {
    if (operator === 'in') return (item: any) => Array.isArray(operand) && operand.includes(item[key]);
    if (operator === 'not in') return (item: any) => Array.isArray(operand) && !operand.includes(item[key]);
    if (operator === 'like') {
        const regex = new RegExp(String(operand).replace(/%/g, '.*').replace(/_/g, '.'), 'i');
        return (item: any) => regex.test(String(item[key]));
    }
    if (typeof operand === 'string') {
        if (operator === '=') return (item: any) => item[key] === operand;
        if (operator === '!=') return (item: any) => item[key] !== operand;
    }
    if (typeof operand === 'number') {
        const value = operand;
        if (operator === '>') return (item: any) => !isNaN(Number(item[key])) && Number(item[key]) > value;
        if (operator === '>=') return (item: any) => !isNaN(Number(item[key])) && Number(item[key]) >= value;
        if (operator === '=') return (item: any) => !isNaN(Number(item[key])) && Number(item[key]) === value;
        if (operator === '<') return (item: any) => !isNaN(Number(item[key])) && Number(item[key]) < value;
        if (operator === '<=') return (item: any) => !isNaN(Number(item[key])) && Number(item[key]) <= value;
        if (operator === '!=') return (item: any) => !isNaN(Number(item[key])) && Number(item[key]) !== value;
    }
    return () => false;
}

export function createSortComparator<T>(key: string, order: 'asc' | 'desc'): (a: T, b: T) => number {
    const flip = order === 'asc' ? 1 : -1;
    return (a: any, b: any): number => {
        if (a[key] === undefined || a[key] === null) return flip;
        if (b[key] === undefined || b[key] === null) return -flip;
        if (a[key] < b[key]) return -1 * flip;
        if (a[key] > b[key]) return flip;
        return 0;
    };
}

export function deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(item => deepClone(item)) as any;
    const cloned: any = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) cloned[key] = deepClone(obj[key]);
    }
    return cloned;
}
