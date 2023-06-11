import colors from '@/config/configColors'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface FormSiglePageProps {
  children: React.ReactNode
}

const FormSiglePage: React.FC<FormSiglePageProps> = ({ children }) => {
  return (
    <>
      <Flex
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        h={'100vh'}>
        <Flex
          flexDir={'column'}
          borderRadius={'8px 8px 8px 8px'}
          overflow={'hidden'}>
          <Flex
            m={'auto'}
            justifyContent={'center'}
            alignItems={'center'}
            w={450}
            h={50}
            bg={colors.tertiaryColor}
            color={colors.seventhColor}>
            <Text fontSize={'2rem'} as={'b'}>
              MokiChat
            </Text>
          </Flex>
          {children}
        </Flex>
      </Flex>
    </>
  )
}

export default FormSiglePage
