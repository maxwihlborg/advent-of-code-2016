import data from './input'


export const parseIp = ip => ({
  super: ip.split(/\[\S*?\]/),
  hyper: (() => {
    const re = /\[(\S*?)\]/g
    const res = []
    let m
    do {
      m = re.exec(ip)
      if (m) {
        res.push(m[1])
      }
    } while (m)
    return res
  })(),
})

export const isPalindrome = (str = '') => {
  let left = 0
  let right = str.length - 1
  while (left < right) {
    if (str[left++] !== str[right--]) {
      return false
    }
  }
  return true
}

const checkIfShortPalindromeInString = (str, len) => {
  const len2 = len - 1
  if (!str || str.length < len2) {
    return false
  }
  for (let i = 0;i < str.length - len2;i++) {
    if (str[i] !== str[i + 1] && isPalindrome(str.substr(i, len))) {
      return true
    }
  }
  return false
}

export const isABBA = str => {
  return checkIfShortPalindromeInString(str, 4)
}

export const isABA = str => {
  return checkIfShortPalindromeInString(str, 3)
}

export const getABAs = str => {
  if (!str || str.length < 2) {
    return []
  }
  const res = []
  for (let i = 0;i < str.length - 2;i++) {
    if (isABA(str.substr(i, 3))) {
      res.push(str.substr(i, 3))
    }
  }
  return res
}

export const getBABs = str => {
  return getABAs(str).reduce((acc, aba) => (
    acc.concat([ aba[1] + aba[0] + aba[1] ])
  ), [])
}

export const supportsTLS = ip => {
  const o = parseIp(ip)
  return !o.hyper.find(isABBA) && !!o.super.find(isABBA)
}

export const supportsSSL = ip => {
  const o = parseIp(ip)
  const babs = o.hyper.reduce((acc, str) => (
    acc.concat(getBABs(str))
  ), [])
  const re = new RegExp(`(${babs.join('|')})`)
  return !!o.super.find(str => re.test(str))
}

const getIPs = input => (
  input
    .split('\n')
    .map(ln => ln.trim())
    .filter(ln => !!ln)
)

export default function () {

  const ips = getIPs(data)

  const tlsCount = ips.reduce((acc, ip) => {
    return acc + (supportsTLS(ip) ? 1 : 0)
  }, 0)

  const sslCount = ips.reduce((acc, ip) => {
    return acc + (supportsSSL(ip) ? 1 : 0)
  }, 0)

  console.log('Part 1:', tlsCount)
  console.log('Part 2:', sslCount)
}

