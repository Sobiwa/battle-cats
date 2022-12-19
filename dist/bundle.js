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
/* eslint-disable no-plusplus */


function randomIndex(array) {
  return array[Math.floor(array.length * Math.random())];
}
const compCats = (0,_cat__WEBPACK_IMPORTED_MODULE_0__.createCats)();
function compPlaceCats() {
  compCats.forEach(cat => {
    cat.randomizeOrientation();
    const potentialPlacements = _gameboard__WEBPACK_IMPORTED_MODULE_1__.compBoard.determineRealEstate(cat);
    const arrayOfCoord = _gameboard__WEBPACK_IMPORTED_MODULE_1__.compBoard.getCoordinates(randomIndex(potentialPlacements), cat);
    _gameboard__WEBPACK_IMPORTED_MODULE_1__.compBoard.placeCat(arrayOfCoord, cat);
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
/* harmony export */   "createPlayerGameBoardDisplay": () => (/* binding */ createPlayerGameBoardDisplay)
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
function addCatImg(destination, currentCat) {
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
  destination.appendChild(catImg);
}
function applyHitImage(target, boardID, coord) {
  target.classList.add("attacked");
  if (boardID.board[`[${coord}]`].occupiedBy) {
    target.classList.add("occupied");
  }
}
function createCompGameBoardDisplay() {
  for (const {
    coordinates
  } of Object.values(_gameboard__WEBPACK_IMPORTED_MODULE_6__.compBoard.board)) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    cell.addEventListener("click", () => {
      if (!_gameboard__WEBPACK_IMPORTED_MODULE_6__.compBoard.board[`[${coordinates}]`].attacked) {
        _gameboard__WEBPACK_IMPORTED_MODULE_6__.compBoard.takeAttack(coordinates);
        applyHitImage(cell, _gameboard__WEBPACK_IMPORTED_MODULE_6__.compBoard, coordinates);
        (0,_game__WEBPACK_IMPORTED_MODULE_7__.compRetaliation)();
      }
    });
    compBoardDisplay.appendChild(cell);
  }
}
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
        addCatImg(spot, currentCat);
        if (currentCat.type === "compact kitty") {
          playerBoardContainer.removeChild(rotateButton);
          playerBoardContainer.classList.add('shrink');
          compBoardContainer.style.display = 'flex';
          createCompGameBoardDisplay();
          (0,_game__WEBPACK_IMPORTED_MODULE_7__.beginGame)();
        }
      }
    });
    playerBoardDisplay.appendChild(spot);
  }
}
const catTracker = document.querySelector(".cat-tracker");
function createCatImage(source) {
  const cat = document.createElement("div");
  cat.classList.add('cat-tracker-image');
  const catImg = new Image();
  catImg.src = source;
  cat.appendChild(catImg);
  return cat;
}
const cat1tracker = createCatImage(_img_big_stretch_svg__WEBPACK_IMPORTED_MODULE_0__);
const cat2tracker = createCatImage(_img_cat2_svg__WEBPACK_IMPORTED_MODULE_1__);
const cat3tracker = createCatImage(_img_walk_svg__WEBPACK_IMPORTED_MODULE_2__);
const cat4tracker = createCatImage(_img_quasi_loaf2_svg__WEBPACK_IMPORTED_MODULE_3__);
const cat5tracker = createCatImage(_img_lesRoll_svg__WEBPACK_IMPORTED_MODULE_4__);
catTracker.append(cat1tracker, cat2tracker, cat3tracker, cat4tracker, cat5tracker);


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "beginGame": () => (/* binding */ beginGame),
/* harmony export */   "compRetaliation": () => (/* binding */ compRetaliation)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _bot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bot */ "./src/bot.js");
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");



