import { Chat } from '@/pages'
import { Route, Routes } from 'react-router-dom'

function AppPrivateRoutes() {
  return (
    <Routes>
      <Route index element={<Chat />} />
    </Routes>
  )
}
export default AppPrivateRoutes
