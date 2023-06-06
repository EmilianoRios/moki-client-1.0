import { LoadingPage, NotFound } from '@/pages'
import { Route, Routes } from 'react-router-dom'

interface Props {
  children: JSX.Element[] | JSX.Element
  isLoadingAuth: boolean
}

function RoutesWithNotFound({ children, isLoadingAuth }: Props) {
  return (
    <Routes>
      {children}
      {isLoadingAuth ? (
        <Route path='*' element={<LoadingPage />} />
      ) : (
        <Route path='*' element={<NotFound />} />
      )}
    </Routes>
  )
}
export default RoutesWithNotFound
