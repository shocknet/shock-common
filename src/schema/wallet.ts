export interface PaymentV2 {
  payment_hash: string

  creation_date: string

  payment_preimage: string

  value_sat: string

  value_msat: string

  payment_request: string

  status: 'UNKNOWN' | 'IN_FLIGHT' | 'SUCCEEDED' | 'FAILED'

  fee_sat: number

  fee_msat: number

  creation_time_ns: string

  payment_index: string

  failure_reason:
    | 'FAILURE_REASON_NONE'
    | 'FAILURE_REASON_TIMEOUT'
    | 'FAILURE_REASON_NO_ROUTE'
    | 'FAILURE_REASON_ERROR'
    | 'FAILURE_REASON_INCORRECT_PAYMENT_DETAILS'
    | 'FAILURE_REASON_INSUFFICIENT_BALANCE'
}
