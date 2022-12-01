import { useState } from "react"

const Input = () => {
  const [newMessage, setNewMessage] = useState('')

  return (
    <form>
      <input 
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
        placeholder="Type a message..."
        type="text" 
        required
      />
    </form>
  )
}

export default Input