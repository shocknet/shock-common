import * as logger from '../logger'

import isFinite from 'lodash/isFinite'
import isNumber from 'lodash/isNumber'
import isNaN from 'lodash/isNaN'

/**
 * @typedef {import('./schema-types').User} User
 * @typedef {import('./schema-types').PartialUser} PartialUser
 * @typedef {import('./schema-types').EmbeddedImage} EmbeddedImage
 * @typedef {import('./schema-types').EmbeddedVideo} EmbeddedVideo
 * @typedef {import('./schema-types').ContentItem} ContentItem
 * @typedef {import('./schema-types').Paragraph} Paragraph
 * @typedef {import('./schema-types').PostStatus} PostStatus
 * @typedef {import('./schema-types').Post} Post
 * @typedef {import('./schema-types').AuthoredPost} AuthoredPost
 * @typedef {import('./schema-types').FeedPage} FeedPage
 * @typedef {import('./schema-types').Feed} Feed
 */

/**
 * @typedef {object} HandshakeRequest
 * @prop {string} from Public key of the requestor.
 * @prop {string} response Encrypted string where, if the recipient accepts the
 * request, his outgoing feed id will be put. Before that the sender's outgoing
 * feed ID will be placed here, encrypted so only the recipient can access it.
 * @prop {number} timestamp Unix time.
 */

/**
 * @typedef {object} Message
 * @prop {string} body
 * @prop {number} timestamp
 */

/**
 * @typedef {object} ChatMessage
 * @prop {string} body
 * @prop {string} id
 * @prop {boolean} outgoing True if the message is an outgoing message,
 * otherwise it is an incoming message.
 * @prop {number} timestamp
 */

/**
 * @param {unknown} o
 * @returns {o is any}
 */
export const isObj = (o) => typeof o === 'object' && o !== null

/**
 *
 * @param {any} item
 * @returns {item is ChatMessage}
 */
