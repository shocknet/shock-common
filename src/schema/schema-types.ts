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

////////////////////////////////////////////////////////////////////////////////

export interface WallPageBase {
  count: number
}

export interface WallPage extends WallPageBase {
  posts: Record<string, Post>
}

export interface WallPageN extends WallPageBase {
  posts: Record<string, string>
}

export interface WallBase {
  numOfPages: number
}

export interface Wall extends WallBase {
  pages: Record<number, WallPage>
}

export interface WallN extends WallBase {
  pages: Record<number, string>
}

////////////////////////////////////////////////////////////////////////////////

export interface Follow {
  user: string
  status: 'ok' | 'processing'
  private: boolean
}
