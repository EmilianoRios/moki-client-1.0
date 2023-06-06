import { Chat } from '@/pages'
import { RoutesWithNotFound } from '@/utilities'
import { Route } from 'react-router-dom'

interface Props {
  isLoadingAuth: boolean
}

function AppPrivateRoutes({ isLoadingAuth }: Props) {
  return (
    <RoutesWithNotFound isLoadingAuth={isLoadingAuth}>
      <Route index element={<Chat />} />
    </RoutesWithNotFound>
  )
}
export default AppPrivateRoutes
