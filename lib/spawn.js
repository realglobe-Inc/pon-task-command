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
  options = a.pop('object') || {}

  async function task (ctx) {
    const { logger } = ctx
    const { env = {} } = options
    return new Promise((resolve, reject) => {
      const spawned = childProcess.spawn(cmd, args, {
        env: Object.assign({}, process.env, env),
        stdio: 'inherit'
      })
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

spawn.for = (cmd, argsArray) => {
  const a = argx(argsArray)
  const options = a.pop('object') || {}
  const args = a.remain()
  return spawn(cmd, args, options)
}

Object.assign(spawn, {
  git (...args) {
    return spawn.for('git', args)
  },
  npm (...args) {
    return spawn.for('npm', args)
  },
  npx (...args) {
    return spawn.for('npx', args)
  },
  yarn (...args) {
    return spawn.for('yarn', args)
  },
  docker (...args) {
    return spawn.for('docker', args)
  },
  pon (...args) {
    return spawn.for('pon', args)
  }
})

module.exports = spawn
