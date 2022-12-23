type ActionOutputSuccess<Data> = {
  ok: true
  data: Data
}

type ActionOutputFailure = {
  ok: false
  errors: Error[]
}

export interface Action<Input, Output> {
  execute: (
    input: Input,
  ) => Promise<ActionOutputSuccess<Output> | ActionOutputFailure>
}
