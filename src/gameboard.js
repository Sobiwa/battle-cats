/* eslint-disable no-param-reassign */

import { createCats } from "./cat";

const place = (state) => ({
  placeCat: (coordinates, cat) => {
    coordinates.forEach((coordinate) => {
      state.board[`[${coordinate}]`].occupiedBy = cat;
    });
  },
});

const receiveAttack = (state) => ({
  takeAttack: (coord) => {
    if (state.board.coord.attacked) return;
    if (state.board[coord].occupiedBy) {
      state.board[coord].occupiedBy.hit();
    }
    state.board[coord].attacked = true;
  },
});

function createSpot(x, y) {
  return {
    coordinates: [x, y],
    occupiedBy: null,
    attacked: false,
  };
}

function createGameBoard() {
  const gameBoard = {};
  gameBoard.board = {};
  for (let x = 0; x < 10; x += 1) {
    for (let y = 0; y < 10; y += 1) {
      gameBoard.board[`[${x},${y}]`] = createSpot(x, y);
    }
  }
  return Object.assign(gameBoard, place(gameBoard), receiveAttack(gameBoard));
}

const playerBoard = createGameBoard();

function getCoordinates(coord, cat) {
  const array = [];
  const [x, y] = coord;
  for (let i = 0; i < cat.length; i += 1) {
    if (cat.orientation === "vertical") {
      array.push([x + i, y]);
    } else {
      array.push([x, y + i]);
    }
  }
  return array;
}

function coordinatesAreInvalid(array) {
  return (
    array.flat().some((item) => item < 0 || item > 9) ||
    array.some((item) => playerBoard.board[`[${item}]`].occupiedBy)
  );
}

const cats = createCats();

let catsPlaced = 0;
let currentCat;

function handleClick({ coordinates }) {
  if (catsPlaced === 5) return null;
  currentCat = cats[catsPlaced];
  const allCoord = getCoordinates(coordinates, currentCat);
  if (coordinatesAreInvalid(allCoord)) return null;
  playerBoard.placeCat(allCoord, currentCat);
  catsPlaced += 1;
  return currentCat;
}


export { createGameBoard, handleClick, playerBoard };
