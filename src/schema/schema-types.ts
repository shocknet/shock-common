/**
 * Contains types that are used throughout the application. Written in
 * typescript for easier implementation.
 *
 * Nominal types are archieved through the enum method as outlined here:
 * https://basarat.gitbook.io/typescript/main-1/nominaltyping
 */

/**
 * Exported only for declaration generation. Do not use.
 * https://github.com/microsoft/TypeScript/issues/9865
 */
export enum _EncSpontPayment {
  _ = '',
}

/**
 * Spontaneous payment as found inside a chat message body.
 */
export type EncSpontPayment = _EncSpontPayment & string

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

export interface EmbeddedVideo {
  type: 'video/embedded'

  magnetURI: string

  width: string

  height: string
}

export interface EmbeddedImage {
  type: 'image/embedded'

  magnetURI: string

  width: string

  height: string
}

export interface Paragraph {
  type: 'text/paragraph'

  text: string
}

export type ContentItem = EmbeddedImage | EmbeddedVideo | Paragraph

export type PostStatus = 'draft' | 'publish' | 'private' | 'pending'

export interface PostBase {
  /**
   * Unix timestamp.
   */
  date: number

  /**
   * Pending means it's being uploaded.
   */
  status: PostStatus

  title: string

  /**
   * Hyphen-delimited tags.
   */
  tags: string

  contentItems: Record<string, ContentItem>
}

/**
 * Post as seen by its author.
 */
export type Post = PostBase

/**
 * Post as it's received by a reader.
 */
export type AuthoredPostBase = PostBase

export interface AuthoredPost extends AuthoredPostBase {
  author: User
}

export interface AuthoredPostN extends PostBase {
  author: string
}

export interface AuthoredPostN extends Post {
  author: string
}

export interface FeedPageBase {
  count: number
}

export type WallPageBase = FeedPageBase

export interface FeedPage extends FeedPageBase {
  posts: Record<string, Post>
}

export type WallPage = FeedPage

export interface FeedPageN extends FeedPageBase {
  posts: Record<string, string>
}

export type WallPageN = FeedPageN

/**
 * Feed as seen by its author.
 */
export interface FeedBase {
  numOfPages: number
}

export type WallBase = FeedBase

export interface Feed extends FeedBase {
  pages: Record<number, FeedPage>
}

export type Wall = Feed

export interface FeedN extends FeedBase {
  pages: Record<number, string>
}

export type WallN = FeedN

export interface Follow {
  user: string
  status: 'ok' | 'processing'
  private: boolean
}