export const isChatMessage = (item) => {
  if (typeof item !== 'object') {
    return false
  }

  if (item === null) {
    return false
  }

  const obj = /** @type {ChatMessage} */ (item)

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
 * @typedef {object} Chat
 * @prop {string} id Chats now have IDs because of disconnect.
 * RecipientPublicKey will no longer be unique.
 * @prop {string|null} recipientAvatar Base64 encoded image.
 * @prop {string} recipientPublicKey A way to uniquely identify each chat.
 * @prop {ChatMessage[]} messages Sorted from most recent to least recent.
 * @prop {string|null} recipientDisplayName
 * @prop {boolean} didDisconnect True if the recipient performed a disconnect.
 * @prop {number|undefined|null} lastSeenApp
 */

/**
 * @param {any} item
 * @returns {item is Chat}
 */
export const isChat = (item) => {
  if (typeof item !== 'object') {
    return false
  }

  if (item === null) {
    return false
  }

  const obj = /** @type {Chat} */ (item)

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

/**
 * @typedef {object} Outgoing
 * @prop {Record<string, Message>} messages
 * @prop {string} with Public key for whom the outgoing messages are intended.
 */

/**
 * @typedef {object} PartialOutgoing
 * @prop {string} with (Encrypted) Public key for whom the outgoing messages are
 * intended.
 */

/**
 * @typedef {object} StoredRequest
 * @prop {string} sentReqID
 * @prop {string} recipientPub
 * @prop {string} handshakeAddress
 * @prop {number} timestamp
 */

/**
 * @param {any} item
 * @returns {item is StoredRequest}
 */
export const isStoredRequest = (item) => {
  if (typeof item !== 'object') return false
  if (item === null) return false
  const obj = /** @type {StoredRequest} */ (item)
  if (typeof obj.recipientPub !== 'string') return false
  if (typeof obj.handshakeAddress !== 'string') return false
  if (typeof obj.handshakeAddress !== 'string') return false
  if (typeof obj.timestamp !== 'number') return false
  return true
}

/**
 * @typedef {object} SimpleSentRequest
 * @prop {string} id
 * @prop {string|null} recipientAvatar
 * @prop {boolean} recipientChangedRequestAddress True if the recipient changed
 * the request node address and therefore can't no longer accept the request.
 * @prop {string|null} recipientDisplayName
 * @prop {string} recipientPublicKey Fallback for when user has no display name.
 * @prop {number} timestamp
 */

/**
 * @param {any} item
 * @returns {item is SimpleSentRequest}
 */
export const isSimpleSentRequest = (item) => {
  if (typeof item !== 'object') {
    return false
  }

  if (item === null) {
    return false
  }

  const obj = /** @type {SimpleSentRequest} */ (item)

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

/**
 * @typedef {object} SimpleReceivedRequest
 * @prop {string} id
 * @prop {string|null} requestorAvatar
 * @prop {string|null} requestorDisplayName
 * @prop {string} requestorPK
 * @prop {number} timestamp
 */

/**
 * @param {any} item
 * @returns {item is SimpleReceivedRequest}
 */
export const isSimpleReceivedRequest = (item) => {
  if (typeof item !== 'object') {
    return false
  }

  if (item === null) {
    return false
  }

  const obj = /** @type {SimpleReceivedRequest} */ (item)

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

/**
 * @param {any} item
 * @returns {item is HandshakeRequest}
 */
export const isHandshakeRequest = (item) => {
  if (typeof item !== 'object') {
    return false
  }

  if (item === null) {
    return false
  }

  const obj = /** @type {HandshakeRequest} */ (item)

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
 * @param {any} item
 * @returns {item is Message}
 */
export const isMessage = (item) => {
  if (typeof item !== 'object') {
    return false
  }

  if (item === null) {
    return false
  }

  const obj = /** @type {Message} */ (item)

  return typeof obj.body === 'string' && typeof obj.timestamp === 'number'
}

/**
 * @param {any} item
 * @returns {item is PartialOutgoing}
 */
export const isPartialOutgoing = (item) => {
  if (typeof item !== 'object') {
    return false
  }

  if (item === null) {
    return false
  }

  const obj = /** @type {PartialOutgoing} */ (item)

  return typeof obj.with === 'string'
}

/**
 * @param {any} item
 * @returns {item is Outgoing}
 */
export const isOutgoing = (item) => {
  if (typeof item !== 'object') {
    return false
  }

  if (item === null) {
    return false
  }

  const obj = /** @type {Outgoing} */ (item)

  const messagesAreMessages = Object.values(obj.messages).every((msg) =>
    isMessage(msg),
  )

  return typeof obj.with === 'string' && messagesAreMessages
}

/**
 * @typedef {object} Order
 * @prop {string} from Public key of sender.
 * @prop {string} amount Encrypted
 * @prop {string} memo Encrypted
 * @prop {number} timestamp
 */

/**
 * @param {any} item
 * @returns {item is Order}
 */
export const isOrder = (item) => {
  if (typeof item !== 'object') {
    return false
  }

  if (item === null) {
    return false
  }

  const obj = /** @type {Order} */ (item)

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

/**
 * @typedef {object} OrderResponse
 * @prop {'err'|'invoice'} type
 * @prop {string} response
 */

/**
 * @param {*} o
 * @returns {o is OrderResponse}
 */
export const isOrderResponse = (o) => {
  if (typeof o !== 'object') {
    return false
  }

  if (o === null) {
    return false
  }

  const obj = /** @type {OrderResponse} */ (o)

  if (typeof obj.response !== 'string') {
    return false
  }

  return obj.type === 'err' || obj.type === 'invoice'
}

/**
 * @typedef {import('./schema-types').EncSpontPayment} EncSpontPayment
 */

const ENC_SPONT_PAYMENT_PREFIX = '$$__SHOCKWALLET__SPONT__PAYMENT'

/**
 * @param {string} s
 * @returns {s is EncSpontPayment}
 */
export const isEncodedSpontPayment = (s) =>
  s.startsWith(ENC_SPONT_PAYMENT_PREFIX)

/**
 * @typedef {object} SpontaneousPayment
 * @prop {number} amt
 * @prop {string} memo
 * @prop {string} preimage
 */

/**
 *
 * @param {EncSpontPayment} sp
 * @throws {Error} If decoding fails.
 * @returns {SpontaneousPayment}
 */
export const decodeSpontPayment = (sp) => {
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

/**
 * @param {number} amt
 * @param {string} memo
 * @param {string} preimage
 * @returns {EncSpontPayment}
 */
export const encodeSpontaneousPayment = (amt, memo, preimage) => {
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

/**
 * @param {unknown} o
 * @returns {o is User}
 */
export const isUser = (o) => {
  const obj = /** @type {User} */ (o)

  /**
   * @param {any} str
   * @returns {boolean}
   */
  const isNullablestring = (str) => str === 'string' || str === null

  return (
    isNullablestring(obj.avatar) &&
    isNullablestring(obj.bio) &&
    isNullablestring(obj.displayName) &&
    typeof obj.lastSeenApp === 'number' &&
    typeof obj.lastSeenNode &&
    typeof obj.publicKey === 'string'
  )
}

/**
 * @param {ContentItem} contentItem
 * @returns {contentItem is EmbeddedImage}
 */
export const isEmbeddedImage = (contentItem) => {
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

/**
 * @param {ContentItem} contentItem
 * @returns {contentItem is EmbeddedVideo}
 */
export const isEmbeddedVideo = (contentItem) => {
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
 * @param {ContentItem} contentItem
 * @returns {contentItem is Paragraph}
 */
export const isParagraph = (contentItem) => {
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

/**
 * @param {ContentItem} contentItem
 * @returns {contentItem is ContentItem}
 */
export const isContentItem = (contentItem) =>
  isEmbeddedVideo(contentItem) ||
  isEmbeddedImage(contentItem) ||
  isParagraph(contentItem)

/**
 * @param {PostStatus} str
 * @returns {str is PostStatus}
 */
export const isPostStatus = (str) =>
  str === 'draft' || str === 'pending' || str === 'private' || str === 'publish'

/**
 * @param {unknown} o
 * @returns {o is Post}
 */
export const isPost = (o) => {
  if (!isObj(o)) {
    return false
  }

  const obj = /** @type {Post} */ (o)

  return (
    typeof obj.date === 'number' &&
    isPostStatus(obj.status) &&
    typeof obj.tags === 'string' &&
    typeof obj.title === 'string' &&
    isObj(obj.contentItems) &&
    Object.values(obj.contentItems).every((ci) => isContentItem(ci))
  )
}

/**
 * @param {AuthoredPost} o
 * @returns {o is AuthoredPost}
 */
export const isAuthoredPost = (o) => isPost(o) && isUser(o.author)

/**
 * @param {unknown} o
 * @returns {o is FeedPage}
 */
export const isFeedPage = (o) => {
  const fp = /** @type {FeedPage} */ (o)

  if (typeof fp.count !== 'number') {
    return false
  }

  if (!isObj(fp.posts)) {
    return false
  }

  return Object.values(fp.posts).every((p) => isPost(p))
}

/**
 * @param {unknown} o
 * @returns {o is Feed}
 */
export const isFeed = (o) => {
  if (!isObj(o)) {
    return false
  }

  const f = /** @type {Feed} */ (o)

  if (typeof f.numOfPages !== 'number') {
    return false
  }

  return Object.values(f.numOfPages).every((fp) => isFeedPage(fp))
}
