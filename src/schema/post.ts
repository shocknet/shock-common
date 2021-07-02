import * as N from 'normalizr'
import isBoolean from 'lodash/isBoolean'
import isFinite from 'lodash/isFinite'

import { User, createEmptyUser } from './user'
import { isObj, isPopulatedString } from './misc'

export const createValidator = <T extends Record<string, any>>(
  valMap: Record<keyof T, (val: unknown) => void>,
  baseValidator: (o: unknown) => boolean = () => true,
) => (o: unknown): o is T => {
  if (!isObj(o)) {
    return false
  }

  if (!baseValidator(o)) {
    return false
  }

  return Object.entries(valMap).every(([key, validator]) => {
    return validator(o[key])
  })
}
export interface EmbeddedVideo {
  type: 'video/embedded'

  magnetURI: string

  width: string

  height: string

  isPreview: boolean

  isPrivate: boolean
}

export interface EmbeddedImage {
  type: 'image/embedded'

  magnetURI: string

  width: string

  height: string

  isPreview: boolean

  isPrivate: boolean
}

export type LiveStatus = 'live' | 'waiting' | 'wasLive' | 'Is Live'
export interface EmbeddedStream {
  type: 'stream/embedded'

  magnetURI: string

  width: number

  height: number

  isPreview: boolean

  isPrivate: boolean

  userToken: string

  liveStatus: LiveStatus

  viewersCounter: number

  statusUrl: string
}

export const isLiveStatus = (s: unknown): s is LiveStatus => {
  return ['live', 'waiting', 'wasLive', 'Is Live'].includes(s as string)
}

export const isEmbeddedStream = createValidator<EmbeddedStream>({
  height: isFinite,
  isPreview: isBoolean,
  isPrivate: isBoolean,
  liveStatus: isLiveStatus,
  magnetURI: isPopulatedString,
  statusUrl: isPopulatedString,
  type(val: unknown) {
    return val === 'stream/embedded'
  },
  userToken: isPopulatedString,
  viewersCounter: isFinite,
  width: isFinite,
})

export interface Paragraph {
  type: 'text/paragraph'

  text: string
}

export type ContentItem =
  | EmbeddedImage
  | EmbeddedVideo
  | Paragraph
  | EmbeddedStream

export type PostStatus = 'draft' | 'publish' | 'private' | 'pending'

/**
 * Post as fetched from gun.
 */
export interface RawPost {
  /**
   * Unix timestamp.
   */
  date: number

  /**
   * Pending means it's being uploaded.
   * @deprecated
   */
  status: PostStatus

  title: string

  /**
   * Hyphen-delimited tags.
   */
  tags: string

  contentItems: Record<string, ContentItem>
}

export const isRawPost = (o: unknown): o is RawPost => {
  const rp = o as RawPost

  if (!isObj(o)) {
    return false
  }

  // we'll ignore status it's deprecated
  const { contentItems, date, tags, title } = rp

  if (!isObj(contentItems)) {
    return false
  }

  if (Object.keys(contentItems).length < 1) {
    return false
  }

  if (!Object.values(contentItems).every((ci) => isContentItem(ci))) {
    return false
  }

  if (typeof date !== 'number') {
    return false
  }

  if (typeof tags !== 'string') {
    return false
  }

  if (typeof title !== 'string') {
    return false
  }

  return true
}

export interface PostBase extends RawPost {
  id: string
  tipCounter: number
}

export interface Post extends PostBase {
  author: User
}

export interface PostN extends PostBase {
  author: string
}

export const isEmbeddedImage = (
  contentItem: unknown,
): contentItem is EmbeddedImage => {
  if (!isObj(contentItem)) {
    return false
  }

  if (contentItem.type !== 'image/embedded') {
    return false
  }

  if (typeof contentItem.height !== 'number') {
    return false
  }

  if (typeof contentItem.magnetURI !== 'string') {
    return false
  }

  if (typeof contentItem.width !== 'number') {
    return false
  }

  return true
}

export const isEmbeddedVideo = (
  contentItem: unknown,
): contentItem is EmbeddedVideo => {
  if (!isObj(contentItem)) {
    return false
  }

  if (contentItem.type !== 'video/embedded') {
    return false
  }

  if (typeof contentItem.height !== 'number') {
    return false
  }

  if (typeof contentItem.magnetURI !== 'string') {
    return false
  }

  if (typeof contentItem.width !== 'number') {
    return false
  }

  return true
}

export const isParagraph = (contentItem: unknown): contentItem is Paragraph => {
  if (!isObj(contentItem)) {
    return false
  }

  if (contentItem.type !== 'text/paragraph') {
    return false
  }

  if (typeof contentItem.text !== 'string') {
    return false
  }

  return true
}

export const isContentItem = (
  contentItem: unknown,
): contentItem is ContentItem =>
  isEmbeddedVideo(contentItem) ||
  isEmbeddedImage(contentItem) ||
  isParagraph(contentItem) ||
  isEmbeddedStream(contentItem)

export const isPostStatus = (str: PostStatus): str is PostStatus =>
  str === 'draft' || str === 'pending' || str === 'private' || str === 'publish'

export const isPost = (o: unknown): o is Post => {
  if (!isObj(o)) {
    return false
  }

  const obj = (o as unknown) as Post

  return (
    typeof obj.id === 'string' &&
    typeof obj.date === 'number' &&
    isPostStatus(obj.status) &&
    typeof obj.tags === 'string' &&
    typeof obj.title === 'string' &&
    isObj(obj.contentItems) &&
    Object.values(obj.contentItems).every((ci) => isContentItem(ci))
  )
}

export const isPostN = (o: unknown): o is PostN => {
  if (!isObj(o)) {
    return false
  }

  if (typeof o.author !== 'string') {
    return false
  }

  return isPost({
    ...o,
    author: createEmptyUser(o.author),
  })
}

export const Post = new N.schema.Entity<Post>('posts', {
  author: User,
})

type RelevantEntities = {
  posts: Record<string, PostN>
  users: Record<string, User>
}

/**
 * @param posts
 */
export const normalizePosts = (posts: Post[]) =>
  N.normalize<Post, Partial<RelevantEntities>, Post['id'][]>(posts, [Post])

/**
 * @param postsIDs
 * @param relevantEntities
 */
export const denormalizePosts = (
  postsIDs: Post['id'][],
  relevantEntities: RelevantEntities,
): Post[] => N.denormalize(postsIDs, [Post], relevantEntities) as Post[]
