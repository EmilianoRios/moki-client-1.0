import { FormSiglePage } from '@/components'
import colors from '@/config/configColors'
import { AuthContext } from '@/context/AuthContext'
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  VStack,
  Link
} from '@chakra-ui/react'
import { Field, Formik } from 'formik'
import { useContext } from 'react'
import { Link as ReactLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

function Login() {
  const navigate = useNavigate()
  const { signIn } = useContext(AuthContext)

  const onSubmit = async (data: any) => {
    try {
      await signIn(data.email, data.password)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const initialValues = {
    email: '' as string,
    password: '' as string
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('CORREO NO VÁLIDO')
      .required('CORREO OBLIGATORIO'),
    password: Yup.string().required('CONTRASEÑA OBLIGATORIA')
  })

  return (
    <FormSiglePage>
      <Flex
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        bg={colors.primaryColor}>
        <Text color={colors.seventhColor} fontSize={'1rem'} py={2}>
          Iniciar Sesión
        </Text>
        <Flex w={'100%'} justifyContent={'center'} alignItems={'center'}>
          <Flex display={'column'} w={'70%'} pb={2}>
            <Formik
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              initialValues={initialValues}>
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  <VStack>
                    <FormControl
                      isInvalid={Boolean(
                        formik.errors.email && formik.touched.email
                      )}
                      mb={4}>
                      <Field
                        bg={colors.seventhColor}
                        type='string'
                        name='email'
                        placeholder='Correo'
                        as={Input}
                      />
                      <FormErrorMessage
                        justifyContent={'center'}
                        alignItems={'center'}>
                        {formik.errors.email}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formik.errors.password && formik.touched.password
                      )}>
                      <Field
                        bg={colors.seventhColor}
                        type='password'
                        name='password'
                        placeholder='Contraseña'
                        as={Input}
                      />
                      <FormErrorMessage
                        justifyContent={'center'}
                        alignItems={'center'}>
                        {formik.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                    <Button
                      type='submit'
                      bg={colors.tertiaryColor}
                      _hover={{
                        bg: colors.fourthColor
                      }}
                      p={4}
                      w={'80%'}
                      color={colors.seventhColor}>
                      Iniciar Sesión
                    </Button>
                    <Text fontSize={'0.9rem'}>
                      No tienes una cuenta?.{' '}
                      <Link
                        as={ReactLink}
                        to={`/register`}
                        color={colors.seventhColor}>
                        Créala aqui.
                      </Link>
                    </Text>
                  </VStack>
                </form>
              )}
            </Formik>
          </Flex>
        </Flex>
      </Flex>
    </FormSiglePage>
  )
}
export default Login
