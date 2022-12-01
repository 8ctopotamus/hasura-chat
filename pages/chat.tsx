import { useEffect, useState } from 'react'
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"
import Nav from '../components/nav'
import ScrollView from '../components/chat/scrollView'
import Input from '../components/chat/input'
import Spinner from '../components/spinner'
import { hasuraFetch } from '../utils/helpers'

const Chat = () => {
  const { user, error, isLoading } = useUser()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    loadMessages()
  }, [user])

  const loadMessages = async () => {
    if (user) {
      try {
        const json = await hasuraFetch(
          `query Messages {
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
        `)
        if (json?.data?.messages) {
          setMessages(json.data.messages)
        }
      } catch(err) {
        
      }
    }
  }

  const handleSubmit = async (text: string) => {
    if (!user) return
    
    try {
      const json = await hasuraFetch(`
        mutation MyMutation($text: String!, $user_id: String!) {
          insert_messages_one(object: {text: $text, user_id: $user_id}) {
            id
          }
        }
      `, {
        text,
        user_id: user.sub
      })
      console.log(json)
      loadMessages()
    } catch(err) {
      console.log(err)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return <>
    <Nav />
    <div className='container'>
      {(user && messages.length > 0)
        ? <ScrollView messages={messages} />
        : <Spinner />}
      <Input handleSubmit={handleSubmit}/>
    </div>
  </>
}

export default withPageAuthRequired(Chat) 