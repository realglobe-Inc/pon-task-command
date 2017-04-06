/**
 * Define task
 * @function define
 * @param {string} cmd - Command to execute
 * @param {string[]} args - Command arguments
 * @param {Object} [options={}] - Optional settings
 * @returns {function} Defined task
 */
'use strict'

const co = require('co')
const { spawn } = require('child_process')

/** @lends define */
function define (cmd, args, options = {}) {
  function task (ctx) {
    let { logger } = ctx
    let { env = {} } = options
    return co(function * () {
      return yield new Promise((resolve, reject) => {
        let spawned = spawn(cmd, args, {
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

module.exports = define


