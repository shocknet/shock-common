import { isObj } from './misc'

export type PaymentV2Status = 'UNKNOWN' | 'IN_FLIGHT' | 'SUCCEEDED' | 'FAILED'

export const isPaymentV2Status = (str: string): str is PaymentV2Status => {
  return (
    str === 'UNKNOWN' ||
    str === 'IN_FLIGHT' ||
    str === 'SUCCEEDED' ||
    str === 'FAILED'
  )
}

export type PaymentV2FailureReason =
  | 'FAILURE_REASON_NONE'
  | 'FAILURE_REASON_TIMEOUT'
  | 'FAILURE_REASON_NO_ROUTE'
  | 'FAILURE_REASON_ERROR'
  | 'FAILURE_REASON_INCORRECT_PAYMENT_DETAILS'
  | 'FAILURE_REASON_INSUFFICIENT_BALANCE'

export const isPaymentV2FailureReason = (
  str: string,
): str is PaymentV2FailureReason => {
  return (
    str === 'FAILURE_REASON_NONE' ||
    str === 'FAILURE_REASON_TIMEOUT' ||
    str === 'FAILURE_REASON_NO_ROUTE' ||
    str === 'FAILURE_REASON_ERROR' ||
    str === 'FAILURE_REASON_INCORRECT_PAYMENT_DETAILS' ||
    str === 'FAILURE_REASON_INSUFFICIENT_BALANCE'
  )
}

export interface PaymentV2 {
  payment_hash: string

  creation_date: string

  payment_preimage: string

  value_sat: string

  value_msat: string

  payment_request: string

  status: PaymentV2Status

  fee_sat: string

  fee_msat: string

  creation_time_ns: string

  payment_index: string

  failure_reason: PaymentV2FailureReason
}

export const isPaymentV2 = (o: unknown): o is PaymentV2 => {
  const p = o as PaymentV2
  if (!isObj(o)) {
    return false
  }

  if (typeof p.creation_date !== 'string') {
    return false
  }
  if (typeof p.creation_time_ns !== 'string') {
    return false
  }
  if (!isPaymentV2FailureReason(p.failure_reason)) {
    return false
  }
  if (typeof p.fee_msat !== 'string') {
    return false
  }
  if (typeof p.fee_sat !== 'string') {
    return false
  }
  if (typeof p.payment_hash !== 'string') {
    return false
  }
  if (typeof p.payment_index !== 'string') {
    return false
  }
  if (typeof p.payment_preimage !== 'string') {
    return false
  }
  if (typeof p.payment_request !== 'string') {
    return false
  }
  if (!isPaymentV2Status(p.status)) {
    return false
  }
  if (typeof p.value_msat !== 'string') {
    return false
  }
  if (typeof p.value_sat !== 'string') {
    return false
  }

  return true
}
