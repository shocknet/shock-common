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
