#!/usr/bin/env node
const { readFileLineByLine } = require('../utils.js')

const whiteSpace = /^\s*$/

async function solution() {
  const lineReader = await readFileLineByLine('./input.txt')
  const caloriesByGroup = []

  let current = 0

  // Populate array in-order with largest number
  for await (const line of lineReader) {
    if (whiteSpace.test(line)) {
      caloriesByGroup.push(current)
      current = 0
    } else {
      current = current + parseInt(line, 10)
    }
  }

  const sorted = caloriesByGroup.slice().sort((a, b) => b - a)
  const topElf = sorted[0]
  const topThreeElves = topElf + sorted[1] + sorted[2]

  // Day one, part one: Find the elf carrying the most amount of calories, and sum how many calories they're carrying
  console.log(topElf)

  // // Day one, part two: Find the top 3 elves carrying the most amount of calories, and sum how many calories they're carrying
  console.log(topThreeElves)
}

solution()
