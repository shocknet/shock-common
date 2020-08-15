export interface WalletBalance {
  confirmedBalance: string
  pendingChannelBalance: string
  channelBalance: string
}

export const walletBalanceLoaded = (balance: WalletBalance) =>
  ({
    type: 'balance/loaded',
    data: balance,
  } as const)

export const usdRateSet = (rate: number) =>
  ({
    type: 'usdRate/loaded',
    data: rate,
  } as const)

export type WalletAction =
  | ReturnType<typeof walletBalanceLoaded>
  | ReturnType<typeof usdRateSet>
