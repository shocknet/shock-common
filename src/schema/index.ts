/**
 * Contains types that are used throughout the application. Written in
 * typescript for easier implementation.
 *
 * Nominal types are archieved through the enum method as outlined here:
 * https://basarat.gitbook.io/typescript/main-1/nominaltyping
 */
import isFinite from 'lodash/isFinite'
import isNumber from 'lodash/isNumber'
import isNaN from 'lodash/isNaN'

import * as logger from '../logger'
import * as Gun from './gun'

export { Gun }

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
  id: string

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
export interface Post extends PostBase {
  author: User
}

export interface PostN extends PostBase {
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

/**
 * @typedef {import('./schema-types').PartialUser} PartialUser
 */

export interface HandshakeRequest {
  /**
   * Public key of the requestor.
   */
  from: string
  /**
   * Encrypted string where, if the recipient accepts the request, his outgoing
   * feed id will be put. Before that the sender's outgoing feed ID will be
   * placed here, encrypted so only the recipient can access it.
   */
  response: string
  /**
   * Unix time.
   */
  timestamp: number
}

export interface Message {
  body: string
  timestamp: number
}

export interface ChatMessage {
  body: string
  id: string
  /**
   * True if the message is an outgoing message, otherwise it is an incoming
   * message.
   */
  outgoing: boolean
  timestamp: number
}

export const isObj = (o: unknown): o is Record<string, unknown> =>
  typeof o === 'object' && o !== null

export const isChatMessage = (item: unknown): item is ChatMessage => {
  if (typeof item !== 'object') {
    return false
  }

  if (item === null) {
    return false
  }

  const obj = item as ChatMessage

  if (typeof obj.body !== 'string') {
    return false
  }

  if (typeof obj.id !== 'string') {
    return false
  }

  if (typeof obj.outgoing !== 'boolean') {
    return false
  }

  if (typeof obj.timestamp !== 'number') {
    return false
  }

  return true
}

/**
 * A simpler representation of a conversation between two users than the
 * outgoing/incoming feed paradigm. It combines both the outgoing and incoming
 * messages into one data structure plus metada about the chat.
 */
export interface Chat {
  /**
   * Chats now have IDs because of disconnect. RecipientPublicKey will no longer
   * be unique.
   */
  id: string
  /**
   * Base64 encoded image.
   */
  recipientAvatar: string | null
  recipientPublicKey: string
  /**
   * Sorted from most recent to least recent.
   */
  messages: ChatMessage[]
  recipientDisplayName: string | null
  /**
   * True if the recipient performed a disconnect.
   */
  didDisconnect: boolean
  lastSeenApp: number | undefined | null
}

export const isChat = (item: unknown): item is Chat => {
  if (typeof item !== 'object') {
    return false
  }

  if (item === null) {
    return false
  }

  const obj = item as Chat

  if (typeof obj.recipientAvatar !== 'string' && obj.recipientAvatar !== null) {
    return false
  }

  if (!Array.isArray(obj.messages)) {
    return false
  }

  if (typeof obj.recipientPublicKey !== 'string') {
    return false
  }

  if (obj.recipientPublicKey.length === 0) {
    return false
  }

  if (typeof obj.didDisconnect !== 'boolean') {
    return false
  }

  if (typeof obj.id !== 'string') {
    return false
  }

  return obj.messages.every((msg) => isChatMessage(msg))
}

export interface Outgoing {
  messages: Record<string, Message>
  /**
   * Public key for whom the outgoing messages are intended.
   */
  with: string
}

export interface PartialOutgoing {
  /**
   * (Encrypted) Public key for whom the outgoing messages are intended.
   */
  with: string
}

export interface StoredRequest {
  sentReqID: string
  recipientPub: string
  handshakeAddress: string
  timestamp: number
}

export const isStoredRequest = (item: unknown): item is StoredRequest => {
  if (typeof item !== 'object') return false
  if (item === null) return false
  const obj = item as StoredRequest
  if (typeof obj.recipientPub !== 'string') return false
  if (typeof obj.handshakeAddress !== 'string') return false
  if (typeof obj.handshakeAddress !== 'string') return false
  if (typeof obj.timestamp !== 'number') return false
  return true
}

export interface SimpleSentRequest {
  id: string
  recipientAvatar: string | null
  /**
   * True if the recipient changed the request node address and therefore can't
   * no longer accept the request.
   */
  recipientChangedRequestAddress: boolean
  recipientDisplayName: string | null
  recipientPublicKey: string
  timestamp: number
}

export const isSimpleSentRequest = (
  item: unknown,
): item is SimpleSentRequest => {
  if (typeof item !== 'object') {
    return false
  }

  if (item === null) {
    return false
  }

  const obj = item as SimpleSentRequest

  if (typeof obj.id !== 'string') {
    return false
  }

  if (typeof obj.recipientAvatar !== 'string' && obj.recipientAvatar !== null) {
    return false
  }

  if (typeof obj.recipientChangedRequestAddress !== 'boolean') {
    return false
  }

  if (
    typeof obj.recipientDisplayName !== 'string' &&
    obj.recipientDisplayName !== null
  ) {
    return false
  }

  if (typeof obj.recipientPublicKey !== 'string') {
    return false
  }

  if (typeof obj.timestamp !== 'number') {
    return false
  }

  return true
}

export interface SimpleReceivedRequest {
  id: string
  requestorAvatar: string | null
  requestorDisplayName: string | null
  requestorPK: string
  timestamp: number
}

export const isSimpleReceivedRequest = (
  item: unknown,
): item is SimpleReceivedRequest => {
  if (typeof item !== 'object') {
    return false
  }

  if (item === null) {
    return false
  }

  const obj = item as SimpleReceivedRequest

  if (typeof obj.id !== 'string') {
    return false
  }

  if (typeof obj.requestorAvatar !== 'string' && obj.requestorAvatar !== null) {
    return false
  }

  if (
    typeof obj.requestorDisplayName !== 'string' &&
    obj.requestorDisplayName !== null
  ) {
    return false
  }

  if (typeof obj.requestorPK !== 'string') {
    return false
  }

  if (typeof obj.timestamp !== 'number') {
    return false
  }

  return true
}

export const isHandshakeRequest = (item: unknown): item is HandshakeRequest => {
  if (typeof item !== 'object') {
    return false
  }

  if (item === null) {
    return false
  }

  const obj = item as HandshakeRequest

  if (typeof obj.from !== 'string') {
    return false
  }

  if (typeof obj.response !== 'string') {
    return false
  }

  if (typeof obj.timestamp !== 'number') {
    return false
  }

  return true
}

/**
 * @param {unknown} item
 * @returns {item is Message}
 */
export const isMessage = (item: unknown): item is Message => {
  if (typeof item !== 'object') {
    return false
  }

  if (item === null) {
    return false
  }

  const obj = item as Message

  return typeof obj.body === 'string' && typeof obj.timestamp === 'number'
}

export const isPartialOutgoing = (item: unknown): item is PartialOutgoing => {
  if (typeof item !== 'object') {
    return false
  }

  if (item === null) {
    return false
  }

  const obj = item as PartialOutgoing

  return typeof obj.with === 'string'
}

export const isOutgoing = (item: unknown): item is Outgoing => {
  if (typeof item !== 'object') {
    return false
  }

  if (item === null) {
    return false
  }

  const obj = item as Outgoing

  const messagesAreMessages = Object.values(obj.messages).every((msg) =>
    isMessage(msg),
  )

  return typeof obj.with === 'string' && messagesAreMessages
}

export interface Order {
  /**
   * Public key of sender.
   */
  from: string
  /**
   * Encrypted
   */
  amount: string
  /**
   * Encrypted
   */
  memo: string
  timestamp: number
}

export const isOrder = (item: unknown): item is Order => {
  if (typeof item !== 'object') {
    return false
  }

  if (item === null) {
    return false
  }

  const obj = item as Order

  if (typeof obj.amount !== 'string') {
    return false
  }

  if (typeof obj.from !== 'string') {
    return false
  }

  if (typeof obj.memo !== 'string') {
    return false
  }

  return typeof obj.timestamp === 'number'
}

export interface OrderResponse {
  type: 'err' | 'invoice'
  response: string
}

export const isOrderResponse = (o: unknown): o is OrderResponse => {
  if (typeof o !== 'object') {
    return false
  }

  if (o === null) {
    return false
  }

  const obj = o as OrderResponse

  if (typeof obj.response !== 'string') {
    return false
  }

  return obj.type === 'err' || obj.type === 'invoice'
}

const ENC_SPONT_PAYMENT_PREFIX = '$$__SHOCKWALLET__SPONT__PAYMENT'

export const isEncodedSpontPayment = (s: string): s is EncSpontPayment =>
  s.startsWith(ENC_SPONT_PAYMENT_PREFIX)

export interface SpontaneousPayment {
  amt: number
  memo: string
  preimage: string
}

/**
 * @throws {Error} If decoding fails.
 */
export const decodeSpontPayment = (sp: EncSpontPayment): SpontaneousPayment => {
  try {
    const [preimage, amtStr, memo] = sp
      .slice((ENC_SPONT_PAYMENT_PREFIX + '__').length)
      .split('__')

    if (typeof preimage !== 'string') {
      throw new TypeError('Could not parse preimage')
    }

    if (typeof amtStr !== 'string') {
      throw new TypeError('Could not parse amt')
    }

    if (typeof memo !== 'string') {
      throw new TypeError('Could not parse memo')
    }

    const amt = Number(amtStr)

    if (!isNumber(amt)) {
      throw new TypeError(`Could parse amount as a number, not a number?`)
    }

    if (isNaN(amt)) {
      throw new TypeError(`Could not parse amount as a number, got NaN.`)
    }

    if (!isFinite(amt)) {
      throw new TypeError(
        `Amount was correctly parsed, but got a non finite number.`,
      )
    }

    return {
      amt,
      memo,
      preimage,
    }
  } catch (err) {
    logger.debug(`Encoded spontaneous payment: ${sp}`)
    logger.error(err)
    throw err
  }
}

export const encodeSpontaneousPayment = (
  amt: number,
  memo: string,
  preimage: string,
): EncSpontPayment => {
  if (typeof amt !== 'number') {
    throw new TypeError('amt must be a number')
  }

  if (typeof memo !== 'string') {
    throw new TypeError('memo must be an string')
  }

  if (typeof preimage !== 'string') {
    throw new TypeError('preimage must be an string')
  }

  if (amt <= 0) {
    throw new RangeError('Amt must be greater than zero')
  }

  if (memo.length < 1) {
    throw new TypeError('Memo must be populated')
  }

  if (preimage.length < 1) {
    throw new TypeError('preimage must be populated')
  }

  const enc = `${ENC_SPONT_PAYMENT_PREFIX}__${amt}__${memo}__${preimage}`

  if (isEncodedSpontPayment(enc)) {
    return enc
  }

  throw new Error('isEncodedSpontPayment(enc) false')
}

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

/**
 *
 * @param {} contentItem
 * @returns {}
 */
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

export const isWallPage = (o: unknown): o is WallPage => {
  const fp = o as WallPage

  if (typeof fp.count !== 'number') {
    return false
  }

  if (!isObj(fp.posts)) {
    return false
  }

  return Object.values(fp.posts).every((p) => isPost(p))
}

export const isWall = (o: unknown): o is Wall => {
  if (!isObj(o)) {
    return false
  }

  const f = /** @type {Wall} */ o

  if (typeof f.numOfPages !== 'number') {
    return false
  }

  return Object.values(f.numOfPages).every((fp) => isWallPage(fp))
}

export const isFollow = (o: unknown): o is Follow => {
  if (!isObj(o)) {
    return false
  }

  const f = (o as unknown) as Follow

  const statusIsOk = f.status === 'ok' || f.status === 'processing'

  return (
    statusIsOk && typeof f.user === 'string' && typeof f.private === 'boolean'
  )
}

export type FeeLevel = 'MAX' | 'MID' | 'MIN'
