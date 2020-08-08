import * as Redux from 'redux'

import * as Schema from '../../schema'
import * as Actions from '../actions'

export type State = Record<string, Schema.PostN>

const reducer: Redux.Reducer<State, Actions.ShockAction> = (
  state = {},
  action,
) => {
  switch (action.type) {
    case 'receivedFeed':
    case 'receivedBackfeed': {
      const normalized = Schema.normalizePosts(action.data.posts)

      return {
        ...state,
        ...normalized.entities.posts,
      }
    }

    default:
      return state
  }
}

export default reducer
