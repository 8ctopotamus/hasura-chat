import { useEffect, useState } from 'react'
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"
import Nav from '../components/nav'
import ScrollView from '../components/chat/scrollView'
import Input from '../components/chat/input'
import Spinner from '../components/spinner'
import { hasuraFetch } from '../utils/helpers'
import { createClient } from 'graphql-ws'

let client: any

const Chat = () => {
  const { user, error, isLoading } = useUser()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    connectWS()
  }, [])

  const connectWS = async () => {
    if (typeof window === 'undefined' || !user) return 

    client = createClient({
      url: `wss://vast-terrier-84.hasura.app/v1/graphql`,
      connectionParams: {
        headers: {
          'x-hasura-user-id': user.sub,
          // TODO: protect sensitive data
          'x-hasura-admin-secret': 'XXX',
          authorization: `Bearer XXX`
        }
      }
    })

    const result = await new Promise((resolve, reject) => {
      let result: any
      client.subscribe({
        query: `{
          messages {
            created_at
            id
            text
            user {
              name
              id
              last_seen
            }
          }
        }`,
      },
      {
        next: data => {
          console.log(data)
          result = data
        },
        error: reject,
        complete: () => resolve(result)
      })
    })

    console.log(result)
    return null
  }


  // subscription MessagesSubscription {
  //   messages_stream(batch_size: 10, cursor: {initial_value: {created_at: "2022-12-01T14:20:12.486956+00:00"}}) {
  //     created_at
  //     id
  //     text
  //     user {
  //       name
  //       id
  //       last_seen
  //     }
  //   }
  // }


  // useEffect(() => {
  //   loadMessages()
  // }, [user])

  // const loadMessages = async () => {
  //   if (user) {
  //     try {
  //       const json = await hasuraFetch(
  //         `query Messages {
  //           messages {
  //             user_id
  //             text
  //             id
  //             created_at
  //             user {
  //               name
  //               id
  //             }
  //           }
  //         }
  //       `
  //       // `
  //       //   subscription MessagesSubscription {
  //       //     messages_stream(batch_size: 10, cursor: {initial_value: {created_at: "2022-12-01T14:20:12.486956+00:00"}}) {
  //       //       created_at
  //       //       id
  //       //       text
  //       //       user {
  //       //         name
  //       //         id
  //       //         last_seen
  //       //       }
  //       //     }
  //       //   }
  //       // `

  //       )
  //       console.log(json)

  //       if (json?.data?.messages) {
  //         setMessages(json.data.messages)
  //       }
  //     } catch(err) {
  //       console.log(err)
  //     }
  //   }
  // }

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
      // loadMessages()
    } catch (err) {
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
      <Input handleSubmit={handleSubmit} />
    </div>
  </>
}

export default withPageAuthRequired(Chat) 