import { useEffect, useState } from 'react'
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"
import Nav from '../../components/nav'
import ScrollView from '../../components/chat/scrollView'
import Input from '../../components/chat/input'

const Chat = () => {
  const { user, error, isLoading } = useUser()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (user) {
      fetch('/api/messages')
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
      <ScrollView messages={messages} />
      <Input />
    </div>
  </>
}

export default withPageAuthRequired(Chat) 