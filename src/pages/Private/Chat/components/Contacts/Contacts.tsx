import colors from '@/config/configColors'
import { AuthContext } from '@/context/AuthContext'
import { Box, Button, Flex, Icon, Image, Text, Tooltip } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { SearchContacts } from '../SearchContacts'
import { DocumentData, doc, onSnapshot } from 'firebase/firestore'
import { RxCross1 } from 'react-icons/rx'
import { BiExit } from 'react-icons/bi'
import { db } from '@/config/firebase'
import { ChatContext } from '@/context'
import { ChatActionKind, ChatUserSelected } from '@/models'
import TruncatedText from '@/utilities/TruncateText'

function Contacts() {
  const { logOut, user } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)
  const [openProfile, setOpenProfile] = useState('none')
  const [openContacts, setOpenContacts] = useState('flex')
  const [contactChats, setContactChats] = useState<DocumentData>()

  /**
   *
   */
  const handleProfile = () => {
    if (openProfile === 'none' && openContacts === 'flex') {
      setOpenProfile('flex')
      setOpenContacts('none')
    } else {
      setOpenProfile('none')
      setOpenContacts('flex')
    }
  }

  const handleSelect = (UserSelected: ChatUserSelected) => {
    dispatch({ type: ChatActionKind.CHANGE_USER, payload: UserSelected })
  }

  useEffect(() => {
    if (user) {
      const getContactChats = () => {
        const unsubsrcibe = onSnapshot(
          doc(db, 'userChats', user.uid),
          (doc) => {
            setContactChats(doc.data())
          }
        )
        return unsubsrcibe
      }

      user?.uid && getContactChats()
    }
  }, [user])

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
            <Button
              variant='unstyled'
              onClick={handleProfile}
              _hover={{ background: colors.primaryColor }}
              rounded={'full'}>
              <Flex justifyContent={'center'} alignItems={'center'}>
                {openProfile === 'flex' ? (
                  <Icon as={RxCross1} fontSize={30} />
                ) : (
                  <Tooltip
                    hasArrow
                    placement='left'
                    label='Mi Perfil'
                    bg={colors.fifthColor}
                    color={colors.twelfthColor}>
                    <Image
                      src={(user && user.photoURL) || ''}
                      alt={'profile'}
                      rounded={'full'}
                      w={'40px'}
                      h={'40px'}
                      objectFit={'cover'}
                      _hover={{ transform: 'scale(1.1)' }}
                    />
                  </Tooltip>
                )}
              </Flex>
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
          <Flex overflowY={'scroll'} w={'100%'} flexDir={'column'}>
            {contactChats &&
              Object.entries(contactChats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat) => (
                  <Flex
                    key={chat[0]}
                    w={'100%'}
                    flexDir={'column'}
                    gap={4}
                    p={2}
                    borderRadius={'8px 8px 8px 8px'}
                    cursor={'pointer'}
                    _hover={{ background: colors.tertiaryColor }}
                    onClick={() => {
                      handleSelect(chat[1].userInfo)
                    }}>
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
                      <Flex
                        color={colors.seventhColor}
                        justifyContent={'center'}
                        flexDir={'column'}>
                        <Text as='b'>{chat[1].userInfo.displayName}</Text>
                        {chat[1].lastMessage?.text &&
                          TruncatedText(chat[1].lastMessage?.text, 30)}
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
          </Flex>
          {contactChats && Object.entries(contactChats).length === 0 ? (
            <Flex m={'0 auto'}>
              <Text>No tienes ningún contacto.</Text>
            </Flex>
          ) : (
            ''
          )}
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
              <Button
                _hover={{ background: colors.ninethColor }}
                onClick={logOut}>
                Cerrar Sesión
                <Icon as={BiExit} ml={1} fontSize={20} />
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
export default Contacts
