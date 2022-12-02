import { useState } from "react"

const Input = ({ handleSubmit }) => {
  const [text, setText] = useState('')

  return (
    <form onSubmit={e => {
      e.preventDefault()
      handleSubmit(text)
      setText('')
    }}>
      <input 
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type a message..."
        type="text" 
        required
      />
    </form>
  )
}

export default Input