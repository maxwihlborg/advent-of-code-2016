import moves from './input'


const keypad1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

const _ = null
const keypad2 = [
  [ _ ,  _ ,  1 ,  _ , _ ],
  [ _ ,  2 ,  3 ,  4 , _ ],
  [ 5 ,  6 ,  7 ,  8 , 9 ],
  [ _ , 'A', 'B', 'C', _ ],
  [ _ ,  _ , 'D',  _ , _ ],
]

const getInstructions = input => (
  input
    .split('\n')
    .reduce((acc, ln) => {
      const str = ln.trim()
      if (!!str) {
        acc.push(str
          .split('')
          .map(chr => chr.toUpperCase())
        )
      }
      return acc
    }, [])
)

const moveMap = {
  U: [  0, -1 ],
  R: [  1,  0 ],
  D: [  0,  1 ],
  L: [ -1,  0 ],
}

const serializePoint = (x, y) => `${x}, ${y}`

const getMoveMap = keypad => (
  keypad.reduce((topAcc, row, y) => (
    Object.assign(topAcc,
      row.reduce((acc, chr, x) => (
        chr === null
          ? acc
          : Object.assign(acc, {
            [serializePoint(x, y)]: true,
          })
      ), {})
    )
  ), {})
)

const getPasscode = (startPos, keypad) => {
  const state = {
    position: startPos,
    passcode: '',
  }

  const validate = (point, map) => (
    !!map[serializePoint(...point)]
  )

  const instructions = getInstructions(moves)

  const keyPadMap = getMoveMap(keypad)

  const { passcode } = instructions.reduce((acc, inst) => {

    const position = inst.reduce((acc, m) => {
      const dx = moveMap[m][0]
      const dy = moveMap[m][1]

      const np = [ acc[0] + dx, acc[1] + dy ]

      return !validate(np, keyPadMap) ? acc : np
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
  console.log('Passcode 1:', getPasscode([1, 1], keypad1))
  console.log('Passcode 2:', getPasscode([0, 2], keypad2))
}

