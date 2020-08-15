import { Post } from '../../schema'

export const GET_MORE_FEED = 'getMoreFeed'
export const GET_MORE_BACKFEED = 'getMoreBackfeed'

export const getMoreFeed = () =>
  ({
    type: GET_MORE_FEED,
  } as const)

export const getMoreBackfeed = () =>
  ({
    type: GET_MORE_BACKFEED,
  } as const)

export const receivedFeed = (posts: Post[], page: number, timestamp: number) =>
  ({
    type: 'receivedFeed',
    data: {
      posts,
      page,
      timestamp,
    },
  } as const)

/**
 * We can actually ignore the 205 from the backend here, just compare the tail
 * of this list to the head of the current viewport.
 * @param posts
 */
export const receivedBackfeed = (
  posts: Post[],
  page: number,
  timestamp: number,
) =>
  ({
    type: 'receivedBackfeed',
    data: {
      posts,
      page,
      timestamp,
    },
  } as const)

export const viewportChanged = (newViewport: string[]) =>
  ({
    type: 'feed/viewportChanged',
    data: {
      newViewport,
    },
  } as const)

export type FeedAction =
  | ReturnType<typeof getMoreFeed>
  | ReturnType<typeof getMoreBackfeed>
  | ReturnType<typeof receivedFeed>
  | ReturnType<typeof receivedBackfeed>
  | ReturnType<typeof viewportChanged>
