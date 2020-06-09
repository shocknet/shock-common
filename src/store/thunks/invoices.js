import * as API from '../api'
import * as Actions from '../actions'

const { ACTIONS } = Actions.Invoices

/**
 * @typedef {object} ErrReturn
 * @prop {'error'} type
 * @prop {any} error
 */

/**
 * Decode payment request
 * @param {string} paymentRequest
 * @returns {import('./shock-thunk').default<Promise<undefined | ErrReturn>>}
 */
export const decodePaymentRequest = (paymentRequest) => async (dispatch) => {
  try {
    const decodedInvoice = await API.Wallet.decodeInvoice({
      payReq: paymentRequest,
    })

    dispatch({
      type: ACTIONS.DECODE_PAYMENT_REQUEST,
      data: {
        ...decodedInvoice.decodedRequest,
        payment_request: paymentRequest,
      },
    })

    return undefined
  } catch (err) {
    return {
      type: 'error',
      error: err,
    }
  }
}

// TODO: Instant Creation.

/**
 * Create a new invoice
 * @param {API.Wallet.AddInvoiceRequest} invoice
 * @returns {import('./shock-thunk').default}
 */
export const addInvoice = (invoice) => async (dispatch) => {
  const newInvoice = await API.Wallet.addInvoice(invoice)
  dispatch({
    type: ACTIONS.ADD_INVOICE,
    data: newInvoice.payment_request,
  })
}

// TODO: Instant Creation.

/**
 * Create a new address and set it
 * @returns {import('redux-thunk').ThunkAction<void, {}, {}, import('redux').AnyAction>}
 */
export const newAddress = () => async (dispatch) => {
  const address = await API.Wallet.newAddress()
  dispatch({
    type: ACTIONS.SET_ADDRESS,
    data: address,
  })
}
