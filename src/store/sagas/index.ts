import { all, call, select, put, debounce } from 'redux-saga/effects'

import * as Logger from '../../logger'
import { feedPage, FeedPageRes } from '../api'
import { State } from '../reducers'
import * as Actions from '../actions'

const selectLastFetchedPage = (state: State) => state.feed.lastFetchedPage
const selectlatestViewedPostID = (state: State) => state.feed.latestViewedPostID
// const selectDistanceFromTip = (state: State) => state.feed.distanceFromTip

function* getMoreFeed() {
  try {
    const lastFetchedPage = selectLastFetchedPage(yield select())

    const page = lastFetchedPage + 1
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const feedPageRes: FeedPageRes = yield call(feedPage, { page })

    const { posts } = feedPageRes

    yield put(Actions.receivedFeed(posts, page, Date.now()))
  } catch (error) {
    Logger.error(error)
    yield put({ type: Actions.GET_MORE_FEED }) // retry
  }
}

function* getMoreBackfeed() {
  try {
    const latestViewedPostID = selectlatestViewedPostID(yield select())

    if (latestViewedPostID) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const feedPageRes: FeedPageRes = yield call(feedPage, {
        before: latestViewedPostID,
      })
      const { posts } = feedPageRes

      yield put(Actions.receivedBackfeed(posts, 1, Date.now()))
    }
  } catch (error) {
    Logger.error(error)
    yield put({ type: Actions.GET_MORE_BACKFEED }) // retry
  }
}

function* watchFeedRequest() {
  yield debounce(500, Actions.GET_MORE_FEED, getMoreFeed)
}

function* watchBackfeedRequest() {
  yield debounce(500, Actions.GET_MORE_BACKFEED, getMoreBackfeed)
}

function* startFeedWatchers() {
  yield all([call(watchBackfeedRequest), call(watchFeedRequest)])
}

export function* rootSaga() {
  yield startFeedWatchers()
}
