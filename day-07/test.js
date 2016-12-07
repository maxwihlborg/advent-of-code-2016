import { expect } from 'chai'
import {
  isPalindrome,
  parseIp,
  isABBA,
  isABA,
  getABAs,
  getBABs,
  supportsTLS,
  supportsSSL,
} from '.'

describe('day 7', function () {


  it('should be a palindrome', function () {
    expect(isPalindrome('abba')).to.be.true
    expect(isPalindrome('aaaa')).to.be.true
    expect(isPalindrome('racecar')).to.be.true
  })

  it('should not be a palindrome', function () {
    expect(isPalindrome('notapalindrome')).to.be.false
  })

  it('should parse ip', function () {
    const ip1 = parseIp('rhamaeovmbheijj[hkwbkqzlcscwjkyjulk]ajsxfuemamuqcjccbc')
    const ip2 = parseIp('abc[abc]abc[abc]abc')

    expect(ip1.hyper).to.eql(['hkwbkqzlcscwjkyjulk'])
    expect(ip1.super).to.eql(['rhamaeovmbheijj', 'ajsxfuemamuqcjccbc'])

    expect(ip2.hyper).to.eql(['abc', 'abc'])
    expect(ip2.super).to.eql(['abc', 'abc', 'abc'])
  })

  it('should be ABBA', function () {
    expect(isABBA('abba')).to.be.true
    expect(isABBA('tabba')).to.be.true
    expect(isABBA('notabba')).to.be.true
  })

  it('should not be ABBA', function () {
    expect(isABBA('aaaa')).to.be.false
    expect(isABBA('racecar')).to.be.false
  })

  it('should support TLS', function () {
    expect(supportsTLS('abba[test]end')).to.be.true
    expect(supportsTLS('abba[mnop]qrst')).to.be.true
    expect(supportsTLS('ioxxoj[asdfgh]zxcvbn')).to.be.true
  })

  it('should not support TLS', function () {
    expect(supportsTLS('start[hyper]end')).to.be.false
    expect(supportsTLS('abba[abba]abba')).to.be.false
    expect(supportsTLS('abcd[bddb]xyyx')).to.be.false
    expect(supportsTLS('aaaa[qwer]tyui')).to.be.false
  })

  it('should be ABA', function () {
    expect(isABA('aba')).to.be.true
    expect(isABA('aaba')).to.be.true
  })

  it('should not be ABA', function () {
    expect(isABA('bbb')).to.be.false
    expect(isABA('test')).to.be.false
  })

  it('should return list of ABAs', function () {
    expect(getABAs('aba')).to.be.eql(['aba'])
    expect(getABAs('abacdc')).to.be.eql(['aba', 'cdc'])
    expect(getABAs('abab')).to.be.eql(['aba', 'bab'])
  })

  it('should return list of BABs', function () {
    expect(getBABs('aba')).to.be.eql(['bab'])
    expect(getBABs('abacdc')).to.be.eql(['bab', 'dcd'])
    expect(getBABs('abab')).to.be.eql(['bab', 'aba'])
  })

  it('should support SSL', function () {
    expect(supportsSSL('aba[bab]xyz')).to.be.true
    expect(supportsSSL('aaa[kek]eke')).to.be.true
    expect(supportsSSL('zazbz[bzb]cdb')).to.be.true
  })

  it('should not support SSL', function () {
    expect(supportsSSL('xyx[xyx]xyx')).to.be.false
  })

})
