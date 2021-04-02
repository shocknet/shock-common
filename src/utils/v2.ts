import * as Constants from '../constants'

type BetterExecutor<T> = (
  resolve: (value?: T | PromiseLike<T>) => void,
  reject: (error: Error) => void,
) => void

export const makePromise = <T>(executor: BetterExecutor<T>): Promise<T> => {
  return new Promise<T>(
    // @ts-expect-error Type widening issue; TODO
    executor,
  )
}

export const timeout = <T>(ms: number, promise: Promise<T>): Promise<T> => {
  let timeoutID: NodeJS.Timeout

  return Promise.race<Promise<T>>([
    new Promise((_, rej) => {
      timeoutID = setTimeout(() => {
        rej(new Error(Constants.ErrorCode.TIMEOUT_ERR))
      }, ms)
    }),

    promise.then((v) => {
      clearTimeout(timeoutID)
      return v
    }),
  ])
}

type R<T> = T extends Promise<infer U> ? U : T
/**
 * Helper for return types via typescript of yield calls inside sagas.
 */
export type YieldReturn<T> = R<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ReturnType<T extends (...args: any) => any ? T : any>
>

/**
 * Converts seconds/microseconds timestamps to milliseconds, leaves milliseconds
 * timestamps untouched. Works for timestamps no older than 2001.
 * @timestamp A timestamp that can be seconds, milliseconds or microseconds.
 * Should be no older than 2001.
 */
export function normalizeTimestampToMs(timestamp: number): number {
  if (timestamp === 0) {
    return timestamp
  }

  const t = timestamp.toString()

  if (t.length === 10) {
    // is seconds
    return Number(t) * 1000
  } else if (t.length === 13) {
    // is milliseconds
    return Number(t)
  } else if (t.length === 16) {
    // is microseconds
    return Number(t) / 1000
  }

  throw new TypeError('normalizeTimestamp() -> could not interpret timestamp')
}
