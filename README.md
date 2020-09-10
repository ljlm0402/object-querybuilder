<img src='https://github.com/ljlm0402/object-querybuilder/raw/images/logo.png' border='0' alt='logo' />

[Object](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object) type data query builder

<img src="https://img.shields.io/npm/v/object-querybuilder.svg" alt="NPM Version" /> <img src="https://img.shields.io/npm/l/object-querybuilder.svg" alt="Package License" /> <img src="https://img.shields.io/github/v/release/ljlm0402/object-querybuilder" alt="Release Version" /> <img src="https://img.shields.io/npm/dm/object-querybuilder.svg" alt="NPM Downloads" />

<br />

## 🕹Guide

### Install

```js
$ npm install --save object-querybuilder
```

### Usage

#### JavaScript

```js
const query = require('object-querybuilder');

const users = [
    { name: 'Lucy', age: 23, gender: 'woman' },
    { name: 'Emma', age: 31, gender: 'woman' },
    { name: 'Daniel', age: 18, gender: 'man' },
    { name: 'Olivia', age: 42, gender: 'woman' },
    { name: 'Alex', age: 33, gender: 'man' }
];

const countrys = [
    { name: 'Lucy', country: 'New York' },
    { name: 'Daniel', country: 'France' },
    { name: 'Emma', country: 'Germany' }
];

const result = query
.select(['*'])
.from(users)
.join(countrys, 'name')
.where('age', '>', 30)
.run();

/**
[ 
    { name: 'Emma', age: 31, gender: 'woman', country: 'Germany' } 
]
**/
```

#### TypeScript

```js
import query from 'object-querybuilder';

const users = [
    { name: 'Lucy', age: 23, gender: 'woman' },
    { name: 'Emma', age: 31, gender: 'woman' },
    { name: 'Daniel', age: 18, gender: 'man' },
    { name: 'Olivia', age: 42, gender: 'woman' },
    { name: 'Alex', age: 33, gender: 'man' }
];

const countrys = [
    { name: 'Lucy', country: 'New York' },
    { name: 'Daniel', country: 'France' },
    { name: 'Emma', country: 'Germany' }
];

const result = query
.select(['*'])
.from(users)
.join(countrys, 'name')
.where('age', '>', 30)
.run();

/**
[ 
    { name: 'Emma', age: 31, gender: 'woman', country: 'Germany' } 
]
**/
```

## 📬 Recommended Commit Message

|  When |  Commit Message  |
|:--------|:-----------|
| Add function | feat: ⚡️ Add function |
| Fix bug | fix: 🐞 Fix bug |
| Refactoring | refactor: 🛠 Refactoring |
| Add package | package: 📦 Add package |
| Fix readme | docs: 📚 Fix readme |
| Improvements style | style: 👁 Improvements style |
| New Releases | releases: 🎉 Releases |

## 💳 License

[MIT](LICENSE)
