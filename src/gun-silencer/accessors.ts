import * as Constants from '../constants'
import * as Logger from '../logger'

import {
  GUNNode,
  Listener,
  ListenerData,
  OpenListener,
  OpenListenerData,
} from './simple-gun-types'
import { timeout } from './utils'

const pAny = <T>(
  values: (T | PromiseLike<T>)[] | Iterable<T | PromiseLike<T>>,
): Promise<T> => {
  // eslint-disable-next-line
  return Promise.any(values)
}

/**
 * @param gunNode
 * @param cb
 * @param validator
 * @param wait 0 Means you get the locally cached data right away, gun will not
 * try to fetch updated data from peers. Default is 100. Use values up to 3
 * seconds.
 */
export const once = async <T extends ListenerData>(
  gunNode: GUNNode,
  cb: Listener<T | undefined>,
  validator: (data: unknown) => data is T,
  key: string,
  wait = 100,
): Promise<void> => {
  let data: T | undefined = undefined

  /**
   * @type {Promise<void>[]}
   */
  const promises = [wait, wait * 20, wait * 50].map(
    (n) =>
      new Promise((res) => {
        gunNode.once(
          (_data) => {
            if (validator(_data) && typeof data !== 'undefined') {
              data = _data
              res()
            }
          },
          { wait: n },
        )
      }),
  )
  try {
    await timeout(wait * 50 * 1.25, pAny(promises))
  } catch (err) {
    Logger.error(err)
  } finally {
    cb(data, key)
  }
}

const NULL = {}

/**
 * @param gunNode
 * @param cb
 * @param validator
 * @param wait 0 Means you get the locally cached data right away, gun will not
 * try to fetch updated data from peers. Default is 100. Use values up to 3
 * seconds.
 */
export const load = async <T extends OpenListenerData>(
  gunNode: GUNNode,
  cb: OpenListener<T>,
  validator: (data: unknown) => data is T,
  key: string,
  wait = 100,
): Promise<void> => {
  let data: T = NULL as T

  /**
   * @type {Promise<void>[]}
   */
  const promises = [wait, wait * 20, wait * 50].map(
    (n) =>
      new Promise((res) => {
        gunNode.load(
          (_data) => {
            if (validator(_data) && typeof data !== 'undefined') {
              data = _data
              res()
            }
          },
          { wait: n },
        )
      }),
  )
  try {
    await timeout(wait * 50 * 1.25, pAny(promises))
  } catch (err) {
    Logger.error(err)
  } finally {
    if (data !== NULL) {
      cb(data, key)
    }
  }
}
