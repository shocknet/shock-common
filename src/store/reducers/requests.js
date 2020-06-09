import * as Actions from '../actions'
const {
  Chat: { ACTIONS },
} = Actions

/**
 * TODO: typings
 * @typedef {object} State
 * @prop {any[]} received
 * @prop {any[]} sent
 * @prop {any} selectedRequest
 */

/** @type {State} */
const INITIAL_STATE = {
  received: [],
  sent: [],
  selectedRequest: null,
}

/**
 * @param {State} state
 * @param {Actions.ShockAction} action
 */
const request = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_CONTACTS: {
      // @ts-ignore
      const { data } = action

      return {
        ...state,
        contacts: data,
      }
    }
    case ACTIONS.LOAD_MESSAGES: {
      // @ts-ignore
      const { data } = action

      return {
        ...state,
        messages: data,
      }
    }
    case ACTIONS.RESET_CHAT: {
      return INITIAL_STATE
    }
    default:
      return state
  }
}

export default request
