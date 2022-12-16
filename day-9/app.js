#!/usr/bin/env node
const { readFileLineByLine } = require('../utils.js')

const VISITED = 1
const NOT_VISITED = 0

const ALL = 'all'
const HEAD = 'H'
const TAIL = 'T'
const START = 's'

function parseDirectionAndSpaces(line) {
  const [direction, steps] = line.split(" ")

  return [direction, parseInt(steps, 10)]
}

function moveRight({ grid, steps, coordinates }) {
  const row = grid[coordinates[0]]

  for (let i = 0; i <= steps; i++) {
    const nextStep = row[coordinates[1] + i]

    if (!row[nextStep]) {
      row.push('.')
    } else {
      // Don't need to build anything in this case
    }

    coordinates[1] = i
  }

  return row.length
}

function moveLeft({ grid, steps, coordinates }) {
  for (let i = steps; i > 0; i--) {
    // PROBABLY don't need to keep building grid as we shouldn't go "more left" of start
    coordinates[1] = coordinates[1] - 1
  }
}

function moveUp({ grid, steps, coordinates, currentWidth }) {
  for (let i = 0; i <= steps; i++) {
    const nextRow = grid[coordinates[0] + i]

    if (!nextRow) {
      const row = new Array(currentWidth).fill('.')
      grid.push(row)
    } else {
      // Don't need to build anything in this case
    }

    coordinates[0] = i
  }
}

function moveDown({ grid, steps, coordinates }) {
  console.log({ steps })
  for (let i = steps; i > 0; i--) {
    // PROBABLY don't need to keep building grid as we shouldn't go "more down" than start
    coordinates[0] = coordinates[0] - 1
  }
}

function buildAndMoveThroughGrid({ grid, line, coordinates, currentWidth }) {
  const [direction, steps] = parseDirectionAndSpaces(line)
  let newWidth = currentWidth

  if (direction === 'R') {
    newWidth = moveRight({ grid, steps, coordinates })
  } else if (direction === 'L') {
    moveLeft({ grid, steps, coordinates })
  } else if (direction === 'U') {
    moveUp({ grid, steps, coordinates, currentWidth })
  } else if (direction === 'D') {
    moveDown({ grid, steps, coordinates })
  }

  return { newWidth }
}

async function solution() {
  const lineReader = await readFileLineByLine('./input.txt')
  const grid = [[]]
  const startingPosition = [0, 0]
  let currentWidth = 0

  for await (line of lineReader) {
    const { newWidth } = buildAndMoveThroughGrid({ grid, line, coordinates: startingPosition, currentWidth })

    console.log({ grid, startingPosition })

    currentWidth = newWidth
  }
}

solution()