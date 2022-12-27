import { pokemon } from 'actions'
import type { NextApiRequest, NextApiResponse } from 'next'

const GetPokemonList = new pokemon.GetList({ fetch })

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const result = await GetPokemonList.execute({ limit: 25 })

  response.status(result.ok ? 200 : 500).json({
    ...result,
    generatedAt: new Date().toISOString(),
  })
}
