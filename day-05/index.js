import crypto from 'crypto'


const md5 = str => (
  crypto.createHash('md5').update(str).digest('hex')
)

const replaceCharAt = (str, idx, chr) => (
  str.substr(0, idx) + chr + str.substr(idx + 1)
)

const getPassword = (input, replace = false) => {
  const re = /^00000/
  const rh = /\s/

  let password = Array(9).join(' ')
  let i = 0

  do {
    const hash = md5(`${input}${i++}`)

    if (re.test(hash)) {
      console.log(hash, i)
      if (replace) {
        const [ p, c ] = hash.substr(5)
        if (rh.test(password[p])) {
          password = replaceCharAt(password, parseInt(p, 10), c)
        }
      } else {
        password = password.replace(rh, hash[5])
      }
    }

  } while (rh.test(password))

  return password
}

export default function () {
  const input = 'ffykfhsq'

  console.log('Password 1:', getPassword(input))
  console.log('Password 1:', getPassword(input, true))
}
