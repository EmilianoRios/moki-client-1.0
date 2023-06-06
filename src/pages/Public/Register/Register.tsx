import { FormSiglePage } from '@/components'
import colors from '@/config/configColors'
import { auth, db, storage } from '@/config/firebase'
import { AuthContext } from '@/context/AuthContext'
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  Link,
  Text,
  VStack
} from '@chakra-ui/react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Field, Formik } from 'formik'
import { useContext, useState } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import { Link as ReactLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

function Register() {
  const [imageFile, setImageFile] = useState(null)
  const navigate = useNavigate()
  const { signUp } = useContext(AuthContext)

  const onSubmit = async (data: any, { resetForm }: any) => {
    const createUser = { ...data, image: imageFile }
    try {
      const res = await signUp(createUser.email, createUser.password)

      const storageRef = ref(storage, 'pictures/' + createUser.name)
      const uploadTask = uploadBytesResumable(storageRef, createUser.image)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              console.log('storage/unauthorized')
              break
            case 'storage/canceled':
              // User canceled the upload
              console.log('storage/unauthorized')
              break
            // ...
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              console.log('storage/unknown')
              break
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: createUser.name,
              photoURL: downloadURL
            })

            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName: createUser.name,
              email: createUser.email,
              photoURL: downloadURL
            })

            await setDoc(doc(db, 'userChats', res.user.uid), {})

            navigate('/')
          })
        }
      )
    } catch (error) {
      console.log(error, 'ADIOS')
    }
  }

  const initialValues = {
    name: '' as string,
    email: '' as string,
    password: '' as string,
    image: ''
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('NOMBRE OBLIGATORIO'),
    email: Yup.string()
      .email('CORREO NO VÁLIDO')
      .required('CORREO OBLIGATORIO'),
    password: Yup.string().required('CONTRASEÑA OBLIGATORIA'),
    image: Yup.mixed().test('image', 'IMAGEN REQUERIDA', (value) => {
      if (!value) {
        return false // El archivo es requerido
      }
      return true
    })
  })

  return (
    <FormSiglePage>
      <Flex
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        bg={colors.primaryColor}>
        <Text color={colors.seventhColor} fontSize={'1rem'} py={2}>
          Registrarse
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
                        formik.errors.name && formik.touched.name
                      )}>
                      <Field
                        bg={colors.seventhColor}
                        type='string'
                        name='name'
                        placeholder='Nombre'
                        as={Input}
                      />
                      <FormErrorMessage
                        justifyContent={'center'}
                        alignItems={'center'}>
                        {formik.errors.name}
                      </FormErrorMessage>
                    </FormControl>
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
                    <FormControl
                      isInvalid={Boolean(
                        formik.errors.image && formik.touched.image
                      )}>
                      <Field
                        id={'file'}
                        display={'relative'}
                        type='file'
                        name='image'
                        placeholder='Archivo'
                        as={Input}
                        onBlur={(e: any) => {
                          setImageFile(e.target.files[0])
                          console.log(imageFile)
                        }}
                      />
                      <label htmlFor='file'>
                        <Flex justifyContent={'center'} alignItems={'center'}>
                          <Icon as={BiImageAdd} fontSize={30} />
                          <Text fontSize={14}> Agregar foto de perfil</Text>
                        </Flex>
                      </label>
                      <FormErrorMessage
                        justifyContent={'center'}
                        alignItems={'center'}>
                        {formik.errors.image}
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
                      Registrarse
                    </Button>
                    <Text fontSize={'0.9rem'}>
                      Ya tienes una cuenta?.{' '}
                      <Link
                        as={ReactLink}
                        to={`/login`}
                        color={colors.seventhColor}>
                        Inicia sesión aqui.
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
export default Register
