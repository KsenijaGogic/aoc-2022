#!/usr/bin/env node
const fs = require('fs')
const readline = require('readline')

async function readFile(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8')
    return data
  } catch (e) {
    console.log(e)
  }
}

async function readFileLineByLine(path) {
  const fileStream = fs.createReadStream(path, 'utf-8')

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  return rl
}

module.exports = {
  readFile,
  readFileLineByLine,
}
