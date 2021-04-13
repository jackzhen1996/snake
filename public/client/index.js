import {renderSnake} from './components/snake.js';
import {renderFood} from './components/food.js';
var socket = io();
const height = 42;
const width = 42;
let currentX = 20;
let currentY = 5;

let currentX2 = 25;
let currentY2 = 36;

let allReady = false;

let p1moves = [];
let p1Score = 0;
let p1color = '#f3722c';

let ran = false;

let p2moves = [];
let p2Score = 0;
let p2color = '#00afb9';

// randomize food location after first attempt
let firstAttempt = true;

// if food detected, generate a random location for food
let gameOver = false;
// state for food

const gotFood =(p1,p2) => {
  const $food = $('.food');
  $food.removeClass('food');
  $food.css('background-color','');

  if (p1) {
    p1Score ++;
    if (p1Score >= 5) {
      // p1 won
      gameOver = true;
      // display p1 won message
      $('<span>   Wins! &#127881</span>').appendTo('#form1');
    }
  } else {
    p2Score ++;
    if (p2Score >= 5) {
      // p2 won
      gameOver = true;
      // display p2 won message
      $('<span>   Wins! &#127881</span>').appendTo('#form1');
    }
  }

  // randomize food location
  // broadcast food positions once eaten
  if (!ran) {
    // var [x,y] = generateRandom();
    ran = true;
  }
  ran = false;
  socket.emit('foodAndScore', {p1Score, p2Score});
  socket.on('foodAndScore', function(data){
    $('#container').data('x', data.x);
    $('#container').data('y', data.y);
    $('#p1Score').text(data.p1Score);
    $('#p2Score').text(data.p2Score);
  });
  const foodX = $('#container').data('x');
  const foodY =$('#container').data('y');

  renderFood(foodX,foodY);
}

const renderBoard = () => {
  const $grid= $('<div id="grid"></div>');
  // height for each row = 10px, insert 50 rows
  for (let i = 0; i < height; i++) {
    const $row = $(`<div class = "row" ></div>`);
    for (let j = 0; j < width; j++) {
      // row and column number as id
      const $cell = $(`<div class = "cell" id=${i}_${j} ></div>`);
      $cell.appendTo($row);
    }
    $row.appendTo($grid);
  }
  return $grid;
}

const traverse = (player) => {
  let direction1 = $('#p1').data('direction');
  let direction2 = $('#p2').data('direction');
    setTimeout(()=>{
      if (currentX === 41 || currentY === 41 || currentX === 0 || currentY === 0 ||
        currentX2 === 41 || currentY2 === 41 || currentX2 === 0 || currentY2 === 0) {
        gameOver = true;
        $('#scoreContainer').text('Game Over! Refresh To Restart');
        p1moves = [];
        p2moves = [];
      }

      // if (player === 'p1') {
        if (currentX < 49 && currentY < 49) {
          traverse();
        }

        if (direction1 === 'ArrowDown') {
          currentX ++;
        }
        if (direction1 === 'ArrowUp') {
          currentX --;
        }
        if (direction1 === 'ArrowLeft') {
          currentY --;
        }
        if (direction1 === 'ArrowRight'){
          currentY ++;
        }

        if (direction2 === 's') {
          currentX2 ++;
        }
        if (direction2 === 'w') {
          currentX2--;
        }
        if (direction2 === 'a') {
          currentY2 --;
        }
        if (direction2 === 'd'){
          currentY2 ++;
        }

        if (!gameOver) {
          p1moves.push({x:currentX,y:currentY});
          p2moves.push({x:currentX2,y:currentY2});
          renderSnake(currentX,currentY,p1color,(p1,p2)=>gotFood(p1,p2),'p1');
          renderSnake(currentX2,currentY2,p2color,(p1,p2)=>gotFood(p1,p2),'p2');
        }
    }, 100);

};

const cleanUp = () => {
  setTimeout(()=>{
    if (!gameOver) {
      cleanUp();
    }
    $(`#${p1moves[0].x}_${p1moves[0].y}`).css('background-color','');
    p1moves.splice(0,1);
    $(`#${p2moves[0].x}_${p2moves[0].y}`).css('background-color','');
    p2moves.splice(0,1);

  }, 120)
}

$('#container').append(renderBoard());
const startGame = () => {
  if (!gameOver) {
    const x = $('#container').data('x');
    const y = $('#container').data('y');
    renderFood(x,y);
    traverse();
    cleanUp();
  }
}

window.addEventListener('start', function(e){
  if (e.detail) {
    startGame();
  }
})

