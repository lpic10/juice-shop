/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

const protractorConfig = require('./protractor.conf.js').config

exports.config = protractorConfig

exports.config.specs = [
    // 'test/e2e/_sharedSpec.js',
    // 'test/e2e/forgotPasswordSpec.js'
    'test/e2e/*.js'
  ]

exports.config.capabilities = {
     'browserName': 'chrome',
     'acceptInsecureCerts': true,
     'acceptSslCerts': true
  }

exports.config.capabilities.chromeOptions = {
        args: ['--ignore-certificate-errors ', '--start-maximized']
        // args: ['--headless','--disable-gpu','--window-size=1980,1200', '--ignore-certificate-errors ']
  }
