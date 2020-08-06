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
