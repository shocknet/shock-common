/**
 * @typedef {import('../../schema').PartialUser} PartialUser
 */

export const ACTIONS = {
  RECEIVED_USERS_DATA: /** @type {'users/receivedUsersData'} */ ('users/receivedUsersData'),
  BLOCK_USER: /** @type {'users/blockUser'} */ ('users/blockUser'),
}

/**
 * @param {PartialUser[]} usersData
 */
export const receivedUsersData = (usersData) => ({
  data: {
    usersData,
  },
  type: ACTIONS.RECEIVED_USERS_DATA,
})

/**
 * @param {string} publicKey
 */
export const blockUser = (publicKey) => ({
  type: ACTIONS.BLOCK_USER,
  data: {
    publicKey,
  },
})

/**
 * @typedef {ReturnType<typeof receivedUsersData> | ReturnType<typeof blockUser>} UsersAction
 */
