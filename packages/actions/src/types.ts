export type ActionInput<
	Effects = Record<string, unknown>,
	Input = Record<string, unknown>,
> = {
	effects?: Effects
	input: Input
}

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
