import { PrivateRoutes, PublicRoutes } from '@/models/routesModel'
import { Login, Register } from '@/pages'
import { AppPrivateRoutes } from '@/routes'
import { Route, Routes } from 'react-router-dom'

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path={PublicRoutes.REGISTER} element={<Register />} />
        <Route
          path={`${PrivateRoutes.CHAT}/*`}
          element={<AppPrivateRoutes />}
        />
      </Routes>
    </>
  )
}
export default AppRoutes
