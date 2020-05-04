/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

const spawn = require('cross-spawn')
const colors = require('colors/safe')

let server, confName, baseUrl

if (process.argv && process.argv.length >= 3 && process.argv[2] === 'subfolder') {
  server = require('./e2eSubfolder.js')
  confName = 'protractor.subfolder.conf.js'
} else if (process.argv && process.argv.length >= 3 && process.argv[2] === 'remote') {
  server = require('./e2eRemote.js')
  confName = 'protractor.remote.conf.js'
  baseUrl = process.argv[3]
} else {
  server = require('../server.js')
  confName = 'protractor.conf.js'
}

server.start(() => {
  if (baseUrl) {
    protractor = spawn('protractor', [confName, '--baseUrl', baseUrl, '--disableChecks'])
  } else {
    protractor = spawn('protractor', [confName])
  }

  function logToConsole (data) {
    console.log(String(data))
  }

  protractor.stdout.on('data', logToConsole)
  protractor.stderr.on('data', logToConsole)

  protractor.on('exit', exitCode => {
    console.log('Protractor exited with code ' + exitCode + ' (' + (exitCode === 0 ? colors.green('SUCCESS') : colors.red('FAILED')) + ')')
    server.close(exitCode)
  })
})
