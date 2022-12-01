import { useUser } from '@auth0/nextjs-auth0';
import { useEffect } from 'react';

export default () => {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      fetch('/api/messages')
        .then(response => {
          
          return response.json()
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }
  }, [user])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;


  if (user) {
    return (
      <div>
        Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
      </div>
    );
  }

  return <a href="/api/auth/login">Login</a>;
};