import data from './input'


const getColumns = input => (
  input
    .split('\n')
    .map(ln => ln.trim())
    .filter(ln => !!ln)
    .reduce((topAcc, ln) => {
      return ln
        .split('')
        .reduce((acc, chr, i) => {
          acc[i] = (acc[i] || '') + chr
          return acc
        }, topAcc)
    }, [])
)

const getMaxChar = invert => row => (
  Object.entries(row
    .split('')
    .reduce((acc, chr) => Object.assign(acc, {
      [chr]: (acc[chr] || 0) + 1
    }), {})
  ).sort((a, b) => (invert ? -1 : 1 ) * (b[1] - a[1]))[0][0]
)


export default function () {
  console.log('Part 1:', getColumns(data).map(getMaxChar(false)).join(''))
  console.log('Part 2:', getColumns(data).map(getMaxChar(true)).join(''))
}

