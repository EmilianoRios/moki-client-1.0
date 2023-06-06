import colors from '@/config/configColors'
import { AuthContext } from '@/context/AuthContext'
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { SearchContacts } from '../SearchContacts'
import { DocumentData, doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/config/firebase'

function Contacts() {
  const { logOut, user } = useContext(AuthContext)
  const [openProfile, setOpenProfile] = useState('none')
  const [openContacts, setOpenContacts] = useState('flex')
  const [contactChats, setContactChats] = useState<DocumentData>()

  const handleProfile = () => {
    if (openProfile === 'none' && openContacts === 'flex') {
      setOpenProfile('flex')
      setOpenContacts('none')
    } else {
      setOpenProfile('none')
      setOpenContacts('flex')
    }
  }

  useEffect(() => {
    const getContactChats = () => {
      const unsubsrcibe = onSnapshot(doc(db, 'userChats', user.uid), (doc) => {
        setContactChats(doc.data())
      })
      return unsubsrcibe
    }

    user?.uid && getContactChats()
  }, [user?.uid])

  return (
    <>
      <Flex flexDirection={'column'} minW={400} maxW={400}>
        <Flex
          bg={colors.tertiaryColor}
          p={4}
          h={14}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Text color={colors.seventhColor} as={'b'} fontSize={'1.5rem'}>
            MokiChat
          </Text>
          <Box>
            <Button onClick={handleProfile}>
              {openProfile === 'flex' ? 'Chat' : 'Mi Perfil'}
            </Button>
          </Box>
        </Flex>
        <Flex
          display={openContacts}
          bg={colors.fourthColor}
          h={'100%'}
          w={'100%'}
          flexDir={'column'}
          alignItems={'flex-start'}
          p={4}
          rowGap={2}>
          <SearchContacts />
          {contactChats &&
            Object.entries(contactChats)?.map((chat) => (
              <Flex
                key={chat[0]}
                w={'100%'}
                flexDir={'column'}
                gap={4}
                p={2}
                borderRadius={'8px 8px 8px 8px'}
                cursor={'pointer'}
                _hover={{ background: colors.tertiaryColor }}>
                <Flex columnGap={2}>
                  <Image
                    h={50}
                    w={'100%'}
                    maxW={50}
                    borderRadius={'100%'}
                    objectFit={'cover'}
                    src={chat[1].userInfo.photoURL}
                    alt={'iconUser'}
                  />
                  <Box color={colors.seventhColor}>
                    <Text as='b'>{chat[1].userInfo.displayName}</Text>
                    <Text>{chat[1].userInfo.lastMessage?.text}</Text>
                  </Box>
                </Flex>
              </Flex>
            ))}
        </Flex>
        <Flex
          display={openProfile}
          bg={colors.fourthColor}
          h={'100%'}
          w={'100%'}
          flexDir={'column'}
          alignItems={'flex-start'}
          p={4}
          rowGap={4}>
          <Flex alignItems={'center'} m={'0 auto'} flexDir={'column'} gap={4}>
            <Image
              h={300}
              w={300}
              borderRadius={'100%'}
              objectFit={'cover'}
              src={`${user?.photoURL}`}
              alt={'iconUser'}
            />
            <Flex alignItems={'center'} flexDir={'column'}>
              <Text color={colors.seventhColor} fontSize={'1.5rem'} as={'b'}>
                {user?.displayName}
              </Text>
              <Text>{user?.email}</Text>
            </Flex>
            <Flex>
              <Button onClick={logOut}>Cerrar Sesión</Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
export default Contacts
