#!/usr/bin/env node
const { readFileLineByLine } = require('../utils.js')

function toTuple(pair) {
  return pair.split('-').map(val => parseInt(val, 10))
}

function toTuples(pairLine) {
  return pairLine.split(',').map(toTuple)
}

function compareTuplesForCompleteOverlap(tuples) {
  // Sort tuples so the one with the smallest number is first, then we can compare
  const needsResorting = tuples[0][0] > tuples[1][0]
  const tuplesResorted = needsResorting ? [tuples[1], tuples[0]] : tuples
  const indexSingleRangeTuple = singleRangeTuple(tuplesResorted)

  // console.log(tuples, tuplesResorted)

  const a = tuples[0][0]
  const b = tuples[0][1]
  const c = tuples[1][0]
  const d = tuples[1][1]

  return a <= c && b >= d || a >= c && b <= d
}

function singleRangeTuple(tuples) {
  let indexDupe = -1
  tuples.forEach((tuple, i) => {
    if(tuple[0] === tuple[1]) {
      indexDupe = i
    }
  })
  return indexDupe
}

async function solutionPt1() {
  const lineReader = await readFileLineByLine('./input.txt')
  let completeOverlapOccurrences = 0

  for await (const line of lineReader) {
    console.log(line)
    const tuples = toTuples(line)
    const hasOverlap = compareTuplesForCompleteOverlap(tuples)

    if (hasOverlap) {
      completeOverlapOccurrences = completeOverlapOccurrences + 1
    }
  }

  console.log(completeOverlapOccurrences)
}

solutionPt1()

