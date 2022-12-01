const ScrollView = ({ messages = [] }) => {
  return (
    <div className="scrollview">
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </div>
  )
}

export default ScrollView