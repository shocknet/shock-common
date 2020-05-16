interface Logger {
  log(...msgs: any[]): void
  debug(...msgs: any[]): void
  info(...msgs: any[]): void
  error(...msgs: any[]): void
}

let logger: Logger = {
  log() {
    throw new Error('Please set a logger for shock-common')
  },
  debug() {
    throw new Error('Please set a logger for shock-common')
  },
  info() {
    throw new Error('Please set a logger for shock-common')
  },
  error() {
    throw new Error('Please set a logger for shock-common')
  },
}

export const setLogger = (newLogger: Logger): void => {
  logger = newLogger
}

export const log: Logger['log'] = (msgs) => logger.log(msgs)
export const debug: Logger['debug'] = (msgs) => logger.debug(msgs)
export const info: Logger['info'] = (msgs) => logger.info(msgs)
export const error: Logger['error'] = (msgs) => logger.error(msgs)
