import { auth } from '@/config/firebase'
import { AuthContextModel, UserContextState } from '@/models'
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'

export const UserStateContext = createContext<UserContextState>(
  {} as UserContextState
)

export const AuthContext = React.createContext<AuthContextModel>(
  {} as AuthContextModel
)

interface Props {
  children: React.ReactNode
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true)

  const signUp = (email: string, password: string): Promise<UserCredential> =>
    createUserWithEmailAndPassword(auth, email, password)

  const signIn = (email: string, password: string): Promise<UserCredential> =>
    signInWithEmailAndPassword(auth, email, password)

  const logOut = (): Promise<void> => signOut(auth)

  useEffect(() => {
    const unsubsrcibe = auth.onAuthStateChanged((user) => {
      setUser(user)
      setIsLoadingAuth(false)
    })
    return unsubsrcibe
  }, [])

  const values = {
    signUp,
    user,
    signIn,
    logOut,
    auth,
    isLoadingAuth
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
