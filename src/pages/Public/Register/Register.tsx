import { FormSiglePage } from '@/components'
import colors from '@/config/configColors'
import { db, storage } from '@/config/firebase'
import { AuthContext } from '@/context/AuthContext'
import PreviewFile from '@/utilities/PreviewImage'
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  Link,
  Progress,
  Text,
  VStack
} from '@chakra-ui/react'
import { FirebaseError } from 'firebase/app'
import { updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Field, Formik, FormikHelpers } from 'formik'
import { ChangeEvent, useContext, useState } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import { Link as ReactLink, useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import * as Yup from 'yup'

function Register() {
  const [imageFile, setImageFile] = useState<File | undefined>(undefined)
  const [isLoadingRegister, setIsLoadingRegister] = useState(false)
  const [progressBar, setProgressBar] = useState<number | null>(null)
  const [errorCodeAuth, setErrorCodeAuth] = useState<string>('')
  const [errorImage, setErrorImage] = useState<string>('')

  const navigate = useNavigate()
  const { signUp } = useContext(AuthContext)

  const onSubmit = async (
    values: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) => {
    setIsLoadingRegister(true)
    const createUser = { ...values, image: imageFile }
    try {
      if (createUser.image) {
        setErrorImage('')
        const res = await signUp(createUser.email, createUser.password)
        const storageRef = ref(storage, 'pictures/' + uuid())
        const uploadTask = uploadBytesResumable(storageRef, createUser?.image)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + 1
            setProgressBar(progress)
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                setErrorCodeAuth('Ha ocurrido un error al crear tu cuenta.')
                break
              case 'storage/canceled':
                // User canceled the upload
                setErrorCodeAuth('Se ha cancelado la operación.')
                break
              // ...
              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                setErrorCodeAuth('Ha ocurrido un error al crear tu cuenta.')
                break
            }
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
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
                actions.resetForm({ values })
                navigate('/')
                setIsLoadingRegister(false)
              }
            )
          }
        )
      } else {
        setErrorImage('No seleccionado una imagen de perfil!.')
        setIsLoadingRegister(false)
      }
    } catch (error) {
      const firebaseError = error as FirebaseError

      if (firebaseError.code === 'auth/email-already-in-use') {
        // Mostrar mensaje de correo electrónico ya en uso al usuario
        setErrorCodeAuth('El usuario ya esta registrado.')
      } else if (firebaseError.code === 'auth/invalid-email') {
        // Mostrar mensaje de correo electrónico inválido al usuario
        setErrorCodeAuth('El usuario ya esta registrado.')
      } else if (firebaseError.code === 'auth/weak-password') {
        // Mostrar mensaje de contraseña inválida al usuario
        setErrorCodeAuth('La contraseña es muy débil.')
      } else {
        setErrorCodeAuth('Ha ocurrido un error.')
      }
    }
  }

  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorImage('')
    e.target.files && setImageFile(e.target.files[0])
  }

  interface MyFormValues {
    name: string
    email: string
    password: string
    image: File | undefined
  }

  const initialValues: MyFormValues = {
    name: '',
    email: '',
    password: '',
    image: undefined
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('NOMBRE OBLIGATORIO'),
    email: Yup.string()
      .email('CORREO NO VÁLIDO')
      .required('CORREO OBLIGATORIO'),
    password: Yup.string()
      .min(6, 'SE REQUIEREN 6 O MÁS CARACTERES')
      .required('CONTRASEÑA OBLIGATORIA'),
    image: Yup.mixed()
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
                      )}>
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
                      <Flex display={'none'}>
                        <Field
                          id={'file'}
                          type='file'
                          name='image'
                          onChange={handleImageFile}
                        />
                      </Flex>
                      <label htmlFor='file'>
                        <Flex
                          justifyContent={'center'}
                          alignItems={'center'}
                          flexDir={'column'}>
                          <Flex cursor={'pointer'} flexDir={'column'}>
                            <Flex>
                              <Icon as={BiImageAdd} fontSize={30} />
                              <Text fontSize={14} m={'auto'}>
                                Agregar foto de perfil
                              </Text>
                            </Flex>
                            <Flex flexDir={'column'}>
                              {imageFile && (
                                <>
                                  <PreviewFile
                                    file={imageFile}
                                    width={50}
                                    height={50}
                                    borderRadius={'full'}
                                  />
                                </>
                              )}
                            </Flex>
                          </Flex>
                        </Flex>
                      </label>
                      {errorImage && (
                        <Text color={colors.eleventhColor}>{errorImage}</Text>
                      )}
                      <FormErrorMessage
                        justifyContent={'center'}
                        alignItems={'center'}>
                        {formik.errors.image}
                      </FormErrorMessage>
                    </FormControl>
                    <Button
                      isLoading={isLoadingRegister}
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
                    {errorCodeAuth && (
                      <Text color={colors.eleventhColor}>{errorCodeAuth}</Text>
                    )}
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
      {progressBar && <Progress color={'green'} value={progressBar} />}
    </FormSiglePage>
  )
}
export default Register
