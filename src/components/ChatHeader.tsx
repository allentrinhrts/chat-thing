import { XMarkIcon } from '@heroicons/react/16/solid'

interface Props {
  onClose: () => void
}

function ChatHeader({ onClose }: Props) {
  return (
    <div id="chat-header" className="flex justify-end p-2">
      <button onClick={onClose}>
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  )
}

export default ChatHeader
