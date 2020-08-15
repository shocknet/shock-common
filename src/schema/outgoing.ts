export interface Message {
  body: string
  timestamp: number
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
