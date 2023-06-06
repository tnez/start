import { createAction } from '../__internal/factory'

export type HelloWorldContext = { salutation?: 'Hello' | 'Hi' | 'Hey there' }
export type HelloWorldInput = { name?: string }
export type HelloWorldOutput = { message: string }

export const HelloWorld = createAction<
  HelloWorldContext,
  HelloWorldInput,
  HelloWorldOutput
>(async (ctx, input) => {
  const { salutation = 'Hello' } = ctx
  const { name = 'world' } = input

  return { message: `${salutation}, ${name}!` }
})
