#!/usr/bin/env node
const { readFile, readFileLineByLine } = require('../utils.js')

const START_OF_PACKET = 4
const START_OF_MESSAGE = 14

function findStarMarker(dataStreamString, markerSize) {
  let i = 1
  const markerArray = []
  const iterator = dataStreamString[Symbol.iterator]()
  let char = iterator.next()

  while (!char.done && char.value !== ' ') {
    // First, let's fill our array up to 4 chars
    if (markerArray.length < markerSize) {
      markerArray.push(char.value)
    } else {
      markerArray.shift()
      markerArray.push(char.value)

      if (isMarkerArrayUnique(markerArray, markerSize)) {
        break
      }
    }

    i++
    char = iterator.next()
  }

  return i
}

function isMarkerArrayUnique(markerArray, markerSize) {
  const uniqueEntries = new Set(markerArray)

  return uniqueEntries.size === markerSize
}

async function solution() {
  const dataStream = await readFile('./input.txt')

  // Pt 1: Find 4 unique chars in sequence
  const startOfPacket = findStarMarker(dataStream, START_OF_PACKET)
  console.log(startOfPacket)

  // Pt 2: Find 14 unique chars in sequence
  const startOfMessage = findStarMarker(dataStream, START_OF_MESSAGE)
  console.log(startOfMessage)
}

solution()