import * as Schema from '../../schema'

export type ChatsListener = (chats: Schema.Chat[]) => void
export type ReceivedRequestsListener = (
  receivedRequests: Schema.SimpleReceivedRequest[],
) => void
export type SentRequestsListener = (
  sentRequests: Schema.SimpleSentRequest[],
) => void

let events = Object.freeze({
  onChats(listener: ChatsListener) {
    throw new Error(
      `Please provide an onChats fn to shock-common. Listener: ${listener.toString()}`,
    )
  },

  onReceivedRequests(listener: ReceivedRequestsListener) {
    throw new Error(
      `Please provide an onReceivedRequests fn to shock-common. Listener: ${listener.toString()}`,
    )
  },

  onSentRequests(listener: SentRequestsListener) {
    throw new Error(
      `Please provide an onSentRequests fn to shock-common. Listener: ${listener.toString()}`,
    )
  },
})

export const setEvents = (newEvents: typeof events) => {
  events = newEvents
}

export default events
