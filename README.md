<h1 align="center">
  <br>
  <img src="https://github.com/ljlm0402/object-querybuilder/raw/images/logo.png" alt="Project Logo" width="600" />
  <br>
  <br>
  Object Query Builder
  <br>
</h1>

<h4 align="center">🧩 A powerful, type-safe SQL-like query builder for JavaScript objects</h4>

<p align ="center">
    <a href="https://nodei.co/npm/object-querybuilder" target="_blank">
    <img src="https://nodei.co/npm/object-querybuilder.png" alt="npm Info" />
</a>

</p>

<p align="center">
    <a href="http://npm.im/object-querybuilder" target="_blank">
      <img src="https://img.shields.io/npm/v/object-querybuilder.svg" alt="npm Version" />
    </a>
    <a href="http://npm.im/object-querybuilder" target="_blank">
      <img src="https://img.shields.io/github/v/release/ljlm0402/object-querybuilder" alt="npm Release Version" />
    </a>
    <a href="http://npm.im/object-querybuilder" target="_blank">
      <img src="https://img.shields.io/npm/dm/object-querybuilder.svg" alt="npm Downloads" />
    </a>
    <a href="http://npm.im/object-querybuilder" target="_blank">
      <img src="https://img.shields.io/npm/l/object-querybuilder.svg" alt="npm Package License" />
    </a>
</p>

<p align="center">
  <a href="https://github.com/ljlm0402/object-querybuilder/stargazers" target="_blank">
    <img src="https://img.shields.io/github/stars/ljlm0402/object-querybuilder" alt="github Stars" />
  </a>
  <a href="https://github.com/ljlm0402/object-querybuilder/network/members" target="_blank">
    <img src="https://img.shields.io/github/forks/ljlm0402/object-querybuilder" alt="github Forks" />
  </a>
  <a href="https://github.com/ljlm0402/object-querybuilder/stargazers" target="_blank">
    <img src="https://img.shields.io/github/contributors/ljlm0402/object-querybuilder" alt="github Contributors" />
  </a>
  <a href="https://github.com/ljlm0402/object-querybuilder/issues" target="_blank">
    <img src="https://img.shields.io/github/issues/ljlm0402/object-querybuilder" alt="github Issues" />
  </a>
</p>

<p align="center">
  <strong>· English <a href="./README.ko.md">· Korean</a></strong>
</p>

---

## ✨ Features
- 🎨 **Fluent API** - Chainable methods for readable queries
- 🎯 **SQL-like Syntax** - Familiar query syntax for filtering, sorting, and joining
- 🔧 **Extensible** - Easy to add custom functionality
- 🔒 **Type-Safe** - Full TypeScript support with generics
- ⚡ **High Performance** - Optimized algorithms (O(n) joins with Map)
- 📦 **Zero Dependencies** - Pure TypeScript, no external dependencies
- 🚀 **Modern Build** - Dual CJS/ESM support with tsup

---

## 🚀 Installation

```bash
npm install object-querybuilder

yarn add object-querybuilder

pnpm add object-querybuilder
```

---

## 📖 Quick Start

### TypeScript

```typescript
import QueryBuilder from 'object-querybuilder';

interface User {
    name: string;
    age: number;
    gender: string;
}

const users: User[] = [
    { name: 'Lucy', age: 23, gender: 'woman' },
    { name: 'Emma', age: 31, gender: 'woman' },
    { name: 'Daniel', age: 18, gender: 'man' },
    { name: 'Olivia', age: 42, gender: 'woman' },
    { name: 'Alex', age: 33, gender: 'man' }
];

const result = QueryBuilder.create<User>()
    .select(['name', 'age'])
    .from(users)
    .where('age', '>', 25)
    .where('gender', '=', 'woman')
    .orderBy('age', 'desc')
    .run();

console.log(result);
// Output: [
//   { name: 'Olivia', age: 42 },
//   { name: 'Emma', age: 31 }
// ]
```

### JavaScript (CommonJS)

```javascript
const QueryBuilder = require('object-querybuilder').default;

const users = [
    { name: 'Lucy', age: 23, gender: 'woman' },
    { name: 'Emma', age: 31, gender: 'woman' }
];

const result = QueryBuilder.create()
    .select(['*'])
    .from(users)
    .where('age', '>', 25)
    .run();
```

### JavaScript (ESM)

```javascript
import QueryBuilder from 'object-querybuilder';

const result = QueryBuilder.create()
    .select(['name', 'age'])
    .from(users)
    .orderBy('age', 'asc')
    .limit(5)
    .run();
```

---

## 📚 API Reference

### Core Query Methods

| Method | Description | Example |
|--------|-------------|---------|
| `select(fields)` | Specify fields to return (`['*']` for all) | `.select(['name', 'age'])` |
| `from(data)` | Set data source (array or single object) | `.from(users)` |
| `where(key, op, value)` | Filter by condition | `.where('age', '>', 25)` |
| `whereIn(key, values)` | Filter by array inclusion | `.whereIn('status', ['active', 'pending'])` |
| `whereNotIn(key, values)` | Filter by array exclusion | `.whereNotIn('role', ['admin'])` |
| `orderBy(key, order)` | Sort results (asc/desc) | `.orderBy('age', 'desc')` |
| `orderByMultiple(criteria)` | Sort by multiple fields | `.orderByMultiple([{key: 'dept', order: 'asc'}])` |
| `limit(count)` | Limit number of results | `.limit(10)` |
| `offset(count)` | Skip number of results | `.offset(20)` |
| `distinct()` | Remove duplicates | `.distinct()` |
| `run()` | Execute query and return results | `.run()` |

### Join Methods

