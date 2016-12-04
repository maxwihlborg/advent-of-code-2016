import rooms from './input'


const ROOM_RE = /^(\S+)\-(\d+)\[(\S{5,5})\]$/
const A_CODE  = 'a'.charCodeAt(0)

const isValid = room => (
  room.checksum === room.stats
    .slice(0, 5)
    .reduce((acc, [chr]) => acc + chr, '')
)

const getRoom = str => {
  const [ _, data, sector, checksum ] = ROOM_RE.exec(str)

  const stats = Object.entries(data
    .replace(/\-/g, '')
    .split('')
    .reduce((acc, chr) => Object.assign(acc, {
      [chr]: (acc[chr] || 0) + 1,
    }), {})
  ).sort(([ak, av], [bk, bv]) => (
    av === bv
      ? (ak < bk ? -1 : 1)
      : (av > bv ? -1 : 1)
  ))

  return {
    stats:    stats,
    data:     data,
    sector:   parseInt(sector, 10),
    checksum: checksum,
  }
}

const getRooms = input => (
  input
    .split('\n')
    .reduce((acc, ln) => {
      const str = ln.trim()
      if (!!str) {
        acc.push(getRoom(str))
      }
      return acc
    }, [])
)

const decrypt = room => (
  room.data
    .split('')
    .reduce((acc, chr) => (
      acc + (chr === '-'
        ? ' '
        : String.fromCharCode(A_CODE + (
          (chr.charCodeAt(0) - A_CODE + room.sector) % 26
        ))
      )
    ), '')
)

export default function () {

  const validRooms = getRooms(rooms)
    .filter(room => isValid(room))

  const sectorSum = validRooms
    .reduce((acc, room) => acc + room.sector, 0)

  const northRoom = validRooms
    .find(room => /northpole/.test(decrypt(room)))

  console.log('Sector sum:', sectorSum)
  console.log('Northpole room sector:', northRoom && northRoom.sector)
}

