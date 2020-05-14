import Action from './action'

export const nonEncryptedEvents = [
  'ping',
  'disconnect',
  'IS_GUN_AUTH',
  Action.SET_LAST_SEEN_APP,
] as const
