import * as Schema from './schema'

export interface FollowRequest {
  publicKey: string
}

export interface UnfollowRequest {
  publicKey: string
}

export interface GetFollowsResponse {
  follows: Record<string, Schema.Follow>
}

/**
 * https://github.com/lightningnetwork/lnd/blob/3ae46d81f4a2edad06ef778b2940d9b06386d93b/lnrpc/rpc.proto#L2988
 */
export interface ListPaymentsRequest {
  include_incomplete: boolean
  index_offset: number
  max_payments: number
  reversed: boolean
}

export const isListPaymentsRequest = (o: unknown): o is ListPaymentsRequest => {
  const lpreq = o as ListPaymentsRequest

  if (!Schema.isObj(o)) {
    return false
  }

  return (
    typeof lpreq.include_incomplete === 'boolean' &&
    typeof lpreq.index_offset === 'number' &&
    typeof lpreq.max_payments === 'number' &&
    typeof lpreq.reversed === 'boolean'
  )
}

/**
 * https://github.com/lightningnetwork/lnd/blob/3ae46d81f4a2edad06ef778b2940d9b06386d93b/lnrpc/rpc.proto#L3017
 */
export interface ListPaymentsResponse {
  first_index_offset: string
  last_index_offset: string
  payments: Array<Schema.PaymentV2>
}

export const isListPaymentsResponse = (
  o: unknown,
): o is ListPaymentsResponse => {
  const lpres = o as ListPaymentsResponse

  if (!Schema.isObj(o)) {
    return false
  }

  return (
    typeof lpres.first_index_offset === 'string' &&
    typeof lpres.last_index_offset === 'string' &&
    Array.isArray(lpres.payments) &&
    lpres.payments.every((p) => Schema.isPaymentV2(p))
  )
}

/**
 * https://github.com/lightningnetwork/lnd/blob/3ae46d81f4a2edad06ef778b2940d9b06386d93b/lnrpc/rpc.proto#L3017
 */
export interface ListPaymentsResponseParsed {
  payments: Array<Schema.PaymentV2>
  first_index_offset: number
  last_index_offset: number
}

export const isListPaymentsResponseParsed = (
  o: unknown,
): o is ListPaymentsResponseParsed => {
  const lpres = o as ListPaymentsResponseParsed

  if (!Schema.isObj(o)) {
    return false
  }

  return (
    typeof lpres.first_index_offset === 'number' &&
    typeof lpres.last_index_offset === 'number' &&
    Array.isArray(lpres.payments) &&
    lpres.payments.every((p) => Schema.isPaymentV2(p))
  )
}
