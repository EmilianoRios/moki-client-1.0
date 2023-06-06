import colors from '@/config/configColors'
import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

interface MessageEmitentProps {
  image: string
  message: string
  time: string
}

const MessageEmitent: React.FC<MessageEmitentProps> = ({
  image,
  message,
  time
}) => {
  return (
    <Flex ml={'auto'} w={'100%'} gap={4} maxW={'70%'} alignItems={'flex-start'}>
      <Flex
        bg={colors.fifthColor}
        boxShadow={'0 3px 6px rgba(0,0,0,0.3)'}
        mb={2}
        w={'100%'}
        h={'auto'}
        flexDir={'column'}
        alignItems={'center'}
        borderRadius={'8px 0px 8px 8px'}
        p={2}>
        <Text fontSize={'1rem'}>{message}</Text>
        <Text as={'span'} alignSelf={'flex-end'}>
          {time}
        </Text>
      </Flex>
      <Image
        h={50}
        w={'100%'}
        maxW={50}
        borderRadius={'100%'}
        objectFit={'cover'}
        src={image}
        alt={'iconUser'}
      />
    </Flex>
  )
}

export default MessageEmitent
