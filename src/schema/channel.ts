import { Bytes } from './misc'

/**
 * https://api.lightning.community/#routingpolicy
 */
export interface RoutingPolicy {
  time_lock_delta: number
  min_htlc: number
  fee_base_msat: number
  fee_rate_milli_msat: number
  last_update: number
  disabled: boolean
}

/**
 * https://api.lightning.community/#lnrpc-channeledge
 */
export interface ChannelEdge {
  channel_id: number
  last_update: number
  capacity: number
  chan_point: string
  node1_pub: string
  node2_pub: string
  node1_policy: RoutingPolicy
  node2_policy: RoutingPolicy
}

/**
 * https://api.lightning.community/#lnrpc-htlc
 */
export interface HTLC {
  incoming: boolean
  amount: string
  hash_lock: Bytes
  expiration_height: string
  /**
   * Index identifying the htlc on the channel.
   */
  htlc_index: string
  /**
   * If this HTLC is involved in a forwarding operation, this field indicates the
   * forwarding channel. For an outgoing htlc, it is the incoming channel. For an
   * incoming htlc, it is the outgoing channel. When the htlc originates from this
   * node or this node is the final destination, forwarding_channel will be zero.
   * The forwarding channel will also be zero for htlcs that need to be forwarded
   * but don't have a forwarding decision persisted yet.
   */
  forwarding_channel: string
  /**
   * Index identifying the htlc on the forwarding channel.
   */
  forwarding_htlc_index: string
}

/**
 * LEGACY - A channel using the legacy commitment format having tweaked
 * to_remote keys.
 * STATIC_REMOTE_KEY - A channel that uses the modern commitment
 * format where the key in the output of the remote party does not change each
 * state. This makes back up and recovery easier as when the channel is closed,
 * the funds go directly to that key.
 * ANCHORS - A channel that uses a commitment
 * format that has anchor outputs on the commitments, allowing fee bumping after
 * a force close transaction has been broadcast.
 * UNKNOWN_COMMITMENT_TYPE - Returned when the commitment type isn't known or
 * unavailable.
 */
export type CommitmentType =
  | 'LEGACY'
  | 'STATIC_REMOTE_KEY'
  | 'ANCHORS'
  | 'UNKNOWN_COMMITMENT_TYPE'

export interface ChannelConstraints {
  /**
   * The CSV delay expressed in relative blocks. If the channel is force closed,
   * we will need to wait for this many blocks before we can regain our funds.
   */
  csv_delay: string
  /**
   * The minimum satoshis this node is required to reserve in its balance.
   */
  chan_reserve_sat: string
  /**
   * The dust limit (in satoshis) of the initiator's commitment tx.
   */
  dust_limit_sat: string
  /**
   * The maximum amount of coins in millisatoshis that can be pending in this
   * channel.
   */
  max_pending_amt_msat: string
  /**
   * The smallest HTLC in millisatoshis that the initiator will accept.
   */
  min_htlc_msat: string
  /**
   * The total number of incoming HTLC's that the initiator will accept.
   */
  max_accepted_htlcs: string
}

/**
 * https://api.lightning.community/#lnrpc-channel
 */
export interface Channel {
  /**
   * Whether this channel is active or not.
   */
  active: boolean
  /**
   * The identity pubkey of the remote node.
   */
  remote_pubkey: string
  /**
   * The outpoint (txid:index) of the funding transaction. With this value, Bob
   * will be able to generate a signature for Alice's version of the commitment
   * transaction.
   */
  channel_point: string
  /**
   * The unique channel ID for the channel. The first 3 bytes are the block
   * height, the next 3 the index within the block, and the last 2 bytes are the
   * output index for the channel.
   */
  chan_id: string

