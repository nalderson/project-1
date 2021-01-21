// GRID + CELLS //
const grid = document.querySelector('.grid')
const width = 10
const cells = []

for (let index = 0; index < width ** 2; index++) {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  grid.appendChild(cell)
  cells.push(cell)
  cell.style.width = `${100 / width}%`
  cell.style.height = `${100 / width}%`
}

// SNAKE ITEMS //
let snake = [13, 14, 15, 16] 
let snakeHead = snake[0] 
let snakeTail = snake.length -1 
let fruitPosition = 63
let direction = 'left'
let gameSpeed = 1000
let interval
let numberOfFruit = 0
let numberEaten = document.querySelector('h2')

// FRUIT ON THE GRID //
cells[fruitPosition].classList.add('fruit')

// SNAKE ON THE GRID //
for (let index = 0; index < snake.length; index++) {
}
snake.forEach((bodyPart, index) => {
  cells[bodyPart].classList.add('snake')
})

// EVENT LISTENER //

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 37) {
    direction = 'left'
  }
  else if (event.keyCode === 38) {
    direction = 'up'
  }
  else if (event.keyCode === 39) {
    direction = 'right'
  }
  else if (event.keyCode === 40) {
    direction = 'down'
  }
})


// On load - display pop-up //
const button = document.querySelector('button')
const popup = document.querySelector('.popup')
button.addEventListener('click', closePopUp) 
function closePopUp(){
  console.log('i clicked the button')
  popup.style.display = "none"
  startGame()
}

function startGame () {
  
  // SET INTERVAL //
   interval = setInterval((keyPress) => {
    
    if (direction === 'left' && !(snake % width === 0)) {
      snake.forEach((bodyPart, index) => {
        cells[bodyPart].classList.remove('snake')
      })
      snake.unshift(snake[0] - 1)
      snake.pop()
      snake.forEach((bodyPart, index) => {
        cells[bodyPart].classList.add('snake')
      })
    }

    else if (direction === 'up' && !(snake < width)) {
      snake.forEach((bodyPart, index) => {
        cells[bodyPart].classList.remove('snake')
      })
      snake.unshift(snake[0] - width)
      snake.pop()
      snake.forEach((bodyPart, index) => {
        cells[bodyPart].classList.add('snake')
      })
    }

    else if (direction === 'right' && !(snake % width === width - 1)) {
      snake.forEach((bodyPart, index) => {
        cells[bodyPart].classList.remove('snake')
      })
      snake.unshift(snake[0] + 1)
      snake.pop()
      snake.forEach((bodyPart, index) => {
        cells[bodyPart].classList.add('snake')
      })
    }

    else if (direction === 'down'&& !(snake + width >= width ** 2)) {
      snake.forEach((bodyPart, index) => {
        cells[bodyPart].classList.remove('snake')
      })
      snake.unshift(snake[0] + width)
      snake.pop()
      snake.forEach((bodyPart, index) => {
        cells[bodyPart].classList.add('snake')
      })
    }
    snakeEatsFruit()
    gameOver()
}, gameSpeed)

}

// SNAKE EATS FRUIT FUNCTION // 
const audioPlayer = document.querySelector('audio')

function snakeEatsFruit () {
  if (cells[snake[0]] === cells[fruitPosition]) {
    cells[fruitPosition].classList.remove('fruit')
    audioPlayer.src= "./sounds/bite.mp3"
    audioPlayer.play()
    randomFruit()
    snakeGrows()
    updateIntervalSpeed()
    updateNumberEaten()
    }
  }
  
  function randomFruit() {
    fruitPosition = Math.floor(Math.random() * cells.length)
    if (fruitPosition === cells[snake]) {
      fruitPosition = Math.floor(Math.random() * cells.length)
    }
    else {
    cells[fruitPosition].classList.add('fruit')
    }
  } 

  function snakeGrows (){
    snake.push(snake[snake.length -1] - 1)
    snake.forEach((bodyPart, index) => {
    cells[bodyPart].classList.add('snake')
    })
  }

   function updateIntervalSpeed () {
    clearInterval(interval);
    gameSpeed -= 100
    startGame()
   }

   function updateNumberEaten () {
    numberOfFruit += 1 
    numberEaten.innerHTML = `${numberOfFruit}`
   }

// GAME OVER FUNCTION //
function gameOver () {
  let filteredArray = snake.filter((parts) => {
    if (parts === snake[0]) {
      return true
    }
  })

  if ((snake[0] + width >= width ** 2 && direction === 'down') || (snake[0] % width === 0 && direction === 'left')|| (snake[0] < width && direction === 'up') || (snake[0] % width === width - 1 && direction === 'right')) {
    clearInterval(interval)
    document.querySelector(".game-over").style.display = "block"
    audioPlayer.src= "./sounds/game-over.mp3"
    audioPlayer.play()

  }
  else if (filteredArray.length >= 2) {
    clearInterval(interval)
    document.querySelector(".game-over").style.display = "block"
    audioPlayer.src= "./sounds/game-over.mp3"
    audioPlayer.play()
  } 
}


