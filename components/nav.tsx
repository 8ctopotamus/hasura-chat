import { useUser } from "@auth0/nextjs-auth0"

const Nav = () => {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <nav>
      <div className="container">
        <strong>Hasura Chat</strong>

        {user ? (
          <span>Welcome {user.name || user.email} | <a href="/api/auth/logout">Logout</a></span>
        ) : (
          <a href="/api/auth/login">Login</a>
        )}
      </div>
    </nav>
  )
}

export default Nav