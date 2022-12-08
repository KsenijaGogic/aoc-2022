#!/usr/bin/env node
const { readFileLineByLine } = require('../utils.js')

function toTuple(pair) {
  return pair.split('-').map(val => parseInt(val, 10))
}

function toTuples(pairLine) {
  return pairLine.split(',').map(toTuple)
}


function compareTuplesForCompleteOverlap(tuples) {
  const a = tuples[0][0]
  const b = tuples[0][1]
  const c = tuples[1][0]
  const d = tuples[1][1]

  return a <= c && b >= d || a >= c && b <= d
}

function compareTuplesForPartialOverlap(tuples) {
  const needsResorting = tuples[0][0] > tuples[1][0]
  const tuplesResorted = needsResorting ? [tuples[1], tuples[0]] : tuples

  const b = tuplesResorted[0][1]
  const c = tuplesResorted[1][0]

  return b >= c
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

async function solutionPt2() {
  const lineReader = await readFileLineByLine('./input.txt')
  let partialOverlapOccurrences = 0

  for await (const line of lineReader) {
    const tuples = toTuples(line)
    const hasOverlap = compareTuplesForPartialOverlap(tuples)

    console.log(tuples, hasOverlap)

    if (hasOverlap) {
      partialOverlapOccurrences = partialOverlapOccurrences + 1
    }
  }

  console.log(partialOverlapOccurrences)
}

solutionPt1()
solutionPt2()

