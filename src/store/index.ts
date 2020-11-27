/**
 * Please maintain very strict typechecking inside this file.
 */
import * as Redux from 'redux'
import * as ReduxThunk from 'redux-thunk'

import * as Actions from './actions'
import { State, reducersObj } from './reducers'
import * as Selectors from './selectors'
import * as Thunks from './thunks'
import * as API from './api'

interface CreateStoreArgs {
  combineReducers: typeof Redux.combineReducers
  Http: API.IHttp
  RSAKeychain: API.IRSAKeychain
  bigConstructor: API.BigConstructor
  eventProviders: API.EventProviderMap
  getToken: API.GetToken
}

////////////////////////////////////////////////////////////////////////////////

const shockThunkMiddleware: ReduxThunk.ThunkMiddleware<
  State,
  Actions.ShockAction,
  undefined
> = ReduxThunk.default

type ShockThunkDispatchOverload = ReduxThunk.ThunkDispatch<
  State,
  undefined,
  Actions.ShockAction
>

const appliedMiddleware: Redux.StoreEnhancer<{
  dispatch: ShockThunkDispatchOverload
}> = Redux.applyMiddleware<() => void, State>(shockThunkMiddleware)

type ShockStore = Redux.Store<State, Actions.ShockAction> & {
  dispatch: ShockThunkDispatchOverload
}

////////////////////////////////////////////////////////////////////////////////

const createStore = ({
  combineReducers,
  Http,
  RSAKeychain,
  bigConstructor,
  eventProviders,
  getToken,
}: CreateStoreArgs): ShockStore => {
  API.setHttp(Http)
  API.setRSAKeychain(RSAKeychain)
  API.setBigConstructor(bigConstructor)
  API.setEvents(eventProviders)
  API.setGetToken(getToken)

  const rootReducer: Redux.Reducer<
    State,
    Actions.ShockAction
  > = combineReducers<State, Actions.ShockAction>(reducersObj)

  const store: ShockStore = Redux.createStore<
    State,
    Actions.ShockAction,
    {
      dispatch: ShockThunkDispatchOverload
    },
    // eslint-disable-next-line @typescript-eslint/ban-types
    {}
  >(rootReducer, appliedMiddleware)

  return store
}

type ReducersObj = typeof reducersObj

export {
  Actions,
  Selectors,
  Thunks,
  createStore,
  State,
  ReducersObj,
  ShockStore,
  reducersObj,
}

export * from './sagas'
export * from './api'
