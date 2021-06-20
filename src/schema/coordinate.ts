import { isObj, isPopulatedString } from './misc'

export type OrderType =
  | 'spontaneousPayment'
  | 'tip'
  | 'service'
  | 'product'
  | 'torrentSeed'
  | 'streamSeed'
  | 'contentReveal'
  | 'other'
  | 'invoice'
  | 'payment'
  | 'chainTx'

export const isOrderType = (o: unknown): o is OrderType => {
  if (typeof o !== 'string') {
    return false
  }

  return [
    'spontaneousPayment',
    'tip',
    'service',
    'product',
    'torrentSeed',
    'streamSeed',
    'contentReveal',
    'other',
    'invoice',
    'payment',
    'chainTx',
  ].includes(o)
}

/**
 * This represents a settled order only, unsettled orders have no coordinate.
 */
export interface CoordinateOrder {
  /**
   * Can be unknown when inbound.
   */
  fromLndPub?: string
  /**
   * Node  where transaction was received.
   */
  toLndPub?: string
  /**
   * It is optional, if the payment/invoice is not related to an order.
   */
  fromGunPub?: string
  /**
   * It is optional, if the payment/invoice is not related to an order.
   */
  toGunPub?: string
  /**
   * If an on-chain transaction.
   */
  fromBtcPub?: string
  /**
   * If an on-chain transaction.
   */
  toBtcPub?: string
  /**
   * True if inbound transaction.
   */
  inbound: boolean
  /**
   * Reserved for buddy system: can be undefined, '', 'me', or node owner pub
   * key to represent node owner, otherwise it represent a buddy.
   */
  ownerGunPub?: string
  /**
   * Can be payment_index, or add_index depending on if it's a payment  or an invoice
   */
  coordinateIndex: number
  /**
   * Can be payment_hash, or r_hash depending on if it's a payment  or an invoice,
   * if it's a r_hash, must be hex encoded
   */
  coordinateHash: string
  /**
   * The order type.
   */
  type: OrderType
  /**
   * The amount.
   */
  amount: number
  /**
   * Description about transaction.
   */
  description?: string
  /**
   * The memo embedded in the invoice if present.
   */
  invoiceMemo?: string
  /**
   * JSON encoded string to store extra data for special use cases
   */
  metadata?: string
  /**
   * Will be added ar processing time if empty
   */
  timestamp: number
}

export const isCoordinate = (o: unknown): o is CoordinateOrder => {
  if (!isObj(o)) {
    return false
  }

  const obj = (o as unknown) as CoordinateOrder

  if (obj.fromLndPub && typeof obj.fromLndPub !== 'string') {
    return false
  }
  if (obj.toLndPub && typeof obj.toLndPub !== 'string') {
    return false
  }
  if (obj.fromGunPub && typeof obj.fromGunPub !== 'string') {
    return false
  }
  if (obj.toGunPub && typeof obj.toGunPub !== 'string') {
    return false
  }
  if (obj.fromBtcPub && typeof obj.fromBtcPub !== 'string') {
    return false
  }
  if (obj.toBtcPub && typeof obj.toBtcPub !== 'string') {
    return false
  }

  if (obj.ownerGunPub && typeof obj.ownerGunPub !== 'string') {
    return false
  }

  if (obj.description && typeof obj.description !== 'string') {
    return false
  }
  if (obj.invoiceMemo && typeof obj.invoiceMemo !== 'string') {
    return false
  }
  if (obj.metadata && typeof obj.metadata !== 'string') {
    return false
  }

  // obligatory fields

  if (typeof obj.coordinateIndex !== 'number') {
    return false
  }
  if (typeof obj.inbound !== 'boolean') {
    return false
  }
  if (typeof obj.amount !== 'number') {
    return false
  }
  if (!isPopulatedString(obj.coordinateHash)) {
    return false
  }
  if (!isOrderType(obj.type)) {
    return false
  }
  if (typeof obj.timestamp !== 'number') {
    return false
  }

  return true
}
