let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }
let firstTime = true

// Adds an event listener to detect input from user
window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: -1 }
      break
    case 'ArrowDown':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: 1 }
      break
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: -1, y: 0 }
      break
    case 'ArrowRight':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: 1, y: 0 }
      break
  }
})

// Exports the current input direction
export function getInputDirection() {
  // Removes the cover on the game board when the first input is given
  if(firstTime && lastInputDirection.x !== inputDirection.x || lastInputDirection.y !== inputDirection.y) {
    document.getElementById('game-cover').style.visibility = 'hidden'
  }
  lastInputDirection = inputDirection
  return inputDirection
}