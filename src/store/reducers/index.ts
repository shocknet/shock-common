import auth from './auth'
import chat from './chat'
import connection from './connection'
import fees from './fees'
import history from './history'
import invoices from './invoices'
import node from './node'
import posts from './posts'
import requests from './requests'
import users from './users'
import wallet from './wallet'
import feed from './feed'

/**
 * To be passed to combineReducers() or similar.
 */
export const reducersObj = {
  auth,
  chat,
  connection,
  fees,
  history,
  invoices,
  node,
  posts,
  requests,
  users,
  wallet,
  feed,
}

type ReducersObj = typeof reducersObj

export type State = {
  [K in keyof ReducersObj]: ReturnType<ReducersObj[K]>
}
