import { Post } from '../../schema'

export const getMoreFeed = () =>
  ({
    type: 'getMoreFeed',
  } as const)

export const getMoreBackfeed = () =>
  ({
    type: 'getMoreBackfeed',
  } as const)

export const receivedFeed = (posts: Post[]) =>
  ({
    type: 'receivedFeed',
    data: {
      posts,
    },
  } as const)

/**
 * We can actually ignore the 205 from the backend here, just compare the tail
 * of this list to the head of the current viewport.
 * @param posts
 */
export const receivedBackfeed = (posts: Post[]) =>
  ({
    type: 'receivedBackfeed',
    data: {
      posts,
    },
  } as const)

export type FeedAction =
  | ReturnType<typeof getMoreFeed>
  | ReturnType<typeof getMoreBackfeed>
  | ReturnType<typeof receivedFeed>
  | ReturnType<typeof receivedBackfeed>
