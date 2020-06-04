/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

describe('/ftp', () => {
  describe('challenge "confidentialDocument"', () => {
    it('should be able to access file /ftp/acquisitions.md', () => {
      browser.driver.get(browser.baseUrl + '/ftp/acquisitions.md')
    })

    protractor.expect.challengeSolved({ challenge: 'Confidential Document', category: 'Sensitive Data Exposure', wafshouldblock: "No" })
  })

  describe('challenge "errorHandling"', () => {
    it('should leak information through error message accessing /ftp/easter.egg due to wrong file suffix', () => {
      browser.driver.get(browser.baseUrl + '/ftp/easter.egg')

      browser.driver.findElements(by.id('stacktrace')).then(elements => {
        expect(!!elements.length).toBe(true)
      })
    })

    protractor.expect.challengeSolved({ challenge: 'Error Handling', category: 'Security Misconfiguration', wafshouldblock: "No" })
  })

  describe('challenge "forgottenBackup"', () => {
    it('should be able to access file /ftp/coupons_2013.md.bak with poison null byte attack', () => {
      browser.driver.get(browser.baseUrl + '/ftp/coupons_2013.md.bak%2500.md')
    })
    protractor.expect.challengeSolved({ challenge: 'Forgotten Sales Backup', category: 'Null Byte Poisoning', wafshouldblock: "Yes" })
  })

  describe('challenge "forgottenDevBackup"', () => {
    it('should be able to access file /ftp/package.json.bak with poison null byte attack', () => {
      browser.driver.get(browser.baseUrl + '/ftp/package.json.bak%2500.md')
    })
    protractor.expect.challengeSolved({ challenge: 'Forgotten Developer Backup', category: 'Null Byte Poisoning', wafshouldblock: "Yes" })
  })

  describe('challenge "easterEgg1"', () => {
    it('should be able to access file /ftp/easter.egg with poison null byte attack', () => {
      browser.driver.get(browser.baseUrl + '/ftp/eastere.gg%2500.md')
    })
    protractor.expect.challengeSolved({ challenge: 'Easter Egg', category: 'Null Byte Poisoning', wafshouldblock: "Yes" })
  })

  describe('challenge "misplacedSiemFileChallenge"', () => {
    it('should be able to access file /ftp/suspicious_errors.yml with poison null byte attack', () => {
      browser.driver.get(browser.baseUrl + '/ftp/suspicious_errors.yml%2500.md')
    })
    protractor.expect.challengeSolved({ challenge: 'Misplaced Signature File', category: 'Null Byte Poisoning', wafshouldblock: "Yes" })
  })
})
