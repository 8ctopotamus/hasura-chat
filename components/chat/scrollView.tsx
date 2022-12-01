const ScrollView = ({ messages = [] }) => {
  return <pre>{JSON.stringify(messages, null, 2)}</pre>
}

export default ScrollView