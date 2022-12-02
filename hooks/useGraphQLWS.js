import { useEffect, useState } from 'react'
import { createClient } from 'graphql-ws'

const isBrowser = typeof window !== 'undefined'
let client


if (isBrowser) {
  client = createClient({
    url: `wss://vast-terrier-84.hasura.app/v1/graphql`,
    connectionParams: {
      headers: {
        'x-hasura-user-id': 'google-oauth2|105590787766027790775',
        'x-hasura-admin-secret': 'W5f9XwHE8RQfLcWCUN7qG19nzeTlSq2G1JQeMgMhVbOjRfF0QAqYLZBHF3ti0FcZ',
        authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9TQjJqXzhJbnFrM29KNTRVRmRLayJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6Imdvb2dsZS1vYXV0aDJ8MTA1NTkwNzg3NzY2MDI3NzkwNzc1In0sImlzcyI6Imh0dHBzOi8venlsb2NvZGVzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNTU5MDc4Nzc2NjAyNzc5MDc3NSIsImF1ZCI6WyJodHRwczovL3Zhc3QtdGVycmllci04NC5oYXN1cmEuYXBwL3YxL2dyYXBocWwiLCJodHRwczovL3p5bG9jb2Rlcy51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjY5OTEwNDkxLCJleHAiOjE2Njk5OTY4OTEsImF6cCI6InFIdWJ5TmdjdG4yWmdabmJnVkptTFdzR2NIaEtWYTNtIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.iSfjr6q4_Vo1STRr9X8bsCT-aI8Krm-T5fAX9axUNpBnCIKeNaxBdItvER33ByczUWIEVv8K3dvxKD5AVVAtJQZA7Ii6xxPyPdtCbPJXfc5cFquO2cS0h5tVYrf-01EdLA6tlX_6ne0BcLbmQ91oqCCfrYbG_kRTwkd5ranMZS6FMSFd68ddOyVVUnBUxindxM0XLPLoJOdcVWa8lwbxOtGQILUBOMluS-I0X5iHEjg8azOrCZ3a_SoCxUod6Mn-2TuxFGUgwfaf0mUU_9Qp4U4Gmg6vYU_B6-VvxjYyfaQSiVQ4IchzAACYfbDXVJfxVkrr9tGK9pnAZ9s92yyIlQeyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9TQjJqXzhJbnFrM29KNTRVRmRLayJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6Imdvb2dsZS1vYXV0aDJ8MTA1NTkwNzg3NzY2MDI3NzkwNzc1In0sImlzcyI6Imh0dHBzOi8venlsb2NvZGVzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNTU5MDc4Nzc2NjAyNzc5MDc3NSIsImF1ZCI6WyJodHRwczovL3Zhc3QtdGVycmllci04NC5oYXN1cmEuYXBwL3YxL2dyYXBocWwiLCJodHRwczovL3p5bG9jb2Rlcy51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjY5OTEwNDkxLCJleHAiOjE2Njk5OTY4OTEsImF6cCI6InFIdWJ5TmdjdG4yWmdabmJnVkptTFdzR2NIaEtWYTNtIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.iSfjr6q4_Vo1STRr9X8bsCT-aI8Krm-T5fAX9axUNpBnCIKeNaxBdItvER33ByczUWIEVv8K3dvxKD5AVVAtJQZA7Ii6xxPyPdtCbPJXfc5cFquO2cS0h5tVYrf-01EdLA6tlX_6ne0BcLbmQ91oqCCfrYbG_kRTwkd5ranMZS6FMSFd68ddOyVVUnBUxindxM0XLPLoJOdcVWa8lwbxOtGQILUBOMluS-I0X5iHEjg8azOrCZ3a_SoCxUod6Mn-2TuxFGUgwfaf0mUU_9Qp4U4Gmg6vYU_B6-VvxjYyfaQSiVQ4IchzAACYfbDXVJfxVkrr9tGK9pnAZ9s92yyIl`
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