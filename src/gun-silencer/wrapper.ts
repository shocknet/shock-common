import {
  GUNNode,
  UserGUNNode,
  Listener,
  OpenListener,
  ListenerData,
  OpenListenerData,
} from './simple-gun-types'

/**
 * Validates data coming from gun, if validator returns false, we know it could
 * either be an unexpected data type (in which case the consumoer shouldn't try
 * to consume it anyways), incomplete entities (this happens with large
 * resources) or stale data.
 */
export interface MethodToValidator {
  /**
   * Validates data coming from on() and once() calls to gun, on() is reactive,
   * once() is not, however the data type they return is the same, the wrapper
   * should decide how to responde to false return values, like for example,
   * retrying once().
   * @param data Data received from on() and once() calls.
   */
  onAndOnce(data: ListenerData): boolean
  /**
   * Validates data coming from .map().on() and .map().once() calls to gun, on()
   * is listens for updates, once() does not, however the data type they return
   * is the same, the wrapper should decide how to responde to false return
   * values, like for example, retrying via a once() an item that was rejected
   * in a map().once() call and still call the listener with it.
   * @param data Data received from on() and once() calls.
   */
  mapOnAndOnce(data: ListenerData): boolean

  /**
   * Validates data coming from open() and once() calls to gun, open() is
   * reactive, load() is not, however the data type they return is the same, the
   * wrapper should decide how to responde to false return values, like for
   * example, retrying load() when  it returns incomplete entities.
   * @param data Data received from on() and once() calls.
   */
  openAndLoad(data: OpenListenerData): boolean
}

interface Listeners {
  on: WeakSet<Listener>
  mapOn: WeakSet<Listener>
  mapOnce: WeakSet<Listener>
  open: WeakSet<OpenListener>
}

interface WrapperBase {
  path: string
  listeners: Listeners
  validators: MethodToValidator
}

export interface Wrapper extends WrapperBase {
  gunNode: GUNNode
}

export interface UserWrapper extends WrapperBase {
  gunNode: UserGUNNode
}
