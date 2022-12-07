#!/usr/bin/env node
const { readFileLineByLine } = require('../utils.js')

const LAST_CHAR_CODE_UPPERCASE = 90
const CHAR_CODE_OFFSET_LOWERCASE = -96
const CHAR_CODE_OFFSET_UPPERCASE = -38

/**
 * Each backpack has two compartments, meaning the list of items will be divisible by half.
 * Find the character that appears in both halves.
 * Find the priority the duplicated item:
 *   - Lowercase item types a through z have priorities 1 through 26.
 *   - Uppercase item types A through Z have priorities 27 through 52.
 * Find the sum of the priority values all the doubled-up items in rucksacks.
 */

function splitLine(line) {
  const lineLength = line.length
  const firstHalf = line.substring(0, (lineLength / 2))
  const secondHalf = line.substring((lineLength / 2))
  return [firstHalf, secondHalf]
}

function findRepeatedChars(firstStringArray, secondStringArray) {
  return firstStringArray.filter(char => {
    return secondStringArray.indexOf(char) !== -1
  })
}

function findRepeatedCharInCompartments(compartments) {
  const firstCompartment = compartments[0].split('')
  const secondCompartment = compartments[1].split('')

  return findRepeatedChars(firstCompartment, secondCompartment)[0]
}

function findRepeatedCharInBackpacks(backpacks) {
  // Find the shortest one just for easier comparison
  const sortedBySize = backpacks.sort((a, b) => a.length - b.length)
  const shortest = sortedBySize[0]

  const firstOverlap = findRepeatedChars(shortest.split(''), sortedBySize[1].split(''))
  const secondOverlap = findRepeatedChars(firstOverlap, sortedBySize[2].split(''))

  return secondOverlap[0]
}


function findPriorityValue(character) {
  const charCode = character.charCodeAt(0)
  let offset = 0

  if (charCode > LAST_CHAR_CODE_UPPERCASE) {
    offset = CHAR_CODE_OFFSET_LOWERCASE
  } else {
    offset = CHAR_CODE_OFFSET_UPPERCASE
  }

  return charCode + offset
}

async function solutionPt1() {
  const lineReader = await readFileLineByLine('./input.txt')
  let priorities = 0

  for await (const line of lineReader) {
    const compartments = splitLine(line)
    const duplicatedItem = findRepeatedCharInCompartments(compartments)
    const priorityValue = findPriorityValue(duplicatedItem)

    priorities = priorities + priorityValue
  }

  console.log(priorities)
}

async function solutionPt2() {
  const lineReader = await readFileLineByLine('./input.txt')
  const backpackGroups = []
  let tempBackpackGroup = []
  let priorities = 0

  for await (const line of lineReader) {
    if (tempBackpackGroup.length === 3) {
      // Add to final groups
      backpackGroups.push(tempBackpackGroup)
      // Clear groups, prep next one
      tempBackpackGroup = [line]
    } else {
      tempBackpackGroup.push(line)
    }
  }

  backpackGroups.push(tempBackpackGroup)

  backpackGroups.forEach((backpackGroup) => {
    const duplicatedItem = findRepeatedCharInBackpacks(backpackGroup)
    const priorityValue = findPriorityValue(duplicatedItem)

    priorities = priorities + priorityValue
  })

  console.log(priorities)
}

// solutionPt1()
solutionPt2()
