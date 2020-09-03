type BetterExecutor<T> = (
  resolve: (value?: T | PromiseLike<T>) => void,
  reject: (error: Error) => void,
) => void

export const makePromise = <T>(executor: BetterExecutor<T>): PromiseLike<T> => {
  return new Promise<T>(executor)
}
