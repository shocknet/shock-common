import * as Actions from '../actions'
import uuidv4 from 'uuid/v4'

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
  // TODO: Reducers must be pure. UUID is not.
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
