import { expect } from 'chai'
import {
  RECT,
  ROTATE,
  ROW,
  COLUMN,
  parseRow,
  Display,
} from '.'


describe('day 8', function () {

  const testDisp = arr => {
    return arr.concat('').join('\n')
  }

  it('should create a Display', function () {

    const disp = new Display(20, 20)
    expect(disp.width).to.eql(20)
    expect(disp.height).to.eql(20)
    expect(disp.data.length).to.eql(20 * 20)

    expect(disp.get(10, 10)).to.eql('.')

    disp.set('#', 10, 10)
    expect(disp.get(10, 10)).to.eql('#')

  })

  it('should parse rect instruction', function () {

    expect(parseRow('rect 1x1')).to.eql({
      type: RECT,
      data: { width: 1, height: 1 }
    })

    expect(parseRow('rect 10x10')).to.eql({
      type: RECT,
      data: { width: 10, height: 10 }
    })

  })

  it('should parse rotate instruction', function () {

    expect(parseRow('rotate row y=0 by 5')).to.eql({
      type: ROTATE,
      data: { type: ROW, position: 0, times: 5 }
    })

    expect(parseRow('rotate column x=2 by 40')).to.eql({
      type: ROTATE,
      data: { type: COLUMN, position: 2, times: 40 }
    })

  })

  it('should apply updates', function () {

    const disp = new Display(5, 3)

    expect(disp.toString()).to.eql(testDisp([
      '.....',
      '.....',
      '.....',
    ]))

    disp.handle(parseRow('rect 2x2'))
    expect(disp.toString()).to.eql(testDisp([
      '##...',
      '##...',
      '.....',
    ]))

    disp.handle(parseRow('rotate column x=1 by 1'))
    expect(disp.toString()).to.eql(testDisp([
      '#....',
      '##...',
      '.#...',
    ]))

    disp.handle(parseRow('rotate row x=1 by 2'))
    expect(disp.toString()).to.eql(testDisp([
      '#....',
      '..##.',
      '.#...',
    ]))

    disp.handle(parseRow('rotate row x=1 by 2'))
    expect(disp.toString()).to.eql(testDisp([
      '#....',
      '#...#',
      '.#...',
    ]))

  })

  it('should count "visible" pixels', function () {
    const disp = new Display(5, 3)

    disp.handle(parseRow('rect 2x2'))
    expect(disp.toString()).to.eql(testDisp([
      '##...',
      '##...',
      '.....',
    ]))

    expect(disp.visible()).to.eql(4)

  })

})
