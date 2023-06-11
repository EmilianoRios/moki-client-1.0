import colors from '@/config/configColors'
import { Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'

interface MessageEmitentProps {
  image: string
  file: string | null
  message: string
  time: string
}

const MessageEmitent: React.FC<MessageEmitentProps> = ({
  image,
  file,
  message,
  time
}) => {
  const scrollRefEmitent = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRefEmitent.current?.scrollIntoView({
      behavior: 'smooth'
    })
  })

  return (
    <Flex ml={'auto'} gap={4} maxW={'70%'} alignItems={'flex-start'}>
      <Flex
        bg={colors.fifthColor}
        boxShadow={'0 3px 6px rgba(0,0,0,0.3)'}
        mb={2}
        w={'100%'}
        h={'auto'}
        flexDir={'column'}
        alignItems={'center'}
        borderRadius={'8px 0px 8px 8px'}
        p={2}
        ref={scrollRefEmitent}>
        {file && (
          <Image src={file} alt={'file'} borderRadius={'8px 8px 8px 8px'} />
        )}
        <Text fontSize={'1rem'}>{message}</Text>
        <Text fontSize={'0.8rem'} as={'span'} alignSelf={'flex-end'}>
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
