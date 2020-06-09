import { Reducer } from 'redux'

import * as Schema from '../../schema'
import * as Actions from '../actions'

type State = Record<string, Schema.Post>

const reducer: Reducer<State, Actions.ShockAction> = (
  state: State = {},
  action: Actions.ShockAction,
) => {
  switch (action.type) {
    case '': {
      return state
    }
    default:
      return state
  }
}

export default reducer
