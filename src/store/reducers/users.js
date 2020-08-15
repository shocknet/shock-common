/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import produce from 'immer'
import * as Actions from '../actions'
Actions.Chat // avoid unused error

import * as Schema from '../../schema'

/**
 * @typedef {import('../actions').ShockAction} ShockAction
 * @typedef {import('../../schema').User} User
 */

/**
 * @typedef {Record<string, User>} State
 */

/**
 * @type {State}
 */
const INITIAL_STATE = {}

/**
 * @param {string} publicKey
 * @returns {User}
 */
const createEmptyUser = (publicKey) => ({
  avatar: null,
  bio: null,
  displayName: null,
  lastSeenApp: 0,
  lastSeenNode: 0,
  publicKey,
})

/**
 * @param {State} state
 * @param {Actions.ShockAction} action
 * @returns {State}
 */
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'users/receivedUsersData':
      return produce(state, (draft) => {
        /**
         * @param {{ publicKey: string; avatar: string | null; bio: string | null; displayName: string | null; lastSeenApp: number; lastSeenNode: number; }} partialUser
         */
        // @ts-ignore
        action.data.usersData.forEach((partialUser) => {
          const { publicKey: pk } = partialUser

          draft[pk] = {
            ...createEmptyUser(pk),
            ...(draft[pk] || {}),
            ...partialUser,
          }
        })
      })

    case 'chats/receivedChats':
      return produce(state, (draft) => {
        // @ts-ignore
        action.data.chats.forEach((chat) => {
          const { recipientPublicKey: pk } = chat

          draft[pk] = {
            ...createEmptyUser(pk),
            ...(draft[pk] || {}),
            avatar: chat.recipientAvatar,
            displayName: chat.recipientDisplayName,
            lastSeenApp: chat.lastSeenApp || 0,
          }
        })
      })

    case 'requests/received':
      return produce(state, (draft) => {
        // @ts-ignore
        action.data.forEach((receivedRequest) => {
          const { pk } = receivedRequest

          draft[pk] = {
            ...createEmptyUser(pk),
            ...(draft[pk] || {}),
            avatar: receivedRequest.avatar,
            displayName: receivedRequest.displayName,
          }
        })
      })

    case 'requests/sent':
      return produce(state, (draft) => {
        // @ts-ignore
        action.data.forEach((sentRequest) => {
          const { pk } = sentRequest

          draft[pk] = {
            ...createEmptyUser(pk),
            ...(draft[pk] || {}),
            avatar: sentRequest.avatar,
            displayName: sentRequest.displayName,
          }
        })
      })

    case 'receivedFeed':
    case 'receivedBackfeed': {
      const normalized = Schema.normalizePosts(action.data.posts)

      return produce(state, (draft) => {
        Object.assign(draft, normalized.entities.users)
      })
    }

    default:
      return state
  }
}

export default reducer
