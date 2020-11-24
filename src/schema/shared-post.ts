import { isObj, isPopulatedString } from './misc'

/**
 * Shared post as it's stored in gun.
 */
export interface SharedPostRaw {
  originalAuthor: string
  shareDate: number
}

export const isSharedPostRaw = (o: unknown): o is SharedPostRaw => {
  const obj = o as SharedPostRaw

  if (!isObj(o)) {
    return false
  }

  if (!isPopulatedString(obj.originalAuthor)) {
    return false
  }

  if (typeof obj.shareDate !== 'number') {
    return false
  }

  return true
}

export interface SharedPost extends SharedPostRaw {
  originalPostID: string
  sharedBy: string
  /**
   * Concatenation of public key of user sharing the post and the original
   * post's ID.
   */
  shareID: string
}

export const isSharedPost = (o: unknown): o is SharedPost => {
  if (!isSharedPostRaw(o)) {
    return false
  }

  const obj = o as SharedPost

  if (!isPopulatedString(obj.originalPostID)) {
    return false
  }

  if (!isPopulatedString(obj.sharedBy)) {
    return false
  }

  if (!isPopulatedString(obj.shareID)) {
    return false
  }

  return true
}
