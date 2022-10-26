`actions`

Actions are the core of the application. This is where we define our business-logic. We define things such as:

- `createUser`
- `activateUser`
- `cancelOrder`

And how these things interact with the outside world via `effects`.

The purpose of separating business-logic into it's own package is so that we can test in isolation what **effects** a given **action** should take. In other words, given an **action** defined in a domain language common to the business, how should it **effect** the outside world.

Ideally, the majority of our complexity lives inside this package, in a way that is condusive to unit testing.
