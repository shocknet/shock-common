import * as Schema from '../../schema'

export type ChatsListener = (chats: Schema.Chat[]) => void

export type ReceivedRequestsListener = (
  receivedRequests: Schema.SimpleReceivedRequest[],
) => void

export type SentRequestsListener = (
  sentRequests: Schema.SimpleSentRequest[],
) => void

let events = Object.freeze({
  onChats(listener: ChatsListener): void {
    throw new Error(
      `Please provide an onChats fn to shock-common. Listener: ${listener.toString()}`,
    )
  },

  onReceivedRequests(listener: ReceivedRequestsListener): void {
    throw new Error(
      `Please provide an onReceivedRequests fn to shock-common. Listener: ${listener.toString()}`,
    )
  },

  onSentRequests(listener: SentRequestsListener): void {
    throw new Error(
      `Please provide an onSentRequests fn to shock-common. Listener: ${listener.toString()}`,
    )
  },
})

export type EventProviderMap = typeof events

export const setEvents = (newEvents: EventProviderMap) => {
  events = newEvents
}

export default events
