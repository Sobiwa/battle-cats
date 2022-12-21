/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bot.js":
/*!********************!*\
  !*** ./src/bot.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assessAdjacentCoordinates": () => (/* binding */ assessAdjacentCoordinates),
/* harmony export */   "compCats": () => (/* binding */ compCats),
/* harmony export */   "compFireShot": () => (/* binding */ compFireShot),
/* harmony export */   "compPlaceCats": () => (/* binding */ compPlaceCats)
/* harmony export */ });
/* harmony import */ var _cat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cat */ "./src/cat.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* eslint-disable no-plusplus */



function randomIndex(array) {
  return array[Math.floor(array.length * Math.random())];
}
const compCats = (0,_cat__WEBPACK_IMPORTED_MODULE_0__.createCats)();
function compPlaceCats() {
  compCats.forEach(cat => {
    cat.randomizeOrientation();
    const potentialPlacements = _gameboard__WEBPACK_IMPORTED_MODULE_1__.compBoard.determineRealEstate(cat);
    const targetSpace = randomIndex(potentialPlacements);
    const arrayOfCoord = _gameboard__WEBPACK_IMPORTED_MODULE_1__.compBoard.getCoordinates(targetSpace, cat);
    _gameboard__WEBPACK_IMPORTED_MODULE_1__.compBoard.placeCat(arrayOfCoord, cat);
    const domSpot = document.querySelector(`[data-comp-coord='${targetSpace}'`);
    const catImg = (0,_dom__WEBPACK_IMPORTED_MODULE_2__.addCatImg)(cat);
    catImg.classList.add('hidden');
    domSpot.appendChild(catImg);
    cat.setDomElement(catImg);
  });
}
function determineOrientation(array) {
  return array[0][0] === array[1][0] ? "y" : "x";
}
function assessAdjacentCoordinates(start, boardID, cat, axis, direction) {
  let allDir;
  const [x, y] = start;
  const up = () => assessAdjacentCoordinates([x, y - 1], boardID, cat, "y", -1);
  const right = () => assessAdjacentCoordinates([x + 1, y], boardID, cat, "x", 1);
  const down = () => assessAdjacentCoordinates([x, y + 1], boardID, cat, "y", 1);
  const left = () => assessAdjacentCoordinates([x - 1, y], boardID, cat, "x", -1);
  if (start.some(num => num > 9 || num < 0)) return null;
  const oppBoardCell = boardID.board[`[${start}]`];
  if (oppBoardCell.attacked && (!oppBoardCell.occupiedBy || oppBoardCell.occupiedBy !== cat)) {
    return null;
  }
  if (!oppBoardCell.attacked) return start;
  if (axis) {
    if (axis === "x") {
      if (direction) {
        return assessAdjacentCoordinates([x + 1 * direction, y], boardID, cat, axis, direction);
      }
      allDir = [left(), right()];
    } else if (axis === "y") {
      if (direction) {
        return assessAdjacentCoordinates([x, y + 1 * direction], boardID, cat, axis, direction);
      }
      allDir = [up(), down()];
    }
  } else {
    allDir = [up(), right(), down(), left()];
  }
  return allDir.filter(opt => opt !== null);
}
function compFireShot(opponentBoard, opponentCats) {
  const woundedTargets = [];
  let possibleHits;
  opponentCats.forEach(cat => {
    if (cat.hits > 0 && !cat.isSunk()) {
      woundedTargets.push(cat);
    }
  });
  if (woundedTargets.length) {
    const primaryTarget = woundedTargets[0];
    if (primaryTarget.coordHit.length > 1) {
      const orientation = determineOrientation(primaryTarget.coordHit);
      possibleHits = assessAdjacentCoordinates(primaryTarget.coordHit[0], opponentBoard, primaryTarget, orientation);
    } else {
      possibleHits = assessAdjacentCoordinates(primaryTarget.coordHit[0], opponentBoard, primaryTarget);
    }
  } else {
    possibleHits = [];
    Object.keys(opponentBoard.board).forEach(cell => {
      if (!opponentBoard.board[cell].attacked) {
        possibleHits.push(opponentBoard.board[cell].coordinates);
      }
    });
  }
  return possibleHits[Math.floor(possibleHits.length * Math.random())];
}


/***/ }),

/***/ "./src/cat.js":
/*!********************!*\
  !*** ./src/cat.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cat": () => (/* binding */ Cat),
/* harmony export */   "createCats": () => (/* binding */ createCats)
/* harmony export */ });
class Cat {
  constructor(length, type) {
    this.length = length;
    this.type = type;
    this.hits = 0;
    this.orientation = "vertical";
    this.coordHit = [];
  }
  hit(coord) {
    this.hits += 1;
    this.coordHit.push(coord);
  }
  isSunk() {
    return this.length === this.hits;
  }
  rotate() {
    this.orientation = this.orientation === "vertical" ? "horizontal" : "vertical";
  }
  randomizeOrientation() {
    this.orientation = Math.random() > 0.5 ? "vertical" : "horizontal";
  }
  setDomElement(target) {
    this.domElement = target;
  }
}
function createCats() {
  const cat1 = new Cat(5, "big stretch");
  const cat2 = new Cat(4, "downward cat");
  const cat3 = new Cat(3, "stuff strutter");
  const cat4 = new Cat(2, "quasi loaf");
  const cat5 = new Cat(2, "compact kitty");
  return [cat1, cat2, cat3, cat4, cat5];
}


/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addCatImg": () => (/* binding */ addCatImg),
/* harmony export */   "applyHitImage": () => (/* binding */ applyHitImage),
/* harmony export */   "createCompGameBoardDisplay": () => (/* binding */ createCompGameBoardDisplay),
/* harmony export */   "createPlayerGameBoardDisplay": () => (/* binding */ createPlayerGameBoardDisplay),
/* harmony export */   "endGameScreen": () => (/* binding */ endGameScreen)
/* harmony export */ });
/* harmony import */ var _img_big_stretch_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./img/big-stretch.svg */ "./src/img/big-stretch.svg");
/* harmony import */ var _img_cat2_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./img/cat2.svg */ "./src/img/cat2.svg");
/* harmony import */ var _img_walk_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/walk.svg */ "./src/img/walk.svg");
/* harmony import */ var _img_quasi_loaf2_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./img/quasi-loaf2.svg */ "./src/img/quasi-loaf2.svg");
/* harmony import */ var _img_lesRoll_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./img/lesRoll.svg */ "./src/img/lesRoll.svg");
/* harmony import */ var _img_format_rotate_90_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./img/format-rotate-90.svg */ "./src/img/format-rotate-90.svg");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* eslint-disable default-case */
/* eslint-disable no-restricted-syntax */








const playerBoardContainer = document.querySelector(".player-board-container");
const playerBoardDisplay = document.querySelector(".player-board");
const compBoardContainer = document.querySelector(".comp-board-container");
const compBoardDisplay = document.querySelector(".comp-board");
const catTrackerContainer = document.querySelector(".cat-tracker-container");
function createCatTracker() {
  const catTrackerDiv = document.createElement("div");
  catTrackerDiv.classList.add("cat-tracker");
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 5; x++) {
      const cell = document.createElement("div");
      const id = `${x}-${y}`;
      cell.dataset.cell = id;
      catTrackerDiv.appendChild(cell);
    }
  }
  return catTrackerDiv;
}
function createCatImage(source) {
  const catImg = new Image();
  catImg.src = source;
  return catImg;
}
function appendCatImages() {
  const first = document.querySelector(`[data-cell='0-0']`);
  const second = document.querySelector('[data-cell="0-1"]');
  const third = document.querySelector('[data-cell="0-2"]');
  const fourth = document.querySelector('[data-cell="0-3"]');
  const fifth = document.querySelector('[data-cell="2-3"]');
  first.append(createCatImage(_img_big_stretch_svg__WEBPACK_IMPORTED_MODULE_0__));
  first.classList.add("cat-tracker-first");
  second.append(createCatImage(_img_cat2_svg__WEBPACK_IMPORTED_MODULE_1__));
  second.classList.add("cat-tracker-second");
  third.append(createCatImage(_img_walk_svg__WEBPACK_IMPORTED_MODULE_2__));
  third.classList.add("cat-tracker-third");
  fourth.append(createCatImage(_img_quasi_loaf2_svg__WEBPACK_IMPORTED_MODULE_3__));
  fourth.classList.add("cat-tracker-fourth");
  fifth.append(createCatImage(_img_lesRoll_svg__WEBPACK_IMPORTED_MODULE_4__));
  fifth.classList.add("cat-tracker-fifth");
}
const catTracker = createCatTracker();
catTrackerContainer.append(catTracker);
appendCatImages();
function rotateCat() {
  const currentCat = (0,_gameboard__WEBPACK_IMPORTED_MODULE_6__.getCurrentCat)();
  if (!currentCat) return;
  currentCat.rotate();
  playerBoardDisplay.classList.toggle("horizontal");
}
window.addEventListener("keydown", e => {
  if (e.key === "Shift") {
    rotateCat();
  }
});
const rotateButton = document.createElement("button");
const rotateImg = new Image();
rotateImg.src = _img_format_rotate_90_svg__WEBPACK_IMPORTED_MODULE_5__;
rotateButton.classList.add("rotate-button");
rotateButton.appendChild(rotateImg);
rotateButton.addEventListener("click", () => {
  rotateCat();
});
playerBoardContainer.appendChild(rotateButton);
function addCatImg(currentCat, hidden) {
  const catImg = new Image();
  catImg.classList.add("cat-img");
  switch (currentCat.type) {
    case "big stretch":
      catImg.src = _img_big_stretch_svg__WEBPACK_IMPORTED_MODULE_0__;
      catImg.classList.add("cat1");
      playerBoardDisplay.className = "player-board cat-two";
      break;
    case "downward cat":
      catImg.src = _img_cat2_svg__WEBPACK_IMPORTED_MODULE_1__;
      catImg.classList.add("cat2");
      playerBoardDisplay.className = "player-board cat-three";
      break;
    case "stuff strutter":
      catImg.src = _img_walk_svg__WEBPACK_IMPORTED_MODULE_2__;
      catImg.classList.add("cat3");
      playerBoardDisplay.className = "player-board cat-four";
      break;
    case "quasi loaf":
      catImg.src = _img_quasi_loaf2_svg__WEBPACK_IMPORTED_MODULE_3__;
      catImg.classList.add("cat4");
      playerBoardDisplay.className = "player-board cat-five";
      break;
    case "compact kitty":
      catImg.src = _img_lesRoll_svg__WEBPACK_IMPORTED_MODULE_4__;
      catImg.classList.add("cat5");
      playerBoardDisplay.className = "player-board";
  }
  if (currentCat.orientation === "horizontal") {
    catImg.classList.add("horizontal-cat");
  }
  return catImg;
}
function updateCatTracker(cat) {
  let y;
  let x = 0;
  switch (cat.type) {
    case "big stretch":
      y = 0;
      break;
    case "downward cat":
      y = 1;
      break;
    case "stuff strutter":
      y = 2;
      break;
    case "quasi loaf":
      y = 3;
      break;
    case "compact kitty":
      y = 3;
      x = 2;
      break;
  }
  const coord = `${x + cat.hits - 1}-${y}`;
  const domTarget = document.querySelector(`[data-cell='${coord}']`);
  domTarget.classList.add("cat-tracker-hit");
}
function applyHitImage(target, boardID, coord) {
  target.classList.add("attacked");
  if (boardID.board[`[${coord}]`].occupiedBy) {
    target.classList.add("occupied");
    if (boardID === _gameboard__WEBPACK_IMPORTED_MODULE_6__.compBoard) {
      updateCatTracker(boardID.board[`[${coord}]`].occupiedBy);
    }
  }
}
function endGameScreen(message) {
  const screen = document.createElement("div");
  screen.classList.add("end-game");
  const endMessage = document.createElement("div");
  endMessage.classList.add("end-message");
  endMessage.textContent = message;
  const playAgainButton = document.createElement("button");
  playAgainButton.classList.add("play-again-button");
  playAgainButton.textContent = "play again";
  screen.append(endMessage, playAgainButton);
  document.body.appendChild(screen);
}
function createCompGameBoardDisplay() {
  for (const coord of Object.values(_gameboard__WEBPACK_IMPORTED_MODULE_6__.compBoard.board)) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    cell.dataset.compCoord = coord.coordinates;
    cell.addEventListener("click", () => {
      if (!coord.attacked) {
        _gameboard__WEBPACK_IMPORTED_MODULE_6__.compBoard.takeAttack(coord.coordinates);
        applyHitImage(cell, _gameboard__WEBPACK_IMPORTED_MODULE_6__.compBoard, coord.coordinates);
        if (coord.occupiedBy) {
          if (coord.occupiedBy.isSunk()) {
            coord.occupiedBy.domElement.classList.remove('hidden');
            if ((0,_game__WEBPACK_IMPORTED_MODULE_7__.checkForWin)() === "player wins") {
              endGameScreen("player wins");
              return;
            }
          }
        }
        (0,_game__WEBPACK_IMPORTED_MODULE_7__.compRetaliation)();
      }
    });
    compBoardDisplay.appendChild(cell);
  }
}
function shrinkSize() {
  const originalSize = compBoardDisplay.offsetWidth;
  const windowWidth = window.innerWidth;
  return (windowWidth - originalSize) / 2.3 / originalSize;
}
window.addEventListener("resize", () => {
  document.documentElement.style.setProperty("--shrink-scale", `min(1, ${shrinkSize()})`);
});
function createPlayerGameBoardDisplay() {
  for (const coord of Object.values(_gameboard__WEBPACK_IMPORTED_MODULE_6__.playerBoard.board)) {
    const spot = document.createElement("div");
    spot.classList.add("grid-cell");
    spot.dataset.coord = coord.coordinates;
    spot.addEventListener("click", () => {
      const currentCat = (0,_gameboard__WEBPACK_IMPORTED_MODULE_6__.getCurrentCat)();
      if (currentCat === null) return;
      const coordArray = _gameboard__WEBPACK_IMPORTED_MODULE_6__.playerBoard.getCoordinates(coord.coordinates, currentCat);
      if (coordArray) {
        (0,_gameboard__WEBPACK_IMPORTED_MODULE_6__.handleClick)(coordArray);
        spot.appendChild(addCatImg(currentCat));
        if (currentCat.type === "compact kitty") {
          playerBoardContainer.removeChild(rotateButton);
          playerBoardContainer.classList.add("shrink");
          compBoardContainer.style.display = "flex";
          createCompGameBoardDisplay();
          document.documentElement.style.setProperty("--shrink-scale", `min(1, ${shrinkSize()})`);
          catTrackerContainer.style.visibility = "visible";
          (0,_game__WEBPACK_IMPORTED_MODULE_7__.beginGame)();
        }
      }
    });
    playerBoardDisplay.appendChild(spot);
  }
}


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "beginGame": () => (/* binding */ beginGame),
/* harmony export */   "checkForWin": () => (/* binding */ checkForWin),
/* harmony export */   "compRetaliation": () => (/* binding */ compRetaliation)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _bot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bot */ "./src/bot.js");
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");



