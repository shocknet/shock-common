import { isObj } from './misc'

export interface Follow {
  user: string
  status: 'ok' | 'processing'
  private: boolean
}

export const isFollow = (o: unknown): o is Follow => {
  if (!isObj(o)) {
    return false
  }

  const f = (o as unknown) as Follow

  const statusIsOk = f.status === 'ok' || f.status === 'processing'

  return (
    statusIsOk && typeof f.user === 'string' && typeof f.private === 'boolean'
  )
}
