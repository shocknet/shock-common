export const ACTIONS = {
  LOAD_CHANNELS: 'channels/load',
  LOAD_INVOICES: 'invoices/load',
  LOAD_MORE_INVOICES: 'invoices/loadMore',
  LOAD_PEERS: 'peers/load',
  LOAD_PAYMENTS: 'payments/load',
  LOAD_MORE_PAYMENTS: 'payments/loadMore',
  LOAD_TRANSACTIONS: 'transactions/load',
  LOAD_MORE_TRANSACTIONS: 'transactions/loadMore',
  LOAD_NEW_RECENT_TRANSACTION: 'transactions/new',
  LOAD_RECENT_TRANSACTIONS: 'recentTransactions/load',
  LOAD_RECENT_PAYMENTS: 'recentPayments/load',
  LOAD_RECENT_INVOICES: 'recentInvoices/load',
  LOAD_NEW_RECENT_INVOICE: 'recentInvoices/new',
  UNIFY_TRANSACTIONS: 'unifiedTransactions/unify',
} as const

type ValueOf<T> = T[keyof T]

/**
 * Unifies and sorts all of the currently loaded transactions, payments and
 * invoices.
 */
export const unifyTransactions = () => ({
  type: ACTIONS.UNIFY_TRANSACTIONS,
  data: undefined,
})

export type HistoryAction =
  | ReturnType<typeof unifyTransactions>
  | {
      type: ValueOf<typeof ACTIONS>
      data: any
    }
