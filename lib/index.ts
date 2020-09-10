class query {
    private selectList: string[];
    private objectList: any[];

    constructor() {
        this.selectList = [];
        this.objectList = [];
    }

    /**
     * SELECT
     */
    select(selectList: string[]): query {
        if (!selectList || selectList.length === 0) {
            throw new Error('SELECT clause must have at least one search condition!');
        }

        if (selectList.some(item => item === '*') && selectList.length > 1) {
            throw new Error('SELECT clause, if all searches exist, no other search conditions exist!');
        }

        this.selectList = selectList;
        return this;
    }

    /**
     * FROM
     */
    from(object: any): query {
        if (Array.isArray(object)) {
            const isObject = object.some((item) => typeof item !== 'object');
            
            if (isObject) {
                throw new Error('FROM clause needs an object or an array of objects!');
            } else {
                this.objectList = object;
            }
        } else {
            if (typeof object === 'object') { 
                this.objectList = [object];
            } else {
                throw new Error('FROM clause needs an object or an array of objects!');
            }
        }
        return this;
    }

    /**
     * JOIN
     */
    join(object: any, key: string): query {
        if (Array.isArray(object)) {
            const isObject = object.some((item) => typeof item !== 'object');
            
            if (isObject) {
                throw new Error('JOIN clause needs an object or an array of objects!');
            } else {
                let reduced =  this.objectList.filter(aitem => object.find(bitem => aitem[key] === bitem[key]));
    
                for (let i in reduced) {
                    for (let j in object) {
                        if (reduced[i][key] === object[j][key]) {
                            reduced[i] = { ...reduced[i], ...object[j] };
                        }
                    }
                }

                this.objectList = reduced;
            }
        } else {
            throw new Error('JOIN clause needs an object or an array of objects!');
        }
        return this;
    }

    /**
     * WHERE
     */
    where(key: string, operator: string, operand: string | number): query {
        if (!key && !operator && !operand) {
            throw new Error('WHERE clause needs to have two spaces!');
        }

        if (!['>', '<', '>=', '<=', '=', '!='].includes(operator)) {
            throw new Error('WHERE clause needs to have the correct operator!');
        }
        
        let statement: any;

        if (typeof operand === 'string') {
            if (!['=', '!='].includes(operator)) {
                throw new Error("WHERE clause must be the '=' or '!=' operator!");
            }
            
            switch (operator) {
                case '=': {
                    statement = (item: any): boolean => item[key] === operand;
                } break;
                case '!=': {
                    statement = (item: any): boolean => item[key] !== operand;
                } break;
            }
        } else if (typeof operand === 'number') {
            switch (operator) {
                case '>': {
                    statement = (item: any): boolean => isNaN(Number(item[key])) ?
                        item[key] > operand :
                        item[key] > Number(operand);
                } break;

                case '>=': {
                    statement = (item: any): boolean => isNaN(Number(item[key])) ?
                        item[key] >= operand :
                        item[key] >= Number(operand);
                } break;

                case '=': {
                    statement = (item: any) => isNaN(Number(item[key])) ?
                        item[key] === operand :
                        item[key] === Number(operand);
                } break;

                case '<': {
                    statement = (item: any) => isNaN(Number(item[key])) ?
                        item[key] < operand :
                        item[key] < Number(operand);
                } break;

                case '<=': {
                    statement = (item: any) => isNaN(Number(item[key])) ?
                        item[key] <= operand :
                        item[key] <= Number(operand);
                } break;
            }
        }

        this.objectList = this.objectList.filter((item) => statement(item) && item);
        return this;
    }
    
    /**
     * ORDER
     */
    order(key: string, type: string): query {

        if (type !== 'asc' && type !== 'desc') {
            throw new Error('ORDER clause needs to have the correct type!');
        }

        const flip = type === 'asc' ? 1 : -1;
        const compare = (a: any, b: any): number => {
            if (a[key] < b[key]) return -1 * flip;
            else if (a[key] > b[key]) return flip;
            else return 0;
        };

        this.objectList = this.objectList.sort(compare);

        return this;
    }

    run(): any[] {
        const objectList: any[] = [];

        if (!this.selectList.find(item => item === '*')) {
            this.objectList.forEach((item) => {
                const object: any = {};

                this.selectList.forEach((key) => {
                    object[`${key}`] = item[`${key}`];
                });

                objectList.push(object);
            });

            this.objectList = objectList;
        }

        return this.objectList
    }
}

export = new query;
