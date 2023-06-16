import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED, getSnakeHead,snakeIntersection
} from "./snake.js";
import { outsideGrid } from "./grid.js";
import { update as updateFood, draw as drawFood } from "./food.js";
let lastRenderTime = 0;
let gameOver=false
const gameBoard = document.getElementById("game-board");
function main(currentTime) {
    if(gameOver){
      if(confirm('you Lost, press "Ok" to Restart.')){
        window.location='/'
      }
      return
    }
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = currentTime;

  update();
  draw(gameBoard);
}
window.requestAnimationFrame(main);

export function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

export function draw(gameBoard) {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead())|| snakeIntersection();
}
