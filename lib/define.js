/**
 * Define task
 * @function define
 * @param {string} cmd - Command to execute
 * @param {string[]} args - Command arguments
 * @param {Object} [options={}] - Optional settings
 * @returns {function} Defined task
 */
'use strict'

const spawn = require('./spawn')

/** @lends define */
function define (cmd, args, options = {}) {
  return spawn(cmd, args, options)
}

module.exports = define
