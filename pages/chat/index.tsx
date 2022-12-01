import { useEffect, useState } from 'react'
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"
import Nav from '../../components/nav'
import ScrollView from '../../components/chat/scrollView'
import Input from '../../components/chat/input'
import Spinner from '../../components/spinner'

const Chat = () => {
  const { user, error, isLoading } = useUser()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (user) {
      fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
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
        .then(response => response.json())
        .then(json => {
          if (json?.data?.messages) {
            setMessages(json.data.messages)
          }
        })
        .catch(err => console.log(err))
    }
  }, [user])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return <>
    <Nav />
    <div className='container'>
      {messages.length > 0
        ? <ScrollView messages={messages} />
        : <Spinner />}
      <Input />
    </div>
  </>
}

export default withPageAuthRequired(Chat) 