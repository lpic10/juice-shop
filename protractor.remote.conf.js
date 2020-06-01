/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

const url = require('url')
const protractorConfig = require('./protractor.conf.js').config
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = protractorConfig

exports.config.logLevel = 'ERROR',

exports.config.jasmineNodeOpts = {
  showColors: false,
  silent: true,
  defaultTimeoutInterval: 90000,
  print: function() {}
}

exports.config.onPrepare = function () {
  jasmine.getEnv().clearReporters()
  jasmine.getEnv().addReporter(new SpecReporter({
    suite: {
      displayNumber: true,
    },
    spec: {
      displayStacktrace: 'none',
      displayPending: false,
    },
    summary: {
      displaySuccesses: false,
      displayFailed: false,
      displayPending: false,
    },
    colors: {
      enabled: false,
    },
    prefixes: {
      successful: "OK: ",
      failed: "NOK: ",
      pending: "PENDING: ",
    }
  }))

  let basePath = (new url.URL(browser.baseUrl)).pathname
  if (basePath === '/') basePath = ''

  // Get all banners out of the way
  browser.get(basePath + '/#')
  browser.manage().addCookie({ name: 'cookieconsent_status', value: 'dismiss' })
  browser.manage().addCookie({ name: 'welcomebanner_status', value: 'dismiss' })

  // Ensure score board shows all challenges (by default only 1-star challenges are shown)
  browser.get(basePath + '/#/score-board')
  element(by.id('btnToggleAllDifficulties')).click()
}

exports.config.specs = [
    'test/e2e/_sharedSpecSolver.js',
    //'test/e2e/forgedJwtSpec.js'
    'test/e2e/[a-z]*.js'
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