function beginGame() {
  (0,_bot__WEBPACK_IMPORTED_MODULE_1__.compPlaceCats)();
}
function checkForWin() {
  if (_bot__WEBPACK_IMPORTED_MODULE_1__.compCats.every(cat => cat.isSunk())) {
    return 'player wins';
  }
  if (_gameboard_js__WEBPACK_IMPORTED_MODULE_2__.playerCats.every(cat => cat.isSunk())) {
    return 'computer wins';
  }
  return false;
}
function compRetaliation() {
  const target = (0,_bot__WEBPACK_IMPORTED_MODULE_1__.compFireShot)(_gameboard_js__WEBPACK_IMPORTED_MODULE_2__.playerBoard, _gameboard_js__WEBPACK_IMPORTED_MODULE_2__.playerCats);
  _gameboard_js__WEBPACK_IMPORTED_MODULE_2__.playerBoard.takeAttack(target);
  const dataID = `[data-coord='${target}']`;
  const domCell = document.querySelector(dataID);
  (0,_dom__WEBPACK_IMPORTED_MODULE_0__.applyHitImage)(domCell, _gameboard_js__WEBPACK_IMPORTED_MODULE_2__.playerBoard, target);
  if (checkForWin() === 'computer wins') {
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.endGameScreen)('Computer wins');
  }
  ;
}


/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compBoard": () => (/* binding */ compBoard),
/* harmony export */   "createGameBoard": () => (/* binding */ createGameBoard),
/* harmony export */   "getCurrentCat": () => (/* binding */ getCurrentCat),
/* harmony export */   "handleClick": () => (/* binding */ handleClick),
/* harmony export */   "playerBoard": () => (/* binding */ playerBoard),
/* harmony export */   "playerCats": () => (/* binding */ playerCats)
/* harmony export */ });
/* harmony import */ var _cat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cat */ "./src/cat.js");
/* eslint-disable no-param-reassign */


const place = state => ({
  placeCat: (coordinates, cat) => {
    coordinates.forEach(coordinate => {
      state.board[`[${coordinate}]`].occupiedBy = cat;
    });
  }
});
const receiveAttack = state => ({
  takeAttack: coord => {
    const cell = state.board[`[${coord}]`];
    if (cell.attacked) return;
    if (cell.occupiedBy) {
      cell.occupiedBy.hit(coord);
    }
    cell.attacked = true;
  }
});
const coordInvalid = state => ({
  coordinatesAreInvalid: array => array.flat().some(item => item < 0 || item > 9) || array.some(item => state.board[`[${item}]`].occupiedBy)
});
const getCoord = state => ({
  getCoordinates: (coord, cat) => {
    const array = [];
    const [x, y] = coord;
    for (let i = 0; i < cat.length; i += 1) {
      if (cat.orientation === "vertical") {
        array.push([x, y + i]);
      } else {
        array.push([x + i, y]);
      }
    }
    if (state.coordinatesAreInvalid(array)) return null;
    return array;
  }
});
const cellAssessment = state => ({
  determineRealEstate: _ref => {
    let {
      length,
      orientation
    } = _ref;
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
    const arrayMinusOverlap = array.filter(cell => state.getCoordinates(cell, {
      length,
      orientation
    }));
    return arrayMinusOverlap;
  }
});
function createSpot(x, y) {
  return {
    coordinates: [x, y],
    occupiedBy: null,
    attacked: false
  };
}
function createGameBoard() {
  const gameBoard = {};
  gameBoard.board = {};
  for (let y = 0; y < 10; y += 1) {
    for (let x = 0; x < 10; x += 1) {
      gameBoard.board[`[${x},${y}]`] = createSpot(x, y);
    }
  }
  return Object.assign(gameBoard, place(gameBoard), receiveAttack(gameBoard), coordInvalid(gameBoard), getCoord(gameBoard));
}
function createCompGameBoard() {
  const gameBoard = createGameBoard();
  return Object.assign(gameBoard, cellAssessment(gameBoard));
}
const playerBoard = createGameBoard();
const compBoard = createCompGameBoard();
const playerCats = (0,_cat__WEBPACK_IMPORTED_MODULE_0__.createCats)();
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


/***/ }),

/***/ "./src/init.js":
/*!*********************!*\
  !*** ./src/init.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");

function init() {
  (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createPlayerGameBoardDisplay)();
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./font/comfortaa-variablefont_wght-webfont.woff2 */ "./src/font/comfortaa-variablefont_wght-webfont.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./font/comfortaa-variablefont_wght-webfont.woff */ "./src/font/comfortaa-variablefont_wght-webfont.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./img/grrass.jpeg */ "./src/img/grrass.jpeg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./img/pexels-pixmike-413195.jpg */ "./src/img/pexels-pixmike-413195.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"comfy\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"woff2\"),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"woff\");\n  font-weight: 600;\n  font-style: normal;\n}\n\n:root {\n  --background: #282a36;\n  --board-size: min(60vw, 500px);\n  --cell-size: calc(var(--board-size) / 10);\n  --logo-ball-size: 75px;\n  --shrink-scale: 1;\n  --margin: calc((100vw - var(--board-size)) / 2);\n  --shrunk-board: calc(var(--board-size) * var(--shrink-scale));\n  /* --cat-tracker-size: calc(var(--board-size) * 0.4); */\n  --cat-tracker-padding: 10px;\n  --cat-tracker-width: calc(min((calc(var(--margin) * 0.95)), 200px) - (var(--cat-tracker-padding) * 2));\n  --cat-tracker-height: calc(var(var(--cat-tracker-width) * (4 / 5)));\n  --cat-tracker-cell: calc(var(--cat-tracker-width) / 5);\n  --margin-top: calc(((100vh - 100px) - var(--board-size)) * 0.5);\n}\n\nbody {\n  font-family: comfy, Verdana, Geneva, Tahoma, sans-serif;\n  position: relative;\n  display: grid;\n  grid-template: 100px 1fr / 1fr 1fr 1fr;\n  align-items: center;\n  /* justify-items: center; */\n  margin: 0;\n  padding: 0;\n  position: relative;\n  color: whitesmoke;\n  height: 100vh;\n  width: 100vw;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  background-repeat: repeat;\n  background-size: 400px;\n  text-align: center;\n}\n\n.title {\n  grid-area: 1 / 1 / 2 / -1;\n  width: min-content;\n  height: var(--logo-ball-size);\n  margin: auto;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n}\n\n.title .ball:nth-child(4) {\n  grid-area: 1 / 1 / 2 / 2;\n  margin-left: 0;\n}\n\n.title .ball:nth-child(3) {\n  grid-area: 1 / 2 / 2 / 3;\n}\n\n.title .ball:nth-child(2) {\n  grid-area: 1 / 3 / 2 / 4;\n}\n\n.title .ball:nth-child(1) {\n  grid-area: 1 / 4 / 2 / 5;\n}\n\n.ball {\n  box-shadow: 1px 1px 8px rgb(255, 140, 0);\n  margin-left: calc(var(--logo-ball-size) * -0.5);\n  content: \"\";\n  height: var(--logo-ball-size);\n  width: var(--logo-ball-size);\n  border-radius: 50%;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n}\n\n.words {\n  grid-area: 1 / 1 / 2 / -1;\n}\nh1 {\n  font-size: 2rem;\n}\n\n.player-board-container {\n  grid-area: 2 / 2 / 3 / 3;\n  transition: 0.3s;\n  margin: auto;\n  width: min-content;\n  height: min-content;\n  transform-origin: 0 0;\n  z-index: 3;\n}\n\n.player-board,\n.comp-board {\n  /* box-sizing: border-box; */\n  width: var(--board-size);\n  height: var(--board-size);\n  display: grid;\n  grid-template: repeat(10, auto) / repeat(10, auto);\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n  background-repeat: repeat;\n  background-size: var(--cell-size) var(--cell-size);\n}\n\n.grid-cell {\n  z-index: 0;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.164);\n  width: var(--cell-size);\n  height: var(--cell-size);\n  position: relative;\n}\n\n.player-board {\n  overflow: hidden;\n}\n\n.comp-board .grid-cell:hover {\n  box-shadow: inset 0px 0px 50px rgb(255, 123, 0);\n  cursor: pointer;\n}\n\n.comp-board .grid-cell:active {\n  box-shadow: inset 0px 0px 50px 10px rgb(255, 123, 0);\n}\n\n.player-board .grid-cell:hover::after {\n  position: absolute;\n  left: 0;\n  content: \"\";\n  background-color: rgba(0, 0, 0, 0.462);\n  border-radius: 5px;\n}\n\n.player-board.cat-one .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 5);\n}\n\n.player-board.horizontal.cat-one .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 5);\n}\n\n.player-board.cat-two .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 4);\n}\n\n.player-board.horizontal.cat-two .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 4);\n}\n\n.player-board.cat-three .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 3);\n}\n\n.player-board.horizontal.cat-three .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 3);\n}\n\n.player-board.cat-four .grid-cell:hover::after,\n.player-board.cat-five .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 2);\n}\n\n.player-board.horizontal.cat-four .grid-cell:hover::after,\n.player-board.horizontal.cat-five .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 2);\n}\n\n.player-board-container.shrink {\n  scale: var(--shrink-scale);\n  translate: calc((var(--margin) + var(--shrunk-board)) * -0.5);\n}\n\n.player-board-container.shrink:hover {\n  scale: 0.75;\n  border: 2px solid black;\n}\n\n.cat-img {\n  transition: 0.3s;\n  position: absolute;\n  top: 3px;\n  rotate: -90deg;\n  width: var(--cell-size);\n  pointer-events: none;\n}\n\n.cat1 {\n  right: -10px;\n  height: calc(var(--cell-size) * 5);\n  transform: scale(5.5, 4);\n}\n\n.cat1.horizontal-cat {\n  top: 5px;\n  width: calc(var(--cell-size) * 5);\n  transform: scale(3.8, 2.7);\n}\n\n.cat2 {\n  top: 5px;\n  left: -5px;\n  height: calc(var(--cell-size) * 4);\n  transform: scale(4.3, 2.5);\n}\n\n.cat2.horizontal-cat {\n  top: -3px;\n  width: calc(var(--cell-size) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat3 {\n  left: 0;\n  height: calc(var(--cell-size) * 3);\n  transform: scale(3.5, 2.5);\n}\n\n.cat3.horizontal-cat {\n  width: calc(var(--cell-size) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat4 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 2);\n}\n\n.cat4.horizontal-cat {\n  width: calc(var(--cell-size) * 2);\n  transform: scale(1.5);\n}\n\n.cat5 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 1.5);\n}\n\n.cat5.horizontal-cat {\n  width: calc((var(--cell-size) * 2));\n  transform: scale(1.5, 1.1);\n}\n\n.horizontal-cat {\n  top: 0px;\n  left: 0px;\n  height: var(--cell-size);\n  rotate: 0deg;\n}\n\n.grid-cell.attacked {\n  box-shadow: inset 0px 0px 15px orange;\n}\n\n.grid-cell.attacked::before {\n  z-index: 1;\n  position: absolute;\n  content: \"\";\n  width: calc(var(--cell-size) / 3);\n  height: calc(var(--cell-size) / 3);\n  background-color: rgba(255, 166, 0, 0.698);\n  border-radius: 50%;\n  inset: 0;\n  margin: auto;\n}\n\n.grid-cell.attacked.occupied::before {\n  width: calc(var(--cell-size) / 1.5);\n  height: calc(var(--cell-size) / 1.5);\n  background-color: orange;\n}\n\n.rotate-button {\n  appearance: none;\n  border: none;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  cursor: pointer;\n}\n\n.comp-board-container {\n  overflow: hidden;\n  grid-area: 2 / 2 / 3 / 3;\n  width: min-content;\n  height: min-content;\n  display: none;\n  inset: 0;\n  margin: auto;\n}\n\n.hidden {\n  opacity: 0;\n}\n\n.cat-tracker-container {\n  width: min-content;\n  background-color: rgba(255, 255, 255, 0.405);\n  padding: var(--cat-tracker-padding);\n  border-radius: 20px;\n  overflow: hidden;\n  align-self: flex-start;\n  margin: var(--margin-top) 10px;\n  grid-area: 2 / 3 / 3 / 4;\n  visibility: hidden;\n}\n\n.cat-tracker {\n  display: grid;\n  grid-template: repeat(4, auto) / repeat(5, auto);\n  width: var(--cat-tracker-width);\n  height: var(--cat-tracker-height);\n  align-items: center;\n  justify-items: flex-start;\n}\n\n.cat-tracker div {\n  position: relative;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.5);\n  height: var(--cat-tracker-cell);\n  width: var(--cat-tracker-cell);\n}\n\n.cat-tracker div::after {\n  position: absolute;\n  content: '';\n  background-color: orange;\n  width: 40%;\n  height: 40%;\n  border-radius: 50%;\n  z-index: 3;\n  inset: 0;\n  margin: auto;\n  opacity: 0;\n  transition: 0.5s;\n}\n\n.cat-tracker div.cat-tracker-hit::after {\n  opacity: 1;\n}\n\n.cat-tracker div img {\n  height: var(--cat-tracker-cell);\n}\n\n.cat-tracker-first img {\n  width: calc(var(--cat-tracker-cell) * 5);\n  transform: scale(3.4, 2.7);\n}\n\n.cat-tracker-second img {\n  width: calc(var(--cat-tracker-cell) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat-tracker-third img {\n  width: calc(var(--cat-tracker-cell) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat-tracker-fourth img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5);\n}\n\n.cat-tracker-fifth img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5, 1.1);\n}\n\n.end-game {\n  z-index: 3;\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  background-color: #282a36ce;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: 2rem;\n}\n\n@media only screen and (max-width: 900px) {\n}\n\n@media only screen and (max-width: 850px) {\n  :root {\n    --scale-size: 0.4;\n    --board-size: min(60vh, 90vw);\n    --logo-ball-size: 50px;\n    --second-row: calc((95vh - 50px) * (1 / (1.3 + 1)));\n    --third-row: calc((95vh - 50px) * (1.3 / (1.3 + 1)));\n    --mini-board-size: calc(var(--board-size) * var(--scale-size));\n    --cat-tracker-width: calc(var(--board-size) * 0.4);\n  }\n\n  body {\n    display: grid;\n    grid-template: 5vh 1fr 1.3fr 50px/ 50vw 50vw;\n    align-items: center;\n    justify-items: center;\n  }\n\n  .title {\n    grid-area: 1 / 1 / 2 / 3;\n    margin-top: 0;\n  }\n\n  h1 {\n    font-size: 1rem;\n  }\n\n  .player-board-container {\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .player-board-container.shrink {\n    scale: var(--scale-size);\n    translate: 0px\n      calc(\n        (\n            var(--third-row) - var(--board-size) + var(--second-row) +\n              var(--mini-board-size)\n          ) * -0.5\n      );\n    justify-self: center;\n  }\n\n  .player-board-container.shrink:hover {\n    scale: 0.75;\n  }\n\n  .comp-board-container {\n    margin-top: auto;\n    display: none;\n    position: relative;\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .cat-tracker-container {\n    margin: auto;\n    grid-area: 2 / 2 / 3 / 3;\n  }\n}\n\n@media only screen and (max-width: 450px) {\n  :root {\n    --scale-size: 0.5;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n  font-family: \"comfy\";\n  src: url(\"./font/comfortaa-variablefont_wght-webfont.woff2\") format(\"woff2\"),\n    url(\"./font/comfortaa-variablefont_wght-webfont.woff\") format(\"woff\");\n  font-weight: 600;\n  font-style: normal;\n}\n\n:root {\n  --background: #282a36;\n  --board-size: min(60vw, 500px);\n  --cell-size: calc(var(--board-size) / 10);\n  --logo-ball-size: 75px;\n  --shrink-scale: 1;\n  --margin: calc((100vw - var(--board-size)) / 2);\n  --shrunk-board: calc(var(--board-size) * var(--shrink-scale));\n  /* --cat-tracker-size: calc(var(--board-size) * 0.4); */\n  --cat-tracker-padding: 10px;\n  --cat-tracker-width: calc(min((calc(var(--margin) * 0.95)), 200px) - (var(--cat-tracker-padding) * 2));\n  --cat-tracker-height: calc(var(var(--cat-tracker-width) * (4 / 5)));\n  --cat-tracker-cell: calc(var(--cat-tracker-width) / 5);\n  --margin-top: calc(((100vh - 100px) - var(--board-size)) * 0.5);\n}\n\nbody {\n  font-family: comfy, Verdana, Geneva, Tahoma, sans-serif;\n  position: relative;\n  display: grid;\n  grid-template: 100px 1fr / 1fr 1fr 1fr;\n  align-items: center;\n  /* justify-items: center; */\n  margin: 0;\n  padding: 0;\n  position: relative;\n  color: whitesmoke;\n  height: 100vh;\n  width: 100vw;\n  background: url(\"./img/grrass.jpeg\");\n  background-repeat: repeat;\n  background-size: 400px;\n  text-align: center;\n}\n\n.title {\n  grid-area: 1 / 1 / 2 / -1;\n  width: min-content;\n  height: var(--logo-ball-size);\n  margin: auto;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n}\n\n.title .ball:nth-child(4) {\n  grid-area: 1 / 1 / 2 / 2;\n  margin-left: 0;\n}\n\n.title .ball:nth-child(3) {\n  grid-area: 1 / 2 / 2 / 3;\n}\n\n.title .ball:nth-child(2) {\n  grid-area: 1 / 3 / 2 / 4;\n}\n\n.title .ball:nth-child(1) {\n  grid-area: 1 / 4 / 2 / 5;\n}\n\n.ball {\n  box-shadow: 1px 1px 8px rgb(255, 140, 0);\n  margin-left: calc(var(--logo-ball-size) * -0.5);\n  content: \"\";\n  height: var(--logo-ball-size);\n  width: var(--logo-ball-size);\n  border-radius: 50%;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n}\n\n.words {\n  grid-area: 1 / 1 / 2 / -1;\n}\nh1 {\n  font-size: 2rem;\n}\n\n.player-board-container {\n  grid-area: 2 / 2 / 3 / 3;\n  transition: 0.3s;\n  margin: auto;\n  width: min-content;\n  height: min-content;\n  transform-origin: 0 0;\n  z-index: 3;\n}\n\n.player-board,\n.comp-board {\n  /* box-sizing: border-box; */\n  width: var(--board-size);\n  height: var(--board-size);\n  display: grid;\n  grid-template: repeat(10, auto) / repeat(10, auto);\n  background: url(\"./img/pexels-pixmike-413195.jpg\");\n  background-repeat: repeat;\n  background-size: var(--cell-size) var(--cell-size);\n}\n\n.grid-cell {\n  z-index: 0;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.164);\n  width: var(--cell-size);\n  height: var(--cell-size);\n  position: relative;\n}\n\n.player-board {\n  overflow: hidden;\n}\n\n.comp-board .grid-cell:hover {\n  box-shadow: inset 0px 0px 50px rgb(255, 123, 0);\n  cursor: pointer;\n}\n\n.comp-board .grid-cell:active {\n  box-shadow: inset 0px 0px 50px 10px rgb(255, 123, 0);\n}\n\n.player-board .grid-cell:hover::after {\n  position: absolute;\n  left: 0;\n  content: \"\";\n  background-color: rgba(0, 0, 0, 0.462);\n  border-radius: 5px;\n}\n\n.player-board.cat-one .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 5);\n}\n\n.player-board.horizontal.cat-one .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 5);\n}\n\n.player-board.cat-two .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 4);\n}\n\n.player-board.horizontal.cat-two .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 4);\n}\n\n.player-board.cat-three .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 3);\n}\n\n.player-board.horizontal.cat-three .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 3);\n}\n\n.player-board.cat-four .grid-cell:hover::after,\n.player-board.cat-five .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 2);\n}\n\n.player-board.horizontal.cat-four .grid-cell:hover::after,\n.player-board.horizontal.cat-five .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 2);\n}\n\n.player-board-container.shrink {\n  scale: var(--shrink-scale);\n  translate: calc((var(--margin) + var(--shrunk-board)) * -0.5);\n}\n\n.player-board-container.shrink:hover {\n  scale: 0.75;\n  border: 2px solid black;\n}\n\n.cat-img {\n  transition: 0.3s;\n  position: absolute;\n  top: 3px;\n  rotate: -90deg;\n  width: var(--cell-size);\n  pointer-events: none;\n}\n\n.cat1 {\n  right: -10px;\n  height: calc(var(--cell-size) * 5);\n  transform: scale(5.5, 4);\n}\n\n.cat1.horizontal-cat {\n  top: 5px;\n  width: calc(var(--cell-size) * 5);\n  transform: scale(3.8, 2.7);\n}\n\n.cat2 {\n  top: 5px;\n  left: -5px;\n  height: calc(var(--cell-size) * 4);\n  transform: scale(4.3, 2.5);\n}\n\n.cat2.horizontal-cat {\n  top: -3px;\n  width: calc(var(--cell-size) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat3 {\n  left: 0;\n  height: calc(var(--cell-size) * 3);\n  transform: scale(3.5, 2.5);\n}\n\n.cat3.horizontal-cat {\n  width: calc(var(--cell-size) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat4 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 2);\n}\n\n.cat4.horizontal-cat {\n  width: calc(var(--cell-size) * 2);\n  transform: scale(1.5);\n}\n\n.cat5 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 1.5);\n}\n\n.cat5.horizontal-cat {\n  width: calc((var(--cell-size) * 2));\n  transform: scale(1.5, 1.1);\n}\n\n.horizontal-cat {\n  top: 0px;\n  left: 0px;\n  height: var(--cell-size);\n  rotate: 0deg;\n}\n\n.grid-cell.attacked {\n  box-shadow: inset 0px 0px 15px orange;\n}\n\n.grid-cell.attacked::before {\n  z-index: 1;\n  position: absolute;\n  content: \"\";\n  width: calc(var(--cell-size) / 3);\n  height: calc(var(--cell-size) / 3);\n  background-color: rgba(255, 166, 0, 0.698);\n  border-radius: 50%;\n  inset: 0;\n  margin: auto;\n}\n\n.grid-cell.attacked.occupied::before {\n  width: calc(var(--cell-size) / 1.5);\n  height: calc(var(--cell-size) / 1.5);\n  background-color: orange;\n}\n\n.rotate-button {\n  appearance: none;\n  border: none;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  cursor: pointer;\n}\n\n.comp-board-container {\n  overflow: hidden;\n  grid-area: 2 / 2 / 3 / 3;\n  width: min-content;\n  height: min-content;\n  display: none;\n  inset: 0;\n  margin: auto;\n}\n\n.hidden {\n  opacity: 0;\n}\n\n.cat-tracker-container {\n  width: min-content;\n  background-color: rgba(255, 255, 255, 0.405);\n  padding: var(--cat-tracker-padding);\n  border-radius: 20px;\n  overflow: hidden;\n  align-self: flex-start;\n  margin: var(--margin-top) 10px;\n  grid-area: 2 / 3 / 3 / 4;\n  visibility: hidden;\n}\n\n.cat-tracker {\n  display: grid;\n  grid-template: repeat(4, auto) / repeat(5, auto);\n  width: var(--cat-tracker-width);\n  height: var(--cat-tracker-height);\n  align-items: center;\n  justify-items: flex-start;\n}\n\n.cat-tracker div {\n  position: relative;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.5);\n  height: var(--cat-tracker-cell);\n  width: var(--cat-tracker-cell);\n}\n\n.cat-tracker div::after {\n  position: absolute;\n  content: '';\n  background-color: orange;\n  width: 40%;\n  height: 40%;\n  border-radius: 50%;\n  z-index: 3;\n  inset: 0;\n  margin: auto;\n  opacity: 0;\n  transition: 0.5s;\n}\n\n.cat-tracker div.cat-tracker-hit::after {\n  opacity: 1;\n}\n\n.cat-tracker div img {\n  height: var(--cat-tracker-cell);\n}\n\n.cat-tracker-first img {\n  width: calc(var(--cat-tracker-cell) * 5);\n  transform: scale(3.4, 2.7);\n}\n\n.cat-tracker-second img {\n  width: calc(var(--cat-tracker-cell) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat-tracker-third img {\n  width: calc(var(--cat-tracker-cell) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat-tracker-fourth img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5);\n}\n\n.cat-tracker-fifth img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5, 1.1);\n}\n\n.end-game {\n  z-index: 3;\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  background-color: #282a36ce;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: 2rem;\n}\n\n@media only screen and (max-width: 900px) {\n}\n\n@media only screen and (max-width: 850px) {\n  :root {\n    --scale-size: 0.4;\n    --board-size: min(60vh, 90vw);\n    --logo-ball-size: 50px;\n    --second-row: calc((95vh - 50px) * (1 / (1.3 + 1)));\n    --third-row: calc((95vh - 50px) * (1.3 / (1.3 + 1)));\n    --mini-board-size: calc(var(--board-size) * var(--scale-size));\n    --cat-tracker-width: calc(var(--board-size) * 0.4);\n  }\n\n  body {\n    display: grid;\n    grid-template: 5vh 1fr 1.3fr 50px/ 50vw 50vw;\n    align-items: center;\n    justify-items: center;\n  }\n\n  .title {\n    grid-area: 1 / 1 / 2 / 3;\n    margin-top: 0;\n  }\n\n  h1 {\n    font-size: 1rem;\n  }\n\n  .player-board-container {\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .player-board-container.shrink {\n    scale: var(--scale-size);\n    translate: 0px\n      calc(\n        (\n            var(--third-row) - var(--board-size) + var(--second-row) +\n              var(--mini-board-size)\n          ) * -0.5\n      );\n    justify-self: center;\n  }\n\n  .player-board-container.shrink:hover {\n    scale: 0.75;\n  }\n\n  .comp-board-container {\n    margin-top: auto;\n    display: none;\n    position: relative;\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .cat-tracker-container {\n    margin: auto;\n    grid-area: 2 / 2 / 3 / 3;\n  }\n}\n\n@media only screen and (max-width: 450px) {\n  :root {\n    --scale-size: 0.5;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/font/comfortaa-variablefont_wght-webfont.woff":
/*!***********************************************************!*\
  !*** ./src/font/comfortaa-variablefont_wght-webfont.woff ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c513c0597c28e216fa10.woff";

/***/ }),