| Method | Description | Example |
|--------|-------------|---------|
| `join(data, key)` | Inner join on common key | `.join(addresses, 'userId')` |
| `leftJoin(data, key)` | Left outer join | `.leftJoin(addresses, 'userId')` |

### Aggregation Methods

| Method | Description | Example |
|--------|-------------|---------|
| `count()` | Count results | `.count()` |
| `aggregate(func, key)` | Apply function (sum, avg, min, max) | `.aggregate('sum', 'salary')` |
| `groupBy(key)` | Group results by field | `.groupBy('department')` |
| `first()` | Get first result | `.first()` |
| `last()` | Get last result | `.last()` |

### Utility Methods

| Method | Description | Example |
|--------|-------------|---------|
| `clone()` | Create independent copy | `.clone()` |

### Supported Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `>` | Greater than | `.where('age', '>', 25)` |
| `<` | Less than | `.where('price', '<', 100)` |
| `>=` | Greater than or equal | `.where('score', '>=', 90)` |
| `<=` | Less than or equal | `.where('stock', '<=', 10)` |
| `=` | Equal | `.where('status', '=', 'active')` |
| `!=` | Not equal | `.where('type', '!=', 'draft')` |
| `like` | Pattern matching (%, _) | `.where('email', 'like', '%@gmail.com')` |

---

## 💡 Examples

### Basic Filtering

```typescript
// Single condition
QueryBuilder.create()
    .select(['*'])
    .from(products)
    .where('price', '<', 100)
    .run();

// Multiple conditions (chained)
QueryBuilder.create()
    .select(['*'])
    .from(users)
    .where('age', '>=', 18)
    .where('status', '=', 'active')
    .whereIn('role', ['user', 'moderator'])
    .run();
```

### Pattern Matching

```typescript
// Find emails from Gmail
QueryBuilder.create()
    .from(users)
    .where('email', 'like', '%@gmail.com')
    .run();

// Find names starting with 'A'
QueryBuilder.create()
    .from(users)
    .where('name', 'like', 'A%')
    .run();

// Find names containing 'son'
QueryBuilder.create()
    .from(users)
    .where('name', 'like', '%son%')
    .run();
```

### Joining Data

```typescript
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

const orders = [
    { userId: 1, product: 'Laptop', amount: 1200 },
    { userId: 1, product: 'Mouse', amount: 25 },
    { userId: 2, product: 'Keyboard', amount: 75 }
];

// Inner join (only matching records)
const result = QueryBuilder.create()
    .from(users)
    .join(orders, 'userId')
    .run();

// Left join (all users, even without orders)
const result = QueryBuilder.create()
    .from(users)
    .leftJoin(orders, 'userId')
    .run();
```

### Pagination

```typescript
const PAGE_SIZE = 10;
const currentPage = 3;

const result = QueryBuilder.create()
    .select(['*'])
    .from(items)
    .orderBy('createdAt', 'desc')
    .limit(PAGE_SIZE)
    .offset((currentPage - 1) * PAGE_SIZE)
    .run();
```

### Aggregation & Analytics

```typescript
const sales = [
    { product: 'Laptop', price: 1200, quantity: 5 },
    { product: 'Mouse', price: 25, quantity: 50 },
    { product: 'Keyboard', price: 75, quantity: 20 }
];

// Total revenue
const total = QueryBuilder.create()
    .from(sales)
    .aggregate('sum', 'price');
// Result: 1300

// Average price
const avg = QueryBuilder.create()
    .from(sales)
    .aggregate('avg', 'price');
// Result: 433.33

// Most expensive item
const max = QueryBuilder.create()
    .from(sales)
    .aggregate('max', 'price');
// Result: 1200

// Group by and count
const grouped = QueryBuilder.create()
    .from(orders)
    .groupBy('status');
// Result: { 'pending': [...], 'completed': [...], 'cancelled': [...] }
```

### Sorting

```typescript
// Single field
QueryBuilder.create()
    .from(products)
    .orderBy('price', 'desc')
    .run();

// Multiple fields
QueryBuilder.create()
    .from(employees)
    .orderByMultiple([
        { key: 'department', order: 'asc' },
        { key: 'salary', order: 'desc' },
        { key: 'name', order: 'asc' }
    ])
    .run();
```

### Advanced Use Cases

```typescript
// Find top 5 most expensive products in Electronics
QueryBuilder.create()
    .select(['name', 'price', 'rating'])
    .from(products)
    .where('category', '=', 'Electronics')
    .where('inStock', '=', true)
    .orderBy('price', 'desc')
    .limit(5)
    .run();

// Get unique active users who made purchases
QueryBuilder.create()
    .select(['userId', 'username'])
    .from(transactions)
    .where('status', '=', 'completed')
    .whereIn('userId', activeUserIds)
    .distinct()
    .run();

// Reusable query with cloning
const baseQuery = QueryBuilder.create()
    .from(users)
    .where('status', '=', 'active');

const adults = baseQuery.clone()
    .where('age', '>=', 18)
    .run();

const minors = baseQuery.clone()
    .where('age', '<', 18)
    .run();
```

---

## 🎯 Use Cases

- **Frontend Data Filtering** - Filter API responses in browser
- **Testing** - Mock database queries without actual DB
- **Data Processing** - Transform and analyze in-memory data
- **Prototyping** - Quick data manipulation without backend
- **Report Generation** - Aggregate and summarize data
- **ETL Operations** - Extract, transform, load data pipelines

---

## 🤝 Contributing

Contributions are always welcome! Please feel free to open an issue or submit a pull request.

## 💳 License

[MIT](LICENSE)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/ljlm0402">AGUMON</a> 🦖
</p>
