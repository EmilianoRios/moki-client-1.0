import { Flex, Image, Text } from '@chakra-ui/react'
import { useState } from 'react'
import TruncatedText from './TruncateText'

interface Props {
  file: File
  width: number | string
  height: number | string
}

const PreviewFile = ({ file, width, height }: Props) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)

  const reader = new FileReader()

  reader.readAsDataURL(file)

  function isFileImage(file: File) {
    return file && file['type'].split('/')[0] === 'image'
  }

  reader.onload = () => {
    setPreview(isFileImage(file) ? reader.result : '/default.svg')
  }

  return (
    <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
      <Image
        src={preview as string}
        borderRadius={'full'}
        className='preview'
        alt='Preview'
        objectFit={'cover'}
        width={width}
        height={height}
      />
    </Flex>
  )
}

export default PreviewFile
