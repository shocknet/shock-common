import * as Schema from '../../schema'

export const updateSelectedFee = (feesLevel: Schema.FeeLevel) =>
  ({
    type: 'fees/updateSelected',
    data: feesLevel,
  } as const)

export const updateFeesSource = (feesSource: string) =>
  ({
    type: 'fees/updateSource',
    data: feesSource,
  } as const)

export type FeesAction =
  | ReturnType<typeof updateFeesSource>
  | ReturnType<typeof updateSelectedFee>
