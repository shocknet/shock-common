import uuidv1 from 'uuid/v1'
import { } from 'ramda'


import * as GunTypes from './simple-gun-types'
import { UserWrapper, Wrapper , MethodToValidator} from './wrapper'

type Dict<T> = Record<string, T>

type Gunsmith = () => GunTypes.GUNNode

type FiringRange = () => GunTypes.UserGUNNode


let gun: GunTypes.GUNNode;

let user: GunTypes.UserGUNNode;

let gunsmith: Gunsmith
let firingRange: FiringRange

export const init = (_gunsmith: Gunsmith, _firingRange: FiringRange) => {
  gunsmith = _gunsmith
  firingRange = _firingRange;

  gun = gunsmith();
  user = firingRange()

  return {
    getGun() {
      return gun
    },

    getUser() {
      return user;
    }
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
  }
} as UserPathToWrapper



/**
 * Working with paths only, the code for this module is supersimplified.
 */
export const getPath = (
  path: string,
  methodToValidator: Partial<MethodToValidator>,
): GunTypes.GUNNode => {
  const replica: NodeReplica = {
    load(cb) {
      
    }
  }
}

const on = (path: string, listener: GunTypes.Listener): NodeReplica => {
  const uuid = uuidv1()

  pathToWrapper[path] = pathToWrapper[path] || {
    gunNode: 
  }

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
