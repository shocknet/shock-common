/**
 * @typedef {object} DeviceKeyPair
 * @prop {string} publicKey
 */

export const newKeysLoaded = (data: any) => ({
  type: 'encryption/loadKeys',
  data,
})

export const socketDidConnect = () => ({
  type: 'socket/socketDidConnect',
})

export const socketDidDisconnect = () => ({
  type: 'socket/socketDidDisconnect',
})

export type ConnectionAction =
  | ReturnType<typeof newKeysLoaded>
  | ReturnType<typeof socketDidConnect>
  | ReturnType<typeof socketDidDisconnect>
