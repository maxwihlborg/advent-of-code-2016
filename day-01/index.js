import moves from './input'

const RIGHT = 'RIGHT'
const LEFT  = 'LEFT'

const NORTH = 0
const EAST  = 1
const SOUTH = 2
const WEST  = 3


const getMovements = input => (
  input
    .split(',')
    .map(m => m.trim())
    .filter(m => !!m)
    .map(m => ({
      dir: /^R/i.test(m) ? RIGHT : LEFT,
      steps: parseInt(m.substr(1)),
    }))
)

class Point {
  constructor (x = 0, y = 0) {
    this.x = x
    this.y = y
  }
  clone () {
    return this.add(new Point)
  }
  add (p) {
    return new Point(this.x + p.x, this.y + p.y)
  }
  sub (p) {
    return new Point(this.x - p.x, this.y - p.y)
  }
  taxLength () {
    return Math.abs(this.x) + Math.abs(this.y)
  }
  toString () {
    return `${this.x}, ${this.y}`
  }
}


export default function () {
  const movements = getMovements(moves)

  const startState = {
    start: new Point,
    facing: NORTH,
    history: {},
    goal: false,
    end: new Point,
  }

  const endState = movements.reduce((acc, m) => {

    const facing = ((f, d) => {
      switch (d) {
        case RIGHT:
          return (f + 1) % 4
        case LEFT:
          return f - 1 < 0 ? WEST : f - 1
      }

    })(acc.facing, m.dir)

    const dir = (f => {
      switch (f) {
        case NORTH:
          return new Point( 0, -1)
        case EAST:
          return new Point( 1,  0)
        case SOUTH:
          return new Point( 0,  1)
        case WEST:
          return new Point(-1,  0)
      }
    })(facing)

    let end = acc.end.clone()
    let goal = acc.goal

    const history = acc.history

    for (let i = 0; i < m.steps; i++) {
      end = end.add(dir)

      goal = goal || (
        history[end.toString()] &&
        end.clone()
      )

      history[end.toString()] = true
    }

    return {
      start:   acc.start,
      facing:  facing,
      history: history,
      goal:    goal,
      end:     end,
    }
  }, startState)

  // Distance is simply the sum of the projections on the x-/y- axis ie.
  const d1 = endState.end.sub(endState.start).taxLength()
  const d2 = endState.goal && endState.goal.sub(endState.start).taxLength()

  console.log(`Distance Part 1: ${d1}`)
  console.log(`Distance Part 2: ${d2}`)
}
