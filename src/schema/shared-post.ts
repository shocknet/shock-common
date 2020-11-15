import { isObj, isPopulatedString } from './misc'

export interface SharedPostRaw {
  originalAuthor: string
  originalPostID: string
  originalDate: number
}

export const isSharedPostRaw = (o: unknown): o is SharedPostRaw => {
  const obj = o as SharedPostRaw

  if (!isObj(o)) {
    return false
  }

  if (!isPopulatedString(obj.originalAuthor)) {
    return false
  }

  if (!isPopulatedString(obj.originalPostID)) {
    return false
  }

  if (typeof obj.originalDate !== 'number') {
    return false
  }

  return true
}

export interface SharedPost extends SharedPostRaw {
  sharedBy: string
  shareID: string
}

export const isSharedPost = (o: unknown): o is SharedPost => {
  if (!isSharedPostRaw(o)) {
    return false
  }

  const obj = o as SharedPost

  return isPopulatedString(obj.sharedBy) && isPopulatedString(obj.shareID)
}
