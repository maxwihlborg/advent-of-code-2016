import data from './input'

export const RECT       = 1
export const ROTATE     = 2
export const ROW        = 3
export const COLUMN     = 4


export class Display {

  constructor (width, height) {
    this.width = width
    this.height = height

    this.data = new Array(width * height + 1).join('.').split('')
  }

  set (val, x, y) {
    this.data[this._getDataIndex(x, y)] = val
  }

  get (x, y) {
    return this.data[this._getDataIndex(x, y)]
  }

  handle ({ type, data }) {
    switch (type) {
      case RECT:
        return this._rect(data)
      case ROTATE:
        if (data.type === COLUMN) {
          return this._rotateColumn(data)
        }
        return this._rotateRow(data)
    }
  }

  visible () {
    return this.data.reduce((acc, v) => {
      return acc + (v === '#' ? 1 : 0)
    }, 0)
  }

  _getDataIndex (x, y) {
    return x + (y * this.width)
  }

  _rotateColumn ({ position:x, times }) {
    const vals = []
    for (let y = 0; y < this.height; y++) {
      vals.push(this.get(x, y))
    }
    vals.forEach((v, y) => {
      this.set(v, x, (y + times) % this.height)
    })
  }

  _rotateRow ({ position:y, times }) {
    const vals = []
    for (let x = 0; x < this.width; x++) {
      vals.push(this.get(x, y))
    }
    vals.forEach((v, x) => {
      this.set(v, (x + times) % this.width, y)
    })
  }

  _rect ({ width, height }) {
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        this.set('#', x, y)
      }
    }
  }

  toString () {
    return this.data.reduce((acc, d, i) => {
      if (++i % this.width === 0) {
        return acc + d + '\n'
      } else {
        return acc + d
      }
    }, '')
  }

}

const getInsturctions = input => (
  input
    .split('\n')
    .map(ln => ln.trim())
    .filter(ln => !!ln)
)

export const parseRow = (() => {
  const re1 = /^rect\s+(\d*)x(\d*)/i
  const re2 = /(row|column)\s+(\S)=(\d*)\s+by\s+(\d*)/i

  return row => {
    if (re1.test(row)) {
      const [_, width, height] = re1.exec(row)
      return {
        type: RECT,
        data: {
          width:  parseInt(width, 10),
          height: parseInt(height, 10),
        }
      }
    }
    const [_, type, direction, position, times] = re2.exec(row)
    return {
      type: ROTATE,
      data: {
        type:     type == 'row' ? ROW : COLUMN,
        position: parseInt(position, 10),
        times:    parseInt(times, 10),
      }
    }
  }
})()

export default function () {
  const instructions = getInsturctions(data)
  const disp = new Display(50, 6)

  instructions.forEach(inst => disp.handle(parseRow(inst)))

  console.log('Part 1', disp.visible(119))
  console.log('Part 2', '\n\n' + disp.toString())

}
