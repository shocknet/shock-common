/**
 * @format
 * Contains types that are used throughout the application. Written in
 * typescript for easier implementation.
 *
 * Nominal types are archieved through the enum method as outlined here:
 * https://basarat.gitbook.io/typescript/main-1/nominaltyping
 */

/**
 * Exported only for declaration generation. Do not use.
 * https://github.com/microsoft/TypeScript/issues/9865
 */
export enum _EncSpontPayment {
  _ = '',
}
/**
 * Spontaneous payment as found inside a chat message body.
 */
export type EncSpontPayment = _EncSpontPayment & string
