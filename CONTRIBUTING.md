# Contributing

I am glad you have decided to work on this repository there some rules and scopes that you should read before actually developing. It would help you understanding the scope and guidelines

### Rules

1. Pull request against main branch is strictly forbidden
2. The branching name should follow this syntax; `<bugfix|feature>/<topic>`
3. If you are submitting a pull request for feature, then it should contain the test suites located in `test/<topic>.spec.ts`
4. Your pull request will only be merged until it passes all the checks
5. Lint and format the code before commiting it into the git (run `yarn lint && yarn format`)

## Scope of Contribution

1. Improving documentation (the readme file)
2. Adding more features like
   - secure the array deserialization
   - rather than replacing the whole object, fix the issue bu filtering out bad query in the array
3. Existing bug fix
