'use strict'

const pon = require('pon')
const { fork } = require('pon-task-command')

async function tryExample () {
  let run = pon({
    'dev': fork('./bin/app.js', {
      env: { DEBUG: 'project:*' }
    })
  })

  run('dev')
}

tryExample()
