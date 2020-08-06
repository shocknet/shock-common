export interface HasPublicKey {
  publicKey: string
}

export interface UserBase {
  avatar: string | null
  bio: string | null
  displayName: string | null
  lastSeenApp: number
  lastSeenNode: number
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
    typeof obj.lastSeenApp === 'number' &&
    typeof obj.lastSeenNode === 'number' &&
    typeof obj.publicKey === 'string'
  )
}
