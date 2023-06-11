import colors from '@/config/configColors'
import { db } from '@/config/firebase'
import { AuthContext } from '@/context/AuthContext'
import {
  Box,
  Divider,
  Flex,
  Image,
  Input,
  Spinner,
  Text
} from '@chakra-ui/react'
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'
import { ChangeEvent, useContext, useState } from 'react'

function SearchContacts() {
  const [userToSearch, setUserToSearch] = useState('')
  const [isSearchingUser, setIsSearchingUser] = useState(false)
  const [usersFinded, setUsersFinded] = useState<DocumentData>()
  const { user } = useContext(AuthContext)

  const handleSearchUser = async () => {
    if (userToSearch) {
      setIsSearchingUser(true)
      const q = query(
        collection(db, 'users'),
        where('displayName', '==', userToSearch)
      )

      try {
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          setUsersFinded(doc.data())
        })

        setIsSearchingUser(false)
      } catch (error) {
        setUsersFinded([])
        setIsSearchingUser(false)
      }
    } else {
      setUsersFinded([])
    }
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserToSearch(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === 'Enter' && handleSearchUser()
  }

  const handleSelectedUser = async () => {
    const userSelected = usersFinded
    setUsersFinded(undefined)

    if (user) {
      const combinedIds =
        user.uid > userSelected?.uid
          ? user.uid + userSelected?.uid
          : userSelected?.uid + user.uid
      try {
        const res = await getDoc(doc(db, 'chats', combinedIds))

        if (!res.exists()) {
          await setDoc(doc(db, 'chats', combinedIds), { messages: [] })

          await updateDoc(doc(db, 'userChats', user.uid), {
            [combinedIds + '.userInfo']: {
              uid: userSelected?.uid,
              displayName: userSelected?.displayName,
              photoURL: userSelected?.photoURL
            },
            [combinedIds + '.date']: serverTimestamp()
          })

          await updateDoc(doc(db, 'userChats', userSelected?.uid), {
            [combinedIds + '.userInfo']: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL
            },
            [combinedIds + '.date']: serverTimestamp()
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    setUserToSearch('')
  }

  return (
    <Flex flexDir={'column'} w={'100%'} gap={4}>
      <Box w={'100%'} bg={colors.seventhColor} rounded={'8px'}>
        <Input
          px={4}
          variant={'unstyled'}
          placeholder={'Encuentra un usuario...'}
          value={userToSearch}
          h={'45px'}
          onKeyDown={handleKeyDown}
          onChange={handleOnChange}
        />
      </Box>
      {isSearchingUser && (
        <Flex justifyContent={'center'} alignItems={'center'}>
          <Spinner />
        </Flex>
      )}
      {usersFinded && Object.entries(usersFinded).length > 0 ? (
        <Flex
          w={'100%'}
          flexDir={'column'}
          gap={4}
          p={2}
          borderRadius={'8px 8px 8px 8px'}
          cursor={'pointer'}
          _hover={{ background: colors.tertiaryColor }}
          onClick={handleSelectedUser}>
          <Flex columnGap={2}>
            <Image
              h={50}
              w={'100%'}
              maxW={50}
              borderRadius={'100%'}
              objectFit={'cover'}
              src={usersFinded?.photoURL}
              alt={'iconUser'}
            />
            <Flex
              color={colors.seventhColor}
              justifyContent={'center'}
              alignItems={'center'}>
              <Text as='b' m={'auto'}>
                {usersFinded?.displayName}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        ''
      )}
      <Divider />
    </Flex>
  )
}
export default SearchContacts
