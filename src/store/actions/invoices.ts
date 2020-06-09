export const ACTIONS = {
  SET_AMOUNT: 'invoice/amount',
  SET_DESCRIPTION: 'invoice/description',
  SET_INVOICE_MODE: 'invoice/mode',
  SET_RECIPIENT_ADDRESS: 'invoice/recipientAddress',
  SET_UNIT_SELECTED: 'invoice/unit',
  SET_ADDRESS: 'invoice/address',
  DECODE_PAYMENT_REQUEST: 'invoice/load',
  ADD_INVOICE: 'invoice/add',
  RESET_INVOICE: 'invoice/reset',
} as const

/**
 * @typedef {({ type: 'error', error: Error }|undefined)} DecodeResponse
 */

/**
 * @typedef {object} WalletBalance
 * @prop {string} confirmedBalance
 * @prop {string} pendingChannelBalance
 * @prop {string} channelBalance
 */

export const setAmount = (amount: number) => ({
  type: ACTIONS.SET_AMOUNT,
  data: amount,
})

/**
 * Set Invoice Amount
 */
export const setDescription = (description: string) => ({
  type: ACTIONS.SET_DESCRIPTION,
  data: description,
})

/**
 * Set Invoice Mode
 */
export const setInvoiceMode = (invoiceMode: boolean) => ({
  type: ACTIONS.SET_INVOICE_MODE,
  data: invoiceMode,
})

/**
 * Set Unit Selected
 */
export const setUnitSelected = (unit: 'BTC' | 'sats' | 'Bits') => ({
  type: ACTIONS.SET_UNIT_SELECTED,
  data: unit,
})

/**
 * Reset Invoice
 */
export const resetInvoice = () => ({
  type: ACTIONS.RESET_INVOICE,
})

type ValueOf<T> = T[keyof T]

export type InvoiceAction =
  | ReturnType<typeof setAmount>
  | ReturnType<typeof setDescription>
  | ReturnType<typeof setInvoiceMode>
  | ReturnType<typeof setUnitSelected>
  | ReturnType<typeof resetInvoice>
  | {
      type: ValueOf<typeof ACTIONS>
      data: any
    }
