import * as Chat from './chat'
import * as Connection from './connection'
import * as Fees from './fees'
import * as History from './history'
import * as Invoices from './invoices'
import * as Node from './node'
import * as Requests from './requests'
import * as Users from './users'
import * as Wallet from './wallet'
import * as Feed from './feed'
import * as Posts from './posts'

export type ShockAction =
  | Chat.ChatAction
  | Connection.ConnectionAction
  | Fees.FeesAction
  | History.HistoryAction
  | Invoices.InvoiceAction
  | Node.NodeAction
  | Requests.RequestsAction
  | Users.UsersAction
  | Wallet.WalletAction
  | Feed.FeedAction
  | Posts.PostsAction

// export interface ShockAction {
//   type: string
//   data: any
// }

export * from './feed'
export * from './posts'

export {
  Chat,
  Connection,
  Fees,
  History,
  Invoices,
  Node,
  Requests,
  Users,
  Wallet,
}
