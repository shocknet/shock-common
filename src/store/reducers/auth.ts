import * as Actions from '../actions'

export interface State {
  host: string
}

const INITIAL_STATE: State = {
  host: '',
}

const auth = (state = INITIAL_STATE, action: Actions.ShockAction): State =>
  action ? state : state

export default auth
