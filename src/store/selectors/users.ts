import { User, createEmptyUser } from '../../schema'
import { State } from '../reducers'

export const selectAllUsers = (state: State) => state.users

export const selectUser = (
  state: State,
  { publicKey }: { publicKey: string },
): User => {
  const user = state.users[publicKey]

  return user || createEmptyUser(publicKey)
}
