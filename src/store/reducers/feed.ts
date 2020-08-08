import * as Redux from 'redux'

import * as Schema from '../../schema'
import * as Actions from '../actions'

export interface State {
  currentFeed: Schema.Post[]
  latestViewedPostID: string
  lastFetchedPage: number
  lastFetchTimestamp: number
}

const reducer: Redux.Reducer<State, Actions.ShockAction> = (
  state = {
    currentFeed: [],
    latestViewedPostID: '',
    lastFetchedPage: -1,
    lastFetchTimestamp: 0,
  },
  action: Actions.ShockAction,
) => {
  switch (action.type) {
    case 'receivedFeed':
      return {
        ...state,
        currentFeed: [...state.currentFeed, ...action.data.posts],
      }

    case 'receivedBackfeed':
      return {
        ...state,
        currentFeed: [...action.data.posts, ...state.currentFeed],
      }

    case '@@redux/INIT' as Actions.ShockAction['type']:
      return {
        ...state,
        currentFeed: [],
        lastFetchedPage: -1,
        lastFetchTimestamp: 0,
      }

    default:
      return state
  }
}

export default reducer
