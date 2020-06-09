/**
 * @typedef {import('../../schema').Chat} Chat
 * @typedef {import('../../schema').ChatMessage} ChatMessage
 */

export const ACTIONS = {
  LOAD_CONTACTS: /** @type {'contacts/load'} */ ('contacts/load'),
  LOAD_MESSAGES: /** @type {'messages/load'} */ ('messages/load'),
  SELECT_CONTACT: /** @type {'contact/select'} */ ('contact/select'),
  RESET_SELECTED_CONTACT: /** @type {'contact/reset'} */ ('contact/reset'),
  RESET_CHAT: /** @type {'chat/reset'} */ ('chat/reset'),
  RECEIVED_CHATS: /** @type {'chats/receivedChats'} */ ('chats/receivedChats'),
}

/** @typedef {Record<string, ChatMessage>} Messages */

/**
 * @typedef {object} Contact
 * @prop {string} pk
 * @prop {string|null} avatar
 * @prop {string|null} displayName
 */

/**
 * @typedef {object} BTCAddress
 * @prop {string} address
 * @prop {string} type
 */

/**
 * @typedef {object} Invoice
 * @prop {string} paymentRequest
 * @prop {string} type
 */

/**
 * @typedef {(Contact | BTCAddress | Invoice)} SelectedContact
 */

/**
 * @typedef {object} ReceivedChatsAction
 * @prop {'chats/receivedChats'} type
 * @prop {{ chats: Chat[] }} data
 */

/**
 * Selects a contact (useful for easily referencing the currently focused contact)
 * @param {Contact|BTCAddress} contact
 */
export const selectContact = (contact) => ({
  type: ACTIONS.SELECT_CONTACT,
  data: contact,
})

/**
 * Reset currently selected contact
 */
export const resetSelectedContact = () => ({
  type: ACTIONS.RESET_SELECTED_CONTACT,
  data: null,
})

/**
 * @param {Chat[]} chats
 */
export const receivedChats = (chats) => ({
  type: 'chats/recieved',
  data: {
    chats,
  },
})

/**
 * @param {Contact[]} contacts
 */
export const contactsLoaded = (contacts) => ({
  type: ACTIONS.LOAD_CONTACTS,
  data: contacts,
})

/**
 * @template T
 * @typedef {T[keyof T]} ValueOf
 */

/**
 * @typedef {ReturnType<typeof selectContact> | ReturnType<typeof resetSelectedContact> | { type: ValueOf<typeof ACTIONS> , data: any }} ChatAction
 */
