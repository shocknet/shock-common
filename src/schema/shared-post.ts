import { isObj, isPopulatedString } from './misc'

export interface SharedPost {
  author: string
  id: string
}

export const isSharedPost = (o: unknown): o is SharedPost => {
  const obj = o as SharedPost

  if (!isObj(o)) {
    return false
  }

  if (!isPopulatedString(obj.author)) {
    return false
  }

  if (!isPopulatedString(obj.id)) {
    return false
  }

  return true
}
