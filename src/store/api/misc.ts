interface PublicKey {
  public: string
}

interface IRSAKeychain {
  keyExists(keyTag: string): Promise<boolean | undefined>
  getPublicKey(keyTag: string): Promise<string | undefined>
  generateKeys(keyTag: string, keySize: number): Promise<PublicKey>
  decrypt(data: string, keyTag: string): Promise<string>
}

export let RSAKeychain: IRSAKeychain = {
  keyExists() {
    throw new Error('Please set a RSAKeyChain for shock-common')
  },
  getPublicKey() {
    throw new Error('Please set a RSAKeyChain for shock-common')
  },
  generateKeys() {
    throw new Error('Please set a RSAKeyChain for shock-common')
  },
  decrypt() {
    throw new Error('Please set a RSAKeyChain for shock-common')
  },
}

export const setRSAKeychain = (newRSAKeychain: IRSAKeychain) => {
  RSAKeychain = newRSAKeychain
}

interface Res<T> {
  data: T
  headers: Record<string, any>
}

interface IHttp {
  get<T = any>(
    url: string,
    config?: {
      headers: Record<string, any>
    },
  ): Promise<Res<T>>
  post<T = any>(
    url: string,
    data?: any,
    config?: {
      headers: Record<string, any>
    },
  ): Promise<Res<T>>
}

export let Http: IHttp = {
  get() {
    throw new Error('Please set Http for shock-common')
  },
  post() {
    throw new Error('Please set Http for shock-common')
  },
}

export const setHttp = (newHttp: IHttp) => {
  Http = newHttp
}

export let getToken = (): Promise<string> => {
  throw new Error('Please provide getToken() to shock-common')
}

export const setGetToken = (newGetToken: () => Promise<string>) => {
  getToken = newGetToken
}

export interface Big {
  add(amt: Big | number | string): Big
  toString(): string
}

export type BigConstructor = (initial: number | Big | string) => Big

export let Big: BigConstructor = () => {
  throw new Error(`Please provide Big to shock-common`)
}

export const setBigConstructor = (newBigConstructor: BigConstructor) => {
  Big = newBigConstructor
}

export type UUID = () => string

export let uuidv4: UUID = () => {
  throw new Error(`Please provide uuidv4 to shock-common`)
}

export const setUuidv4 = (newUuidv4: UUID) => {
  uuidv4 = newUuidv4
}
