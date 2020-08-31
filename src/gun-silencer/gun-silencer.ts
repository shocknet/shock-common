import uuidv1 from 'uuid/v1'

import * as GunTypes from './simple-gun-types'
import { UserWrapper, Wrapper, MethodToValidator } from './wrapper'
import * as Utils from './utils'

type Dict<T> = Record<string, T>

type Gunsmith = () => GunTypes.GUNNode

type FiringRange = () => GunTypes.UserGUNNode

let gun: GunTypes.GUNNode

// Initialize so UserWrapper.gunNode is a pointer to this variable.
let user = {} as GunTypes.UserGUNNode

let gunsmith: Gunsmith
let firingRange: FiringRange

export const init = (_gunsmith: Gunsmith, _firingRange: FiringRange) => {
  gunsmith = _gunsmith
  firingRange = _firingRange

  gun = gunsmith()
  user = firingRange()

  return {
    getGun() {
      return gun
    },

    getUser() {
      return user
    },
  }
}

interface NodeReplica {
  /**
   * Actually removes listeners and does not interfere on any other nodes.
   */
  off(): GunTypes.GUNNode['off']

  once(): GunTypes.GUNNode['once']

  load(): GunTypes.GUNNode['load']

  on(): GunTypes.GUNNode['on']

  open(): GunTypes.GUNNode['open']

  map(): GunTypes.GUNNode['map']
}

const pathToWrapper: Dict<Wrapper> = {}

type UserPathToWrapper = Dict<Wrapper> & {
  '.': UserWrapper
}

const userPathToWrapper = {
  '.': {
    gunNode: user,
    listeners: {},
    path: '.',
    validators: {},
  },
} as UserPathToWrapper

const getGunNodeFromPath = (path: string): GUNTypes.GUNNode => {
  const keys = path.split('.')

  let node = gun

  keys.forEach((k) => (node = node.get(k)))

  return node
}

/**
 * Working with paths only, the code for this module is supersimplified.
 */
export const getPath = (
  path: string,
  methodToValidator: Partial<MethodToValidator>,
): GunTypes.GUNNode => {
  pathToWrapper[path] = pathToWrapper[path] || {
    gunNode: getGunNodeFromPath(path),
    listeners: {
      mapOn: new WeakSet(),
      mapOnce: new WeakSet(),
      on: new WeakSet(),
      open: new WeakSet(),
    },
    path,
    validators: {
      mapOnAndOnce() {
        return true
      },
      onAndOnce() {
        return true
      },
      openAndLoad() {
        return true
      },
      ...methodToValidator,
    },
  }

  const replica: NodeReplica = {
    load(cb) {
      const { gunNode, listeners, validators } = pathToWrapper[path]
    },
    map(cb) {
      const {} = pathToWrapper[path]
    },
    off(cb) {
      const {} = pathToWrapper[path]
    },
    on(cb) {
      const {} = pathToWrapper[path]
    },
    once(cb) {
      const {} = pathToWrapper[path]
    },
    open(cb) {
      const {} = pathToWrapper[path]
    },
  }
}

const on = (path: string, listener: GunTypes.Listener): NodeReplica => {
  const uuid = uuidv1()

  pathToWrapper[path] = pathToWrapper[path]

  const nodeReplica: NodeReplica = {
    off(listener) {
      if (listener) {
      }
    },
  }

  pathToReplicas[path][uuid] = {}

  return {
    off() {
      pathToReplicas[uuid]
    },
  }
}
