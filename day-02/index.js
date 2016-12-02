import moves from './input'


const keypad1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

const u = null
const keypad2 = [
  [u,  u ,  1 ],
  [u,  2 ,  3 ,  4],
  [5,  6 ,  7 ,  8 , 9],
  [u, 'A', 'B', 'C'],
  [u,  u , 'D'],
]

const getInstructions = input => (
  input
    .split('\n')
    .map(ln => ln.trim())
    .filter(ln => !!ln)
    .map(ln => ln.split('').map(s => s.toUpperCase()))
)

const moveMap = {
  U: [  0, -1 ],
  R: [  1,  0 ],
  D: [  0,  1 ],
  L: [ -1,  0 ],
}

const getMap = keypad => {
  return keypad.reduce((topAcc, r, y) => {
    const points = r.reduce((acc, v, x) => {
      if (v === null) return acc
      return {
        ...acc,
        [`${x},${y}`]: true
      }
    }, {})
    return {
      ...topAcc,
      ...points,
    } 
  }, {})
}

const getPasscode = (startPos, keypad) => {
  const state = {
    position: startPos,
    passcode: '',
  }

  const validate = (point, map) => {
    return !!map[`${point[0]},${point[1]}`]
  }

  const instructions = getInstructions(moves)

  const keypadmap = getMap(keypad)

  const { passcode } = instructions.reduce((acc, inst) => {

    const position = inst.reduce((acc, m) => {
      const dx = moveMap[m][0]
      const dy = moveMap[m][1]

      const np = [ acc[0] + dx, acc[1] + dy ]

      return !validate(np, keypadmap) ? acc : np
    }, acc.position)

    const passcode = acc.passcode + keypad[position[1]][position[0]].toString()

    return {
      position: position,
      passcode: passcode,
    }
  }, state)

  return passcode
}

export default function () {
  console.log(`Passcode: ${getPasscode([1, 1], keypad1)}`)
  console.log(`Passcode: ${getPasscode([0, 2], keypad2)}`)
}

