export type ActionInput<Effects = {}, Input = {}> = {
	effects: Effects
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
