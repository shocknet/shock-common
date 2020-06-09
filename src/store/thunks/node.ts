import * as API from '../api'
import * as Actions from '../actions'

import ShockThunk from './shock-thunk'

const {
  Misc: { Http },
} = API

export const fetchNodeInfo = (): ShockThunk<
  Promise<API.Wallet.GetInfo>
> => async (dispatch) => {
  const { data } = await Http.get(`/api/lnd/getinfo`)

  dispatch(Actions.Node.loadNodeInfo(data))

  return data as API.Wallet.GetInfo
}

export const fetchNodeHealth = (): ShockThunk<Promise<any>> => async (
  dispatch,
) => {
  const { data } = await Http.get(`/healthz`)

  dispatch(Actions.Node.loadNodeHealth(data))

  return data
}
