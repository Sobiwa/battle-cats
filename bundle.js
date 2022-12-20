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
const catTracker = document.querySelector(".cat-tracker");
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
function shrinkSize() {
  const originalSize = compBoardDisplay.offsetWidth;
  const windowWidth = window.innerWidth;
  return (windowWidth - originalSize) / 2.3 / originalSize;
}
window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--shrink-scale', `min(1, ${shrinkSize()})`);
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
        addCatImg(spot, currentCat);
        if (currentCat.type === "compact kitty") {
          playerBoardContainer.removeChild(rotateButton);
          playerBoardContainer.classList.add('shrink');
          compBoardContainer.style.display = 'flex';
          createCompGameBoardDisplay();
          document.documentElement.style.setProperty('--shrink-scale', `min(1, ${shrinkSize()})`);
          catTracker.style.visibility = 'visible';
          (0,_game__WEBPACK_IMPORTED_MODULE_7__.beginGame)();
        }
      }
    });
    playerBoardDisplay.appendChild(spot);
  }
}
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
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"comfy\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"woff2\"),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"woff\");\n  font-weight: 600;\n  font-style: normal;\n}\n\n:root {\n  --background: #282a36;\n  --board-size: min(60vw, 500px);\n  --cell-size: calc(var(--board-size) / 10);\n  --logo-ball-size: 75px;\n  --shrink-scale: 1;\n  --margin: calc((100vw - var(--board-size)) / 2);\n  --shrunk-board: calc(var(--board-size) * var(--shrink-scale));\n  /* --cat-tracker-size: calc(var(--board-size) * 0.4); */\n  --cat-tracker-size: min(calc(var(--margin) * 0.95), 200px);\n  --cat-tracker-cell: calc(var(--cell-size) * 0.75);\n  --margin-top: calc(((100vh - 100px) - var(--board-size)) * 0.5)\n}\n\nbody {\n  display: grid;\n  grid-template: 100px 1fr / 1fr 1fr 1fr;\n  align-items: center;\n  /* justify-items: center; */\n  margin: 0;\n  padding: 0;\n  position: relative;\n  color: whitesmoke;\n  height: 100vh;\n  width: 100vw;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  background-repeat: repeat;\n  background-size: 400px;\n  text-align: center;\n}\n\n.title {\n  grid-area: 1 / 1 / 2 / -1;\n  width: min-content;\n  height: var(--logo-ball-size);\n  margin: auto;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n}\n\n.title .ball:nth-child(4) {\n  grid-area: 1 / 1 / 2 / 2;\n  margin-left: 0;\n}\n\n.title .ball:nth-child(3) {\n  grid-area: 1 / 2 / 2 / 3;\n}\n\n.title .ball:nth-child(2) {\n  grid-area: 1 / 3 / 2 / 4;\n}\n\n.title .ball:nth-child(1) {\n  grid-area: 1 / 4 / 2 / 5;\n}\n\n.ball {\n  box-shadow: 1px 1px 8px rgb(255, 140, 0);\n  margin-left: calc(var(--logo-ball-size) * -0.5);\n  content: \"\";\n  height: var(--logo-ball-size);\n  width: var(--logo-ball-size);\n  border-radius: 50%;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n}\n\n.words {\n  grid-area: 1 / 1 / 2 / -1;\n}\nh1 {\n  font-size: 2rem;\n  font-family: comfy, Verdana, Geneva, Tahoma, sans-serif;\n}\n\n.player-board-container {\n  grid-area: 2 / 2 / 3 / 3;\n  transition: 0.3s;\n  margin: auto;\n  width: min-content;\n  height: min-content;\n  transform-origin: 0 0;\n  z-index: 3;\n}\n\n.player-board,\n.comp-board {\n  /* box-sizing: border-box; */\n  width: var(--board-size);\n  height: var(--board-size);\n  display: grid;\n  grid-template: repeat(10, auto) / repeat(10, auto);\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n  background-repeat: repeat;\n  background-size: var(--cell-size) var(--cell-size);\n}\n\n.grid-cell {\n  z-index: 0;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.164);\n  width: var(--cell-size);\n  height: var(--cell-size);\n  position: relative;\n}\n\n.player-board {\n  overflow: hidden;\n}\n\n.comp-board .grid-cell:hover {\n  box-shadow: inset 0px 0px 50px rgb(255, 123, 0);\n  cursor: pointer;\n}\n\n.comp-board .grid-cell:active {\n  box-shadow: inset 0px 0px 50px 10px rgb(255, 123, 0);\n}\n\n.player-board .grid-cell:hover::after {\n  position: absolute;\n  left: 0;\n  content: \"\";\n  background-color: rgba(0, 0, 0, 0.462);\n  border-radius: 5px;\n}\n\n.player-board.cat-one .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 5);\n}\n\n.player-board.horizontal.cat-one .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 5);\n}\n\n.player-board.cat-two .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 4);\n}\n\n.player-board.horizontal.cat-two .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 4);\n}\n\n.player-board.cat-three .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 3);\n}\n\n.player-board.horizontal.cat-three .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 3);\n}\n\n.player-board.cat-four .grid-cell:hover::after,\n.player-board.cat-five .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 2);\n}\n\n.player-board.horizontal.cat-four .grid-cell:hover::after,\n.player-board.horizontal.cat-five .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 2);\n}\n\n.player-board-container.shrink {\n  scale: var(--shrink-scale);\n  translate: calc((var(--margin) + var(--shrunk-board)) * -0.5);\n}\n\n.player-board-container.shrink:hover {\n  scale: 0.75;\n  border: 2px solid black;\n}\n\n.cat-img {\n  position: absolute;\n  top: 3px;\n  rotate: -90deg;\n  width: var(--cell-size);\n  pointer-events: none;\n}\n\n.cat1 {\n  right: -10px;\n  height: calc(var(--cell-size) * 5);\n  transform: scale(5.5, 4);\n}\n\n.cat1.horizontal-cat {\n  top: 5px;\n  width: calc(var(--cell-size) * 5);\n  transform: scale(3.8, 2.7);\n}\n\n.cat2 {\n  top: 5px;\n  left: -5px;\n  height: calc(var(--cell-size) * 4);\n  transform: scale(4.3, 2.5);\n}\n\n.cat2.horizontal-cat {\n  top: -3px;\n  width: calc(var(--cell-size) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat3 {\n  left: 0;\n  height: calc(var(--cell-size) * 3);\n  transform: scale(3.5, 2.5);\n}\n\n.cat3.horizontal-cat {\n  width: calc(var(--cell-size) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat4 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 2);\n}\n\n.cat4.horizontal-cat {\n  width: calc(var(--cell-size) * 2);\n  transform: scale(1.5);\n}\n\n.cat5 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 1.5);\n}\n\n.cat5.horizontal-cat {\n  width: calc((var(--cell-size) * 2));\n  transform: scale(1.5, 1.1);\n}\n\n.horizontal-cat {\n  top: 0px;\n  left: 0px;\n  height: var(--cell-size);\n  rotate: 0deg;\n}\n\n.grid-cell.attacked {\n  box-shadow: inset 0px 0px 15px orange;\n}\n\n.grid-cell.attacked::before {\n  z-index: 1;\n  position: absolute;\n  content: \"\";\n  width: calc(var(--cell-size) / 3);\n  height: calc(var(--cell-size) / 3);\n  background-color: rgba(255, 166, 0, 0.698);\n  border-radius: 50%;\n  inset: 0;\n  margin: auto;\n}\n\n.grid-cell.attacked.occupied::before {\n  width: calc(var(--cell-size) / 1.5);\n  height: calc(var(--cell-size) / 1.5);\n  background-color: orange;\n}\n\n.rotate-button {\n  appearance: none;\n  border: none;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  cursor: pointer;\n}\n\n.comp-board-container {\n  grid-area: 2 / 2 / 3 / 3;\n  width: min-content;\n  height: min-content;\n  display: none;\n  inset: 0;\n  margin: auto;\n  /* margin-top: calc(var(--board-size) * -1); */\n}\n\n.cat-tracker {\n  margin: var(--margin-top) 10px;\n  /* margin-left: 10px; */\n  /* justify-self: flex-start; */\n  align-self: flex-start;\n  visibility: hidden;\n  grid-area: 2 / 3 / 3 / 4;\n  overflow: hidden;\n  display: grid;\n  grid-template: repeat(4, calc(var(--cat-tracker-size) / 4)) / repeat(\n      5,\n      calc(var(--cat-tracker-size) / 5)\n    );\n  background-color: rgba(255, 255, 255, 0.405);\n  border-radius: 20px;\n  width: var(--cat-tracker-size);\n  height: var(--cat-tracker-size);\n  align-items: center;\n  justify-items: flex-start;\n}\n\n.cat-tracker div img {\n  height: var(--cat-tracker-cell);\n}\n\n.cat-tracker :nth-child(1) {\n  grid-area: 1 / 1 / 2 / 2;\n}\n\n.cat-tracker :nth-child(1) img {\n  width: calc(var(--cat-tracker-cell) * 5);\n  transform: scale(3.4, 2.7);\n  margin-bottom: -10%;\n}\n\n.cat-tracker :nth-child(2) {\n  grid-area: 2 / 1 / 3 / 2;\n}\n\n.cat-tracker :nth-child(2) img {\n  width: calc(var(--cat-tracker-cell) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat-tracker :nth-child(3) {\n  grid-area: 3 / 1 / 4 / 2;\n}\n\n.cat-tracker :nth-child(3) img {\n  width: calc(var(--cat-tracker-cell) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat-tracker :nth-child(4) {\n  grid-area: 4 / 1 / 5 / 2;\n}\n\n.cat-tracker :nth-child(4) img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5);\n}\n\n.cat-tracker :nth-child(5) {\n  grid-area: 4 / 3 / 5 / 5;\n}\n\n.cat-tracker :nth-child(5) img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5, 1.1);\n}\n\n@media only screen and (max-width: 900px) {\n}\n\n@media only screen and (max-width: 850px) {\n  :root {\n    --scale-size: 0.4;\n    --board-size: min(60vh, 90vw);\n    --logo-ball-size: 50px;\n    --second-row: calc((95vh - 50px) * (1 / (1.3 + 1)));\n    --third-row: calc((95vh - 50px) * (1.3 / (1.3 + 1)));\n    --mini-board-size: calc(var(--board-size) * var(--scale-size));\n    --cat-tracker-size: calc(var(--board-size) * 0.4);\n  }\n\n  body {\n    display: grid;\n    grid-template: 5vh 1fr 1.3fr 50px/ 50vw 50vw;\n    align-items: center;\n    justify-items: center;\n  }\n\n  .title {\n    grid-area: 1 / 1 / 2 / 3;\n    margin-top: 0;\n  }\n\n  h1 {\n    font-size: 1rem;\n  }\n\n  .player-board-container {\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .player-board-container.shrink {\n    scale: var(--scale-size);\n    translate: 0px\n      calc(\n        (\n            var(--third-row) - var(--board-size) + var(--second-row) +\n              var(--mini-board-size)\n          ) * -0.5\n      );\n    justify-self: center;\n  }\n\n  .player-board-container.shrink:hover {\n    scale: 0.75;\n  }\n\n  .comp-board-container {\n    margin-top: auto;\n    display: none;\n    position: relative;\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .cat-tracker {\n    margin: auto;\n    grid-area: 2 / 2 / 3 / 3;\n  }\n}\n\n@media only screen and (max-width: 450px) {\n  :root {\n    --scale-size: 0.5;\n  }\n\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n  font-family: \"comfy\";\n  src: url(\"./font/comfortaa-variablefont_wght-webfont.woff2\") format(\"woff2\"),\n    url(\"./font/comfortaa-variablefont_wght-webfont.woff\") format(\"woff\");\n  font-weight: 600;\n  font-style: normal;\n}\n\n:root {\n  --background: #282a36;\n  --board-size: min(60vw, 500px);\n  --cell-size: calc(var(--board-size) / 10);\n  --logo-ball-size: 75px;\n  --shrink-scale: 1;\n  --margin: calc((100vw - var(--board-size)) / 2);\n  --shrunk-board: calc(var(--board-size) * var(--shrink-scale));\n  /* --cat-tracker-size: calc(var(--board-size) * 0.4); */\n  --cat-tracker-size: min(calc(var(--margin) * 0.95), 200px);\n  --cat-tracker-cell: calc(var(--cell-size) * 0.75);\n  --margin-top: calc(((100vh - 100px) - var(--board-size)) * 0.5)\n}\n\nbody {\n  display: grid;\n  grid-template: 100px 1fr / 1fr 1fr 1fr;\n  align-items: center;\n  /* justify-items: center; */\n  margin: 0;\n  padding: 0;\n  position: relative;\n  color: whitesmoke;\n  height: 100vh;\n  width: 100vw;\n  background: url(\"./img/grrass.jpeg\");\n  background-repeat: repeat;\n  background-size: 400px;\n  text-align: center;\n}\n\n.title {\n  grid-area: 1 / 1 / 2 / -1;\n  width: min-content;\n  height: var(--logo-ball-size);\n  margin: auto;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n}\n\n.title .ball:nth-child(4) {\n  grid-area: 1 / 1 / 2 / 2;\n  margin-left: 0;\n}\n\n.title .ball:nth-child(3) {\n  grid-area: 1 / 2 / 2 / 3;\n}\n\n.title .ball:nth-child(2) {\n  grid-area: 1 / 3 / 2 / 4;\n}\n\n.title .ball:nth-child(1) {\n  grid-area: 1 / 4 / 2 / 5;\n}\n\n.ball {\n  box-shadow: 1px 1px 8px rgb(255, 140, 0);\n  margin-left: calc(var(--logo-ball-size) * -0.5);\n  content: \"\";\n  height: var(--logo-ball-size);\n  width: var(--logo-ball-size);\n  border-radius: 50%;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n}\n\n.words {\n  grid-area: 1 / 1 / 2 / -1;\n}\nh1 {\n  font-size: 2rem;\n  font-family: comfy, Verdana, Geneva, Tahoma, sans-serif;\n}\n\n.player-board-container {\n  grid-area: 2 / 2 / 3 / 3;\n  transition: 0.3s;\n  margin: auto;\n  width: min-content;\n  height: min-content;\n  transform-origin: 0 0;\n  z-index: 3;\n}\n\n.player-board,\n.comp-board {\n  /* box-sizing: border-box; */\n  width: var(--board-size);\n  height: var(--board-size);\n  display: grid;\n  grid-template: repeat(10, auto) / repeat(10, auto);\n  background: url(\"./img/pexels-pixmike-413195.jpg\");\n  background-repeat: repeat;\n  background-size: var(--cell-size) var(--cell-size);\n}\n\n.grid-cell {\n  z-index: 0;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.164);\n  width: var(--cell-size);\n  height: var(--cell-size);\n  position: relative;\n}\n\n.player-board {\n  overflow: hidden;\n}\n\n.comp-board .grid-cell:hover {\n  box-shadow: inset 0px 0px 50px rgb(255, 123, 0);\n  cursor: pointer;\n}\n\n.comp-board .grid-cell:active {\n  box-shadow: inset 0px 0px 50px 10px rgb(255, 123, 0);\n}\n\n.player-board .grid-cell:hover::after {\n  position: absolute;\n  left: 0;\n  content: \"\";\n  background-color: rgba(0, 0, 0, 0.462);\n  border-radius: 5px;\n}\n\n.player-board.cat-one .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 5);\n}\n\n.player-board.horizontal.cat-one .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 5);\n}\n\n.player-board.cat-two .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 4);\n}\n\n.player-board.horizontal.cat-two .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 4);\n}\n\n.player-board.cat-three .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 3);\n}\n\n.player-board.horizontal.cat-three .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 3);\n}\n\n.player-board.cat-four .grid-cell:hover::after,\n.player-board.cat-five .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 2);\n}\n\n.player-board.horizontal.cat-four .grid-cell:hover::after,\n.player-board.horizontal.cat-five .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 2);\n}\n\n.player-board-container.shrink {\n  scale: var(--shrink-scale);\n  translate: calc((var(--margin) + var(--shrunk-board)) * -0.5);\n}\n\n.player-board-container.shrink:hover {\n  scale: 0.75;\n  border: 2px solid black;\n}\n\n.cat-img {\n  position: absolute;\n  top: 3px;\n  rotate: -90deg;\n  width: var(--cell-size);\n  pointer-events: none;\n}\n\n.cat1 {\n  right: -10px;\n  height: calc(var(--cell-size) * 5);\n  transform: scale(5.5, 4);\n}\n\n.cat1.horizontal-cat {\n  top: 5px;\n  width: calc(var(--cell-size) * 5);\n  transform: scale(3.8, 2.7);\n}\n\n.cat2 {\n  top: 5px;\n  left: -5px;\n  height: calc(var(--cell-size) * 4);\n  transform: scale(4.3, 2.5);\n}\n\n.cat2.horizontal-cat {\n  top: -3px;\n  width: calc(var(--cell-size) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat3 {\n  left: 0;\n  height: calc(var(--cell-size) * 3);\n  transform: scale(3.5, 2.5);\n}\n\n.cat3.horizontal-cat {\n  width: calc(var(--cell-size) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat4 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 2);\n}\n\n.cat4.horizontal-cat {\n  width: calc(var(--cell-size) * 2);\n  transform: scale(1.5);\n}\n\n.cat5 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 1.5);\n}\n\n.cat5.horizontal-cat {\n  width: calc((var(--cell-size) * 2));\n  transform: scale(1.5, 1.1);\n}\n\n.horizontal-cat {\n  top: 0px;\n  left: 0px;\n  height: var(--cell-size);\n  rotate: 0deg;\n}\n\n.grid-cell.attacked {\n  box-shadow: inset 0px 0px 15px orange;\n}\n\n.grid-cell.attacked::before {\n  z-index: 1;\n  position: absolute;\n  content: \"\";\n  width: calc(var(--cell-size) / 3);\n  height: calc(var(--cell-size) / 3);\n  background-color: rgba(255, 166, 0, 0.698);\n  border-radius: 50%;\n  inset: 0;\n  margin: auto;\n}\n\n.grid-cell.attacked.occupied::before {\n  width: calc(var(--cell-size) / 1.5);\n  height: calc(var(--cell-size) / 1.5);\n  background-color: orange;\n}\n\n.rotate-button {\n  appearance: none;\n  border: none;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  cursor: pointer;\n}\n\n.comp-board-container {\n  grid-area: 2 / 2 / 3 / 3;\n  width: min-content;\n  height: min-content;\n  display: none;\n  inset: 0;\n  margin: auto;\n  /* margin-top: calc(var(--board-size) * -1); */\n}\n\n.cat-tracker {\n  margin: var(--margin-top) 10px;\n  /* margin-left: 10px; */\n  /* justify-self: flex-start; */\n  align-self: flex-start;\n  visibility: hidden;\n  grid-area: 2 / 3 / 3 / 4;\n  overflow: hidden;\n  display: grid;\n  grid-template: repeat(4, calc(var(--cat-tracker-size) / 4)) / repeat(\n      5,\n      calc(var(--cat-tracker-size) / 5)\n    );\n  background-color: rgba(255, 255, 255, 0.405);\n  border-radius: 20px;\n  width: var(--cat-tracker-size);\n  height: var(--cat-tracker-size);\n  align-items: center;\n  justify-items: flex-start;\n}\n\n.cat-tracker div img {\n  height: var(--cat-tracker-cell);\n}\n\n.cat-tracker :nth-child(1) {\n  grid-area: 1 / 1 / 2 / 2;\n}\n\n.cat-tracker :nth-child(1) img {\n  width: calc(var(--cat-tracker-cell) * 5);\n  transform: scale(3.4, 2.7);\n  margin-bottom: -10%;\n}\n\n.cat-tracker :nth-child(2) {\n  grid-area: 2 / 1 / 3 / 2;\n}\n\n.cat-tracker :nth-child(2) img {\n  width: calc(var(--cat-tracker-cell) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat-tracker :nth-child(3) {\n  grid-area: 3 / 1 / 4 / 2;\n}\n\n.cat-tracker :nth-child(3) img {\n  width: calc(var(--cat-tracker-cell) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat-tracker :nth-child(4) {\n  grid-area: 4 / 1 / 5 / 2;\n}\n\n.cat-tracker :nth-child(4) img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5);\n}\n\n.cat-tracker :nth-child(5) {\n  grid-area: 4 / 3 / 5 / 5;\n}\n\n.cat-tracker :nth-child(5) img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5, 1.1);\n}\n\n@media only screen and (max-width: 900px) {\n}\n\n@media only screen and (max-width: 850px) {\n  :root {\n    --scale-size: 0.4;\n    --board-size: min(60vh, 90vw);\n    --logo-ball-size: 50px;\n    --second-row: calc((95vh - 50px) * (1 / (1.3 + 1)));\n    --third-row: calc((95vh - 50px) * (1.3 / (1.3 + 1)));\n    --mini-board-size: calc(var(--board-size) * var(--scale-size));\n    --cat-tracker-size: calc(var(--board-size) * 0.4);\n  }\n\n  body {\n    display: grid;\n    grid-template: 5vh 1fr 1.3fr 50px/ 50vw 50vw;\n    align-items: center;\n    justify-items: center;\n  }\n\n  .title {\n    grid-area: 1 / 1 / 2 / 3;\n    margin-top: 0;\n  }\n\n  h1 {\n    font-size: 1rem;\n  }\n\n  .player-board-container {\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .player-board-container.shrink {\n    scale: var(--scale-size);\n    translate: 0px\n      calc(\n        (\n            var(--third-row) - var(--board-size) + var(--second-row) +\n              var(--mini-board-size)\n          ) * -0.5\n      );\n    justify-self: center;\n  }\n\n  .player-board-container.shrink:hover {\n    scale: 0.75;\n  }\n\n  .comp-board-container {\n    margin-top: auto;\n    display: none;\n    position: relative;\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .cat-tracker {\n    margin: auto;\n    grid-area: 2 / 2 / 3 / 3;\n  }\n}\n\n@media only screen and (max-width: 450px) {\n  :root {\n    --scale-size: 0.5;\n  }\n\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxNQUFNLFlBQVksYUFBYSxPQUFPLE1BQU0sWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxNQUFNLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxNQUFNLE1BQU0sS0FBSyxLQUFLLFlBQVksT0FBTyxxQ0FBcUMsMkJBQTJCLHFLQUFxSyxxQkFBcUIsdUJBQXVCLEdBQUcsV0FBVywwQkFBMEIsbUNBQW1DLDhDQUE4QywyQkFBMkIsc0JBQXNCLG9EQUFvRCxrRUFBa0UsMERBQTBELGlFQUFpRSxzREFBc0Qsc0VBQXNFLFVBQVUsa0JBQWtCLDJDQUEyQyx3QkFBd0IsOEJBQThCLGdCQUFnQixlQUFlLHVCQUF1QixzQkFBc0Isa0JBQWtCLGlCQUFpQiwyQ0FBMkMsOEJBQThCLDJCQUEyQix1QkFBdUIsR0FBRyxZQUFZLDhCQUE4Qix1QkFBdUIsa0NBQWtDLGlCQUFpQixrQkFBa0IsMEJBQTBCLHdCQUF3QiwyQ0FBMkMsR0FBRywrQkFBK0IsNkJBQTZCLG1CQUFtQixHQUFHLCtCQUErQiw2QkFBNkIsR0FBRywrQkFBK0IsNkJBQTZCLEdBQUcsK0JBQStCLDZCQUE2QixHQUFHLFdBQVcsNkNBQTZDLG9EQUFvRCxrQkFBa0Isa0NBQWtDLGlDQUFpQyx1QkFBdUIsd0VBQXdFLEdBQUcsWUFBWSw4QkFBOEIsR0FBRyxNQUFNLG9CQUFvQiw0REFBNEQsR0FBRyw2QkFBNkIsNkJBQTZCLHFCQUFxQixpQkFBaUIsdUJBQXVCLHdCQUF3QiwwQkFBMEIsZUFBZSxHQUFHLGlDQUFpQywrQkFBK0IsK0JBQStCLDhCQUE4QixrQkFBa0IsdURBQXVELHlEQUF5RCw4QkFBOEIsdURBQXVELEdBQUcsZ0JBQWdCLGVBQWUsMkJBQTJCLG1EQUFtRCw0QkFBNEIsNkJBQTZCLHVCQUF1QixHQUFHLG1CQUFtQixxQkFBcUIsR0FBRyxrQ0FBa0Msb0RBQW9ELG9CQUFvQixHQUFHLG1DQUFtQyx5REFBeUQsR0FBRywyQ0FBMkMsdUJBQXVCLFlBQVksa0JBQWtCLDJDQUEyQyx1QkFBdUIsR0FBRyxtREFBbUQsNEJBQTRCLHVDQUF1QyxHQUFHLDhEQUE4RCw2QkFBNkIsc0NBQXNDLEdBQUcsbURBQW1ELDRCQUE0Qix1Q0FBdUMsR0FBRyw4REFBOEQsNkJBQTZCLHNDQUFzQyxHQUFHLHFEQUFxRCw0QkFBNEIsdUNBQXVDLEdBQUcsZ0VBQWdFLDZCQUE2QixzQ0FBc0MsR0FBRyxxR0FBcUcsNEJBQTRCLHVDQUF1QyxHQUFHLDJIQUEySCw2QkFBNkIsc0NBQXNDLEdBQUcsb0NBQW9DLCtCQUErQixrRUFBa0UsR0FBRywwQ0FBMEMsZ0JBQWdCLDRCQUE0QixHQUFHLGNBQWMsdUJBQXVCLGFBQWEsbUJBQW1CLDRCQUE0Qix5QkFBeUIsR0FBRyxXQUFXLGlCQUFpQix1Q0FBdUMsNkJBQTZCLEdBQUcsMEJBQTBCLGFBQWEsc0NBQXNDLCtCQUErQixHQUFHLFdBQVcsYUFBYSxlQUFlLHVDQUF1QywrQkFBK0IsR0FBRywwQkFBMEIsY0FBYyxzQ0FBc0MsK0JBQStCLEdBQUcsV0FBVyxZQUFZLHVDQUF1QywrQkFBK0IsR0FBRywwQkFBMEIsc0NBQXNDLCtCQUErQixHQUFHLFdBQVcsWUFBWSx1Q0FBdUMsMkJBQTJCLEdBQUcsMEJBQTBCLHNDQUFzQywwQkFBMEIsR0FBRyxXQUFXLFlBQVksdUNBQXVDLDZCQUE2QixHQUFHLDBCQUEwQix3Q0FBd0MsK0JBQStCLEdBQUcscUJBQXFCLGFBQWEsY0FBYyw2QkFBNkIsaUJBQWlCLEdBQUcseUJBQXlCLDBDQUEwQyxHQUFHLGlDQUFpQyxlQUFlLHVCQUF1QixrQkFBa0Isc0NBQXNDLHVDQUF1QywrQ0FBK0MsdUJBQXVCLGFBQWEsaUJBQWlCLEdBQUcsMENBQTBDLHdDQUF3Qyx5Q0FBeUMsNkJBQTZCLEdBQUcsb0JBQW9CLHFCQUFxQixpQkFBaUIsZ0JBQWdCLGlCQUFpQix1QkFBdUIsb0JBQW9CLEdBQUcsMkJBQTJCLDZCQUE2Qix1QkFBdUIsd0JBQXdCLGtCQUFrQixhQUFhLGlCQUFpQixpREFBaUQsS0FBSyxrQkFBa0IsbUNBQW1DLDBCQUEwQixtQ0FBbUMsNkJBQTZCLHVCQUF1Qiw2QkFBNkIscUJBQXFCLGtCQUFrQixvSUFBb0ksaURBQWlELHdCQUF3QixtQ0FBbUMsb0NBQW9DLHdCQUF3Qiw4QkFBOEIsR0FBRywwQkFBMEIsb0NBQW9DLEdBQUcsZ0NBQWdDLDZCQUE2QixHQUFHLG9DQUFvQyw2Q0FBNkMsK0JBQStCLHdCQUF3QixHQUFHLGdDQUFnQyw2QkFBNkIsR0FBRyxvQ0FBb0MsNkNBQTZDLCtCQUErQixHQUFHLGdDQUFnQyw2QkFBNkIsR0FBRyxvQ0FBb0MsNkNBQTZDLCtCQUErQixHQUFHLGdDQUFnQyw2QkFBNkIsR0FBRyxvQ0FBb0MsNkNBQTZDLDBCQUEwQixHQUFHLGdDQUFnQyw2QkFBNkIsR0FBRyxvQ0FBb0MsNkNBQTZDLCtCQUErQixHQUFHLCtDQUErQyxHQUFHLCtDQUErQyxXQUFXLHdCQUF3QixvQ0FBb0MsNkJBQTZCLDBEQUEwRCwyREFBMkQscUVBQXFFLHdEQUF3RCxLQUFLLFlBQVksb0JBQW9CLG1EQUFtRCwwQkFBMEIsNEJBQTRCLEtBQUssY0FBYywrQkFBK0Isb0JBQW9CLEtBQUssVUFBVSxzQkFBc0IsS0FBSywrQkFBK0IsK0JBQStCLEtBQUssc0NBQXNDLCtCQUErQix3TEFBd0wsMkJBQTJCLEtBQUssNENBQTRDLGtCQUFrQixLQUFLLDZCQUE2Qix1QkFBdUIsb0JBQW9CLHlCQUF5QiwrQkFBK0IsS0FBSyxvQkFBb0IsbUJBQW1CLCtCQUErQixLQUFLLEdBQUcsK0NBQStDLFdBQVcsd0JBQXdCLEtBQUssS0FBSyxxQkFBcUI7QUFDNzBzQjtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7OztBQ2hCMUI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxREFBcUQ7QUFDckQ7O0FBRUE7QUFDQSxnREFBZ0Q7QUFDaEQ7O0FBRUE7QUFDQSxxRkFBcUY7QUFDckY7O0FBRUE7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLHFCQUFxQjtBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNGQUFzRixxQkFBcUI7QUFDM0c7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0RBQXNELHFCQUFxQjtBQUMzRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNyR2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9EQUFvRDs7QUFFcEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDNUJhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQkEsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBbUc7QUFDbkc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyxzRkFBTzs7OztBQUk2QztBQUNyRSxPQUFPLGlFQUFlLHNGQUFPLElBQUksNkZBQWMsR0FBRyw2RkFBYyxZQUFZLEVBQUM7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdkdhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEQUFzRDs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3RDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1ZhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTs7QUFFakY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNYYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7V0NyQkE7Ozs7Ozs7Ozs7Ozs7QUNBcUI7QUFDSztBQUUxQnlDLGlEQUFJLEVBQUUsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZS1jYXRzLy4vc3JjL2JvdC5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9jYXQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vc3JjL2luaXQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmltcG9ydCB7IGNyZWF0ZUNhdHMgfSBmcm9tIFwiLi9jYXRcIjtcbmltcG9ydCB7IGNvbXBCb2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5mdW5jdGlvbiByYW5kb21JbmRleChhcnJheSkge1xuICByZXR1cm4gYXJyYXlbTWF0aC5mbG9vcihhcnJheS5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKV07XG59XG5cbmNvbnN0IGNvbXBDYXRzID0gY3JlYXRlQ2F0cygpO1xuXG5mdW5jdGlvbiBjb21wUGxhY2VDYXRzKCkge1xuICBjb21wQ2F0cy5mb3JFYWNoKChjYXQpID0+IHtcbiAgICBjYXQucmFuZG9taXplT3JpZW50YXRpb24oKTtcbiAgICBjb25zdCBwb3RlbnRpYWxQbGFjZW1lbnRzID0gY29tcEJvYXJkLmRldGVybWluZVJlYWxFc3RhdGUoY2F0KTtcbiAgICBjb25zdCBhcnJheU9mQ29vcmQgPSBjb21wQm9hcmQuZ2V0Q29vcmRpbmF0ZXMoXG4gICAgICByYW5kb21JbmRleChwb3RlbnRpYWxQbGFjZW1lbnRzKSxcbiAgICAgIGNhdFxuICAgICk7XG4gICAgY29tcEJvYXJkLnBsYWNlQ2F0KGFycmF5T2ZDb29yZCwgY2F0KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRldGVybWluZU9yaWVudGF0aW9uKGFycmF5KSB7XG4gIHJldHVybiBhcnJheVswXVswXSA9PT0gYXJyYXlbMV1bMF0gPyBcInlcIiA6IFwieFwiO1xufVxuXG5mdW5jdGlvbiBhc3Nlc3NBZGphY2VudENvb3JkaW5hdGVzKHN0YXJ0LCBib2FyZElELCBjYXQsIGF4aXMsIGRpcmVjdGlvbikge1xuICBsZXQgYWxsRGlyO1xuICBjb25zdCBbeCwgeV0gPSBzdGFydDtcbiAgY29uc3QgdXAgPSAoKSA9PiBhc3Nlc3NBZGphY2VudENvb3JkaW5hdGVzKFt4LCB5IC0gMV0sIGJvYXJkSUQsIGNhdCwgXCJ5XCIsIC0xKTtcbiAgY29uc3QgcmlnaHQgPSAoKSA9PlxuICAgIGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoW3ggKyAxLCB5XSwgYm9hcmRJRCwgY2F0LCBcInhcIiwgMSk7XG4gIGNvbnN0IGRvd24gPSAoKSA9PlxuICAgIGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoW3gsIHkgKyAxXSwgYm9hcmRJRCwgY2F0LCBcInlcIiwgMSk7XG4gIGNvbnN0IGxlZnQgPSAoKSA9PlxuICAgIGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoW3ggLSAxLCB5XSwgYm9hcmRJRCwgY2F0LCBcInhcIiwgLTEpO1xuXG4gIGlmIChzdGFydC5zb21lKChudW0pID0+IG51bSA+IDkgfHwgbnVtIDwgMCkpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IG9wcEJvYXJkQ2VsbCA9IGJvYXJkSUQuYm9hcmRbYFske3N0YXJ0fV1gXTtcbiAgaWYgKFxuICAgIG9wcEJvYXJkQ2VsbC5hdHRhY2tlZCAmJlxuICAgICghb3BwQm9hcmRDZWxsLm9jY3VwaWVkQnkgfHwgb3BwQm9hcmRDZWxsLm9jY3VwaWVkQnkgIT09IGNhdClcbiAgKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKCFvcHBCb2FyZENlbGwuYXR0YWNrZWQpIHJldHVybiBzdGFydDtcblxuICBpZiAoYXhpcykge1xuICAgIGlmIChheGlzID09PSBcInhcIikge1xuICAgICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgICByZXR1cm4gYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyhcbiAgICAgICAgICBbeCArIDEgKiBkaXJlY3Rpb24sIHldLFxuICAgICAgICAgIGJvYXJkSUQsXG4gICAgICAgICAgY2F0LFxuICAgICAgICAgIGF4aXMsXG4gICAgICAgICAgZGlyZWN0aW9uXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBhbGxEaXIgPSBbbGVmdCgpLCByaWdodCgpXTtcbiAgICB9IGVsc2UgaWYgKGF4aXMgPT09IFwieVwiKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBhc3Nlc3NBZGphY2VudENvb3JkaW5hdGVzKFxuICAgICAgICAgIFt4LCB5ICsgMSAqIGRpcmVjdGlvbl0sXG4gICAgICAgICAgYm9hcmRJRCxcbiAgICAgICAgICBjYXQsXG4gICAgICAgICAgYXhpcyxcbiAgICAgICAgICBkaXJlY3Rpb25cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGFsbERpciA9IFt1cCgpLCBkb3duKCldO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhbGxEaXIgPSBbdXAoKSwgcmlnaHQoKSwgZG93bigpLCBsZWZ0KCldO1xuICB9XG4gIHJldHVybiBhbGxEaXIuZmlsdGVyKChvcHQpID0+IG9wdCAhPT0gbnVsbCk7XG59XG5cbmZ1bmN0aW9uIGNvbXBGaXJlU2hvdChvcHBvbmVudEJvYXJkLCBvcHBvbmVudENhdHMpIHtcbiAgY29uc3Qgd291bmRlZFRhcmdldHMgPSBbXTtcbiAgbGV0IHBvc3NpYmxlSGl0cztcbiAgb3Bwb25lbnRDYXRzLmZvckVhY2goKGNhdCkgPT4ge1xuICAgIGlmIChjYXQuaGl0cyA+IDAgJiYgIWNhdC5pc1N1bmsoKSkge1xuICAgICAgd291bmRlZFRhcmdldHMucHVzaChjYXQpO1xuICAgIH1cbiAgfSk7XG4gIGlmICh3b3VuZGVkVGFyZ2V0cy5sZW5ndGgpIHtcbiAgICBjb25zdCBwcmltYXJ5VGFyZ2V0ID0gd291bmRlZFRhcmdldHNbMF07XG4gICAgaWYgKHByaW1hcnlUYXJnZXQuY29vcmRIaXQubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3Qgb3JpZW50YXRpb24gPSBkZXRlcm1pbmVPcmllbnRhdGlvbihwcmltYXJ5VGFyZ2V0LmNvb3JkSGl0KTtcbiAgICAgIHBvc3NpYmxlSGl0cyA9IGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoXG4gICAgICAgIHByaW1hcnlUYXJnZXQuY29vcmRIaXRbMF0sXG4gICAgICAgIG9wcG9uZW50Qm9hcmQsXG4gICAgICAgIHByaW1hcnlUYXJnZXQsXG4gICAgICAgIG9yaWVudGF0aW9uXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3NzaWJsZUhpdHMgPSBhc3Nlc3NBZGphY2VudENvb3JkaW5hdGVzKFxuICAgICAgICBwcmltYXJ5VGFyZ2V0LmNvb3JkSGl0WzBdLFxuICAgICAgICBvcHBvbmVudEJvYXJkLFxuICAgICAgICBwcmltYXJ5VGFyZ2V0XG4gICAgICApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBwb3NzaWJsZUhpdHMgPSBbXTtcbiAgICBPYmplY3Qua2V5cyhvcHBvbmVudEJvYXJkLmJvYXJkKS5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICBpZiAoIW9wcG9uZW50Qm9hcmQuYm9hcmRbY2VsbF0uYXR0YWNrZWQpIHtcbiAgICAgICAgcG9zc2libGVIaXRzLnB1c2gob3Bwb25lbnRCb2FyZC5ib2FyZFtjZWxsXS5jb29yZGluYXRlcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHBvc3NpYmxlSGl0c1tNYXRoLmZsb29yKHBvc3NpYmxlSGl0cy5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKV07XG59XG5cbmV4cG9ydCB7IGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMsIGNvbXBQbGFjZUNhdHMsIGNvbXBGaXJlU2hvdCwgY29tcENhdHMgfTtcbiIsImNsYXNzIENhdCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgdHlwZSkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5oaXRzID0gMDtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xuICAgIHRoaXMuY29vcmRIaXQgPSBbXTtcbiAgfVxuXG4gIGhpdChjb29yZCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICAgIHRoaXMuY29vcmRIaXQucHVzaChjb29yZCk7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVuZ3RoID09PSB0aGlzLmhpdHM7XG4gIH1cblxuICByb3RhdGUoKSB7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9XG4gICAgICB0aGlzLm9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIjtcbiAgfVxuXG4gIHJhbmRvbWl6ZU9yaWVudGF0aW9uKCkge1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBNYXRoLnJhbmRvbSgpID4gMC41ID8gXCJ2ZXJ0aWNhbFwiIDogXCJob3Jpem9udGFsXCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2F0cygpIHtcbiAgY29uc3QgY2F0MSA9IG5ldyBDYXQoNSwgXCJiaWcgc3RyZXRjaFwiKTtcbiAgY29uc3QgY2F0MiA9IG5ldyBDYXQoNCwgXCJkb3dud2FyZCBjYXRcIik7XG4gIGNvbnN0IGNhdDMgPSBuZXcgQ2F0KDMsIFwic3R1ZmYgc3RydXR0ZXJcIik7XG4gIGNvbnN0IGNhdDQgPSBuZXcgQ2F0KDIsIFwicXVhc2kgbG9hZlwiKTtcbiAgY29uc3QgY2F0NSA9IG5ldyBDYXQoMiwgXCJjb21wYWN0IGtpdHR5XCIpO1xuICByZXR1cm4gW2NhdDEsIGNhdDIsIGNhdDMsIGNhdDQsIGNhdDVdO1xufVxuXG5leHBvcnQgeyBDYXQsIGNyZWF0ZUNhdHMgfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGRlZmF1bHQtY2FzZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cbmltcG9ydCBjYXQxIGZyb20gXCIuL2ltZy9iaWctc3RyZXRjaC5zdmdcIjtcbmltcG9ydCBjYXQyIGZyb20gXCIuL2ltZy9jYXQyLnN2Z1wiO1xuaW1wb3J0IGNhdDMgZnJvbSBcIi4vaW1nL3dhbGsuc3ZnXCI7XG5pbXBvcnQgY2F0NCBmcm9tIFwiLi9pbWcvcXVhc2ktbG9hZjIuc3ZnXCI7XG5pbXBvcnQgY2F0NSBmcm9tIFwiLi9pbWcvbGVzUm9sbC5zdmdcIjtcbmltcG9ydCByb3RhdGVJY29uIGZyb20gXCIuL2ltZy9mb3JtYXQtcm90YXRlLTkwLnN2Z1wiO1xuXG5pbXBvcnQge1xuICBoYW5kbGVDbGljayxcbiAgcGxheWVyQm9hcmQsXG4gIGNvbXBCb2FyZCxcbiAgZ2V0Q3VycmVudENhdCxcbn0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmltcG9ydCB7IGJlZ2luR2FtZSwgY29tcFJldGFsaWF0aW9uIH0gZnJvbSBcIi4vZ2FtZVwiO1xuXG5jb25zdCBwbGF5ZXJCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLWJvYXJkLWNvbnRhaW5lclwiKTtcbmNvbnN0IHBsYXllckJvYXJkRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLWJvYXJkXCIpO1xuY29uc3QgY29tcEJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wLWJvYXJkLWNvbnRhaW5lclwiKTtcbmNvbnN0IGNvbXBCb2FyZERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXAtYm9hcmRcIik7XG5cbmNvbnN0IGNhdFRyYWNrZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhdC10cmFja2VyXCIpO1xuXG5mdW5jdGlvbiByb3RhdGVDYXQoKSB7XG4gIGNvbnN0IGN1cnJlbnRDYXQgPSBnZXRDdXJyZW50Q2F0KCk7XG4gIGlmICghY3VycmVudENhdCkgcmV0dXJuO1xuICBjdXJyZW50Q2F0LnJvdGF0ZSgpO1xuICBwbGF5ZXJCb2FyZERpc3BsYXkuY2xhc3NMaXN0LnRvZ2dsZShcImhvcml6b250YWxcIik7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICBpZiAoZS5rZXkgPT09IFwiU2hpZnRcIikge1xuICAgIHJvdGF0ZUNhdCgpO1xuICB9XG59KTtcblxuY29uc3Qgcm90YXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmNvbnN0IHJvdGF0ZUltZyA9IG5ldyBJbWFnZSgpO1xucm90YXRlSW1nLnNyYyA9IHJvdGF0ZUljb247XG5yb3RhdGVCdXR0b24uY2xhc3NMaXN0LmFkZChcInJvdGF0ZS1idXR0b25cIik7XG5yb3RhdGVCdXR0b24uYXBwZW5kQ2hpbGQocm90YXRlSW1nKTtcbnJvdGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICByb3RhdGVDYXQoKTtcbn0pO1xucGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQocm90YXRlQnV0dG9uKTtcblxuZnVuY3Rpb24gYWRkQ2F0SW1nKGRlc3RpbmF0aW9uLCBjdXJyZW50Q2F0KSB7XG4gIGNvbnN0IGNhdEltZyA9IG5ldyBJbWFnZSgpO1xuICBjYXRJbWcuY2xhc3NMaXN0LmFkZChcImNhdC1pbWdcIik7XG4gIHN3aXRjaCAoY3VycmVudENhdC50eXBlKSB7XG4gICAgY2FzZSBcImJpZyBzdHJldGNoXCI6XG4gICAgICBjYXRJbWcuc3JjID0gY2F0MTtcbiAgICAgIGNhdEltZy5jbGFzc0xpc3QuYWRkKFwiY2F0MVwiKTtcbiAgICAgIHBsYXllckJvYXJkRGlzcGxheS5jbGFzc05hbWUgPSBcInBsYXllci1ib2FyZCBjYXQtdHdvXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZG93bndhcmQgY2F0XCI6XG4gICAgICBjYXRJbWcuc3JjID0gY2F0MjtcbiAgICAgIGNhdEltZy5jbGFzc0xpc3QuYWRkKFwiY2F0MlwiKTtcbiAgICAgIHBsYXllckJvYXJkRGlzcGxheS5jbGFzc05hbWUgPSBcInBsYXllci1ib2FyZCBjYXQtdGhyZWVcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJzdHVmZiBzdHJ1dHRlclwiOlxuICAgICAgY2F0SW1nLnNyYyA9IGNhdDM7XG4gICAgICBjYXRJbWcuY2xhc3NMaXN0LmFkZChcImNhdDNcIik7XG4gICAgICBwbGF5ZXJCb2FyZERpc3BsYXkuY2xhc3NOYW1lID0gXCJwbGF5ZXItYm9hcmQgY2F0LWZvdXJcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJxdWFzaSBsb2FmXCI6XG4gICAgICBjYXRJbWcuc3JjID0gY2F0NDtcbiAgICAgIGNhdEltZy5jbGFzc0xpc3QuYWRkKFwiY2F0NFwiKTtcbiAgICAgIHBsYXllckJvYXJkRGlzcGxheS5jbGFzc05hbWUgPSBcInBsYXllci1ib2FyZCBjYXQtZml2ZVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImNvbXBhY3Qga2l0dHlcIjpcbiAgICAgIGNhdEltZy5zcmMgPSBjYXQ1O1xuICAgICAgY2F0SW1nLmNsYXNzTGlzdC5hZGQoXCJjYXQ1XCIpO1xuICAgICAgcGxheWVyQm9hcmREaXNwbGF5LmNsYXNzTmFtZSA9IFwicGxheWVyLWJvYXJkXCI7XG4gIH1cbiAgaWYgKGN1cnJlbnRDYXQub3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgY2F0SW1nLmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsLWNhdFwiKTtcbiAgfVxuICBkZXN0aW5hdGlvbi5hcHBlbmRDaGlsZChjYXRJbWcpO1xufVxuXG5mdW5jdGlvbiBhcHBseUhpdEltYWdlKHRhcmdldCwgYm9hcmRJRCwgY29vcmQpIHtcbiAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhdHRhY2tlZFwiKTtcbiAgaWYgKGJvYXJkSUQuYm9hcmRbYFske2Nvb3JkfV1gXS5vY2N1cGllZEJ5KSB7XG4gICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJvY2N1cGllZFwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wR2FtZUJvYXJkRGlzcGxheSgpIHtcbiAgZm9yIChjb25zdCB7IGNvb3JkaW5hdGVzIH0gb2YgT2JqZWN0LnZhbHVlcyhjb21wQm9hcmQuYm9hcmQpKSB7XG4gICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsXCIpO1xuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmICghY29tcEJvYXJkLmJvYXJkW2BbJHtjb29yZGluYXRlc31dYF0uYXR0YWNrZWQpIHtcbiAgICAgICAgY29tcEJvYXJkLnRha2VBdHRhY2soY29vcmRpbmF0ZXMpO1xuICAgICAgICBhcHBseUhpdEltYWdlKGNlbGwsIGNvbXBCb2FyZCwgY29vcmRpbmF0ZXMpO1xuICAgICAgICBjb21wUmV0YWxpYXRpb24oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb21wQm9hcmREaXNwbGF5LmFwcGVuZENoaWxkKGNlbGwpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNocmlua1NpemUoKSB7XG4gIGNvbnN0IG9yaWdpbmFsU2l6ZSA9IGNvbXBCb2FyZERpc3BsYXkub2Zmc2V0V2lkdGg7XG4gIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gIHJldHVybiAoKHdpbmRvd1dpZHRoIC0gb3JpZ2luYWxTaXplKSAvIDIuMykgLyBvcmlnaW5hbFNpemU7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1zaHJpbmstc2NhbGUnLGBtaW4oMSwgJHtzaHJpbmtTaXplKCl9KWApO1xufSlcblxuZnVuY3Rpb24gY3JlYXRlUGxheWVyR2FtZUJvYXJkRGlzcGxheSgpIHtcbiAgZm9yIChjb25zdCBjb29yZCBvZiBPYmplY3QudmFsdWVzKHBsYXllckJvYXJkLmJvYXJkKSkge1xuICAgIGNvbnN0IHNwb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNwb3QuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbiAgICBzcG90LmRhdGFzZXQuY29vcmQgPSBjb29yZC5jb29yZGluYXRlcztcbiAgICBzcG90LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50Q2F0ID0gZ2V0Q3VycmVudENhdCgpO1xuICAgICAgaWYgKGN1cnJlbnRDYXQgPT09IG51bGwpIHJldHVybjtcbiAgICAgIGNvbnN0IGNvb3JkQXJyYXkgPSBwbGF5ZXJCb2FyZC5nZXRDb29yZGluYXRlcyhcbiAgICAgICAgY29vcmQuY29vcmRpbmF0ZXMsXG4gICAgICAgIGN1cnJlbnRDYXRcbiAgICAgICk7XG4gICAgICBpZiAoY29vcmRBcnJheSkge1xuICAgICAgICBoYW5kbGVDbGljayhjb29yZEFycmF5KTtcbiAgICAgICAgYWRkQ2F0SW1nKHNwb3QsIGN1cnJlbnRDYXQpO1xuICAgICAgICBpZiAoY3VycmVudENhdC50eXBlID09PSBcImNvbXBhY3Qga2l0dHlcIikge1xuICAgICAgICAgIHBsYXllckJvYXJkQ29udGFpbmVyLnJlbW92ZUNoaWxkKHJvdGF0ZUJ1dHRvbik7XG4gICAgICAgICAgcGxheWVyQm9hcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc2hyaW5rJyk7XG4gICAgICAgICAgY29tcEJvYXJkQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgICAgY3JlYXRlQ29tcEdhbWVCb2FyZERpc3BsYXkoKTtcbiAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tc2hyaW5rLXNjYWxlJyxgbWluKDEsICR7c2hyaW5rU2l6ZSgpfSlgKTtcbiAgICAgICAgICBjYXRUcmFja2VyLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgICAgYmVnaW5HYW1lKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBwbGF5ZXJCb2FyZERpc3BsYXkuYXBwZW5kQ2hpbGQoc3BvdCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2F0SW1hZ2Uoc291cmNlKSB7XG4gIGNvbnN0IGNhdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNhdC5jbGFzc0xpc3QuYWRkKCdjYXQtdHJhY2tlci1pbWFnZScpO1xuICBjb25zdCBjYXRJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgY2F0SW1nLnNyYyA9IHNvdXJjZTtcbiAgY2F0LmFwcGVuZENoaWxkKGNhdEltZyk7XG4gIHJldHVybiBjYXQ7XG59XG5cbmNvbnN0IGNhdDF0cmFja2VyID0gY3JlYXRlQ2F0SW1hZ2UoY2F0MSk7XG5jb25zdCBjYXQydHJhY2tlciA9IGNyZWF0ZUNhdEltYWdlKGNhdDIpO1xuY29uc3QgY2F0M3RyYWNrZXIgPSBjcmVhdGVDYXRJbWFnZShjYXQzKTtcbmNvbnN0IGNhdDR0cmFja2VyID0gY3JlYXRlQ2F0SW1hZ2UoY2F0NCk7XG5jb25zdCBjYXQ1dHJhY2tlciA9IGNyZWF0ZUNhdEltYWdlKGNhdDUpO1xuXG5jYXRUcmFja2VyLmFwcGVuZChcbiAgY2F0MXRyYWNrZXIsXG4gIGNhdDJ0cmFja2VyLFxuICBjYXQzdHJhY2tlcixcbiAgY2F0NHRyYWNrZXIsXG4gIGNhdDV0cmFja2VyXG4pO1xuXG5leHBvcnQge1xuICBjcmVhdGVQbGF5ZXJHYW1lQm9hcmREaXNwbGF5LFxuICBjcmVhdGVDb21wR2FtZUJvYXJkRGlzcGxheSxcbiAgYWRkQ2F0SW1nLFxuICBhcHBseUhpdEltYWdlLFxufTtcbiIsImltcG9ydCB7IGFwcGx5SGl0SW1hZ2UgfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgeyBjb21wUGxhY2VDYXRzLCBjb21wRmlyZVNob3QsIGNvbXBDYXRzIH0gZnJvbSAnLi9ib3QnO1xuaW1wb3J0IHsgcGxheWVyQm9hcmQsIHBsYXllckNhdHMsIGNvbXBCb2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkLmpzJztcblxuZnVuY3Rpb24gYmVnaW5HYW1lKCkge1xuICBjb21wUGxhY2VDYXRzKCk7XG59XG5cbmZ1bmN0aW9uIGNvbXBSZXRhbGlhdGlvbigpIHtcbiAgY29uc29sZS5sb2cocGxheWVyQm9hcmQpO1xuICBjb25zdCB0YXJnZXQgPSBjb21wRmlyZVNob3QocGxheWVyQm9hcmQsIHBsYXllckNhdHMpO1xuICBjb25zb2xlLmxvZyh0YXJnZXQpO1xuICBwbGF5ZXJCb2FyZC50YWtlQXR0YWNrKHRhcmdldCk7XG4gIGNvbnN0IGRhdGFJRCA9IGBbZGF0YS1jb29yZD0nJHt0YXJnZXR9J11gXG4gIGNvbnNvbGUubG9nKGRhdGFJRCk7XG4gIGNvbnN0IGRvbUNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRhdGFJRCk7XG4gIGFwcGx5SGl0SW1hZ2UoZG9tQ2VsbCwgcGxheWVyQm9hcmQsIHRhcmdldCk7XG59XG5cbmV4cG9ydCB7IGJlZ2luR2FtZSwgY29tcFJldGFsaWF0aW9uIH0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVDYXRzIH0gZnJvbSBcIi4vY2F0XCI7XG5cbmNvbnN0IHBsYWNlID0gKHN0YXRlKSA9PiAoe1xuICBwbGFjZUNhdDogKGNvb3JkaW5hdGVzLCBjYXQpID0+IHtcbiAgICBjb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICBzdGF0ZS5ib2FyZFtgWyR7Y29vcmRpbmF0ZX1dYF0ub2NjdXBpZWRCeSA9IGNhdDtcbiAgICB9KTtcbiAgfSxcbn0pO1xuXG5jb25zdCByZWNlaXZlQXR0YWNrID0gKHN0YXRlKSA9PiAoe1xuICB0YWtlQXR0YWNrOiAoY29vcmQpID0+IHtcbiAgICBjb25zdCBjZWxsID0gc3RhdGUuYm9hcmRbYFske2Nvb3JkfV1gXTtcbiAgICBpZiAoY2VsbC5hdHRhY2tlZCkgcmV0dXJuO1xuICAgIGlmIChjZWxsLm9jY3VwaWVkQnkpIHtcbiAgICAgIGNlbGwub2NjdXBpZWRCeS5oaXQoY29vcmQpO1xuICAgIH1cbiAgICBjZWxsLmF0dGFja2VkID0gdHJ1ZTtcbiAgfSxcbn0pO1xuXG5jb25zdCBjb29yZEludmFsaWQgPSAoc3RhdGUpID0+ICh7XG4gIGNvb3JkaW5hdGVzQXJlSW52YWxpZDogKGFycmF5KSA9PlxuICAgIGFycmF5LmZsYXQoKS5zb21lKChpdGVtKSA9PiBpdGVtIDwgMCB8fCBpdGVtID4gOSkgfHxcbiAgICBhcnJheS5zb21lKChpdGVtKSA9PiBzdGF0ZS5ib2FyZFtgWyR7aXRlbX1dYF0ub2NjdXBpZWRCeSksXG59KTtcblxuY29uc3QgZ2V0Q29vcmQgPSAoc3RhdGUpID0+ICh7XG4gIGdldENvb3JkaW5hdGVzOiAoY29vcmQsIGNhdCkgPT4ge1xuICAgIGNvbnN0IGFycmF5ID0gW107XG4gICAgY29uc3QgW3gsIHldID0gY29vcmQ7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChjYXQub3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICBhcnJheS5wdXNoKFt4LCB5ICsgaV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyYXkucHVzaChbeCArIGksIHldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHN0YXRlLmNvb3JkaW5hdGVzQXJlSW52YWxpZChhcnJheSkpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBhcnJheTtcbiAgfSxcbn0pO1xuXG5jb25zdCBjZWxsQXNzZXNzbWVudCA9IChzdGF0ZSkgPT4gKHtcbiAgZGV0ZXJtaW5lUmVhbEVzdGF0ZTogKHsgbGVuZ3RoLCBvcmllbnRhdGlvbiB9KSA9PiB7XG4gICAgY29uc3QgbGltaXQgPSAxMCAtIGxlbmd0aDtcbiAgICBjb25zdCBhcnJheSA9IFtdO1xuICAgIGxldCB4ID0gMTA7XG4gICAgbGV0IHkgPSAxMDtcbiAgICBpZiAob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgeSA9IGxpbWl0O1xuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gbGltaXQ7XG4gICAgfVxuICAgIGZvciAobGV0IGggPSAwOyBoIDwgeDsgaCsrKSB7XG4gICAgICBmb3IgKGxldCB2ID0gMDsgdiA8IHk7IHYrKykge1xuICAgICAgICBhcnJheS5wdXNoKFtoLCB2XSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGFycmF5TWludXNPdmVybGFwID0gYXJyYXkuZmlsdGVyKChjZWxsKSA9PlxuICAgICAgc3RhdGUuZ2V0Q29vcmRpbmF0ZXMoY2VsbCwgeyBsZW5ndGgsIG9yaWVudGF0aW9uIH0pXG4gICAgKTtcbiAgICByZXR1cm4gYXJyYXlNaW51c092ZXJsYXA7XG4gIH0sXG59KTtcblxuZnVuY3Rpb24gY3JlYXRlU3BvdCh4LCB5KSB7XG4gIHJldHVybiB7XG4gICAgY29vcmRpbmF0ZXM6IFt4LCB5XSxcbiAgICBvY2N1cGllZEJ5OiBudWxsLFxuICAgIGF0dGFja2VkOiBmYWxzZSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlR2FtZUJvYXJkKCkge1xuICBjb25zdCBnYW1lQm9hcmQgPSB7fTtcbiAgZ2FtZUJvYXJkLmJvYXJkID0ge307XG4gIGZvciAobGV0IHkgPSAwOyB5IDwgMTA7IHkgKz0gMSkge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTA7IHggKz0gMSkge1xuICAgICAgZ2FtZUJvYXJkLmJvYXJkW2BbJHt4fSwke3l9XWBdID0gY3JlYXRlU3BvdCh4LCB5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgZ2FtZUJvYXJkLFxuICAgIHBsYWNlKGdhbWVCb2FyZCksXG4gICAgcmVjZWl2ZUF0dGFjayhnYW1lQm9hcmQpLFxuICAgIGNvb3JkSW52YWxpZChnYW1lQm9hcmQpLFxuICAgIGdldENvb3JkKGdhbWVCb2FyZClcbiAgKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tcEdhbWVCb2FyZCgpIHtcbiAgY29uc3QgZ2FtZUJvYXJkID0gY3JlYXRlR2FtZUJvYXJkKCk7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKGdhbWVCb2FyZCwgY2VsbEFzc2Vzc21lbnQoZ2FtZUJvYXJkKSk7XG59XG5cbmNvbnN0IHBsYXllckJvYXJkID0gY3JlYXRlR2FtZUJvYXJkKCk7XG5cbmNvbnN0IGNvbXBCb2FyZCA9IGNyZWF0ZUNvbXBHYW1lQm9hcmQoKTtcblxuY29uc3QgcGxheWVyQ2F0cyA9IGNyZWF0ZUNhdHMoKTtcblxubGV0IGNhdHNQbGFjZWQgPSAwO1xubGV0IGN1cnJlbnRDYXQ7XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnRDYXQoKSB7XG4gIGlmIChjYXRzUGxhY2VkID49IDUpIHJldHVybiBudWxsO1xuICByZXR1cm4gcGxheWVyQ2F0c1tjYXRzUGxhY2VkXTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlQ2xpY2soY29vcmRpbmF0ZXMpIHtcbiAgY3VycmVudENhdCA9IGdldEN1cnJlbnRDYXQoKTtcbiAgcGxheWVyQm9hcmQucGxhY2VDYXQoY29vcmRpbmF0ZXMsIGN1cnJlbnRDYXQpO1xuICBjYXRzUGxhY2VkICs9IDE7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZUdhbWVCb2FyZCwgaGFuZGxlQ2xpY2ssIHBsYXllckJvYXJkLCBjb21wQm9hcmQsIGdldEN1cnJlbnRDYXQsIHBsYXllckNhdHMgfTtcbiIsImltcG9ydCB7IGNyZWF0ZVBsYXllckdhbWVCb2FyZERpc3BsYXkgfSBmcm9tICcuL2RvbSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgY3JlYXRlUGxheWVyR2FtZUJvYXJkRGlzcGxheSgpO1xufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ZvbnQvY29tZm9ydGFhLXZhcmlhYmxlZm9udF93Z2h0LXdlYmZvbnQud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2ZvbnQvY29tZm9ydGFhLXZhcmlhYmxlZm9udF93Z2h0LXdlYmZvbnQud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4vaW1nL2dycmFzcy5qcGVnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi9pbWcvcGV4ZWxzLXBpeG1pa2UtNDEzMTk1LmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJjb21meVxcXCI7XFxuICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLFxcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXFxuOnJvb3Qge1xcbiAgLS1iYWNrZ3JvdW5kOiAjMjgyYTM2O1xcbiAgLS1ib2FyZC1zaXplOiBtaW4oNjB2dywgNTAwcHgpO1xcbiAgLS1jZWxsLXNpemU6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgLyAxMCk7XFxuICAtLWxvZ28tYmFsbC1zaXplOiA3NXB4O1xcbiAgLS1zaHJpbmstc2NhbGU6IDE7XFxuICAtLW1hcmdpbjogY2FsYygoMTAwdncgLSB2YXIoLS1ib2FyZC1zaXplKSkgLyAyKTtcXG4gIC0tc2hydW5rLWJvYXJkOiBjYWxjKHZhcigtLWJvYXJkLXNpemUpICogdmFyKC0tc2hyaW5rLXNjYWxlKSk7XFxuICAvKiAtLWNhdC10cmFja2VyLXNpemU6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiAwLjQpOyAqL1xcbiAgLS1jYXQtdHJhY2tlci1zaXplOiBtaW4oY2FsYyh2YXIoLS1tYXJnaW4pICogMC45NSksIDIwMHB4KTtcXG4gIC0tY2F0LXRyYWNrZXItY2VsbDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMC43NSk7XFxuICAtLW1hcmdpbi10b3A6IGNhbGMoKCgxMDB2aCAtIDEwMHB4KSAtIHZhcigtLWJvYXJkLXNpemUpKSAqIDAuNSlcXG59XFxuXFxuYm9keSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogMTAwcHggMWZyIC8gMWZyIDFmciAxZnI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLyoganVzdGlmeS1pdGVtczogY2VudGVyOyAqL1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gKyBcIik7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1zaXplOiA0MDBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLnRpdGxlIHtcXG4gIGdyaWQtYXJlYTogMSAvIDEgLyAyIC8gLTE7XFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxuICBoZWlnaHQ6IHZhcigtLWxvZ28tYmFsbC1zaXplKTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmciAxZnI7XFxufVxcblxcbi50aXRsZSAuYmFsbDpudGgtY2hpbGQoNCkge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAyO1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcblxcbi50aXRsZSAuYmFsbDpudGgtY2hpbGQoMykge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMiAvIDIgLyAzO1xcbn1cXG5cXG4udGl0bGUgLmJhbGw6bnRoLWNoaWxkKDIpIHtcXG4gIGdyaWQtYXJlYTogMSAvIDMgLyAyIC8gNDtcXG59XFxuXFxuLnRpdGxlIC5iYWxsOm50aC1jaGlsZCgxKSB7XFxuICBncmlkLWFyZWE6IDEgLyA0IC8gMiAvIDU7XFxufVxcblxcbi5iYWxsIHtcXG4gIGJveC1zaGFkb3c6IDFweCAxcHggOHB4IHJnYigyNTUsIDE0MCwgMCk7XFxuICBtYXJnaW4tbGVmdDogY2FsYyh2YXIoLS1sb2dvLWJhbGwtc2l6ZSkgKiAtMC41KTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgaGVpZ2h0OiB2YXIoLS1sb2dvLWJhbGwtc2l6ZSk7XFxuICB3aWR0aDogdmFyKC0tbG9nby1iYWxsLXNpemUpO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGhzbCgzOSwgMTAwJSwgNTglKSwgaHNsKDM5LCAxMDAlLCA1MCUpKTtcXG59XFxuXFxuLndvcmRzIHtcXG4gIGdyaWQtYXJlYTogMSAvIDEgLyAyIC8gLTE7XFxufVxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG4gIGZvbnQtZmFtaWx5OiBjb21meSwgVmVyZGFuYSwgR2VuZXZhLCBUYWhvbWEsIHNhbnMtc2VyaWY7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQtY29udGFpbmVyIHtcXG4gIGdyaWQtYXJlYTogMiAvIDIgLyAzIC8gMztcXG4gIHRyYW5zaXRpb246IDAuM3M7XFxuICBtYXJnaW46IGF1dG87XFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxuICBoZWlnaHQ6IG1pbi1jb250ZW50O1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xcbiAgei1pbmRleDogMztcXG59XFxuXFxuLnBsYXllci1ib2FyZCxcXG4uY29tcC1ib2FyZCB7XFxuICAvKiBib3gtc2l6aW5nOiBib3JkZXItYm94OyAqL1xcbiAgd2lkdGg6IHZhcigtLWJvYXJkLXNpemUpO1xcbiAgaGVpZ2h0OiB2YXIoLS1ib2FyZC1zaXplKTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTAsIGF1dG8pIC8gcmVwZWF0KDEwLCBhdXRvKTtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gKyBcIik7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1zaXplOiB2YXIoLS1jZWxsLXNpemUpIHZhcigtLWNlbGwtc2l6ZSk7XFxufVxcblxcbi5ncmlkLWNlbGwge1xcbiAgei1pbmRleDogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBib3JkZXI6IDAuNXB4IHNvbGlkIHJnYmEoMTI4LCAxMjgsIDEyOCwgMC4xNjQpO1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLmNvbXAtYm9hcmQgLmdyaWQtY2VsbDpob3ZlciB7XFxuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDUwcHggcmdiKDI1NSwgMTIzLCAwKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmNvbXAtYm9hcmQgLmdyaWQtY2VsbDphY3RpdmUge1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCA1MHB4IDEwcHggcmdiKDI1NSwgMTIzLCAwKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZCAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNDYyKTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtb25lIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA1KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5ob3Jpem9udGFsLmNhdC1vbmUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmNhdC10d28gLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDQpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmhvcml6b250YWwuY2F0LXR3byAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNCk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuY2F0LXRocmVlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5ob3Jpem9udGFsLmNhdC10aHJlZSAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMyk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuY2F0LWZvdXIgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIsXFxuLnBsYXllci1ib2FyZC5jYXQtZml2ZSAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuaG9yaXpvbnRhbC5jYXQtZm91ciAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlcixcXG4ucGxheWVyLWJvYXJkLmhvcml6b250YWwuY2F0LWZpdmUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbmsge1xcbiAgc2NhbGU6IHZhcigtLXNocmluay1zY2FsZSk7XFxuICB0cmFuc2xhdGU6IGNhbGMoKHZhcigtLW1hcmdpbikgKyB2YXIoLS1zaHJ1bmstYm9hcmQpKSAqIC0wLjUpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbms6aG92ZXIge1xcbiAgc2NhbGU6IDAuNzU7XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmNhdC1pbWcge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAzcHg7XFxuICByb3RhdGU6IC05MGRlZztcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbi5jYXQxIHtcXG4gIHJpZ2h0OiAtMTBweDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNSk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDUuNSwgNCk7XFxufVxcblxcbi5jYXQxLmhvcml6b250YWwtY2F0IHtcXG4gIHRvcDogNXB4O1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjgsIDIuNyk7XFxufVxcblxcbi5jYXQyIHtcXG4gIHRvcDogNXB4O1xcbiAgbGVmdDogLTVweDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNCk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDQuMywgMi41KTtcXG59XFxuXFxuLmNhdDIuaG9yaXpvbnRhbC1jYXQge1xcbiAgdG9wOiAtM3B4O1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDQpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLjksIDEuNyk7XFxufVxcblxcbi5jYXQzIHtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjUsIDIuNSk7XFxufVxcblxcbi5jYXQzLmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi41LCAxLjgpO1xcbn1cXG5cXG4uY2F0NCB7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMiwgMik7XFxufVxcblxcbi5jYXQ0Lmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41KTtcXG59XFxuXFxuLmNhdDUge1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIsIDEuNSk7XFxufVxcblxcbi5jYXQ1Lmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKCh2YXIoLS1jZWxsLXNpemUpICogMikpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUsIDEuMSk7XFxufVxcblxcbi5ob3Jpem9udGFsLWNhdCB7XFxuICB0b3A6IDBweDtcXG4gIGxlZnQ6IDBweDtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHJvdGF0ZTogMGRlZztcXG59XFxuXFxuLmdyaWQtY2VsbC5hdHRhY2tlZCB7XFxuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDE1cHggb3JhbmdlO1xcbn1cXG5cXG4uZ3JpZC1jZWxsLmF0dGFja2VkOjpiZWZvcmUge1xcbiAgei1pbmRleDogMTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAvIDMpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLyAzKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAxNjYsIDAsIDAuNjk4KTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGluc2V0OiAwO1xcbiAgbWFyZ2luOiBhdXRvO1xcbn1cXG5cXG4uZ3JpZC1jZWxsLmF0dGFja2VkLm9jY3VwaWVkOjpiZWZvcmUge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAvIDEuNSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAvIDEuNSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7XFxufVxcblxcbi5yb3RhdGUtYnV0dG9uIHtcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxuICBib3JkZXI6IG5vbmU7XFxuICB3aWR0aDogMzBweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmNvbXAtYm9hcmQtY29udGFpbmVyIHtcXG4gIGdyaWQtYXJlYTogMiAvIDIgLyAzIC8gMztcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgaW5zZXQ6IDA7XFxuICBtYXJnaW46IGF1dG87XFxuICAvKiBtYXJnaW4tdG9wOiBjYWxjKHZhcigtLWJvYXJkLXNpemUpICogLTEpOyAqL1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIge1xcbiAgbWFyZ2luOiB2YXIoLS1tYXJnaW4tdG9wKSAxMHB4O1xcbiAgLyogbWFyZ2luLWxlZnQ6IDEwcHg7ICovXFxuICAvKiBqdXN0aWZ5LXNlbGY6IGZsZXgtc3RhcnQ7ICovXFxuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgZ3JpZC1hcmVhOiAyIC8gMyAvIDMgLyA0O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoNCwgY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1zaXplKSAvIDQpKSAvIHJlcGVhdChcXG4gICAgICA1LFxcbiAgICAgIGNhbGModmFyKC0tY2F0LXRyYWNrZXItc2l6ZSkgLyA1KVxcbiAgICApO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQwNSk7XFxuICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbiAgd2lkdGg6IHZhcigtLWNhdC10cmFja2VyLXNpemUpO1xcbiAgaGVpZ2h0OiB2YXIoLS1jYXQtdHJhY2tlci1zaXplKTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgZGl2IGltZyB7XFxuICBoZWlnaHQ6IHZhcigtLWNhdC10cmFja2VyLWNlbGwpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgOm50aC1jaGlsZCgxKSB7XFxuICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDI7XFxufVxcblxcbi5jYXQtdHJhY2tlciA6bnRoLWNoaWxkKDEpIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDUpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjQsIDIuNyk7XFxuICBtYXJnaW4tYm90dG9tOiAtMTAlO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgOm50aC1jaGlsZCgyKSB7XFxuICBncmlkLWFyZWE6IDIgLyAxIC8gMyAvIDI7XFxufVxcblxcbi5jYXQtdHJhY2tlciA6bnRoLWNoaWxkKDIpIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDQpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLjksIDEuNyk7XFxufVxcblxcbi5jYXQtdHJhY2tlciA6bnRoLWNoaWxkKDMpIHtcXG4gIGdyaWQtYXJlYTogMyAvIDEgLyA0IC8gMjtcXG59XFxuXFxuLmNhdC10cmFja2VyIDpudGgtY2hpbGQoMykgaW1nIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLWNlbGwpICogMyk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIuNSwgMS44KTtcXG59XFxuXFxuLmNhdC10cmFja2VyIDpudGgtY2hpbGQoNCkge1xcbiAgZ3JpZC1hcmVhOiA0IC8gMSAvIDUgLyAyO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgOm50aC1jaGlsZCg0KSBpbWcge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItY2VsbCkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41KTtcXG59XFxuXFxuLmNhdC10cmFja2VyIDpudGgtY2hpbGQoNSkge1xcbiAgZ3JpZC1hcmVhOiA0IC8gMyAvIDUgLyA1O1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgOm50aC1jaGlsZCg1KSBpbWcge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItY2VsbCkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41LCAxLjEpO1xcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDkwMHB4KSB7XFxufVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogODUwcHgpIHtcXG4gIDpyb290IHtcXG4gICAgLS1zY2FsZS1zaXplOiAwLjQ7XFxuICAgIC0tYm9hcmQtc2l6ZTogbWluKDYwdmgsIDkwdncpO1xcbiAgICAtLWxvZ28tYmFsbC1zaXplOiA1MHB4O1xcbiAgICAtLXNlY29uZC1yb3c6IGNhbGMoKDk1dmggLSA1MHB4KSAqICgxIC8gKDEuMyArIDEpKSk7XFxuICAgIC0tdGhpcmQtcm93OiBjYWxjKCg5NXZoIC0gNTBweCkgKiAoMS4zIC8gKDEuMyArIDEpKSk7XFxuICAgIC0tbWluaS1ib2FyZC1zaXplOiBjYWxjKHZhcigtLWJvYXJkLXNpemUpICogdmFyKC0tc2NhbGUtc2l6ZSkpO1xcbiAgICAtLWNhdC10cmFja2VyLXNpemU6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiAwLjQpO1xcbiAgfVxcblxcbiAgYm9keSB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGU6IDV2aCAxZnIgMS4zZnIgNTBweC8gNTB2dyA1MHZ3O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuXFxuICAudGl0bGUge1xcbiAgICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDM7XFxuICAgIG1hcmdpbi10b3A6IDA7XFxuICB9XFxuXFxuICBoMSB7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gIH1cXG5cXG4gIC5wbGF5ZXItYm9hcmQtY29udGFpbmVyIHtcXG4gICAgZ3JpZC1hcmVhOiAzIC8gMSAvIDQgLyAzO1xcbiAgfVxcblxcbiAgLnBsYXllci1ib2FyZC1jb250YWluZXIuc2hyaW5rIHtcXG4gICAgc2NhbGU6IHZhcigtLXNjYWxlLXNpemUpO1xcbiAgICB0cmFuc2xhdGU6IDBweFxcbiAgICAgIGNhbGMoXFxuICAgICAgICAoXFxuICAgICAgICAgICAgdmFyKC0tdGhpcmQtcm93KSAtIHZhcigtLWJvYXJkLXNpemUpICsgdmFyKC0tc2Vjb25kLXJvdykgK1xcbiAgICAgICAgICAgICAgdmFyKC0tbWluaS1ib2FyZC1zaXplKVxcbiAgICAgICAgICApICogLTAuNVxcbiAgICAgICk7XFxuICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgfVxcblxcbiAgLnBsYXllci1ib2FyZC1jb250YWluZXIuc2hyaW5rOmhvdmVyIHtcXG4gICAgc2NhbGU6IDAuNzU7XFxuICB9XFxuXFxuICAuY29tcC1ib2FyZC1jb250YWluZXIge1xcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGdyaWQtYXJlYTogMyAvIDEgLyA0IC8gMztcXG4gIH1cXG5cXG4gIC5jYXQtdHJhY2tlciB7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgZ3JpZC1hcmVhOiAyIC8gMiAvIDMgLyAzO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQ1MHB4KSB7XFxuICA6cm9vdCB7XFxuICAgIC0tc2NhbGUtc2l6ZTogMC41O1xcbiAgfVxcblxcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usb0JBQW9CO0VBQ3BCOzBEQUN1RTtFQUN2RSxnQkFBZ0I7RUFDaEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLDhCQUE4QjtFQUM5Qix5Q0FBeUM7RUFDekMsc0JBQXNCO0VBQ3RCLGlCQUFpQjtFQUNqQiwrQ0FBK0M7RUFDL0MsNkRBQTZEO0VBQzdELHVEQUF1RDtFQUN2RCwwREFBMEQ7RUFDMUQsaURBQWlEO0VBQ2pEO0FBQ0Y7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0NBQXNDO0VBQ3RDLG1CQUFtQjtFQUNuQiwyQkFBMkI7RUFDM0IsU0FBUztFQUNULFVBQVU7RUFDVixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGFBQWE7RUFDYixZQUFZO0VBQ1osbURB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Q3hDLDBCQUEwQjtBQUM1Qjs7QUFFQTtBQUNBOztBQUVBO0VBQ0U7SUFDRSxpQkFBaUI7SUFDakIsNkJBQTZCO0lBQzdCLHNCQUFzQjtJQUN0QixtREFBbUQ7SUFDbkQsb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCxpREFBaUQ7RUFDbkQ7O0VBRUE7SUFDRSxhQUFhO0lBQ2IsNENBQTRDO0lBQzVDLG1CQUFtQjtJQUNuQixxQkFBcUI7RUFDdkI7O0VBRUE7SUFDRSx3QkFBd0I7SUFDeEIsYUFBYTtFQUNmOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLHdCQUF3QjtFQUMxQjs7RUFFQTtJQUNFLHdCQUF3QjtJQUN4Qjs7Ozs7O09BTUc7SUFDSCxvQkFBb0I7RUFDdEI7O0VBRUE7SUFDRSxXQUFXO0VBQ2I7O0VBRUE7SUFDRSxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLGtCQUFrQjtJQUNsQix3QkFBd0I7RUFDMUI7O0VBRUE7SUFDRSxZQUFZO0lBQ1osd0JBQXdCO0VBQzFCO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLGlCQUFpQjtFQUNuQjs7QUFFRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiY29tZnlcXFwiO1xcbiAgc3JjOiB1cmwoXFxcIi4vZm9udC9jb21mb3J0YWEtdmFyaWFibGVmb250X3dnaHQtd2ViZm9udC53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSxcXG4gICAgdXJsKFxcXCIuL2ZvbnQvY29tZm9ydGFhLXZhcmlhYmxlZm9udF93Z2h0LXdlYmZvbnQud29mZlxcXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXFxuOnJvb3Qge1xcbiAgLS1iYWNrZ3JvdW5kOiAjMjgyYTM2O1xcbiAgLS1ib2FyZC1zaXplOiBtaW4oNjB2dywgNTAwcHgpO1xcbiAgLS1jZWxsLXNpemU6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgLyAxMCk7XFxuICAtLWxvZ28tYmFsbC1zaXplOiA3NXB4O1xcbiAgLS1zaHJpbmstc2NhbGU6IDE7XFxuICAtLW1hcmdpbjogY2FsYygoMTAwdncgLSB2YXIoLS1ib2FyZC1zaXplKSkgLyAyKTtcXG4gIC0tc2hydW5rLWJvYXJkOiBjYWxjKHZhcigtLWJvYXJkLXNpemUpICogdmFyKC0tc2hyaW5rLXNjYWxlKSk7XFxuICAvKiAtLWNhdC10cmFja2VyLXNpemU6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiAwLjQpOyAqL1xcbiAgLS1jYXQtdHJhY2tlci1zaXplOiBtaW4oY2FsYyh2YXIoLS1tYXJnaW4pICogMC45NSksIDIwMHB4KTtcXG4gIC0tY2F0LXRyYWNrZXItY2VsbDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMC43NSk7XFxuICAtLW1hcmdpbi10b3A6IGNhbGMoKCgxMDB2aCAtIDEwMHB4KSAtIHZhcigtLWJvYXJkLXNpemUpKSAqIDAuNSlcXG59XFxuXFxuYm9keSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogMTAwcHggMWZyIC8gMWZyIDFmciAxZnI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLyoganVzdGlmeS1pdGVtczogY2VudGVyOyAqL1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGJhY2tncm91bmQ6IHVybChcXFwiLi9pbWcvZ3JyYXNzLmpwZWdcXFwiKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDQwMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4udGl0bGUge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAtMTtcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIGhlaWdodDogdmFyKC0tbG9nby1iYWxsLXNpemUpO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyIDFmcjtcXG59XFxuXFxuLnRpdGxlIC5iYWxsOm50aC1jaGlsZCg0KSB7XFxuICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDI7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuXFxuLnRpdGxlIC5iYWxsOm50aC1jaGlsZCgzKSB7XFxuICBncmlkLWFyZWE6IDEgLyAyIC8gMiAvIDM7XFxufVxcblxcbi50aXRsZSAuYmFsbDpudGgtY2hpbGQoMikge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMyAvIDIgLyA0O1xcbn1cXG5cXG4udGl0bGUgLmJhbGw6bnRoLWNoaWxkKDEpIHtcXG4gIGdyaWQtYXJlYTogMSAvIDQgLyAyIC8gNTtcXG59XFxuXFxuLmJhbGwge1xcbiAgYm94LXNoYWRvdzogMXB4IDFweCA4cHggcmdiKDI1NSwgMTQwLCAwKTtcXG4gIG1hcmdpbi1sZWZ0OiBjYWxjKHZhcigtLWxvZ28tYmFsbC1zaXplKSAqIC0wLjUpO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBoZWlnaHQ6IHZhcigtLWxvZ28tYmFsbC1zaXplKTtcXG4gIHdpZHRoOiB2YXIoLS1sb2dvLWJhbGwtc2l6ZSk7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoaHNsKDM5LCAxMDAlLCA1OCUpLCBoc2woMzksIDEwMCUsIDUwJSkpO1xcbn1cXG5cXG4ud29yZHMge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAtMTtcXG59XFxuaDEge1xcbiAgZm9udC1zaXplOiAycmVtO1xcbiAgZm9udC1mYW1pbHk6IGNvbWZ5LCBWZXJkYW5hLCBHZW5ldmEsIFRhaG9tYSwgc2Fucy1zZXJpZjtcXG59XFxuXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIge1xcbiAgZ3JpZC1hcmVhOiAyIC8gMiAvIDMgLyAzO1xcbiAgdHJhbnNpdGlvbjogMC4zcztcXG4gIG1hcmdpbjogYXV0bztcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XFxuICB6LWluZGV4OiAzO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLFxcbi5jb21wLWJvYXJkIHtcXG4gIC8qIGJveC1zaXppbmc6IGJvcmRlci1ib3g7ICovXFxuICB3aWR0aDogdmFyKC0tYm9hcmQtc2l6ZSk7XFxuICBoZWlnaHQ6IHZhcigtLWJvYXJkLXNpemUpO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCgxMCwgYXV0bykgLyByZXBlYXQoMTAsIGF1dG8pO1xcbiAgYmFja2dyb3VuZDogdXJsKFxcXCIuL2ltZy9wZXhlbHMtcGl4bWlrZS00MTMxOTUuanBnXFxcIik7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1zaXplOiB2YXIoLS1jZWxsLXNpemUpIHZhcigtLWNlbGwtc2l6ZSk7XFxufVxcblxcbi5ncmlkLWNlbGwge1xcbiAgei1pbmRleDogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBib3JkZXI6IDAuNXB4IHNvbGlkIHJnYmEoMTI4LCAxMjgsIDEyOCwgMC4xNjQpO1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLmNvbXAtYm9hcmQgLmdyaWQtY2VsbDpob3ZlciB7XFxuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDUwcHggcmdiKDI1NSwgMTIzLCAwKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmNvbXAtYm9hcmQgLmdyaWQtY2VsbDphY3RpdmUge1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCA1MHB4IDEwcHggcmdiKDI1NSwgMTIzLCAwKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZCAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNDYyKTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtb25lIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA1KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5ob3Jpem9udGFsLmNhdC1vbmUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmNhdC10d28gLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDQpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmhvcml6b250YWwuY2F0LXR3byAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNCk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuY2F0LXRocmVlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5ob3Jpem9udGFsLmNhdC10aHJlZSAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMyk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuY2F0LWZvdXIgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIsXFxuLnBsYXllci1ib2FyZC5jYXQtZml2ZSAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuaG9yaXpvbnRhbC5jYXQtZm91ciAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlcixcXG4ucGxheWVyLWJvYXJkLmhvcml6b250YWwuY2F0LWZpdmUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbmsge1xcbiAgc2NhbGU6IHZhcigtLXNocmluay1zY2FsZSk7XFxuICB0cmFuc2xhdGU6IGNhbGMoKHZhcigtLW1hcmdpbikgKyB2YXIoLS1zaHJ1bmstYm9hcmQpKSAqIC0wLjUpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbms6aG92ZXIge1xcbiAgc2NhbGU6IDAuNzU7XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmNhdC1pbWcge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAzcHg7XFxuICByb3RhdGU6IC05MGRlZztcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbi5jYXQxIHtcXG4gIHJpZ2h0OiAtMTBweDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNSk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDUuNSwgNCk7XFxufVxcblxcbi5jYXQxLmhvcml6b250YWwtY2F0IHtcXG4gIHRvcDogNXB4O1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjgsIDIuNyk7XFxufVxcblxcbi5jYXQyIHtcXG4gIHRvcDogNXB4O1xcbiAgbGVmdDogLTVweDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNCk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDQuMywgMi41KTtcXG59XFxuXFxuLmNhdDIuaG9yaXpvbnRhbC1jYXQge1xcbiAgdG9wOiAtM3B4O1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDQpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLjksIDEuNyk7XFxufVxcblxcbi5jYXQzIHtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjUsIDIuNSk7XFxufVxcblxcbi5jYXQzLmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi41LCAxLjgpO1xcbn1cXG5cXG4uY2F0NCB7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMiwgMik7XFxufVxcblxcbi5jYXQ0Lmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41KTtcXG59XFxuXFxuLmNhdDUge1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIsIDEuNSk7XFxufVxcblxcbi5jYXQ1Lmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKCh2YXIoLS1jZWxsLXNpemUpICogMikpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUsIDEuMSk7XFxufVxcblxcbi5ob3Jpem9udGFsLWNhdCB7XFxuICB0b3A6IDBweDtcXG4gIGxlZnQ6IDBweDtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHJvdGF0ZTogMGRlZztcXG59XFxuXFxuLmdyaWQtY2VsbC5hdHRhY2tlZCB7XFxuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDE1cHggb3JhbmdlO1xcbn1cXG5cXG4uZ3JpZC1jZWxsLmF0dGFja2VkOjpiZWZvcmUge1xcbiAgei1pbmRleDogMTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAvIDMpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLyAzKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAxNjYsIDAsIDAuNjk4KTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGluc2V0OiAwO1xcbiAgbWFyZ2luOiBhdXRvO1xcbn1cXG5cXG4uZ3JpZC1jZWxsLmF0dGFja2VkLm9jY3VwaWVkOjpiZWZvcmUge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAvIDEuNSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAvIDEuNSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7XFxufVxcblxcbi5yb3RhdGUtYnV0dG9uIHtcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxuICBib3JkZXI6IG5vbmU7XFxuICB3aWR0aDogMzBweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmNvbXAtYm9hcmQtY29udGFpbmVyIHtcXG4gIGdyaWQtYXJlYTogMiAvIDIgLyAzIC8gMztcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgaW5zZXQ6IDA7XFxuICBtYXJnaW46IGF1dG87XFxuICAvKiBtYXJnaW4tdG9wOiBjYWxjKHZhcigtLWJvYXJkLXNpemUpICogLTEpOyAqL1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIge1xcbiAgbWFyZ2luOiB2YXIoLS1tYXJnaW4tdG9wKSAxMHB4O1xcbiAgLyogbWFyZ2luLWxlZnQ6IDEwcHg7ICovXFxuICAvKiBqdXN0aWZ5LXNlbGY6IGZsZXgtc3RhcnQ7ICovXFxuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgZ3JpZC1hcmVhOiAyIC8gMyAvIDMgLyA0O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoNCwgY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1zaXplKSAvIDQpKSAvIHJlcGVhdChcXG4gICAgICA1LFxcbiAgICAgIGNhbGModmFyKC0tY2F0LXRyYWNrZXItc2l6ZSkgLyA1KVxcbiAgICApO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQwNSk7XFxuICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbiAgd2lkdGg6IHZhcigtLWNhdC10cmFja2VyLXNpemUpO1xcbiAgaGVpZ2h0OiB2YXIoLS1jYXQtdHJhY2tlci1zaXplKTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgZGl2IGltZyB7XFxuICBoZWlnaHQ6IHZhcigtLWNhdC10cmFja2VyLWNlbGwpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgOm50aC1jaGlsZCgxKSB7XFxuICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDI7XFxufVxcblxcbi5jYXQtdHJhY2tlciA6bnRoLWNoaWxkKDEpIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDUpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjQsIDIuNyk7XFxuICBtYXJnaW4tYm90dG9tOiAtMTAlO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgOm50aC1jaGlsZCgyKSB7XFxuICBncmlkLWFyZWE6IDIgLyAxIC8gMyAvIDI7XFxufVxcblxcbi5jYXQtdHJhY2tlciA6bnRoLWNoaWxkKDIpIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDQpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLjksIDEuNyk7XFxufVxcblxcbi5jYXQtdHJhY2tlciA6bnRoLWNoaWxkKDMpIHtcXG4gIGdyaWQtYXJlYTogMyAvIDEgLyA0IC8gMjtcXG59XFxuXFxuLmNhdC10cmFja2VyIDpudGgtY2hpbGQoMykgaW1nIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLWNlbGwpICogMyk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIuNSwgMS44KTtcXG59XFxuXFxuLmNhdC10cmFja2VyIDpudGgtY2hpbGQoNCkge1xcbiAgZ3JpZC1hcmVhOiA0IC8gMSAvIDUgLyAyO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgOm50aC1jaGlsZCg0KSBpbWcge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItY2VsbCkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41KTtcXG59XFxuXFxuLmNhdC10cmFja2VyIDpudGgtY2hpbGQoNSkge1xcbiAgZ3JpZC1hcmVhOiA0IC8gMyAvIDUgLyA1O1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgOm50aC1jaGlsZCg1KSBpbWcge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItY2VsbCkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41LCAxLjEpO1xcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDkwMHB4KSB7XFxufVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogODUwcHgpIHtcXG4gIDpyb290IHtcXG4gICAgLS1zY2FsZS1zaXplOiAwLjQ7XFxuICAgIC0tYm9hcmQtc2l6ZTogbWluKDYwdmgsIDkwdncpO1xcbiAgICAtLWxvZ28tYmFsbC1zaXplOiA1MHB4O1xcbiAgICAtLXNlY29uZC1yb3c6IGNhbGMoKDk1dmggLSA1MHB4KSAqICgxIC8gKDEuMyArIDEpKSk7XFxuICAgIC0tdGhpcmQtcm93OiBjYWxjKCg5NXZoIC0gNTBweCkgKiAoMS4zIC8gKDEuMyArIDEpKSk7XFxuICAgIC0tbWluaS1ib2FyZC1zaXplOiBjYWxjKHZhcigtLWJvYXJkLXNpemUpICogdmFyKC0tc2NhbGUtc2l6ZSkpO1xcbiAgICAtLWNhdC10cmFja2VyLXNpemU6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiAwLjQpO1xcbiAgfVxcblxcbiAgYm9keSB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGU6IDV2aCAxZnIgMS4zZnIgNTBweC8gNTB2dyA1MHZ3O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuXFxuICAudGl0bGUge1xcbiAgICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDM7XFxuICAgIG1hcmdpbi10b3A6IDA7XFxuICB9XFxuXFxuICBoMSB7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gIH1cXG5cXG4gIC5wbGF5ZXItYm9hcmQtY29udGFpbmVyIHtcXG4gICAgZ3JpZC1hcmVhOiAzIC8gMSAvIDQgLyAzO1xcbiAgfVxcblxcbiAgLnBsYXllci1ib2FyZC1jb250YWluZXIuc2hyaW5rIHtcXG4gICAgc2NhbGU6IHZhcigtLXNjYWxlLXNpemUpO1xcbiAgICB0cmFuc2xhdGU6IDBweFxcbiAgICAgIGNhbGMoXFxuICAgICAgICAoXFxuICAgICAgICAgICAgdmFyKC0tdGhpcmQtcm93KSAtIHZhcigtLWJvYXJkLXNpemUpICsgdmFyKC0tc2Vjb25kLXJvdykgK1xcbiAgICAgICAgICAgICAgdmFyKC0tbWluaS1ib2FyZC1zaXplKVxcbiAgICAgICAgICApICogLTAuNVxcbiAgICAgICk7XFxuICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgfVxcblxcbiAgLnBsYXllci1ib2FyZC1jb250YWluZXIuc2hyaW5rOmhvdmVyIHtcXG4gICAgc2NhbGU6IDAuNzU7XFxuICB9XFxuXFxuICAuY29tcC1ib2FyZC1jb250YWluZXIge1xcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGdyaWQtYXJlYTogMyAvIDEgLyA0IC8gMztcXG4gIH1cXG5cXG4gIC5jYXQtdHJhY2tlciB7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgZ3JpZC1hcmVhOiAyIC8gMiAvIDMgLyAzO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQ1MHB4KSB7XFxuICA6cm9vdCB7XFxuICAgIC0tc2NhbGUtc2l6ZTogMC41O1xcbiAgfVxcblxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpOyAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH0gLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXG5cbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IGluaXQgZnJvbSAnLi9pbml0JztcblxuaW5pdCgpO1xuXG5cbiJdLCJuYW1lcyI6WyJjcmVhdGVDYXRzIiwiY29tcEJvYXJkIiwicmFuZG9tSW5kZXgiLCJhcnJheSIsIk1hdGgiLCJmbG9vciIsImxlbmd0aCIsInJhbmRvbSIsImNvbXBDYXRzIiwiY29tcFBsYWNlQ2F0cyIsImZvckVhY2giLCJjYXQiLCJyYW5kb21pemVPcmllbnRhdGlvbiIsInBvdGVudGlhbFBsYWNlbWVudHMiLCJkZXRlcm1pbmVSZWFsRXN0YXRlIiwiYXJyYXlPZkNvb3JkIiwiZ2V0Q29vcmRpbmF0ZXMiLCJwbGFjZUNhdCIsImRldGVybWluZU9yaWVudGF0aW9uIiwiYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyIsInN0YXJ0IiwiYm9hcmRJRCIsImF4aXMiLCJkaXJlY3Rpb24iLCJhbGxEaXIiLCJ4IiwieSIsInVwIiwicmlnaHQiLCJkb3duIiwibGVmdCIsInNvbWUiLCJudW0iLCJvcHBCb2FyZENlbGwiLCJib2FyZCIsImF0dGFja2VkIiwib2NjdXBpZWRCeSIsImZpbHRlciIsIm9wdCIsImNvbXBGaXJlU2hvdCIsIm9wcG9uZW50Qm9hcmQiLCJvcHBvbmVudENhdHMiLCJ3b3VuZGVkVGFyZ2V0cyIsInBvc3NpYmxlSGl0cyIsImhpdHMiLCJpc1N1bmsiLCJwdXNoIiwicHJpbWFyeVRhcmdldCIsImNvb3JkSGl0Iiwib3JpZW50YXRpb24iLCJPYmplY3QiLCJrZXlzIiwiY2VsbCIsImNvb3JkaW5hdGVzIiwiQ2F0IiwiY29uc3RydWN0b3IiLCJ0eXBlIiwiaGl0IiwiY29vcmQiLCJyb3RhdGUiLCJjYXQxIiwiY2F0MiIsImNhdDMiLCJjYXQ0IiwiY2F0NSIsInJvdGF0ZUljb24iLCJoYW5kbGVDbGljayIsInBsYXllckJvYXJkIiwiZ2V0Q3VycmVudENhdCIsImJlZ2luR2FtZSIsImNvbXBSZXRhbGlhdGlvbiIsInBsYXllckJvYXJkQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicGxheWVyQm9hcmREaXNwbGF5IiwiY29tcEJvYXJkQ29udGFpbmVyIiwiY29tcEJvYXJkRGlzcGxheSIsImNhdFRyYWNrZXIiLCJyb3RhdGVDYXQiLCJjdXJyZW50Q2F0IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXkiLCJyb3RhdGVCdXR0b24iLCJjcmVhdGVFbGVtZW50Iiwicm90YXRlSW1nIiwiSW1hZ2UiLCJzcmMiLCJhZGQiLCJhcHBlbmRDaGlsZCIsImFkZENhdEltZyIsImRlc3RpbmF0aW9uIiwiY2F0SW1nIiwiY2xhc3NOYW1lIiwiYXBwbHlIaXRJbWFnZSIsInRhcmdldCIsImNyZWF0ZUNvbXBHYW1lQm9hcmREaXNwbGF5IiwidmFsdWVzIiwidGFrZUF0dGFjayIsInNocmlua1NpemUiLCJvcmlnaW5hbFNpemUiLCJvZmZzZXRXaWR0aCIsIndpbmRvd1dpZHRoIiwiaW5uZXJXaWR0aCIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJjcmVhdGVQbGF5ZXJHYW1lQm9hcmREaXNwbGF5Iiwic3BvdCIsImRhdGFzZXQiLCJjb29yZEFycmF5IiwicmVtb3ZlQ2hpbGQiLCJkaXNwbGF5IiwidmlzaWJpbGl0eSIsImNyZWF0ZUNhdEltYWdlIiwic291cmNlIiwiY2F0MXRyYWNrZXIiLCJjYXQydHJhY2tlciIsImNhdDN0cmFja2VyIiwiY2F0NHRyYWNrZXIiLCJjYXQ1dHJhY2tlciIsImFwcGVuZCIsInBsYXllckNhdHMiLCJjb25zb2xlIiwibG9nIiwiZGF0YUlEIiwiZG9tQ2VsbCIsInBsYWNlIiwic3RhdGUiLCJjb29yZGluYXRlIiwicmVjZWl2ZUF0dGFjayIsImNvb3JkSW52YWxpZCIsImNvb3JkaW5hdGVzQXJlSW52YWxpZCIsImZsYXQiLCJpdGVtIiwiZ2V0Q29vcmQiLCJpIiwiY2VsbEFzc2Vzc21lbnQiLCJsaW1pdCIsImgiLCJ2IiwiYXJyYXlNaW51c092ZXJsYXAiLCJjcmVhdGVTcG90IiwiY3JlYXRlR2FtZUJvYXJkIiwiZ2FtZUJvYXJkIiwiYXNzaWduIiwiY3JlYXRlQ29tcEdhbWVCb2FyZCIsImNhdHNQbGFjZWQiLCJpbml0Il0sInNvdXJjZVJvb3QiOiIifQ==