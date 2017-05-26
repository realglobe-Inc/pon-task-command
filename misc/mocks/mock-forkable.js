#!/usr/bin/env node

let foo = () => 'This is foo!'
console.log(foo())

const { a, b, c } = process.env
console.log('ENV abc=', a, b, c)
