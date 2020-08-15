export const isObj = (o: unknown): o is Record<string, unknown> =>
  typeof o === 'object' && o !== null

export type FeeLevel = 'MAX' | 'MID' | 'MIN'
