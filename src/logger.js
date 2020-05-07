/**
 * @typedef {import('./logger-types').Logger} Logger
 */

/**
 * @type {Logger}
 */
let logger = {
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

/**
 * @param {Logger} newLogger
 * @returns {void}
 */
export const setLogger = (newLogger) => {
  logger = newLogger
}

/**
 * @returns {Logger}
 */
export const getLogger = () => logger
