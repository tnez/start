import { pokemon } from 'actions'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse,
) {
	const result = await pokemon.getList({ input: {} })

	response.status(result.ok ? 200 : 500).json({
		...result,
		generatedAt: new Date().toISOString(),
	})
}
