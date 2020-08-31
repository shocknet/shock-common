import * as Constants from '../constants'

export const timeout = <T>(ms: number, promise: Promise<T>): Promise<T> => {
  let timeoutID = {}
  return Promise.race<Promise<T>>([
    promise.then((v) => {
      clearTimeout(timeoutID as never)
      return v
    }),

    new Promise((_, rej) => {
      timeoutID = setTimeout(() => {
        rej(new Error(Constants.ErrorCode.TIMEOUT_ERR))
      }, ms)
    }),
  ])
}
