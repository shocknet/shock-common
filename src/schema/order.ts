export type OrderTargetType =
  | 'spontaneousPayment'
  | 'tip'
  | 'torrentSeed'
  | 'contentReveal'
  | 'other'
  | 'streamSeed'
  | 'service'
  | 'product'

export const isOrderTargetType = (str: string): str is OrderTargetType =>
  str === 'spontaneousPayment' ||
  str === 'tip' ||
  str === 'torrentSeed' ||
  str === 'contentReveal' ||
  str === 'other' ||
  str === 'streamSeed' ||
  str === 'service' ||
  str === 'product'

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
  targetType: OrderTargetType

  /** Field for general ack request info */
  ackInfo?: string
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

  if (!isOrderTargetType(obj.targetType)) {
    return false
  }

  if (
    obj.targetType === 'tip' || 
    obj.targetType === 'torrentSeed' ||
    obj.targetType === 'contentReveal' ||
    obj.targetType === 'streamSeed' ||
    obj.targetType === 'service' ||
    obj.targetType === 'product'
  ) {
    if (typeof obj.ackInfo !== 'string') {
      return false
    }
  }

  return typeof obj.timestamp === 'number'
}

export interface OrderResponse {
  type: 'err' | 'invoice' | 'orderAck'
  response: string
  /**
   * Another order_to_response node where paid content will be served.
   */
  ackNode?: string
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
