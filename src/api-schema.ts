import * as Schema from './schema'

export interface FollowRequest {
  publicKey: string
}

export interface UnfollowRequest {
  publicKey: string
}

export interface GetFollowsResponse {
  follows: Record<string, Schema.Follow>
}
