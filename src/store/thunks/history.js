import * as Actions from '../actions'
import * as API from '../api'
/**
 * @template R
 * @typedef {import('./shock-thunk').default<R>} ShockThunk
 */

const {
  History: { ACTIONS },
} = Actions

/**
 * Fetches the Node's info
 * @returns {ShockThunk<Promise<API.Wallet.Channel[]>>}
 */
export const fetchChannels = () => async (dispatch) => {
  const data = await API.Wallet.listChannels()

  dispatch({
    type: ACTIONS.LOAD_CHANNELS,
    data,
  })

  return data
}

/**
 * Fetches the Node's info
 * @returns {ShockThunk<Promise<API.Wallet.PaginatedListInvoicesResponse>>}
 */
export const fetchInvoices = ({
  page = 1,
  itemsPerPage = 10,
  reset = false,
}) => async (dispatch) => {
  const data = await API.Wallet.listInvoices({ page, itemsPerPage })

  if (reset) {
    dispatch({
      type: ACTIONS.LOAD_INVOICES,
      data,
    })
    return data
  }

  dispatch({
    type: ACTIONS.LOAD_MORE_INVOICES,
    data,
  })

  return data
}

/**
 * Fetches the Node's info
 * @returns {ShockThunk<Promise<API.Wallet.Peer[]>>}
 */
export const fetchPeers = () => async (dispatch) => {
  const data = await API.Wallet.listPeers()

  dispatch({
    type: ACTIONS.LOAD_PEERS,
    data,
  })

  return data
}

/**
 * Fetches the Node's info
 * @returns {ShockThunk<Promise<API.Wallet.PaginatedListPaymentsResponse>>}
 */
export const fetchPayments = ({
  page = 1,
  itemsPerPage = 10,
  reset = false,
}) => async (dispatch) => {
  const data = await API.Wallet.listPayments({
    page,
    itemsPerPage,
    paginate: true,
    include_incomplete: false,
  })

  if (reset) {
    dispatch({
      type: ACTIONS.LOAD_PAYMENTS,
      data,
    })
    return data
  }

  dispatch({
    type: ACTIONS.LOAD_MORE_PAYMENTS,
    data,
  })

  return data
}

/**
 * Fetches the Node's info
 * @returns {ShockThunk<Promise<API.Wallet.PaginatedTransactionsResponse>>}
 */
export const fetchTransactions = ({
  page = 1,
  itemsPerPage = 10,
  reset = false,
}) => async (dispatch) => {
  const data = await API.Wallet.getTransactions({
    page,
    itemsPerPage,
    paginate: true,
  })

  if (reset) {
    dispatch({
      type: ACTIONS.LOAD_TRANSACTIONS,
      data,
    })
    return data
  }

  dispatch({
    type: ACTIONS.LOAD_MORE_TRANSACTIONS,
    data,
  })

  return data
}
/**
 * @typedef {[
 *   API.Wallet.PaginatedListInvoicesResponse,
 *   API.Wallet.Peer[],
 *   API.Wallet.Channel[],
 *   API.Wallet.PaginatedListPaymentsResponse,
 *   API.Wallet.PaginatedTransactionsResponse,
 * ]} History
 */

/**
 * Fetches the Node's info
 * @returns {ShockThunk<Promise<History>>}
 */
// @ts-ignore
export const fetchHistory = () => async (dispatch) => {
  const history = await Promise.all([
    dispatch(fetchInvoices({ reset: true })),
    dispatch(fetchPeers()),
    dispatch(fetchChannels()),
    dispatch(fetchPayments({ reset: true })),
    dispatch(fetchTransactions({ reset: true })),
  ])

  dispatch(Actions.History.unifyTransactions())

  return history
}

/**
 * Fetches the recent transactions
 * @returns {ShockThunk<void>}
 */
export const fetchRecentInvoices = () => async (dispatch) => {
  const invoiceResponse = await API.Wallet.listInvoices({
    itemsPerPage: 100,
    page: 1,
  })

  dispatch({
    type: ACTIONS.LOAD_RECENT_INVOICES,
    data: invoiceResponse.content,
  })

  dispatch(Actions.History.unifyTransactions())
}

/**
 * Fetches the latest payments
 * @returns {ShockThunk<void>}
 */
export const fetchRecentPayments = () => async (dispatch) => {
  const payments = await API.Wallet.listPayments({
    include_incomplete: false,
    itemsPerPage: 100,
    page: 1,
    paginate: true,
  })

  const decodedRequests = await Promise.all(
    payments.content.map((payment) =>
      API.Wallet.decodeInvoice({ payReq: payment.payment_request }),
    ),
  )

  const recentPayments = payments.content.map((payment, key) => ({
    ...payment,
    decodedPayment: decodedRequests[key],
  }))

  dispatch({
    type: ACTIONS.LOAD_RECENT_PAYMENTS,
    data: recentPayments,
  })

  dispatch(Actions.History.unifyTransactions())
}

/**
 * Fetches the recent transactions
 * @returns {ShockThunk<void>}
 */
export const fetchRecentTransactions = () => async (dispatch) => {
  const invoiceResponse = await API.Wallet.getTransactions({
    itemsPerPage: 100,
    page: 1,
    paginate: true,
  })

  dispatch({
    type: ACTIONS.LOAD_RECENT_TRANSACTIONS,
    data: invoiceResponse,
  })

  dispatch(Actions.History.unifyTransactions())
}

/**
 * Loads a new invoice into the Redux reducer
 * @param {API.Wallet.Invoice} invoice
 * @returns {ShockThunk<void>}
 */
export const loadNewInvoice = (invoice) => (dispatch) => {
  dispatch({
    type: ACTIONS.LOAD_NEW_RECENT_INVOICE,
    data: invoice,
  })

  dispatch(Actions.History.unifyTransactions())
}

/**
 * Loads a new transaction into the Redux reducer
 * @param {API.Wallet.Transaction} transaction
 * @returns {ShockThunk<void>}
 */
export const loadNewTransaction = (transaction) => (dispatch) => {
  dispatch({
    type: ACTIONS.LOAD_NEW_RECENT_TRANSACTION,
    data: transaction,
  })

  dispatch(Actions.History.unifyTransactions())
}
