import { AuthContext } from '@/context/AuthContext'
import AuthGuard from '@/guard/AuthGuard'
import { PublicRoutes } from '@/models/routesModel'
import { LoadingPage, Login, Register } from '@/pages'
import { AppPrivateRoutes } from '@/routes'
import { RoutesWithNotFound } from '@/utilities'
import { useContext } from 'react'
import { Route } from 'react-router-dom'

function AppRoutes() {
  const { isLoadingAuth } = useContext(AuthContext)
  return (
    <>
      <RoutesWithNotFound isLoadingAuth={isLoadingAuth}>
        {!isLoadingAuth ? (
          <Route element={<AuthGuard privateValidation={true} />}>
            <Route
              path={'/*'}
              element={<AppPrivateRoutes isLoadingAuth={isLoadingAuth} />}
            />
          </Route>
        ) : (
          <Route element={<LoadingPage />} />
        )}
        <Route path={PublicRoutes.LOGIN} element={<Login />} />
        <Route path={PublicRoutes.REGISTER} element={<Register />} />
      </RoutesWithNotFound>
    </>
  )
}
export default AppRoutes
