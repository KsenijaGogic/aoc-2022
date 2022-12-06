#!/usr/bin/env node
const { readFileLineByLine } = require('../utils.js')

const ROCK = 'rock'
const PAPER = 'paper'
const SCISSORS = 'scissors'

const LOSE = 'lose'
const DRAW = 'draw'
const WIN = 'win'

const LOSE_SCORE = 0
const DRAW_SCORE = 3
const WIN_SCORE = 6

/**
 * Rules:
 * Opponent plays:
 *   A – Rock
 *   B – Paper
 *   C – Scissors
 *
 * Your plays:
 *   X – Rock
 *   Y – Paper
 *   Z – Scissors
 *
 * Scoring:
 *   1 if you pick rock
 *   2 if you pick paper
 *   3 if you pick scissors
 *   0 if you lose
 *   3 if its a draw
 *   6 if you won
 */

function determineWinScore(opponentPlay, yourPlay) {
  if (opponentPlay === ROCK) {
    if (yourPlay === ROCK) {
      return DRAW_SCORE
    } else if (yourPlay === PAPER) {
      return WIN_SCORE
    } else {
      return LOSE_SCORE
    }
  } else if (opponentPlay === PAPER) {
    if (yourPlay === PAPER) {
      return DRAW_SCORE
    } else if (yourPlay === SCISSORS) {
      return WIN_SCORE
    } else {
      return LOSE_SCORE
    }
  } else if (opponentPlay === SCISSORS) {
    if (yourPlay === SCISSORS) {
      return DRAW_SCORE
    } else if (yourPlay === ROCK) {
      return WIN_SCORE
    } else {
      return LOSE_SCORE
    }
  }
}

function determinePlayForOutcome(opponentPlay, expectedOutcome) {
  if (expectedOutcome === WIN) {
    if (opponentPlay === ROCK) {
      return PAPER
    } else if (opponentPlay === PAPER) {
      return SCISSORS
    } else {
      return ROCK
    }
  } else if (expectedOutcome === DRAW) {
    return opponentPlay
  } else if (expectedOutcome === LOSE) {
    if (opponentPlay === ROCK) {
      return SCISSORS
    } else if (opponentPlay === PAPER) {
      return ROCK
    } else {
      return PAPER
    }
  }
}

function determineWinScoreGivenOutcome(expectedOutcome) {
  switch(expectedOutcome) {
    case WIN:
      return WIN_SCORE
    case DRAW:
      return DRAW_SCORE
    case LOSE:
      return LOSE_SCORE
  }
}

function determinePickScore(yourPlay) {
  switch(yourPlay) {
    case ROCK:
      return 1
    case PAPER:
      return 2
    case SCISSORS:
      return 3
  }
}

function determinePlay(pick) {
  switch(pick) {
    case 'A':
    case 'X':
      return ROCK
    case 'B':
    case 'Y':
      return PAPER
    case 'C':
    case 'Z':
      return SCISSORS
  }
}

function determineOutcome(pick) {
  switch(pick) {
    case 'X':
      return LOSE
    case 'Y':
      return DRAW
    case 'Z':
      return WIN
  }
}

async function solutionPt1() {
  const lineReader = await readFileLineByLine('./input.txt')
  let score = 0

  // Part 1 – Figure out what the score would be if you treated the second column as what you need to play
  for await (const line of lineReader) {
    const plays = line.split(' ')
    const opponentPlay = determinePlay(plays[0])
    const yourPlay = determinePlay(plays[1])

    const winScore = determineWinScore(opponentPlay, yourPlay)
    const pickScore = determinePickScore(yourPlay)

    console.log(plays, opponentPlay, yourPlay)

    score = score + winScore + pickScore
  }

  console.log(score)
}

async function solutionPt2() {
  const lineReader = await readFileLineByLine('./input.txt')
  let score = 0

  // Part 2 – Figure out what the score would be if you followed the guide as if it predicted outcome
  for await (const line of lineReader) {
    const plays = line.split(' ')
    const opponentPlay = determinePlay(plays[0])
    const expectedOutcome = determineOutcome(plays[1])
    const yourPlay = determinePlayForOutcome(opponentPlay, expectedOutcome)

    const winScore = determineWinScoreGivenOutcome(expectedOutcome)
    const pickScore = determinePickScore(yourPlay)

    console.log(plays, opponentPlay, yourPlay)

    score = score + winScore + pickScore
  }

  console.log(score)
}

// solutionPt1()
solutionPt2()