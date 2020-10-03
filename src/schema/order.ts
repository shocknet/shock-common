export type OrderTargetType = "user" | "post"

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
