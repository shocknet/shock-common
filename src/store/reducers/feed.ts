import difference from 'lodash/difference'
import flattenDeep from 'lodash/flattenDeep'
import uniq from 'lodash/uniq'

import { ShockAction } from '../actions'

export interface State {
  currentFeed: string[][]
  currentViewport: string[]
  latestViewedPostID: string
  lastFetchedPage: number
  lastFetchTimestamp: number
  distanceFromTip: number
}

const INITIAL_STATE: State = {
  currentFeed: [],
  currentViewport: [],
  latestViewedPostID: '',
  lastFetchedPage: 0,
  lastFetchTimestamp: 0,
  distanceFromTip: 10000000,
}

const reducer = (state = INITIAL_STATE, action: ShockAction): State => {
  const { currentFeed } = state
  const currentPostsIncDups = flattenDeep(currentFeed)

  if (action.type === 'receivedBackfeed') {
    const {
      posts: newPostsRaw,
      page: newPostsPage,
      timestamp: newPostsFetchTimestamp,
    } = action.data

    const newPosts = newPostsRaw.map((p) => p.id)

    if (newPosts.length === 0) {
      return state
    }

    if (currentPostsIncDups.length === 0) {
      // unexpected state, let's recover from it though:

      return {
        ...state,
        currentFeed: [newPosts],
        currentViewport: [],
        distanceFromTip: 0,
        lastFetchTimestamp: newPostsFetchTimestamp,
        lastFetchedPage: newPostsPage,
        latestViewedPostID: '',
      }
    }

    const lastFromBackfeed = newPosts[newPosts.length - 1]
    const existingFirst = currentPostsIncDups[0]

    const withoutRepeats = difference(newPosts, currentPostsIncDups)

    if (lastFromBackfeed === existingFirst) {
      // backfeed fetch was successful

      return {
        ...state,
        currentFeed: [
          // maintain that repeat last one as a signal that the new batch and
          // the next one are semantically connected
          [...withoutRepeats, lastFromBackfeed],
          ...currentFeed,
        ],
        // if it took n pages for the backfeed batch to reach the current latest
        // post, then that past got rolled over n-1 pages
        lastFetchedPage: state.lastFetchedPage + newPostsPage,
        distanceFromTip: 0,
      }
    } else {
      // backfeed fetch was not successful. Which means we need to invalidate
      // all other posts but only if they are outside of the viewport.
      return {
        ...state,
        currentFeed: [withoutRepeats, ...currentFeed],
        distanceFromTip: 0,
        lastFetchTimestamp: newPostsFetchTimestamp,
        lastFetchedPage: newPostsPage,
      }
    }

    // except that last one, we'll use as a marker that
  }

  if (action.type === 'receivedFeed') {
    const {
      posts: newPostsRaw,
      page: newPostsPage,
      timestamp: newPostsFetchTimestamp,
    } = action.data

    if (newPostsRaw.length === 0) {
      return state
    }

    const newPosts = newPostsRaw.map((p) => p.id)

    const withoutRepeats = difference(newPosts, currentPostsIncDups)

    return {
      ...state,
      currentFeed: [...currentFeed, withoutRepeats],
      lastFetchedPage: newPostsPage,
      lastFetchTimestamp: newPostsFetchTimestamp,
      distanceFromTip: currentFeed.length === 0 ? 0 : state.distanceFromTip,
    }
  }

  if (action.type === 'feed/viewportChanged') {
    // save the most recently fetched AND seen post.

    if (currentFeed.length === 0) {
      // assert never
      return state
    }

    const { newViewport } = action.data

    // invalidate cache
    // const newFeed = currentFeed.filter((batch, i) => {
    //   const insideViewport = batch.some((post) =>
    //     newViewport.some((postInViewport) => postInViewport === post.id),
    //   )

    //   if (insideViewport) {
    //     return true
    //   }

    //   if (i === 0) {
    //     return true
    //   }

    //   const previousBatch = currentFeed[i - 1]
    //   const lastPostFromPreviousBatch = previousBatch[previousBatch.length - 1]
    //   const firstPostFromThisBatch = batch[0]

    //   return firstPostFromThisBatch.id === lastPostFromPreviousBatch.id
    // })

    // temporary hack: ideally we want to clean posts in terms of invalidation

    return {
      ...state,
      // yeah it's a glorified setter, but allows us to keep the invalidate
      // cache out of the view,
      currentViewport: newViewport,
      latestViewedPostID: (() => {
        if (newViewport.length === 0) {
          return state.latestViewedPostID
        }

        const currentPostsNoDups = uniq(currentPostsIncDups)

        const idx = currentPostsNoDups.findIndex((pID) =>
          newViewport.some((id) => pID === id),
        )

        if (idx === -1) {
          return state.latestViewedPostID
        }

        return currentPostsNoDups[idx]
      })(),
    }
  }

  return state
}

export default reducer
