#!/usr/bin/env node
const { readFileLineByLine } = require('../utils.js')

function testIfEdge({ rowsOfTrees, row, rowIndex, treeIndex }) {
  const outerRow = rowIndex === 0 || rowIndex === rowsOfTrees.length - 1
  const outerCol = treeIndex === 0 || treeIndex === row.length - 1

  return outerRow || outerCol
}

function scanRowForVisibility({ tree, row, treeIndex }) {
  let tallerL
  let tallerR

  // scan left
  for (let i = treeIndex - 1; i >= 0; i--) {
    const next = parseInt(row[i], 10)
    if (next < tree) {
      tallerL = true
    } else {
      tallerL = false
      break
    }
  }

  // scan right
  for (let i = treeIndex + 1; i < row.length; i++) {
    const next = parseInt(row[i], 10)
    if (next < tree) {
      tallerR = true
    } else {
      tallerR = false
      break
    }
  }

  return tallerL || tallerR
}

function scanColumn({ tree, rowsOfTrees, rowIndex, treeIndex }) {
  let tallerU
  let tallerD

  // scan up
  for (let i = rowIndex - 1; i >= 0; i--) {
    const next = parseInt(rowsOfTrees[i][treeIndex], 10)
    if (next < tree) {
      tallerU = true
    } else {
      tallerU = false
      break
    }
  }

  // scan down
  for (let i = rowIndex + 1; i < rowsOfTrees.length; i++) {
    const next = parseInt(rowsOfTrees[i][treeIndex], 10)
    if (next < tree) {
      tallerD = true
    } else {
      tallerD = false
      break
    }
  }

  return tallerU || tallerD
}

function scanForVisibility({ rowsOfTrees, row, tree, rowIndex, treeIndex }) {

  // first, test L / R, then U / D
  const visibleInRow = scanRowForVisibility({ tree, row, treeIndex })

  if (visibleInRow) return true

  const visibleInColumn = scanColumn({ tree, rowsOfTrees, rowIndex, treeIndex })

  return visibleInColumn
}

function testIfVisible({ rowsOfTrees, row, tree, rowIndex, treeIndex }) {
  if (testIfEdge({ rowsOfTrees, row, rowIndex, treeIndex })) return true

  return scanForVisibility({ rowsOfTrees, row, tree, rowIndex, treeIndex })
}

function scanRowForScenicScore({ tree, row, treeIndex }) {
  let scoreLeft = 0
  let scoreRight = 0

  // scan left
  for (let i = treeIndex - 1; i >= 0; i--) {
    const next = parseInt(row[i], 10)
    if (next < tree) {
      scoreLeft = scoreLeft + 1
    } else {
      scoreLeft = scoreLeft + 1
      break
    }
  }

  // scan right
  for (let i = treeIndex + 1; i < row.length; i++) {
    const next = parseInt(row[i], 10)
    if (next < tree) {
      scoreRight = scoreRight + 1
    } else {
      scoreRight = scoreRight + 1
      break
    }
  }

  return { scoreLeft, scoreRight }
}

function scanColumnForScenicScore({ tree, rowsOfTrees, rowIndex, treeIndex }) {
  let scoreUp = 0
  let scoreDown = 0

  // scan up
  for (let i = rowIndex - 1; i >= 0; i--) {
    const next = parseInt(rowsOfTrees[i][treeIndex], 10)
    if (next < tree) {
      scoreUp = scoreUp + 1
    } else {
      scoreUp = scoreUp + 1
      break
    }
  }

  // scan down
  for (let i = rowIndex + 1; i < rowsOfTrees.length; i++) {
    const next = parseInt(rowsOfTrees[i][treeIndex], 10)
    if (next < tree) {
      scoreDown = scoreDown + 1
    } else {
      scoreDown = scoreDown + 1
      break
    }
  }

  return { scoreUp, scoreDown }
}

function testScenicScore({ rowsOfTrees, row, tree, rowIndex, treeIndex }) {
  if (testIfEdge({ rowsOfTrees, row, rowIndex, treeIndex })) return 0

  const { scoreUp, scoreDown } = scanColumnForScenicScore({ tree, rowsOfTrees, rowIndex, treeIndex })
  const { scoreLeft, scoreRight } = scanRowForScenicScore({ tree, row, treeIndex })

  return scoreUp * scoreDown * scoreLeft * scoreRight
}

async function solutionPt1() {
  const lineReader = await readFileLineByLine('./input.txt')
  const rowsOfTrees = []
  let numberVisible = 0

  for await (const line of lineReader) {
    rowsOfTrees.push(line)
  }

  rowsOfTrees.forEach((row, rowIndex) => {
    row.split('').forEach((_tree, treeIndex) => {
      const tree = parseInt(_tree, 10)
      if (testIfVisible({ rowsOfTrees, row, tree, rowIndex, treeIndex })) {
        numberVisible = numberVisible + 1
      }
    })
  })

  console.log(numberVisible)
}

async function solutionPt2() {
  const lineReader = await readFileLineByLine('./input.txt')
  const rowsOfTrees = []
  let largestScenicScore = 0

  for await (const line of lineReader) {
    rowsOfTrees.push(line)
  }

  rowsOfTrees.forEach((row, rowIndex) => {
    row.split('').forEach((_tree, treeIndex) => {
      const tree = parseInt(_tree, 10)
      const scenicScore = testScenicScore({ rowsOfTrees, row, tree, rowIndex, treeIndex })

      if (scenicScore > largestScenicScore) {
        largestScenicScore = scenicScore
      }
    })
  })

  console.log(largestScenicScore)
}

// solutionPt1()
solutionPt2()