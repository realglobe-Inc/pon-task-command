/**
 * Test case for spawn.
 * Runs with mocha.
 */
'use strict'

const spawn = require('../lib/spawn.js')
const ponContext = require('pon-context')
const assert = require('assert').strict

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

  it('Status code', async () => {
    const ctx = ponContext()
    const failingTask = spawn('false')

    await assert.rejects(async () => {
      try {
        await failingTask(ctx)
      } catch (e) {
        console.error(e.message)
        throw e
      }
    })
  })

  it('Spawn a process in which it kills self', async () => {
    const ctx = ponContext()
    const task = spawn(require.resolve('../misc/mocks/mock-kill-self'))
    await task(ctx)
  })
})

/* global describe, before, after, it */
