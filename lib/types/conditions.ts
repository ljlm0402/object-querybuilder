import { ComparisonOperator, LogicalOperator } from './operators';

export interface WhereCondition<T = any> {
    key: keyof T | string;
    operator: ComparisonOperator | 'like' | 'in' | 'not in';
    value: any;
}

export interface WhereClause<T = any> {
    conditions: WhereCondition<T>[];
    logic: LogicalOperator;
}

export interface SortCriteria<T = any> {
    key: keyof T | string;
    order: 'asc' | 'desc';
}
