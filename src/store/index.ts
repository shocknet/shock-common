/**
 * Please maintain very strict typechecking inside this file.
 */
import * as Redux from 'redux'
import * as ReduxThunk from 'redux-thunk'

import * as Actions from './actions'
import { State, reducersObj } from './reducers'
import * as Selectors from './selectors'
import * as Thunks from './thunks'

interface CreateStoreArgs {
  combineReducers: typeof Redux.combineReducers
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

const createStore = ({ combineReducers }: CreateStoreArgs): ShockStore => {
  const rootReducer: Redux.Reducer<
    State,
    Actions.ShockAction
  > = combineReducers<State, Actions.ShockAction>(reducersObj)

  // <S, A extends Action, Ext, StateExt>(
  //   reducer: Reducer<S, A>,
  //   enhancer?: StoreEnhancer<Ext, StateExt>
  // ): Store<S & StateExt, A> & Ext

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
}
