import * as Redux from 'redux'

import * as Schema from '../../schema'
import * as Actions from '../actions'

export interface State {
  currentFeed: string[]
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
): State => {
  switch (action.type) {
    case 'receivedFeed':
      return {
        ...state,
        currentFeed: [
          ...state.currentFeed,
          ...Schema.normalizePosts(action.data.posts).result,
        ],
        lastFetchedPage: action.data.page,
        lastFetchTimestamp: action.data.timestamp,
      }

    case 'receivedBackfeed':
      return {
        ...state,
        currentFeed: [
          ...Schema.normalizePosts(action.data.posts).result,
          ...state.currentFeed,
        ],
        lastFetchedPage: action.data.page,
        lastFetchTimestamp: action.data.timestamp,
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
