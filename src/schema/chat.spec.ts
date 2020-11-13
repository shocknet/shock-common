import id from 'uuid/v1'

import { Chat, normalizeChats, ChatN, ChatMessage } from './chat'

const chats: Chat[] = [
  {
    didDisconnect: false,
    id: id(),
    lastSeenApp: 0,
    messages: [
      {
        body: 'Hello',
        id: id(),
        outgoing: Math.random() > 0.5,
        timestamp: Date.now(),
      },
    ],

    recipientAvatar: null,
    recipientDisplayName: null,
    recipientPublicKey: id(),
  },
]

describe('chat normalizer/denormalizer', () => {
  describe('normalizer', () => {
    it('returns the correct id array in order', () => {
      const { result } = normalizeChats(chats)
      expect(result).toStrictEqual<string[]>(chats.map((c) => c.id))
    })

    it('normalizes chats', () => {
      const { entities } = normalizeChats(chats)

      const { chats: chatsN } = entities

      const expectedNormalizedChats: Record<string, ChatN> = {}

      chats.forEach((c) => {
        expectedNormalizedChats[c.id] = {
          ...c,
          messages: c.messages.map((m) => m.id),
        }
      })

      expect(chatsN).toStrictEqual<Record<string, ChatN>>(
        expectedNormalizedChats,
      )
    })

    it('normalizes the messages contained in chats', () => {
      const { entities } = normalizeChats(chats)

      const { chatMessages } = entities

      const chatMessagesAsRecord: Record<string, ChatMessage> = {}

      chats.forEach((c) => {
        c.messages.forEach((m) => {
          chatMessagesAsRecord[m.id] = m
        })
      })

      expect(chatMessages).toStrictEqual(chatMessagesAsRecord)
    })
  })
})
