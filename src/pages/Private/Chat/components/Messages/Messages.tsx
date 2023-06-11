import { db } from '@/config/firebase'
import { ChatContext } from '@/context'
import { DocumentData, doc, onSnapshot } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { Message } from '..'

function Messages() {
  const { data } = useContext(ChatContext)
  const [messagesChat, setMessagesChat] = useState<DocumentData>()

  useEffect(() => {
    if (data.chatId) {
      const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
        doc.exists() && setMessagesChat(doc.data()?.messages)
      })

      return () => {
        unSub()
      }
    }
  }, [data.chatId])

  return (
    <>
      {messagesChat &&
        messagesChat.map((message: any) => (
          <Message key={message.id} message={message} />
        ))}
    </>
  )
}
export default Messages
