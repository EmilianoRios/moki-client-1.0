import { AuthContext, ChatContext } from '@/context'
import { MessageModel } from '@/models'
import { useContext } from 'react'
import { MessageEmitent, MessageRemitent } from '..'

interface Props {
  message: MessageModel
}

function Message({ message }: Props) {
  const { user } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  return (
    <>
      {message.senderId === user?.uid ? (
        <MessageEmitent
          image={user?.photoURL as string}
          message={message.text}
          file={message.file ? message.file : null}
          fileType={message.fileType ? message.fileType : null}
          time={'ahora'}
        />
      ) : (
        <MessageRemitent
          image={data.user?.photoURL as string}
          message={message.text}
          file={message.file ? message.file : null}
          fileType={message.fileType ? message.fileType : null}
          time={'ahora'}
        />
      )}
    </>
  )
}
export default Message
