export type OrderType =
  | 'spontaneousPayment'
  | 'tip'
  | 'service'
  | 'product'
  | 'other'
  | 'invoice'
  | 'payment'
  | 'chainTx'

export interface Coordinate {
  /**
   * Can be unknown when inbound.
   */
  fromLndPub?: string
  /**
   * Node  where transaction was received.
   */
  toLndPub: string
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
   * True if inbound trasaction.
   */
  inbound: boolean
  /**
   * Reserved for buddy system: can be undefined, '', 'me', or node owner pub
   * key to represent node owner, otherwise it represent a buddy.
   */
  ownerGunPub?: string
  /**
   * Can be payment_hash, or r_hash depending on if it's a
   * payment  or an invoice, if it's a r_hash, must be hex encoded.
   */
  id: string
  /**
   * The order type.
   */
  type: OrderType
  /**
   * The amount.
   */
  amount: number
  /**
   * Description about trasaction.
   */
  description?: string
  /**
   *
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
