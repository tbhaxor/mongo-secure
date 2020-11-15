# mongo-secure ![Pre-merge Testing](https://github.com/tbhaxor/mongo-secure/workflows/Pre-merge%20Testing/badge.svg)

MongoSecure is a nodejs module as an express.js middleware to prevent potential NoSQL Injection flaws that might allow hackers exploit the application and do unauthorized activities

I would like to thank [x00](https://stackoverflow.com/users/12610347/x00) who gave me headstart to fix this issue and create a middleware for you. [Originally asked question on stackoverflow](https://stackoverflow.com/questions/59394484/expressjs-set-the-depth-of-json-parsing)

Build Status

## Why you need this

I have posted a complete article on dev.to about this showing how the application can be targeted and exploited against NoSQL Injection payloads.

You can find my article posted here: https://dev.to/tbhaxor/one-step-to-prevent-potential-nosql-injection-in-your-mongodb-application-40f9

Another reasons are as follows

1. Fix the above mentioned vulnerability without
2. Minimize the time to validate data and report it tainted
3. Slimline and fast
4. No additional skill/library required
5. Does not change orignal value of `req.body`. [SEE THIS](#usage)

## Requirements

- NodeJS 10+
- Mongoose or MongoDB
- Express 4+

## Installation

Install via NPM

```
npm i @tbhaxor/mongo-secure
```

Install via Yarn

```
yarn add @tbhaxor/mongo-secure
```

## Usage

Require the package

```js
// es6
import mongoSecure from '@tbhaxor/mongo-secure'
import express from 'express'

// commonjs
const express = require('express')
const mongoSecure = require('@tbhaxor/mongo-secure')

const app = express()

app.use(express.json())
app.use(mongoSecure({ maxNestedLimit: 2, replaceWith: 'Insecure Property Detected' })) // use it after `express.json` middleware
```

To access the protected body, you can use `req.protectedBody` in the express router

```js
app.post('/', function (req, res) {
  let myProtectedData = req.protectedBody
  res.json({ insecureData: req.body, securedData: myProtectedData })
})
```

## API

The function requires two option fields `maxNestedLimit` and `replaceWith`

### `maxNestedLimit`

It is numerical field, that accept a number starting from `1`. It is basically the max number of nesting to be deserialized. Any nested property which is `instanceof Object` after that would be replaced with the [`replaceWith`](#replacewith)

### `replaceWith`

It is a string feild that accepts any string, no contraint here. When the nested object hit the target [`maxNestedLimit`](#maxnestedlimit), this text will be replaced with the object

For example, is `maxNestedLimit` is `1` and **replaceWith** is `Unprotected`

## Development

You can be the developer of mongo-secure module. To setup the development environment,

1. Fork the repository
2. Clone the repository (`git clone git@github.com:<user-name>/mongo-secure.git`)
3. Install the packages (`yarn install`)
4. Start the development

Test if your modification is working accurately or not

```
yarn test
```

**Note** If you are adding a feature, then you must include the test case in `test/<feature-name>.spec.ts`

For more information read the [Contributing Guidelines](https://github.com/tbhaxor/mongo-secure/blob/main/CONTRIBUTING.md)

## Licensing

**@tbhaxor/mongo-secure** is licensed under [MIT License](https://github.com/tbhaxor/mongo-secure/blob/main/LICENSE)

## Contact the Author

Follow the links to reach me

- Email: tbhaxor@gmail.com
- Twitter: [@tbhaxor](https://twitter.com/tbhaxor)
- Facebook: [@tbhaxor](https://fb.com/tbhaxor)
- GitHub: [@tbhaxor](https://github.com/tbhaxor)
- LinkedIn: [@gurkirat--singh](https://www.linkedin.com/in/gurkirat--singh)
- Instagram: [@_tbhaxor_](https://instagram.com/_tbhaxor_)
