import { Auth, User, UserCredential } from 'firebase/auth'

export interface UserInfo {
  uid: string
  displayName: string
  email: string
  photoURL: string
}

export const UserEmptyInfo: Required<UserInfo> = {
  uid: '',
  displayName: '',
  email: '',
  photoURL: ''
}

export interface AuthContextModel {
  auth: Auth
  user: User | null
  signIn: (email: string, password: string) => Promise<UserCredential>
  signUp: (email: string, password: string) => Promise<UserCredential>
  logOut: () => Promise<void>
  isLoadingAuth: boolean
}

export interface UserContextState {
  isAuthenticated: boolean
  isLoading: boolean
  id?: string
}
