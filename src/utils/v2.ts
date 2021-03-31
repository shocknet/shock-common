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
