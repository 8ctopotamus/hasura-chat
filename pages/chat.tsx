import { useEffect, useState } from "react"
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"
import Nav from '../components/nav'
import ScrollView from '../components/chat/scrollView'
import Input from '../components/chat/input'
import Spinner from '../components/spinner'
import { hasuraFetch } from '../utils/helpers'
import useGraphQLWS from '../hooks/useGraphQLWS'

const Chat = () => {
  const { user, error: userError, isLoading } = useUser()
  const { value, done } = useGraphQLWS()
  const [messages, setMessages] = useState<any>([])

  console.log('NEW BATCH', value)

  console.log('CURRENT MESSAGES', messages)
  
  useEffect(() => {
    const newMessages = value?.data?.messages_stream
    if (newMessages) {
      setMessages([...messages, ...newMessages])
    }
  }, [value])

  const handleSubmit = async (text: string) => {
    if (!user) return
    try {
      await hasuraFetch(`
        mutation MyMutation($text: String!, $user_id: String!) {
          insert_messages_one(object: {text: $text, user_id: $user_id}) {
            id
          }
        }
      `, {
        text,
        user_id: user.sub
      })
    } catch (err) {
      console.log(err)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (userError) return <div>{userError.message}</div>

  return <>
    <Nav />
    <div className='container'>
      {(user && messages?.length > 0)
        ? <ScrollView messages={messages} />
        : <Spinner />}
      <Input handleSubmit={handleSubmit} />
    </div>
  </>
}

export default withPageAuthRequired(Chat) 