/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
  hit() {
    this.hits += 1;
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
  const cat5 = new Cat(1, "compact kitty");
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
/* harmony export */   "createCompGameBoardDisplay": () => (/* binding */ createCompGameBoardDisplay),
/* harmony export */   "createPlayerGameBoardDisplay": () => (/* binding */ createPlayerGameBoardDisplay)
/* harmony export */ });
/* harmony import */ var _img_big_stretch_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./img/big-stretch.svg */ "./src/img/big-stretch.svg");
/* harmony import */ var _img_cat2_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./img/cat2.svg */ "./src/img/cat2.svg");
/* harmony import */ var _img_walk_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/walk.svg */ "./src/img/walk.svg");
/* harmony import */ var _img_quasi_loaf2_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./img/quasi-loaf2.svg */ "./src/img/quasi-loaf2.svg");
/* harmony import */ var _img_lesRoll_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./img/lesRoll.svg */ "./src/img/lesRoll.svg");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* eslint-disable default-case */
/* eslint-disable no-restricted-syntax */






const playerBoardContainer = document.querySelector(".player-board-container");
const playerBoardDisplay = document.querySelector(".player-board");
const compBoardContainer = document.querySelector('.comp-board-container');
const compBoardDisplay = document.querySelector('.comp-board');
function rotateCat() {
  const currentCat = (0,_gameboard__WEBPACK_IMPORTED_MODULE_5__.getCurrentCat)();
  if (!currentCat) return;
  currentCat.rotate();
  playerBoardDisplay.classList.toggle("horizontal");
}
window.addEventListener('keydown', e => {
  if (e.key === "Shift") {
    rotateCat();
  }
  ;
});
const rotateButton = document.createElement("button");
rotateButton.classList.add("rotate-button");
rotateButton.innerText = "Rotate";
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
function createPlayerGameBoardDisplay() {
  for (const coord of Object.values(_gameboard__WEBPACK_IMPORTED_MODULE_5__.playerBoard.board)) {
    const spot = document.createElement("div");
    spot.classList.add("grid-cell");
    spot.addEventListener("click", () => {
      const currentCat = (0,_gameboard__WEBPACK_IMPORTED_MODULE_5__.getCurrentCat)();
      if (currentCat === null) return;
      const coordArray = _gameboard__WEBPACK_IMPORTED_MODULE_5__.playerBoard.getCoordinates(coord.coordinates, currentCat);
      if (coordArray) {
        (0,_gameboard__WEBPACK_IMPORTED_MODULE_5__.handleClick)(coordArray);
        addCatImg(spot, currentCat);
      }
    });
    playerBoardDisplay.appendChild(spot);
  }
}
function createCompGameBoardDisplay() {
  for (const {
    coordinates
  } of Object.values(_gameboard__WEBPACK_IMPORTED_MODULE_5__.compBoard.board)) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    cell.addEventListener('click', () => {
      _gameboard__WEBPACK_IMPORTED_MODULE_5__.compBoard.takeAttack(coordinates);
    });
    compBoardDisplay.appendChild(cell);
  }
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
/* harmony export */   "playerBoard": () => (/* binding */ playerBoard)
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
      cell.occupiedBy.hit();
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
        array.push([x + i, y]);
      } else {
        array.push([x, y + i]);
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
  for (let x = 0; x < 10; x += 1) {
    for (let y = 0; y < 10; y += 1) {
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
  (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createCompGameBoardDisplay)();
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
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* @font-face {\n  font-family: 'MyFont';\n  src: url('./my-font.woff2') format('woff2'),\n    url('./my-font.woff') format('woff');\n  font-weight: 600;\n  font-style: normal;\n}; */\n:root {\n  --cell-size: 8vw;\n}\nbody {\n  height: 100%;\n}\n\n.player-board, \n.comp-board {\n  width: min-content;\n  display: grid;\n  grid-template: repeat(10, auto) / repeat(10, auto);\n}\n\n.grid-cell {\n  border: 0.5px solid rgba(128, 128, 128, 0.164);\n  width: var(--cell-size);\n  height: var(--cell-size);\n  position: relative;\n}\n\n.comp-board .grid-cell:hover {\n  box-shadow: inset 0px 0px 5px grey;\n  cursor: pointer;\n}\n.player-board .grid-cell:hover::after {\n  position: absolute;\n  content: '';\n  background-color: black;\n  border-radius: 5px;\n}\n\n.player-board.cat-one .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 5);\n}\n\n.player-board.horizontal.cat-one .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 5);\n}\n\n.player-board.cat-two .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 4);\n}\n\n.player-board.horizontal.cat-two .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 4);\n}\n\n.player-board.cat-three .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 3);\n}\n\n.player-board.horizontal.cat-three .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 3);\n}\n\n.player-board.cat-four .grid-cell:hover::after,\n.player-board.cat-five .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 2);\n}\n\n.player-board.horizontal.cat-four .grid-cell:hover::after,\n.player-board.horizontal.cat-five .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 2);\n}\n\n.cat-img {\n  position: absolute;\n  top: 3px;\n  rotate: -90deg;\n  width: var(--cell-size);\n  pointer-events: none;\n}\n\n.cat1 {\n  right: -10px;\n  height: calc(var(--cell-size) * 5);\n  transform: scale(5.5, 4);\n}\n\n.cat1.horizontal-cat {\n  top: -5px;\n  rotate: 180deg;\n  width: calc(var(--cell-size) * 5);\n  transform: scale(3.8, 2.7);\n}\n\n.cat2 {\n  top: 5px;\n  left: -5px;\n  height: calc(var(--cell-size) * 4);\n  transform: scale(4.3, 2.5);\n}\n\n.cat2.horizontal-cat {\n  top: -3px;\n  width: calc(var(--cell-size) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat3 {\n  height: calc(var(--cell-size) * 3);\n  transform: scale(3.5, 2.5);\n}\n\n.cat3.horizontal-cat {\n  width: calc(var(--cell-size) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat4 {\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 2);\n}\n\n.cat4.horizontal-cat {\n  width: calc(var(--cell-size) * 2);\n  transform: scale(1.5);\n}\n\n.cat5 {\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 1.5);\n}\n\n.cat5.horizontal-cat {\n  width: calc((var(--cell-size) * 2));\n  transform: scale(1.5, 1.1);\n}\n\n.horizontal-cat {\n  top: 0px;\n  left: 0px;\n  height: var(--cell-size);\n  rotate: 0deg;\n}\n\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;;;;;;IAMI;AACJ;EACE,gBAAgB;AAClB;AACA;EACE,YAAY;AACd;;AAEA;;EAEE,kBAAkB;EAClB,aAAa;EACb,kDAAkD;AACpD;;AAEA;EACE,8CAA8C;EAC9C,uBAAuB;EACvB,wBAAwB;EACxB,kBAAkB;AACpB;;AAEA;EACE,kCAAkC;EAClC,eAAe;AACjB;AACA;EACE,kBAAkB;EAClB,WAAW;EACX,uBAAuB;EACvB,kBAAkB;AACpB;;AAEA;EACE,uBAAuB;EACvB,kCAAkC;AACpC;;AAEA;EACE,wBAAwB;EACxB,iCAAiC;AACnC;;AAEA;EACE,uBAAuB;EACvB,kCAAkC;AACpC;;AAEA;EACE,wBAAwB;EACxB,iCAAiC;AACnC;;AAEA;EACE,uBAAuB;EACvB,kCAAkC;AACpC;;AAEA;EACE,wBAAwB;EACxB,iCAAiC;AACnC;;AAEA;;EAEE,uBAAuB;EACvB,kCAAkC;AACpC;;AAEA;;EAEE,wBAAwB;EACxB,iCAAiC;AACnC;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,cAAc;EACd,uBAAuB;EACvB,oBAAoB;AACtB;;AAEA;EACE,YAAY;EACZ,kCAAkC;EAClC,wBAAwB;AAC1B;;AAEA;EACE,SAAS;EACT,cAAc;EACd,iCAAiC;EACjC,0BAA0B;AAC5B;;AAEA;EACE,QAAQ;EACR,UAAU;EACV,kCAAkC;EAClC,0BAA0B;AAC5B;;AAEA;EACE,SAAS;EACT,iCAAiC;EACjC,0BAA0B;AAC5B;;AAEA;EACE,kCAAkC;EAClC,0BAA0B;AAC5B;;AAEA;EACE,iCAAiC;EACjC,0BAA0B;AAC5B;;AAEA;EACE,kCAAkC;EAClC,sBAAsB;AACxB;;AAEA;EACE,iCAAiC;EACjC,qBAAqB;AACvB;;AAEA;EACE,kCAAkC;EAClC,wBAAwB;AAC1B;;AAEA;EACE,mCAAmC;EACnC,0BAA0B;AAC5B;;AAEA;EACE,QAAQ;EACR,SAAS;EACT,wBAAwB;EACxB,YAAY;AACd","sourcesContent":["/* @font-face {\n  font-family: 'MyFont';\n  src: url('./my-font.woff2') format('woff2'),\n    url('./my-font.woff') format('woff');\n  font-weight: 600;\n  font-style: normal;\n}; */\n:root {\n  --cell-size: 8vw;\n}\nbody {\n  height: 100%;\n}\n\n.player-board, \n.comp-board {\n  width: min-content;\n  display: grid;\n  grid-template: repeat(10, auto) / repeat(10, auto);\n}\n\n.grid-cell {\n  border: 0.5px solid rgba(128, 128, 128, 0.164);\n  width: var(--cell-size);\n  height: var(--cell-size);\n  position: relative;\n}\n\n.comp-board .grid-cell:hover {\n  box-shadow: inset 0px 0px 5px grey;\n  cursor: pointer;\n}\n.player-board .grid-cell:hover::after {\n  position: absolute;\n  content: '';\n  background-color: black;\n  border-radius: 5px;\n}\n\n.player-board.cat-one .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 5);\n}\n\n.player-board.horizontal.cat-one .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 5);\n}\n\n.player-board.cat-two .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 4);\n}\n\n.player-board.horizontal.cat-two .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 4);\n}\n\n.player-board.cat-three .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 3);\n}\n\n.player-board.horizontal.cat-three .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 3);\n}\n\n.player-board.cat-four .grid-cell:hover::after,\n.player-board.cat-five .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 2);\n}\n\n.player-board.horizontal.cat-four .grid-cell:hover::after,\n.player-board.horizontal.cat-five .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 2);\n}\n\n.cat-img {\n  position: absolute;\n  top: 3px;\n  rotate: -90deg;\n  width: var(--cell-size);\n  pointer-events: none;\n}\n\n.cat1 {\n  right: -10px;\n  height: calc(var(--cell-size) * 5);\n  transform: scale(5.5, 4);\n}\n\n.cat1.horizontal-cat {\n  top: -5px;\n  rotate: 180deg;\n  width: calc(var(--cell-size) * 5);\n  transform: scale(3.8, 2.7);\n}\n\n.cat2 {\n  top: 5px;\n  left: -5px;\n  height: calc(var(--cell-size) * 4);\n  transform: scale(4.3, 2.5);\n}\n\n.cat2.horizontal-cat {\n  top: -3px;\n  width: calc(var(--cell-size) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat3 {\n  height: calc(var(--cell-size) * 3);\n  transform: scale(3.5, 2.5);\n}\n\n.cat3.horizontal-cat {\n  width: calc(var(--cell-size) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat4 {\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 2);\n}\n\n.cat4.horizontal-cat {\n  width: calc(var(--cell-size) * 2);\n  transform: scale(1.5);\n}\n\n.cat5 {\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 1.5);\n}\n\n.cat5.horizontal-cat {\n  width: calc((var(--cell-size) * 2));\n  transform: scale(1.5, 1.1);\n}\n\n.horizontal-cat {\n  top: 0px;\n  left: 0px;\n  height: var(--cell-size);\n  rotate: 0deg;\n}\n\n"],"sourceRoot":""}]);
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

/***/ "./src/img/lesRoll.svg":
/*!*****************************!*\
  !*** ./src/img/lesRoll.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "cf66bb74a5e1305dca24.svg";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NmQTs7Ozs7Ozs7Ozs7OztBQ0FxQjtBQUNLO0FBRTFCcUMsaURBQUksRUFBRSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvY2F0LmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvaW5pdC5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIENhdCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgdHlwZSkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5oaXRzID0gMDtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xuICAgIHRoaXMuY29vcmRIaXQgPSBbXTtcbiAgfVxuXG4gIGhpdCgpIHtcbiAgICB0aGlzLmhpdHMgKz0gMTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGggPT09IHRoaXMuaGl0cztcbiAgfVxuXG4gIHJvdGF0ZSgpIHtcbiAgICB0aGlzLm9yaWVudGF0aW9uID1cbiAgICAgIHRoaXMub3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIiA/IFwiaG9yaXpvbnRhbFwiIDogXCJ2ZXJ0aWNhbFwiO1xuICB9XG5cbiAgcmFuZG9taXplT3JpZW50YXRpb24oKSB7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IE1hdGgucmFuZG9tKCkgPiAwLjUgPyBcInZlcnRpY2FsXCIgOiBcImhvcml6b250YWxcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDYXRzKCkge1xuICBjb25zdCBjYXQxID0gbmV3IENhdCg1LCBcImJpZyBzdHJldGNoXCIpO1xuICBjb25zdCBjYXQyID0gbmV3IENhdCg0LCBcImRvd253YXJkIGNhdFwiKTtcbiAgY29uc3QgY2F0MyA9IG5ldyBDYXQoMywgXCJzdHVmZiBzdHJ1dHRlclwiKTtcbiAgY29uc3QgY2F0NCA9IG5ldyBDYXQoMiwgXCJxdWFzaSBsb2FmXCIpO1xuICBjb25zdCBjYXQ1ID0gbmV3IENhdCgxLCBcImNvbXBhY3Qga2l0dHlcIik7XG4gIHJldHVybiBbY2F0MSwgY2F0MiwgY2F0MywgY2F0NCwgY2F0NV07XG59XG5cbmV4cG9ydCB7IENhdCwgY3JlYXRlQ2F0cyB9O1xuIiwiLyogZXNsaW50LWRpc2FibGUgZGVmYXVsdC1jYXNlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuaW1wb3J0IGNhdDEgZnJvbSBcIi4vaW1nL2JpZy1zdHJldGNoLnN2Z1wiO1xuaW1wb3J0IGNhdDIgZnJvbSBcIi4vaW1nL2NhdDIuc3ZnXCI7XG5pbXBvcnQgY2F0MyBmcm9tIFwiLi9pbWcvd2Fsay5zdmdcIjtcbmltcG9ydCBjYXQ0IGZyb20gXCIuL2ltZy9xdWFzaS1sb2FmMi5zdmdcIjtcbmltcG9ydCBjYXQ1IGZyb20gXCIuL2ltZy9sZXNSb2xsLnN2Z1wiO1xuXG5pbXBvcnQge1xuICBoYW5kbGVDbGljayxcbiAgcGxheWVyQm9hcmQsXG4gIGNvbXBCb2FyZCxcbiAgZ2V0Q3VycmVudENhdCxcbn0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNvbnN0IHBsYXllckJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItYm9hcmQtY29udGFpbmVyXCIpO1xuY29uc3QgcGxheWVyQm9hcmREaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItYm9hcmRcIik7XG5jb25zdCBjb21wQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcC1ib2FyZC1jb250YWluZXInKTtcbmNvbnN0IGNvbXBCb2FyZERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcC1ib2FyZCcpO1xuXG5mdW5jdGlvbiByb3RhdGVDYXQoKSB7XG4gIGNvbnN0IGN1cnJlbnRDYXQgPSBnZXRDdXJyZW50Q2F0KCk7XG4gIGlmICghY3VycmVudENhdCkgcmV0dXJuO1xuICBjdXJyZW50Q2F0LnJvdGF0ZSgpO1xuICBwbGF5ZXJCb2FyZERpc3BsYXkuY2xhc3NMaXN0LnRvZ2dsZShcImhvcml6b250YWxcIik7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgaWYgKGUua2V5ID09PSBcIlNoaWZ0XCIpIHtcbiAgICByb3RhdGVDYXQoKVxuICB9O1xufSlcblxuY29uc3Qgcm90YXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbnJvdGF0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicm90YXRlLWJ1dHRvblwiKTtcbnJvdGF0ZUJ1dHRvbi5pbm5lclRleHQgPSBcIlJvdGF0ZVwiO1xucm90YXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHJvdGF0ZUNhdCgpO1xufSk7XG5wbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChyb3RhdGVCdXR0b24pO1xuXG5mdW5jdGlvbiBhZGRDYXRJbWcoZGVzdGluYXRpb24sIGN1cnJlbnRDYXQpIHtcbiAgY29uc3QgY2F0SW1nID0gbmV3IEltYWdlKCk7XG4gIGNhdEltZy5jbGFzc0xpc3QuYWRkKFwiY2F0LWltZ1wiKTtcbiAgc3dpdGNoIChjdXJyZW50Q2F0LnR5cGUpIHtcbiAgICBjYXNlIFwiYmlnIHN0cmV0Y2hcIjpcbiAgICAgIGNhdEltZy5zcmMgPSBjYXQxO1xuICAgICAgY2F0SW1nLmNsYXNzTGlzdC5hZGQoXCJjYXQxXCIpO1xuICAgICAgcGxheWVyQm9hcmREaXNwbGF5LmNsYXNzTmFtZSA9IFwicGxheWVyLWJvYXJkIGNhdC10d29cIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJkb3dud2FyZCBjYXRcIjpcbiAgICAgIGNhdEltZy5zcmMgPSBjYXQyO1xuICAgICAgY2F0SW1nLmNsYXNzTGlzdC5hZGQoXCJjYXQyXCIpO1xuICAgICAgcGxheWVyQm9hcmREaXNwbGF5LmNsYXNzTmFtZSA9IFwicGxheWVyLWJvYXJkIGNhdC10aHJlZVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInN0dWZmIHN0cnV0dGVyXCI6XG4gICAgICBjYXRJbWcuc3JjID0gY2F0MztcbiAgICAgIGNhdEltZy5jbGFzc0xpc3QuYWRkKFwiY2F0M1wiKTtcbiAgICAgIHBsYXllckJvYXJkRGlzcGxheS5jbGFzc05hbWUgPSBcInBsYXllci1ib2FyZCBjYXQtZm91clwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInF1YXNpIGxvYWZcIjpcbiAgICAgIGNhdEltZy5zcmMgPSBjYXQ0O1xuICAgICAgY2F0SW1nLmNsYXNzTGlzdC5hZGQoXCJjYXQ0XCIpO1xuICAgICAgcGxheWVyQm9hcmREaXNwbGF5LmNsYXNzTmFtZSA9IFwicGxheWVyLWJvYXJkIGNhdC1maXZlXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiY29tcGFjdCBraXR0eVwiOlxuICAgICAgY2F0SW1nLnNyYyA9IGNhdDU7XG4gICAgICBjYXRJbWcuY2xhc3NMaXN0LmFkZChcImNhdDVcIik7XG4gICAgICBwbGF5ZXJCb2FyZERpc3BsYXkuY2xhc3NOYW1lID0gXCJwbGF5ZXItYm9hcmRcIjtcbiAgfVxuICBpZiAoY3VycmVudENhdC5vcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICBjYXRJbWcuY2xhc3NMaXN0LmFkZChcImhvcml6b250YWwtY2F0XCIpO1xuICB9XG4gIGRlc3RpbmF0aW9uLmFwcGVuZENoaWxkKGNhdEltZyk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllckdhbWVCb2FyZERpc3BsYXkoKSB7XG4gIGZvciAoY29uc3QgY29vcmQgb2YgT2JqZWN0LnZhbHVlcyhwbGF5ZXJCb2FyZC5ib2FyZCkpIHtcbiAgICBjb25zdCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzcG90LmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGxcIik7XG4gICAgc3BvdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudENhdCA9IGdldEN1cnJlbnRDYXQoKTtcbiAgICAgIGlmIChjdXJyZW50Q2F0ID09PSBudWxsKSByZXR1cm47XG4gICAgICBjb25zdCBjb29yZEFycmF5ID0gcGxheWVyQm9hcmQuZ2V0Q29vcmRpbmF0ZXMoY29vcmQuY29vcmRpbmF0ZXMsIGN1cnJlbnRDYXQpO1xuICAgICAgaWYgKGNvb3JkQXJyYXkpIHtcbiAgICAgICAgaGFuZGxlQ2xpY2soY29vcmRBcnJheSk7XG4gICAgICAgIGFkZENhdEltZyhzcG90LCBjdXJyZW50Q2F0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBwbGF5ZXJCb2FyZERpc3BsYXkuYXBwZW5kQ2hpbGQoc3BvdCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tcEdhbWVCb2FyZERpc3BsYXkoKSB7XG4gIGZvciAoY29uc3QgeyBjb29yZGluYXRlcyB9ICBvZiBPYmplY3QudmFsdWVzKGNvbXBCb2FyZC5ib2FyZCkpIHtcbiAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwnKTtcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29tcEJvYXJkLnRha2VBdHRhY2soY29vcmRpbmF0ZXMpO1xuICAgIH0pO1xuICAgIGNvbXBCb2FyZERpc3BsYXkuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gIH1cbn1cblxuZXhwb3J0IHsgY3JlYXRlUGxheWVyR2FtZUJvYXJkRGlzcGxheSwgY3JlYXRlQ29tcEdhbWVCb2FyZERpc3BsYXksIGFkZENhdEltZyB9O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cblxuaW1wb3J0IHsgY3JlYXRlQ2F0cyB9IGZyb20gXCIuL2NhdFwiO1xuXG5jb25zdCBwbGFjZSA9IChzdGF0ZSkgPT4gKHtcbiAgcGxhY2VDYXQ6IChjb29yZGluYXRlcywgY2F0KSA9PiB7XG4gICAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgc3RhdGUuYm9hcmRbYFske2Nvb3JkaW5hdGV9XWBdLm9jY3VwaWVkQnkgPSBjYXQ7XG4gICAgfSk7XG4gIH0sXG59KTtcblxuY29uc3QgcmVjZWl2ZUF0dGFjayA9IChzdGF0ZSkgPT4gKHtcbiAgdGFrZUF0dGFjazogKGNvb3JkKSA9PiB7XG4gICAgY29uc3QgY2VsbCA9IHN0YXRlLmJvYXJkW2BbJHtjb29yZH1dYF07XG4gICAgaWYgKGNlbGwuYXR0YWNrZWQpIHJldHVybjtcbiAgICBpZiAoY2VsbC5vY2N1cGllZEJ5KSB7XG4gICAgICBjZWxsLm9jY3VwaWVkQnkuaGl0KCk7XG4gICAgfVxuICAgIGNlbGwuYXR0YWNrZWQgPSB0cnVlO1xuICB9LFxufSk7XG5cbmNvbnN0IGNvb3JkSW52YWxpZCA9IChzdGF0ZSkgPT4gKHtcbiAgY29vcmRpbmF0ZXNBcmVJbnZhbGlkOiAoYXJyYXkpID0+XG4gICAgYXJyYXkuZmxhdCgpLnNvbWUoKGl0ZW0pID0+IGl0ZW0gPCAwIHx8IGl0ZW0gPiA5KSB8fFxuICAgIGFycmF5LnNvbWUoKGl0ZW0pID0+IHN0YXRlLmJvYXJkW2BbJHtpdGVtfV1gXS5vY2N1cGllZEJ5KSxcbn0pO1xuXG5jb25zdCBnZXRDb29yZCA9IChzdGF0ZSkgPT4gKHtcbiAgZ2V0Q29vcmRpbmF0ZXM6IChjb29yZCwgY2F0KSA9PiB7XG4gICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICBjb25zdCBbeCwgeV0gPSBjb29yZDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGNhdC5vcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAgIGFycmF5LnB1c2goW3ggKyBpLCB5XSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheS5wdXNoKFt4LCB5ICsgaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3RhdGUuY29vcmRpbmF0ZXNBcmVJbnZhbGlkKGFycmF5KSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGFycmF5O1xuICB9LFxufSk7XG5cbmNvbnN0IGNlbGxBc3Nlc3NtZW50ID0gKHN0YXRlKSA9PiAoe1xuICBkZXRlcm1pbmVSZWFsRXN0YXRlOiAoeyBsZW5ndGgsIG9yaWVudGF0aW9uIH0pID0+IHtcbiAgICBjb25zdCBsaW1pdCA9IDEwIC0gbGVuZ3RoO1xuICAgIGNvbnN0IGFycmF5ID0gW107XG4gICAgbGV0IHggPSAxMDtcbiAgICBsZXQgeSA9IDEwO1xuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICB5ID0gbGltaXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSBsaW1pdDtcbiAgICB9XG4gICAgZm9yIChsZXQgaCA9IDA7IGggPCB4OyBoKyspIHtcbiAgICAgIGZvciAobGV0IHYgPSAwOyB2IDwgeTsgdisrKSB7XG4gICAgICAgIGFycmF5LnB1c2goW2gsIHZdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgYXJyYXlNaW51c092ZXJsYXAgPSBhcnJheS5maWx0ZXIoKGNlbGwpID0+XG4gICAgICBzdGF0ZS5nZXRDb29yZGluYXRlcyhjZWxsLCB7IGxlbmd0aCwgb3JpZW50YXRpb24gfSlcbiAgICApO1xuICAgIHJldHVybiBhcnJheU1pbnVzT3ZlcmxhcDtcbiAgfSxcbn0pO1xuXG5mdW5jdGlvbiBjcmVhdGVTcG90KHgsIHkpIHtcbiAgcmV0dXJuIHtcbiAgICBjb29yZGluYXRlczogW3gsIHldLFxuICAgIG9jY3VwaWVkQnk6IG51bGwsXG4gICAgYXR0YWNrZWQ6IGZhbHNlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVHYW1lQm9hcmQoKSB7XG4gIGNvbnN0IGdhbWVCb2FyZCA9IHt9O1xuICBnYW1lQm9hcmQuYm9hcmQgPSB7fTtcbiAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCArPSAxKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSArPSAxKSB7XG4gICAgICBnYW1lQm9hcmQuYm9hcmRbYFske3h9LCR7eX1dYF0gPSBjcmVhdGVTcG90KHgsIHkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICBnYW1lQm9hcmQsXG4gICAgcGxhY2UoZ2FtZUJvYXJkKSxcbiAgICByZWNlaXZlQXR0YWNrKGdhbWVCb2FyZCksXG4gICAgY29vcmRJbnZhbGlkKGdhbWVCb2FyZCksXG4gICAgZ2V0Q29vcmQoZ2FtZUJvYXJkKVxuICApO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wR2FtZUJvYXJkKCkge1xuICBjb25zdCBnYW1lQm9hcmQgPSBjcmVhdGVHYW1lQm9hcmQoKTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZ2FtZUJvYXJkLCBjZWxsQXNzZXNzbWVudChnYW1lQm9hcmQpKTtcbn1cblxuY29uc3QgcGxheWVyQm9hcmQgPSBjcmVhdGVHYW1lQm9hcmQoKTtcblxuY29uc3QgY29tcEJvYXJkID0gY3JlYXRlQ29tcEdhbWVCb2FyZCgpO1xuXG5jb25zdCBwbGF5ZXJDYXRzID0gY3JlYXRlQ2F0cygpO1xuXG5sZXQgY2F0c1BsYWNlZCA9IDA7XG5sZXQgY3VycmVudENhdDtcblxuZnVuY3Rpb24gZ2V0Q3VycmVudENhdCgpIHtcbiAgaWYgKGNhdHNQbGFjZWQgPj0gNSkgcmV0dXJuIG51bGw7XG4gIHJldHVybiBwbGF5ZXJDYXRzW2NhdHNQbGFjZWRdO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVDbGljayhjb29yZGluYXRlcykge1xuICBjdXJyZW50Q2F0ID0gZ2V0Q3VycmVudENhdCgpO1xuICBwbGF5ZXJCb2FyZC5wbGFjZUNhdChjb29yZGluYXRlcywgY3VycmVudENhdCk7XG4gIGNhdHNQbGFjZWQgKz0gMTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlR2FtZUJvYXJkLCBoYW5kbGVDbGljaywgcGxheWVyQm9hcmQsIGNvbXBCb2FyZCwgZ2V0Q3VycmVudENhdCB9O1xuIiwiaW1wb3J0IHsgY3JlYXRlQ29tcEdhbWVCb2FyZERpc3BsYXksIGNyZWF0ZVBsYXllckdhbWVCb2FyZERpc3BsYXkgfSBmcm9tICcuL2RvbSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgY3JlYXRlUGxheWVyR2FtZUJvYXJkRGlzcGxheSgpO1xuICBjcmVhdGVDb21wR2FtZUJvYXJkRGlzcGxheSgpO1xufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ015Rm9udCc7XFxuICBzcmM6IHVybCgnLi9teS1mb250LndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxcbiAgICB1cmwoJy4vbXktZm9udC53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn07ICovXFxuOnJvb3Qge1xcbiAgLS1jZWxsLXNpemU6IDh2dztcXG59XFxuYm9keSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQsIFxcbi5jb21wLWJvYXJkIHtcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTAsIGF1dG8pIC8gcmVwZWF0KDEwLCBhdXRvKTtcXG59XFxuXFxuLmdyaWQtY2VsbCB7XFxuICBib3JkZXI6IDAuNXB4IHNvbGlkIHJnYmEoMTI4LCAxMjgsIDEyOCwgMC4xNjQpO1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5jb21wLWJvYXJkIC5ncmlkLWNlbGw6aG92ZXIge1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCA1cHggZ3JleTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLnBsYXllci1ib2FyZCAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiAnJztcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmNhdC1vbmUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmhvcml6b250YWwuY2F0LW9uZSAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNSk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuY2F0LXR3byAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNCk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuaG9yaXpvbnRhbC5jYXQtdHdvIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtdGhyZWUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmhvcml6b250YWwuY2F0LXRocmVlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtZm91ciAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlcixcXG4ucGxheWVyLWJvYXJkLmNhdC1maXZlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5ob3Jpem9udGFsLmNhdC1mb3VyIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyLFxcbi5wbGF5ZXItYm9hcmQuaG9yaXpvbnRhbC5jYXQtZml2ZSAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxufVxcblxcbi5jYXQtaW1nIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogM3B4O1xcbiAgcm90YXRlOiAtOTBkZWc7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4uY2F0MSB7XFxuICByaWdodDogLTEwcHg7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSg1LjUsIDQpO1xcbn1cXG5cXG4uY2F0MS5ob3Jpem9udGFsLWNhdCB7XFxuICB0b3A6IC01cHg7XFxuICByb3RhdGU6IDE4MGRlZztcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA1KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMy44LCAyLjcpO1xcbn1cXG5cXG4uY2F0MiB7XFxuICB0b3A6IDVweDtcXG4gIGxlZnQ6IC01cHg7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDQpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSg0LjMsIDIuNSk7XFxufVxcblxcbi5jYXQyLmhvcml6b250YWwtY2F0IHtcXG4gIHRvcDogLTNweDtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi45LCAxLjcpO1xcbn1cXG5cXG4uY2F0MyB7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjUsIDIuNSk7XFxufVxcblxcbi5jYXQzLmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi41LCAxLjgpO1xcbn1cXG5cXG4uY2F0NCB7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLCAyKTtcXG59XFxuXFxuLmNhdDQuaG9yaXpvbnRhbC1jYXQge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xcbn1cXG5cXG4uY2F0NSB7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLCAxLjUpO1xcbn1cXG5cXG4uY2F0NS5ob3Jpem9udGFsLWNhdCB7XFxuICB3aWR0aDogY2FsYygodmFyKC0tY2VsbC1zaXplKSAqIDIpKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41LCAxLjEpO1xcbn1cXG5cXG4uaG9yaXpvbnRhbC1jYXQge1xcbiAgdG9wOiAwcHg7XFxuICBsZWZ0OiAwcHg7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICByb3RhdGU6IDBkZWc7XFxufVxcblxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7Ozs7OztJQU1JO0FBQ0o7RUFDRSxnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTs7RUFFRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLGtEQUFrRDtBQUNwRDs7QUFFQTtFQUNFLDhDQUE4QztFQUM5Qyx1QkFBdUI7RUFDdkIsd0JBQXdCO0VBQ3hCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGtDQUFrQztFQUNsQyxlQUFlO0FBQ2pCO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLHVCQUF1QjtFQUN2QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0Usd0JBQXdCO0VBQ3hCLGlDQUFpQztBQUNuQzs7QUFFQTtFQUNFLHVCQUF1QjtFQUN2QixrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLHdCQUF3QjtFQUN4QixpQ0FBaUM7QUFDbkM7O0FBRUE7O0VBRUUsdUJBQXVCO0VBQ3ZCLGtDQUFrQztBQUNwQzs7QUFFQTs7RUFFRSx3QkFBd0I7RUFDeEIsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixjQUFjO0VBQ2QsdUJBQXVCO0VBQ3ZCLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWixrQ0FBa0M7RUFDbEMsd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsU0FBUztFQUNULGNBQWM7RUFDZCxpQ0FBaUM7RUFDakMsMEJBQTBCO0FBQzVCOztBQUVBO0VBQ0UsUUFBUTtFQUNSLFVBQVU7RUFDVixrQ0FBa0M7RUFDbEMsMEJBQTBCO0FBQzVCOztBQUVBO0VBQ0UsU0FBUztFQUNULGlDQUFpQztFQUNqQywwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxrQ0FBa0M7RUFDbEMsMEJBQTBCO0FBQzVCOztBQUVBO0VBQ0UsaUNBQWlDO0VBQ2pDLDBCQUEwQjtBQUM1Qjs7QUFFQTtFQUNFLGtDQUFrQztFQUNsQyxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxpQ0FBaUM7RUFDakMscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0Usa0NBQWtDO0VBQ2xDLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLG1DQUFtQztFQUNuQywwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxRQUFRO0VBQ1IsU0FBUztFQUNULHdCQUF3QjtFQUN4QixZQUFZO0FBQ2RcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ015Rm9udCc7XFxuICBzcmM6IHVybCgnLi9teS1mb250LndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxcbiAgICB1cmwoJy4vbXktZm9udC53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn07ICovXFxuOnJvb3Qge1xcbiAgLS1jZWxsLXNpemU6IDh2dztcXG59XFxuYm9keSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQsIFxcbi5jb21wLWJvYXJkIHtcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTAsIGF1dG8pIC8gcmVwZWF0KDEwLCBhdXRvKTtcXG59XFxuXFxuLmdyaWQtY2VsbCB7XFxuICBib3JkZXI6IDAuNXB4IHNvbGlkIHJnYmEoMTI4LCAxMjgsIDEyOCwgMC4xNjQpO1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5jb21wLWJvYXJkIC5ncmlkLWNlbGw6aG92ZXIge1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCA1cHggZ3JleTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLnBsYXllci1ib2FyZCAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiAnJztcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmNhdC1vbmUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmhvcml6b250YWwuY2F0LW9uZSAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNSk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuY2F0LXR3byAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNCk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuaG9yaXpvbnRhbC5jYXQtdHdvIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtdGhyZWUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmhvcml6b250YWwuY2F0LXRocmVlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtZm91ciAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlcixcXG4ucGxheWVyLWJvYXJkLmNhdC1maXZlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5ob3Jpem9udGFsLmNhdC1mb3VyIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyLFxcbi5wbGF5ZXItYm9hcmQuaG9yaXpvbnRhbC5jYXQtZml2ZSAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxufVxcblxcbi5jYXQtaW1nIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogM3B4O1xcbiAgcm90YXRlOiAtOTBkZWc7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4uY2F0MSB7XFxuICByaWdodDogLTEwcHg7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSg1LjUsIDQpO1xcbn1cXG5cXG4uY2F0MS5ob3Jpem9udGFsLWNhdCB7XFxuICB0b3A6IC01cHg7XFxuICByb3RhdGU6IDE4MGRlZztcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA1KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMy44LCAyLjcpO1xcbn1cXG5cXG4uY2F0MiB7XFxuICB0b3A6IDVweDtcXG4gIGxlZnQ6IC01cHg7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDQpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSg0LjMsIDIuNSk7XFxufVxcblxcbi5jYXQyLmhvcml6b250YWwtY2F0IHtcXG4gIHRvcDogLTNweDtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi45LCAxLjcpO1xcbn1cXG5cXG4uY2F0MyB7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjUsIDIuNSk7XFxufVxcblxcbi5jYXQzLmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi41LCAxLjgpO1xcbn1cXG5cXG4uY2F0NCB7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLCAyKTtcXG59XFxuXFxuLmNhdDQuaG9yaXpvbnRhbC1jYXQge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xcbn1cXG5cXG4uY2F0NSB7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLCAxLjUpO1xcbn1cXG5cXG4uY2F0NS5ob3Jpem9udGFsLWNhdCB7XFxuICB3aWR0aDogY2FsYygodmFyKC0tY2VsbC1zaXplKSAqIDIpKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41LCAxLjEpO1xcbn1cXG5cXG4uaG9yaXpvbnRhbC1jYXQge1xcbiAgdG9wOiAwcHg7XFxuICBsZWZ0OiAwcHg7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICByb3RhdGU6IDBkZWc7XFxufVxcblxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IGluaXQgZnJvbSAnLi9pbml0JztcblxuaW5pdCgpO1xuXG5cbiJdLCJuYW1lcyI6WyJDYXQiLCJjb25zdHJ1Y3RvciIsImxlbmd0aCIsInR5cGUiLCJoaXRzIiwib3JpZW50YXRpb24iLCJjb29yZEhpdCIsImhpdCIsImlzU3VuayIsInJvdGF0ZSIsInJhbmRvbWl6ZU9yaWVudGF0aW9uIiwiTWF0aCIsInJhbmRvbSIsImNyZWF0ZUNhdHMiLCJjYXQxIiwiY2F0MiIsImNhdDMiLCJjYXQ0IiwiY2F0NSIsImhhbmRsZUNsaWNrIiwicGxheWVyQm9hcmQiLCJjb21wQm9hcmQiLCJnZXRDdXJyZW50Q2F0IiwicGxheWVyQm9hcmRDb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJwbGF5ZXJCb2FyZERpc3BsYXkiLCJjb21wQm9hcmRDb250YWluZXIiLCJjb21wQm9hcmREaXNwbGF5Iiwicm90YXRlQ2F0IiwiY3VycmVudENhdCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwia2V5Iiwicm90YXRlQnV0dG9uIiwiY3JlYXRlRWxlbWVudCIsImFkZCIsImlubmVyVGV4dCIsImFwcGVuZENoaWxkIiwiYWRkQ2F0SW1nIiwiZGVzdGluYXRpb24iLCJjYXRJbWciLCJJbWFnZSIsInNyYyIsImNsYXNzTmFtZSIsImNyZWF0ZVBsYXllckdhbWVCb2FyZERpc3BsYXkiLCJjb29yZCIsIk9iamVjdCIsInZhbHVlcyIsImJvYXJkIiwic3BvdCIsImNvb3JkQXJyYXkiLCJnZXRDb29yZGluYXRlcyIsImNvb3JkaW5hdGVzIiwiY3JlYXRlQ29tcEdhbWVCb2FyZERpc3BsYXkiLCJjZWxsIiwidGFrZUF0dGFjayIsInBsYWNlIiwic3RhdGUiLCJwbGFjZUNhdCIsImNhdCIsImZvckVhY2giLCJjb29yZGluYXRlIiwib2NjdXBpZWRCeSIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2tlZCIsImNvb3JkSW52YWxpZCIsImNvb3JkaW5hdGVzQXJlSW52YWxpZCIsImFycmF5IiwiZmxhdCIsInNvbWUiLCJpdGVtIiwiZ2V0Q29vcmQiLCJ4IiwieSIsImkiLCJwdXNoIiwiY2VsbEFzc2Vzc21lbnQiLCJkZXRlcm1pbmVSZWFsRXN0YXRlIiwibGltaXQiLCJoIiwidiIsImFycmF5TWludXNPdmVybGFwIiwiZmlsdGVyIiwiY3JlYXRlU3BvdCIsImNyZWF0ZUdhbWVCb2FyZCIsImdhbWVCb2FyZCIsImFzc2lnbiIsImNyZWF0ZUNvbXBHYW1lQm9hcmQiLCJwbGF5ZXJDYXRzIiwiY2F0c1BsYWNlZCIsImluaXQiXSwic291cmNlUm9vdCI6IiJ9