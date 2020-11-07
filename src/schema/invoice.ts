import { isObj, isPopulatedString } from './misc'

export interface Hash {
  data: number[]
  type: 'Buffer'
}

export const isHash = (o: unknown): o is Hash => {
  if (!isObj(o)) return false
  const hash = (o as unknown) as Hash

  return (
    Array.isArray(hash.data) &&
    hash.data.every((x) => typeof x === 'number') &&
    hash.type === 'Buffer'
  )
}

export interface InvoiceWhenAdded {
  add_index: string
  payment_request: string
  r_hash: Hash
  liquidityCheck: boolean
}

export const isInvoiceWhenAdded = (o: unknown): o is InvoiceWhenAdded => {
  if (!isObj(o)) {
    return false
  }

  const inv = (o as unknown) as InvoiceWhenAdded

  return (
    isPopulatedString(inv.add_index) &&
    isPopulatedString(inv.payment_request) &&
    isHash(inv.r_hash)
  )
}

export interface Feature {
  is_known: boolean
  is_required: boolean
  name: string
}

export const isFeature = (o: unknown): o is Feature => {
  if (!isObj(o)) return false

  const f = (o as unknown) as Feature

  return (
    typeof f.is_known === 'boolean' &&
    typeof f.is_required === 'boolean' &&
    isPopulatedString(f.name)
  )
}

export type InvoiceState = 'OPEN' | 'SETTLED' | 'CANCELED' | 'ACCEPTED'

export const isInvoiceState = (s: string): s is InvoiceState =>
  s === 'OPEN' || s === 'SETTLED' || s === 'CANCELED' || s === 'ACCEPTED'

export interface InvoiceWhenListed {
  add_index: string
  amt_paid: string
  amt_paid_msat: string
  amt_paid_sat: string
  cltv_expiry: string
  creation_date: string
  description_hash: Hash
  expiry: string
  fallback_addr: string
  features: Record<string, Feature>
  htlcs: unknown[]
  is_keysend: boolean
  memo: string
  payment_request: string
  private: boolean
  r_hash: Hash
  r_preimage: Hash
  route_hints: unknown[]
  settle_date: string
  settle_index: string
  settled: boolean
  state: InvoiceState
  value: string
  value_msat: string
}

export const isInvoiceWhenListed = (o: unknown): o is InvoiceWhenListed => {
  if (!isObj(o)) return false

  const i = (o as unknown) as InvoiceWhenListed

  return (
    typeof i.add_index === 'string' &&
    typeof i.amt_paid === 'string' &&
    typeof i.amt_paid_msat === 'string' &&
    typeof i.amt_paid_sat === 'string' &&
    typeof i.cltv_expiry === 'string' &&
    typeof i.creation_date === 'string' &&
    isHash(i.description_hash) &&
    typeof i.expiry === 'string' &&
    typeof i.fallback_addr === 'string' &&
    Object.values(i.features).every(isFeature) &&
    Array.isArray(i.htlcs) &&
    typeof i.is_keysend === 'boolean' &&
    typeof i.memo === 'string' &&
    isPopulatedString(i.payment_request) &&
    typeof i.private === 'boolean' &&
    isHash(i.r_hash) &&
    isHash(i.r_preimage) &&
    Array.isArray(i.route_hints) &&
    typeof i.settle_date === 'string' &&
    typeof i.settle_index === 'string' &&
    typeof i.settled === 'boolean' &&
    isInvoiceState(i.state) &&
    isPopulatedString(i.value) &&
    isPopulatedString(i.value_msat)
  )
}

export interface InvoiceWhenDecoded {
  cltv_expiry: string
  description: string
  description_hash: string
  destination: string
  expiry: string
  fallback_addr: string
  features: Record<string, Feature>
  num_msat: string
  num_satoshis: string
  payment_addr: Hash
  payment_hash: string
  route_hints: unknown[]
  timestamp: string
}

export const isInvoiceWhenDecoded = (o: unknown): o is InvoiceWhenDecoded => {
  const i = o as InvoiceWhenDecoded

  if (!isObj(i)) return false

  return (
    typeof i.cltv_expiry === 'string' &&
    typeof i.description === 'string' &&
    typeof i.description_hash === 'string' &&
    typeof i.destination === 'string' &&
    typeof i.expiry === 'string' &&
    typeof i.fallback_addr === 'string' &&
    Object.values(i.features).every(isFeature) &&
    typeof i.num_msat === 'string' &&
    typeof i.num_satoshis === 'string' &&
    isHash(i.payment_addr) &&
    typeof i.payment_hash === 'string' &&
    Array.isArray(i.route_hints) &&
    typeof i.timestamp === 'string'
  )
}
