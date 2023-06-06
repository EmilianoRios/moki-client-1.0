import { UserStateContext } from '@/context/AuthContext'
import { UserContextState } from '@/models'
import { useContext } from 'react'

export const useAuth = (): UserContextState => {
  return useContext(UserStateContext)
}
