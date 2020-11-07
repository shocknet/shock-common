export const isObj = (o: unknown): o is Record<string, unknown> =>
  typeof o === 'object' && o !== null

export type FeeLevel = 'MAX' | 'MID' | 'MIN'

export const isPopulatedString = (s: unknown): s is string =>
  typeof s === 'string' && s.length > 0
