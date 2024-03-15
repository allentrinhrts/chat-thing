import { useEffect, useState } from 'react'
import ChatInput from './ChatInput'
import ChatWindow from './ChatWindow'
import ChatMessage from '../types/ChatMessage'
import useAxios from '../hooks/useAxios'
import ChatFab from './ChatFab'
import ChatHeader from './ChatHeader'

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
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false)

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

  function handleToggleChat() {
    setIsChatOpen((prev) => !prev)
  }

  if (error) {
    return <p>error</p>
  }

  return (
    <div id="chat-wrapper" className="flex flex-col w-full h-full">
      <div
        id="chat"
        className={`flex flex-col w-full h-full relative z-40 transition duration-300 ${
          isChatOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0 pointer-events-none'
        }`}
      >
        <ChatHeader onClose={handleToggleChat} />
        <ChatWindow isLoading={isLoading && message !== null} messages={messages} />
        <ChatInput isLoading={isLoading && message !== null} onSubmit={handleSubmit} />
      </div>
      <ChatFab isShown={!isChatOpen} onClick={handleToggleChat} />
    </div>
  )
}

export default Chat
