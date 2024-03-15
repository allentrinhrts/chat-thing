import { useEffect, useRef, useState } from 'react'
import ChatInput from './ChatInput'
import ChatWindow from './ChatWindow'
import ChatMessage from '../types/ChatMessage'
import useAxios from '../hooks/useAxios'
import ChatFab from './ChatFab'
import ChatHeader from './ChatHeader'
import useHighlighter from '../hooks/useHighlighter'

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
  const inputRef = useRef<React.Ref<HTMLInputElement>>(null)

  const [getData, { response, error, isLoading }] = useAxios(`/completions?prompt=${message?.message}`)
  const highlightElement = useHighlighter()

  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (isChatOpen && document.activeElement === inputRef.current) {
          setIsChatOpen(false)
        }
      }
    })

    return () => {
      window.removeEventListener('keydown', () => {})
    }
  })

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
    // Sets focus to the input when the chat is opened
    setIsChatOpen((prev) => {
      if (!prev) {
        inputRef.current!.focus()
      }

      return !prev
    })
  }

  if (error) {
    return <p>error</p>
  }

  return (
    <div id="chat-wrapper" className="flex flex-col w-full h-full">
      <div
        id="chat"
        className={`flex flex-col w-full h-full relative z-40 transition rounded-lg duration-300 shadow bg-white ${
          isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
        }`}
      >
        <ChatHeader onClose={handleToggleChat} />
        <ChatWindow isLoading={isLoading && message !== null} messages={messages} />
        <ChatInput isLoading={isLoading && message !== null} onSubmit={handleSubmit} ref={inputRef} />
      </div>
      <ChatFab isShown={!isChatOpen} onClick={handleToggleChat} />
    </div>
  )
}

export default Chat
