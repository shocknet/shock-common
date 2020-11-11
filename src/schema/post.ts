import * as N from 'normalizr'

import { User } from './user'
import { isObj } from './misc'

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

export interface Paragraph {
  type: 'text/paragraph'

  text: string
}

export type ContentItem = EmbeddedImage | EmbeddedVideo | Paragraph

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

  tipCounter: number
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
}

export interface Post extends PostBase {
  author: User
}

export interface PostN extends PostBase {
  author: string
}

export const isEmbeddedImage = (
  contentItem: ContentItem,
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
  contentItem: ContentItem,
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

export const isParagraph = (
  contentItem: ContentItem,
): contentItem is Paragraph => {
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
  contentItem: ContentItem,
): contentItem is ContentItem =>
  isEmbeddedVideo(contentItem) ||
  isEmbeddedImage(contentItem) ||
  isParagraph(contentItem)

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
  N.normalize<Post, RelevantEntities, string[]>(posts, [Post])

export const denormalizePosts = (
  postsIDs: string[],
  relevantEntities: RelevantEntities,
): Post[] => N.denormalize(postsIDs, [Post], relevantEntities) as Post[]
