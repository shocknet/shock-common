import { Post } from '../../schema'

export interface FeedPageParams {
  page?: number
  before?: string
}

export interface FeedPageRes {
  page: number
  posts: Post[]
}

let _feedPage: typeof feedPage

export const feedPage = (args: FeedPageParams): Promise<FeedPageRes> => {
  if (!_feedPage) {
    throw new ReferenceError(`Please provide feedPage()`)
  }

  return _feedPage(args)
}

export const setFeedPage = (newFeedPage: typeof feedPage) => {
  _feedPage = newFeedPage
}
