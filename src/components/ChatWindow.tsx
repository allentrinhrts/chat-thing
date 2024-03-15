import { useEffect, useRef } from 'react'
import ChatMessage from '../types/ChatMessage'
import ChatBubble from './ChatBubble'
import LoadingDots from './LoadingDots'

interface Props {
  isLoading: boolean
  messages: ChatMessage[]
}

function ChatWindow({ isLoading, messages }: Props) {
  const chatWindow = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!chatWindow.current) return

    chatWindow.current.scrollTo(0, chatWindow.current.scrollHeight)
  }, [isLoading, messages])

  return (
    <div
      id="chat-window"
      ref={chatWindow}
      className="grow bg-gray-50 mb-2 px-4 pt-8 pb-2 rounded-lg overflow-y-auto shadow border"
    >
      <p className="text-xs tracking-wider font-semibold mb-4 uppercase text-center text-slate-500">Start of chat</p>
      <ul className="w-[320px]">
        {messages.map((message) => (
          <li className="mb-2" key={message.id}>
            <ChatBubble variant={message?.user_id === 1 ? 'received' : 'sent'} message={message} />
          </li>
        ))}
        {isLoading && (
          <li className="flex justify-start pt-8">
            <LoadingDots />
          </li>
        )}
      </ul>
    </div>
  )
}

export default ChatWindow
