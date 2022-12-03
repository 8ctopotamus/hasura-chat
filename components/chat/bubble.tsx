import { Message } from '../../utils/types'

const Bubble = ({ message, userId } : { message: Message, userId: string }) => {
  const { 
    id,
    text,
    created_at,
    user,
  } = message
  
  const isMe = userId === user.id
  const meClass = isMe ? 'me' : ''

  return (
    <div className={`bubble ${meClass}`} key={id}>
      <div>
        <>
          <strong>{user.name}</strong> {created_at}
          <p>{text}</p>
        </>
      </div>
    </div>
  )
}

export default Bubble