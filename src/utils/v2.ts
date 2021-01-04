import { memo, MemoExoticComponent, FunctionComponent } from 'react'

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

export const betterReactMemo = <P = Record<string, unknown>>(
  component: FunctionComponent<P>,
): MemoExoticComponent<FunctionComponent<P>> => {
  const MemoizedComponent = memo(component)

  if (component.displayName) {
    MemoizedComponent.displayName = 'Memoized' + component.displayName
  }

  // @ts-expect-error Not supported according to the typings but needed in some
  // cases.
  MemoizedComponent.propTypes = component.propTypes

  return MemoizedComponent
}
