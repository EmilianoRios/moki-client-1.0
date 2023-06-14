import colors from '@/config/configColors'
import { ChatContext } from '@/context'
import { Flex, Spinner, Text } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { InputMessage, Messages } from '..'
import './PrivateChat.css'
import { DocumentData, doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/config/firebase'

const PrivateChat = () => {
  const { data } = useContext(ChatContext)
  const [loadingMessages, setLoadingMessages] = useState<boolean>(true)
  const [messagesChat, setMessagesChat] = useState<DocumentData>()

  useEffect(() => {
    if (data.chatId) {
      setLoadingMessages(true)
      setMessagesChat(undefined)
      const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
        doc.exists() && setMessagesChat(doc.data()?.messages)
        setLoadingMessages(false)
      })
      return () => {
        unSub()
      }
    }
  }, [data.chatId])

  return (
    <>
      <Flex
        flexDirection={'column'}
        position={'relative'}
        justifyContent={'space-between'}>
        <Flex
          bg={colors.secondayColor}
          justifyContent={'center'}
          alignItems={'center'}
          h={14}>
          <Text color={colors.seventhColor} fontSize={'1.5rem'}>
            {data.user?.displayName}
          </Text>
        </Flex>
        <Flex bg={colors.primaryColor} flexDirection={'column'} p={2} gap={4}>
          <Flex
            flexDirection={'column'}
            rowGap={4}
            h={700}
            w={900}
            justifyContent={'flex-end'}
            overflow={'hidden'}>
            {loadingMessages && (
              <Flex justifyContent={'center'} alignItems={'center'} m={'auto'}>
                <Spinner size='xl' />
              </Flex>
            )}
            <Flex
              w={'100%'}
              flexDirection={'column'}
              overflowY={'auto'}
              maxH={'100%'}>
              {messagesChat && <Messages messagesChat={messagesChat} />}
            </Flex>
            <InputMessage />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
export default PrivateChat
