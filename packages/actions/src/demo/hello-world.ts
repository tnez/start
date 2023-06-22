import { createAction } from '../__internal/factory'

export type HelloWorldContext = { salutation?: 'Hello' | 'Hi' | 'Hey there' }
export type HelloWorldInput = { name?: string }
export type HelloWorldOutput = { message: string }

const handler = async (
  ctx: HelloWorldContext,
  input: HelloWorldInput,
): Promise<HelloWorldOutput> => {
  const { salutation = 'Hello' } = ctx
  const { name = 'world' } = input

  return { message: `${salutation}, ${name}!` }
}

export const HelloWorld = createAction('HelloWorldAction', handler)
