/**
 * @typedef {import('../../schema').FeeLevel} FeeLevel
 */
/**
 * @typedef {object} State
 * @prop {FeeLevel} feesLevel
 * @prop {string} feesSource
 */

/** @type {State} */
const INITIAL_STATE = {
  feesLevel: 'MID',
  feesSource: 'https://mempool.space/api/v1/fees/recommended',
}

/**
 * @param {State} state
 * @param {import('../actions').ShockAction} action
 * @returns {State}
 */
const fees = (state = INITIAL_STATE, action) => {
  // @ts-expect-error
  if (!action.data) {
    return state
  }
  switch (action.type) {
    case 'fees/updateSelected': {
      const { data } = action
      if (data !== 'MIN' && data !== 'MID' && data !== 'MAX') {
        return state
      }
      return {
        ...state,
        feesLevel: data,
      }
    }
    case 'fees/updateSource': {
      const { data } = action
      return {
        ...state,
        feesSource: data,
      }
    }
    default: {
      return state
    }
  }
}

export default fees
