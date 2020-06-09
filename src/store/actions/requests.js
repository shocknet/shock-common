/**
 * @typedef {import('../../schema').SimpleReceivedRequest} SimpleReceivedRequest
 * @typedef {import('../../schema').SimpleSentRequest} SimpleSentRequest
 */

/**
 * @typedef {object} ReceivedRequest
 * @prop {string} id
 * @prop {string} pk
 * @prop {string | null} avatar
 * @prop {string | null} displayName
 * @prop {string} response
 * @prop {number} timestamp
 */

/**
 * @typedef {object} SentRequest
 * @prop {string} id
 * @prop {string} pk
 * @prop {string | null} avatar
 * @prop {string | null} displayName
 * @prop {boolean} changedRequestAddress
 * @prop {number} timestamp
 */

/**
 * @typedef {object} ReceivedRequestsAction
 * @prop {'requests/received'} type
 * @prop {ReceivedRequest[]} data
 */

/**
 * @typedef {object} SentRequestsAction
 * @prop {'requests/sent'} type
 * @prop {SentRequest[]} data
 */

/**
 * Resets the cached sent/received requests
 */
export const resetRequests = () => ({
  type: /** @type {'requests/reset'} */ ('requests/reset'),
})

/**
 * @typedef {ReceivedRequestsAction | SentRequestsAction | ReturnType<typeof resetRequests>} RequestsAction
 */
