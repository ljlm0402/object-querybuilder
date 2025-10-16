export class QueryBuilderError extends Error {
    public readonly code: string;
    
    constructor(message: string, code: string) {
        super(message);
        this.name = 'QueryBuilderError';
        this.code = code;
        
        if ((Error as any).captureStackTrace) {
            (Error as any).captureStackTrace(this, QueryBuilderError);
        }
    }
}

export const ErrorCodes = {
    EMPTY_SELECT: 'EMPTY_SELECT',
    INVALID_SELECT: 'INVALID_SELECT',
    NO_DATA_SOURCE: 'NO_DATA_SOURCE',
    INVALID_DATA_SOURCE: 'INVALID_DATA_SOURCE',
    INVALID_JOIN_DATA: 'INVALID_JOIN_DATA',
    MISSING_JOIN_KEY: 'MISSING_JOIN_KEY',
    INVALID_WHERE_CONDITION: 'INVALID_WHERE_CONDITION',
    INVALID_OPERATOR: 'INVALID_OPERATOR',
    INVALID_OPERAND: 'INVALID_OPERAND',
    INVALID_SORT_ORDER: 'INVALID_SORT_ORDER',
    INVALID_LIMIT: 'INVALID_LIMIT',
    INVALID_OFFSET: 'INVALID_OFFSET',
    EMPTY_RESULT: 'EMPTY_RESULT',
    INVALID_KEY: 'INVALID_KEY',
} as const;
