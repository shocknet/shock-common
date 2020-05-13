export const ALREADY_AUTH = 'ALREADY_AUTH'

export const NOT_AUTH = 'NOT_AUTH'

export const COULDNT_ACCEPT_REQUEST = 'COULDNT_ACCEPT_REQUEST'

export const COULDNT_SENT_REQUEST = 'COULDNT_SENT_REQUEST'

export const COULDNT_PUT_REQUEST_RESPONSE = 'COULDNT_PUT_REQUEST_RESPONSE'

/**
 * Error thrown when trying to accept a request, and on retrieval of that
 * request invalid data (not resembling a request) is received.
 */
export const TRIED_TO_ACCEPT_AN_INVALID_REQUEST =
  'TRIED_TO_ACCEPT_AN_INVALID_REQUEST'

export const UNSUCCESSFUL_LOGOUT = 'UNSUCCESSFUL_LOGOUT'

export const UNSUCCESSFUL_REQUEST_ACCEPT = 'UNSUCCESSFUL_REQUEST_ACCEPT'

/**
 * Error thrown when trying to send a handshake request to an user for which
 * there's already an successful handshake.
 */
export const ALREADY_HANDSHAKED = 'ALREADY_HANDSHAKED'

/**
 * Error thrown when trying to send a handshake request to an user for which
 * there's already a handshake request on his current handshake node.
 */
export const ALREADY_REQUESTED_HANDSHAKE = 'ALREADY_REQUESTED_HANDSHAKE'

/**
 * Error thrown when trying to send a handshake request to an user on an stale
 * handshake address.
 */
export const STALE_HANDSHAKE_ADDRESS = 'STALE_HANDSHAKE_ADDRESS'

export const TIMEOUT_ERR = 'TIMEOUT_ERR'

export const ORDER_NOT_ANSWERED_IN_TIME = 'ORDER_NOT_ANSWERED_IN_TIME'
