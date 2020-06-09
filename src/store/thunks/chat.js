import * as Actions from '../actions'
import * as Logger from '../../logger'
import * as API from '../api'
/**
 * @typedef {import('../../schema').Chat} Chat
 */

const {
  Chat: { ACTIONS },
} = Actions

/**
 * Fetches the Node's info
 * @param {((chats: Chat[]) => void)=} callback
 * @returns {import('./shock-thunk').default<Promise<Chat[]>>}
 */
export const subscribeOnChats = (callback) => (dispatch) =>
  new Promise((resolve, reject) => {
    // TODO: Move to saga
    API.Events.onChats((chats) => {
      try {
        const contacts = chats.map((chat) => ({
          pk: chat.recipientPublicKey,
          avatar: chat.recipientAvatar,
          displayName: chat.recipientDisplayName,
        }))

        /** @type {Actions.Chat.Messages} */
        const messages = chats.reduce(
          (messages, chat) => ({
            ...messages,
            [chat.recipientPublicKey]: chat.messages,
          }),
          {},
        )

        Logger.log('Subscribed to ON_CHATS!', contacts)

        const x = Actions.Chat.contactsLoaded(contacts)

        dispatch(x)

        dispatch({
          type: ACTIONS.LOAD_MESSAGES,
          data: messages,
        })

        /** @type {Actions.Chat.ReceivedChatsAction} */
        const receivedChatsAction = {
          type: 'chats/receivedChats',
          data: {
            chats,
          },
        }

        dispatch(receivedChatsAction)

        if (callback) {
          callback(chats)
        }

        resolve(chats)
      } catch (err) {
        Logger.log(err)
        reject(err)
      }
    })
  })
