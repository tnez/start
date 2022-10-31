import * as React from 'react'
import { auth } from '@clerk/nextjs/app-beta'

export default function Home() {
	const { userId } = auth()

	return (
		<div className="px-2">
			<main className="max-w-lg mx-auto mt-8">
				<p className="font-semibold text-2xl">
					Hello User:{' '}
					<pre className="bg-grey-200 text-lg font-thin truncate">{userId}</pre>
				</p>
			</main>
		</div>
	)
}
