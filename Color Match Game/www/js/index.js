var board = document.querySelector('#board')
var colors = document.querySelector('#colors')
var gameover = document.querySelector('#game-over')
var tally = document.querySelector('.moves')
var total = document.querySelector('.total')

var colorArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

var running = false

var cell = '-x'
var skill = 7
var moves = 0
var cap = 40
var color

var shuffle = function(collection) {
  for (var i = collection.length; i; i--) {
    var j = Math.floor(Math.random() * i);
    [collection[i - 1], collection[j]] = [collection[j], collection[i - 1]];
  }
  return collection
}

var setColors = function(collection, n) {
  console.log(collection)
  return n < 10 ? shuffle(collection).slice(0, n) : collection
}

var checkWin = function(moves) {
  let n = 0
  let msg = ''
  if (moves <= cap) {
    if (board.childNodes[99].className.indexOf(cell) > -1) {
      for (var i = 0; i < 100; i++) {
        if (board.childNodes[i].className.indexOf(cell) > -1) {
          n++
        }
      }
    }

    if (n === 100) {
      msg = '<span class="new-game">You Win!</span>'
      running = false
    } else if (n < 100 && moves >= cap) {
      msg = '<span class="new-game">Oops! Try Again...</span>'
      running = false
    }
  }
  if(!running) {
    gameover.innerHTML = msg
  }
}

var checkColor = function(color) {
  var tiles = board.childNodes
  for(var x = 0; x < 100; x++) {
    if(tiles[x].className.indexOf(cell) > -1) {
      tiles[x].className = color + cell
      if (x + 1 < 100 && tiles[x + 1].className === color) {
        tiles[x + 1].className += cell
      }
      if (x + 10 < 100 && tiles[x + 10].className === color) {
        tiles[x + 10].className += cell
      }
      if (x - 1 >= 0 && x % 10 > 0 && tiles[x - 1].className === color) {
        tiles[x - 1].className += cell
      }
      if (x - 10 >= 0 && x % 10 > 0 && tiles[x - 10].className === color) {
        tiles[x - 10].className += cell
      }
    }
  }
}

var builder = function(container, element, collection, count, randomize) {
  container.innerHTML = ''
  count = count || collection.length
  randomize = randomize || false
  for (var i = 0; i < count; i++) {
    var child = document.createElement(element)
    child.className = randomize ? collection[Math.floor((Math.random() * collection.length))] : collection[i]
    container.appendChild(child)
  }
}

var newGame = function() {
  var options = setColors(colorArray.slice(), skill)
  console.log(options)
  moves = 0
  tally.innerText = moves
  total.innerText = cap
  gameover.innerHTML = ''
  running = true
  builder(colors, 'chip', options)
  builder(board, 'tile', options, 100, true)
  color = board.childNodes[0].className
  board.className = ''
  board.childNodes[0].className = color + cell
  checkColor(color)
}

var play = function(chip) {
  if (running && color !== chip){
    color = chip
    if(board.className !== 'started') {
      board.className = 'started'
    }
    moves++
    tally.innerText = moves
    checkColor(chip)
    checkWin(moves)
  }
}

document.addEventListener("DOMContentLoaded", function() {
  newGame()
}, false)

document.addEventListener('click', function(event) {
  var css = Array.from(event.target.classList)
  console.log(event.target.tagName)
  if(event.target.tagName === 'CHIP') {
    play(event.target.className)
  }
  else if(css.includes('new-game')) {
    newGame()
  }
})