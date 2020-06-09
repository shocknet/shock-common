import { User } from '../../schema'
import { State } from '../reducers'

const createEmptyUser = (publicKey: string): User => ({
  avatar: null,
  bio: null,
  displayName: null,
  lastSeenApp: 0,
  lastSeenNode: 0,
  publicKey,
})

export const selectAllUsers = (state: State) => state.users

export const selectUser = (
  state: State,
  { publicKey }: { publicKey: string },
): User => {
  const user = state.users[publicKey]

  return user || createEmptyUser(publicKey)
}
