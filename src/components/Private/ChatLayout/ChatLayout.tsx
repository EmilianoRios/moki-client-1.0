import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface ChatLayoutProps {
  children: React.ReactNode
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  return (
    <Flex
      alignContent={'center'}
      justifyContent={'center'}
      alignItems={'center'}
      h={'100vh'}
      w={'100%'}>
      <Flex>
        <Text>Contacts</Text>
      </Flex>
      <Flex>{children}</Flex>
    </Flex>
  )
}

export default ChatLayout
