import queryBuilder from './lib/queryBuilder';

const users = [
    { name: 'Lucy', age: 23, gender: 'woman' },
    { name: 'Emma', age: 31, gender: 'woman' },
    { name: 'Daniel', age: 18, gender: 'man' },
    { name: 'Olivia', age: 42, gender: 'woman' },
    { name: 'Alex', age: 33, gender: 'man' }
];

const countries = [
    { name: 'Lucy', country: 'New York' },
    { name: 'Daniel', country: 'France' },
    { name: 'Emma', country: 'Germany' }
];

console.log('=== Example 1: Basic Query ===');
const result1 = queryBuilder.create()
    .select(['name', 'age'])
    .from(users)
    .where('age', '>', 25)
    .orderBy('age', 'desc')
    .run();
console.log(result1);

console.log('\n=== Example 2: JOIN ===');
const result2 = queryBuilder.create()
    .select(['*'])
    .from(users)
    .join(countries, 'name')
    .where('age', '>', 20)
    .run();
console.log(result2);

console.log('\n=== Example 3: Pagination ===');
const result3 = queryBuilder.create()
    .select(['*'])
    .from(users)
    .orderBy('age', 'asc')
    .limit(2)
    .offset(1)
    .run();
console.log(result3);

console.log('\n=== Example 4: Aggregation ===');
const qb = queryBuilder.create().from(users);
console.log('Count:', qb.clone().count());
console.log('Sum of ages:', qb.clone().aggregate('sum', 'age'));
console.log('Average age:', qb.clone().aggregate('avg', 'age'));
console.log('Max age:', qb.clone().aggregate('max', 'age'));

console.log('\n=== Example 5: whereIn ===');
const result5 = queryBuilder.create()
    .select(['*'])
    .from(users)
    .whereIn('name', ['Lucy', 'Alex', 'Emma'])
    .orderBy('name', 'asc')
    .run();
console.log(result5);

console.log('\n=== Example 6: LIKE pattern ===');
const result6 = queryBuilder.create()
    .select(['*'])
    .from(users)
    .where('name', 'like', '%a%')
    .run();
console.log(result6);

console.log('\n=== Example 7: LEFT JOIN ===');
const result7 = queryBuilder.create()
    .select(['*'])
    .from(users)
    .leftJoin(countries, 'name')
    .run();
console.log(result7);

console.log('\n=== Example 8: Group By ===');
const result8 = queryBuilder.create()
    .from(users)
    .groupBy('gender');
console.log(result8);
