import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood, score } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false


const gameBoard = document.getElementById('game-board')
const displayedScore = document.getElementById('displayed-score')
const postGame = document.getElementById('post-game')
const finalScore = document.getElementById('final-score')

function main(currentTime) {
  if (gameOver){
    gameBoard.style.visibility = 'hidden'
    finalScore.value = score
    postGame.style.visibility = 'visible'
    postGame.style.display = 'inline'
    return
  }


  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return


  lastRenderTime = currentTime

  update()
  draw()
  displayedScore.innerHTML = "Score: " + score
}

window.requestAnimationFrame(main)

function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
