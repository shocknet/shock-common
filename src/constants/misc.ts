export const LAST_SEEN_NODE_INTERVAL = 10000

export const LAST_SEEN_APP_INTERVAL = 30000

/**
 * @param {number} lastSeen
 * @returns {boolean}
 */
export const isAppOnline = (lastSeen: number): boolean =>
  Date.now() - lastSeen < LAST_SEEN_APP_INTERVAL * 2

export const isNodeOnline = (lastSeenNode: number): boolean =>
  Date.now() - lastSeenNode < LAST_SEEN_NODE_INTERVAL

/**
 * An special message signaling the acceptance.
 */
export const INITIAL_MSG = '$$__SHOCKWALLET__INITIAL__MESSAGE'

export const IS_GUN_AUTH = 'IS_GUN_AUTH'

export const NUM_OF_POSTS_PER_WALL_PAGE = 10

export type WebClientPrefix =
  | 'https://shock.pub'
  | 'https://lightning.page'
  | 'https://satoshi.watch'
