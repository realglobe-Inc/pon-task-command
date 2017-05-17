/**
 * Test case for spawn.
 * Runs with mocha.
 */
'use strict'

const spawn = require('../lib/spawn.js')
const ponContext = require('pon-context')
const assert = require('assert')
const co = require('co')

describe('spawn', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Spawn', () => co(function * () {
    let ctx = ponContext()
    let task = spawn('echo', [ 'hoge' ], {})
    assert.ok(task)

    yield Promise.resolve(task(ctx))
  }))
})

/* global describe, before, after, it */
