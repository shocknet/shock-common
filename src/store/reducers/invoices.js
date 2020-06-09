import * as Actions from '../actions'
const { ACTIONS } = Actions.Invoices

/**
 * @typedef {object} State
 * @prop {string} amount
 * @prop {string} description
 * @prop {boolean} invoiceMode
 * @prop {string} recipientAddress
 * @prop {string} paymentRequest
 * @prop {string} btcAddress
 * @prop {string} unitSelected
 */

/** @type {State} */
const INITIAL_STATE = {
  amount: '',
  description: '',
  invoiceMode: true,
  paymentRequest: '',
  recipientAddress: '',
  btcAddress: '',
  unitSelected: 'Sats',
}

/**
 * @param {State} state
 * @param {Actions.ShockAction} action
 * @returns {State}
 */
const invoice = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.SET_AMOUNT: {
      // @ts-ignore
      const { data } = action
      if (!data) {
        return state
      }
      return {
        ...state,
        // @ts-ignore TODO
        amount: data,
      }
    }
    case ACTIONS.SET_DESCRIPTION: {
      // @ts-ignore
      const { data } = action
      if (!data) {
        return state
      }
      return {
        ...state,
        // @ts-ignore TODO
        description: data,
      }
    }
    case ACTIONS.SET_INVOICE_MODE: {
      // @ts-ignore
      const { data } = action
      if (!data) {
        return state
      }
      return {
        ...state,
        // @ts-ignore TODO
        invoiceMode: data,
      }
    }
    case ACTIONS.SET_RECIPIENT_ADDRESS: {
      // @ts-ignore
      const { data } = action
      return {
        ...state,
        // @ts-ignore TODO
        recipientAddress: data,
      }
    }
    case ACTIONS.SET_UNIT_SELECTED: {
      // @ts-ignore
      const { data } = action
      return {
        ...state,
        // @ts-ignore TODO
        unitSelected: data,
      }
    }
    case ACTIONS.ADD_INVOICE: {
      // @ts-ignore
      const { data } = action
      return {
        ...state,
        // @ts-ignore TODO
        paymentRequest: data,
      }
    }
    case ACTIONS.SET_ADDRESS: {
      // @ts-ignore
      const { data } = action
      return {
        ...state,
        // @ts-ignore TODO
        btcAddress: data,
      }
    }
    case ACTIONS.DECODE_PAYMENT_REQUEST: {
      // @ts-ignore
      const { data } = action
      return {
        ...state,
        // @ts-ignore TODO
        amount: data.num_satoshis,
        // @ts-ignore TODO
        recipientAddress: data.destination,
        // @ts-ignore TODO
        paymentRequest: data.payment_request,
        // @ts-ignore TODO
        description: data.description,
      }
    }
    case ACTIONS.RESET_INVOICE: {
      return INITIAL_STATE
    }
    default:
      return state
  }
}

export default invoice
