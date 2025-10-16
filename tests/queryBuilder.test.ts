import queryBuilder from '../lib/queryBuilder';

describe('queryBuilder', () => {
    const users = [
        { name: 'Lucy', age: 23, gender: 'woman' },
        { name: 'Emma', age: 31, gender: 'woman' },
        { name: 'Daniel', age: 18, gender: 'man' },
        { name: 'Olivia', age: 42, gender: 'woman' },
        { name: 'Alex', age: 33, gender: 'man' }
    ];

    test('SELECT and FROM', () => {
        const result = queryBuilder.create()
            .select(['name', 'age'])
            .from(users)
            .run();
        expect(result).toHaveLength(5);
        expect(result[0]).toHaveProperty('name');
        expect(result[0]).not.toHaveProperty('gender');
    });

    test('WHERE filtering', () => {
        const result = queryBuilder.create()
            .select(['*'])
            .from(users)
            .where('age', '>', 30)
            .run();
        expect(result).toHaveLength(3);
    });

    test('ORDER BY', () => {
        const result = queryBuilder.create()
            .select(['*'])
            .from(users)
            .orderBy('age', 'asc')
            .run();
        expect(result[0].age).toBe(18);
        expect(result[4].age).toBe(42);
    });

    test('LIMIT and OFFSET', () => {
        const result = queryBuilder.create()
            .select(['*'])
            .from(users)
            .limit(2)
            .offset(1)
            .run();
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('Emma');
    });

    test('COUNT', () => {
        const count = queryBuilder.create()
            .from(users)
            .where('gender', '=', 'woman')
            .count();
        expect(count).toBe(3);
    });
});
