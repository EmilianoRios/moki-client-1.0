export interface ChatInitalState {
  chatId: string | null
  user: ChatUserSelected | null
}

export interface ChatUserSelected {
  displayName: string
  photoURL: string
  uid: string
}

export enum ChatActionKind {
  CHANGE_USER = 'CHANGE_USER'
}

export interface ChatActions {
  type: ChatActionKind
  payload: ChatUserSelected
}

export interface ChatContextModel {
  data: ChatInitalState
  dispatch: React.Dispatch<ChatActions>
}
