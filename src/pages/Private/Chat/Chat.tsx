import { ChatLayout } from '@/components'
import { Contacts, PrivateChat } from '.'

function Chat() {
  return (
    <ChatLayout>
      <Contacts />
      <PrivateChat />
    </ChatLayout>
  )
}
export default Chat
