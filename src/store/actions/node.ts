import * as API from '../api'

/**
 * Sets the Node's connection status
 */
export const setConnectionStatus = (status: 'online' | 'offline') =>
  ({
    type: 'connectionStatus/update',
    data: status,
  } as const)

export const loadNodeInfo = (nodeInfo: API.Wallet.GetInfo) =>
  ({
    type: 'nodeInfo/load',
    data: nodeInfo,
  } as const)

export const loadNodeHealth = (nodeHealth: any) =>
  ({
    type: 'health/load',
    data: nodeHealth,
  } as const)

export type NodeAction =
  | ReturnType<typeof setConnectionStatus>
  | ReturnType<typeof loadNodeInfo>
  | ReturnType<typeof loadNodeHealth>
