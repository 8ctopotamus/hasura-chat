import { useEffect, useState } from 'react'
import { createClient } from 'graphql-ws'

const isBrowser = typeof window !== 'undefined'
let client

if (isBrowser) {
  client = createClient({
    url: `wss://vast-terrier-84.hasura.app/v1/graphql`,
    connectionParams: {
      headers: {
        'x-hasura-user-id': 'XXX',
        'x-hasura-admin-secret': 'XXX',
        authorization: `Bearer XXX`
      },
    },
  })
}

function useGraphQLWS(payload) {
  const [{ value, error, done }, setState] = useState({
    value: undefined,
    error: undefined,
    done: false,
  });

  useEffect(() => {
    const unsubscribe = client.subscribe({
      query: `
        subscription MessagesSubscription {
          messages_stream(batch_size: 10, cursor: {initial_value: {created_at: "2022-12-01T14:20:12.486956+00:00"}}) {
            created_at
            id
            text
            user {
              name
              id
              last_seen
            }
          }
        }
      `
    }, {
      next: (value) => setState((state) => {console.log('VAL!',value); return ({ ...state, value, done: false })}),
      error: (error) => setState((state) => ({ ...state, error, done: true })),
      complete: () => setState((state) => ({ ...state, done: true })),
    });
    return () => unsubscribe();
  }, [payload]);

  if (error) throw error;
  return { value, done };
}

export default useGraphQLWS