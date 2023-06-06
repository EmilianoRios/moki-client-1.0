import { AuthContext } from '@/context/AuthContext'
import { PrivateRoutes, PublicRoutes } from '@/models'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  privateValidation: boolean
}

const PrivateValidationRoutes = <Outlet />
const PublicValidationRoutes = <Navigate replace to={PrivateRoutes.CHAT} />
const LoginRoute = <Navigate replace to={PublicRoutes.LOGIN} />

function AuthGuard({ privateValidation }: Props) {
  /* TODO Mover el authenticateUser aqui y hacer las validaciones necesarias */
  const { user } = useContext(AuthContext)
  if (privateValidation) {
    if (!user) return LoginRoute
    return PrivateValidationRoutes
  }
  return PublicValidationRoutes
}
export default AuthGuard
