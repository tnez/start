import * as React from 'react'
import { pokemon } from 'actions'

export async function PokemonPage() {
	const result = await pokemon.getList({ input: {} })

	if (!result.ok) {
		return <div>Uh, oh, something went wrong...</div>
	}

	return (
		<div className="container max-w-lg mx-auto text-left">
			<h1 className="text-2xl">Behold the Pokemon!</h1>
			<table className="table-auto w-full mt-4">
				<thead>
					<tr className="border-solid border-gray-800 border-b">
						<th className="py-4 mr-2">Name</th>
						<th className="py-4">URL</th>
					</tr>
				</thead>
				<tbody>
					{result.data.map(({ name, url }) => (
						<tr key={name} className="border-solid border-gray-100 border-t">
							<td className="py-2 font-bold">{name}</td>
							<td className="py-2 font-thin">
								<pre className="bg-gray-100">{url}</pre>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default PokemonPage
