#!/usr/bin/env node
const { readFileLineByLine } = require('../utils.js')

function testEmpty(substring) {
  return /\s/.test(substring)
}

function parseChar(substring) {
  return substring.match(/[A-Z]/)[0]
}

function parseInstruction(instruction) {
  return [...instruction.matchAll(/(\d+)/g)].map((match) => match[0])
}


function parseStacks(rawStacks) {
  const finalStacks = {}

  rawStacks.forEach((rawStack, rawStackI) => {
    let i = 0
    let inChar = true
    const stack = []

    // Break string out into grokkable chunks
    // Chop 3, 1, 3, 1, 3, for as long as the string is
    while (i < rawStack.length) {
      if (inChar) {
        stack.push(rawStack.substring(i, i + 3))
        i = i + 3
        inChar = false
      } else {
        i = i + 1
        inChar = true
      }
    }

    stack.forEach((stackItem, stackItemI) => {
      const key = stackItemI + 1
      if (!finalStacks[key]) {
        finalStacks[key] = []
      }

      if (!testEmpty(stackItem)) {
        finalStacks[key].unshift(parseChar(stackItem))
      }
    })
  })

  return finalStacks
}

function shuffleItemsOneByOne(stackHash, instructions) {
  instructions.forEach((instruction) => {
    const [numberToRemove, sourceKey, targetKey] = parseInstruction(instruction)

    for (let i = 0; i < parseInt(numberToRemove, 10); i++) {
      const itemToMove = stackHash[sourceKey].pop()
      stackHash[targetKey].push(itemToMove)
    }
  })

  return stackHash
}

function shuffleItemsInChunks(stackHash, instructions) {
  instructions.forEach((instruction) => {
    const [numberToRemove, sourceKey, targetKey] = parseInstruction(instruction)
    const itemsToMove = stackHash[sourceKey].splice(-parseInt(numberToRemove, 10))
    stackHash[targetKey] = stackHash[targetKey].concat(itemsToMove)
  })

  return stackHash
}

function getTopItems(shuffledItems) {
  const stackKeys = Object.keys(shuffledItems)
  const finalItems = new Array(stackKeys.length).fill(null)

  stackKeys.forEach((stackKey) => {
    finalItems[parseInt(stackKey)] = shuffledItems[stackKey][shuffledItems[stackKey].length - 1]
  })

  return finalItems.slice(1)
}

async function solutionPt1() {
  const lineReader = await readFileLineByLine('./input.txt')
  let stacksComplete = false
  const stacks = []
  const instructions = []

  for await (const line of lineReader) {
    if (line.length === 0) {
      stacksComplete = true
    } else if (stacksComplete) {
      instructions.push(line)
    } else {
      stacks.push(line)
    }
  }

  const stackHash = parseStacks(stacks)
  const shuffledItems = shuffleItemsOneByOne(stackHash, instructions)
  const finalItems = getTopItems(shuffledItems)

  console.log(finalItems.join(''))
}

async function solutionPt2() {
  const lineReader = await readFileLineByLine('./input.txt')
  let stacksComplete = false
  const stacks = []
  const instructions = []

  for await (const line of lineReader) {
    if (line.length === 0) {
      stacksComplete = true
    } else if (stacksComplete) {
      instructions.push(line)
    } else {
      stacks.push(line)
    }
  }

  const stackHash = parseStacks(stacks)
  const shuffledItems = shuffleItemsInChunks(stackHash, instructions)
  const finalItems = getTopItems(shuffledItems)

  console.log(finalItems.join(''))
}

solutionPt1()
solutionPt2()