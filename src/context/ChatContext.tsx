import {
  ChatActionKind,
  ChatActions,
  ChatContextModel,
  ChatInitalState
} from '@/models'
import React, { useContext, useReducer } from 'react'
import { AuthContext } from './AuthContext'

interface Props {
  children: React.ReactNode
}

export const ChatContext = React.createContext<ChatContextModel>(
  {} as ChatContextModel
)

export function ChatProvider({ children }: Props) {
  const { user } = useContext(AuthContext)

  const INITIAL_STATE: ChatInitalState = {
    chatId: null,
    user: null
  }

  const chatReducer = (state = INITIAL_STATE, action: ChatActions) => {
    switch (action.type) {
      case ChatActionKind.CHANGE_USER:
        return {
          user: action.payload,
          chatId:
            user && user.uid > action.payload.uid
              ? user.uid + action.payload.uid
              : action.payload.uid + user?.uid
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
