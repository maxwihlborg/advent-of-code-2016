import data from './input'

const isValid = (a, b, c) => {
  return 2 * Math.max(a, b, c) < a + b + c
}

const getTrianglesByRow = input => (
  input
    .split('\n')
    .map(ln => ln.trim())
    .filter(ln => !!ln)
    .map(ln => ln.split(/\s+/).map(n => parseInt(n, 10)))
)

const getTrianglesByColumns = input => {
  const data = getTrianglesByRow(input)
  const out = []

  for (let i = 0; i < data.length; i += 3) {
    for (let j = 0; j < 3; j++) {
      out.push([
        data[i + 0][j],
        data[i + 1][j],
        data[i + 2][j],
      ])
    }
  }
  return out
}

const getValidCount = triangels => (
  triangels.reduce((acc, t) => (
    acc + (isValid(...t) ? 1 : 0)
  ), 0)
)

export default function () {
  console.log('Part 1: ' + getValidCount(getTrianglesByRow(data)))
  console.log('Part 2: ' + getValidCount(getTrianglesByColumns(data)))
}

