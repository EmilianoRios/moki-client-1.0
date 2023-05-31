import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/static/css/style.css'
import { ChakraProvider } from '@chakra-ui/react'
import themeChakra from './config/themeChakra.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={themeChakra}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
