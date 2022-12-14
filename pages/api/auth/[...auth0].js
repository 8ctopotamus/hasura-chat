import { handleAuth, handleLogin } from "@auth0/nextjs-auth0"

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          audience: 'https://vast-terrier-84.hasura.app/v1/graphql',
          scope: 'openid profile email',
        }
      })
    } catch(error) {
      res.status(error.status || 400).end(error.message)
    }
  }
})