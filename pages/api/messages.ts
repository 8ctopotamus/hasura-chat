import { withApiAuthRequired, getAccessToken } from "@auth0/nextjs-auth0"

const { 
  NEXT_PUBLIC_HASURA_GRAPHQL_API,
  NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET,
} = process.env

export default withApiAuthRequired(async function messages(req, res) {
  
  if (!NEXT_PUBLIC_HASURA_GRAPHQL_API ||
      !NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET) {
    return res.status(500).json({error: 'Backend not configured properly.'})
  }
  
  // Get Auth0 access token
  const { accessToken } = await getAccessToken(req, res, {
    // scopes: ['openid','profile','email'],
  })

  const response = await fetch(NEXT_PUBLIC_HASURA_GRAPHQL_API, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET,
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      query: `
        query Messages {
          messages {
            user_id
            text
            id
            created_at
            user {
              name
              id
            }
          }
        }
      `
    })
  })

  console.log('response', response)
  const test = await response.json()

  res.status(200).json(test)
})