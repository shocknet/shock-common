import * as Actions from '../actions'

/**
 * @typedef {object} State
 * @prop {any} nodeInfo
 * @prop {any} nodeHealth
 * @prop {'online'|'offline'} connectionStatus
 */

/** @type {State} */
const INITIAL_STATE = {
  nodeInfo: {},
  nodeHealth: null,
  connectionStatus: 'online',
}

/**
 * @param {State} state
 * @param {Actions.ShockAction} action
 * @returns {State}
 */
const node = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'nodeInfo/load': {
      // @ts-ignore
      const { data } = action
      return {
        ...state,
        nodeInfo: data,
      }
    }
    case 'health/load': {
      // @ts-ignore
      const { data } = action
      return {
        ...state,
        nodeHealth: data,
      }
    }
    case 'connectionStatus/update': {
      // @ts-ignore
      const { data } = action
      return {
        ...state,
        connectionStatus: data,
      }
    }
    default:
      return state
  }
}

export default node
