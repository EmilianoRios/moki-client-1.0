// theme.ts
// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import colors from './configColors'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

// 3. extend the theme
const themeChakra = extendTheme({
  config,
  fonts: {
    body: `'Poppins', sans-serif`,
    heading: `'Poppins', sans-serif`
  },
  colors
})

export default themeChakra
