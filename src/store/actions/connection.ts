/**
 * @typedef {object} DeviceKeyPair
 * @prop {string} publicKey
 */

export const newKeysLoaded = (data: any) =>
  ({
    type: 'encryption/loadKeys',
    data,
  } as const)

export const socketDidConnect = () =>
  ({
    type: 'socket/socketDidConnect',
  } as const)

export const socketDidDisconnect = () =>
  ({
    type: 'socket/socketDidDisconnect',
  } as const)

export type ConnectionAction =
  | ReturnType<typeof newKeysLoaded>
  | ReturnType<typeof socketDidConnect>
  | ReturnType<typeof socketDidDisconnect>
