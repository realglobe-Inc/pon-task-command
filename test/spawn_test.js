/**
 * Test case for spawn.
 * Runs with mocha.
 */
'use strict'

const spawn = require('../lib/spawn.js')
const ponContext = require('pon-context')
const assert = require('assert')

describe('spawn', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Spawn', async () => {
    const ctx = ponContext()
    const task = spawn('echo', ['hoge'], {})
    assert.ok(task)

    await Promise.resolve(task(ctx))
  })

  it('Sub', async () => {
    const ctx = ponContext()
    await spawn.git('--version')(ctx)
  })
})

/* global describe, before, after, it */
