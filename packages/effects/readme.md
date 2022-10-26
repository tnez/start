`effects`

**Effects** define how our applications interact with the outside world.

In general, an application is not interesting in any way unless it somehow effects the outside world. For instance it may:

- add / update / delete a record in a database
- send an email to a user
- send logs to a service
- send exceptions to a service
- send analytic events to a service

This package holds the configuration and plumbing required to connect our application to systems that record or surface the state of important events to the outside world.

We do not nescasarily need to exhaustively test these effects. We simply need to plug data into external systems.
