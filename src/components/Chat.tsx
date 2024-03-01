import { useEffect, useState } from 'react'
import ChatInput from './ChatInput'
import ChatWindow from './ChatWindow'
import ChatMessage from '../types/ChatMessage'
import useAxios from '../hooks/useAxios'

const initialMessageState = {
  id: new Date().toISOString(),
  message: 'Welcome to the Landstar Copilot. How can I help you?',
  user_id: 1,
  date: new Date().toDateString(),
  timestamp: new Date().toISOString(),
}

function Chat() {
  const [message, setMessage] = useState<ChatMessage | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([{ ...initialMessageState }])

  const [getData, { response, error, isLoading }] = useAxios(`/completions?prompt=${message?.message}`)

  useEffect(() => {
    if (!response) {
      return
    }

    setMessages((prevMessages: ChatMessage[]) => [
      ...prevMessages,
      { ...initialMessageState, id: new Date().toISOString(), message: response.data.choices[0].message.content },
    ])
  }, [response])

  useEffect(() => {
    if (!message) {
      return
    }

    setMessages((prevMessages) => [...prevMessages, message])
    getData()
  }, [message])

  function handleSubmit(message: ChatMessage) {
    setMessage(message)
  }

  if (error) {
    return error
  }

  return (
    <div className="flex flex-col w-full h-full">
      <ChatWindow isLoading={isLoading && message !== null} messages={messages} />
      <ChatInput isLoading={isLoading && message !== null} onSubmit={handleSubmit} />
    </div>
  )
}

export default Chat
