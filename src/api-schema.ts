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

export interface ListInvoicesReq {
  /**
   *If set, only invoices that are not settled and not canceled will be returned
   *in the response.
   */
  pending_only: boolean

  /**
   *The index of an invoice that will be used as either the start or end of a
   *query to determine which invoices should be returned in the response.
   */
  index_offset: number

  /**
   * The max number of invoices to return in the response to this query.
   */
  num_max_invoices: number

  /**
   *If set, the invoices returned will result from seeking backwards from the
   *specified index offset. This can be used to paginate backwards.
   */
  reversed: boolean
}

export interface ListInvoicesResBase {
  /**
   * A list of invoices from the time slice of the time series specified in the
   * request.
   */
  invoices: Array<Schema.InvoiceWhenListed>
}

export interface ListInvoicesRes extends ListInvoicesResBase {
  /**
   *The index of the last item in the set of returned invoices. This can be used
   *to seek further, pagination style.
   */
  last_index_offset: string

  /**
   *The index of the last item in the set of returned invoices. This can be used
   *to seek backwards, pagination style.
   */
  first_index_offset: string
}

export interface ListInvoicesResParsed extends ListInvoicesResBase {
  /**
   *The index of the last item in the set of returned invoices. This can be used
   *to seek further, pagination style.
   */
  last_index_offset: number

  /**
   *The index of the last item in the set of returned invoices. This can be used
   *to seek backwards, pagination style.
   */
  first_index_offset: number
}

export interface ListPaymentsReq {
  /**
   * If true, then return payments that have not yet fully completed. This means
   * that pending payments, as well as failed payments will show up if this
   * field is set to true. This flag doesn't change the meaning of the indices,
   * which are tied to individual payments.
   */
  include_incomplete: boolean

  /**
   * The index of a payment that will be used as either the start or end of a
   * query to determine which payments should be returned in the response. The
   * index_offset is exclusive. In the case of a zero index_offset, the query
   * will start with the oldest payment when paginating forwards, or will end
   * with the most recent payment when paginating backwards.
   */
  index_offset: number

  /**
   * The maximal number of payments returned in the response to this query.
   */
  max_payments: number

  /**
   * If set, the payments returned will result from seeking backwards from the
   * specified index offset. This can be used to paginate backwards. The order
   * of the returned payments is always oldest first (ascending index order).
   */
  reversed: boolean
}

export interface ListPaymentsResBase {
  /**
   * The list of payments
   */
  payments: Array<Schema.PaymentV2>
}

export interface ListPaymentsRes extends ListPaymentsResBase {
  /**
   * The index of the first item in the set of returned payments. This can be
   * used as the index_offset to continue seeking backwards in the next request.
   */
  first_index_offset: string

  /**
   * The index of the last item in the set of returned payments. This can be
   * used as the index_offset to continue seeking forwards in the next request.
   */
  last_index_offset: string
}

export interface ListPaymentsResParsed extends ListPaymentsResBase {
  /**
   * The index of the first item in the set of returned payments. This can be
   * used as the index_offset to continue seeking backwards in the next request.
   */
  first_index_offset: number

  /**
   * The index of the last item in the set of returned payments. This can be
   * used as the index_offset to continue seeking forwards in the next request.
   */
  last_index_offset: number
}

export interface GetTransactionsRequest {
  /**
   * The height from which to list transactions, inclusive. If this value is
   * greater than end_height, transactions will be read in reverse.
   */
  start_height: number

  /**
   * The height until which to list transactions, inclusive. To include
   * unconfirmed transactions, this value should be set to -1, which will return
   * transactions from start_height until the current chain tip and unconfirmed
   * transactions. If no end_height is provided, the call will default to this
   * option.
   */
  end_height: number
}

export interface TransactionDetails {
  /**
   * The list of transactions relevant to the wallet.
   */
  transactions: Array<Schema.ChainTransaction>
}
