import { isPost, Post } from './post'
import { isObj } from './misc'

export interface WallPageBase {
  count: number
}

export interface WallPage extends WallPageBase {
  posts: Record<string, Post>
}

export interface WallPageN extends WallPageBase {
  posts: Record<string, string>
}

export interface WallBase {
  numOfPages: number
}

export interface Wall extends WallBase {
  pages: Record<number, WallPage>
}

export interface WallN extends WallBase {
  pages: Record<number, string>
}

export const isWallPage = (o: unknown): o is WallPage => {
  const fp = o as WallPage

  if (typeof fp.count !== 'number') {
    return false
  }

  if (!isObj(fp.posts)) {
    return false
  }

  return Object.values(fp.posts).every((p) => isPost(p))
}

export const isWall = (o: unknown): o is Wall => {
  if (!isObj(o)) {
    return false
  }

  const f = /** @type {Wall} */ o

  if (typeof f.numOfPages !== 'number') {
    return false
  }

  return Object.values(f.numOfPages).every((fp) => isWallPage(fp))
}
