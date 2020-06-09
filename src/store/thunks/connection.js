import * as Actions from '../actions'
import * as API from '../api'
import * as Logger from '../../logger'

const { Http, RSAKeychain } = API.Misc

/**
 * @typedef {object} PublicKey
 * @prop {string | undefined} public
 */

/**
 * @typedef {object} ExchangedKeyPair
 * @prop {(string)=} devicePublicKey
 * @prop {(string)=} APIPublicKey
 * @prop {boolean} success
 */

/** @type {Promise<ExchangedKeyPair>?} */
let exchangingKeypair = null

/**
 * Generates a keypair
 * @param {string} tag
 * @param {number} size
 * @param {number} retries
 * @returns {Promise<PublicKey>}
 */
const generateKey = async (tag, size = 2048, retries = 0) => {
  if (retries >= 5) {
    throw new Error('Unable to generate a key')
  }
  const keypairExists = await RSAKeychain.keyExists(tag)

  if (keypairExists) {
    return { public: await RSAKeychain.getPublicKey(tag) }
  }

  const keyPair = await RSAKeychain.generateKeys(tag, size)

  if (!keyPair.public) {
    return generateKey(tag, size, retries + 1)
  }

  return keyPair
}

/**
 * @typedef {object} ExchangeKeyPairParams
 * @prop {string} deviceId
 * @prop {string?} sessionId
 * @prop {string?} cachedSessionId
 * @prop {(string)=} baseURL
 */

/**
 * Generates and exchanges public keys with the API
 * @param {ExchangeKeyPairParams} deviceInfo
 * @returns {import('./shock-thunk').default<any>}
 */
export const exchangeKeyPair = ({
  deviceId,
  sessionId,
  cachedSessionId,
  baseURL,
}) => async (dispatch) => {
  try {
    Logger.log({
      deviceId,
      sessionId,
      cachedSessionId,
    })
    if (sessionId === null) {
      throw new TypeError(`sessionId === null`)
    }
    const keyTag = `com.shocknet.APIKey.${sessionId}`
    const oldKeyTag = cachedSessionId
      ? `com.shocknet.APIKey.${cachedSessionId}`
      : null
    Logger.log('Key Tag:', keyTag)
    Logger.log('Old Key Tag:', oldKeyTag)

    // if (oldKeypair && oldKeyTag) {
    //   await RSAKeychain.deletePrivateKey(oldKeyTag)
    // }

    Logger.log('[ENCRYPTION] Generating new RSA 2048 key...')
    const keyPair = await generateKey(keyTag, 2048)
    Logger.log('[ENCRYPTION] New key generated')
    Logger.log('[ENCRYPTION] New Keypair', {
      publicKey: keyPair.public,
      deviceId,
    })
    const exchangedKeys = await Http.post(
      `${baseURL ? baseURL : ''}/api/security/exchangeKeys`,
      {
        publicKey: keyPair.public,
        deviceId,
      },
    )

    const data = {
      devicePublicKey: keyPair.public,
      APIPublicKey: exchangedKeys.data.APIPublicKey,
      sessionId: exchangedKeys.headers['x-session-id'],
      success: true,
    }

    dispatch(Actions.Connection.newKeysLoaded(data))

    return data
  } catch (err) {
    Logger.log('[ENCRYPTION] Key Exchange Error:', err)
    throw err
  }
}

/**
 * @param {ExchangeKeyPairParams} keypairDetails
 * @returns {import('./shock-thunk').default<Promise<ExchangedKeyPair | null>>}
 */
export const throttledExchangeKeyPair = (keypairDetails) => async (
  dispatch,
) => {
  try {
    if (!exchangingKeypair) {
      exchangingKeypair = exchangeKeyPair(keypairDetails)(
        dispatch,
        // @ts-expect-error
        () => {
          new Error('Did not expect getState() to be called.')
        },
        undefined,
      )
    }

    const result = await exchangingKeypair

    // eslint-disable-next-line require-atomic-updates
    exchangingKeypair = null

    return result
  } catch (err) {
    exchangingKeypair = null
    throw err
  }
}
