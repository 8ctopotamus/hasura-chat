import { useEffect, useState } from "react"
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"
import Nav from '../components/nav'
import ScrollView from '../components/chat/scrollView'
import Input from '../components/chat/input'
import Bubble from '../components/chat/bubble'
import Spinner from '../components/spinner'
import { hasuraFetch } from '../utils/helpers'
import useGraphQLWS from '../hooks/useGraphQLWS'
import { Message } from "../utils/types"

const Chat = () => {
  const { user, error: userError, isLoading } = useUser()
  const { value } = useGraphQLWS()
  const [messages, setMessages] = useState<any>([])
  
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
        ? (
          <ScrollView>
            {messages.map((m: Message) => (
              <Bubble 
                message={m} 
                userId={user.sub} 
              />
            ))}
          </ScrollView>
        ): <Spinner />}
      <Input handleSubmit={handleSubmit} />
    </div>
  </>
}

export default withPageAuthRequired(Chat) 