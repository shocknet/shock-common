import * as API from '../api'
import * as Schema from '../../schema'
import * as Actions from '../actions'

// avoid unused import err
Actions.Chat
Schema.isOrder

/**
 * Subscribes to received requests event listener
 * @param {((receivedRequests: Actions.Requests.ReceivedRequest[]) => void)=} callback
 * @returns {import('./shock-thunk').default<Promise<Actions.Requests.ReceivedRequest[]>>}
 */
export const subscribeReceivedRequests = (callback) => (dispatch) =>
  new Promise((resolve, reject) => {
    // TODO: Move to saga
    API.Events.onReceivedRequests((requests) => {
      try {
        const received = requests.map((chat) => ({
          id: chat.id,
          pk: chat.requestorPK,
          avatar: chat.requestorAvatar,
          displayName: chat.requestorDisplayName,
          // @ts-ignore TODO
          response: chat.response,
          timestamp: chat.timestamp,
        }))

        /** @type {Actions.Requests.ReceivedRequestsAction} */
        const receivedRequestsAction = {
          type: 'requests/received',
          data: received,
        }

        dispatch(receivedRequestsAction)

        if (callback) {
          callback(received)
        }

        resolve(received)
      } catch (err) {
        reject(err)
      }
    })
  })

/**
 * Subscribes to sent requests event listener
 * @param {((chats: Actions.Requests.SentRequest[]) => void)=} callback
 * @returns {import('redux-thunk').ThunkAction<Promise<Actions.Requests.SentRequest[]>, {}, {}, import('redux').AnyAction>}
 */
export const subscribeSentRequests = (callback) => (dispatch) =>
  new Promise((resolve, reject) => {
    API.Events.onSentRequests((requests) => {
      try {
        const sent = requests.map((chat) => ({
          id: chat.id,
          pk: chat.recipientPublicKey,
          avatar: chat.recipientAvatar,
          displayName: chat.recipientDisplayName,
          changedRequestAddress: chat.recipientChangedRequestAddress,
          timestamp: chat.timestamp,
        }))

        /** @type {Actions.Requests.SentRequestsAction} */
        const sentRequestsAction = {
          type: 'requests/sent',
          data: sent,
        }

        dispatch(sentRequestsAction)

        if (callback) {
          callback(sent)
        }

        resolve(sent)
      } catch (err) {
        reject(err)
      }
    })
  })
