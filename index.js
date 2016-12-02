#!/usr/bin/env node
import chalk from 'chalk'


const run = path => {
  const r = require(path)
  const m = r.default || r
  if (typeof m === 'function') {
    m()
  }
}


const d = process.argv[2]

if (!d) {
  console.log('error: No day provided!')
} else {
  run(`./day-${d.length > 1 ? d : '0' + d}`)
}


