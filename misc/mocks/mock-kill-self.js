#!/usr/bin/env node

setTimeout(() => {}, 300)

process.kill(process.pid, 'SIGTERM')
