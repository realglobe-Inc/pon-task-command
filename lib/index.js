/**
 * Pon task to execute commands
 * @module pon-task-command
 * @version 3.1.7
 */

'use strict'

const define = require('./define')
const fork = require('./fork')
const spawn = require('./spawn')

let lib = define.bind(this)

Object.assign(lib, define, {
  define,
  fork,
  spawn
})

module.exports = lib