/***/ "./src/font/comfortaa-variablefont_wght-webfont.woff2":
/*!************************************************************!*\
  !*** ./src/font/comfortaa-variablefont_wght-webfont.woff2 ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "add5243f9e81c15196f7.woff2";

/***/ }),

/***/ "./src/img/big-stretch.svg":
/*!*********************************!*\
  !*** ./src/img/big-stretch.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "03684da8d9e4f617277b.svg";

/***/ }),

/***/ "./src/img/cat2.svg":
/*!**************************!*\
  !*** ./src/img/cat2.svg ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "22df0cd6530e219d3458.svg";

/***/ }),

/***/ "./src/img/format-rotate-90.svg":
/*!**************************************!*\
  !*** ./src/img/format-rotate-90.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "eb61ebf0aa141ed3a297.svg";

/***/ }),

/***/ "./src/img/grrass.jpeg":
/*!*****************************!*\
  !*** ./src/img/grrass.jpeg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7f78929f7bd3fa6e4d0e.jpeg";

/***/ }),

/***/ "./src/img/lesRoll.svg":
/*!*****************************!*\
  !*** ./src/img/lesRoll.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "cf66bb74a5e1305dca24.svg";

/***/ }),

/***/ "./src/img/pexels-pixmike-413195.jpg":
/*!*******************************************!*\
  !*** ./src/img/pexels-pixmike-413195.jpg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "1773631c726a77aa90b5.jpg";

/***/ }),

/***/ "./src/img/quasi-loaf2.svg":
/*!*********************************!*\
  !*** ./src/img/quasi-loaf2.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3e0e2206ab512867cb40.svg";

/***/ }),

/***/ "./src/img/walk.svg":
/*!**************************!*\
  !*** ./src/img/walk.svg ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2c0b87274a83b96ef9de.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./init */ "./src/init.js");


