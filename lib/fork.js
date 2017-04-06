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

const co = require('co')
const childProcess = require('child_process')

/** @lends fork */
function fork (cmd, args, options = {}) {
  function task (ctx) {
    let { logger } = ctx
    let {
      env = {},
      messageHandler = () => null
    } = options
    return co(function * () {
      return yield new Promise((resolve, reject) => {
        let forked = childProcess.fork(cmd, args, {
          env: Object.assign({}, process.env, env)
        })
        forked.on('message', (message) => messageHandler(message, { forked }))
        forked.on('close', (code) => resolve(code))
        forked.on('error', (err) => reject(err))
      })
    })
  }

  return Object.assign(task,
    {}
  )
}

module.exports = fork


