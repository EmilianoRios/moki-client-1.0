import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/static/css/style.css'
import { ChakraProvider } from '@chakra-ui/react'
import themeChakra from './config/themeChakra.ts'
import { AuthProvider } from './context/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider theme={themeChakra}>
        <App />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
)
