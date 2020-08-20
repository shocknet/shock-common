import isFinite from 'lodash/isFinite'
import isNumber from 'lodash/isNumber'
import isNaN from 'lodash/isNaN'

import * as logger from '../logger'

/**
 * Exported only for declaration generation. Do not use.
 * https://github.com/microsoft/TypeScript/issues/9865
 */
export enum _EncSpontPayment {
  _ = '',
}

/**
 * Spontaneous payment as found inside a chat message body.
 */
export type EncSpontPayment = _EncSpontPayment & string

const ENC_SPONT_PAYMENT_PREFIX = '$$__SHOCKWALLET__SPONT__PAYMENT'

export const isEncodedSpontPayment = (s: string): s is EncSpontPayment =>
  s.startsWith(ENC_SPONT_PAYMENT_PREFIX)

export interface SpontaneousPayment {
  amt: number
  memo: string
  preimage: string
}

/**
 * @throws {Error} If decoding fails.
 */
export const decodeSpontPayment = (sp: EncSpontPayment): SpontaneousPayment => {
  try {
    const [amtStr, memo, preimage ] = sp
      .slice((ENC_SPONT_PAYMENT_PREFIX + '__').length)
      .split('__')

    if (typeof preimage !== 'string') {
      throw new TypeError('Could not parse preimage')
    }

    if (typeof amtStr !== 'string') {
      throw new TypeError('Could not parse amt')
    }

    if (typeof memo !== 'string') {
      throw new TypeError('Could not parse memo')
    }

    const amt = Number(amtStr)

    if (!isNumber(amt)) {
      throw new TypeError(`Could parse amount as a number, not a number?`)
    }

    if (isNaN(amt)) {
      throw new TypeError(`Could not parse amount as a number, got NaN.`)
    }

    if (!isFinite(amt)) {
      throw new TypeError(
        `Amount was correctly parsed, but got a non finite number.`,
      )
    }

    return {
      amt,
      memo,
      preimage,
    }
  } catch (err) {
    logger.debug(`Encoded spontaneous payment: ${sp}`)
    logger.error(err)
    throw err
  }
}

export const encodeSpontaneousPayment = (
  amt: number,
  memo: string,
  preimage: string,
): EncSpontPayment => {
  if (typeof amt !== 'number') {
    throw new TypeError('amt must be a number')
  }

  if (typeof memo !== 'string') {
    throw new TypeError('memo must be an string')
  }

  if (typeof preimage !== 'string') {
    throw new TypeError('preimage must be an string')
  }

  if (amt <= 0) {
    throw new RangeError('Amt must be greater than zero')
  }

  if (memo.length < 1) {
    throw new TypeError('Memo must be populated')
  }

  if (preimage.length < 1) {
    throw new TypeError('preimage must be populated')
  }

  const enc = `${ENC_SPONT_PAYMENT_PREFIX}__${amt}__${memo}__${preimage}`

  if (isEncodedSpontPayment(enc)) {
    return enc
  }

  throw new Error('isEncodedSpontPayment(enc) false')
}
