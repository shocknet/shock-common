import { schema } from 'normalizr'

export interface HasPublicKey {
  publicKey: string
}

export interface UserBase {
  avatar: string | null
  bio: string | null
  displayName: string | null
  header: string | null
  lastSeenApp: number
  lastSeenNode: number
  pinnedPost: string | null
}

export type User = HasPublicKey & UserBase

export type PartialUser = HasPublicKey & Partial<User>

export const isUser = (o: unknown): o is User => {
  const obj = o as User

  const isNullablestring = (str: unknown): boolean =>
    str === 'string' || str === null

  return (
    isNullablestring(obj.avatar) &&
    isNullablestring(obj.bio) &&
    isNullablestring(obj.displayName) &&
    isNullablestring(obj.header) &&
    typeof obj.lastSeenApp === 'number' &&
    typeof obj.lastSeenNode === 'number' &&
    typeof obj.publicKey === 'string' &&
    isNullablestring(obj.pinnedPost)
  )
}

export const User = new schema.Entity<User>(
  'users',
  {},
  {
    idAttribute: 'publicKey',
  },
)

export const createEmptyUser = (publicKey: string): User => ({
  avatar: null,
  bio: 'Shockwallet User',
  header: null,
  displayName: 'anon' + publicKey.slice(-8),
  lastSeenApp: 0,
  lastSeenNode: 0,
  publicKey,
  pinnedPost: null,
})
