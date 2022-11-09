import * as React from 'react'
import { pokemon } from 'actions'

export async function PokemonPage() {
	const result = await pokemon.getList({ input: {} })

	if (!result.ok) {
		return <div>Uh, oh, something went wrong...</div>
	}

	return (
		<div className="container mx-auto">
			<table className="table-fixed w-full rounded-xl overflow-hidden mt-4">
				<thead className="bg-gray-100">
					<tr>
						<th className="py-4">Id</th>
						<th>Name</th>
						<th>Image</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{result.data.map(({ id, name, img }) => (
						<tr key={`${id}-${name}`}>
							<td>{id}</td>
							<td>{name}</td>
							<td>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img alt={name} src={img} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default PokemonPage
