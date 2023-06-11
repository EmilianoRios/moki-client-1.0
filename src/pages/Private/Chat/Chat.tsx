import { ChatLayout } from '@/components'
import { ChatContext } from '@/context'
import { useContext } from 'react'
import { Contacts, PrivateChat, Welcome } from '.'

function Chat() {
  const { data } = useContext(ChatContext)

  return (
    <ChatLayout>
      <Contacts />
      {data.user ? <PrivateChat /> : <Welcome />}
    </ChatLayout>
  )
}
export default Chat
