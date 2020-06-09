import * as API from '../api'
import * as Actions from '../actions'

import ShockThunk from './shock-thunk'

const { Wallet } = API

export const getWalletBalance = (): ShockThunk<
  Promise<Actions.Wallet.WalletBalance>
> => async (dispatch) => {
  const balance = await Wallet.balance()

  const data = {
    confirmedBalance: balance.confirmed_balance,
    pendingChannelBalance: balance.pending_channel_balance,
    channelBalance: balance.channel_balance,
  }

  dispatch(Actions.Wallet.walletBalanceLoaded(data))

  return data
}

export const getUSDRate = (): ShockThunk<Promise<number>> => async (
  dispatch,
) => {
  const usdRate = await Wallet.USDExchangeRate()

  dispatch(Actions.Wallet.usdRateSet(usdRate))

  return usdRate
}
