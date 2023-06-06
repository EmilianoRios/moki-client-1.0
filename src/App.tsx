import { AppRoutes } from '@/routes'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LoadingPage } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  )
}

export default App
