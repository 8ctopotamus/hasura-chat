import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  if (user) {
    router.push('/chat')
  }

  return (
    <div className='container'>
      <h1>Welcome to Hasura Chat!</h1>
      <h2>Log in to chat!</h2>
      <a href="/api/auth/login">
        <button>Log in</button>
      </a>
    </div>
  )
}