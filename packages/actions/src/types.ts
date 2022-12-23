type ActionOutputSuccess<Data> = {
  ok: true
  data: Data
}

type ActionOutputFailure = {
  ok: false
  errors: Error[]
}

export type ActionOutput<Data> = Promise<
  ActionOutputSuccess<Data> | ActionOutputFailure
>
/**
 * Note: this is a workaround to avoid a TS1055 error. See for more info:
 * @link https://github.com/microsoft/TypeScript/issues/12776#issuecomment-265885846
 */
export const ActionOutput = Promise
