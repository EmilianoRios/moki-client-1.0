import { UserEmptyInfo } from '@/models/userModel'
import { createSlice } from '@reduxjs/toolkit'

export const UserKey = 'user'

export const userSlice = createSlice({
  name: 'user',
  initialState: UserEmptyInfo,
  reducers: {
    createUser: (state, action) => {
      return action.payload
    },
    updateUser: (state, action) => {
      const updatedUser = { ...state, ...action.payload }
      return updatedUser
    },
    resetUser: () => {
      return UserEmptyInfo
    }
  }
})

export const { createUser, updateUser, resetUser } = userSlice.actions

export default userSlice.reducer
