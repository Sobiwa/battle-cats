/* eslint-disable no-param-reassign */

import { createCats } from './cat';
import { addCatImg } from './catImg';

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
      cell.occupiedBy.hit(coord);
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
      if (cat.orientation === 'vertical') {
        array.push([x, y + i]);
      } else {
        array.push([x + i, y]);
      }
    }
    if (state.coordinatesAreInvalid(array)) return null;
    return array;
  },
});

const trackCatsAdded = (state) => ({
  catAdded: () => {
    state.catsAdded += 1;
  }
});

const currentCat = (state) => ({
  getCurrentCat: () => {
    if (state.catsAdded >= 5) return null;
    return state.cats[state.catsAdded];
  }
})

const cellAssessment = (state) => ({
  determineRealEstate: ({ length, orientation }) => {
    const limit = 11 - length;
    const array = [];
    let x = 10;
    let y = 10;
    if (orientation === 'vertical') {
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

function randomIndex(array) {
  return array[Math.floor(array.length * Math.random())];
}

const computerPlaceCats = (state) => ({
compPlaceCats: () => {
  state.cats.forEach((cat) => {
    cat.randomizeOrientation();
    const potentialPlacements = state.determineRealEstate(cat);
    const targetSpace = randomIndex(potentialPlacements);
    const arrayOfCoord = state.getCoordinates(
      targetSpace,
      cat
    );
    state.placeCat(arrayOfCoord, cat);
    const domSpot = document.querySelector(`[data-comp-coord='${targetSpace}'`);
    const catImg = addCatImg(cat);
    catImg.classList.add('hidden');
    domSpot.appendChild(catImg);
    cat.setDomElement(catImg);
  });
}
})

function createSpot(x, y) {
  return {
    coordinates: [x, y],
    occupiedBy: null,
    attacked: false,
  };
}

const winCheck = (state) => ({
  checkForWin: () => state.cats.every((cat) => cat.isSunk()),
});

function createGameBoard() {
  const gameBoard = {};
  gameBoard.board = {};
  gameBoard.cats = createCats();
  for (let y = 0; y < 10; y += 1) {
    for (let x = 0; x < 10; x += 1) {
      gameBoard.board[`[${x},${y}]`] = createSpot(x, y);
    }
  }
  return Object.assign(
    gameBoard,
    place(gameBoard),
    receiveAttack(gameBoard),
    coordInvalid(gameBoard),
    getCoord(gameBoard),
    winCheck(gameBoard),
  );
}

function createPlayerGameBoard() {
  const gameBoard = createGameBoard();
  gameBoard.comp = false;
  gameBoard.catsAdded = 0;
  return Object.assign(gameBoard, trackCatsAdded(gameBoard), currentCat(gameBoard));
}

function createCompGameBoard() {
  const gameBoard = createGameBoard();
  gameBoard.comp = true;
  return Object.assign(gameBoard, cellAssessment(gameBoard), computerPlaceCats(gameBoard));;
}

export { createPlayerGameBoard, createCompGameBoard, createGameBoard };
