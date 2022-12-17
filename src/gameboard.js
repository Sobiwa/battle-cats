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
    const cell = state.board[`[${coord}]`];
    if (cell.attacked) return;
    if (cell.occupiedBy) {
      cell.occupiedBy.hit();
    }
    cell.attacked = true;
  },
});

const coordInvalid = (state) => ({
  coordinatesAreInvalid: (array) =>
    array.flat().some((item) => item < 0 || item > 9) ||
    array.some((item) => state.board[`[${item}]`].occupiedBy),
});

const getCoord = (state) => ({
  getCoordinates: (coord, cat) => {
    const array = [];
    const [x, y] = coord;
    for (let i = 0; i < cat.length; i += 1) {
      if (cat.orientation === "vertical") {
        array.push([x + i, y]);
      } else {
        array.push([x, y + i]);
      }
    }
    if (state.coordinatesAreInvalid(array)) return null;
    return array;
  },
});

const cellAssessment = (state) => ({
  determineRealEstate: ({ length, orientation }) => {
    const limit = 10 - length;
    const array = [];
    let x = 10;
    let y = 10;
    if (orientation === "vertical") {
      y = limit;
    } else {
      x = limit;
    }
    for (let h = 0; h < x; h++) {
      for (let v = 0; v < y; v++) {
        array.push([h, v]);
      }
    }
    const arrayMinusOverlap = array.filter((cell) =>
      state.getCoordinates(cell, { length, orientation })
    );
    return arrayMinusOverlap;
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
  return Object.assign(
    gameBoard,
    place(gameBoard),
    receiveAttack(gameBoard),
    coordInvalid(gameBoard),
    getCoord(gameBoard)
  );
}

function createCompGameBoard() {
  const gameBoard = createGameBoard();
  return Object.assign(gameBoard, cellAssessment(gameBoard));
}

const playerBoard = createGameBoard();

const compBoard = createCompGameBoard();

const playerCats = createCats();

let catsPlaced = 0;
let currentCat;

function getCurrentCat() {
  if (catsPlaced >= 5) return null;
  return playerCats[catsPlaced];
}

function handleClick(coordinates) {
  currentCat = getCurrentCat();
  playerBoard.placeCat(coordinates, currentCat);
  catsPlaced += 1;
}

export { createGameBoard, handleClick, playerBoard, compBoard, getCurrentCat };
