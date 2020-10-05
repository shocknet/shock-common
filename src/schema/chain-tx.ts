export interface ChainTransaction {
  /**
   * The transaction hash
   */
  tx_hash: string

  /**
   * The transaction amount, denominated in satoshis
   */
  amount: string

  /**
   * The number of confirmations
   */
  num_confirmations: string

  /**
   * The hash of the block this transaction was included in
   */
  block_hash: string

  /**
   * The height of the block this transaction was included in
   */
  block_height: string

  /**
   * Timestamp of this transaction
   */
  time_stamp: string

  /**
   * Fees paid for this transaction
   */
  total_fees: string

  /**
   * Addresses that received funds for this transaction
   */
  dest_addresses: string

  /**
   * The raw transaction hex.
   */
  raw_tx_hex: string

  /**
   * A label that was optionally set on transaction broadcast.
   */
  label: string
}
