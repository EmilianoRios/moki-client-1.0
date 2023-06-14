import { DocumentData } from 'firebase/firestore'
import { Message } from '..'

interface Props {
  messagesChat: DocumentData
}

function Messages({ messagesChat }: Props) {
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
