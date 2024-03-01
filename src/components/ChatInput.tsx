import { Button, TextInput } from 'flowbite-react'
import { PaperAirplaneIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'
import ChatMessage from '../types/ChatMessage'

interface Props {
  isLoading: boolean
  onSubmit: (message: ChatMessage) => void
}

function ChatInput({ isLoading, onSubmit }: Props) {
  const [message, setMessage] = useState<string>('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!message.trim() || isLoading) return

    onSubmit({
      message,
      timestamp: new Date().toISOString(),
      user_id: 123,
      date: new Date().toDateString(),
      id: new Date().toISOString(),
    })

    setMessage('')
  }

  return (
    <>
      <form className="relative" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <TextInput
            value={message}
            className="grow"
            placeholder="Type a message"
            shadow
            onChange={(e) => setMessage(e.target.value)}
          />
          {!isLoading && message.length !== 0 && (
            <Button type="submit">
              Send
              <PaperAirplaneIcon className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </form>
    </>
  )
}

export default ChatInput
