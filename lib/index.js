/**
 * Pon task to execute commands
 * @module pon-task-command
 * @version 1.0.0
 */

'use strict'

const define = require('./define')

let lib = define.bind(this)

Object.assign(lib, define, {
  define
})

module.exports = lib
