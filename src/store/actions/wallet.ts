export interface WalletBalance {
  confirmedBalance: string
  pendingChannelBalance: string
  channelBalance: string
}

export const walletBalanceLoaded = (balance: WalletBalance) => ({
  type: 'balance/loaded',
  data: balance,
})

export const usdRateSet = (rate: number) => ({
  type: 'usdRate/loaded',
  data: rate,
})

export type WalletAction =
  | ReturnType<typeof walletBalanceLoaded>
  | ReturnType<typeof usdRateSet>
