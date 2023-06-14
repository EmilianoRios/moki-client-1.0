import { AuthContext, ChatContext } from '@/context'
import { MessageModel } from '@/models'
import { useContext, useEffect, useState } from 'react'
import { MessageEmitent, MessageRemitent } from '..'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

interface Props {
  message: MessageModel
}

function Message({ message }: Props) {
  const { user } = useContext(AuthContext)
  const { data } = useContext(ChatContext)
  const [time, setTime] = useState<string>('')

  const handleTimeStampo = (currentDate: any) => {
    const timestamp = new Date(
      currentDate.seconds * 1000 + currentDate.nanoseconds / 1000000
    )

    const timeElapsed = formatDistanceToNow(timestamp, { locale: es })

    return timeElapsed
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(handleTimeStampo(message.date))
    }, 1000) // Actualizar cada segundo

    return () => {
      clearInterval(intervalId)
    }
  }, [message])

  return (
    <>
      {message.senderId === user?.uid ? (
        <MessageEmitent
          image={user?.photoURL as string}
          message={message.text}
          file={message.file ? message.file : null}
          fileType={message.fileType ? message.fileType : null}
          time={time}
        />
      ) : (
        <MessageRemitent
          image={data.user?.photoURL as string}
          message={message.text}
          file={message.file ? message.file : null}
          fileType={message.fileType ? message.fileType : null}
          time={time}
        />
      )}
    </>
  )
}
export default Message
