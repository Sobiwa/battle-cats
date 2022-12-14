/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { createGameBoard } from "./gameboard";
import { createCats } from "./cat";
import { addCatImg } from './dom';

const playerBoard = createGameBoard();
const cats = createCats();

let catsPlaced = 0;
let currentCat;

function getCurrentCat() {
  return currentCat;
}

export { playerBoard, getCurrentCat };
