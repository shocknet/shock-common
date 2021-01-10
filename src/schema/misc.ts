export const isObj = (o: unknown): o is Record<string, unknown> =>
  typeof o === 'object' && o !== null

export type FeeLevel = 'MAX' | 'MID' | 'MIN'

export const isPopulatedString = (s: unknown): s is string =>
  typeof s === 'string' && s.length > 0

export interface Bytes {
  type: string
  data: number[]
}

export interface Feature {
  is_known: boolean
  is_required: boolean
  name: string
}

export const isFeature = (o: unknown): o is Feature => {
  if (!isObj(o)) return false

  const f = (o as unknown) as Feature

  return (
    typeof f.is_known === 'boolean' &&
    typeof f.is_required === 'boolean' &&
    isPopulatedString(f.name)
  )
}
