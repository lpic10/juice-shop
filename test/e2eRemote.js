/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

const app = require('express')()
const server = require('http').Server(app)

exports.start = async function (readyCallback) {
  if (readyCallback) {
    readyCallback()
  }
}

exports.close = function (exitCode) {
  return server.close(exitCode)
}
