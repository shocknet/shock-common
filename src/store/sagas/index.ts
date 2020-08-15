import { all, call, select, put, debounce } from 'redux-saga/effects'

import { feedPage, FeedPageRes } from '../api'
import { State } from '../reducers'

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

    yield put({
      type: 'receivedFeed',
      data: {
        posts,
        page,
        timestamp: Date.now(),
      },
    })
  } catch (error) {
    console.log(error)
    yield put({ type: 'GET_MORE_FEED' }) // retry
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

      yield put({
        type: 'receivedBackfeed',
        data: {
          posts,
          timestamp: Date.now(),
          page: 1,
        },
      })
    }
  } catch (error) {
    console.log(error)
    yield put({ type: 'GET_MORE_BACKFEED' }) // retry
  }
}

function* watchFeedRequest() {
  yield debounce(500, 'GET_MORE_FEED', getMoreFeed)
}

function* watchBackfeedRequest() {
  yield debounce(500, 'GET_MORE_BACKFEED', getMoreBackfeed)
}

function* startFeedWatchers() {
  yield all([call(watchBackfeedRequest), call(watchFeedRequest)])
}

export function* rootSaga() {
  yield startFeedWatchers()
}
