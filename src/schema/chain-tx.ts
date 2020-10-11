import { isObj } from './misc'

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
  num_confirmations: number

  /**
   * The hash of the block this transaction was included in
   */
  block_hash: string

  /**
   * The height of the block this transaction was included in
   */
  block_height: number

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
  dest_addresses: string[]

  /**
   * The raw transaction hex.
   */
  raw_tx_hex: string

  /**
   * A label that was optionally set on transaction broadcast.
   */
  label: string
}

export const isChainTransaction = (o: unknown): o is ChainTransaction => {
  const {
    amount,
    block_hash,
    block_height,
    dest_addresses,
    label,
    num_confirmations,
    raw_tx_hex,
    time_stamp,
    total_fees,
    tx_hash,
  } = o as ChainTransaction

  if (!isObj(o)) {
    return false
  }

  if (typeof amount !== 'string') {
    return false
  }

  if (typeof block_hash !== 'string') {
    return false
  }

  if (typeof block_height !== 'number') {
    return false
  }

  if (!Array.isArray(dest_addresses)) {
    return false
  }

  if (!dest_addresses.every((da) => typeof da === 'string')) {
    return false
  }

  if (typeof label !== 'string') {
    return false
  }

  if (typeof num_confirmations !== 'number') {
    return false
  }

  if (typeof raw_tx_hex !== 'string') {
    return false
  }

  if (typeof time_stamp !== 'string') {
    return false
  }

  if (typeof total_fees !== 'string') {
    return false
  }

  if (typeof tx_hash !== 'string') {
    return false
  }

  return true
}
