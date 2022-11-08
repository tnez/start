## Development Notes

### Getting Started

1. Install dependencies (this is done for you if using Github Codespaces): `pnpm install --frozen-lockfile`
2. Run in development mode: `pnpm dev`

### Installing Dependencies

From the root of the repository you can install production dependencies with `pnpm add <dependency-name> --filter=<package-name>` or development dependencies by adding the `-D` flag (`pnpm add -D <dependency-name> --filter=<package-name>`) where the package name matches the name in the `package.json` for the particular `app` or `package` to which you adding the dependency.

## General Architectural Notes

### Monorepo Approach

This project is setup as a [monorepo](https://en.wikipedia.org/wiki/Monorepo) in order to support quick iteration by cutting out the need to publish supporting packages, while approaching code organization in a way that mitigates redudancy.

We use [turborepo](https://turbo.build/repo) to improve our build and run pipelines within this [monorepo](https://en.wikipedia.org/wiki/Monorepo).

We organize code into two general buckets:

1. `apps`: These are applications that are exposed to a user in someway, which could be an API or a traditional web-interface.
2. `packages`: These are bits of code that act as support for the `apps` or the monorepo as a whole. Users don't interact with these `packages` directly, only via one of the `apps`.

More info regarding any of the particular `apps` can be found in their respective `readme.md`'s.

### Action / Effect Pattern

Two packages `packages/actions` and `packages/effects` deserve special mention. They serve to define the core-business logic of the application as well as how the application interacts with the outside world.

#### Actions

An action is a meaningful activity defined in the language of a stakeholder. They can be something like:

- `create-user`
- `start-session`
- `show-offer`
- `send-payment`

We define them in such a way that they do not directly interact with the outside world. Instead, we inject a set of `effects` that the action can invoke. In this way we can unit test these actions by providing mock effects under test where we assert that:

1. All desired effects are invoked as expected.
2. Expected value is returned for both happy and sad paths.

#### Effects

An effect is a way for the application to so _something_:

- read / write data to a database
- store a file in the cloud
- emit a message to a loggin service
- send a welcome email to a new user

Effects provide an interface with which actions will work and may encapsulate the logic of 3rd-party clients.
