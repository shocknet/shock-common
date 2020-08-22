import {
  GUNNode,
  UserGUNNode,
  Listener,
  OpenListener,
  ListenerData,
  OpenListenerData,
} from './simple-gun-types'

type Dict<T> = Record<string, T>

export interface MethodToValidator {
  onAndOnce(data: ListenerData): boolean
  mapOnAndOnce(data: ListenerData): boolean
  openAndLoad(data: OpenListenerData): boolean
}

interface Listeners {
  on: Dict<Listener>
  mapOn: Dict<Listener>
  mapOnce: Dict<Listener>
  open: Dict<OpenListener>
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