function beginGame() {
  (0,_bot__WEBPACK_IMPORTED_MODULE_1__.compPlaceCats)();
}
function compRetaliation() {
  console.log(_gameboard_js__WEBPACK_IMPORTED_MODULE_2__.playerBoard);
  const target = (0,_bot__WEBPACK_IMPORTED_MODULE_1__.compFireShot)(_gameboard_js__WEBPACK_IMPORTED_MODULE_2__.playerBoard, _gameboard_js__WEBPACK_IMPORTED_MODULE_2__.playerCats);
  console.log(target);
  _gameboard_js__WEBPACK_IMPORTED_MODULE_2__.playerBoard.takeAttack(target);
  const dataID = `[data-coord='${target}']`;
  console.log(dataID);
  const domCell = document.querySelector(dataID);
  (0,_dom__WEBPACK_IMPORTED_MODULE_0__.applyHitImage)(domCell, _gameboard_js__WEBPACK_IMPORTED_MODULE_2__.playerBoard, target);
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
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: 'comfy';\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format('woff2'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('woff');\n  font-weight: 600;\n  font-style: normal;\n}\n\n:root {\n  --background: #282a36;\n  --board-size: min(60vw, 500px);\n  --cell-size: calc(var(--board-size) / 10);\n  --cell-size2: 50px;\n  --cat-tracker-size: calc(var(--board-size) * 0.4);\n  --cat-tracker-cell: calc(var(--cell-size) * 0.75);\n  --logo-ball-size: 75px;\n  --shrink-scale: calc(((100vw - var(--board-size)) / 2) / var(--board-size));\n}\n\nbody {\n  display: grid;\n  grid-template: 100px 1fr / 1fr;\n  margin: 0;\n  padding: 0;\n  position: relative;\n  color: whitesmoke;\n  height: 100vh;\n  width: 100vw;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  background-repeat: repeat;\n  background-size: 400px;\n  text-align: center;\n}\n\n.title {\n  grid-area: 1 / 1 / 2 / -2;\n  width: min-content;\n  height: var(--logo-ball-size);\n  margin: auto;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n}\n\n.title .ball:nth-child(4) {\n  grid-area: 1 / 1 / 2 / 2;\n  margin-left: 0;\n}\n\n.title .ball:nth-child(3) {\n  grid-area: 1 / 2 / 2 / 3;\n}\n\n.title .ball:nth-child(2) {\n  grid-area: 1 / 3 / 2 / 4;\n}\n\n.title .ball:nth-child(1) {\n  grid-area: 1 / 4 / 2 / 5;\n}\n\n.ball {\n  box-shadow: 1px 1px 8px rgb(255, 140, 0);\n  margin-left: calc(var(--logo-ball-size) * -0.5);\n  content: '';\n  height: var(--logo-ball-size);\n  width: var(--logo-ball-size);\n  border-radius: 50%;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n}\n\n.words {\n  grid-area: 1 / 1 / 2 / -1;\n\n}\nh1 {\n  font-size: 2rem;\n  font-family: comfy, Verdana, Geneva, Tahoma, sans-serif;\n}\n\n.player-board-container {\n  grid-area: 2 / 1 / 3 / 2;\n  transition: 0.3s;\n  margin: auto;\n  width: min-content;\n  height: min-content;\n  transform-origin: 0 0;\n  z-index: 3;\n}\n\n.player-board, \n.comp-board {\n  /* box-sizing: border-box; */\n  width: var(--board-size);\n  height: var(--board-size);\n  display: grid;\n  grid-template: repeat(10, auto) / repeat(10, auto);\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n  background-repeat: repeat;\n  background-size: var(--cell-size) var(--cell-size);\n}\n\n.grid-cell {\n  z-index: 0;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.164);\n  width: var(--cell-size);\n  height: var(--cell-size);\n  position: relative;\n}\n\n.player-board {\n  overflow: hidden;\n}\n\n.comp-board .grid-cell:hover {\n  box-shadow: inset 0px 0px 50px rgb(255, 123, 0);\n  cursor: pointer;\n}\n\n.player-board .grid-cell:hover::after {\n  position: absolute;\n  left: 0;\n  content: '';\n  background-color: rgba(0, 0, 0, 0.462);\n  border-radius: 5px;\n}\n\n.player-board.cat-one .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 5);\n}\n\n.player-board.horizontal.cat-one .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 5);\n}\n\n.player-board.cat-two .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 4);\n}\n\n.player-board.horizontal.cat-two .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 4);\n}\n\n.player-board.cat-three .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 3);\n}\n\n.player-board.horizontal.cat-three .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 3);\n}\n\n.player-board.cat-four .grid-cell:hover::after,\n.player-board.cat-five .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 2);\n}\n\n.player-board.horizontal.cat-four .grid-cell:hover::after,\n.player-board.horizontal.cat-five .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 2);\n}\n\n.player-board-container.shrink {\n  /* --shrink-scale: 0.3; */\n  scale: var(--shrink-scale);\n  translate: calc(-48vw + ((var(--board-size) * var(--shrink-scale)) * 1.6));\n}\n\n.player-board-container.shrink:hover {\n  scale: .75;\n  border: 2px solid black;\n}\n\n.cat-img {\n  position: absolute;\n  top: 3px;\n  rotate: -90deg;\n  width: var(--cell-size);\n  pointer-events: none;\n}\n\n.cat1 {\n  right: -10px;\n  height: calc(var(--cell-size) * 5);\n  transform: scale(5.5, 4);\n}\n\n.cat1.horizontal-cat {\n  top: 5px;\n  width: calc(var(--cell-size) * 5);\n  transform: scale(3.8, 2.7);\n}\n\n.cat2 {\n  top: 5px;\n  left: -5px;\n  height: calc(var(--cell-size) * 4);\n  transform: scale(4.3, 2.5);\n}\n\n.cat2.horizontal-cat {\n  top: -3px;\n  width: calc(var(--cell-size) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat3 {\n  left: 0;\n  height: calc(var(--cell-size) * 3);\n  transform: scale(3.5, 2.5);\n}\n\n.cat3.horizontal-cat {\n  width: calc(var(--cell-size) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat4 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 2);\n}\n\n.cat4.horizontal-cat {\n  width: calc(var(--cell-size) * 2);\n  transform: scale(1.5);\n}\n\n.cat5 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 1.5);\n}\n\n.cat5.horizontal-cat {\n  width: calc((var(--cell-size) * 2));\n  transform: scale(1.5, 1.1);\n}\n\n.horizontal-cat {\n  top: 0px;\n  left: 0px;\n  height: var(--cell-size);\n  rotate: 0deg;\n}\n\n.grid-cell.attacked {\n  box-shadow: inset 0px 0px 15px orange;\n}\n\n.grid-cell.attacked::before {\n  z-index: 1;\n  position: absolute;\n  content: '';\n  width: calc(var(--cell-size) / 3);\n  height: calc(var(--cell-size) /3);\n  background-color: rgba(255, 166, 0, 0.698);\n  border-radius: 50%;\n  inset: 0;\n  margin: auto;\n}\n\n.grid-cell.attacked.occupied::before {\n  width: calc(var(--cell-size) / 1.5);\n  height: calc(var(--cell-size) / 1.5);\n  background-color: orange;\n}\n\n.rotate-button {\n  appearance: none;\n  border: none;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  cursor: pointer;\n}\n\n.comp-board-container {\n  grid-area: 2 / 1 / 3 / 2;\n  width: min-content;\n  height: min-content;\n  display: none;\n  inset: 0;\n  margin: auto;\n  /* margin-top: calc(var(--board-size) * -1); */\n}\n\n.cat-tracker {\n  overflow: hidden;\n  /* position: absolute; */\n  top: var(--board-size);\n  display: grid;\n  grid-template: repeat(4, var(--cat-tracker-cell)) / repeat(5, var(--cat-tracker-cell));\n  background-color: rgba(255, 255, 255, 0.405);\n  border-radius: 20px;\n  width: var(--cat-tracker-size);\n  height: var(--cat-tracker-size);\n  flex: 0 0 auto;\n  align-content: center;\n  justify-content: center;\n}\n\n.cat-tracker div img {\n  height: var(--cat-tracker-cell);\n}\n\n.cat-tracker :nth-child(1) {\n  grid-area: 1 / 1 / 2 / 2;\n}\n\n.cat-tracker :nth-child(1) img {\n  width: calc(var(--cat-tracker-cell) * 5);\n  transform: scale(3.8, 2.7);\n}\n\n.cat-tracker :nth-child(2) {\n  grid-area: 2 / 1 / 3 / 2;\n}\n\n.cat-tracker :nth-child(2) img {\n  width: calc(var(--cat-tracker-cell) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat-tracker :nth-child(3) {\n  grid-area: 3 / 1 / 4 / 2;\n}\n\n.cat-tracker :nth-child(3) img {\n  width: calc(var(--cat-tracker-cell) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat-tracker :nth-child(4) {\n  grid-area: 4 / 1 / 5 / 2;\n}\n\n.cat-tracker :nth-child(4) img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5);\n}\n\n.cat-tracker :nth-child(5) {\n  grid-area: 4 / 3 / 5 / 5;\n}\n\n.cat-tracker :nth-child(5) img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5, 1.1);\n}\n\n@media only screen and (max-width: 600px) {\n\n  :root {\n    --board-size: 90vw;\n    --logo-ball-size: 50px;\n  }\n\n  body {\n    display: grid;\n    grid-template: 5vh 1fr 1.5fr / 50vw 50vw;\n    align-items: center;\n    justify-items: center;\n  }\n\n  .title {\n    grid-area: 1 / 1 / 2 / 3;\n    margin-top: 0;\n  }\n\n  h1 {\n    font-size: 1rem;\n  }\n\n  .player-board-container.shrink {\n    --board-size: 40vw;\n    --cell-size: calc(var(--board-size) / 10);\n    scale: 1;\n    translate: none;\n    justify-self: center;\n  }\n\n  .player-board-container.shrink:hover {\n    scale: 1.5;\n  }\n\n  .comp-board-container {\n    margin-top: auto;\n    display: none;\n    position: relative;\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .cat-tracker {\n    grid-area: 2 / 2 / 3 / 3;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n  font-family: 'comfy';\n  src: url('./font/comfortaa-variablefont_wght-webfont.woff2') format('woff2'),\n    url('./font/comfortaa-variablefont_wght-webfont.woff') format('woff');\n  font-weight: 600;\n  font-style: normal;\n}\n\n:root {\n  --background: #282a36;\n  --board-size: min(60vw, 500px);\n  --cell-size: calc(var(--board-size) / 10);\n  --cell-size2: 50px;\n  --cat-tracker-size: calc(var(--board-size) * 0.4);\n  --cat-tracker-cell: calc(var(--cell-size) * 0.75);\n  --logo-ball-size: 75px;\n  --shrink-scale: calc(((100vw - var(--board-size)) / 2) / var(--board-size));\n}\n\nbody {\n  display: grid;\n  grid-template: 100px 1fr / 1fr;\n  margin: 0;\n  padding: 0;\n  position: relative;\n  color: whitesmoke;\n  height: 100vh;\n  width: 100vw;\n  background: url('./img/grrass.jpeg');\n  background-repeat: repeat;\n  background-size: 400px;\n  text-align: center;\n}\n\n.title {\n  grid-area: 1 / 1 / 2 / -2;\n  width: min-content;\n  height: var(--logo-ball-size);\n  margin: auto;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n}\n\n.title .ball:nth-child(4) {\n  grid-area: 1 / 1 / 2 / 2;\n  margin-left: 0;\n}\n\n.title .ball:nth-child(3) {\n  grid-area: 1 / 2 / 2 / 3;\n}\n\n.title .ball:nth-child(2) {\n  grid-area: 1 / 3 / 2 / 4;\n}\n\n.title .ball:nth-child(1) {\n  grid-area: 1 / 4 / 2 / 5;\n}\n\n.ball {\n  box-shadow: 1px 1px 8px rgb(255, 140, 0);\n  margin-left: calc(var(--logo-ball-size) * -0.5);\n  content: '';\n  height: var(--logo-ball-size);\n  width: var(--logo-ball-size);\n  border-radius: 50%;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n}\n\n.words {\n  grid-area: 1 / 1 / 2 / -1;\n\n}\nh1 {\n  font-size: 2rem;\n  font-family: comfy, Verdana, Geneva, Tahoma, sans-serif;\n}\n\n.player-board-container {\n  grid-area: 2 / 1 / 3 / 2;\n  transition: 0.3s;\n  margin: auto;\n  width: min-content;\n  height: min-content;\n  transform-origin: 0 0;\n  z-index: 3;\n}\n\n.player-board, \n.comp-board {\n  /* box-sizing: border-box; */\n  width: var(--board-size);\n  height: var(--board-size);\n  display: grid;\n  grid-template: repeat(10, auto) / repeat(10, auto);\n  background: url('./img/pexels-pixmike-413195.jpg');\n  background-repeat: repeat;\n  background-size: var(--cell-size) var(--cell-size);\n}\n\n.grid-cell {\n  z-index: 0;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.164);\n  width: var(--cell-size);\n  height: var(--cell-size);\n  position: relative;\n}\n\n.player-board {\n  overflow: hidden;\n}\n\n.comp-board .grid-cell:hover {\n  box-shadow: inset 0px 0px 50px rgb(255, 123, 0);\n  cursor: pointer;\n}\n\n.player-board .grid-cell:hover::after {\n  position: absolute;\n  left: 0;\n  content: '';\n  background-color: rgba(0, 0, 0, 0.462);\n  border-radius: 5px;\n}\n\n.player-board.cat-one .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 5);\n}\n\n.player-board.horizontal.cat-one .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 5);\n}\n\n.player-board.cat-two .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 4);\n}\n\n.player-board.horizontal.cat-two .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 4);\n}\n\n.player-board.cat-three .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 3);\n}\n\n.player-board.horizontal.cat-three .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 3);\n}\n\n.player-board.cat-four .grid-cell:hover::after,\n.player-board.cat-five .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 2);\n}\n\n.player-board.horizontal.cat-four .grid-cell:hover::after,\n.player-board.horizontal.cat-five .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 2);\n}\n\n.player-board-container.shrink {\n  /* --shrink-scale: 0.3; */\n  scale: var(--shrink-scale);\n  translate: calc(-48vw + ((var(--board-size) * var(--shrink-scale)) * 1.6));\n}\n\n.player-board-container.shrink:hover {\n  scale: .75;\n  border: 2px solid black;\n}\n\n.cat-img {\n  position: absolute;\n  top: 3px;\n  rotate: -90deg;\n  width: var(--cell-size);\n  pointer-events: none;\n}\n\n.cat1 {\n  right: -10px;\n  height: calc(var(--cell-size) * 5);\n  transform: scale(5.5, 4);\n}\n\n.cat1.horizontal-cat {\n  top: 5px;\n  width: calc(var(--cell-size) * 5);\n  transform: scale(3.8, 2.7);\n}\n\n.cat2 {\n  top: 5px;\n  left: -5px;\n  height: calc(var(--cell-size) * 4);\n  transform: scale(4.3, 2.5);\n}\n\n.cat2.horizontal-cat {\n  top: -3px;\n  width: calc(var(--cell-size) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat3 {\n  left: 0;\n  height: calc(var(--cell-size) * 3);\n  transform: scale(3.5, 2.5);\n}\n\n.cat3.horizontal-cat {\n  width: calc(var(--cell-size) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat4 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 2);\n}\n\n.cat4.horizontal-cat {\n  width: calc(var(--cell-size) * 2);\n  transform: scale(1.5);\n}\n\n.cat5 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 1.5);\n}\n\n.cat5.horizontal-cat {\n  width: calc((var(--cell-size) * 2));\n  transform: scale(1.5, 1.1);\n}\n\n.horizontal-cat {\n  top: 0px;\n  left: 0px;\n  height: var(--cell-size);\n  rotate: 0deg;\n}\n\n.grid-cell.attacked {\n  box-shadow: inset 0px 0px 15px orange;\n}\n\n.grid-cell.attacked::before {\n  z-index: 1;\n  position: absolute;\n  content: '';\n  width: calc(var(--cell-size) / 3);\n  height: calc(var(--cell-size) /3);\n  background-color: rgba(255, 166, 0, 0.698);\n  border-radius: 50%;\n  inset: 0;\n  margin: auto;\n}\n\n.grid-cell.attacked.occupied::before {\n  width: calc(var(--cell-size) / 1.5);\n  height: calc(var(--cell-size) / 1.5);\n  background-color: orange;\n}\n\n.rotate-button {\n  appearance: none;\n  border: none;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  cursor: pointer;\n}\n\n.comp-board-container {\n  grid-area: 2 / 1 / 3 / 2;\n  width: min-content;\n  height: min-content;\n  display: none;\n  inset: 0;\n  margin: auto;\n  /* margin-top: calc(var(--board-size) * -1); */\n}\n\n.cat-tracker {\n  overflow: hidden;\n  /* position: absolute; */\n  top: var(--board-size);\n  display: grid;\n  grid-template: repeat(4, var(--cat-tracker-cell)) / repeat(5, var(--cat-tracker-cell));\n  background-color: rgba(255, 255, 255, 0.405);\n  border-radius: 20px;\n  width: var(--cat-tracker-size);\n  height: var(--cat-tracker-size);\n  flex: 0 0 auto;\n  align-content: center;\n  justify-content: center;\n}\n\n.cat-tracker div img {\n  height: var(--cat-tracker-cell);\n}\n\n.cat-tracker :nth-child(1) {\n  grid-area: 1 / 1 / 2 / 2;\n}\n\n.cat-tracker :nth-child(1) img {\n  width: calc(var(--cat-tracker-cell) * 5);\n  transform: scale(3.8, 2.7);\n}\n\n.cat-tracker :nth-child(2) {\n  grid-area: 2 / 1 / 3 / 2;\n}\n\n.cat-tracker :nth-child(2) img {\n  width: calc(var(--cat-tracker-cell) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat-tracker :nth-child(3) {\n  grid-area: 3 / 1 / 4 / 2;\n}\n\n.cat-tracker :nth-child(3) img {\n  width: calc(var(--cat-tracker-cell) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat-tracker :nth-child(4) {\n  grid-area: 4 / 1 / 5 / 2;\n}\n\n.cat-tracker :nth-child(4) img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5);\n}\n\n.cat-tracker :nth-child(5) {\n  grid-area: 4 / 3 / 5 / 5;\n}\n\n.cat-tracker :nth-child(5) img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5, 1.1);\n}\n\n@media only screen and (max-width: 600px) {\n\n  :root {\n    --board-size: 90vw;\n    --logo-ball-size: 50px;\n  }\n\n  body {\n    display: grid;\n    grid-template: 5vh 1fr 1.5fr / 50vw 50vw;\n    align-items: center;\n    justify-items: center;\n  }\n\n  .title {\n    grid-area: 1 / 1 / 2 / 3;\n    margin-top: 0;\n  }\n\n  h1 {\n    font-size: 1rem;\n  }\n\n  .player-board-container.shrink {\n    --board-size: 40vw;\n    --cell-size: calc(var(--board-size) / 10);\n    scale: 1;\n    translate: none;\n    justify-self: center;\n  }\n\n  .player-board-container.shrink:hover {\n    scale: 1.5;\n  }\n\n  .comp-board-container {\n    margin-top: auto;\n    display: none;\n    position: relative;\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .cat-tracker {\n    grid-area: 2 / 2 / 3 / 3;\n  }\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFLLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxNQUFNLE1BQU0sWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxNQUFNLFlBQVksYUFBYSxPQUFPLE1BQU0sWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLE1BQU0sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE1BQU0scUNBQXFDLHlCQUF5Qiw2SkFBNkoscUJBQXFCLHVCQUF1QixHQUFHLFdBQVcsMEJBQTBCLG1DQUFtQyw4Q0FBOEMsdUJBQXVCLHNEQUFzRCxzREFBc0QsMkJBQTJCLGdGQUFnRixHQUFHLFVBQVUsa0JBQWtCLG1DQUFtQyxjQUFjLGVBQWUsdUJBQXVCLHNCQUFzQixrQkFBa0IsaUJBQWlCLHlDQUF5Qyw4QkFBOEIsMkJBQTJCLHVCQUF1QixHQUFHLFlBQVksOEJBQThCLHVCQUF1QixrQ0FBa0MsaUJBQWlCLGtCQUFrQiwwQkFBMEIsd0JBQXdCLDJDQUEyQyxHQUFHLCtCQUErQiw2QkFBNkIsbUJBQW1CLEdBQUcsK0JBQStCLDZCQUE2QixHQUFHLCtCQUErQiw2QkFBNkIsR0FBRywrQkFBK0IsNkJBQTZCLEdBQUcsV0FBVyw2Q0FBNkMsb0RBQW9ELGdCQUFnQixrQ0FBa0MsaUNBQWlDLHVCQUF1Qix3RUFBd0UsR0FBRyxZQUFZLDhCQUE4QixLQUFLLE1BQU0sb0JBQW9CLDREQUE0RCxHQUFHLDZCQUE2Qiw2QkFBNkIscUJBQXFCLGlCQUFpQix1QkFBdUIsd0JBQXdCLDBCQUEwQixlQUFlLEdBQUcsa0NBQWtDLCtCQUErQiwrQkFBK0IsOEJBQThCLGtCQUFrQix1REFBdUQsdURBQXVELDhCQUE4Qix1REFBdUQsR0FBRyxnQkFBZ0IsZUFBZSwyQkFBMkIsbURBQW1ELDRCQUE0Qiw2QkFBNkIsdUJBQXVCLEdBQUcsbUJBQW1CLHFCQUFxQixHQUFHLGtDQUFrQyxvREFBb0Qsb0JBQW9CLEdBQUcsMkNBQTJDLHVCQUF1QixZQUFZLGdCQUFnQiwyQ0FBMkMsdUJBQXVCLEdBQUcsbURBQW1ELDRCQUE0Qix1Q0FBdUMsR0FBRyw4REFBOEQsNkJBQTZCLHNDQUFzQyxHQUFHLG1EQUFtRCw0QkFBNEIsdUNBQXVDLEdBQUcsOERBQThELDZCQUE2QixzQ0FBc0MsR0FBRyxxREFBcUQsNEJBQTRCLHVDQUF1QyxHQUFHLGdFQUFnRSw2QkFBNkIsc0NBQXNDLEdBQUcscUdBQXFHLDRCQUE0Qix1Q0FBdUMsR0FBRywySEFBMkgsNkJBQTZCLHNDQUFzQyxHQUFHLG9DQUFvQyw0QkFBNEIsaUNBQWlDLCtFQUErRSxHQUFHLDBDQUEwQyxlQUFlLDRCQUE0QixHQUFHLGNBQWMsdUJBQXVCLGFBQWEsbUJBQW1CLDRCQUE0Qix5QkFBeUIsR0FBRyxXQUFXLGlCQUFpQix1Q0FBdUMsNkJBQTZCLEdBQUcsMEJBQTBCLGFBQWEsc0NBQXNDLCtCQUErQixHQUFHLFdBQVcsYUFBYSxlQUFlLHVDQUF1QywrQkFBK0IsR0FBRywwQkFBMEIsY0FBYyxzQ0FBc0MsK0JBQStCLEdBQUcsV0FBVyxZQUFZLHVDQUF1QywrQkFBK0IsR0FBRywwQkFBMEIsc0NBQXNDLCtCQUErQixHQUFHLFdBQVcsWUFBWSx1Q0FBdUMsMkJBQTJCLEdBQUcsMEJBQTBCLHNDQUFzQywwQkFBMEIsR0FBRyxXQUFXLFlBQVksdUNBQXVDLDZCQUE2QixHQUFHLDBCQUEwQix3Q0FBd0MsK0JBQStCLEdBQUcscUJBQXFCLGFBQWEsY0FBYyw2QkFBNkIsaUJBQWlCLEdBQUcseUJBQXlCLDBDQUEwQyxHQUFHLGlDQUFpQyxlQUFlLHVCQUF1QixnQkFBZ0Isc0NBQXNDLHNDQUFzQywrQ0FBK0MsdUJBQXVCLGFBQWEsaUJBQWlCLEdBQUcsMENBQTBDLHdDQUF3Qyx5Q0FBeUMsNkJBQTZCLEdBQUcsb0JBQW9CLHFCQUFxQixpQkFBaUIsZ0JBQWdCLGlCQUFpQix1QkFBdUIsb0JBQW9CLEdBQUcsMkJBQTJCLDZCQUE2Qix1QkFBdUIsd0JBQXdCLGtCQUFrQixhQUFhLGlCQUFpQixpREFBaUQsS0FBSyxrQkFBa0IscUJBQXFCLDJCQUEyQiw2QkFBNkIsa0JBQWtCLDJGQUEyRixpREFBaUQsd0JBQXdCLG1DQUFtQyxvQ0FBb0MsbUJBQW1CLDBCQUEwQiw0QkFBNEIsR0FBRywwQkFBMEIsb0NBQW9DLEdBQUcsZ0NBQWdDLDZCQUE2QixHQUFHLG9DQUFvQyw2Q0FBNkMsK0JBQStCLEdBQUcsZ0NBQWdDLDZCQUE2QixHQUFHLG9DQUFvQyw2Q0FBNkMsK0JBQStCLEdBQUcsZ0NBQWdDLDZCQUE2QixHQUFHLG9DQUFvQyw2Q0FBNkMsK0JBQStCLEdBQUcsZ0NBQWdDLDZCQUE2QixHQUFHLG9DQUFvQyw2Q0FBNkMsMEJBQTBCLEdBQUcsZ0NBQWdDLDZCQUE2QixHQUFHLG9DQUFvQyw2Q0FBNkMsK0JBQStCLEdBQUcsK0NBQStDLGFBQWEseUJBQXlCLDZCQUE2QixLQUFLLFlBQVksb0JBQW9CLCtDQUErQywwQkFBMEIsNEJBQTRCLEtBQUssY0FBYywrQkFBK0Isb0JBQW9CLEtBQUssVUFBVSxzQkFBc0IsS0FBSyxzQ0FBc0MseUJBQXlCLGdEQUFnRCxlQUFlLHNCQUFzQiwyQkFBMkIsS0FBSyw0Q0FBNEMsaUJBQWlCLEtBQUssNkJBQTZCLHVCQUF1QixvQkFBb0IseUJBQXlCLCtCQUErQixLQUFLLG9CQUFvQiwrQkFBK0IsS0FBSyxHQUFHLHFCQUFxQjtBQUM5OW5CO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7O0FDaEIxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFEQUFxRDtBQUNyRDs7QUFFQTtBQUNBLGdEQUFnRDtBQUNoRDs7QUFFQTtBQUNBLHFGQUFxRjtBQUNyRjs7QUFFQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLEtBQUs7QUFDTCxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIscUJBQXFCO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0ZBQXNGLHFCQUFxQjtBQUMzRztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQ3JHYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0RBQW9EOztBQUVwRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM1QmE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCQSxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFtRztBQUNuRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHNGQUFPOzs7O0FBSTZDO0FBQ3JFLE9BQU8saUVBQWUsc0ZBQU8sSUFBSSw2RkFBYyxHQUFHLDZGQUFjLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUJBQXFCLDZCQUE2QjtBQUNsRDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN2R2E7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDdENhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDVmE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJOztBQUVqRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1hhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRDtBQUNsRDs7QUFFQTtBQUNBLDBDQUEwQztBQUMxQzs7QUFFQTs7QUFFQTtBQUNBLGlGQUFpRjtBQUNqRjs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDZkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOzs7OztXQ3JCQTs7Ozs7Ozs7Ozs7OztBQ0FxQjtBQUNLO0FBRTFCMEMsaURBQUksRUFBRSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvYm90LmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vc3JjL2NhdC5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvaW5pdC5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuaW1wb3J0IHsgY3JlYXRlQ2F0cyB9IGZyb20gXCIuL2NhdFwiO1xuaW1wb3J0IHsgY29tcEJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmZ1bmN0aW9uIHJhbmRvbUluZGV4KGFycmF5KSB7XG4gIHJldHVybiBhcnJheVtNYXRoLmZsb29yKGFycmF5Lmxlbmd0aCAqIE1hdGgucmFuZG9tKCkpXTtcbn1cblxuY29uc3QgY29tcENhdHMgPSBjcmVhdGVDYXRzKCk7XG5cbmZ1bmN0aW9uIGNvbXBQbGFjZUNhdHMoKSB7XG4gIGNvbXBDYXRzLmZvckVhY2goKGNhdCkgPT4ge1xuICAgIGNhdC5yYW5kb21pemVPcmllbnRhdGlvbigpO1xuICAgIGNvbnN0IHBvdGVudGlhbFBsYWNlbWVudHMgPSBjb21wQm9hcmQuZGV0ZXJtaW5lUmVhbEVzdGF0ZShjYXQpO1xuICAgIGNvbnN0IGFycmF5T2ZDb29yZCA9IGNvbXBCb2FyZC5nZXRDb29yZGluYXRlcyhcbiAgICAgIHJhbmRvbUluZGV4KHBvdGVudGlhbFBsYWNlbWVudHMpLFxuICAgICAgY2F0XG4gICAgKTtcbiAgICBjb21wQm9hcmQucGxhY2VDYXQoYXJyYXlPZkNvb3JkLCBjYXQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZGV0ZXJtaW5lT3JpZW50YXRpb24oYXJyYXkpIHtcbiAgcmV0dXJuIGFycmF5WzBdWzBdID09PSBhcnJheVsxXVswXSA/IFwieVwiIDogXCJ4XCI7XG59XG5cbmZ1bmN0aW9uIGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoc3RhcnQsIGJvYXJkSUQsIGNhdCwgYXhpcywgZGlyZWN0aW9uKSB7XG4gIGxldCBhbGxEaXI7XG4gIGNvbnN0IFt4LCB5XSA9IHN0YXJ0O1xuICBjb25zdCB1cCA9ICgpID0+IGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoW3gsIHkgLSAxXSwgYm9hcmRJRCwgY2F0LCBcInlcIiwgLTEpO1xuICBjb25zdCByaWdodCA9ICgpID0+XG4gICAgYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyhbeCArIDEsIHldLCBib2FyZElELCBjYXQsIFwieFwiLCAxKTtcbiAgY29uc3QgZG93biA9ICgpID0+XG4gICAgYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyhbeCwgeSArIDFdLCBib2FyZElELCBjYXQsIFwieVwiLCAxKTtcbiAgY29uc3QgbGVmdCA9ICgpID0+XG4gICAgYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyhbeCAtIDEsIHldLCBib2FyZElELCBjYXQsIFwieFwiLCAtMSk7XG5cbiAgaWYgKHN0YXJ0LnNvbWUoKG51bSkgPT4gbnVtID4gOSB8fCBudW0gPCAwKSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3Qgb3BwQm9hcmRDZWxsID0gYm9hcmRJRC5ib2FyZFtgWyR7c3RhcnR9XWBdO1xuICBpZiAoXG4gICAgb3BwQm9hcmRDZWxsLmF0dGFja2VkICYmXG4gICAgKCFvcHBCb2FyZENlbGwub2NjdXBpZWRCeSB8fCBvcHBCb2FyZENlbGwub2NjdXBpZWRCeSAhPT0gY2F0KVxuICApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoIW9wcEJvYXJkQ2VsbC5hdHRhY2tlZCkgcmV0dXJuIHN0YXJ0O1xuXG4gIGlmIChheGlzKSB7XG4gICAgaWYgKGF4aXMgPT09IFwieFwiKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBhc3Nlc3NBZGphY2VudENvb3JkaW5hdGVzKFxuICAgICAgICAgIFt4ICsgMSAqIGRpcmVjdGlvbiwgeV0sXG4gICAgICAgICAgYm9hcmRJRCxcbiAgICAgICAgICBjYXQsXG4gICAgICAgICAgYXhpcyxcbiAgICAgICAgICBkaXJlY3Rpb25cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGFsbERpciA9IFtsZWZ0KCksIHJpZ2h0KCldO1xuICAgIH0gZWxzZSBpZiAoYXhpcyA9PT0gXCJ5XCIpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoXG4gICAgICAgICAgW3gsIHkgKyAxICogZGlyZWN0aW9uXSxcbiAgICAgICAgICBib2FyZElELFxuICAgICAgICAgIGNhdCxcbiAgICAgICAgICBheGlzLFxuICAgICAgICAgIGRpcmVjdGlvblxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgYWxsRGlyID0gW3VwKCksIGRvd24oKV07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGFsbERpciA9IFt1cCgpLCByaWdodCgpLCBkb3duKCksIGxlZnQoKV07XG4gIH1cbiAgcmV0dXJuIGFsbERpci5maWx0ZXIoKG9wdCkgPT4gb3B0ICE9PSBudWxsKTtcbn1cblxuZnVuY3Rpb24gY29tcEZpcmVTaG90KG9wcG9uZW50Qm9hcmQsIG9wcG9uZW50Q2F0cykge1xuICBjb25zdCB3b3VuZGVkVGFyZ2V0cyA9IFtdO1xuICBsZXQgcG9zc2libGVIaXRzO1xuICBvcHBvbmVudENhdHMuZm9yRWFjaCgoY2F0KSA9PiB7XG4gICAgaWYgKGNhdC5oaXRzID4gMCAmJiAhY2F0LmlzU3VuaygpKSB7XG4gICAgICB3b3VuZGVkVGFyZ2V0cy5wdXNoKGNhdCk7XG4gICAgfVxuICB9KTtcbiAgaWYgKHdvdW5kZWRUYXJnZXRzLmxlbmd0aCkge1xuICAgIGNvbnN0IHByaW1hcnlUYXJnZXQgPSB3b3VuZGVkVGFyZ2V0c1swXTtcbiAgICBpZiAocHJpbWFyeVRhcmdldC5jb29yZEhpdC5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBvcmllbnRhdGlvbiA9IGRldGVybWluZU9yaWVudGF0aW9uKHByaW1hcnlUYXJnZXQuY29vcmRIaXQpO1xuICAgICAgcG9zc2libGVIaXRzID0gYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyhcbiAgICAgICAgcHJpbWFyeVRhcmdldC5jb29yZEhpdFswXSxcbiAgICAgICAgb3Bwb25lbnRCb2FyZCxcbiAgICAgICAgcHJpbWFyeVRhcmdldCxcbiAgICAgICAgb3JpZW50YXRpb25cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvc3NpYmxlSGl0cyA9IGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoXG4gICAgICAgIHByaW1hcnlUYXJnZXQuY29vcmRIaXRbMF0sXG4gICAgICAgIG9wcG9uZW50Qm9hcmQsXG4gICAgICAgIHByaW1hcnlUYXJnZXRcbiAgICAgICk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHBvc3NpYmxlSGl0cyA9IFtdO1xuICAgIE9iamVjdC5rZXlzKG9wcG9uZW50Qm9hcmQuYm9hcmQpLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGlmICghb3Bwb25lbnRCb2FyZC5ib2FyZFtjZWxsXS5hdHRhY2tlZCkge1xuICAgICAgICBwb3NzaWJsZUhpdHMucHVzaChvcHBvbmVudEJvYXJkLmJvYXJkW2NlbGxdLmNvb3JkaW5hdGVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gcG9zc2libGVIaXRzW01hdGguZmxvb3IocG9zc2libGVIaXRzLmxlbmd0aCAqIE1hdGgucmFuZG9tKCkpXTtcbn1cblxuZXhwb3J0IHsgYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcywgY29tcFBsYWNlQ2F0cywgY29tcEZpcmVTaG90LCBjb21wQ2F0cyB9O1xuIiwiY2xhc3MgQ2F0IHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCB0eXBlKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBcInZlcnRpY2FsXCI7XG4gICAgdGhpcy5jb29yZEhpdCA9IFtdO1xuICB9XG5cbiAgaGl0KGNvb3JkKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gICAgdGhpcy5jb29yZEhpdC5wdXNoKGNvb3JkKTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGggPT09IHRoaXMuaGl0cztcbiAgfVxuXG4gIHJvdGF0ZSgpIHtcbiAgICB0aGlzLm9yaWVudGF0aW9uID1cbiAgICAgIHRoaXMub3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIiA/IFwiaG9yaXpvbnRhbFwiIDogXCJ2ZXJ0aWNhbFwiO1xuICB9XG5cbiAgcmFuZG9taXplT3JpZW50YXRpb24oKSB7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IE1hdGgucmFuZG9tKCkgPiAwLjUgPyBcInZlcnRpY2FsXCIgOiBcImhvcml6b250YWxcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDYXRzKCkge1xuICBjb25zdCBjYXQxID0gbmV3IENhdCg1LCBcImJpZyBzdHJldGNoXCIpO1xuICBjb25zdCBjYXQyID0gbmV3IENhdCg0LCBcImRvd253YXJkIGNhdFwiKTtcbiAgY29uc3QgY2F0MyA9IG5ldyBDYXQoMywgXCJzdHVmZiBzdHJ1dHRlclwiKTtcbiAgY29uc3QgY2F0NCA9IG5ldyBDYXQoMiwgXCJxdWFzaSBsb2FmXCIpO1xuICBjb25zdCBjYXQ1ID0gbmV3IENhdCgyLCBcImNvbXBhY3Qga2l0dHlcIik7XG4gIHJldHVybiBbY2F0MSwgY2F0MiwgY2F0MywgY2F0NCwgY2F0NV07XG59XG5cbmV4cG9ydCB7IENhdCwgY3JlYXRlQ2F0cyB9O1xuIiwiLyogZXNsaW50LWRpc2FibGUgZGVmYXVsdC1jYXNlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuaW1wb3J0IGNhdDEgZnJvbSBcIi4vaW1nL2JpZy1zdHJldGNoLnN2Z1wiO1xuaW1wb3J0IGNhdDIgZnJvbSBcIi4vaW1nL2NhdDIuc3ZnXCI7XG5pbXBvcnQgY2F0MyBmcm9tIFwiLi9pbWcvd2Fsay5zdmdcIjtcbmltcG9ydCBjYXQ0IGZyb20gXCIuL2ltZy9xdWFzaS1sb2FmMi5zdmdcIjtcbmltcG9ydCBjYXQ1IGZyb20gXCIuL2ltZy9sZXNSb2xsLnN2Z1wiO1xuaW1wb3J0IHJvdGF0ZUljb24gZnJvbSBcIi4vaW1nL2Zvcm1hdC1yb3RhdGUtOTAuc3ZnXCI7XG5cbmltcG9ydCB7XG4gIGhhbmRsZUNsaWNrLFxuICBwbGF5ZXJCb2FyZCxcbiAgY29tcEJvYXJkLFxuICBnZXRDdXJyZW50Q2F0LFxufSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuaW1wb3J0IHsgYmVnaW5HYW1lLCBjb21wUmV0YWxpYXRpb24gfSBmcm9tIFwiLi9nYW1lXCI7XG5cbmNvbnN0IHBsYXllckJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItYm9hcmQtY29udGFpbmVyXCIpO1xuY29uc3QgcGxheWVyQm9hcmREaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItYm9hcmRcIik7XG5jb25zdCBjb21wQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXAtYm9hcmQtY29udGFpbmVyXCIpO1xuY29uc3QgY29tcEJvYXJkRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcC1ib2FyZFwiKTtcblxuZnVuY3Rpb24gcm90YXRlQ2F0KCkge1xuICBjb25zdCBjdXJyZW50Q2F0ID0gZ2V0Q3VycmVudENhdCgpO1xuICBpZiAoIWN1cnJlbnRDYXQpIHJldHVybjtcbiAgY3VycmVudENhdC5yb3RhdGUoKTtcbiAgcGxheWVyQm9hcmREaXNwbGF5LmNsYXNzTGlzdC50b2dnbGUoXCJob3Jpem9udGFsXCIpO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgaWYgKGUua2V5ID09PSBcIlNoaWZ0XCIpIHtcbiAgICByb3RhdGVDYXQoKTtcbiAgfVxufSk7XG5cbmNvbnN0IHJvdGF0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5jb25zdCByb3RhdGVJbWcgPSBuZXcgSW1hZ2UoKTtcbnJvdGF0ZUltZy5zcmMgPSByb3RhdGVJY29uO1xucm90YXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyb3RhdGUtYnV0dG9uXCIpO1xucm90YXRlQnV0dG9uLmFwcGVuZENoaWxkKHJvdGF0ZUltZyk7XG5yb3RhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgcm90YXRlQ2F0KCk7XG59KTtcbnBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHJvdGF0ZUJ1dHRvbik7XG5cbmZ1bmN0aW9uIGFkZENhdEltZyhkZXN0aW5hdGlvbiwgY3VycmVudENhdCkge1xuICBjb25zdCBjYXRJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgY2F0SW1nLmNsYXNzTGlzdC5hZGQoXCJjYXQtaW1nXCIpO1xuICBzd2l0Y2ggKGN1cnJlbnRDYXQudHlwZSkge1xuICAgIGNhc2UgXCJiaWcgc3RyZXRjaFwiOlxuICAgICAgY2F0SW1nLnNyYyA9IGNhdDE7XG4gICAgICBjYXRJbWcuY2xhc3NMaXN0LmFkZChcImNhdDFcIik7XG4gICAgICBwbGF5ZXJCb2FyZERpc3BsYXkuY2xhc3NOYW1lID0gXCJwbGF5ZXItYm9hcmQgY2F0LXR3b1wiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImRvd253YXJkIGNhdFwiOlxuICAgICAgY2F0SW1nLnNyYyA9IGNhdDI7XG4gICAgICBjYXRJbWcuY2xhc3NMaXN0LmFkZChcImNhdDJcIik7XG4gICAgICBwbGF5ZXJCb2FyZERpc3BsYXkuY2xhc3NOYW1lID0gXCJwbGF5ZXItYm9hcmQgY2F0LXRocmVlXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwic3R1ZmYgc3RydXR0ZXJcIjpcbiAgICAgIGNhdEltZy5zcmMgPSBjYXQzO1xuICAgICAgY2F0SW1nLmNsYXNzTGlzdC5hZGQoXCJjYXQzXCIpO1xuICAgICAgcGxheWVyQm9hcmREaXNwbGF5LmNsYXNzTmFtZSA9IFwicGxheWVyLWJvYXJkIGNhdC1mb3VyXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwicXVhc2kgbG9hZlwiOlxuICAgICAgY2F0SW1nLnNyYyA9IGNhdDQ7XG4gICAgICBjYXRJbWcuY2xhc3NMaXN0LmFkZChcImNhdDRcIik7XG4gICAgICBwbGF5ZXJCb2FyZERpc3BsYXkuY2xhc3NOYW1lID0gXCJwbGF5ZXItYm9hcmQgY2F0LWZpdmVcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJjb21wYWN0IGtpdHR5XCI6XG4gICAgICBjYXRJbWcuc3JjID0gY2F0NTtcbiAgICAgIGNhdEltZy5jbGFzc0xpc3QuYWRkKFwiY2F0NVwiKTtcbiAgICAgIHBsYXllckJvYXJkRGlzcGxheS5jbGFzc05hbWUgPSBcInBsYXllci1ib2FyZFwiO1xuICB9XG4gIGlmIChjdXJyZW50Q2F0Lm9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgIGNhdEltZy5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbC1jYXRcIik7XG4gIH1cbiAgZGVzdGluYXRpb24uYXBwZW5kQ2hpbGQoY2F0SW1nKTtcbn1cblxuZnVuY3Rpb24gYXBwbHlIaXRJbWFnZSh0YXJnZXQsIGJvYXJkSUQsIGNvb3JkKSB7XG4gIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYXR0YWNrZWRcIik7XG4gIGlmIChib2FyZElELmJvYXJkW2BbJHtjb29yZH1dYF0ub2NjdXBpZWRCeSkge1xuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwib2NjdXBpZWRcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tcEdhbWVCb2FyZERpc3BsYXkoKSB7XG4gIGZvciAoY29uc3QgeyBjb29yZGluYXRlcyB9IG9mIE9iamVjdC52YWx1ZXMoY29tcEJvYXJkLmJvYXJkKSkge1xuICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAoIWNvbXBCb2FyZC5ib2FyZFtgWyR7Y29vcmRpbmF0ZXN9XWBdLmF0dGFja2VkKSB7XG4gICAgICAgIGNvbXBCb2FyZC50YWtlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgICAgICAgYXBwbHlIaXRJbWFnZShjZWxsLCBjb21wQm9hcmQsIGNvb3JkaW5hdGVzKTtcbiAgICAgICAgY29tcFJldGFsaWF0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29tcEJvYXJkRGlzcGxheS5hcHBlbmRDaGlsZChjZWxsKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXJHYW1lQm9hcmREaXNwbGF5KCkge1xuICBmb3IgKGNvbnN0IGNvb3JkIG9mIE9iamVjdC52YWx1ZXMocGxheWVyQm9hcmQuYm9hcmQpKSB7XG4gICAgY29uc3Qgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc3BvdC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsXCIpO1xuICAgIHNwb3QuZGF0YXNldC5jb29yZCA9IGNvb3JkLmNvb3JkaW5hdGVzO1xuICAgIHNwb3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRDYXQgPSBnZXRDdXJyZW50Q2F0KCk7XG4gICAgICBpZiAoY3VycmVudENhdCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgY29uc3QgY29vcmRBcnJheSA9IHBsYXllckJvYXJkLmdldENvb3JkaW5hdGVzKFxuICAgICAgICBjb29yZC5jb29yZGluYXRlcyxcbiAgICAgICAgY3VycmVudENhdFxuICAgICAgKTtcbiAgICAgIGlmIChjb29yZEFycmF5KSB7XG4gICAgICAgIGhhbmRsZUNsaWNrKGNvb3JkQXJyYXkpO1xuICAgICAgICBhZGRDYXRJbWcoc3BvdCwgY3VycmVudENhdCk7XG4gICAgICAgIGlmIChjdXJyZW50Q2F0LnR5cGUgPT09IFwiY29tcGFjdCBraXR0eVwiKSB7XG4gICAgICAgICAgcGxheWVyQm9hcmRDb250YWluZXIucmVtb3ZlQ2hpbGQocm90YXRlQnV0dG9uKTtcbiAgICAgICAgICBwbGF5ZXJCb2FyZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzaHJpbmsnKTtcbiAgICAgICAgICBjb21wQm9hcmRDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgICBjcmVhdGVDb21wR2FtZUJvYXJkRGlzcGxheSgpO1xuICAgICAgICAgIGJlZ2luR2FtZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcGxheWVyQm9hcmREaXNwbGF5LmFwcGVuZENoaWxkKHNwb3QpO1xuICB9XG59XG5cbmNvbnN0IGNhdFRyYWNrZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhdC10cmFja2VyXCIpO1xuXG5mdW5jdGlvbiBjcmVhdGVDYXRJbWFnZShzb3VyY2UpIHtcbiAgY29uc3QgY2F0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY2F0LmNsYXNzTGlzdC5hZGQoJ2NhdC10cmFja2VyLWltYWdlJyk7XG4gIGNvbnN0IGNhdEltZyA9IG5ldyBJbWFnZSgpO1xuICBjYXRJbWcuc3JjID0gc291cmNlO1xuICBjYXQuYXBwZW5kQ2hpbGQoY2F0SW1nKTtcbiAgcmV0dXJuIGNhdDtcbn1cblxuY29uc3QgY2F0MXRyYWNrZXIgPSBjcmVhdGVDYXRJbWFnZShjYXQxKTtcbmNvbnN0IGNhdDJ0cmFja2VyID0gY3JlYXRlQ2F0SW1hZ2UoY2F0Mik7XG5jb25zdCBjYXQzdHJhY2tlciA9IGNyZWF0ZUNhdEltYWdlKGNhdDMpO1xuY29uc3QgY2F0NHRyYWNrZXIgPSBjcmVhdGVDYXRJbWFnZShjYXQ0KTtcbmNvbnN0IGNhdDV0cmFja2VyID0gY3JlYXRlQ2F0SW1hZ2UoY2F0NSk7XG5cbmNhdFRyYWNrZXIuYXBwZW5kKFxuICBjYXQxdHJhY2tlcixcbiAgY2F0MnRyYWNrZXIsXG4gIGNhdDN0cmFja2VyLFxuICBjYXQ0dHJhY2tlcixcbiAgY2F0NXRyYWNrZXJcbik7XG5cbmV4cG9ydCB7XG4gIGNyZWF0ZVBsYXllckdhbWVCb2FyZERpc3BsYXksXG4gIGNyZWF0ZUNvbXBHYW1lQm9hcmREaXNwbGF5LFxuICBhZGRDYXRJbWcsXG4gIGFwcGx5SGl0SW1hZ2UsXG59O1xuIiwiaW1wb3J0IHsgYXBwbHlIaXRJbWFnZSB9IGZyb20gJy4vZG9tJztcbmltcG9ydCB7IGNvbXBQbGFjZUNhdHMsIGNvbXBGaXJlU2hvdCwgY29tcENhdHMgfSBmcm9tICcuL2JvdCc7XG5pbXBvcnQgeyBwbGF5ZXJCb2FyZCwgcGxheWVyQ2F0cywgY29tcEJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQuanMnO1xuXG5mdW5jdGlvbiBiZWdpbkdhbWUoKSB7XG4gIGNvbXBQbGFjZUNhdHMoKTtcbn1cblxuZnVuY3Rpb24gY29tcFJldGFsaWF0aW9uKCkge1xuICBjb25zb2xlLmxvZyhwbGF5ZXJCb2FyZCk7XG4gIGNvbnN0IHRhcmdldCA9IGNvbXBGaXJlU2hvdChwbGF5ZXJCb2FyZCwgcGxheWVyQ2F0cyk7XG4gIGNvbnNvbGUubG9nKHRhcmdldCk7XG4gIHBsYXllckJvYXJkLnRha2VBdHRhY2sodGFyZ2V0KTtcbiAgY29uc3QgZGF0YUlEID0gYFtkYXRhLWNvb3JkPScke3RhcmdldH0nXWBcbiAgY29uc29sZS5sb2coZGF0YUlEKTtcbiAgY29uc3QgZG9tQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZGF0YUlEKTtcbiAgYXBwbHlIaXRJbWFnZShkb21DZWxsLCBwbGF5ZXJCb2FyZCwgdGFyZ2V0KTtcbn1cblxuZXhwb3J0IHsgYmVnaW5HYW1lLCBjb21wUmV0YWxpYXRpb24gfSIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5cbmltcG9ydCB7IGNyZWF0ZUNhdHMgfSBmcm9tIFwiLi9jYXRcIjtcblxuY29uc3QgcGxhY2UgPSAoc3RhdGUpID0+ICh7XG4gIHBsYWNlQ2F0OiAoY29vcmRpbmF0ZXMsIGNhdCkgPT4ge1xuICAgIGNvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgIHN0YXRlLmJvYXJkW2BbJHtjb29yZGluYXRlfV1gXS5vY2N1cGllZEJ5ID0gY2F0O1xuICAgIH0pO1xuICB9LFxufSk7XG5cbmNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoc3RhdGUpID0+ICh7XG4gIHRha2VBdHRhY2s6IChjb29yZCkgPT4ge1xuICAgIGNvbnN0IGNlbGwgPSBzdGF0ZS5ib2FyZFtgWyR7Y29vcmR9XWBdO1xuICAgIGlmIChjZWxsLmF0dGFja2VkKSByZXR1cm47XG4gICAgaWYgKGNlbGwub2NjdXBpZWRCeSkge1xuICAgICAgY2VsbC5vY2N1cGllZEJ5LmhpdChjb29yZCk7XG4gICAgfVxuICAgIGNlbGwuYXR0YWNrZWQgPSB0cnVlO1xuICB9LFxufSk7XG5cbmNvbnN0IGNvb3JkSW52YWxpZCA9IChzdGF0ZSkgPT4gKHtcbiAgY29vcmRpbmF0ZXNBcmVJbnZhbGlkOiAoYXJyYXkpID0+XG4gICAgYXJyYXkuZmxhdCgpLnNvbWUoKGl0ZW0pID0+IGl0ZW0gPCAwIHx8IGl0ZW0gPiA5KSB8fFxuICAgIGFycmF5LnNvbWUoKGl0ZW0pID0+IHN0YXRlLmJvYXJkW2BbJHtpdGVtfV1gXS5vY2N1cGllZEJ5KSxcbn0pO1xuXG5jb25zdCBnZXRDb29yZCA9IChzdGF0ZSkgPT4gKHtcbiAgZ2V0Q29vcmRpbmF0ZXM6IChjb29yZCwgY2F0KSA9PiB7XG4gICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICBjb25zdCBbeCwgeV0gPSBjb29yZDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGNhdC5vcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAgIGFycmF5LnB1c2goW3gsIHkgKyBpXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheS5wdXNoKFt4ICsgaSwgeV0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3RhdGUuY29vcmRpbmF0ZXNBcmVJbnZhbGlkKGFycmF5KSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGFycmF5O1xuICB9LFxufSk7XG5cbmNvbnN0IGNlbGxBc3Nlc3NtZW50ID0gKHN0YXRlKSA9PiAoe1xuICBkZXRlcm1pbmVSZWFsRXN0YXRlOiAoeyBsZW5ndGgsIG9yaWVudGF0aW9uIH0pID0+IHtcbiAgICBjb25zdCBsaW1pdCA9IDEwIC0gbGVuZ3RoO1xuICAgIGNvbnN0IGFycmF5ID0gW107XG4gICAgbGV0IHggPSAxMDtcbiAgICBsZXQgeSA9IDEwO1xuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICB5ID0gbGltaXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSBsaW1pdDtcbiAgICB9XG4gICAgZm9yIChsZXQgaCA9IDA7IGggPCB4OyBoKyspIHtcbiAgICAgIGZvciAobGV0IHYgPSAwOyB2IDwgeTsgdisrKSB7XG4gICAgICAgIGFycmF5LnB1c2goW2gsIHZdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgYXJyYXlNaW51c092ZXJsYXAgPSBhcnJheS5maWx0ZXIoKGNlbGwpID0+XG4gICAgICBzdGF0ZS5nZXRDb29yZGluYXRlcyhjZWxsLCB7IGxlbmd0aCwgb3JpZW50YXRpb24gfSlcbiAgICApO1xuICAgIHJldHVybiBhcnJheU1pbnVzT3ZlcmxhcDtcbiAgfSxcbn0pO1xuXG5mdW5jdGlvbiBjcmVhdGVTcG90KHgsIHkpIHtcbiAgcmV0dXJuIHtcbiAgICBjb29yZGluYXRlczogW3gsIHldLFxuICAgIG9jY3VwaWVkQnk6IG51bGwsXG4gICAgYXR0YWNrZWQ6IGZhbHNlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVHYW1lQm9hcmQoKSB7XG4gIGNvbnN0IGdhbWVCb2FyZCA9IHt9O1xuICBnYW1lQm9hcmQuYm9hcmQgPSB7fTtcbiAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSArPSAxKSB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCArPSAxKSB7XG4gICAgICBnYW1lQm9hcmQuYm9hcmRbYFske3h9LCR7eX1dYF0gPSBjcmVhdGVTcG90KHgsIHkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICBnYW1lQm9hcmQsXG4gICAgcGxhY2UoZ2FtZUJvYXJkKSxcbiAgICByZWNlaXZlQXR0YWNrKGdhbWVCb2FyZCksXG4gICAgY29vcmRJbnZhbGlkKGdhbWVCb2FyZCksXG4gICAgZ2V0Q29vcmQoZ2FtZUJvYXJkKVxuICApO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wR2FtZUJvYXJkKCkge1xuICBjb25zdCBnYW1lQm9hcmQgPSBjcmVhdGVHYW1lQm9hcmQoKTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZ2FtZUJvYXJkLCBjZWxsQXNzZXNzbWVudChnYW1lQm9hcmQpKTtcbn1cblxuY29uc3QgcGxheWVyQm9hcmQgPSBjcmVhdGVHYW1lQm9hcmQoKTtcblxuY29uc3QgY29tcEJvYXJkID0gY3JlYXRlQ29tcEdhbWVCb2FyZCgpO1xuXG5jb25zdCBwbGF5ZXJDYXRzID0gY3JlYXRlQ2F0cygpO1xuXG5sZXQgY2F0c1BsYWNlZCA9IDA7XG5sZXQgY3VycmVudENhdDtcblxuZnVuY3Rpb24gZ2V0Q3VycmVudENhdCgpIHtcbiAgaWYgKGNhdHNQbGFjZWQgPj0gNSkgcmV0dXJuIG51bGw7XG4gIHJldHVybiBwbGF5ZXJDYXRzW2NhdHNQbGFjZWRdO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVDbGljayhjb29yZGluYXRlcykge1xuICBjdXJyZW50Q2F0ID0gZ2V0Q3VycmVudENhdCgpO1xuICBwbGF5ZXJCb2FyZC5wbGFjZUNhdChjb29yZGluYXRlcywgY3VycmVudENhdCk7XG4gIGNhdHNQbGFjZWQgKz0gMTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlR2FtZUJvYXJkLCBoYW5kbGVDbGljaywgcGxheWVyQm9hcmQsIGNvbXBCb2FyZCwgZ2V0Q3VycmVudENhdCwgcGxheWVyQ2F0cyB9O1xuIiwiaW1wb3J0IHsgY3JlYXRlUGxheWVyR2FtZUJvYXJkRGlzcGxheSB9IGZyb20gJy4vZG9tJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KCkge1xuICBjcmVhdGVQbGF5ZXJHYW1lQm9hcmREaXNwbGF5KCk7XG59IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vZm9udC9jb21mb3J0YWEtdmFyaWFibGVmb250X3dnaHQtd2ViZm9udC53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4vZm9udC9jb21mb3J0YWEtdmFyaWFibGVmb250X3dnaHQtd2ViZm9udC53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18gPSBuZXcgVVJMKFwiLi9pbWcvZ3JyYXNzLmpwZWdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyA9IG5ldyBVUkwoXCIuL2ltZy9wZXhlbHMtcGl4bWlrZS00MTMxOTUuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ2NvbWZ5JztcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKSBmb3JtYXQoJ3dvZmYyJyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5cXG46cm9vdCB7XFxuICAtLWJhY2tncm91bmQ6ICMyODJhMzY7XFxuICAtLWJvYXJkLXNpemU6IG1pbig2MHZ3LCA1MDBweCk7XFxuICAtLWNlbGwtc2l6ZTogY2FsYyh2YXIoLS1ib2FyZC1zaXplKSAvIDEwKTtcXG4gIC0tY2VsbC1zaXplMjogNTBweDtcXG4gIC0tY2F0LXRyYWNrZXItc2l6ZTogY2FsYyh2YXIoLS1ib2FyZC1zaXplKSAqIDAuNCk7XFxuICAtLWNhdC10cmFja2VyLWNlbGw6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDAuNzUpO1xcbiAgLS1sb2dvLWJhbGwtc2l6ZTogNzVweDtcXG4gIC0tc2hyaW5rLXNjYWxlOiBjYWxjKCgoMTAwdncgLSB2YXIoLS1ib2FyZC1zaXplKSkgLyAyKSAvIHZhcigtLWJvYXJkLXNpemUpKTtcXG59XFxuXFxuYm9keSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogMTAwcHggMWZyIC8gMWZyO1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gKyBcIik7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1zaXplOiA0MDBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLnRpdGxlIHtcXG4gIGdyaWQtYXJlYTogMSAvIDEgLyAyIC8gLTI7XFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxuICBoZWlnaHQ6IHZhcigtLWxvZ28tYmFsbC1zaXplKTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmciAxZnI7XFxufVxcblxcbi50aXRsZSAuYmFsbDpudGgtY2hpbGQoNCkge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAyO1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcblxcbi50aXRsZSAuYmFsbDpudGgtY2hpbGQoMykge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMiAvIDIgLyAzO1xcbn1cXG5cXG4udGl0bGUgLmJhbGw6bnRoLWNoaWxkKDIpIHtcXG4gIGdyaWQtYXJlYTogMSAvIDMgLyAyIC8gNDtcXG59XFxuXFxuLnRpdGxlIC5iYWxsOm50aC1jaGlsZCgxKSB7XFxuICBncmlkLWFyZWE6IDEgLyA0IC8gMiAvIDU7XFxufVxcblxcbi5iYWxsIHtcXG4gIGJveC1zaGFkb3c6IDFweCAxcHggOHB4IHJnYigyNTUsIDE0MCwgMCk7XFxuICBtYXJnaW4tbGVmdDogY2FsYyh2YXIoLS1sb2dvLWJhbGwtc2l6ZSkgKiAtMC41KTtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgaGVpZ2h0OiB2YXIoLS1sb2dvLWJhbGwtc2l6ZSk7XFxuICB3aWR0aDogdmFyKC0tbG9nby1iYWxsLXNpemUpO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGhzbCgzOSwgMTAwJSwgNTglKSwgaHNsKDM5LCAxMDAlLCA1MCUpKTtcXG59XFxuXFxuLndvcmRzIHtcXG4gIGdyaWQtYXJlYTogMSAvIDEgLyAyIC8gLTE7XFxuXFxufVxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG4gIGZvbnQtZmFtaWx5OiBjb21meSwgVmVyZGFuYSwgR2VuZXZhLCBUYWhvbWEsIHNhbnMtc2VyaWY7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQtY29udGFpbmVyIHtcXG4gIGdyaWQtYXJlYTogMiAvIDEgLyAzIC8gMjtcXG4gIHRyYW5zaXRpb246IDAuM3M7XFxuICBtYXJnaW46IGF1dG87XFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxuICBoZWlnaHQ6IG1pbi1jb250ZW50O1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xcbiAgei1pbmRleDogMztcXG59XFxuXFxuLnBsYXllci1ib2FyZCwgXFxuLmNvbXAtYm9hcmQge1xcbiAgLyogYm94LXNpemluZzogYm9yZGVyLWJveDsgKi9cXG4gIHdpZHRoOiB2YXIoLS1ib2FyZC1zaXplKTtcXG4gIGhlaWdodDogdmFyKC0tYm9hcmQtc2l6ZSk7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDEwLCBhdXRvKSAvIHJlcGVhdCgxMCwgYXV0byk7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fICsgXCIpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogdmFyKC0tY2VsbC1zaXplKSB2YXIoLS1jZWxsLXNpemUpO1xcbn1cXG5cXG4uZ3JpZC1jZWxsIHtcXG4gIHotaW5kZXg6IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYm9yZGVyOiAwLjVweCBzb2xpZCByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMTY0KTtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5jb21wLWJvYXJkIC5ncmlkLWNlbGw6aG92ZXIge1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCA1MHB4IHJnYigyNTUsIDEyMywgMCk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQ2Mik7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuY2F0LW9uZSAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNSk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuaG9yaXpvbnRhbC5jYXQtb25lIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA1KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtdHdvIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5ob3Jpem9udGFsLmNhdC10d28gLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDQpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmNhdC10aHJlZSAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMyk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuaG9yaXpvbnRhbC5jYXQtdGhyZWUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmNhdC1mb3VyIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyLFxcbi5wbGF5ZXItYm9hcmQuY2F0LWZpdmUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmhvcml6b250YWwuY2F0LWZvdXIgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIsXFxuLnBsYXllci1ib2FyZC5ob3Jpem9udGFsLmNhdC1maXZlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuc2hyaW5rIHtcXG4gIC8qIC0tc2hyaW5rLXNjYWxlOiAwLjM7ICovXFxuICBzY2FsZTogdmFyKC0tc2hyaW5rLXNjYWxlKTtcXG4gIHRyYW5zbGF0ZTogY2FsYygtNDh2dyArICgodmFyKC0tYm9hcmQtc2l6ZSkgKiB2YXIoLS1zaHJpbmstc2NhbGUpKSAqIDEuNikpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbms6aG92ZXIge1xcbiAgc2NhbGU6IC43NTtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4uY2F0LWltZyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDNweDtcXG4gIHJvdGF0ZTogLTkwZGVnO1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuLmNhdDEge1xcbiAgcmlnaHQ6IC0xMHB4O1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA1KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoNS41LCA0KTtcXG59XFxuXFxuLmNhdDEuaG9yaXpvbnRhbC1jYXQge1xcbiAgdG9wOiA1cHg7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNSk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDMuOCwgMi43KTtcXG59XFxuXFxuLmNhdDIge1xcbiAgdG9wOiA1cHg7XFxuICBsZWZ0OiAtNXB4O1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoNC4zLCAyLjUpO1xcbn1cXG5cXG4uY2F0Mi5ob3Jpem9udGFsLWNhdCB7XFxuICB0b3A6IC0zcHg7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNCk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIuOSwgMS43KTtcXG59XFxuXFxuLmNhdDMge1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMyk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDMuNSwgMi41KTtcXG59XFxuXFxuLmNhdDMuaG9yaXpvbnRhbC1jYXQge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLjUsIDEuOCk7XFxufVxcblxcbi5jYXQ0IHtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLCAyKTtcXG59XFxuXFxuLmNhdDQuaG9yaXpvbnRhbC1jYXQge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xcbn1cXG5cXG4uY2F0NSB7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMiwgMS41KTtcXG59XFxuXFxuLmNhdDUuaG9yaXpvbnRhbC1jYXQge1xcbiAgd2lkdGg6IGNhbGMoKHZhcigtLWNlbGwtc2l6ZSkgKiAyKSk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuNSwgMS4xKTtcXG59XFxuXFxuLmhvcml6b250YWwtY2F0IHtcXG4gIHRvcDogMHB4O1xcbiAgbGVmdDogMHB4O1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgcm90YXRlOiAwZGVnO1xcbn1cXG5cXG4uZ3JpZC1jZWxsLmF0dGFja2VkIHtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggMTVweCBvcmFuZ2U7XFxufVxcblxcbi5ncmlkLWNlbGwuYXR0YWNrZWQ6OmJlZm9yZSB7XFxuICB6LWluZGV4OiAxO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY29udGVudDogJyc7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpIC8gMyk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAvMyk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMTY2LCAwLCAwLjY5OCk7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBpbnNldDogMDtcXG4gIG1hcmdpbjogYXV0bztcXG59XFxuXFxuLmdyaWQtY2VsbC5hdHRhY2tlZC5vY2N1cGllZDo6YmVmb3JlIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLyAxLjUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLyAxLjUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xcbn1cXG5cXG4ucm90YXRlLWJ1dHRvbiB7XFxuICBhcHBlYXJhbmNlOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgd2lkdGg6IDMwcHg7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5jb21wLWJvYXJkLWNvbnRhaW5lciB7XFxuICBncmlkLWFyZWE6IDIgLyAxIC8gMyAvIDI7XFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxuICBoZWlnaHQ6IG1pbi1jb250ZW50O1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGluc2V0OiAwO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgLyogbWFyZ2luLXRvcDogY2FsYyh2YXIoLS1ib2FyZC1zaXplKSAqIC0xKTsgKi9cXG59XFxuXFxuLmNhdC10cmFja2VyIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICAvKiBwb3NpdGlvbjogYWJzb2x1dGU7ICovXFxuICB0b3A6IHZhcigtLWJvYXJkLXNpemUpO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCg0LCB2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSkgLyByZXBlYXQoNSwgdmFyKC0tY2F0LXRyYWNrZXItY2VsbCkpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQwNSk7XFxuICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbiAgd2lkdGg6IHZhcigtLWNhdC10cmFja2VyLXNpemUpO1xcbiAgaGVpZ2h0OiB2YXIoLS1jYXQtdHJhY2tlci1zaXplKTtcXG4gIGZsZXg6IDAgMCBhdXRvO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5jYXQtdHJhY2tlciBkaXYgaW1nIHtcXG4gIGhlaWdodDogdmFyKC0tY2F0LXRyYWNrZXItY2VsbCk7XFxufVxcblxcbi5jYXQtdHJhY2tlciA6bnRoLWNoaWxkKDEpIHtcXG4gIGdyaWQtYXJlYTogMSAvIDEgLyAyIC8gMjtcXG59XFxuXFxuLmNhdC10cmFja2VyIDpudGgtY2hpbGQoMSkgaW1nIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLWNlbGwpICogNSk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDMuOCwgMi43KTtcXG59XFxuXFxuLmNhdC10cmFja2VyIDpudGgtY2hpbGQoMikge1xcbiAgZ3JpZC1hcmVhOiAyIC8gMSAvIDMgLyAyO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgOm50aC1jaGlsZCgyKSBpbWcge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItY2VsbCkgKiA0KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi45LCAxLjcpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgOm50aC1jaGlsZCgzKSB7XFxuICBncmlkLWFyZWE6IDMgLyAxIC8gNCAvIDI7XFxufVxcblxcbi5jYXQtdHJhY2tlciA6bnRoLWNoaWxkKDMpIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDMpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLjUsIDEuOCk7XFxufVxcblxcbi5jYXQtdHJhY2tlciA6bnRoLWNoaWxkKDQpIHtcXG4gIGdyaWQtYXJlYTogNCAvIDEgLyA1IC8gMjtcXG59XFxuXFxuLmNhdC10cmFja2VyIDpudGgtY2hpbGQoNCkgaW1nIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLWNlbGwpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuNSk7XFxufVxcblxcbi5jYXQtdHJhY2tlciA6bnRoLWNoaWxkKDUpIHtcXG4gIGdyaWQtYXJlYTogNCAvIDMgLyA1IC8gNTtcXG59XFxuXFxuLmNhdC10cmFja2VyIDpudGgtY2hpbGQoNSkgaW1nIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLWNlbGwpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuNSwgMS4xKTtcXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xcblxcbiAgOnJvb3Qge1xcbiAgICAtLWJvYXJkLXNpemU6IDkwdnc7XFxuICAgIC0tbG9nby1iYWxsLXNpemU6IDUwcHg7XFxuICB9XFxuXFxuICBib2R5IHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZTogNXZoIDFmciAxLjVmciAvIDUwdncgNTB2dztcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgfVxcblxcbiAgLnRpdGxlIHtcXG4gICAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAzO1xcbiAgICBtYXJnaW4tdG9wOiAwO1xcbiAgfVxcblxcbiAgaDEge1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICB9XFxuXFxuICAucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbmsge1xcbiAgICAtLWJvYXJkLXNpemU6IDQwdnc7XFxuICAgIC0tY2VsbC1zaXplOiBjYWxjKHZhcigtLWJvYXJkLXNpemUpIC8gMTApO1xcbiAgICBzY2FsZTogMTtcXG4gICAgdHJhbnNsYXRlOiBub25lO1xcbiAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG4gIH1cXG5cXG4gIC5wbGF5ZXItYm9hcmQtY29udGFpbmVyLnNocmluazpob3ZlciB7XFxuICAgIHNjYWxlOiAxLjU7XFxuICB9XFxuXFxuICAuY29tcC1ib2FyZC1jb250YWluZXIge1xcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGdyaWQtYXJlYTogMyAvIDEgLyA0IC8gMztcXG4gIH1cXG5cXG4gIC5jYXQtdHJhY2tlciB7XFxuICAgIGdyaWQtYXJlYTogMiAvIDIgLyAzIC8gMztcXG4gIH1cXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLG9CQUFvQjtFQUNwQjswREFDdUU7RUFDdkUsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQiw4QkFBOEI7RUFDOUIseUNBQXlDO0VBQ3pDLGtCQUFrQjtFQUNsQixpREFBaUQ7RUFDakQsaURBQWlEO0VBQ2pELHNCQUFzQjtFQUN0QiwyRUFBMkU7QUFDN0U7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O0VBQ0Usd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0Usd0NBQXdDO0VBQ3hDLDBCQUEwQjtBQUM1Qjs7QUFFQTs7RUFFRTtJQUNFLGtCQUFrQjtJQUNsQixzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxhQUFhO0lBQ2Isd0NBQXdDO0lBQ3hDLG1CQUFtQjtJQUNuQixxQkFBcUI7RUFDdkI7O0VBRUE7SUFDRSx3QkFBd0I7SUFDeEIsYUFBYTtFQUNmOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLGtCQUFrQjtJQUNsQix5Q0FBeUM7SUFDekMsUUFBUTtJQUNSLGVBQWU7SUFDZixvQkFBb0I7RUFDdEI7O0VBRUE7SUFDRSxVQUFVO0VBQ1o7O0VBRUE7SUFDRSxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLGtCQUFrQjtJQUNsQix3QkFBd0I7RUFDMUI7O0VBRUE7SUFDRSx3QkFBd0I7RUFDMUI7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnY29tZnknO1xcbiAgc3JjOiB1cmwoJy4vZm9udC9jb21mb3J0YWEtdmFyaWFibGVmb250X3dnaHQtd2ViZm9udC53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcXG4gICAgdXJsKCcuL2ZvbnQvY29tZm9ydGFhLXZhcmlhYmxlZm9udF93Z2h0LXdlYmZvbnQud29mZicpIGZvcm1hdCgnd29mZicpO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXFxuOnJvb3Qge1xcbiAgLS1iYWNrZ3JvdW5kOiAjMjgyYTM2O1xcbiAgLS1ib2FyZC1zaXplOiBtaW4oNjB2dywgNTAwcHgpO1xcbiAgLS1jZWxsLXNpemU6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgLyAxMCk7XFxuICAtLWNlbGwtc2l6ZTI6IDUwcHg7XFxuICAtLWNhdC10cmFja2VyLXNpemU6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiAwLjQpO1xcbiAgLS1jYXQtdHJhY2tlci1jZWxsOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAwLjc1KTtcXG4gIC0tbG9nby1iYWxsLXNpemU6IDc1cHg7XFxuICAtLXNocmluay1zY2FsZTogY2FsYygoKDEwMHZ3IC0gdmFyKC0tYm9hcmQtc2l6ZSkpIC8gMikgLyB2YXIoLS1ib2FyZC1zaXplKSk7XFxufVxcblxcbmJvZHkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IDEwMHB4IDFmciAvIDFmcjtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXG4gIGhlaWdodDogMTAwdmg7XFxuICB3aWR0aDogMTAwdnc7XFxuICBiYWNrZ3JvdW5kOiB1cmwoJy4vaW1nL2dycmFzcy5qcGVnJyk7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1zaXplOiA0MDBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLnRpdGxlIHtcXG4gIGdyaWQtYXJlYTogMSAvIDEgLyAyIC8gLTI7XFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxuICBoZWlnaHQ6IHZhcigtLWxvZ28tYmFsbC1zaXplKTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmciAxZnI7XFxufVxcblxcbi50aXRsZSAuYmFsbDpudGgtY2hpbGQoNCkge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAyO1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcblxcbi50aXRsZSAuYmFsbDpudGgtY2hpbGQoMykge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMiAvIDIgLyAzO1xcbn1cXG5cXG4udGl0bGUgLmJhbGw6bnRoLWNoaWxkKDIpIHtcXG4gIGdyaWQtYXJlYTogMSAvIDMgLyAyIC8gNDtcXG59XFxuXFxuLnRpdGxlIC5iYWxsOm50aC1jaGlsZCgxKSB7XFxuICBncmlkLWFyZWE6IDEgLyA0IC8gMiAvIDU7XFxufVxcblxcbi5iYWxsIHtcXG4gIGJveC1zaGFkb3c6IDFweCAxcHggOHB4IHJnYigyNTUsIDE0MCwgMCk7XFxuICBtYXJnaW4tbGVmdDogY2FsYyh2YXIoLS1sb2dvLWJhbGwtc2l6ZSkgKiAtMC41KTtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgaGVpZ2h0OiB2YXIoLS1sb2dvLWJhbGwtc2l6ZSk7XFxuICB3aWR0aDogdmFyKC0tbG9nby1iYWxsLXNpemUpO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGhzbCgzOSwgMTAwJSwgNTglKSwgaHNsKDM5LCAxMDAlLCA1MCUpKTtcXG59XFxuXFxuLndvcmRzIHtcXG4gIGdyaWQtYXJlYTogMSAvIDEgLyAyIC8gLTE7XFxuXFxufVxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG4gIGZvbnQtZmFtaWx5OiBjb21meSwgVmVyZGFuYSwgR2VuZXZhLCBUYWhvbWEsIHNhbnMtc2VyaWY7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQtY29udGFpbmVyIHtcXG4gIGdyaWQtYXJlYTogMiAvIDEgLyAzIC8gMjtcXG4gIHRyYW5zaXRpb246IDAuM3M7XFxuICBtYXJnaW46IGF1dG87XFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxuICBoZWlnaHQ6IG1pbi1jb250ZW50O1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xcbiAgei1pbmRleDogMztcXG59XFxuXFxuLnBsYXllci1ib2FyZCwgXFxuLmNvbXAtYm9hcmQge1xcbiAgLyogYm94LXNpemluZzogYm9yZGVyLWJveDsgKi9cXG4gIHdpZHRoOiB2YXIoLS1ib2FyZC1zaXplKTtcXG4gIGhlaWdodDogdmFyKC0tYm9hcmQtc2l6ZSk7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDEwLCBhdXRvKSAvIHJlcGVhdCgxMCwgYXV0byk7XFxuICBiYWNrZ3JvdW5kOiB1cmwoJy4vaW1nL3BleGVscy1waXhtaWtlLTQxMzE5NS5qcGcnKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IHZhcigtLWNlbGwtc2l6ZSkgdmFyKC0tY2VsbC1zaXplKTtcXG59XFxuXFxuLmdyaWQtY2VsbCB7XFxuICB6LWluZGV4OiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJvcmRlcjogMC41cHggc29saWQgcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjE2NCk7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnBsYXllci1ib2FyZCB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uY29tcC1ib2FyZCAuZ3JpZC1jZWxsOmhvdmVyIHtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggNTBweCByZ2IoMjU1LCAxMjMsIDApO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICBjb250ZW50OiAnJztcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40NjIpO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmNhdC1vbmUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmhvcml6b250YWwuY2F0LW9uZSAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNSk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuY2F0LXR3byAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNCk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuaG9yaXpvbnRhbC5jYXQtdHdvIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtdGhyZWUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmhvcml6b250YWwuY2F0LXRocmVlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtZm91ciAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlcixcXG4ucGxheWVyLWJvYXJkLmNhdC1maXZlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5ob3Jpem9udGFsLmNhdC1mb3VyIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyLFxcbi5wbGF5ZXItYm9hcmQuaG9yaXpvbnRhbC5jYXQtZml2ZSAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQtY29udGFpbmVyLnNocmluayB7XFxuICAvKiAtLXNocmluay1zY2FsZTogMC4zOyAqL1xcbiAgc2NhbGU6IHZhcigtLXNocmluay1zY2FsZSk7XFxuICB0cmFuc2xhdGU6IGNhbGMoLTQ4dncgKyAoKHZhcigtLWJvYXJkLXNpemUpICogdmFyKC0tc2hyaW5rLXNjYWxlKSkgKiAxLjYpKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuc2hyaW5rOmhvdmVyIHtcXG4gIHNjYWxlOiAuNzU7XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmNhdC1pbWcge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAzcHg7XFxuICByb3RhdGU6IC05MGRlZztcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbi5jYXQxIHtcXG4gIHJpZ2h0OiAtMTBweDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNSk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDUuNSwgNCk7XFxufVxcblxcbi5jYXQxLmhvcml6b250YWwtY2F0IHtcXG4gIHRvcDogNXB4O1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjgsIDIuNyk7XFxufVxcblxcbi5jYXQyIHtcXG4gIHRvcDogNXB4O1xcbiAgbGVmdDogLTVweDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNCk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDQuMywgMi41KTtcXG59XFxuXFxuLmNhdDIuaG9yaXpvbnRhbC1jYXQge1xcbiAgdG9wOiAtM3B4O1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDQpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLjksIDEuNyk7XFxufVxcblxcbi5jYXQzIHtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjUsIDIuNSk7XFxufVxcblxcbi5jYXQzLmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi41LCAxLjgpO1xcbn1cXG5cXG4uY2F0NCB7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMiwgMik7XFxufVxcblxcbi5jYXQ0Lmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41KTtcXG59XFxuXFxuLmNhdDUge1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIsIDEuNSk7XFxufVxcblxcbi5jYXQ1Lmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKCh2YXIoLS1jZWxsLXNpemUpICogMikpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUsIDEuMSk7XFxufVxcblxcbi5ob3Jpem9udGFsLWNhdCB7XFxuICB0b3A6IDBweDtcXG4gIGxlZnQ6IDBweDtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHJvdGF0ZTogMGRlZztcXG59XFxuXFxuLmdyaWQtY2VsbC5hdHRhY2tlZCB7XFxuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDE1cHggb3JhbmdlO1xcbn1cXG5cXG4uZ3JpZC1jZWxsLmF0dGFja2VkOjpiZWZvcmUge1xcbiAgei1pbmRleDogMTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAvIDMpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLzMpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDE2NiwgMCwgMC42OTgpO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgaW5zZXQ6IDA7XFxuICBtYXJnaW46IGF1dG87XFxufVxcblxcbi5ncmlkLWNlbGwuYXR0YWNrZWQub2NjdXBpZWQ6OmJlZm9yZSB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpIC8gMS41KTtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpIC8gMS41KTtcXG4gIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcXG59XFxuXFxuLnJvdGF0ZS1idXR0b24ge1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHdpZHRoOiAzMHB4O1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uY29tcC1ib2FyZC1jb250YWluZXIge1xcbiAgZ3JpZC1hcmVhOiAyIC8gMSAvIDMgLyAyO1xcbiAgd2lkdGg6IG1pbi1jb250ZW50O1xcbiAgaGVpZ2h0OiBtaW4tY29udGVudDtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBpbnNldDogMDtcXG4gIG1hcmdpbjogYXV0bztcXG4gIC8qIG1hcmdpbi10b3A6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiAtMSk7ICovXFxufVxcblxcbi5jYXQtdHJhY2tlciB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgLyogcG9zaXRpb246IGFic29sdXRlOyAqL1xcbiAgdG9wOiB2YXIoLS1ib2FyZC1zaXplKTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoNCwgdmFyKC0tY2F0LXRyYWNrZXItY2VsbCkpIC8gcmVwZWF0KDUsIHZhcigtLWNhdC10cmFja2VyLWNlbGwpKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40MDUpO1xcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcXG4gIHdpZHRoOiB2YXIoLS1jYXQtdHJhY2tlci1zaXplKTtcXG4gIGhlaWdodDogdmFyKC0tY2F0LXRyYWNrZXItc2l6ZSk7XFxuICBmbGV4OiAwIDAgYXV0bztcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgZGl2IGltZyB7XFxuICBoZWlnaHQ6IHZhcigtLWNhdC10cmFja2VyLWNlbGwpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgOm50aC1jaGlsZCgxKSB7XFxuICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDI7XFxufVxcblxcbi5jYXQtdHJhY2tlciA6bnRoLWNoaWxkKDEpIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDUpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjgsIDIuNyk7XFxufVxcblxcbi5jYXQtdHJhY2tlciA6bnRoLWNoaWxkKDIpIHtcXG4gIGdyaWQtYXJlYTogMiAvIDEgLyAzIC8gMjtcXG59XFxuXFxuLmNhdC10cmFja2VyIDpudGgtY2hpbGQoMikgaW1nIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLWNlbGwpICogNCk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIuOSwgMS43KTtcXG59XFxuXFxuLmNhdC10cmFja2VyIDpudGgtY2hpbGQoMykge1xcbiAgZ3JpZC1hcmVhOiAzIC8gMSAvIDQgLyAyO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgOm50aC1jaGlsZCgzKSBpbWcge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItY2VsbCkgKiAzKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi41LCAxLjgpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgOm50aC1jaGlsZCg0KSB7XFxuICBncmlkLWFyZWE6IDQgLyAxIC8gNSAvIDI7XFxufVxcblxcbi5jYXQtdHJhY2tlciA6bnRoLWNoaWxkKDQpIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgOm50aC1jaGlsZCg1KSB7XFxuICBncmlkLWFyZWE6IDQgLyAzIC8gNSAvIDU7XFxufVxcblxcbi5jYXQtdHJhY2tlciA6bnRoLWNoaWxkKDUpIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUsIDEuMSk7XFxufVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIHtcXG5cXG4gIDpyb290IHtcXG4gICAgLS1ib2FyZC1zaXplOiA5MHZ3O1xcbiAgICAtLWxvZ28tYmFsbC1zaXplOiA1MHB4O1xcbiAgfVxcblxcbiAgYm9keSB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGU6IDV2aCAxZnIgMS41ZnIgLyA1MHZ3IDUwdnc7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIH1cXG5cXG4gIC50aXRsZSB7XFxuICAgIGdyaWQtYXJlYTogMSAvIDEgLyAyIC8gMztcXG4gICAgbWFyZ2luLXRvcDogMDtcXG4gIH1cXG5cXG4gIGgxIHtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgfVxcblxcbiAgLnBsYXllci1ib2FyZC1jb250YWluZXIuc2hyaW5rIHtcXG4gICAgLS1ib2FyZC1zaXplOiA0MHZ3O1xcbiAgICAtLWNlbGwtc2l6ZTogY2FsYyh2YXIoLS1ib2FyZC1zaXplKSAvIDEwKTtcXG4gICAgc2NhbGU6IDE7XFxuICAgIHRyYW5zbGF0ZTogbm9uZTtcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICB9XFxuXFxuICAucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbms6aG92ZXIge1xcbiAgICBzY2FsZTogMS41O1xcbiAgfVxcblxcbiAgLmNvbXAtYm9hcmQtY29udGFpbmVyIHtcXG4gICAgbWFyZ2luLXRvcDogYXV0bztcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBncmlkLWFyZWE6IDMgLyAxIC8gNCAvIDM7XFxuICB9XFxuXFxuICAuY2F0LXRyYWNrZXIge1xcbiAgICBncmlkLWFyZWE6IDIgLyAyIC8gMyAvIDM7XFxuICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7IC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfSAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cblxuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgaW5pdCBmcm9tICcuL2luaXQnO1xuXG5pbml0KCk7XG5cblxuIl0sIm5hbWVzIjpbImNyZWF0ZUNhdHMiLCJjb21wQm9hcmQiLCJyYW5kb21JbmRleCIsImFycmF5IiwiTWF0aCIsImZsb29yIiwibGVuZ3RoIiwicmFuZG9tIiwiY29tcENhdHMiLCJjb21wUGxhY2VDYXRzIiwiZm9yRWFjaCIsImNhdCIsInJhbmRvbWl6ZU9yaWVudGF0aW9uIiwicG90ZW50aWFsUGxhY2VtZW50cyIsImRldGVybWluZVJlYWxFc3RhdGUiLCJhcnJheU9mQ29vcmQiLCJnZXRDb29yZGluYXRlcyIsInBsYWNlQ2F0IiwiZGV0ZXJtaW5lT3JpZW50YXRpb24iLCJhc3Nlc3NBZGphY2VudENvb3JkaW5hdGVzIiwic3RhcnQiLCJib2FyZElEIiwiYXhpcyIsImRpcmVjdGlvbiIsImFsbERpciIsIngiLCJ5IiwidXAiLCJyaWdodCIsImRvd24iLCJsZWZ0Iiwic29tZSIsIm51bSIsIm9wcEJvYXJkQ2VsbCIsImJvYXJkIiwiYXR0YWNrZWQiLCJvY2N1cGllZEJ5IiwiZmlsdGVyIiwib3B0IiwiY29tcEZpcmVTaG90Iiwib3Bwb25lbnRCb2FyZCIsIm9wcG9uZW50Q2F0cyIsIndvdW5kZWRUYXJnZXRzIiwicG9zc2libGVIaXRzIiwiaGl0cyIsImlzU3VuayIsInB1c2giLCJwcmltYXJ5VGFyZ2V0IiwiY29vcmRIaXQiLCJvcmllbnRhdGlvbiIsIk9iamVjdCIsImtleXMiLCJjZWxsIiwiY29vcmRpbmF0ZXMiLCJDYXQiLCJjb25zdHJ1Y3RvciIsInR5cGUiLCJoaXQiLCJjb29yZCIsInJvdGF0ZSIsImNhdDEiLCJjYXQyIiwiY2F0MyIsImNhdDQiLCJjYXQ1Iiwicm90YXRlSWNvbiIsImhhbmRsZUNsaWNrIiwicGxheWVyQm9hcmQiLCJnZXRDdXJyZW50Q2F0IiwiYmVnaW5HYW1lIiwiY29tcFJldGFsaWF0aW9uIiwicGxheWVyQm9hcmRDb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJwbGF5ZXJCb2FyZERpc3BsYXkiLCJjb21wQm9hcmRDb250YWluZXIiLCJjb21wQm9hcmREaXNwbGF5Iiwicm90YXRlQ2F0IiwiY3VycmVudENhdCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwia2V5Iiwicm90YXRlQnV0dG9uIiwiY3JlYXRlRWxlbWVudCIsInJvdGF0ZUltZyIsIkltYWdlIiwic3JjIiwiYWRkIiwiYXBwZW5kQ2hpbGQiLCJhZGRDYXRJbWciLCJkZXN0aW5hdGlvbiIsImNhdEltZyIsImNsYXNzTmFtZSIsImFwcGx5SGl0SW1hZ2UiLCJ0YXJnZXQiLCJjcmVhdGVDb21wR2FtZUJvYXJkRGlzcGxheSIsInZhbHVlcyIsInRha2VBdHRhY2siLCJjcmVhdGVQbGF5ZXJHYW1lQm9hcmREaXNwbGF5Iiwic3BvdCIsImRhdGFzZXQiLCJjb29yZEFycmF5IiwicmVtb3ZlQ2hpbGQiLCJzdHlsZSIsImRpc3BsYXkiLCJjYXRUcmFja2VyIiwiY3JlYXRlQ2F0SW1hZ2UiLCJzb3VyY2UiLCJjYXQxdHJhY2tlciIsImNhdDJ0cmFja2VyIiwiY2F0M3RyYWNrZXIiLCJjYXQ0dHJhY2tlciIsImNhdDV0cmFja2VyIiwiYXBwZW5kIiwicGxheWVyQ2F0cyIsImNvbnNvbGUiLCJsb2ciLCJkYXRhSUQiLCJkb21DZWxsIiwicGxhY2UiLCJzdGF0ZSIsImNvb3JkaW5hdGUiLCJyZWNlaXZlQXR0YWNrIiwiY29vcmRJbnZhbGlkIiwiY29vcmRpbmF0ZXNBcmVJbnZhbGlkIiwiZmxhdCIsIml0ZW0iLCJnZXRDb29yZCIsImkiLCJjZWxsQXNzZXNzbWVudCIsImxpbWl0IiwiaCIsInYiLCJhcnJheU1pbnVzT3ZlcmxhcCIsImNyZWF0ZVNwb3QiLCJjcmVhdGVHYW1lQm9hcmQiLCJnYW1lQm9hcmQiLCJhc3NpZ24iLCJjcmVhdGVDb21wR2FtZUJvYXJkIiwiY2F0c1BsYWNlZCIsImluaXQiXSwic291cmNlUm9vdCI6IiJ9