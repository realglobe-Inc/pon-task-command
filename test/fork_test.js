/**
 * Test case for fork.
 * Runs with mocha.
 */
'use strict'

const fork = require('../lib/fork.js')
const ponContext = require('pon-context')
const { ok } = require('assert')
const co = require('co')

describe('fork', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Fork', () => co(function * () {
    let ctx = ponContext()
    let task = fork(require.resolve('../misc/mocks/mock-forkable'))
    ok(task)

    yield Promise.resolve(task(ctx))
  }))
})

/* global describe, before, after, it */
