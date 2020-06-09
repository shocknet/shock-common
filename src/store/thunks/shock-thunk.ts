import { ThunkAction } from 'redux-thunk'

import * as Actions from '../actions'
import { State } from '../reducers'

type ShockThunk<R = void> = ThunkAction<
  R,
  State,
  undefined | void,
  Actions.ShockAction
>

export default ShockThunk
