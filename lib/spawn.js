/**
 * Spawning task
 * @function spawn
 * @param {string} cmd - Command to execute
 * @param {string[]} args - Command arguments
 * @param {Object} [options={}] - Optional settings
 * @returns {function} Spawned task
 */
'use strict'

const co = require('co')
const childProcess = require('child_process')

/** @lends spawn */
function spawn (cmd, args, options = {}) {
  function task (ctx) {
    let { logger } = ctx
    let { env = {} } = options
    return co(function * () {
      return yield new Promise((resolve, reject) => {
        let spawned = childProcess.spawn(cmd, args, {
          env: Object.assign({}, process.env, env)
        })
        spawned.stdout.on('data', (data) => logger.debug(String(data)))
        spawned.stderr.on('data', (data) => logger.error(String(data)))
        spawned.on('close', (code) => resolve(code))
        spawned.on('error', (err) => reject(err))
      })
    })
  }

  return Object.assign(task,
    {}
  )
}

module.exports = spawn
