import colors from '@/config/configColors'
import { Box, Button, Flex, Link, Text } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'

function NotFound() {
  return (
    <Flex
      alignContent={'center'}
      justifyContent={'center'}
      alignItems={'center'}
      w={'100%'}
      h={'100vh'}
      flexDirection={'column'}>
      <Box>
        <Text
          color={colors.primaryColor}
          fontSize={{ base: '10rem', lg: '20rem' }}>
          404
        </Text>
      </Box>
      <Box position={'absolute'} pt={{ base: 40, lg: 80 }}>
        <Text fontSize={{ base: '2rem', lg: '6rem' }}>
          Página no encontrada.
        </Text>
      </Box>
      <Link as={ReactLink} to={'/'} pt={{ base: 10, lg: 0 }}>
        <Button
          bg={colors.tertiaryColor}
          _hover={{
            bg: colors.fourthColor
          }}>
          Volver al Inicio
        </Button>
      </Link>
    </Flex>
  )
}

export default NotFound
