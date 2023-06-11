import colors from '@/config/configColors'
import { ChatContext } from '@/context'
import { Flex, Text } from '@chakra-ui/react'
import { useContext, useEffect, useRef } from 'react'
import { InputMessage, Messages } from '..'
import './PrivateChat.css'

const PrivateChat = () => {
  const { data } = useContext(ChatContext)

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
            <Flex
              w={'100%'}
              flexDirection={'column'}
              overflowY={'auto'}
              maxH={'100%'}>
              <Messages />
            </Flex>
            <InputMessage />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
export default PrivateChat
