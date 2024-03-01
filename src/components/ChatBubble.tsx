import ChatMessage from '../types/ChatMessage'
import moment from 'moment'

interface Props {
  variant: 'sent' | 'received'
  message: ChatMessage
}

const classNames = {
  container: {
    sent: 'justify-end',
    received: 'justify-start',
  },
  bubble: {
    sent: 'bg-blue-200 dark:bg-blue-700',
    received: 'bg-gray-200 dark:bg-gray-700',
  },
}

function ChatBubble({ variant, message }: Props) {
  return (
    <div className={`flex items-start gap-2.5 ${classNames.container[variant]}`}>
      <div
        className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 rounded-xl dark:bg-gray-700 ${classNames.bubble[variant]}`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{message.user_id}</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {moment(message.timestamp).format('LT')}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message.message}</p>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
      </div>
    </div>
  )
}

export default ChatBubble
