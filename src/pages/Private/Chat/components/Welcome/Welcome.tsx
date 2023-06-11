import colors from '@/config/configColors'
import { Flex, Text } from '@chakra-ui/react'

function Welcome() {
  return (
    <Flex
      flexDirection={'column'}
      position={'relative'}
      justifyContent={'space-between'}>
      <Flex
        bg={colors.secondayColor}
        justifyContent={'center'}
        alignItems={'center'}
        h={14}></Flex>
      <Flex bg={colors.primaryColor} flexDirection={'column'} p={2} gap={4}>
        <Flex
          h={700}
          w={900}
          flexDir={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          overflow={'hidden'}>
          <Flex flexDir={'column'} textAlign={'center'} gap={4}>
            <Text fontSize={'3rem'} as={'b'} color={colors.seventhColor}>
              ¡Bienvenido a MokiChat!
            </Text>
            <Text fontSize={'1.5rem'}>
              Selecciona un chat o busca un usuario para empezar a divertirte.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
export default Welcome
