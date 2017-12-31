/**
 * Forking task
 * @function fork
 * @param {string} cmd - Command to execute
 * @param {string[]} args - Command arguments
 * @param {Object} [options={}] - Optional settings
 * @param {function} [options.messageHandler] - Message handler
 * @returns {function} Defined task
 */
'use strict'

const argx = require('argx')
const childProcess = require('child_process')

/** @lends fork */
function fork (cmd, args, options = {}) {
  const a = argx(arguments)
  cmd = a.shift('string')
  args = a.shift('array') || []
  options = a.shift('object') || {}

  async function task (ctx) {
    const {logger} = ctx
    const {
      env = {},
      messageHandler = (message) => logger.info(String(message))
    } = options
    return new Promise((resolve, reject) => {
      const forked = childProcess.fork(cmd, args, {
        env: Object.assign({}, process.env, env)
      })
      forked.on('message', (message) => messageHandler(message, {forked}))
      forked.on('close', (code) => resolve(code))
      forked.on('error', (err) => reject(err))
      process.setMaxListeners(process.getMaxListeners() + 1)
      process.on('exit', () => forked.kill())
    })
  }

  return Object.assign(task,
    {}
  )
}

module.exports = fork


