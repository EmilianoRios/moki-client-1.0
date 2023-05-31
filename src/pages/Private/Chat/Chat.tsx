import { ChatLayout } from '@/components'
import colors from '@/config/configColors'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { MessageEmitent, MessageRemitent } from '.'
import './Chat.css'

function Chat() {
  const contenedorScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contenedorScrollRef.current) {
      contenedorScrollRef.current.scrollTop =
        contenedorScrollRef.current.scrollHeight
    }
  }, [])

  return (
    <ChatLayout>
      <Flex
        flexDirection={'column'}
        position={'relative'}
        justifyContent={'space-between'}>
        <Box bg={colors.secondayColor} textAlign={'center'}>
          Title
        </Box>
        <Flex bg={colors.primaryColor} flexDirection={'column'} p={2} gap={4}>
          <Flex
            flexDirection={'column'}
            rowGap={4}
            h={600}
            w={600}
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
                  'https://media.discordapp.net/attachments/692471409594728509/1101367819616124968/Perro_en_media.png'
                }
                message={
                  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem eligendi nisi tenetur amet! Nisi incidunt aspernatur sit, enim nemo porro fugit quas ipsa quod obcaecati nam! Repellat earum eius, totam pariatur saepe odit nam quisquam consequatur temporibus ea recusandae ratione culpa rerum consequuntur? Explicabo quia laudantium vitae, earum molestias aliquid.'
                }
                time={'10:10pm'}
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
              <MessageRemitent
                image={
                  'https://media.discordapp.net/attachments/692471409594728509/1101367819616124968/Perro_en_media.png'
                }
                message={
                  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem eligendi nisi tenetur amet! Nisi incidunt aspernatur sit, enim nemo porro fugit quas ipsa quod obcaecati nam! Repellat earum eius, totam pariatur saepe odit nam quisquam consequatur temporibus ea recusandae ratione culpa rerum consequuntur? Explicabo quia laudantium vitae, earum molestias aliquid.'
                }
                time={'10:10pm'}
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
              <MessageRemitent
                image={
                  'https://media.discordapp.net/attachments/692471409594728509/1101367819616124968/Perro_en_media.png'
                }
                message={
                  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem eligendi nisi tenetur amet! Nisi incidunt aspernatur sit, enim nemo porro fugit quas ipsa quod obcaecati nam! Repellat earum eius, totam pariatur saepe odit nam quisquam consequatur temporibus ea recusandae ratione culpa rerum consequuntur? Explicabo quia laudantium vitae, earum molestias aliquid.'
                }
                time={'10:10pm'}
              />
              <MessageEmitent
                image={
                  'https://media.discordapp.net/attachments/692471409594728509/1101368049589833778/perro_coca.jpeg?width=373&height=671'
                }
                message={
                  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem eligendi nisi tenetur amet! Nisi incidunt aspernatur sit, enim nemo porro fugit quas ipsa quod obcaecati nam! Repellat earum eius, totam pariatur saepe odit nam quisquam consequatur temporibus ea recusandae ratione culpa rerum consequuntur? Explicabo quia laudantium vitae, earum molestias aliquid.'
                }
                time={'10:14pm'}
              />
            </Flex>
          </Flex>
          <Flex bg={colors.seventhColor}>
            <Text>InputMessage</Text>
          </Flex>
        </Flex>
      </Flex>
    </ChatLayout>
  )
}
export default Chat