  /**
   * The total amount of funds held in this channel
   */
  capacity: string
  /**
   * This node's current balance in this channel
   */
  local_balance: string
  /**
   * The counterparty's current balance in this channel
   */
  remote_balance: string
  /**
   * The amount calculated to be paid in fees for the current set of commitment
   * transactions. The fee amount is persisted with the channel in order to allow
   * the fee amount to be removed and recalculated with each channel state update,
   * including updates that happen after a system restart.
   */
  commit_fee: string
  /**
   * The weight of the commitment transaction
   */
  commit_weight: string
  /**
   * The required number of satoshis per kilo-weight that the requester will pay
   * at all times, for both the funding transaction and commitment transaction.
   * This value can later be updated once the channel is open.
   */
  fee_per_kw: string
  /**
   * The unsettled balance in this channel
   */
  unsettled_balance: string
  /**
   * The total number of satoshis we've sent within this channel.
   */
  total_satoshis_sent: string
  /**
   * The total number of satoshis we've received within this channel.
   */
  total_satoshis_received: string
  /**
   * The total number of updates conducted within this channel.
   */
  num_updates: string
  /**
   * The list of active, uncleared HTLCs currently pending within the channel.
   */
  pending_htlcs: HTLC[]
  /**
   * Deprecated. The CSV delay expressed in relative blocks. If the channel is
   * force closed, we will need to wait for this many blocks before we can regain
   * our funds.
   */
  csv_delay: string
  /**
   * Whether this channel is advertised to the network or not.
   */
  private: boolean
  /**
   * True if we were the ones that created the channel.
   */
  initiator: boolean
  /**
   * A set of flags showing the current state of the channel.
   */
  chan_status_flags: string
  /**
   * Deprecated. The minimum satoshis this node is required to reserve in its
   * balance.
   */
  local_chan_reserve_sat: string
  /**
   * Deprecated. The minimum satoshis the other node is required to reserve in its
   * balance.
   */
  remote_chan_reserve_sat: string
  /**
   * Deprecated. Use commitment_type.
   */
  static_remote_key: boolean
  /**
   * The commitment type used by this channel.
   */
  commitment_type: CommitmentType
  /**
   * The number of seconds that the channel has been monitored by the channel
   * scoring system. Scores are currently not persisted, so this value may be less
   * than the lifetime of the channel [EXPERIMENTAL].
   */
  lifetime: string
  /**
   * The number of seconds that the remote peer has been observed as being online
   * by the channel scoring system over the lifetime of the channel
   * [EXPERIMENTAL].
   */
  uptime: string
  /**
   * Close address is the address that we will enforce payout to on cooperative
   * close if the channel was opened utilizing option upfront shutdown. This value
   * can be set on channel open by setting close_address in an open channel
   * request. If this value is not set, you can still choose a payout address by
   * cooperatively closing with the delivery_address field set.
   */
  close_address: string
  /**
   * The amount that the initiator of the channel optionally pushed to the remote
   * party on channel open. This amount will be zero if the channel initiator did
   * not push any funds to the remote peer. If the initiator field is true, we
   * pushed this amount to our peer, if it is false, the remote peer pushed this
   * amount to us.
   */
  push_amount_sat: string
  /**
   * This uint32 indicates if this channel is to be considered 'frozen'. A frozen
   * channel doest not allow a cooperative channel close by the initiator. The
   * thaw_height is the height that this restriction stops applying to the
   * channel. This field is optional, not setting it or using a value of zero will
   * mean the channel has no additional restrictions. The height can be
   * interpreted in two ways: as a relative height if the value is less than
   * 500,000, or as an absolute height otherwise.
   */
  thaw_height: string
  /**
   * List constraints for the local node.
   */
  local_constraints: ChannelConstraints
  /**
   * List constraints for the remote node.
   */
  remote_constraints: ChannelConstraints
}

export type Initiator =
  | 'INITIATOR_UNKNOWN'
  | 'INITIATOR_LOCAL'
  | 'INITIATOR_REMOTE'
  | 'INITIATOR_BOTH'

export interface PendingChannel {
  remote_node_pub: string
  channel_point: string
  capacity: string
  local_balance: string
  remote_balance: string
  /**
   * The minimum satoshis this node is required to reserve in its balance.
   */
  local_chan_reserve_sat: string
  /**
   * The minimum satoshis the other node is required to reserve in its balance.
   */
  remote_chan_reserve_sat: string
  /**
   * The party that initiated opening the channel.
   */
  initiator: Initiator
  /**
   * The commitment type used by this channel.
   */
  commitment_type: CommitmentType
}

/**
 * https://api.lightning.community/#lnrpc-pendingchannelsresponse-pendingopenchannel
 */
export interface PendingOpenChannel {
  /**
   * The pending channel.
   */
  channel: PendingChannel
  /**
   * The height at which this channel will be confirmed.
   */
  confirmation_height: string
  /**
   * The amount calculated to be paid in fees for the current set of commitment
   * transactions. The fee amount is persisted with the channel in order to allow
   * the fee amount to be removed and recalculated with each channel state update,
   * including updates that happen after a system restart.
   */
  commit_fee: string
  /**
   * The weight of the commitment transaction.
   */
  commit_weight: string
  /**
   * The required number of satoshis per kilo-weight that the requester will pay
   * at all times, for both the funding transaction and commitment transaction.
   * This value can later be updated once the channel is open.
   */
  fee_per_kw: string
}

export interface ClosedChannel {
  /**
   * The pending channel to be closed.
   */
  channel: PendingChannel
  /**
   * The transaction id of the closing transaction.
   */
  closing_txid: string
}

export interface Commitments {
  /**
   * Hash of the local version of the commitment tx.
   */
  local_txid: string
  /**
   * Hash of the remote version of the commitment tx.
   */
  remote_txid: string
  /**
   * Hash of the remote pending version of the commitment tx.
   */
  remote_pending_txid: string
  /**
   * The amount in satoshis calculated to be paid in fees for the local
   * commitment.
   */
  local_commit_fee_sat: string
  /**
   * The amount in satoshis calculated to be paid in fees for the remote
   * commitment.
   */
  remote_commit_fee_sat: string
  /**
   * The amount in satoshis calculated to be paid in fees for the remote pending
   * commitment.
   */
  remote_pending_commit_fee_sat: string
}

export interface ForceClosedChannel {
  /**
   *  The pending channel to be force closed
   */
  channel: PendingChannel
  /**
   *  The transaction id of the closing transaction
   */
  closing_txid: string
  /**
   *  The balance in satoshis encumbered in this pending channel
   */
  limbo_balance: string
  /**
   *  The height at which funds can be swept into the wallet
   */
  maturity_height: string
  /**
   *  Remaining # of blocks until the commitment output can be swept. Negative
   *  values indicate how many blocks have passed since becoming mature.
   */
  blocks_til_maturity: string
  /**
   *  The total value of funds successfully recovered from this channel
   */
  recovered_balance: string
  /**
   *
   */
  pending_htlcs: HTLC[]
  anchor: 'LIMBO' | 'RECOVERED' | 'LOST'
}

export interface WaitingCloseChannel {
  /**
   * The pending channel waiting for closing tx to confirm.
   */
  channel: PendingChannel
  /**
   * The balance in satoshis encumbered in this channel.
   */
  limbo_balance: string
  /**
   * A list of valid commitment transactions. Any of these can confirm at this
   * point.
   */
  commitments: Commitments
}
