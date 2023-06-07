import { Text } from '@chakra-ui/react'

const TruncatedText = (text: string, maxLength: number) => {
  const truncatedText =
    text.length > maxLength ? text.slice(0, maxLength) + '...' : text

  return <Text fontSize={14}>{truncatedText}</Text>
}

export default TruncatedText
