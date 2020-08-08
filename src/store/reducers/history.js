import reverse from 'lodash/reverse'

import { ACTIONS } from '../actions/history'
import * as API from '../api'

/**
 * @typedef {API.Wallet.Invoice | API.Wallet.Payment | API.Wallet.Transaction} UnifiedTransaction
 */

/**
 * @typedef {object} State
 * @prop {API.Wallet.Channel[]} channels
 * @prop {object} invoices
 * @prop {API.Wallet.Peer[]} peers
 * @prop {object} transactions
 * @prop {object} payments
 * @prop {API.Wallet.Transaction[]} recentTransactions
 * @prop {API.Wallet.Payment[]} recentPayments
 * @prop {API.Wallet.Invoice[]} recentInvoices
 * @prop {UnifiedTransaction[]} unifiedTransactions
 */

/** @type {State} */
const INITIAL_STATE = {
  channels: [],
  invoices: {
    content: [],
    page: 0,
    totalPages: 0,
    totalItems: 0,
  },
  peers: [],
  transactions: {
    content: [],
    page: 0,
    totalPages: 0,
    totalItems: 0,
  },
  payments: {
    content: [],
    page: 0,
    totalPages: 0,
    totalItems: 0,
  },
  recentTransactions: [],
  recentPayments: [],
  recentInvoices: [],
  unifiedTransactions: [],
}
/**
 * @param {State} state
 * @param {import('../actions').ShockAction} action
 * @returns {State}
 */
const history = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_CHANNELS: {
      const { data } = action
      return {
        ...state,

        // @ts-ignore TODO
        channels: data,
      }
    }
    case ACTIONS.LOAD_INVOICES: {
      const { data } = action
      return {
        ...state,
        invoices: data,
      }
    }
    case ACTIONS.LOAD_MORE_INVOICES: {
      const { data } = action
      return {
        ...state,
        invoices: {
          ...data,
          // @ts-expect-error
          content: [...state.invoices.content, ...data.content],
        },
      }
    }
    case ACTIONS.LOAD_PEERS: {
      const { data } = action
      return {
        ...state,
        // @ts-ignore TODO
        peers: data,
      }
    }
    case ACTIONS.LOAD_PAYMENTS: {
      const { data } = action
      return {
        ...state,
        // @ts-ignore TODO
        payments: data,
      }
    }
    case ACTIONS.LOAD_MORE_PAYMENTS: {
      const { data } = action
      return {
        ...state,
        payments: {
          // @ts-ignore TODO
          ...data,
          // @ts-expect-error
          content: [...state.payments.content, ...data.content],
        },
      }
    }
    case ACTIONS.LOAD_TRANSACTIONS: {
      const { data } = action
      return {
        ...state,
        // @ts-ignore TODO
        transactions: data,
      }
    }
    case ACTIONS.LOAD_MORE_TRANSACTIONS: {
      const { data } = action
      return {
        ...state,
        transactions: {
          ...data,
          // @ts-expect-error
          content: [...state.transactions.content, ...data.content],
        },
      }
    }
    case ACTIONS.LOAD_RECENT_TRANSACTIONS: {
      /**
       * @param {API.Wallet.Invoice | API.Wallet.Payment | API.Wallet.Transaction} unifiedTransaction
       */
      const { data } = action

      return {
        ...state,
        // @ts-ignore TODO
        recentTransactions: data.content,
      }
    }
    case ACTIONS.LOAD_NEW_RECENT_INVOICE: {
      const { data } = action

      return {
        ...state,
        // @ts-ignore TODO
        recentInvoices: [data, ...state.recentInvoices],
      }
    }
    case ACTIONS.UNIFY_TRANSACTIONS: {
      const filteredTransactions = [
        ...state.recentTransactions,
        ...state.recentPayments,
        ...state.recentInvoices,
      ].filter(
        /**
         * @param {API.Wallet.Invoice | API.Wallet.Payment | API.Wallet.Transaction} unifiedTransaction
         */
        (unifiedTransaction) => {
          if (API.Wallet.isInvoice(unifiedTransaction)) {
            return unifiedTransaction.settled
          }

          if (API.Wallet.isPayment(unifiedTransaction)) {
            return unifiedTransaction.status === 'SUCCEEDED'
          }

          if (API.Wallet.isTransaction(unifiedTransaction)) {
            return true
          }

          return false
        },
      )

      const sortedTransactions = filteredTransactions.sort(
        /**
         * @param {API.Wallet.Invoice | API.Wallet.Payment | API.Wallet.Transaction} a
         * @param {API.Wallet.Invoice | API.Wallet.Payment | API.Wallet.Transaction} b
         */
        (a, b) => {
          const _a = (() => {
            if (API.Wallet.isInvoice(a)) {
              return Number(a.settle_date)
            }

            if (API.Wallet.isPayment(a)) {
              return Number(a.creation_date)
            }

            if (API.Wallet.isTransaction(a)) {
              return Number(a.time_stamp)
            }

            return 0
          })()

          const _b = (() => {
            if (API.Wallet.isInvoice(b)) {
              return Number(b.settle_date)
            }

            if (API.Wallet.isPayment(b)) {
              return Number(b.creation_date)
            }

            if (API.Wallet.isTransaction(b)) {
              return Number(b.time_stamp)
            }

            return 0
          })()

          return _b - _a
        },
      )

      return {
        ...state,
        unifiedTransactions: sortedTransactions,
      }
    }
    case ACTIONS.LOAD_NEW_RECENT_TRANSACTION: {
      const { data } = action

      return {
        ...state,
        // @ts-ignore TODO
        recentTransactions: [data, ...state.recentTransactions],
      }
    }
    case ACTIONS.LOAD_RECENT_INVOICES: {
      const { data } = action

      return {
        ...state,
        // @ts-ignore TODO
        recentInvoices: reverse(data),
      }
    }
    default:
      return state
  }
}

export default history
