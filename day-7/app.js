#!/usr/bin/env node
const { readFileLineByLine } = require('../utils.js')

const REGEX_LS = /[$]\s(ls)/
const REGEX_CD_IN = /[$]\s(cd)\s[a-z]/
const REGEX_CD_OUT = /[$]\s(cd)\s(..)/
const REGEX_CD_ROOT = /[$]\s(cd)\s(\/)/
const REGEX_CD_REPLACE = /[$]\s(cd)\s/

const REGEX_FILE = /[0-9]+\s([a-z]|.)+/
const REGEX_DIR = /(dir)\s[a-z]+/

function matchLineType(line) {
  if (line.match(REGEX_LS)) return 'LIST'
  if (line.match(REGEX_CD_IN)) return 'ENTER_DIR'
  if (line.match(REGEX_CD_OUT)) return 'EXIT_DIR'
  if (line.match(REGEX_CD_ROOT)) return 'ROOT_DIR'
  if (line.match(REGEX_FILE)) return 'FILE'
  if (line.match(REGEX_DIR)) return 'DIR'
}

function findDirectoryName(line) {
  return line.replace(REGEX_CD_REPLACE, '')
}

function findFileNameAndSize(line) {
  return line.split('')
}

function buildFileSystem(line, fileSystem, currentPath) {
  const lineType = matchLineType(line)

  switch (lineType) {
    case 'LIST':
      // console.log('list')
      // Noop
      break
    case 'ENTER_DIR':
      // console.log('enter dir')
      // Enter directory: Array.push() value to currentPath
      const directoryName = findDirectoryName(line)
      currentPath.push(directoryName)
      break
    case 'EXIT_DIR':
      // console.log('exit dir')

      // Exit directory: Array.pop() value to currentPath
      currentPath.pop()
      break
    case 'ROOT_DIR':
      // console.log('root dir')

      // Establish we're at the top
      currentPath = []
      break
    case 'FILE':
      // const tempFileSystem = 
      // console.log('file')

      // Use currentPath to determine where to insert file in fileSystem { [fileName]: size }
      fileSystem
      break
    case 'DIR':
      // console.log('dir')

      // Use currentPath to determine where to Init key in fileSystem { [dirName]: {} }
      break
  }
}

async function solution() {
  const lineReader = await readFileLineByLine('./input.txt')
  const fileSystem = {}
  let currentPath = []

  for await (const line of lineReader) {
    buildFileSystem(line, fileSystem, currentPath)
  }
}

solution()