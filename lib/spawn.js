/**
 * Spawning task
 * @function spawn
 * @param {string} cmd - Command to execute
 * @param {string[]} args - Command arguments
 * @param {Object} [options={}] - Optional settings
 * @returns {function} Spawned task
 */
'use strict'

const argx = require('argx')
const childProcess = require('child_process')

/** @lends spawn */
function spawn (cmd, args, options = {}) {
  const a = argx(arguments)
  cmd = a.shift('string')
  args = a.shift('array') || []
  options = a.shift('object') || {}

  async function task (ctx) {
    const {logger} = ctx
    const {env = {}} = options
    return new Promise((resolve, reject) => {
      const spawned = childProcess.spawn(cmd, args, {
        env: Object.assign({}, process.env, env)
      })
      spawned.stdout.on('data', (data) => logger.debug(String(data).trim()))
      spawned.stderr.on('data', (data) => logger.error(String(data).trim()))
      spawned.on('close', (code) => resolve(code))
      spawned.on('error', (err) => reject(err))
      process.setMaxListeners(process.getMaxListeners() + 1)
      process.on('exit', () => spawned.kill())
    })
  }

  return Object.assign(task,
    {}
  )
}

module.exports = spawn