(0,_init__WEBPACK_IMPORTED_MODULE_1__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFNLE9BQU8sYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxNQUFNLE1BQU0sWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxNQUFNLFlBQVksYUFBYSxPQUFPLE1BQU0sWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxNQUFNLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsTUFBTSxL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LFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NmQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7Ozs7O1dDckJBOzs7Ozs7Ozs7Ozs7O0FDQXFCO0FBQ0s7QUFFMUIrQixpREFBSSxFQUFFLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9ib3QuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvY2F0LmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9pbml0LmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5pbXBvcnQgeyBjcmVhdGVDYXRzIH0gZnJvbSBcIi4vY2F0XCI7XG5pbXBvcnQgeyBjb21wQm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCB7IGFkZENhdEltZyB9IGZyb20gJy4vZG9tJztcblxuZnVuY3Rpb24gcmFuZG9tSW5kZXgoYXJyYXkpIHtcbiAgcmV0dXJuIGFycmF5W01hdGguZmxvb3IoYXJyYXkubGVuZ3RoICogTWF0aC5yYW5kb20oKSldO1xufVxuXG5jb25zdCBjb21wQ2F0cyA9IGNyZWF0ZUNhdHMoKTtcblxuZnVuY3Rpb24gY29tcFBsYWNlQ2F0cygpIHtcbiAgY29tcENhdHMuZm9yRWFjaCgoY2F0KSA9PiB7XG4gICAgY2F0LnJhbmRvbWl6ZU9yaWVudGF0aW9uKCk7XG4gICAgY29uc3QgcG90ZW50aWFsUGxhY2VtZW50cyA9IGNvbXBCb2FyZC5kZXRlcm1pbmVSZWFsRXN0YXRlKGNhdCk7XG4gICAgY29uc3QgdGFyZ2V0U3BhY2UgPSByYW5kb21JbmRleChwb3RlbnRpYWxQbGFjZW1lbnRzKTtcbiAgICBjb25zdCBhcnJheU9mQ29vcmQgPSBjb21wQm9hcmQuZ2V0Q29vcmRpbmF0ZXMoXG4gICAgICB0YXJnZXRTcGFjZSxcbiAgICAgIGNhdFxuICAgICk7XG4gICAgY29tcEJvYXJkLnBsYWNlQ2F0KGFycmF5T2ZDb29yZCwgY2F0KTtcbiAgICBjb25zdCBkb21TcG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtY29tcC1jb29yZD0nJHt0YXJnZXRTcGFjZX0nYCk7XG4gICAgY29uc3QgY2F0SW1nID0gYWRkQ2F0SW1nKGNhdCk7XG4gICAgY2F0SW1nLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIGRvbVNwb3QuYXBwZW5kQ2hpbGQoY2F0SW1nKTtcbiAgICBjYXQuc2V0RG9tRWxlbWVudChjYXRJbWcpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZGV0ZXJtaW5lT3JpZW50YXRpb24oYXJyYXkpIHtcbiAgcmV0dXJuIGFycmF5WzBdWzBdID09PSBhcnJheVsxXVswXSA/IFwieVwiIDogXCJ4XCI7XG59XG5cbmZ1bmN0aW9uIGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoc3RhcnQsIGJvYXJkSUQsIGNhdCwgYXhpcywgZGlyZWN0aW9uKSB7XG4gIGxldCBhbGxEaXI7XG4gIGNvbnN0IFt4LCB5XSA9IHN0YXJ0O1xuICBjb25zdCB1cCA9ICgpID0+IGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoW3gsIHkgLSAxXSwgYm9hcmRJRCwgY2F0LCBcInlcIiwgLTEpO1xuICBjb25zdCByaWdodCA9ICgpID0+XG4gICAgYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyhbeCArIDEsIHldLCBib2FyZElELCBjYXQsIFwieFwiLCAxKTtcbiAgY29uc3QgZG93biA9ICgpID0+XG4gICAgYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyhbeCwgeSArIDFdLCBib2FyZElELCBjYXQsIFwieVwiLCAxKTtcbiAgY29uc3QgbGVmdCA9ICgpID0+XG4gICAgYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyhbeCAtIDEsIHldLCBib2FyZElELCBjYXQsIFwieFwiLCAtMSk7XG5cbiAgaWYgKHN0YXJ0LnNvbWUoKG51bSkgPT4gbnVtID4gOSB8fCBudW0gPCAwKSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3Qgb3BwQm9hcmRDZWxsID0gYm9hcmRJRC5ib2FyZFtgWyR7c3RhcnR9XWBdO1xuICBpZiAoXG4gICAgb3BwQm9hcmRDZWxsLmF0dGFja2VkICYmXG4gICAgKCFvcHBCb2FyZENlbGwub2NjdXBpZWRCeSB8fCBvcHBCb2FyZENlbGwub2NjdXBpZWRCeSAhPT0gY2F0KVxuICApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoIW9wcEJvYXJkQ2VsbC5hdHRhY2tlZCkgcmV0dXJuIHN0YXJ0O1xuXG4gIGlmIChheGlzKSB7XG4gICAgaWYgKGF4aXMgPT09IFwieFwiKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBhc3Nlc3NBZGphY2VudENvb3JkaW5hdGVzKFxuICAgICAgICAgIFt4ICsgMSAqIGRpcmVjdGlvbiwgeV0sXG4gICAgICAgICAgYm9hcmRJRCxcbiAgICAgICAgICBjYXQsXG4gICAgICAgICAgYXhpcyxcbiAgICAgICAgICBkaXJlY3Rpb25cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGFsbERpciA9IFtsZWZ0KCksIHJpZ2h0KCldO1xuICAgIH0gZWxzZSBpZiAoYXhpcyA9PT0gXCJ5XCIpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoXG4gICAgICAgICAgW3gsIHkgKyAxICogZGlyZWN0aW9uXSxcbiAgICAgICAgICBib2FyZElELFxuICAgICAgICAgIGNhdCxcbiAgICAgICAgICBheGlzLFxuICAgICAgICAgIGRpcmVjdGlvblxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgYWxsRGlyID0gW3VwKCksIGRvd24oKV07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGFsbERpciA9IFt1cCgpLCByaWdodCgpLCBkb3duKCksIGxlZnQoKV07XG4gIH1cbiAgcmV0dXJuIGFsbERpci5maWx0ZXIoKG9wdCkgPT4gb3B0ICE9PSBudWxsKTtcbn1cblxuZnVuY3Rpb24gY29tcEZpcmVTaG90KG9wcG9uZW50Qm9hcmQsIG9wcG9uZW50Q2F0cykge1xuICBjb25zdCB3b3VuZGVkVGFyZ2V0cyA9IFtdO1xuICBsZXQgcG9zc2libGVIaXRzO1xuICBvcHBvbmVudENhdHMuZm9yRWFjaCgoY2F0KSA9PiB7XG4gICAgaWYgKGNhdC5oaXRzID4gMCAmJiAhY2F0LmlzU3VuaygpKSB7XG4gICAgICB3b3VuZGVkVGFyZ2V0cy5wdXNoKGNhdCk7XG4gICAgfVxuICB9KTtcbiAgaWYgKHdvdW5kZWRUYXJnZXRzLmxlbmd0aCkge1xuICAgIGNvbnN0IHByaW1hcnlUYXJnZXQgPSB3b3VuZGVkVGFyZ2V0c1swXTtcbiAgICBpZiAocHJpbWFyeVRhcmdldC5jb29yZEhpdC5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBvcmllbnRhdGlvbiA9IGRldGVybWluZU9yaWVudGF0aW9uKHByaW1hcnlUYXJnZXQuY29vcmRIaXQpO1xuICAgICAgcG9zc2libGVIaXRzID0gYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyhcbiAgICAgICAgcHJpbWFyeVRhcmdldC5jb29yZEhpdFswXSxcbiAgICAgICAgb3Bwb25lbnRCb2FyZCxcbiAgICAgICAgcHJpbWFyeVRhcmdldCxcbiAgICAgICAgb3JpZW50YXRpb25cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvc3NpYmxlSGl0cyA9IGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoXG4gICAgICAgIHByaW1hcnlUYXJnZXQuY29vcmRIaXRbMF0sXG4gICAgICAgIG9wcG9uZW50Qm9hcmQsXG4gICAgICAgIHByaW1hcnlUYXJnZXRcbiAgICAgICk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHBvc3NpYmxlSGl0cyA9IFtdO1xuICAgIE9iamVjdC5rZXlzKG9wcG9uZW50Qm9hcmQuYm9hcmQpLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGlmICghb3Bwb25lbnRCb2FyZC5ib2FyZFtjZWxsXS5hdHRhY2tlZCkge1xuICAgICAgICBwb3NzaWJsZUhpdHMucHVzaChvcHBvbmVudEJvYXJkLmJvYXJkW2NlbGxdLmNvb3JkaW5hdGVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gcG9zc2libGVIaXRzW01hdGguZmxvb3IocG9zc2libGVIaXRzLmxlbmd0aCAqIE1hdGgucmFuZG9tKCkpXTtcbn1cblxuZXhwb3J0IHsgYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcywgY29tcFBsYWNlQ2F0cywgY29tcEZpcmVTaG90LCBjb21wQ2F0cyB9O1xuIiwiY2xhc3MgQ2F0IHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCB0eXBlKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBcInZlcnRpY2FsXCI7XG4gICAgdGhpcy5jb29yZEhpdCA9IFtdO1xuICB9XG5cbiAgaGl0KGNvb3JkKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gICAgdGhpcy5jb29yZEhpdC5wdXNoKGNvb3JkKTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGggPT09IHRoaXMuaGl0cztcbiAgfVxuXG4gIHJvdGF0ZSgpIHtcbiAgICB0aGlzLm9yaWVudGF0aW9uID1cbiAgICAgIHRoaXMub3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIiA/IFwiaG9yaXpvbnRhbFwiIDogXCJ2ZXJ0aWNhbFwiO1xuICB9XG5cbiAgcmFuZG9taXplT3JpZW50YXRpb24oKSB7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IE1hdGgucmFuZG9tKCkgPiAwLjUgPyBcInZlcnRpY2FsXCIgOiBcImhvcml6b250YWxcIjtcbiAgfVxuXG4gIHNldERvbUVsZW1lbnQodGFyZ2V0KSB7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gdGFyZ2V0O1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNhdHMoKSB7XG4gIGNvbnN0IGNhdDEgPSBuZXcgQ2F0KDUsIFwiYmlnIHN0cmV0Y2hcIik7XG4gIGNvbnN0IGNhdDIgPSBuZXcgQ2F0KDQsIFwiZG93bndhcmQgY2F0XCIpO1xuICBjb25zdCBjYXQzID0gbmV3IENhdCgzLCBcInN0dWZmIHN0cnV0dGVyXCIpO1xuICBjb25zdCBjYXQ0ID0gbmV3IENhdCgyLCBcInF1YXNpIGxvYWZcIik7XG4gIGNvbnN0IGNhdDUgPSBuZXcgQ2F0KDIsIFwiY29tcGFjdCBraXR0eVwiKTtcbiAgcmV0dXJuIFtjYXQxLCBjYXQyLCBjYXQzLCBjYXQ0LCBjYXQ1XTtcbn1cblxuZXhwb3J0IHsgQ2F0LCBjcmVhdGVDYXRzIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBkZWZhdWx0LWNhc2UgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG5pbXBvcnQgY2F0MSBmcm9tIFwiLi9pbWcvYmlnLXN0cmV0Y2guc3ZnXCI7XG5pbXBvcnQgY2F0MiBmcm9tIFwiLi9pbWcvY2F0Mi5zdmdcIjtcbmltcG9ydCBjYXQzIGZyb20gXCIuL2ltZy93YWxrLnN2Z1wiO1xuaW1wb3J0IGNhdDQgZnJvbSBcIi4vaW1nL3F1YXNpLWxvYWYyLnN2Z1wiO1xuaW1wb3J0IGNhdDUgZnJvbSBcIi4vaW1nL2xlc1JvbGwuc3ZnXCI7XG5pbXBvcnQgcm90YXRlSWNvbiBmcm9tIFwiLi9pbWcvZm9ybWF0LXJvdGF0ZS05MC5zdmdcIjtcblxuaW1wb3J0IHtcbiAgaGFuZGxlQ2xpY2ssXG4gIHBsYXllckJvYXJkLFxuICBjb21wQm9hcmQsXG4gIGdldEN1cnJlbnRDYXQsXG59IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5pbXBvcnQgeyBiZWdpbkdhbWUsIGNoZWNrRm9yV2luLCBjb21wUmV0YWxpYXRpb24gfSBmcm9tIFwiLi9nYW1lXCI7XG5cbmNvbnN0IHBsYXllckJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItYm9hcmQtY29udGFpbmVyXCIpO1xuY29uc3QgcGxheWVyQm9hcmREaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItYm9hcmRcIik7XG5jb25zdCBjb21wQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXAtYm9hcmQtY29udGFpbmVyXCIpO1xuY29uc3QgY29tcEJvYXJkRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcC1ib2FyZFwiKTtcblxuY29uc3QgY2F0VHJhY2tlckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2F0LXRyYWNrZXItY29udGFpbmVyXCIpO1xuXG5mdW5jdGlvbiBjcmVhdGVDYXRUcmFja2VyKCkge1xuICBjb25zdCBjYXRUcmFja2VyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY2F0VHJhY2tlckRpdi5jbGFzc0xpc3QuYWRkKFwiY2F0LXRyYWNrZXJcIik7XG4gIGZvciAobGV0IHkgPSAwOyB5IDwgNDsgeSsrKSB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCA1OyB4KyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29uc3QgaWQgPSBgJHt4fS0ke3l9YDtcbiAgICAgIGNlbGwuZGF0YXNldC5jZWxsID0gaWQ7XG4gICAgICBjYXRUcmFja2VyRGl2LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2F0VHJhY2tlckRpdjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2F0SW1hZ2Uoc291cmNlKSB7XG4gIGNvbnN0IGNhdEltZyA9IG5ldyBJbWFnZSgpO1xuICBjYXRJbWcuc3JjID0gc291cmNlO1xuICByZXR1cm4gY2F0SW1nO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRDYXRJbWFnZXMoKSB7XG4gIGNvbnN0IGZpcnN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtY2VsbD0nMC0wJ11gKTtcbiAgY29uc3Qgc2Vjb25kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY2VsbD1cIjAtMVwiXScpO1xuICBjb25zdCB0aGlyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNlbGw9XCIwLTJcIl0nKTtcbiAgY29uc3QgZm91cnRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY2VsbD1cIjAtM1wiXScpO1xuICBjb25zdCBmaWZ0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNlbGw9XCIyLTNcIl0nKTtcbiAgZmlyc3QuYXBwZW5kKGNyZWF0ZUNhdEltYWdlKGNhdDEpKTtcbiAgZmlyc3QuY2xhc3NMaXN0LmFkZChcImNhdC10cmFja2VyLWZpcnN0XCIpO1xuICBzZWNvbmQuYXBwZW5kKGNyZWF0ZUNhdEltYWdlKGNhdDIpKTtcbiAgc2Vjb25kLmNsYXNzTGlzdC5hZGQoXCJjYXQtdHJhY2tlci1zZWNvbmRcIik7XG4gIHRoaXJkLmFwcGVuZChjcmVhdGVDYXRJbWFnZShjYXQzKSk7XG4gIHRoaXJkLmNsYXNzTGlzdC5hZGQoXCJjYXQtdHJhY2tlci10aGlyZFwiKTtcbiAgZm91cnRoLmFwcGVuZChjcmVhdGVDYXRJbWFnZShjYXQ0KSk7XG4gIGZvdXJ0aC5jbGFzc0xpc3QuYWRkKFwiY2F0LXRyYWNrZXItZm91cnRoXCIpO1xuICBmaWZ0aC5hcHBlbmQoY3JlYXRlQ2F0SW1hZ2UoY2F0NSkpO1xuICBmaWZ0aC5jbGFzc0xpc3QuYWRkKFwiY2F0LXRyYWNrZXItZmlmdGhcIik7XG59XG5cbmNvbnN0IGNhdFRyYWNrZXIgPSBjcmVhdGVDYXRUcmFja2VyKCk7XG5jYXRUcmFja2VyQ29udGFpbmVyLmFwcGVuZChjYXRUcmFja2VyKTtcbmFwcGVuZENhdEltYWdlcygpO1xuXG5mdW5jdGlvbiByb3RhdGVDYXQoKSB7XG4gIGNvbnN0IGN1cnJlbnRDYXQgPSBnZXRDdXJyZW50Q2F0KCk7XG4gIGlmICghY3VycmVudENhdCkgcmV0dXJuO1xuICBjdXJyZW50Q2F0LnJvdGF0ZSgpO1xuICBwbGF5ZXJCb2FyZERpc3BsYXkuY2xhc3NMaXN0LnRvZ2dsZShcImhvcml6b250YWxcIik7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICBpZiAoZS5rZXkgPT09IFwiU2hpZnRcIikge1xuICAgIHJvdGF0ZUNhdCgpO1xuICB9XG59KTtcblxuY29uc3Qgcm90YXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmNvbnN0IHJvdGF0ZUltZyA9IG5ldyBJbWFnZSgpO1xucm90YXRlSW1nLnNyYyA9IHJvdGF0ZUljb247XG5yb3RhdGVCdXR0b24uY2xhc3NMaXN0LmFkZChcInJvdGF0ZS1idXR0b25cIik7XG5yb3RhdGVCdXR0b24uYXBwZW5kQ2hpbGQocm90YXRlSW1nKTtcbnJvdGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICByb3RhdGVDYXQoKTtcbn0pO1xucGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQocm90YXRlQnV0dG9uKTtcblxuZnVuY3Rpb24gYWRkQ2F0SW1nKGN1cnJlbnRDYXQsIGhpZGRlbikge1xuICBjb25zdCBjYXRJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgY2F0SW1nLmNsYXNzTGlzdC5hZGQoXCJjYXQtaW1nXCIpO1xuICBzd2l0Y2ggKGN1cnJlbnRDYXQudHlwZSkge1xuICAgIGNhc2UgXCJiaWcgc3RyZXRjaFwiOlxuICAgICAgY2F0SW1nLnNyYyA9IGNhdDE7XG4gICAgICBjYXRJbWcuY2xhc3NMaXN0LmFkZChcImNhdDFcIik7XG4gICAgICBwbGF5ZXJCb2FyZERpc3BsYXkuY2xhc3NOYW1lID0gXCJwbGF5ZXItYm9hcmQgY2F0LXR3b1wiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImRvd253YXJkIGNhdFwiOlxuICAgICAgY2F0SW1nLnNyYyA9IGNhdDI7XG4gICAgICBjYXRJbWcuY2xhc3NMaXN0LmFkZChcImNhdDJcIik7XG4gICAgICBwbGF5ZXJCb2FyZERpc3BsYXkuY2xhc3NOYW1lID0gXCJwbGF5ZXItYm9hcmQgY2F0LXRocmVlXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwic3R1ZmYgc3RydXR0ZXJcIjpcbiAgICAgIGNhdEltZy5zcmMgPSBjYXQzO1xuICAgICAgY2F0SW1nLmNsYXNzTGlzdC5hZGQoXCJjYXQzXCIpO1xuICAgICAgcGxheWVyQm9hcmREaXNwbGF5LmNsYXNzTmFtZSA9IFwicGxheWVyLWJvYXJkIGNhdC1mb3VyXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwicXVhc2kgbG9hZlwiOlxuICAgICAgY2F0SW1nLnNyYyA9IGNhdDQ7XG4gICAgICBjYXRJbWcuY2xhc3NMaXN0LmFkZChcImNhdDRcIik7XG4gICAgICBwbGF5ZXJCb2FyZERpc3BsYXkuY2xhc3NOYW1lID0gXCJwbGF5ZXItYm9hcmQgY2F0LWZpdmVcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJjb21wYWN0IGtpdHR5XCI6XG4gICAgICBjYXRJbWcuc3JjID0gY2F0NTtcbiAgICAgIGNhdEltZy5jbGFzc0xpc3QuYWRkKFwiY2F0NVwiKTtcbiAgICAgIHBsYXllckJvYXJkRGlzcGxheS5jbGFzc05hbWUgPSBcInBsYXllci1ib2FyZFwiO1xuICB9XG4gIGlmIChjdXJyZW50Q2F0Lm9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgIGNhdEltZy5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbC1jYXRcIik7XG4gIH1cbiAgcmV0dXJuIGNhdEltZztcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ2F0VHJhY2tlcihjYXQpIHtcbiAgbGV0IHk7XG4gIGxldCB4ID0gMDtcbiAgc3dpdGNoIChjYXQudHlwZSkge1xuICAgIGNhc2UgXCJiaWcgc3RyZXRjaFwiOlxuICAgICAgeSA9IDA7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZG93bndhcmQgY2F0XCI6XG4gICAgICB5ID0gMTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJzdHVmZiBzdHJ1dHRlclwiOlxuICAgICAgeSA9IDI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwicXVhc2kgbG9hZlwiOlxuICAgICAgeSA9IDM7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiY29tcGFjdCBraXR0eVwiOlxuICAgICAgeSA9IDM7XG4gICAgICB4ID0gMjtcbiAgICAgIGJyZWFrO1xuICB9XG4gIGNvbnN0IGNvb3JkID0gYCR7eCArIGNhdC5oaXRzIC0gMX0tJHt5fWA7XG4gIGNvbnN0IGRvbVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNlbGw9JyR7Y29vcmR9J11gKTtcbiAgZG9tVGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJjYXQtdHJhY2tlci1oaXRcIik7XG59XG5cbmZ1bmN0aW9uIGFwcGx5SGl0SW1hZ2UodGFyZ2V0LCBib2FyZElELCBjb29yZCkge1xuICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImF0dGFja2VkXCIpO1xuICBpZiAoYm9hcmRJRC5ib2FyZFtgWyR7Y29vcmR9XWBdLm9jY3VwaWVkQnkpIHtcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcIm9jY3VwaWVkXCIpO1xuICAgIGlmIChib2FyZElEID09PSBjb21wQm9hcmQpIHtcbiAgICAgIHVwZGF0ZUNhdFRyYWNrZXIoYm9hcmRJRC5ib2FyZFtgWyR7Y29vcmR9XWBdLm9jY3VwaWVkQnkpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBlbmRHYW1lU2NyZWVuKG1lc3NhZ2UpIHtcbiAgY29uc3Qgc2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2NyZWVuLmNsYXNzTGlzdC5hZGQoXCJlbmQtZ2FtZVwiKTtcbiAgY29uc3QgZW5kTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGVuZE1lc3NhZ2UuY2xhc3NMaXN0LmFkZChcImVuZC1tZXNzYWdlXCIpO1xuICBlbmRNZXNzYWdlLnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgY29uc3QgcGxheUFnYWluQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgcGxheUFnYWluQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJwbGF5LWFnYWluLWJ1dHRvblwiKTtcbiAgcGxheUFnYWluQnV0dG9uLnRleHRDb250ZW50ID0gXCJwbGF5IGFnYWluXCI7XG4gIHNjcmVlbi5hcHBlbmQoZW5kTWVzc2FnZSwgcGxheUFnYWluQnV0dG9uKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JlZW4pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wR2FtZUJvYXJkRGlzcGxheSgpIHtcbiAgZm9yIChjb25zdCBjb29yZCBvZiBPYmplY3QudmFsdWVzKGNvbXBCb2FyZC5ib2FyZCkpIHtcbiAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGxcIik7XG4gICAgY2VsbC5kYXRhc2V0LmNvbXBDb29yZCA9IGNvb3JkLmNvb3JkaW5hdGVzO1xuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmICghY29vcmQuYXR0YWNrZWQpIHtcbiAgICAgICAgY29tcEJvYXJkLnRha2VBdHRhY2soY29vcmQuY29vcmRpbmF0ZXMpO1xuICAgICAgICBhcHBseUhpdEltYWdlKGNlbGwsIGNvbXBCb2FyZCwgY29vcmQuY29vcmRpbmF0ZXMpO1xuICAgICAgICBpZiAoY29vcmQub2NjdXBpZWRCeSkge1xuICAgICAgICAgIGlmIChjb29yZC5vY2N1cGllZEJ5LmlzU3VuaygpKSB7XG4gICAgICAgICAgICBjb29yZC5vY2N1cGllZEJ5LmRvbUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgICAgICBpZiAoY2hlY2tGb3JXaW4oKSA9PT0gXCJwbGF5ZXIgd2luc1wiKSB7XG4gICAgICAgICAgICAgIGVuZEdhbWVTY3JlZW4oXCJwbGF5ZXIgd2luc1wiKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb21wUmV0YWxpYXRpb24oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb21wQm9hcmREaXNwbGF5LmFwcGVuZENoaWxkKGNlbGwpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNocmlua1NpemUoKSB7XG4gIGNvbnN0IG9yaWdpbmFsU2l6ZSA9IGNvbXBCb2FyZERpc3BsYXkub2Zmc2V0V2lkdGg7XG4gIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gIHJldHVybiAod2luZG93V2lkdGggLSBvcmlnaW5hbFNpemUpIC8gMi4zIC8gb3JpZ2luYWxTaXplO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICBcIi0tc2hyaW5rLXNjYWxlXCIsXG4gICAgYG1pbigxLCAke3Nocmlua1NpemUoKX0pYFxuICApO1xufSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllckdhbWVCb2FyZERpc3BsYXkoKSB7XG4gIGZvciAoY29uc3QgY29vcmQgb2YgT2JqZWN0LnZhbHVlcyhwbGF5ZXJCb2FyZC5ib2FyZCkpIHtcbiAgICBjb25zdCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzcG90LmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGxcIik7XG4gICAgc3BvdC5kYXRhc2V0LmNvb3JkID0gY29vcmQuY29vcmRpbmF0ZXM7XG4gICAgc3BvdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudENhdCA9IGdldEN1cnJlbnRDYXQoKTtcbiAgICAgIGlmIChjdXJyZW50Q2F0ID09PSBudWxsKSByZXR1cm47XG4gICAgICBjb25zdCBjb29yZEFycmF5ID0gcGxheWVyQm9hcmQuZ2V0Q29vcmRpbmF0ZXMoXG4gICAgICAgIGNvb3JkLmNvb3JkaW5hdGVzLFxuICAgICAgICBjdXJyZW50Q2F0XG4gICAgICApO1xuICAgICAgaWYgKGNvb3JkQXJyYXkpIHtcbiAgICAgICAgaGFuZGxlQ2xpY2soY29vcmRBcnJheSk7XG4gICAgICAgIHNwb3QuYXBwZW5kQ2hpbGQoYWRkQ2F0SW1nKGN1cnJlbnRDYXQpKTtcbiAgICAgICAgaWYgKGN1cnJlbnRDYXQudHlwZSA9PT0gXCJjb21wYWN0IGtpdHR5XCIpIHtcbiAgICAgICAgICBwbGF5ZXJCb2FyZENvbnRhaW5lci5yZW1vdmVDaGlsZChyb3RhdGVCdXR0b24pO1xuICAgICAgICAgIHBsYXllckJvYXJkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJzaHJpbmtcIik7XG4gICAgICAgICAgY29tcEJvYXJkQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgICBjcmVhdGVDb21wR2FtZUJvYXJkRGlzcGxheSgpO1xuICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgIFwiLS1zaHJpbmstc2NhbGVcIixcbiAgICAgICAgICAgIGBtaW4oMSwgJHtzaHJpbmtTaXplKCl9KWBcbiAgICAgICAgICApO1xuICAgICAgICAgIGNhdFRyYWNrZXJDb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICAgIGJlZ2luR2FtZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcGxheWVyQm9hcmREaXNwbGF5LmFwcGVuZENoaWxkKHNwb3QpO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIGNyZWF0ZVBsYXllckdhbWVCb2FyZERpc3BsYXksXG4gIGNyZWF0ZUNvbXBHYW1lQm9hcmREaXNwbGF5LFxuICBhZGRDYXRJbWcsXG4gIGFwcGx5SGl0SW1hZ2UsXG4gIGVuZEdhbWVTY3JlZW4sXG59O1xuIiwiaW1wb3J0IHsgYXBwbHlIaXRJbWFnZSwgZW5kR2FtZVNjcmVlbiB9IGZyb20gJy4vZG9tJztcbmltcG9ydCB7IGNvbXBQbGFjZUNhdHMsIGNvbXBGaXJlU2hvdCwgY29tcENhdHMgfSBmcm9tICcuL2JvdCc7XG5pbXBvcnQgeyBwbGF5ZXJCb2FyZCwgcGxheWVyQ2F0cywgY29tcEJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQuanMnO1xuXG5mdW5jdGlvbiBiZWdpbkdhbWUoKSB7XG4gIGNvbXBQbGFjZUNhdHMoKTtcbn1cblxuZnVuY3Rpb24gY2hlY2tGb3JXaW4oKSB7XG4gIGlmIChjb21wQ2F0cy5ldmVyeShjYXQgPT4gY2F0LmlzU3VuaygpKSkge1xuICAgIHJldHVybiAncGxheWVyIHdpbnMnXG4gIH1cbiAgaWYgKHBsYXllckNhdHMuZXZlcnkoY2F0ID0+IGNhdC5pc1N1bmsoKSkpIHtcbiAgICByZXR1cm4gJ2NvbXB1dGVyIHdpbnMnO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gY29tcFJldGFsaWF0aW9uKCkge1xuICBjb25zdCB0YXJnZXQgPSBjb21wRmlyZVNob3QocGxheWVyQm9hcmQsIHBsYXllckNhdHMpO1xuICBwbGF5ZXJCb2FyZC50YWtlQXR0YWNrKHRhcmdldCk7XG4gIGNvbnN0IGRhdGFJRCA9IGBbZGF0YS1jb29yZD0nJHt0YXJnZXR9J11gXG4gIGNvbnN0IGRvbUNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRhdGFJRCk7XG4gIGFwcGx5SGl0SW1hZ2UoZG9tQ2VsbCwgcGxheWVyQm9hcmQsIHRhcmdldCk7XG4gIGlmIChjaGVja0ZvcldpbigpID09PSAnY29tcHV0ZXIgd2lucycpIHtcbiAgICBlbmRHYW1lU2NyZWVuKCdDb21wdXRlciB3aW5zJyk7XG4gIH07XG59XG5cbmV4cG9ydCB7IGJlZ2luR2FtZSwgY29tcFJldGFsaWF0aW9uLCBjaGVja0ZvcldpbiB9IiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cblxuaW1wb3J0IHsgY3JlYXRlQ2F0cyB9IGZyb20gXCIuL2NhdFwiO1xuXG5jb25zdCBwbGFjZSA9IChzdGF0ZSkgPT4gKHtcbiAgcGxhY2VDYXQ6IChjb29yZGluYXRlcywgY2F0KSA9PiB7XG4gICAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgc3RhdGUuYm9hcmRbYFske2Nvb3JkaW5hdGV9XWBdLm9jY3VwaWVkQnkgPSBjYXQ7XG4gICAgfSk7XG4gIH0sXG59KTtcblxuY29uc3QgcmVjZWl2ZUF0dGFjayA9IChzdGF0ZSkgPT4gKHtcbiAgdGFrZUF0dGFjazogKGNvb3JkKSA9PiB7XG4gICAgY29uc3QgY2VsbCA9IHN0YXRlLmJvYXJkW2BbJHtjb29yZH1dYF07XG4gICAgaWYgKGNlbGwuYXR0YWNrZWQpIHJldHVybjtcbiAgICBpZiAoY2VsbC5vY2N1cGllZEJ5KSB7XG4gICAgICBjZWxsLm9jY3VwaWVkQnkuaGl0KGNvb3JkKTtcbiAgICB9XG4gICAgY2VsbC5hdHRhY2tlZCA9IHRydWU7XG4gIH0sXG59KTtcblxuY29uc3QgY29vcmRJbnZhbGlkID0gKHN0YXRlKSA9PiAoe1xuICBjb29yZGluYXRlc0FyZUludmFsaWQ6IChhcnJheSkgPT5cbiAgICBhcnJheS5mbGF0KCkuc29tZSgoaXRlbSkgPT4gaXRlbSA8IDAgfHwgaXRlbSA+IDkpIHx8XG4gICAgYXJyYXkuc29tZSgoaXRlbSkgPT4gc3RhdGUuYm9hcmRbYFske2l0ZW19XWBdLm9jY3VwaWVkQnkpLFxufSk7XG5cbmNvbnN0IGdldENvb3JkID0gKHN0YXRlKSA9PiAoe1xuICBnZXRDb29yZGluYXRlczogKGNvb3JkLCBjYXQpID0+IHtcbiAgICBjb25zdCBhcnJheSA9IFtdO1xuICAgIGNvbnN0IFt4LCB5XSA9IGNvb3JkO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2F0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoY2F0Lm9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgYXJyYXkucHVzaChbeCwgeSArIGldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5LnB1c2goW3ggKyBpLCB5XSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzdGF0ZS5jb29yZGluYXRlc0FyZUludmFsaWQoYXJyYXkpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gYXJyYXk7XG4gIH0sXG59KTtcblxuY29uc3QgY2VsbEFzc2Vzc21lbnQgPSAoc3RhdGUpID0+ICh7XG4gIGRldGVybWluZVJlYWxFc3RhdGU6ICh7IGxlbmd0aCwgb3JpZW50YXRpb24gfSkgPT4ge1xuICAgIGNvbnN0IGxpbWl0ID0gMTAgLSBsZW5ndGg7XG4gICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICBsZXQgeCA9IDEwO1xuICAgIGxldCB5ID0gMTA7XG4gICAgaWYgKG9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIHkgPSBsaW1pdDtcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9IGxpbWl0O1xuICAgIH1cbiAgICBmb3IgKGxldCBoID0gMDsgaCA8IHg7IGgrKykge1xuICAgICAgZm9yIChsZXQgdiA9IDA7IHYgPCB5OyB2KyspIHtcbiAgICAgICAgYXJyYXkucHVzaChbaCwgdl0pO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBhcnJheU1pbnVzT3ZlcmxhcCA9IGFycmF5LmZpbHRlcigoY2VsbCkgPT5cbiAgICAgIHN0YXRlLmdldENvb3JkaW5hdGVzKGNlbGwsIHsgbGVuZ3RoLCBvcmllbnRhdGlvbiB9KVxuICAgICk7XG4gICAgcmV0dXJuIGFycmF5TWludXNPdmVybGFwO1xuICB9LFxufSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVNwb3QoeCwgeSkge1xuICByZXR1cm4ge1xuICAgIGNvb3JkaW5hdGVzOiBbeCwgeV0sXG4gICAgb2NjdXBpZWRCeTogbnVsbCxcbiAgICBhdHRhY2tlZDogZmFsc2UsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUdhbWVCb2FyZCgpIHtcbiAgY29uc3QgZ2FtZUJvYXJkID0ge307XG4gIGdhbWVCb2FyZC5ib2FyZCA9IHt9O1xuICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5ICs9IDEpIHtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4ICs9IDEpIHtcbiAgICAgIGdhbWVCb2FyZC5ib2FyZFtgWyR7eH0sJHt5fV1gXSA9IGNyZWF0ZVNwb3QoeCwgeSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgIGdhbWVCb2FyZCxcbiAgICBwbGFjZShnYW1lQm9hcmQpLFxuICAgIHJlY2VpdmVBdHRhY2soZ2FtZUJvYXJkKSxcbiAgICBjb29yZEludmFsaWQoZ2FtZUJvYXJkKSxcbiAgICBnZXRDb29yZChnYW1lQm9hcmQpXG4gICk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXBHYW1lQm9hcmQoKSB7XG4gIGNvbnN0IGdhbWVCb2FyZCA9IGNyZWF0ZUdhbWVCb2FyZCgpO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihnYW1lQm9hcmQsIGNlbGxBc3Nlc3NtZW50KGdhbWVCb2FyZCkpO1xufVxuXG5jb25zdCBwbGF5ZXJCb2FyZCA9IGNyZWF0ZUdhbWVCb2FyZCgpO1xuXG5jb25zdCBjb21wQm9hcmQgPSBjcmVhdGVDb21wR2FtZUJvYXJkKCk7XG5cbmNvbnN0IHBsYXllckNhdHMgPSBjcmVhdGVDYXRzKCk7XG5cbmxldCBjYXRzUGxhY2VkID0gMDtcbmxldCBjdXJyZW50Q2F0O1xuXG5mdW5jdGlvbiBnZXRDdXJyZW50Q2F0KCkge1xuICBpZiAoY2F0c1BsYWNlZCA+PSA1KSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIHBsYXllckNhdHNbY2F0c1BsYWNlZF07XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUNsaWNrKGNvb3JkaW5hdGVzKSB7XG4gIGN1cnJlbnRDYXQgPSBnZXRDdXJyZW50Q2F0KCk7XG4gIHBsYXllckJvYXJkLnBsYWNlQ2F0KGNvb3JkaW5hdGVzLCBjdXJyZW50Q2F0KTtcbiAgY2F0c1BsYWNlZCArPSAxO1xufVxuXG5leHBvcnQgeyBjcmVhdGVHYW1lQm9hcmQsIGhhbmRsZUNsaWNrLCBwbGF5ZXJCb2FyZCwgY29tcEJvYXJkLCBnZXRDdXJyZW50Q2F0LCBwbGF5ZXJDYXRzIH07XG4iLCJpbXBvcnQgeyBjcmVhdGVQbGF5ZXJHYW1lQm9hcmREaXNwbGF5IH0gZnJvbSAnLi9kb20nXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIGNyZWF0ZVBsYXllckdhbWVCb2FyZERpc3BsYXkoKTtcbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9mb250L2NvbWZvcnRhYS12YXJpYWJsZWZvbnRfd2dodC13ZWJmb250LndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9mb250L2NvbWZvcnRhYS12YXJpYWJsZWZvbnRfd2dodC13ZWJmb250LndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuL2ltZy9ncnJhc3MuanBlZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcIi4vaW1nL3BleGVscy1waXhtaWtlLTQxMzE5NS5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiY29tZnlcXFwiO1xcbiAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSxcXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxufVxcblxcbjpyb290IHtcXG4gIC0tYmFja2dyb3VuZDogIzI4MmEzNjtcXG4gIC0tYm9hcmQtc2l6ZTogbWluKDYwdncsIDUwMHB4KTtcXG4gIC0tY2VsbC1zaXplOiBjYWxjKHZhcigtLWJvYXJkLXNpemUpIC8gMTApO1xcbiAgLS1sb2dvLWJhbGwtc2l6ZTogNzVweDtcXG4gIC0tc2hyaW5rLXNjYWxlOiAxO1xcbiAgLS1tYXJnaW46IGNhbGMoKDEwMHZ3IC0gdmFyKC0tYm9hcmQtc2l6ZSkpIC8gMik7XFxuICAtLXNocnVuay1ib2FyZDogY2FsYyh2YXIoLS1ib2FyZC1zaXplKSAqIHZhcigtLXNocmluay1zY2FsZSkpO1xcbiAgLyogLS1jYXQtdHJhY2tlci1zaXplOiBjYWxjKHZhcigtLWJvYXJkLXNpemUpICogMC40KTsgKi9cXG4gIC0tY2F0LXRyYWNrZXItcGFkZGluZzogMTBweDtcXG4gIC0tY2F0LXRyYWNrZXItd2lkdGg6IGNhbGMobWluKChjYWxjKHZhcigtLW1hcmdpbikgKiAwLjk1KSksIDIwMHB4KSAtICh2YXIoLS1jYXQtdHJhY2tlci1wYWRkaW5nKSAqIDIpKTtcXG4gIC0tY2F0LXRyYWNrZXItaGVpZ2h0OiBjYWxjKHZhcih2YXIoLS1jYXQtdHJhY2tlci13aWR0aCkgKiAoNCAvIDUpKSk7XFxuICAtLWNhdC10cmFja2VyLWNlbGw6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItd2lkdGgpIC8gNSk7XFxuICAtLW1hcmdpbi10b3A6IGNhbGMoKCgxMDB2aCAtIDEwMHB4KSAtIHZhcigtLWJvYXJkLXNpemUpKSAqIDAuNSk7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IGNvbWZ5LCBWZXJkYW5hLCBHZW5ldmEsIFRhaG9tYSwgc2Fucy1zZXJpZjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiAxMDBweCAxZnIgLyAxZnIgMWZyIDFmcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAvKiBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7ICovXFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyArIFwiKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDQwMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4udGl0bGUge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAtMTtcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIGhlaWdodDogdmFyKC0tbG9nby1iYWxsLXNpemUpO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyIDFmcjtcXG59XFxuXFxuLnRpdGxlIC5iYWxsOm50aC1jaGlsZCg0KSB7XFxuICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDI7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuXFxuLnRpdGxlIC5iYWxsOm50aC1jaGlsZCgzKSB7XFxuICBncmlkLWFyZWE6IDEgLyAyIC8gMiAvIDM7XFxufVxcblxcbi50aXRsZSAuYmFsbDpudGgtY2hpbGQoMikge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMyAvIDIgLyA0O1xcbn1cXG5cXG4udGl0bGUgLmJhbGw6bnRoLWNoaWxkKDEpIHtcXG4gIGdyaWQtYXJlYTogMSAvIDQgLyAyIC8gNTtcXG59XFxuXFxuLmJhbGwge1xcbiAgYm94LXNoYWRvdzogMXB4IDFweCA4cHggcmdiKDI1NSwgMTQwLCAwKTtcXG4gIG1hcmdpbi1sZWZ0OiBjYWxjKHZhcigtLWxvZ28tYmFsbC1zaXplKSAqIC0wLjUpO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBoZWlnaHQ6IHZhcigtLWxvZ28tYmFsbC1zaXplKTtcXG4gIHdpZHRoOiB2YXIoLS1sb2dvLWJhbGwtc2l6ZSk7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoaHNsKDM5LCAxMDAlLCA1OCUpLCBoc2woMzksIDEwMCUsIDUwJSkpO1xcbn1cXG5cXG4ud29yZHMge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAtMTtcXG59XFxuaDEge1xcbiAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lciB7XFxuICBncmlkLWFyZWE6IDIgLyAyIC8gMyAvIDM7XFxuICB0cmFuc2l0aW9uOiAwLjNzO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgd2lkdGg6IG1pbi1jb250ZW50O1xcbiAgaGVpZ2h0OiBtaW4tY29udGVudDtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcXG4gIHotaW5kZXg6IDM7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQsXFxuLmNvbXAtYm9hcmQge1xcbiAgLyogYm94LXNpemluZzogYm9yZGVyLWJveDsgKi9cXG4gIHdpZHRoOiB2YXIoLS1ib2FyZC1zaXplKTtcXG4gIGhlaWdodDogdmFyKC0tYm9hcmQtc2l6ZSk7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDEwLCBhdXRvKSAvIHJlcGVhdCgxMCwgYXV0byk7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fICsgXCIpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogdmFyKC0tY2VsbC1zaXplKSB2YXIoLS1jZWxsLXNpemUpO1xcbn1cXG5cXG4uZ3JpZC1jZWxsIHtcXG4gIHotaW5kZXg6IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYm9yZGVyOiAwLjVweCBzb2xpZCByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMTY0KTtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5jb21wLWJvYXJkIC5ncmlkLWNlbGw6aG92ZXIge1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCA1MHB4IHJnYigyNTUsIDEyMywgMCk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5jb21wLWJvYXJkIC5ncmlkLWNlbGw6YWN0aXZlIHtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggNTBweCAxMHB4IHJnYigyNTUsIDEyMywgMCk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQ2Mik7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuY2F0LW9uZSAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNSk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuaG9yaXpvbnRhbC5jYXQtb25lIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA1KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtdHdvIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5ob3Jpem9udGFsLmNhdC10d28gLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDQpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmNhdC10aHJlZSAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMyk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuaG9yaXpvbnRhbC5jYXQtdGhyZWUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmNhdC1mb3VyIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyLFxcbi5wbGF5ZXItYm9hcmQuY2F0LWZpdmUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmhvcml6b250YWwuY2F0LWZvdXIgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIsXFxuLnBsYXllci1ib2FyZC5ob3Jpem9udGFsLmNhdC1maXZlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuc2hyaW5rIHtcXG4gIHNjYWxlOiB2YXIoLS1zaHJpbmstc2NhbGUpO1xcbiAgdHJhbnNsYXRlOiBjYWxjKCh2YXIoLS1tYXJnaW4pICsgdmFyKC0tc2hydW5rLWJvYXJkKSkgKiAtMC41KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuc2hyaW5rOmhvdmVyIHtcXG4gIHNjYWxlOiAwLjc1O1xcbiAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XFxufVxcblxcbi5jYXQtaW1nIHtcXG4gIHRyYW5zaXRpb246IDAuM3M7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDNweDtcXG4gIHJvdGF0ZTogLTkwZGVnO1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuLmNhdDEge1xcbiAgcmlnaHQ6IC0xMHB4O1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA1KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoNS41LCA0KTtcXG59XFxuXFxuLmNhdDEuaG9yaXpvbnRhbC1jYXQge1xcbiAgdG9wOiA1cHg7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNSk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDMuOCwgMi43KTtcXG59XFxuXFxuLmNhdDIge1xcbiAgdG9wOiA1cHg7XFxuICBsZWZ0OiAtNXB4O1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoNC4zLCAyLjUpO1xcbn1cXG5cXG4uY2F0Mi5ob3Jpem9udGFsLWNhdCB7XFxuICB0b3A6IC0zcHg7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNCk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIuOSwgMS43KTtcXG59XFxuXFxuLmNhdDMge1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMyk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDMuNSwgMi41KTtcXG59XFxuXFxuLmNhdDMuaG9yaXpvbnRhbC1jYXQge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLjUsIDEuOCk7XFxufVxcblxcbi5jYXQ0IHtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLCAyKTtcXG59XFxuXFxuLmNhdDQuaG9yaXpvbnRhbC1jYXQge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xcbn1cXG5cXG4uY2F0NSB7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMiwgMS41KTtcXG59XFxuXFxuLmNhdDUuaG9yaXpvbnRhbC1jYXQge1xcbiAgd2lkdGg6IGNhbGMoKHZhcigtLWNlbGwtc2l6ZSkgKiAyKSk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuNSwgMS4xKTtcXG59XFxuXFxuLmhvcml6b250YWwtY2F0IHtcXG4gIHRvcDogMHB4O1xcbiAgbGVmdDogMHB4O1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgcm90YXRlOiAwZGVnO1xcbn1cXG5cXG4uZ3JpZC1jZWxsLmF0dGFja2VkIHtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggMTVweCBvcmFuZ2U7XFxufVxcblxcbi5ncmlkLWNlbGwuYXR0YWNrZWQ6OmJlZm9yZSB7XFxuICB6LWluZGV4OiAxO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpIC8gMyk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAvIDMpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDE2NiwgMCwgMC42OTgpO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgaW5zZXQ6IDA7XFxuICBtYXJnaW46IGF1dG87XFxufVxcblxcbi5ncmlkLWNlbGwuYXR0YWNrZWQub2NjdXBpZWQ6OmJlZm9yZSB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpIC8gMS41KTtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpIC8gMS41KTtcXG4gIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcXG59XFxuXFxuLnJvdGF0ZS1idXR0b24ge1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHdpZHRoOiAzMHB4O1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uY29tcC1ib2FyZC1jb250YWluZXIge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGdyaWQtYXJlYTogMiAvIDIgLyAzIC8gMztcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgaW5zZXQ6IDA7XFxuICBtYXJnaW46IGF1dG87XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgb3BhY2l0eTogMDtcXG59XFxuXFxuLmNhdC10cmFja2VyLWNvbnRhaW5lciB7XFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNDA1KTtcXG4gIHBhZGRpbmc6IHZhcigtLWNhdC10cmFja2VyLXBhZGRpbmcpO1xcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgbWFyZ2luOiB2YXIoLS1tYXJnaW4tdG9wKSAxMHB4O1xcbiAgZ3JpZC1hcmVhOiAyIC8gMyAvIDMgLyA0O1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCg0LCBhdXRvKSAvIHJlcGVhdCg1LCBhdXRvKTtcXG4gIHdpZHRoOiB2YXIoLS1jYXQtdHJhY2tlci13aWR0aCk7XFxuICBoZWlnaHQ6IHZhcigtLWNhdC10cmFja2VyLWhlaWdodCk7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuLmNhdC10cmFja2VyIGRpdiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYm9yZGVyOiAwLjVweCBzb2xpZCByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuNSk7XFxuICBoZWlnaHQ6IHZhcigtLWNhdC10cmFja2VyLWNlbGwpO1xcbiAgd2lkdGg6IHZhcigtLWNhdC10cmFja2VyLWNlbGwpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgZGl2OjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiAnJztcXG4gIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcXG4gIHdpZHRoOiA0MCU7XFxuICBoZWlnaHQ6IDQwJTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHotaW5kZXg6IDM7XFxuICBpbnNldDogMDtcXG4gIG1hcmdpbjogYXV0bztcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2l0aW9uOiAwLjVzO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgZGl2LmNhdC10cmFja2VyLWhpdDo6YWZ0ZXIge1xcbiAgb3BhY2l0eTogMTtcXG59XFxuXFxuLmNhdC10cmFja2VyIGRpdiBpbWcge1xcbiAgaGVpZ2h0OiB2YXIoLS1jYXQtdHJhY2tlci1jZWxsKTtcXG59XFxuXFxuLmNhdC10cmFja2VyLWZpcnN0IGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDUpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjQsIDIuNyk7XFxufVxcblxcbi5jYXQtdHJhY2tlci1zZWNvbmQgaW1nIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLWNlbGwpICogNCk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIuOSwgMS43KTtcXG59XFxuXFxuLmNhdC10cmFja2VyLXRoaXJkIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDMpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLjUsIDEuOCk7XFxufVxcblxcbi5jYXQtdHJhY2tlci1mb3VydGggaW1nIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLWNlbGwpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuNSk7XFxufVxcblxcbi5jYXQtdHJhY2tlci1maWZ0aCBpbWcge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItY2VsbCkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41LCAxLjEpO1xcbn1cXG5cXG4uZW5kLWdhbWUge1xcbiAgei1pbmRleDogMztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjgyYTM2Y2U7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5MDBweCkge1xcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDg1MHB4KSB7XFxuICA6cm9vdCB7XFxuICAgIC0tc2NhbGUtc2l6ZTogMC40O1xcbiAgICAtLWJvYXJkLXNpemU6IG1pbig2MHZoLCA5MHZ3KTtcXG4gICAgLS1sb2dvLWJhbGwtc2l6ZTogNTBweDtcXG4gICAgLS1zZWNvbmQtcm93OiBjYWxjKCg5NXZoIC0gNTBweCkgKiAoMSAvICgxLjMgKyAxKSkpO1xcbiAgICAtLXRoaXJkLXJvdzogY2FsYygoOTV2aCAtIDUwcHgpICogKDEuMyAvICgxLjMgKyAxKSkpO1xcbiAgICAtLW1pbmktYm9hcmQtc2l6ZTogY2FsYyh2YXIoLS1ib2FyZC1zaXplKSAqIHZhcigtLXNjYWxlLXNpemUpKTtcXG4gICAgLS1jYXQtdHJhY2tlci13aWR0aDogY2FsYyh2YXIoLS1ib2FyZC1zaXplKSAqIDAuNCk7XFxuICB9XFxuXFxuICBib2R5IHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZTogNXZoIDFmciAxLjNmciA1MHB4LyA1MHZ3IDUwdnc7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIH1cXG5cXG4gIC50aXRsZSB7XFxuICAgIGdyaWQtYXJlYTogMSAvIDEgLyAyIC8gMztcXG4gICAgbWFyZ2luLXRvcDogMDtcXG4gIH1cXG5cXG4gIGgxIHtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgfVxcblxcbiAgLnBsYXllci1ib2FyZC1jb250YWluZXIge1xcbiAgICBncmlkLWFyZWE6IDMgLyAxIC8gNCAvIDM7XFxuICB9XFxuXFxuICAucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbmsge1xcbiAgICBzY2FsZTogdmFyKC0tc2NhbGUtc2l6ZSk7XFxuICAgIHRyYW5zbGF0ZTogMHB4XFxuICAgICAgY2FsYyhcXG4gICAgICAgIChcXG4gICAgICAgICAgICB2YXIoLS10aGlyZC1yb3cpIC0gdmFyKC0tYm9hcmQtc2l6ZSkgKyB2YXIoLS1zZWNvbmQtcm93KSArXFxuICAgICAgICAgICAgICB2YXIoLS1taW5pLWJvYXJkLXNpemUpXFxuICAgICAgICAgICkgKiAtMC41XFxuICAgICAgKTtcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICB9XFxuXFxuICAucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbms6aG92ZXIge1xcbiAgICBzY2FsZTogMC43NTtcXG4gIH1cXG5cXG4gIC5jb21wLWJvYXJkLWNvbnRhaW5lciB7XFxuICAgIG1hcmdpbi10b3A6IGF1dG87XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZ3JpZC1hcmVhOiAzIC8gMSAvIDQgLyAzO1xcbiAgfVxcblxcbiAgLmNhdC10cmFja2VyLWNvbnRhaW5lciB7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgZ3JpZC1hcmVhOiAyIC8gMiAvIDMgLyAzO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQ1MHB4KSB7XFxuICA6cm9vdCB7XFxuICAgIC0tc2NhbGUtc2l6ZTogMC41O1xcbiAgfVxcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usb0JBQW9CO0VBQ3BCOzBEQUN1RTtFQUN2RSxnQkFBZ0I7RUFDaEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLDhCQUE4QjtFQUM5Qix5Q0FBeUM7RUFDekMsc0JBQXNCO0VBQ3RCLGlCQUFpQjtFQUNqQiwrQ0FBK0M7RUFDL0MsNkRBQTZEO0VBQzdELHVEQUF1RDtFQUN2RCwyQkFBMkI7RUFDM0Isc0dBQXNHO0VBQ3RHLG1FQUFtRTtFQUNuRSxzREFBc0Q7RUFDdEQsK0RBQStEO0FBQ2pFOztBQUVBO0VBQ0UsdURBQXVEO0VBQ3ZELGtCQUFrQjtFQUNsQixhQUFhO0VBQ2Isc0NBQXNDO0VBQ3RDLG1CQUFtQjtF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QUNsQjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFLHdDQUF3QztFQUN4QywwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSx3Q0FBd0M7RUFDeEMsMEJBQTBCO0FBQzVCOztBQUVBO0VBQ0Usd0NBQXdDO0VBQ3hDLDBCQUEwQjtBQUM1Qjs7QUFFQTtFQUNFLHdDQUF3QztFQUN4QyxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSx3Q0FBd0M7RUFDeEMsMEJBQTBCO0FBQzVCOztBQUVBO0VBQ0UsVUFBVTtFQUNWLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osYUFBYTtFQUNiLDJCQUEyQjtFQUMzQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsZUFBZTtBQUNqQjs7QUFFQTtBQUNBOztBQUVBO0VBQ0U7SUFDRSxpQkFBaUI7SUFDakIsNkJBQTZCO0lBQzdCLHNCQUFzQjtJQUN0QixtREFBbUQ7SUFDbkQsb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCxrREFBa0Q7RUFDcEQ7O0VBRUE7SUFDRSxhQUFhO0lBQ2IsNENBQTRDO0lBQzVDLG1CQUFtQjtJQUNuQixxQkFBcUI7RUFDdkI7O0VBRUE7SUFDRSx3QkFBd0I7SUFDeEIsYUFBYTtFQUNmOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLHdCQUF3QjtFQUMxQjs7RUFFQTtJQUNFLHdCQUF3QjtJQUN4Qjs7Ozs7O09BTUc7SUFDSCxvQkFBb0I7RUFDdEI7O0VBRUE7SUFDRSxXQUFXO0VBQ2I7O0VBRUE7SUFDRSxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLGtCQUFrQjtJQUNsQix3QkFBd0I7RUFDMUI7O0VBRUE7SUFDRSxZQUFZO0lBQ1osd0JBQXdCO0VBQzFCO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLGlCQUFpQjtFQUNuQjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJjb21meVxcXCI7XFxuICBzcmM6IHVybChcXFwiLi9mb250L2NvbWZvcnRhYS12YXJpYWJsZWZvbnRfd2dodC13ZWJmb250LndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLFxcbiAgICB1cmwoXFxcIi4vZm9udC9jb21mb3J0YWEtdmFyaWFibGVmb250X3dnaHQtd2ViZm9udC53b2ZmXFxcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5cXG46cm9vdCB7XFxuICAtLWJhY2tncm91bmQ6ICMyODJhMzY7XFxuICAtLWJvYXJkLXNpemU6IG1pbig2MHZ3LCA1MDBweCk7XFxuICAtLWNlbGwtc2l6ZTogY2FsYyh2YXIoLS1ib2FyZC1zaXplKSAvIDEwKTtcXG4gIC0tbG9nby1iYWxsLXNpemU6IDc1cHg7XFxuICAtLXNocmluay1zY2FsZTogMTtcXG4gIC0tbWFyZ2luOiBjYWxjKCgxMDB2dyAtIHZhcigtLWJvYXJkLXNpemUpKSAvIDIpO1xcbiAgLS1zaHJ1bmstYm9hcmQ6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiB2YXIoLS1zaHJpbmstc2NhbGUpKTtcXG4gIC8qIC0tY2F0LXRyYWNrZXItc2l6ZTogY2FsYyh2YXIoLS1ib2FyZC1zaXplKSAqIDAuNCk7ICovXFxuICAtLWNhdC10cmFja2VyLXBhZGRpbmc6IDEwcHg7XFxuICAtLWNhdC10cmFja2VyLXdpZHRoOiBjYWxjKG1pbigoY2FsYyh2YXIoLS1tYXJnaW4pICogMC45NSkpLCAyMDBweCkgLSAodmFyKC0tY2F0LXRyYWNrZXItcGFkZGluZykgKiAyKSk7XFxuICAtLWNhdC10cmFja2VyLWhlaWdodDogY2FsYyh2YXIodmFyKC0tY2F0LXRyYWNrZXItd2lkdGgpICogKDQgLyA1KSkpO1xcbiAgLS1jYXQtdHJhY2tlci1jZWxsOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLXdpZHRoKSAvIDUpO1xcbiAgLS1tYXJnaW4tdG9wOiBjYWxjKCgoMTAwdmggLSAxMDBweCkgLSB2YXIoLS1ib2FyZC1zaXplKSkgKiAwLjUpO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBjb21meSwgVmVyZGFuYSwgR2VuZXZhLCBUYWhvbWEsIHNhbnMtc2VyaWY7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogMTAwcHggMWZyIC8gMWZyIDFmciAxZnI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLyoganVzdGlmeS1pdGVtczogY2VudGVyOyAqL1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGJhY2tncm91bmQ6IHVybChcXFwiLi9pbWcvZ3JyYXNzLmpwZWdcXFwiKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDQwMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4udGl0bGUge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAtMTtcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIGhlaWdodDogdmFyKC0tbG9nby1iYWxsLXNpemUpO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyIDFmcjtcXG59XFxuXFxuLnRpdGxlIC5iYWxsOm50aC1jaGlsZCg0KSB7XFxuICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDI7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuXFxuLnRpdGxlIC5iYWxsOm50aC1jaGlsZCgzKSB7XFxuICBncmlkLWFyZWE6IDEgLyAyIC8gMiAvIDM7XFxufVxcblxcbi50aXRsZSAuYmFsbDpudGgtY2hpbGQoMikge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMyAvIDIgLyA0O1xcbn1cXG5cXG4udGl0bGUgLmJhbGw6bnRoLWNoaWxkKDEpIHtcXG4gIGdyaWQtYXJlYTogMSAvIDQgLyAyIC8gNTtcXG59XFxuXFxuLmJhbGwge1xcbiAgYm94LXNoYWRvdzogMXB4IDFweCA4cHggcmdiKDI1NSwgMTQwLCAwKTtcXG4gIG1hcmdpbi1sZWZ0OiBjYWxjKHZhcigtLWxvZ28tYmFsbC1zaXplKSAqIC0wLjUpO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBoZWlnaHQ6IHZhcigtLWxvZ28tYmFsbC1zaXplKTtcXG4gIHdpZHRoOiB2YXIoLS1sb2dvLWJhbGwtc2l6ZSk7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoaHNsKDM5LCAxMDAlLCA1OCUpLCBoc2woMzksIDEwMCUsIDUwJSkpO1xcbn1cXG5cXG4ud29yZHMge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAtMTtcXG59XFxuaDEge1xcbiAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lciB7XFxuICBncmlkLWFyZWE6IDIgLyAyIC8gMyAvIDM7XFxuICB0cmFuc2l0aW9uOiAwLjNzO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgd2lkdGg6IG1pbi1jb250ZW50O1xcbiAgaGVpZ2h0OiBtaW4tY29udGVudDtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcXG4gIHotaW5kZXg6IDM7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQsXFxuLmNvbXAtYm9hcmQge1xcbiAgLyogYm94LXNpemluZzogYm9yZGVyLWJveDsgKi9cXG4gIHdpZHRoOiB2YXIoLS1ib2FyZC1zaXplKTtcXG4gIGhlaWdodDogdmFyKC0tYm9hcmQtc2l6ZSk7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDEwLCBhdXRvKSAvIHJlcGVhdCgxMCwgYXV0byk7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXFxcIi4vaW1nL3BleGVscy1waXhtaWtlLTQxMzE5NS5qcGdcXFwiKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IHZhcigtLWNlbGwtc2l6ZSkgdmFyKC0tY2VsbC1zaXplKTtcXG59XFxuXFxuLmdyaWQtY2VsbCB7XFxuICB6LWluZGV4OiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJvcmRlcjogMC41cHggc29saWQgcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjE2NCk7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnBsYXllci1ib2FyZCB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uY29tcC1ib2FyZCAuZ3JpZC1jZWxsOmhvdmVyIHtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggNTBweCByZ2IoMjU1LCAxMjMsIDApO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uY29tcC1ib2FyZCAuZ3JpZC1jZWxsOmFjdGl2ZSB7XFxuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDUwcHggMTBweCByZ2IoMjU1LCAxMjMsIDApO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40NjIpO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmNhdC1vbmUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmhvcml6b250YWwuY2F0LW9uZSAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNSk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuY2F0LXR3byAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNCk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuaG9yaXpvbnRhbC5jYXQtdHdvIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtdGhyZWUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmhvcml6b250YWwuY2F0LXRocmVlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtZm91ciAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlcixcXG4ucGxheWVyLWJvYXJkLmNhdC1maXZlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5ob3Jpem9udGFsLmNhdC1mb3VyIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyLFxcbi5wbGF5ZXItYm9hcmQuaG9yaXpvbnRhbC5jYXQtZml2ZSAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQtY29udGFpbmVyLnNocmluayB7XFxuICBzY2FsZTogdmFyKC0tc2hyaW5rLXNjYWxlKTtcXG4gIHRyYW5zbGF0ZTogY2FsYygodmFyKC0tbWFyZ2luKSArIHZhcigtLXNocnVuay1ib2FyZCkpICogLTAuNSk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQtY29udGFpbmVyLnNocmluazpob3ZlciB7XFxuICBzY2FsZTogMC43NTtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4uY2F0LWltZyB7XFxuICB0cmFuc2l0aW9uOiAwLjNzO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAzcHg7XFxuICByb3RhdGU6IC05MGRlZztcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbi5jYXQxIHtcXG4gIHJpZ2h0OiAtMTBweDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNSk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDUuNSwgNCk7XFxufVxcblxcbi5jYXQxLmhvcml6b250YWwtY2F0IHtcXG4gIHRvcDogNXB4O1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjgsIDIuNyk7XFxufVxcblxcbi5jYXQyIHtcXG4gIHRvcDogNXB4O1xcbiAgbGVmdDogLTVweDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNCk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDQuMywgMi41KTtcXG59XFxuXFxuLmNhdDIuaG9yaXpvbnRhbC1jYXQge1xcbiAgdG9wOiAtM3B4O1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDQpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLjksIDEuNyk7XFxufVxcblxcbi5jYXQzIHtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjUsIDIuNSk7XFxufVxcblxcbi5jYXQzLmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi41LCAxLjgpO1xcbn1cXG5cXG4uY2F0NCB7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMiwgMik7XFxufVxcblxcbi5jYXQ0Lmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41KTtcXG59XFxuXFxuLmNhdDUge1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIsIDEuNSk7XFxufVxcblxcbi5jYXQ1Lmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKCh2YXIoLS1jZWxsLXNpemUpICogMikpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUsIDEuMSk7XFxufVxcblxcbi5ob3Jpem9udGFsLWNhdCB7XFxuICB0b3A6IDBweDtcXG4gIGxlZnQ6IDBweDtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHJvdGF0ZTogMGRlZztcXG59XFxuXFxuLmdyaWQtY2VsbC5hdHRhY2tlZCB7XFxuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDE1cHggb3JhbmdlO1xcbn1cXG5cXG4uZ3JpZC1jZWxsLmF0dGFja2VkOjpiZWZvcmUge1xcbiAgei1pbmRleDogMTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAvIDMpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLyAzKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAxNjYsIDAsIDAuNjk4KTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGluc2V0OiAwO1xcbiAgbWFyZ2luOiBhdXRvO1xcbn1cXG5cXG4uZ3JpZC1jZWxsLmF0dGFja2VkLm9jY3VwaWVkOjpiZWZvcmUge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAvIDEuNSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAvIDEuNSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7XFxufVxcblxcbi5yb3RhdGUtYnV0dG9uIHtcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxuICBib3JkZXI6IG5vbmU7XFxuICB3aWR0aDogMzBweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmNvbXAtYm9hcmQtY29udGFpbmVyIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBncmlkLWFyZWE6IDIgLyAyIC8gMyAvIDM7XFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxuICBoZWlnaHQ6IG1pbi1jb250ZW50O1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGluc2V0OiAwO1xcbiAgbWFyZ2luOiBhdXRvO1xcbn1cXG5cXG4uaGlkZGVuIHtcXG4gIG9wYWNpdHk6IDA7XFxufVxcblxcbi5jYXQtdHJhY2tlci1jb250YWluZXIge1xcbiAgd2lkdGg6IG1pbi1jb250ZW50O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQwNSk7XFxuICBwYWRkaW5nOiB2YXIoLS1jYXQtdHJhY2tlci1wYWRkaW5nKTtcXG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcXG4gIG1hcmdpbjogdmFyKC0tbWFyZ2luLXRvcCkgMTBweDtcXG4gIGdyaWQtYXJlYTogMiAvIDMgLyAzIC8gNDtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG59XFxuXFxuLmNhdC10cmFja2VyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoNCwgYXV0bykgLyByZXBlYXQoNSwgYXV0byk7XFxuICB3aWR0aDogdmFyKC0tY2F0LXRyYWNrZXItd2lkdGgpO1xcbiAgaGVpZ2h0OiB2YXIoLS1jYXQtdHJhY2tlci1oZWlnaHQpO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktaXRlbXM6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5jYXQtdHJhY2tlciBkaXYge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJvcmRlcjogMC41cHggc29saWQgcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjUpO1xcbiAgaGVpZ2h0OiB2YXIoLS1jYXQtdHJhY2tlci1jZWxsKTtcXG4gIHdpZHRoOiB2YXIoLS1jYXQtdHJhY2tlci1jZWxsKTtcXG59XFxuXFxuLmNhdC10cmFja2VyIGRpdjo6YWZ0ZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY29udGVudDogJyc7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7XFxuICB3aWR0aDogNDAlO1xcbiAgaGVpZ2h0OiA0MCU7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB6LWluZGV4OiAzO1xcbiAgaW5zZXQ6IDA7XFxuICBtYXJnaW46IGF1dG87XFxuICBvcGFjaXR5OiAwO1xcbiAgdHJhbnNpdGlvbjogMC41cztcXG59XFxuXFxuLmNhdC10cmFja2VyIGRpdi5jYXQtdHJhY2tlci1oaXQ6OmFmdGVyIHtcXG4gIG9wYWNpdHk6IDE7XFxufVxcblxcbi5jYXQtdHJhY2tlciBkaXYgaW1nIHtcXG4gIGhlaWdodDogdmFyKC0tY2F0LXRyYWNrZXItY2VsbCk7XFxufVxcblxcbi5jYXQtdHJhY2tlci1maXJzdCBpbWcge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItY2VsbCkgKiA1KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMy40LCAyLjcpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXItc2Vjb25kIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDQpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLjksIDEuNyk7XFxufVxcblxcbi5jYXQtdHJhY2tlci10aGlyZCBpbWcge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItY2VsbCkgKiAzKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi41LCAxLjgpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXItZm91cnRoIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXItZmlmdGggaW1nIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLWNlbGwpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuNSwgMS4xKTtcXG59XFxuXFxuLmVuZC1nYW1lIHtcXG4gIHotaW5kZXg6IDM7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI4MmEzNmNlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmb250LXNpemU6IDJyZW07XFxufVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTAwcHgpIHtcXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA4NTBweCkge1xcbiAgOnJvb3Qge1xcbiAgICAtLXNjYWxlLXNpemU6IDAuNDtcXG4gICAgLS1ib2FyZC1zaXplOiBtaW4oNjB2aCwgOTB2dyk7XFxuICAgIC0tbG9nby1iYWxsLXNpemU6IDUwcHg7XFxuICAgIC0tc2Vjb25kLXJvdzogY2FsYygoOTV2aCAtIDUwcHgpICogKDEgLyAoMS4zICsgMSkpKTtcXG4gICAgLS10aGlyZC1yb3c6IGNhbGMoKDk1dmggLSA1MHB4KSAqICgxLjMgLyAoMS4zICsgMSkpKTtcXG4gICAgLS1taW5pLWJvYXJkLXNpemU6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiB2YXIoLS1zY2FsZS1zaXplKSk7XFxuICAgIC0tY2F0LXRyYWNrZXItd2lkdGg6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiAwLjQpO1xcbiAgfVxcblxcbiAgYm9keSB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGU6IDV2aCAxZnIgMS4zZnIgNTBweC8gNTB2dyA1MHZ3O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuXFxuICAudGl0bGUge1xcbiAgICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDM7XFxuICAgIG1hcmdpbi10b3A6IDA7XFxuICB9XFxuXFxuICBoMSB7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gIH1cXG5cXG4gIC5wbGF5ZXItYm9hcmQtY29udGFpbmVyIHtcXG4gICAgZ3JpZC1hcmVhOiAzIC8gMSAvIDQgLyAzO1xcbiAgfVxcblxcbiAgLnBsYXllci1ib2FyZC1jb250YWluZXIuc2hyaW5rIHtcXG4gICAgc2NhbGU6IHZhcigtLXNjYWxlLXNpemUpO1xcbiAgICB0cmFuc2xhdGU6IDBweFxcbiAgICAgIGNhbGMoXFxuICAgICAgICAoXFxuICAgICAgICAgICAgdmFyKC0tdGhpcmQtcm93KSAtIHZhcigtLWJvYXJkLXNpemUpICsgdmFyKC0tc2Vjb25kLXJvdykgK1xcbiAgICAgICAgICAgICAgdmFyKC0tbWluaS1ib2FyZC1zaXplKVxcbiAgICAgICAgICApICogLTAuNVxcbiAgICAgICk7XFxuICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgfVxcblxcbiAgLnBsYXllci1ib2FyZC1jb250YWluZXIuc2hyaW5rOmhvdmVyIHtcXG4gICAgc2NhbGU6IDAuNzU7XFxuICB9XFxuXFxuICAuY29tcC1ib2FyZC1jb250YWluZXIge1xcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGdyaWQtYXJlYTogMyAvIDEgLyA0IC8gMztcXG4gIH1cXG5cXG4gIC5jYXQtdHJhY2tlci1jb250YWluZXIge1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIGdyaWQtYXJlYTogMiAvIDIgLyAzIC8gMztcXG4gIH1cXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0NTBweCkge1xcbiAgOnJvb3Qge1xcbiAgICAtLXNjYWxlLXNpemU6IDAuNTtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTsgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG5cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBpbml0IGZyb20gJy4vaW5pdCc7XG5cbmluaXQoKTtcblxuXG4iXSwibmFtZXMiOlsiY3JlYXRlQ2F0cyIsImNvbXBCb2FyZCIsImFkZENhdEltZyIsInJhbmRvbUluZGV4IiwiYXJyYXkiLCJNYXRoIiwiZmxvb3IiLCJsZW5ndGgiLCJyYW5kb20iLCJjb21wQ2F0cyIsImNvbXBQbGFjZUNhdHMiLCJmb3JFYWNoIiwiY2F0IiwicmFuZG9taXplT3JpZW50YXRpb24iLCJwb3RlbnRpYWxQbGFjZW1lbnRzIiwiZGV0ZXJtaW5lUmVhbEVzdGF0ZSIsInRhcmdldFNwYWNlIiwiYXJyYXlPZkNvb3JkIiwiZ2V0Q29vcmRpbmF0ZXMiLCJwbGFjZUNhdCIsImRvbVNwb3QiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjYXRJbWciLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsInNldERvbUVsZW1lbnQiLCJkZXRlcm1pbmVPcmllbnRhdGlvbiIsImFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMiLCJzdGFydCIsImJvYXJkSUQiLCJheGlzIiwiZGlyZWN0aW9uIiwiYWxsRGlyIiwieCIsInkiLCJ1cCIsInJpZ2h0IiwiZG93biIsImxlZnQiLCJzb21lIiwibnVtIiwib3BwQm9hcmRDZWxsIiwiYm9hcmQiLCJhdHRhY2tlZCIsIm9jY3VwaWVkQnkiLCJmaWx0ZXIiLCJvcHQiLCJjb21wRmlyZVNob3QiLCJvcHBvbmVudEJvYXJkIiwib3Bwb25lbnRDYXRzIiwid291bmRlZFRhcmdldHMiLCJwb3NzaWJsZUhpdHMiLCJoaXRzIiwiaXNTdW5rIiwicHVzaCIsInByaW1hcnlUYXJnZXQiLCJjb29yZEhpdCIsIm9yaWVudGF0aW9uIiwiT2JqZWN0Iiwia2V5cyIsImNlbGwiLCJjb29yZGluYXRlcyIsIkNhdCIsImNvbnN0cnVjdG9yIiwidHlwZSIsImhpdCIsImNvb3JkIiwicm90YXRlIiwidGFyZ2V0IiwiZG9tRWxlbWVudCIsImNhdDEiLCJjYXQyIiwiY2F0MyIsImNhdDQiLCJjYXQ1Iiwicm90YXRlSWNvbiIsImhhbmRsZUNsaWNrIiwicGxheWVyQm9hcmQiLCJnZXRDdXJyZW50Q2F0IiwiYmVnaW5HYW1lIiwiY2hlY2tGb3JXaW4iLCJjb21wUmV0YWxpYXRpb24iLCJwbGF5ZXJCb2FyZENvbnRhaW5lciIsInBsYXllckJvYXJkRGlzcGxheSIsImNvbXBCb2FyZENvbnRhaW5lciIsImNvbXBCb2FyZERpc3BsYXkiLCJjYXRUcmFja2VyQ29udGFpbmVyIiwiY3JlYXRlQ2F0VHJhY2tlciIsImNhdFRyYWNrZXJEaXYiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJkYXRhc2V0IiwiY3JlYXRlQ2F0SW1hZ2UiLCJzb3VyY2UiLCJJbWFnZSIsInNyYyIsImFwcGVuZENhdEltYWdlcyIsImZpcnN0Iiwic2Vjb25kIiwidGhpcmQiLCJmb3VydGgiLCJmaWZ0aCIsImFwcGVuZCIsImNhdFRyYWNrZXIiLCJyb3RhdGVDYXQiLCJjdXJyZW50Q2F0IiwidG9nZ2xlIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXkiLCJyb3RhdGVCdXR0b24iLCJyb3RhdGVJbWciLCJoaWRkZW4iLCJjbGFzc05hbWUiLCJ1cGRhdGVDYXRUcmFja2VyIiwiZG9tVGFyZ2V0IiwiYXBwbHlIaXRJbWFnZSIsImVuZEdhbWVTY3JlZW4iLCJtZXNzYWdlIiwic2NyZWVuIiwiZW5kTWVzc2FnZSIsInRleHRDb250ZW50IiwicGxheUFnYWluQnV0dG9uIiwiYm9keSIsImNyZWF0ZUNvbXBHYW1lQm9hcmREaXNwbGF5IiwidmFsdWVzIiwiY29tcENvb3JkIiwidGFrZUF0dGFjayIsInJlbW92ZSIsInNocmlua1NpemUiLCJvcmlnaW5hbFNpemUiLCJvZmZzZXRXaWR0aCIsIndpbmRvd1dpZHRoIiwiaW5uZXJXaWR0aCIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJjcmVhdGVQbGF5ZXJHYW1lQm9hcmREaXNwbGF5Iiwic3BvdCIsImNvb3JkQXJyYXkiLCJyZW1vdmVDaGlsZCIsImRpc3BsYXkiLCJ2aXNpYmlsaXR5IiwicGxheWVyQ2F0cyIsImV2ZXJ5IiwiZGF0YUlEIiwiZG9tQ2VsbCIsInBsYWNlIiwic3RhdGUiLCJjb29yZGluYXRlIiwicmVjZWl2ZUF0dGFjayIsImNvb3JkSW52YWxpZCIsImNvb3JkaW5hdGVzQXJlSW52YWxpZCIsImZsYXQiLCJpdGVtIiwiZ2V0Q29vcmQiLCJpIiwiY2VsbEFzc2Vzc21lbnQiLCJsaW1pdCIsImgiLCJ2IiwiYXJyYXlNaW51c092ZXJsYXAiLCJjcmVhdGVTcG90IiwiY3JlYXRlR2FtZUJvYXJkIiwiZ2FtZUJvYXJkIiwiYXNzaWduIiwiY3JlYXRlQ29tcEdhbWVCb2FyZCIsImNhdHNQbGFjZWQiLCJpbml0Il0sInNvdXJjZVJvb3QiOiIifQ==