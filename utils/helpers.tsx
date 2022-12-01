export const hasuraFetch = async (query: string, variables?: any) => {
  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ query, variables })
  })
  const json = await response.json()
  return json
}