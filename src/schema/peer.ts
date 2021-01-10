import { Feature } from './misc'

export interface TimestampedError {
  /**
   * The unix timestamp in seconds when the error occurred.
   */
  timestamp: string
  /**
   * The string representation of the error sent by our peer.
   */
  error: string
}

export interface Peer {
  /**
   * The identity pubkey of the peer.
   */
  pub_key: string
  /**
   * Network address of the peer; eg 127.0.0.1:10011.
   */
  address: string
  /**
   * Bytes of data transmitted to this peer.
   */
  bytes_sent: string
  /**
   * Bytes of data transmitted from this peer.
   */
  bytes_recv: string
  /**
   * Satoshis sent to this peer.
   */
  sat_sent: string
  /**
   * Satoshis received from this peer.
   */
  sat_recv: string
  /**
   * A channel is inbound if the counterparty initiated the channel.
   */
  inbound: boolean
  /**
   * Ping time to this peer.
   */
  ping_time: string
  /**
   * The type of sync we are currently performing with this peer..
   */
  sync_type: 'UNKNOWN_SYNC' | 'ACTIVE_SYNC' | 'PASSIVE_SYNC'
  /**
   * Entry Features advertised by the remote peer in their init message.
   */
  features: Feature[]
  /**
   * The latest errors received from our peer with timestamps,
   * limited to the 10 most recent errors. These errors are tracked across peer
   * connections, but are not persisted across lnd restarts. Note that these
   * errors are only stored for peers that we have channels open with, to
   * prevent peers from spamming us with errors at no cost..
   */
  errors: TimestampedError[]
  /**
   * The number of times we have recorded this peer going offline or coming
   * online, recorded across restarts. Note that this value is decreased over
   * time if the peer has not recently flapped, so that we can forgive peers
   * with historically high flap counts..
   */
  flap_count: string
  /**
   * The timestamp of the last flap we observed for this peer. If this value is
   * zero, we have not observed any flaps for this peer..
   */
  last_flap_ns: string
}
