import * as Actions from '../actions'
import * as API from '../api'

// TODO: Reducers must be pure. UUID is not.
const {
  Misc: { uuidv4 },
} = API

/**
 * @typedef {object} State
 * @prop {string?} devicePublicKey
 * @prop {string?} APIPublicKey
 * @prop {string?} sessionId
 * @prop {string} deviceId
 * @prop {boolean} socketConnected
 */

/** @type {State} */
const INITIAL_STATE = {
  devicePublicKey: null,
  APIPublicKey: null,
  sessionId: null,
  deviceId: uuidv4(),
  socketConnected: false,
}

/**
 * @param {State} state
 * @param {Actions.ShockAction} action
 * @returns {State}
 */
const connection = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'encryption/loadKeys': {
      // @ts-expect-error
      if (!action.data) {
        return state
      }
      // @ts-expect-error
      const { devicePublicKey, APIPublicKey, sessionId } = action.data
      return {
        ...state,
        devicePublicKey,
        sessionId,
        APIPublicKey,
      }
    }
    case 'socket/socketDidConnect': {
      return {
        ...state,
        socketConnected: true,
      }
    }
    case 'socket/socketDidDisconnect': {
      return {
        ...state,
        socketConnected: false,
      }
    }
    default:
      return state
  }
}

export default connection
