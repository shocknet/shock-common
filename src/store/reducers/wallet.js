import * as Actions from '../actions'
import * as API from '../api'
const {
  Misc: { Big },
} = API

/**
 * @typedef {object} State
 * @prop {string} channelBalance
 * @prop {string} confirmedBalance
 * @prop {string|null} USDRate
 * @prop {string} totalBalance
 * @prop {string} pendingChannelBalance
 */

/** @type {State} */
const INITIAL_STATE = {
  totalBalance: '0',
  channelBalance: '0',
  confirmedBalance: '0',
  pendingChannelBalance: '0',

  USDRate: null,
}

/**
 * @param {State} state
 * @param {Actions.ShockAction} action
 */
const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'balance/loaded': {
      const {
        channelBalance,
        confirmedBalance,
        pendingChannelBalance,
        // @ts-expect-error
      } = action.data

      const totalBalance = Big(confirmedBalance)
        .add(channelBalance)
        .add(pendingChannelBalance)
        .toString()

      return {
        ...state,
        totalBalance,
        channelBalance,
        confirmedBalance,
        pendingChannelBalance,
      }
    }

    case 'usdRate/loaded': {
      // @ts-expect-error
      const { data } = action

      return {
        ...state,
        USDRate: data,
      }
    }

    default:
      return state
  }
}

export default wallet
