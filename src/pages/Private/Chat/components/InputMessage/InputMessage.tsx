import colors from '@/config/configColors'
import { db, storage } from '@/config/firebase'
import { AuthContext, ChatContext } from '@/context'
import PreviewFile from '@/utilities/PreviewImage'
import TruncatedText from '@/utilities/TruncateText'
import {
  Box,
  Button,
  Flex,
  FormControl,
  Icon,
  Textarea
} from '@chakra-ui/react'
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Field, Formik, FormikHelpers } from 'formik'
import { ChangeEvent, useContext, useState } from 'react'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { FaFileAudio } from 'react-icons/fa'
import { HiDocument } from 'react-icons/hi2'
import { IoIosSend } from 'react-icons/io'
import { MdVideoFile } from 'react-icons/md'
import { v4 as uuid } from 'uuid'
import * as Yup from 'yup'

function InputMessage() {
  const { user } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const [inputFile, setInputFile] = useState<File | undefined>(undefined)
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false)

  const onSubmit = async (
    values: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) => {
    setIsSendingMessage(true)
    if (inputFile) {
      const fileType = inputFile['type'].split('/')[0]

      let storageRef = ref(storage, 'chatsimage/' + uuid())

      if (fileType === 'application') {
        storageRef = ref(storage, 'chatsdocuments/' + inputFile.name)
      } else if (fileType === 'video') {
        storageRef = ref(storage, 'chatsvideos/' + uuid())
      } else if (fileType === 'audio') {
        storageRef = ref(storage, 'chatsaudio/' + uuid())
      }

      const uploadTask = uploadBytesResumable(storageRef, inputFile)

      uploadTask.on(
        'state_changed',
        () => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              console.log('Ha ocurrido un error storage/unauthorized.')
              break
            case 'storage/canceled':
              // User canceled the upload
              console.log('Ha ocurrido un error storage/canceled.')
              break
            // ...
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              console.log('Ha ocurrido un error storage/unknown.')
              break
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            if (data.chatId) {
              await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text: values.message,
                  senderId: user?.uid,
                  date: Timestamp.now(),
                  file: downloadURL,
                  fileType: fileType
                })
              })
              setInputFile(undefined)
              actions.resetForm()
              setIsSendingMessage(false)
            }
          })
        }
      )
    } else {
      await updateDoc(doc(db, 'chats', data.chatId as string), {
        messages: arrayUnion({
          id: uuid(),
          text: values.message,
          senderId: user?.uid,
          date: Timestamp.now()
        })
      })
    }

    if (user) {
      await updateDoc(doc(db, 'userChats', user.uid), {
        [data.chatId + '.lastMessage']: {
          text: values.message
        },
        [data.chatId + '.date']: serverTimestamp()
      })
    }

    if (data.user) {
      await updateDoc(doc(db, 'userChats', data.user.uid), {
        [data.chatId + '.lastMessage']: {
          text: values.message
        },
        [data.chatId + '.date']: serverTimestamp()
      })
    }

    setInputFile(undefined)
    actions.resetForm()
    setIsSendingMessage(false)
  }

  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && setInputFile(e.target.files[0])
  }

  const deleteImageFile = () => {
    setInputFile(undefined)
  }

  interface MyFormValues {
    message: string
    file: File | undefined
  }

  const initialValues: MyFormValues = {
    message: '',
    file: undefined
  }

  const validationSchema = Yup.object().shape({
    message: Yup.string().required('Ingrese un mensaje.'),
    file: Yup.mixed()
  })

  return (
    <Flex>
      <Box w={'100%'} bg={colors.seventhColor} borderRadius={'8px 8px 8px 8px'}>
        {inputFile && inputFile['type'].split('/')[0] === 'image' ? (
          <>
            <Flex flexDir={'column'} p={2} onClick={deleteImageFile}>
              <PreviewFile
                file={inputFile}
                width={100}
                height={100}
                borderRadius={'8px 8px 8px 8px'}
              />
            </Flex>
          </>
        ) : (
          ''
        )}
        {inputFile && inputFile['type'].split('/')[0] === 'audio' ? (
          <>
            <Flex flexDir={'column'} p={2} onClick={deleteImageFile}>
              <Flex
                flexDir={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={1}>
                <Icon as={FaFileAudio} w={100} h={100} />
                {TruncatedText(inputFile.name, 30)}
              </Flex>
            </Flex>
          </>
        ) : (
          ''
        )}
        {inputFile && inputFile['type'].split('/')[0] === 'application' ? (
          <>
            <Flex flexDir={'column'} p={2} onClick={deleteImageFile}>
              <Flex
                flexDir={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={1}>
                <Icon as={HiDocument} w={100} h={100} />
                {TruncatedText(inputFile.name, 30)}
              </Flex>
            </Flex>
          </>
        ) : (
          ''
        )}
        {inputFile && inputFile['type'].split('/')[0] === 'video' ? (
          <>
            <Flex flexDir={'column'} p={2} onClick={deleteImageFile}>
              <Flex
                flexDir={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={1}>
                <Icon as={MdVideoFile} w={100} h={100} />
                {TruncatedText(inputFile.name, 30)}
              </Flex>
            </Flex>
          </>
        ) : (
          ''
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Flex p={2} columnGap={2}>
                <FormControl
                  isInvalid={Boolean(
                    formik.errors.message && formik.touched.message
                  )}>
                  <Field
                    type={'string'}
                    name={'message'}
                    variant={'filled'}
                    placeholder={'Mensaje'}
                    as={Textarea}
                    maxLength={2000}
                    maxHeight={'100px'}
                    minHeight={'45px'}
                  />
                </FormControl>
                <FormControl
                  display={'none'}
                  isInvalid={Boolean(
                    formik.errors.file && formik.touched.file
                  )}>
                  <Flex>
                    <Field
                      id={'file'}
                      type={'file'}
                      accept='image/*, video/*, audio/*,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,.pptx'
                      name={'image'}
                      onChange={handleImageFile}
                    />
                  </Flex>
                </FormControl>
                <Button
                  variant='unstyled'
                  _hover={{ background: colors.primaryColor }}
                  rounded={'full'}>
                  <Flex
                    justifyContent={'center'}
                    alignItems={'center'}
                    mt={'5px'}>
                    <label htmlFor={'file'}>
                      <Icon as={AiOutlinePaperClip} fontSize={30} />
                    </label>
                  </Flex>
                </Button>
                <Button
                  isLoading={isSendingMessage}
                  type='submit'
                  _hover={{ background: colors.primaryColor }}
                  bg={colors.sixthColor}
                  rounded={'full'}>
                  <Flex justifyContent='center' alignItems='center'>
                    <Icon as={IoIosSend} fontSize={30} />
                  </Flex>
                </Button>
              </Flex>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  )
}
export default InputMessage
