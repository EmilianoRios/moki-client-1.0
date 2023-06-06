import colors from '@/config/configColors'
import {
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  Icon,
  Text,
  Textarea
} from '@chakra-ui/react'
import { Field, Formik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { AiOutlinePaperClip, AiOutlinePicture } from 'react-icons/ai'
import { IoIosSend } from 'react-icons/io'
import { MdOutlineAudiotrack } from 'react-icons/md'
import * as Yup from 'yup'
import './PrivateChat.css'
import { MessageEmitent, MessageRemitent } from '..'

const PrivateChat = () => {
  const contenedorScrollRef = useRef<HTMLDivElement>(null)
  const [openMedia, setOpenMedia] = useState('none')

  const handleMedia = () => {
    if (openMedia === 'none') {
      setOpenMedia('relative')
    } else {
      setOpenMedia('none')
    }
  }

  useEffect(() => {
    if (contenedorScrollRef.current) {
      contenedorScrollRef.current.scrollTop =
        contenedorScrollRef.current.scrollHeight
    }
  }, [])

  const onSubmit = (data: any, { resetForm }: any) => {
    console.log(data)
    resetForm('')
  }

  const initialValues = {
    message: '' as string
  }

  const validationSchema = Yup.object().shape({
    message: Yup.string().required('Ingrese un mensaje...')
  })

  return (
    <>
      <Flex
        flexDirection={'column'}
        position={'relative'}
        justifyContent={'space-between'}>
        <Flex
          bg={colors.secondayColor}
          justifyContent={'center'}
          alignItems={'center'}
          h={14}>
          <Text color={colors.seventhColor} fontSize={'1.5rem'}>
            User
          </Text>
        </Flex>
        <Flex bg={colors.primaryColor} flexDirection={'column'} p={2} gap={4}>
          <Flex
            flexDirection={'column'}
            rowGap={4}
            h={700}
            w={900}
            justifyContent={'flex-end'}
            overflow={'hidden'}>
            <Flex
              w={'100%'}
              flexDirection={'column'}
              overflowY={'auto'}
              ref={contenedorScrollRef}
              maxH={'100%'}>
              <MessageEmitent
                image={
                  'https://media.discordapp.net/attachments/692471409594728509/1101368049589833778/perro_coca.jpeg?width=373&height=671'
                }
                message={
                  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem eligendi nisi tenetur amet! Nisi incidunt aspernatur sit, enim nemo porro fugit quas ipsa quod obcaecati nam! Repellat earum eius, totam pariatur saepe odit nam quisquam consequatur temporibus ea recusandae ratione culpa rerum consequuntur? Explicabo quia laudantium vitae, earum molestias aliquid.'
                }
                time={'10:12pm'}
              />
              <MessageRemitent
                image={
                  'https://media.discordapp.net/attachments/692471409594728509/1101355042876960900/chowder_con_bigote.jpg'
                }
                message={
                  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem eligendi nisi tenetur amet! Nisi incidunt aspernatur sit, enim nemo porro fugit quas ipsa quod obcaecati nam! Repellat earum eius, totam pariatur saepe odit nam quisquam consequatur temporibus ea recusandae ratione culpa rerum consequuntur? Explicabo quia laudantium vitae, earum molestias aliquid.'
                }
                time={'10:12pm'}
              />
              <MessageEmitent
                image={
                  'https://media.discordapp.net/attachments/692471409594728509/1101368049589833778/perro_coca.jpeg?width=373&height=671'
                }
                message={
                  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem eligendi nisi tenetur amet! Nisi incidunt aspernatur sit, enim nemo porro fugit quas ipsa quod obcaecati nam! Repellat earum eius, totam pariatur saepe odit nam quisquam consequatur temporibus ea recusandae ratione culpa rerum consequuntur? Explicabo quia laudantium vitae, earum molestias aliquid.'
                }
                time={'10:12pm'}
              />
            </Flex>
          </Flex>
          <Flex overflow={'hidden'}>
            <Box
              w={'100%'}
              bg={colors.seventhColor}
              borderRadius={'8px 8px 8px 8px'}>
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
                          maxHeight={'100px'}
                          minHeight={'45px'}
                        />
                      </FormControl>
                      <Flex
                        borderRadius={'8px 8px 8px 8px'}
                        m={'0 0 auto 0'}
                        p={1}
                        display={openMedia}>
                        <Grid templateColumns={'repeat(2, 1fr)'} gap={2}>
                          <Button
                            variant='unstyled'
                            bg={colors.ninethColor}
                            _hover={{ background: colors.primaryColor }}
                            rounded={'full'}>
                            <Flex
                              justifyContent={'center'}
                              alignItems={'center'}>
                              <Icon as={AiOutlinePicture} fontSize={30} />
                            </Flex>
                          </Button>
                          <Button
                            variant='unstyled'
                            bg={colors.tenthColor}
                            _hover={{ background: colors.primaryColor }}
                            rounded={'full'}>
                            <Flex
                              justifyContent={'center'}
                              alignItems={'center'}>
                              <Icon as={MdOutlineAudiotrack} fontSize={30} />
                            </Flex>
                          </Button>
                        </Grid>
                      </Flex>
                      <Button
                        variant='unstyled'
                        onClick={handleMedia}
                        _hover={{ background: colors.primaryColor }}
                        rounded={'full'}>
                        <Flex justifyContent={'center'} alignItems={'center'}>
                          <Icon as={AiOutlinePaperClip} fontSize={30} />
                        </Flex>
                      </Button>
                      <Button
                        type='submit'
                        variant='unstyled'
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
        </Flex>
      </Flex>
    </>
  )
}
export default PrivateChat
