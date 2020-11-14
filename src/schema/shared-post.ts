import { isObj, isPopulatedString } from './misc'

export interface SharedPostRaw {
  author: string
  id: string
  date: number
}

export const isSharedPostRaw = (o: unknown): o is SharedPostRaw => {
  const obj = o as SharedPostRaw

  if (!isObj(o)) {
    return false
  }

  if (!isPopulatedString(obj.author)) {
    return false
  }

  if (!isPopulatedString(obj.id)) {
    return false
  }

  if (typeof obj.date !== 'number') {
    return false
  }

  return true
}

export interface SharedPost extends SharedPostRaw {
  sharedBy: string
}

export const isSharedPost = (o: unknown): o is SharedPost => {
  if (!isSharedPostRaw(o)) {
    return false
  }

  const obj = o as SharedPost

  return isPopulatedString(obj.sharedBy)
}
