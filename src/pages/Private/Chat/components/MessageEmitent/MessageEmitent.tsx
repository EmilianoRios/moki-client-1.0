import colors from '@/config/configColors'
import { Flex, Icon, Image, Link, Text } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { HiDocumentArrowDown } from 'react-icons/hi2'

interface MessageEmitentProps {
  image: string
  file: string | null
  fileType: string | null
  message: string
  time: string
}

const MessageEmitent: React.FC<MessageEmitentProps> = ({
  image,
  file,
  fileType,
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
        w={'auto'}
        h={'auto'}
        flexDir={'column'}
        alignItems={'flex-end'}
        borderRadius={'8px 0px 8px 8px'}
        p={2}
        ref={scrollRefEmitent}>
        {file && fileType === 'image' ? (
          <Image src={file} alt={'file'} borderRadius={'8px 8px 8px 8px'} />
        ) : (
          ''
        )}
        {file && fileType === 'video' ? (
          <video src={file} width={'100%'} height={'100%'} controls></video>
        ) : (
          ''
        )}
        {file && fileType === 'audio' ? (
          <audio controls>
            <source src={file}></source>
          </audio>
        ) : (
          ''
        )}
        {file && fileType === 'application' ? (
          <>
            <Link href={file} isExternal>
              <Icon w={100} h={100} as={HiDocumentArrowDown} />
            </Link>
            <Text>Archivo</Text>
          </>
        ) : (
          ''
        )}
        <Text fontSize={'1rem'} wordBreak={'break-word'}>
          {message}
        </Text>
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
