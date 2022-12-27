`actions`

**Actions** are the core of the application. This is where we define our business-logic. We define things such as:

- `create-user`
- `activate-user`
- `cancel-order`

And how these things interact with the outside world via an `context` object that is injected at runtime.

Ideally, **the majority of our complexity lives inside this package**, in a way that is condusive to unit testing.
