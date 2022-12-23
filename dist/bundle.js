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
/* harmony export */   "compFireShot": () => (/* binding */ compFireShot)
/* harmony export */ });
/* eslint-disable no-plusplus */

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
function compFireShot(opponentBoard) {
  const woundedTargets = [];
  let possibleHits;
  opponentBoard.cats.forEach(cat => {
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

/***/ "./src/catImg.js":
/*!***********************!*\
  !*** ./src/catImg.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addCatImg": () => (/* binding */ addCatImg),
/* harmony export */   "appendCatImages": () => (/* binding */ appendCatImages)
/* harmony export */ });
/* harmony import */ var _img_big_stretch_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./img/big-stretch.svg */ "./src/img/big-stretch.svg");
/* harmony import */ var _img_cat2_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./img/cat2.svg */ "./src/img/cat2.svg");
/* harmony import */ var _img_walk_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/walk.svg */ "./src/img/walk.svg");
/* harmony import */ var _img_quasi_loaf2_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./img/quasi-loaf2.svg */ "./src/img/quasi-loaf2.svg");
/* harmony import */ var _img_lesRoll_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./img/lesRoll.svg */ "./src/img/lesRoll.svg");





function createCatImage(source) {
  const catImg = new Image();
  catImg.src = source;
  return catImg;
}
function addCatImg(currentCat) {
  const catImg = new Image();
  catImg.classList.add("cat-img");
  switch (currentCat.type) {
    case "big stretch":
      catImg.src = _img_big_stretch_svg__WEBPACK_IMPORTED_MODULE_0__;
      catImg.classList.add("cat1");
      break;
    case "downward cat":
      catImg.src = _img_cat2_svg__WEBPACK_IMPORTED_MODULE_1__;
      catImg.classList.add("cat2");
      break;
    case "stuff strutter":
      catImg.src = _img_walk_svg__WEBPACK_IMPORTED_MODULE_2__;
      catImg.classList.add("cat3");
      break;
    case "quasi loaf":
      catImg.src = _img_quasi_loaf2_svg__WEBPACK_IMPORTED_MODULE_3__;
      catImg.classList.add("cat4");
      break;
    case "compact kitty":
      catImg.src = _img_lesRoll_svg__WEBPACK_IMPORTED_MODULE_4__;
      catImg.classList.add("cat5");
      break;
    default:
      break;
  }
  if (currentCat.orientation === "horizontal") {
    catImg.classList.add("horizontal-cat");
  }
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


/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startGame": () => (/* binding */ startGame)
/* harmony export */ });
/* harmony import */ var _img_format_rotate_90_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./img/format-rotate-90.svg */ "./src/img/format-rotate-90.svg");
/* harmony import */ var _catImg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catImg */ "./src/catImg.js");
/* harmony import */ var _bot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bot */ "./src/bot.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* eslint-disable default-case */
/* eslint-disable no-restricted-syntax */




const playerBoardContainer = document.querySelector(".player-board-container");
const compBoardContainer = document.querySelector(".comp-board-container");
const catTrackerContainer = document.querySelector(".cat-tracker-container");
let currentPlayerBoard;
function rotateCat() {
  if (!currentPlayerBoard) return;
  const currentCat = currentPlayerBoard.getCurrentCat();
  if (!currentCat) return;
  currentCat.rotate();
  playerBoardContainer.classList.toggle("horizontal");
}
const rotateButton = document.createElement("button");
const rotateImg = new Image();
rotateImg.src = _img_format_rotate_90_svg__WEBPACK_IMPORTED_MODULE_0__;
rotateButton.classList.add("rotate-button");
rotateButton.appendChild(rotateImg);
rotateButton.addEventListener("click", () => {
  rotateCat();
});
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
    if (boardID.comp) {
      updateCatTracker(boardID.board[`[${coord}]`].occupiedBy);
    }
  }
}
function shrinkSize() {
  const board = document.querySelector('.comp-board');
  const originalSize = board.offsetWidth;
  const windowWidth = window.innerWidth;
  return (windowWidth - originalSize) / 2.3 / originalSize;
}
function setShrinkScale(board) {
  document.documentElement.style.setProperty("--shrink-scale", `min(1, ${shrinkSize(board)})`);
}
function hoverEffect(cat) {
  const prefix = "player-board";
  let suffix;
  switch (cat.type) {
    case "big stretch":
      suffix = "cat-two";
      break;
    case "downward cat":
      suffix = "cat-three";
      break;
    case "stuff strutter":
      suffix = "cat-four";
      break;
    case "quasi loaf":
      suffix = "cat-five";
      break;
    default:
      suffix = "";
      break;
  }
  return `${prefix} ${suffix}`;
}
function startGame() {
  const playerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_3__.createPlayerGameBoard)();
  const compBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_3__.createCompGameBoard)();
  populateDisplay(playerBoard, compBoard);
}
function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
function clearPage() {
  currentPlayerBoard = 0;
  window.removeEventListener('resize', setShrinkScale);
  playerBoardContainer.classList.remove('shrink');
  removeChildren(playerBoardContainer);
  removeChildren(compBoardContainer);
  removeChildren(catTrackerContainer);
  catTrackerContainer.style.visibility = 'hidden';
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
  playAgainButton.addEventListener("click", () => {
    screen.remove();
    clearPage();
    startGame();
  });
  screen.append(endMessage, playAgainButton);
  document.body.appendChild(screen);
}
function compRetaliation(playerBoard) {
  const target = (0,_bot__WEBPACK_IMPORTED_MODULE_2__.compFireShot)(playerBoard);
  playerBoard.takeAttack(target);
  const dataID = `[data-coord='${target}']`;
  const domCell = document.querySelector(dataID);
  applyHitImage(domCell, playerBoard, target);
  if (playerBoard.checkForWin()) {
    endGameScreen("Aw shucks! Foiled yet again by your dastardly neighbor!");
  }
}
function createCompGameBoardDisplay(boardData, oppBoardData) {
  const compBoardDisplay = document.createElement("div");
  compBoardDisplay.classList.add("comp-board");
  for (const coord of Object.values(boardData.board)) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    cell.dataset.compCoord = coord.coordinates;
    cell.addEventListener("click", () => {
      if (!coord.attacked) {
        boardData.takeAttack(coord.coordinates);
        applyHitImage(cell, boardData, coord.coordinates);
        if (coord.occupiedBy) {
          if (coord.occupiedBy.isSunk()) {
            const cat = coord.occupiedBy;
            cat.domElement.classList.remove("hidden");
            cat.coordHit.forEach(spot => {
              const domEl = document.querySelector(`[data-comp-coord='${spot}']`);
              setTimeout(() => {
                domEl.classList.add("consume");
              }, 200);
            });
            if (boardData.checkForWin()) {
              endGameScreen("Congrats! Now all your neighbors will know your neighbor has the fattest cats on the block!");
              return;
            }
          }
        }
        compRetaliation(oppBoardData);
      }
    });
    compBoardDisplay.appendChild(cell);
  }
  compBoardContainer.appendChild(compBoardDisplay);
}
function createPlayerGameBoardDisplay(playerBoardData, compBoardData) {
  currentPlayerBoard = playerBoardData;
  const playerBoardDisplay = document.createElement("div");
  playerBoardDisplay.classList.add("player-board");
  playerBoardDisplay.classList.add("cat-one");
  for (const coord of Object.values(playerBoardData.board)) {
    const spot = document.createElement("div");
    spot.classList.add("grid-cell");
    spot.dataset.coord = coord.coordinates;
    spot.addEventListener("click", () => {
      const currentCat = playerBoardData.getCurrentCat();
      if (currentCat === null) return;
      const coordArray = playerBoardData.getCoordinates(coord.coordinates, currentCat);
      if (coordArray) {
        playerBoardData.placeCat(coordArray, currentCat);
        playerBoardData.catAdded();
        playerBoardDisplay.className = hoverEffect(currentCat);
        playerBoardContainer.className = 'player-board-container';
        spot.appendChild((0,_catImg__WEBPACK_IMPORTED_MODULE_1__.addCatImg)(currentCat));
        if (currentCat.type === "compact kitty") {
          playerBoardContainer.removeChild(rotateButton);
          playerBoardContainer.classList.add("shrink");
          compBoardContainer.style.display = "flex";
          createCompGameBoardDisplay(compBoardData, playerBoardData);
          document.documentElement.style.setProperty("--shrink-scale", `min(1, ${shrinkSize()})`);
          window.addEventListener("resize", setShrinkScale);
          catTrackerContainer.style.visibility = "visible";
          compBoardData.compPlaceCats();
        }
      }
    });
    playerBoardDisplay.appendChild(spot);
  }
  playerBoardContainer.appendChild(playerBoardDisplay);
}
function populateDisplay(playerBoardData, compBoardData) {
  const catTracker = createCatTracker();
  catTrackerContainer.append(catTracker);
  (0,_catImg__WEBPACK_IMPORTED_MODULE_1__.appendCatImages)();
  createPlayerGameBoardDisplay(playerBoardData, compBoardData);
  playerBoardContainer.appendChild(rotateButton);
}
window.addEventListener("keydown", e => {
  if (e.key === "Shift") {
    rotateCat();
  }
});


/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCompGameBoard": () => (/* binding */ createCompGameBoard),
/* harmony export */   "createPlayerGameBoard": () => (/* binding */ createPlayerGameBoard)
/* harmony export */ });
/* harmony import */ var _cat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cat */ "./src/cat.js");
/* harmony import */ var _catImg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catImg */ "./src/catImg.js");
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
const trackCatsAdded = state => ({
  catAdded: () => {
    state.catsAdded += 1;
  }
});
const currentCat = state => ({
  getCurrentCat: () => {
    if (state.catsAdded >= 5) return null;
    return state.cats[state.catsAdded];
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
function randomIndex(array) {
  return array[Math.floor(array.length * Math.random())];
}
const computerPlaceCats = state => ({
  compPlaceCats: () => {
    state.cats.forEach(cat => {
      cat.randomizeOrientation();
      const potentialPlacements = state.determineRealEstate(cat);
      const targetSpace = randomIndex(potentialPlacements);
      const arrayOfCoord = state.getCoordinates(targetSpace, cat);
      state.placeCat(arrayOfCoord, cat);
      const domSpot = document.querySelector(`[data-comp-coord='${targetSpace}'`);
      const catImg = (0,_catImg__WEBPACK_IMPORTED_MODULE_1__.addCatImg)(cat);
      catImg.classList.add('hidden');
      domSpot.appendChild(catImg);
      cat.setDomElement(catImg);
    });
  }
});
function createSpot(x, y) {
  return {
    coordinates: [x, y],
    occupiedBy: null,
    attacked: false
  };
}
const winCheck = state => ({
  checkForWin: () => state.cats.every(cat => cat.isSunk())
});
function createGameBoard() {
  const gameBoard = {};
  gameBoard.board = {};
  gameBoard.cats = (0,_cat__WEBPACK_IMPORTED_MODULE_0__.createCats)();
  for (let y = 0; y < 10; y += 1) {
    for (let x = 0; x < 10; x += 1) {
      gameBoard.board[`[${x},${y}]`] = createSpot(x, y);
    }
  }
  return Object.assign(gameBoard, place(gameBoard), receiveAttack(gameBoard), coordInvalid(gameBoard), getCoord(gameBoard), winCheck(gameBoard));
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
  return Object.assign(gameBoard, cellAssessment(gameBoard), computerPlaceCats(gameBoard));
  ;
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

const openingScreen = document.querySelector('.opening-screen');
const beginButton = document.querySelector('.begin-button');
function init() {
  beginButton.addEventListener('click', () => {
    beginButton.style.transition = '5s';
    beginButton.style.scale = 50;
    openingScreen.style.opacity = 0;
    setTimeout(() => {
      document.body.removeChild(openingScreen);
    }, 1500);
  });
  (0,_dom__WEBPACK_IMPORTED_MODULE_0__.startGame)();
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
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"comfy\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"woff2\"),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"woff\");\n  font-weight: 600;\n  font-style: normal;\n}\n\n:root {\n  --background: #282a36;\n  --board-size: min(60vw, 500px);\n  --cell-size: calc(var(--board-size) / 10);\n  --logo-ball-size: 75px;\n  --shrink-scale: 1;\n  --margin: calc((100vw - var(--board-size)) / 2);\n  --shrunk-board: calc(var(--board-size) * var(--shrink-scale));\n  /* --cat-tracker-size: calc(var(--board-size) * 0.4); */\n  --cat-tracker-padding: 10px;\n  --cat-tracker-width: calc(\n    min((calc(var(--margin) * 0.95)), 200px) - (var(--cat-tracker-padding) * 2)\n  );\n  --cat-tracker-height: calc(var(var(--cat-tracker-width) * (4 / 5)));\n  --cat-tracker-cell: calc(var(--cat-tracker-width) / 5);\n  --margin-top: calc(((100vh - 100px) - var(--board-size)) * 0.5);\n}\n\nbody {\n  font-family: comfy, Verdana, Geneva, Tahoma, sans-serif;\n  position: relative;\n  display: grid;\n  grid-template: 100px 1fr / 1fr 1fr 1fr;\n  align-items: center;\n  /* justify-items: center; */\n  margin: 0;\n  padding: 0;\n  position: relative;\n  color: whitesmoke;\n  height: 100vh;\n  width: 100vw;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  background-repeat: repeat;\n  background-size: 400px;\n  text-align: center;\n}\n\n.opening-screen {\n  overflow: hidden;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  z-index: 10;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  background-repeat: repeat;\n  background-size: 100px;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  transition: 2s;\n}\n\n.opening-screen p {\n  background-color: #282a36bc;\n  box-sizing: border-box;\n  width: 300px;\n  padding: 30px;\n  border-radius: 30px;\n}\n\n@keyframes bounce {\n  from {\n    translate: 0;\n  }\n  to {\n    translate: 0px -10px;\n  }\n}\n\n.opening-screen button {\n  animation-name: bounce;\n  animation-duration: 2s;\n  animation-iteration-count: infinite;\n  animation-direction: alternate;\n  animation-timing-function: ease-out;\n  color: whitesmoke;\n  font-family: inherit;\n  font-size: 1.5rem;\n  appearance: none;\n  border-radius: 50%;\n  border: none;\n  width: 150px;\n  height: 150px;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n  cursor: grab;\n  transition: 0.3s;\n}\n\n.opening-screen button:hover,\n.play-again-button:hover {\n  animation: none;\n  scale: 0.9;\n}\n\n.opening-screen button:active,\n.play-again-button:active {\n  scale: 0.8;\n}\n\n.title {\n  grid-area: 1 / 1 / 2 / -1;\n  width: min-content;\n  height: var(--logo-ball-size);\n  margin: auto;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n}\n\n.title .ball:nth-child(4) {\n  grid-area: 1 / 1 / 2 / 2;\n  margin-left: 0;\n}\n\n.title .ball:nth-child(3) {\n  grid-area: 1 / 2 / 2 / 3;\n}\n\n.title .ball:nth-child(2) {\n  grid-area: 1 / 3 / 2 / 4;\n}\n\n.title .ball:nth-child(1) {\n  grid-area: 1 / 4 / 2 / 5;\n}\n\n.ball {\n  box-shadow: 1px 1px 8px rgb(255, 140, 0);\n  margin-left: calc(var(--logo-ball-size) * -0.5);\n  content: \"\";\n  height: var(--logo-ball-size);\n  width: var(--logo-ball-size);\n  border-radius: 50%;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n}\n\n.words {\n  grid-area: 1 / 1 / 2 / -1;\n}\nh1 {\n  font-size: 2rem;\n}\n\n.player-board-container {\n  grid-area: 2 / 2 / 3 / 3;\n  transition: 0.3s;\n  margin: auto;\n  width: min-content;\n  height: min-content;\n  transform-origin: 0 0;\n  z-index: 3;\n}\n\n.player-board,\n.comp-board {\n  /* box-sizing: border-box; */\n  width: var(--board-size);\n  height: var(--board-size);\n  display: grid;\n  grid-template: repeat(10, auto) / repeat(10, auto);\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n  background-repeat: repeat;\n  background-size: var(--cell-size) var(--cell-size);\n}\n\n.grid-cell {\n  z-index: 0;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.164);\n  width: var(--cell-size);\n  height: var(--cell-size);\n  position: relative;\n}\n\n.player-board {\n  overflow: hidden;\n}\n\n.comp-board .grid-cell:hover::after {\n  box-shadow: inset 0px 0px 50px rgb(255, 123, 0);\n  cursor: pointer;\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.comp-board .grid-cell:active::after {\n  box-shadow: inset 0px 0px 50px 10px rgb(255, 123, 0);\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.player-board .grid-cell:hover::after {\n  position: absolute;\n  left: 0;\n  content: \"\";\n  background-color: rgba(0, 0, 0, 0.462);\n  border-radius: 5px;\n}\n\n.player-board.cat-one .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 5);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-one\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 5);\n}\n\n.player-board.cat-two .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 4);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-two\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 4);\n}\n\n.player-board.cat-three .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 3);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-three\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 3);\n}\n\n.player-board.cat-four .grid-cell:hover::after,\n.player-board.cat-five .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 2);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-four\n  .grid-cell:hover::after,\n.player-board-container.horizontal\n  .player-board.cat-five\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 2);\n}\n\n.player-board-container.shrink {\n  scale: var(--shrink-scale);\n  translate: calc((var(--margin) + var(--shrunk-board)) * -0.5);\n}\n\n.player-board-container.shrink:hover {\n  scale: 0.75;\n  border: 2px solid black;\n}\n\n.cat-img {\n  transition: 0.3s;\n  position: absolute;\n  top: 3px;\n  rotate: -90deg;\n  width: var(--cell-size);\n  pointer-events: none;\n}\n\n.cat1 {\n  right: -10px;\n  height: calc(var(--cell-size) * 5);\n  transform: scale(5.5, 4);\n}\n\n.cat1.horizontal-cat {\n  top: 5px;\n  width: calc(var(--cell-size) * 5);\n  transform: scale(3.8, 2.7);\n}\n\n.cat2 {\n  top: 5px;\n  left: -5px;\n  height: calc(var(--cell-size) * 4);\n  transform: scale(4.3, 2.5);\n}\n\n.cat2.horizontal-cat {\n  top: -3px;\n  width: calc(var(--cell-size) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat3 {\n  left: 0;\n  height: calc(var(--cell-size) * 3);\n  transform: scale(3.5, 2.5);\n}\n\n.cat3.horizontal-cat {\n  width: calc(var(--cell-size) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat4 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 2);\n}\n\n.cat4.horizontal-cat {\n  width: calc(var(--cell-size) * 2);\n  transform: scale(1.5);\n}\n\n.cat5 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 1.5);\n}\n\n.cat5.horizontal-cat {\n  width: calc((var(--cell-size) * 2));\n  transform: scale(1.5, 1.1);\n}\n\n.horizontal-cat {\n  top: 0px;\n  left: 0px;\n  height: var(--cell-size);\n  rotate: 0deg;\n}\n\n.grid-cell.attacked::after {\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  box-shadow: inset 0px 0px 15px orange;\n}\n\n.grid-cell.attacked::before {\n  z-index: 1;\n  position: absolute;\n  content: \"\";\n  width: calc(var(--cell-size) / 3);\n  height: calc(var(--cell-size) / 3);\n  background-color: rgba(255, 166, 0, 0.698);\n  border-radius: 50%;\n  inset: 0;\n  margin: auto;\n}\n\n.grid-cell.attacked.occupied::before {\n  width: calc(var(--cell-size) / 1.5);\n  height: calc(var(--cell-size) / 1.5);\n  background-color: orange;\n  transition: 1s;\n}\n\n.grid-cell.attacked.occupied.consume::before {\n  scale: 0;\n}\n\n.rotate-button {\n  background-color: hsl(39, 100%, 50%);\n  appearance: none;\n  border: none;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  cursor: pointer;\n  margin: 5px;\n}\n\n.rotate-button:hover {\n  background-color: hsl(39, 100%, 60%);\n}\n\n.rotate-button:active {\n  background-color: hsl(39, 100%, 70%);\n}\n\n.comp-board-container {\n  overflow: hidden;\n  grid-area: 2 / 2 / 3 / 3;\n  width: min-content;\n  height: min-content;\n  display: none;\n  inset: 0;\n  margin: auto;\n}\n\n.hidden {\n  opacity: 0;\n}\n\n.cat-tracker-container {\n  width: min-content;\n  background-color: rgba(255, 255, 255, 0.405);\n  padding: var(--cat-tracker-padding);\n  border-radius: 20px;\n  overflow: hidden;\n  align-self: flex-start;\n  margin: var(--margin-top) 10px;\n  grid-area: 2 / 3 / 3 / 4;\n  visibility: hidden;\n}\n\n.cat-tracker {\n  display: grid;\n  grid-template: repeat(4, auto) / repeat(5, auto);\n  width: var(--cat-tracker-width);\n  height: var(--cat-tracker-height);\n  align-items: center;\n  justify-items: flex-start;\n}\n\n.cat-tracker div {\n  position: relative;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.5);\n  height: var(--cat-tracker-cell);\n  width: var(--cat-tracker-cell);\n}\n\n.cat-tracker div::after {\n  position: absolute;\n  content: \"\";\n  background-color: orange;\n  width: 40%;\n  height: 40%;\n  border-radius: 50%;\n  z-index: 3;\n  inset: 0;\n  margin: auto;\n  opacity: 0;\n  transition: 0.5s;\n}\n\n.cat-tracker div::before {\n  position: absolute;\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  background-color: rgba(201, 201, 201, 0.54);\n  opacity: 0;\n  left: 0;\n}\n\n.cat-tracker div.cat-tracker-hit::after,\n.cat-tracker div.cat-tracker-hit::before {\n  opacity: 1;\n}\n\n.cat-tracker div img {\n  height: var(--cat-tracker-cell);\n}\n\n.cat-tracker-first img {\n  width: calc(var(--cat-tracker-cell) * 5);\n  transform: scale(3.4, 2.7);\n}\n\n.cat-tracker-second img {\n  width: calc(var(--cat-tracker-cell) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat-tracker-third img {\n  width: calc(var(--cat-tracker-cell) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat-tracker-fourth img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5);\n}\n\n.cat-tracker-fifth img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5, 1.1);\n}\n\n.end-game {\n  z-index: 3;\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  background-color: #282a36ce;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: 2rem;\n}\n\n.play-again-button {\n  appearance: none;\n  border: none;\n  font-family: inherit;\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n  cursor: grab;\n  transition: 0.3s;\n}\n\n@media only screen and (max-width: 900px) {\n}\n\n@media only screen and (max-width: 850px) {\n  :root {\n    --scale-size: 0.4;\n    --board-size: min(60vh, 90vw);\n    --logo-ball-size: 50px;\n    --second-row: calc((95vh - 50px) * (1 / (1.3 + 1)));\n    --third-row: calc((95vh - 50px) * (1.3 / (1.3 + 1)));\n    --mini-board-size: calc(var(--board-size) * var(--scale-size));\n    --cat-tracker-width: calc(var(--board-size) * 0.4);\n  }\n\n  body {\n    display: grid;\n    grid-template: 5vh 1fr 1.3fr 50px/ 50vw 50vw;\n    align-items: center;\n    justify-items: center;\n  }\n\n  .title {\n    grid-area: 1 / 1 / 2 / 3;\n    margin-top: 0;\n  }\n\n  h1 {\n    font-size: 1rem;\n  }\n\n  .player-board-container {\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .player-board-container.shrink {\n    scale: var(--scale-size);\n    translate: 0px\n      calc(\n        (\n            var(--third-row) - var(--board-size) + var(--second-row) +\n              var(--mini-board-size)\n          ) * -0.5\n      );\n    justify-self: center;\n  }\n\n  .player-board-container.shrink:hover {\n    scale: 0.75;\n  }\n\n  .comp-board-container {\n    margin-top: auto;\n    display: none;\n    position: relative;\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .cat-tracker-container {\n    margin: auto;\n    grid-area: 2 / 2 / 3 / 3;\n  }\n}\n\n@media only screen and (max-width: 450px) {\n  :root {\n    --scale-size: 0.5;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n  font-family: \"comfy\";\n  src: url(\"./font/comfortaa-variablefont_wght-webfont.woff2\") format(\"woff2\"),\n    url(\"./font/comfortaa-variablefont_wght-webfont.woff\") format(\"woff\");\n  font-weight: 600;\n  font-style: normal;\n}\n\n:root {\n  --background: #282a36;\n  --board-size: min(60vw, 500px);\n  --cell-size: calc(var(--board-size) / 10);\n  --logo-ball-size: 75px;\n  --shrink-scale: 1;\n  --margin: calc((100vw - var(--board-size)) / 2);\n  --shrunk-board: calc(var(--board-size) * var(--shrink-scale));\n  /* --cat-tracker-size: calc(var(--board-size) * 0.4); */\n  --cat-tracker-padding: 10px;\n  --cat-tracker-width: calc(\n    min((calc(var(--margin) * 0.95)), 200px) - (var(--cat-tracker-padding) * 2)\n  );\n  --cat-tracker-height: calc(var(var(--cat-tracker-width) * (4 / 5)));\n  --cat-tracker-cell: calc(var(--cat-tracker-width) / 5);\n  --margin-top: calc(((100vh - 100px) - var(--board-size)) * 0.5);\n}\n\nbody {\n  font-family: comfy, Verdana, Geneva, Tahoma, sans-serif;\n  position: relative;\n  display: grid;\n  grid-template: 100px 1fr / 1fr 1fr 1fr;\n  align-items: center;\n  /* justify-items: center; */\n  margin: 0;\n  padding: 0;\n  position: relative;\n  color: whitesmoke;\n  height: 100vh;\n  width: 100vw;\n  background: url(\"./img/grrass.jpeg\");\n  background-repeat: repeat;\n  background-size: 400px;\n  text-align: center;\n}\n\n.opening-screen {\n  overflow: hidden;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  z-index: 10;\n  background: url(\"./img/grrass.jpeg\");\n  background-repeat: repeat;\n  background-size: 100px;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  transition: 2s;\n}\n\n.opening-screen p {\n  background-color: #282a36bc;\n  box-sizing: border-box;\n  width: 300px;\n  padding: 30px;\n  border-radius: 30px;\n}\n\n@keyframes bounce {\n  from {\n    translate: 0;\n  }\n  to {\n    translate: 0px -10px;\n  }\n}\n\n.opening-screen button {\n  animation-name: bounce;\n  animation-duration: 2s;\n  animation-iteration-count: infinite;\n  animation-direction: alternate;\n  animation-timing-function: ease-out;\n  color: whitesmoke;\n  font-family: inherit;\n  font-size: 1.5rem;\n  appearance: none;\n  border-radius: 50%;\n  border: none;\n  width: 150px;\n  height: 150px;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n  cursor: grab;\n  transition: 0.3s;\n}\n\n.opening-screen button:hover,\n.play-again-button:hover {\n  animation: none;\n  scale: 0.9;\n}\n\n.opening-screen button:active,\n.play-again-button:active {\n  scale: 0.8;\n}\n\n.title {\n  grid-area: 1 / 1 / 2 / -1;\n  width: min-content;\n  height: var(--logo-ball-size);\n  margin: auto;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n}\n\n.title .ball:nth-child(4) {\n  grid-area: 1 / 1 / 2 / 2;\n  margin-left: 0;\n}\n\n.title .ball:nth-child(3) {\n  grid-area: 1 / 2 / 2 / 3;\n}\n\n.title .ball:nth-child(2) {\n  grid-area: 1 / 3 / 2 / 4;\n}\n\n.title .ball:nth-child(1) {\n  grid-area: 1 / 4 / 2 / 5;\n}\n\n.ball {\n  box-shadow: 1px 1px 8px rgb(255, 140, 0);\n  margin-left: calc(var(--logo-ball-size) * -0.5);\n  content: \"\";\n  height: var(--logo-ball-size);\n  width: var(--logo-ball-size);\n  border-radius: 50%;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n}\n\n.words {\n  grid-area: 1 / 1 / 2 / -1;\n}\nh1 {\n  font-size: 2rem;\n}\n\n.player-board-container {\n  grid-area: 2 / 2 / 3 / 3;\n  transition: 0.3s;\n  margin: auto;\n  width: min-content;\n  height: min-content;\n  transform-origin: 0 0;\n  z-index: 3;\n}\n\n.player-board,\n.comp-board {\n  /* box-sizing: border-box; */\n  width: var(--board-size);\n  height: var(--board-size);\n  display: grid;\n  grid-template: repeat(10, auto) / repeat(10, auto);\n  background: url(\"./img/pexels-pixmike-413195.jpg\");\n  background-repeat: repeat;\n  background-size: var(--cell-size) var(--cell-size);\n}\n\n.grid-cell {\n  z-index: 0;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.164);\n  width: var(--cell-size);\n  height: var(--cell-size);\n  position: relative;\n}\n\n.player-board {\n  overflow: hidden;\n}\n\n.comp-board .grid-cell:hover::after {\n  box-shadow: inset 0px 0px 50px rgb(255, 123, 0);\n  cursor: pointer;\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.comp-board .grid-cell:active::after {\n  box-shadow: inset 0px 0px 50px 10px rgb(255, 123, 0);\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.player-board .grid-cell:hover::after {\n  position: absolute;\n  left: 0;\n  content: \"\";\n  background-color: rgba(0, 0, 0, 0.462);\n  border-radius: 5px;\n}\n\n.player-board.cat-one .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 5);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-one\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 5);\n}\n\n.player-board.cat-two .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 4);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-two\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 4);\n}\n\n.player-board.cat-three .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 3);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-three\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 3);\n}\n\n.player-board.cat-four .grid-cell:hover::after,\n.player-board.cat-five .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 2);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-four\n  .grid-cell:hover::after,\n.player-board-container.horizontal\n  .player-board.cat-five\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 2);\n}\n\n.player-board-container.shrink {\n  scale: var(--shrink-scale);\n  translate: calc((var(--margin) + var(--shrunk-board)) * -0.5);\n}\n\n.player-board-container.shrink:hover {\n  scale: 0.75;\n  border: 2px solid black;\n}\n\n.cat-img {\n  transition: 0.3s;\n  position: absolute;\n  top: 3px;\n  rotate: -90deg;\n  width: var(--cell-size);\n  pointer-events: none;\n}\n\n.cat1 {\n  right: -10px;\n  height: calc(var(--cell-size) * 5);\n  transform: scale(5.5, 4);\n}\n\n.cat1.horizontal-cat {\n  top: 5px;\n  width: calc(var(--cell-size) * 5);\n  transform: scale(3.8, 2.7);\n}\n\n.cat2 {\n  top: 5px;\n  left: -5px;\n  height: calc(var(--cell-size) * 4);\n  transform: scale(4.3, 2.5);\n}\n\n.cat2.horizontal-cat {\n  top: -3px;\n  width: calc(var(--cell-size) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat3 {\n  left: 0;\n  height: calc(var(--cell-size) * 3);\n  transform: scale(3.5, 2.5);\n}\n\n.cat3.horizontal-cat {\n  width: calc(var(--cell-size) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat4 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 2);\n}\n\n.cat4.horizontal-cat {\n  width: calc(var(--cell-size) * 2);\n  transform: scale(1.5);\n}\n\n.cat5 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 1.5);\n}\n\n.cat5.horizontal-cat {\n  width: calc((var(--cell-size) * 2));\n  transform: scale(1.5, 1.1);\n}\n\n.horizontal-cat {\n  top: 0px;\n  left: 0px;\n  height: var(--cell-size);\n  rotate: 0deg;\n}\n\n.grid-cell.attacked::after {\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  box-shadow: inset 0px 0px 15px orange;\n}\n\n.grid-cell.attacked::before {\n  z-index: 1;\n  position: absolute;\n  content: \"\";\n  width: calc(var(--cell-size) / 3);\n  height: calc(var(--cell-size) / 3);\n  background-color: rgba(255, 166, 0, 0.698);\n  border-radius: 50%;\n  inset: 0;\n  margin: auto;\n}\n\n.grid-cell.attacked.occupied::before {\n  width: calc(var(--cell-size) / 1.5);\n  height: calc(var(--cell-size) / 1.5);\n  background-color: orange;\n  transition: 1s;\n}\n\n.grid-cell.attacked.occupied.consume::before {\n  scale: 0;\n}\n\n.rotate-button {\n  background-color: hsl(39, 100%, 50%);\n  appearance: none;\n  border: none;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  cursor: pointer;\n  margin: 5px;\n}\n\n.rotate-button:hover {\n  background-color: hsl(39, 100%, 60%);\n}\n\n.rotate-button:active {\n  background-color: hsl(39, 100%, 70%);\n}\n\n.comp-board-container {\n  overflow: hidden;\n  grid-area: 2 / 2 / 3 / 3;\n  width: min-content;\n  height: min-content;\n  display: none;\n  inset: 0;\n  margin: auto;\n}\n\n.hidden {\n  opacity: 0;\n}\n\n.cat-tracker-container {\n  width: min-content;\n  background-color: rgba(255, 255, 255, 0.405);\n  padding: var(--cat-tracker-padding);\n  border-radius: 20px;\n  overflow: hidden;\n  align-self: flex-start;\n  margin: var(--margin-top) 10px;\n  grid-area: 2 / 3 / 3 / 4;\n  visibility: hidden;\n}\n\n.cat-tracker {\n  display: grid;\n  grid-template: repeat(4, auto) / repeat(5, auto);\n  width: var(--cat-tracker-width);\n  height: var(--cat-tracker-height);\n  align-items: center;\n  justify-items: flex-start;\n}\n\n.cat-tracker div {\n  position: relative;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.5);\n  height: var(--cat-tracker-cell);\n  width: var(--cat-tracker-cell);\n}\n\n.cat-tracker div::after {\n  position: absolute;\n  content: \"\";\n  background-color: orange;\n  width: 40%;\n  height: 40%;\n  border-radius: 50%;\n  z-index: 3;\n  inset: 0;\n  margin: auto;\n  opacity: 0;\n  transition: 0.5s;\n}\n\n.cat-tracker div::before {\n  position: absolute;\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  background-color: rgba(201, 201, 201, 0.54);\n  opacity: 0;\n  left: 0;\n}\n\n.cat-tracker div.cat-tracker-hit::after,\n.cat-tracker div.cat-tracker-hit::before {\n  opacity: 1;\n}\n\n.cat-tracker div img {\n  height: var(--cat-tracker-cell);\n}\n\n.cat-tracker-first img {\n  width: calc(var(--cat-tracker-cell) * 5);\n  transform: scale(3.4, 2.7);\n}\n\n.cat-tracker-second img {\n  width: calc(var(--cat-tracker-cell) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat-tracker-third img {\n  width: calc(var(--cat-tracker-cell) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat-tracker-fourth img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5);\n}\n\n.cat-tracker-fifth img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5, 1.1);\n}\n\n.end-game {\n  z-index: 3;\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  background-color: #282a36ce;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: 2rem;\n}\n\n.play-again-button {\n  appearance: none;\n  border: none;\n  font-family: inherit;\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n  cursor: grab;\n  transition: 0.3s;\n}\n\n@media only screen and (max-width: 900px) {\n}\n\n@media only screen and (max-width: 850px) {\n  :root {\n    --scale-size: 0.4;\n    --board-size: min(60vh, 90vw);\n    --logo-ball-size: 50px;\n    --second-row: calc((95vh - 50px) * (1 / (1.3 + 1)));\n    --third-row: calc((95vh - 50px) * (1.3 / (1.3 + 1)));\n    --mini-board-size: calc(var(--board-size) * var(--scale-size));\n    --cat-tracker-width: calc(var(--board-size) * 0.4);\n  }\n\n  body {\n    display: grid;\n    grid-template: 5vh 1fr 1.3fr 50px/ 50vw 50vw;\n    align-items: center;\n    justify-items: center;\n  }\n\n  .title {\n    grid-area: 1 / 1 / 2 / 3;\n    margin-top: 0;\n  }\n\n  h1 {\n    font-size: 1rem;\n  }\n\n  .player-board-container {\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .player-board-container.shrink {\n    scale: var(--scale-size);\n    translate: 0px\n      calc(\n        (\n            var(--third-row) - var(--board-size) + var(--second-row) +\n              var(--mini-board-size)\n          ) * -0.5\n      );\n    justify-self: center;\n  }\n\n  .player-board-container.shrink:hover {\n    scale: 0.75;\n  }\n\n  .comp-board-container {\n    margin-top: auto;\n    display: none;\n    position: relative;\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .cat-tracker-container {\n    margin: auto;\n    grid-area: 2 / 2 / 3 / 3;\n  }\n}\n\n@media only screen and (max-width: 450px) {\n  :root {\n    --scale-size: 0.5;\n  }\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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S0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxNQUFNLE1BQU0sWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLE9BQU8sWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxPQUFPLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sT0FBTyxZQUFZLGFBQWEsT0FBTyxNQUFNLFlBQVksYUFBYSxPQUFPLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxNQUFNLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEs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Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7V0NyQkE7Ozs7Ozs7Ozs7Ozs7QUNBcUI7QUFDSztBQUUxQitFLGlEQUFJLEVBQUUsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZS1jYXRzLy4vc3JjL2JvdC5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9jYXQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvY2F0SW1nLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvaW5pdC5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVPcmllbnRhdGlvbihhcnJheSkge1xuICByZXR1cm4gYXJyYXlbMF1bMF0gPT09IGFycmF5WzFdWzBdID8gXCJ5XCIgOiBcInhcIjtcbn1cblxuZnVuY3Rpb24gYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyhzdGFydCwgYm9hcmRJRCwgY2F0LCBheGlzLCBkaXJlY3Rpb24pIHtcbiAgbGV0IGFsbERpcjtcbiAgY29uc3QgW3gsIHldID0gc3RhcnQ7XG4gIGNvbnN0IHVwID0gKCkgPT4gYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyhbeCwgeSAtIDFdLCBib2FyZElELCBjYXQsIFwieVwiLCAtMSk7XG4gIGNvbnN0IHJpZ2h0ID0gKCkgPT5cbiAgICBhc3Nlc3NBZGphY2VudENvb3JkaW5hdGVzKFt4ICsgMSwgeV0sIGJvYXJkSUQsIGNhdCwgXCJ4XCIsIDEpO1xuICBjb25zdCBkb3duID0gKCkgPT5cbiAgICBhc3Nlc3NBZGphY2VudENvb3JkaW5hdGVzKFt4LCB5ICsgMV0sIGJvYXJkSUQsIGNhdCwgXCJ5XCIsIDEpO1xuICBjb25zdCBsZWZ0ID0gKCkgPT5cbiAgICBhc3Nlc3NBZGphY2VudENvb3JkaW5hdGVzKFt4IC0gMSwgeV0sIGJvYXJkSUQsIGNhdCwgXCJ4XCIsIC0xKTtcblxuICBpZiAoc3RhcnQuc29tZSgobnVtKSA9PiBudW0gPiA5IHx8IG51bSA8IDApKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBvcHBCb2FyZENlbGwgPSBib2FyZElELmJvYXJkW2BbJHtzdGFydH1dYF07XG4gIGlmIChcbiAgICBvcHBCb2FyZENlbGwuYXR0YWNrZWQgJiZcbiAgICAoIW9wcEJvYXJkQ2VsbC5vY2N1cGllZEJ5IHx8IG9wcEJvYXJkQ2VsbC5vY2N1cGllZEJ5ICE9PSBjYXQpXG4gICkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmICghb3BwQm9hcmRDZWxsLmF0dGFja2VkKSByZXR1cm4gc3RhcnQ7XG5cbiAgaWYgKGF4aXMpIHtcbiAgICBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoXG4gICAgICAgICAgW3ggKyAxICogZGlyZWN0aW9uLCB5XSxcbiAgICAgICAgICBib2FyZElELFxuICAgICAgICAgIGNhdCxcbiAgICAgICAgICBheGlzLFxuICAgICAgICAgIGRpcmVjdGlvblxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgYWxsRGlyID0gW2xlZnQoKSwgcmlnaHQoKV07XG4gICAgfSBlbHNlIGlmIChheGlzID09PSBcInlcIikge1xuICAgICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgICByZXR1cm4gYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyhcbiAgICAgICAgICBbeCwgeSArIDEgKiBkaXJlY3Rpb25dLFxuICAgICAgICAgIGJvYXJkSUQsXG4gICAgICAgICAgY2F0LFxuICAgICAgICAgIGF4aXMsXG4gICAgICAgICAgZGlyZWN0aW9uXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBhbGxEaXIgPSBbdXAoKSwgZG93bigpXTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYWxsRGlyID0gW3VwKCksIHJpZ2h0KCksIGRvd24oKSwgbGVmdCgpXTtcbiAgfVxuICByZXR1cm4gYWxsRGlyLmZpbHRlcigob3B0KSA9PiBvcHQgIT09IG51bGwpO1xufVxuXG5mdW5jdGlvbiBjb21wRmlyZVNob3Qob3Bwb25lbnRCb2FyZCkge1xuICBjb25zdCB3b3VuZGVkVGFyZ2V0cyA9IFtdO1xuICBsZXQgcG9zc2libGVIaXRzO1xuICBvcHBvbmVudEJvYXJkLmNhdHMuZm9yRWFjaCgoY2F0KSA9PiB7XG4gICAgaWYgKGNhdC5oaXRzID4gMCAmJiAhY2F0LmlzU3VuaygpKSB7XG4gICAgICB3b3VuZGVkVGFyZ2V0cy5wdXNoKGNhdCk7XG4gICAgfVxuICB9KTtcbiAgaWYgKHdvdW5kZWRUYXJnZXRzLmxlbmd0aCkge1xuICAgIGNvbnN0IHByaW1hcnlUYXJnZXQgPSB3b3VuZGVkVGFyZ2V0c1swXTtcbiAgICBpZiAocHJpbWFyeVRhcmdldC5jb29yZEhpdC5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBvcmllbnRhdGlvbiA9IGRldGVybWluZU9yaWVudGF0aW9uKHByaW1hcnlUYXJnZXQuY29vcmRIaXQpO1xuICAgICAgcG9zc2libGVIaXRzID0gYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyhcbiAgICAgICAgcHJpbWFyeVRhcmdldC5jb29yZEhpdFswXSxcbiAgICAgICAgb3Bwb25lbnRCb2FyZCxcbiAgICAgICAgcHJpbWFyeVRhcmdldCxcbiAgICAgICAgb3JpZW50YXRpb25cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvc3NpYmxlSGl0cyA9IGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoXG4gICAgICAgIHByaW1hcnlUYXJnZXQuY29vcmRIaXRbMF0sXG4gICAgICAgIG9wcG9uZW50Qm9hcmQsXG4gICAgICAgIHByaW1hcnlUYXJnZXRcbiAgICAgICk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHBvc3NpYmxlSGl0cyA9IFtdO1xuICAgIE9iamVjdC5rZXlzKG9wcG9uZW50Qm9hcmQuYm9hcmQpLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGlmICghb3Bwb25lbnRCb2FyZC5ib2FyZFtjZWxsXS5hdHRhY2tlZCkge1xuICAgICAgICBwb3NzaWJsZUhpdHMucHVzaChvcHBvbmVudEJvYXJkLmJvYXJkW2NlbGxdLmNvb3JkaW5hdGVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gcG9zc2libGVIaXRzW01hdGguZmxvb3IocG9zc2libGVIaXRzLmxlbmd0aCAqIE1hdGgucmFuZG9tKCkpXTtcbn1cblxuZXhwb3J0IHsgYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcywgY29tcEZpcmVTaG90IH07XG4iLCJjbGFzcyBDYXQge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgsIHR5cGUpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IFwidmVydGljYWxcIjtcbiAgICB0aGlzLmNvb3JkSGl0ID0gW107XG4gIH1cblxuICBoaXQoY29vcmQpIHtcbiAgICB0aGlzLmhpdHMgKz0gMTtcbiAgICB0aGlzLmNvb3JkSGl0LnB1c2goY29vcmQpO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aCA9PT0gdGhpcy5oaXRzO1xuICB9XG5cbiAgcm90YXRlKCkge1xuICAgIHRoaXMub3JpZW50YXRpb24gPVxuICAgICAgdGhpcy5vcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiID8gXCJob3Jpem9udGFsXCIgOiBcInZlcnRpY2FsXCI7XG4gIH1cblxuICByYW5kb21pemVPcmllbnRhdGlvbigpIHtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gTWF0aC5yYW5kb20oKSA+IDAuNSA/IFwidmVydGljYWxcIiA6IFwiaG9yaXpvbnRhbFwiO1xuICB9XG5cbiAgc2V0RG9tRWxlbWVudCh0YXJnZXQpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSB0YXJnZXQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2F0cygpIHtcbiAgY29uc3QgY2F0MSA9IG5ldyBDYXQoNSwgXCJiaWcgc3RyZXRjaFwiKTtcbiAgY29uc3QgY2F0MiA9IG5ldyBDYXQoNCwgXCJkb3dud2FyZCBjYXRcIik7XG4gIGNvbnN0IGNhdDMgPSBuZXcgQ2F0KDMsIFwic3R1ZmYgc3RydXR0ZXJcIik7XG4gIGNvbnN0IGNhdDQgPSBuZXcgQ2F0KDIsIFwicXVhc2kgbG9hZlwiKTtcbiAgY29uc3QgY2F0NSA9IG5ldyBDYXQoMiwgXCJjb21wYWN0IGtpdHR5XCIpO1xuICByZXR1cm4gW2NhdDEsIGNhdDIsIGNhdDMsIGNhdDQsIGNhdDVdO1xufVxuXG5leHBvcnQgeyBDYXQsIGNyZWF0ZUNhdHMgfTtcbiIsImltcG9ydCBjYXQxIGZyb20gXCIuL2ltZy9iaWctc3RyZXRjaC5zdmdcIjtcbmltcG9ydCBjYXQyIGZyb20gXCIuL2ltZy9jYXQyLnN2Z1wiO1xuaW1wb3J0IGNhdDMgZnJvbSBcIi4vaW1nL3dhbGsuc3ZnXCI7XG5pbXBvcnQgY2F0NCBmcm9tIFwiLi9pbWcvcXVhc2ktbG9hZjIuc3ZnXCI7XG5pbXBvcnQgY2F0NSBmcm9tIFwiLi9pbWcvbGVzUm9sbC5zdmdcIjtcblxuZnVuY3Rpb24gY3JlYXRlQ2F0SW1hZ2Uoc291cmNlKSB7XG4gIGNvbnN0IGNhdEltZyA9IG5ldyBJbWFnZSgpO1xuICBjYXRJbWcuc3JjID0gc291cmNlO1xuICByZXR1cm4gY2F0SW1nO1xufVxuXG5mdW5jdGlvbiBhZGRDYXRJbWcoY3VycmVudENhdCkge1xuICBjb25zdCBjYXRJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgY2F0SW1nLmNsYXNzTGlzdC5hZGQoXCJjYXQtaW1nXCIpO1xuICBzd2l0Y2ggKGN1cnJlbnRDYXQudHlwZSkge1xuICAgIGNhc2UgXCJiaWcgc3RyZXRjaFwiOlxuICAgICAgY2F0SW1nLnNyYyA9IGNhdDE7XG4gICAgICBjYXRJbWcuY2xhc3NMaXN0LmFkZChcImNhdDFcIik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZG93bndhcmQgY2F0XCI6XG4gICAgICBjYXRJbWcuc3JjID0gY2F0MjtcbiAgICAgIGNhdEltZy5jbGFzc0xpc3QuYWRkKFwiY2F0MlwiKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJzdHVmZiBzdHJ1dHRlclwiOlxuICAgICAgY2F0SW1nLnNyYyA9IGNhdDM7XG4gICAgICBjYXRJbWcuY2xhc3NMaXN0LmFkZChcImNhdDNcIik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwicXVhc2kgbG9hZlwiOlxuICAgICAgY2F0SW1nLnNyYyA9IGNhdDQ7XG4gICAgICBjYXRJbWcuY2xhc3NMaXN0LmFkZChcImNhdDRcIik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiY29tcGFjdCBraXR0eVwiOlxuICAgICAgY2F0SW1nLnNyYyA9IGNhdDU7XG4gICAgICBjYXRJbWcuY2xhc3NMaXN0LmFkZChcImNhdDVcIik7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cbiAgaWYgKGN1cnJlbnRDYXQub3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgY2F0SW1nLmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsLWNhdFwiKTtcbiAgfVxuICByZXR1cm4gY2F0SW1nO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRDYXRJbWFnZXMoKSB7XG4gIGNvbnN0IGZpcnN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtY2VsbD0nMC0wJ11gKTtcbiAgY29uc3Qgc2Vjb25kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY2VsbD1cIjAtMVwiXScpO1xuICBjb25zdCB0aGlyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNlbGw9XCIwLTJcIl0nKTtcbiAgY29uc3QgZm91cnRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY2VsbD1cIjAtM1wiXScpO1xuICBjb25zdCBmaWZ0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNlbGw9XCIyLTNcIl0nKTtcbiAgZmlyc3QuYXBwZW5kKGNyZWF0ZUNhdEltYWdlKGNhdDEpKTtcbiAgZmlyc3QuY2xhc3NMaXN0LmFkZChcImNhdC10cmFja2VyLWZpcnN0XCIpO1xuICBzZWNvbmQuYXBwZW5kKGNyZWF0ZUNhdEltYWdlKGNhdDIpKTtcbiAgc2Vjb25kLmNsYXNzTGlzdC5hZGQoXCJjYXQtdHJhY2tlci1zZWNvbmRcIik7XG4gIHRoaXJkLmFwcGVuZChjcmVhdGVDYXRJbWFnZShjYXQzKSk7XG4gIHRoaXJkLmNsYXNzTGlzdC5hZGQoXCJjYXQtdHJhY2tlci10aGlyZFwiKTtcbiAgZm91cnRoLmFwcGVuZChjcmVhdGVDYXRJbWFnZShjYXQ0KSk7XG4gIGZvdXJ0aC5jbGFzc0xpc3QuYWRkKFwiY2F0LXRyYWNrZXItZm91cnRoXCIpO1xuICBmaWZ0aC5hcHBlbmQoY3JlYXRlQ2F0SW1hZ2UoY2F0NSkpO1xuICBmaWZ0aC5jbGFzc0xpc3QuYWRkKFwiY2F0LXRyYWNrZXItZmlmdGhcIik7XG59XG5cbmV4cG9ydCB7IGFkZENhdEltZywgYXBwZW5kQ2F0SW1hZ2VzIH07IiwiLyogZXNsaW50LWRpc2FibGUgZGVmYXVsdC1jYXNlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuaW1wb3J0IHJvdGF0ZUljb24gZnJvbSBcIi4vaW1nL2Zvcm1hdC1yb3RhdGUtOTAuc3ZnXCI7XG5cbmltcG9ydCB7IGFkZENhdEltZywgYXBwZW5kQ2F0SW1hZ2VzIH0gZnJvbSBcIi4vY2F0SW1nXCI7XG5cbmltcG9ydCB7IGNvbXBGaXJlU2hvdCB9IGZyb20gXCIuL2JvdFwiO1xuXG5pbXBvcnQgeyBjcmVhdGVQbGF5ZXJHYW1lQm9hcmQsIGNyZWF0ZUNvbXBHYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ib2FyZC1jb250YWluZXJcIik7XG5jb25zdCBjb21wQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXAtYm9hcmQtY29udGFpbmVyXCIpO1xuY29uc3QgY2F0VHJhY2tlckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2F0LXRyYWNrZXItY29udGFpbmVyXCIpO1xuXG5sZXQgY3VycmVudFBsYXllckJvYXJkO1xuXG5mdW5jdGlvbiByb3RhdGVDYXQoKSB7XG4gIGlmICghY3VycmVudFBsYXllckJvYXJkKSByZXR1cm47XG4gIGNvbnN0IGN1cnJlbnRDYXQgPSBjdXJyZW50UGxheWVyQm9hcmQuZ2V0Q3VycmVudENhdCgpO1xuICBpZiAoIWN1cnJlbnRDYXQpIHJldHVybjtcbiAgY3VycmVudENhdC5yb3RhdGUoKTtcbiAgcGxheWVyQm9hcmRDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZShcImhvcml6b250YWxcIik7XG59XG5cbmNvbnN0IHJvdGF0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5jb25zdCByb3RhdGVJbWcgPSBuZXcgSW1hZ2UoKTtcbnJvdGF0ZUltZy5zcmMgPSByb3RhdGVJY29uO1xucm90YXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyb3RhdGUtYnV0dG9uXCIpO1xucm90YXRlQnV0dG9uLmFwcGVuZENoaWxkKHJvdGF0ZUltZyk7XG5yb3RhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgcm90YXRlQ2F0KCk7XG59KTtcblxuZnVuY3Rpb24gY3JlYXRlQ2F0VHJhY2tlcigpIHtcbiAgY29uc3QgY2F0VHJhY2tlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNhdFRyYWNrZXJEaXYuY2xhc3NMaXN0LmFkZChcImNhdC10cmFja2VyXCIpO1xuICBmb3IgKGxldCB5ID0gMDsgeSA8IDQ7IHkrKykge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgNTsgeCsrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnN0IGlkID0gYCR7eH0tJHt5fWA7XG4gICAgICBjZWxsLmRhdGFzZXQuY2VsbCA9IGlkO1xuICAgICAgY2F0VHJhY2tlckRpdi5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNhdFRyYWNrZXJEaXY7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNhdFRyYWNrZXIoY2F0KSB7XG4gIGxldCB5O1xuICBsZXQgeCA9IDA7XG4gIHN3aXRjaCAoY2F0LnR5cGUpIHtcbiAgICBjYXNlIFwiYmlnIHN0cmV0Y2hcIjpcbiAgICAgIHkgPSAwO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImRvd253YXJkIGNhdFwiOlxuICAgICAgeSA9IDE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwic3R1ZmYgc3RydXR0ZXJcIjpcbiAgICAgIHkgPSAyO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInF1YXNpIGxvYWZcIjpcbiAgICAgIHkgPSAzO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImNvbXBhY3Qga2l0dHlcIjpcbiAgICAgIHkgPSAzO1xuICAgICAgeCA9IDI7XG4gICAgICBicmVhaztcbiAgfVxuICBjb25zdCBjb29yZCA9IGAke3ggKyBjYXQuaGl0cyAtIDF9LSR7eX1gO1xuICBjb25zdCBkb21UYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jZWxsPScke2Nvb3JkfSddYCk7XG4gIGRvbVRhcmdldC5jbGFzc0xpc3QuYWRkKFwiY2F0LXRyYWNrZXItaGl0XCIpO1xufVxuXG5mdW5jdGlvbiBhcHBseUhpdEltYWdlKHRhcmdldCwgYm9hcmRJRCwgY29vcmQpIHtcbiAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhdHRhY2tlZFwiKTtcbiAgaWYgKGJvYXJkSUQuYm9hcmRbYFske2Nvb3JkfV1gXS5vY2N1cGllZEJ5KSB7XG4gICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJvY2N1cGllZFwiKTtcbiAgICBpZiAoYm9hcmRJRC5jb21wKSB7XG4gICAgICB1cGRhdGVDYXRUcmFja2VyKGJvYXJkSUQuYm9hcmRbYFske2Nvb3JkfV1gXS5vY2N1cGllZEJ5KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hyaW5rU2l6ZSgpIHtcbiAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcC1ib2FyZCcpXG4gIGNvbnN0IG9yaWdpbmFsU2l6ZSA9IGJvYXJkLm9mZnNldFdpZHRoO1xuICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICByZXR1cm4gKHdpbmRvd1dpZHRoIC0gb3JpZ2luYWxTaXplKSAvIDIuMyAvIG9yaWdpbmFsU2l6ZTtcbn1cblxuZnVuY3Rpb24gc2V0U2hyaW5rU2NhbGUoYm9hcmQpIHtcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgIFwiLS1zaHJpbmstc2NhbGVcIixcbiAgICBgbWluKDEsICR7c2hyaW5rU2l6ZShib2FyZCl9KWBcbiAgKTtcbn1cblxuZnVuY3Rpb24gaG92ZXJFZmZlY3QoY2F0KSB7XG4gIGNvbnN0IHByZWZpeCA9IFwicGxheWVyLWJvYXJkXCI7XG4gIGxldCBzdWZmaXg7XG4gIHN3aXRjaCAoY2F0LnR5cGUpIHtcbiAgICBjYXNlIFwiYmlnIHN0cmV0Y2hcIjpcbiAgICAgIHN1ZmZpeCA9IFwiY2F0LXR3b1wiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImRvd253YXJkIGNhdFwiOlxuICAgICAgc3VmZml4ID0gXCJjYXQtdGhyZWVcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJzdHVmZiBzdHJ1dHRlclwiOlxuICAgICAgc3VmZml4ID0gXCJjYXQtZm91clwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInF1YXNpIGxvYWZcIjpcbiAgICAgIHN1ZmZpeCA9IFwiY2F0LWZpdmVcIjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBzdWZmaXggPSBcIlwiO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIGAke3ByZWZpeH0gJHtzdWZmaXh9YDtcbn1cblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IGNyZWF0ZVBsYXllckdhbWVCb2FyZCgpO1xuICBjb25zdCBjb21wQm9hcmQgPSBjcmVhdGVDb21wR2FtZUJvYXJkKCk7XG4gIHBvcHVsYXRlRGlzcGxheShwbGF5ZXJCb2FyZCwgY29tcEJvYXJkKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGRyZW4oZWxlbWVudCkge1xuICB3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFyUGFnZSgpIHtcbiAgY3VycmVudFBsYXllckJvYXJkID0gMDtcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHNldFNocmlua1NjYWxlKTtcbiAgcGxheWVyQm9hcmRDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hyaW5rJyk7XG4gIHJlbW92ZUNoaWxkcmVuKHBsYXllckJvYXJkQ29udGFpbmVyKTtcbiAgcmVtb3ZlQ2hpbGRyZW4oY29tcEJvYXJkQ29udGFpbmVyKTtcbiAgcmVtb3ZlQ2hpbGRyZW4oY2F0VHJhY2tlckNvbnRhaW5lcik7XG4gIGNhdFRyYWNrZXJDb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xufVxuXG5mdW5jdGlvbiBlbmRHYW1lU2NyZWVuKG1lc3NhZ2UpIHtcbiAgY29uc3Qgc2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2NyZWVuLmNsYXNzTGlzdC5hZGQoXCJlbmQtZ2FtZVwiKTtcbiAgY29uc3QgZW5kTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGVuZE1lc3NhZ2UuY2xhc3NMaXN0LmFkZChcImVuZC1tZXNzYWdlXCIpO1xuICBlbmRNZXNzYWdlLnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgY29uc3QgcGxheUFnYWluQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgcGxheUFnYWluQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJwbGF5LWFnYWluLWJ1dHRvblwiKTtcbiAgcGxheUFnYWluQnV0dG9uLnRleHRDb250ZW50ID0gXCJwbGF5IGFnYWluXCI7XG4gIHBsYXlBZ2FpbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHNjcmVlbi5yZW1vdmUoKTtcbiAgICBjbGVhclBhZ2UoKTtcbiAgICBzdGFydEdhbWUoKTtcbiAgfSk7XG4gIHNjcmVlbi5hcHBlbmQoZW5kTWVzc2FnZSwgcGxheUFnYWluQnV0dG9uKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JlZW4pO1xufVxuXG5mdW5jdGlvbiBjb21wUmV0YWxpYXRpb24ocGxheWVyQm9hcmQpIHtcbiAgY29uc3QgdGFyZ2V0ID0gY29tcEZpcmVTaG90KHBsYXllckJvYXJkKTtcbiAgcGxheWVyQm9hcmQudGFrZUF0dGFjayh0YXJnZXQpO1xuICBjb25zdCBkYXRhSUQgPSBgW2RhdGEtY29vcmQ9JyR7dGFyZ2V0fSddYDtcbiAgY29uc3QgZG9tQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZGF0YUlEKTtcbiAgYXBwbHlIaXRJbWFnZShkb21DZWxsLCBwbGF5ZXJCb2FyZCwgdGFyZ2V0KTtcbiAgaWYgKHBsYXllckJvYXJkLmNoZWNrRm9yV2luKCkpIHtcbiAgICBlbmRHYW1lU2NyZWVuKFwiQXcgc2h1Y2tzISBGb2lsZWQgeWV0IGFnYWluIGJ5IHlvdXIgZGFzdGFyZGx5IG5laWdoYm9yIVwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wR2FtZUJvYXJkRGlzcGxheShib2FyZERhdGEsIG9wcEJvYXJkRGF0YSkge1xuICBjb25zdCBjb21wQm9hcmREaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29tcEJvYXJkRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwiY29tcC1ib2FyZFwiKTtcblxuICBmb3IgKGNvbnN0IGNvb3JkIG9mIE9iamVjdC52YWx1ZXMoYm9hcmREYXRhLmJvYXJkKSkge1xuICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbiAgICBjZWxsLmRhdGFzZXQuY29tcENvb3JkID0gY29vcmQuY29vcmRpbmF0ZXM7XG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaWYgKCFjb29yZC5hdHRhY2tlZCkge1xuICAgICAgICBib2FyZERhdGEudGFrZUF0dGFjayhjb29yZC5jb29yZGluYXRlcyk7XG4gICAgICAgIGFwcGx5SGl0SW1hZ2UoY2VsbCwgYm9hcmREYXRhLCBjb29yZC5jb29yZGluYXRlcyk7XG4gICAgICAgIGlmIChjb29yZC5vY2N1cGllZEJ5KSB7XG4gICAgICAgICAgaWYgKGNvb3JkLm9jY3VwaWVkQnkuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhdCA9IGNvb3JkLm9jY3VwaWVkQnk7XG4gICAgICAgICAgICBjYXQuZG9tRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgY2F0LmNvb3JkSGl0LmZvckVhY2goKHNwb3QpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZG9tRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgIGBbZGF0YS1jb21wLWNvb3JkPScke3Nwb3R9J11gXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRvbUVsLmNsYXNzTGlzdC5hZGQoXCJjb25zdW1lXCIpO1xuICAgICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoYm9hcmREYXRhLmNoZWNrRm9yV2luKCkpIHtcbiAgICAgICAgICAgICAgZW5kR2FtZVNjcmVlbihcIkNvbmdyYXRzISBOb3cgYWxsIHlvdXIgbmVpZ2hib3JzIHdpbGwga25vdyB5b3VyIG5laWdoYm9yIGhhcyB0aGUgZmF0dGVzdCBjYXRzIG9uIHRoZSBibG9jayFcIik7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29tcFJldGFsaWF0aW9uKG9wcEJvYXJkRGF0YSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29tcEJvYXJkRGlzcGxheS5hcHBlbmRDaGlsZChjZWxsKTtcbiAgfVxuICBjb21wQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY29tcEJvYXJkRGlzcGxheSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllckdhbWVCb2FyZERpc3BsYXkocGxheWVyQm9hcmREYXRhLCBjb21wQm9hcmREYXRhKSB7XG4gIGN1cnJlbnRQbGF5ZXJCb2FyZCA9IHBsYXllckJvYXJkRGF0YTtcbiAgY29uc3QgcGxheWVyQm9hcmREaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcGxheWVyQm9hcmREaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItYm9hcmRcIik7XG4gIHBsYXllckJvYXJkRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwiY2F0LW9uZVwiKTtcbiAgZm9yIChjb25zdCBjb29yZCBvZiBPYmplY3QudmFsdWVzKHBsYXllckJvYXJkRGF0YS5ib2FyZCkpIHtcbiAgICBjb25zdCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzcG90LmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGxcIik7XG4gICAgc3BvdC5kYXRhc2V0LmNvb3JkID0gY29vcmQuY29vcmRpbmF0ZXM7XG4gICAgc3BvdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudENhdCA9IHBsYXllckJvYXJkRGF0YS5nZXRDdXJyZW50Q2F0KCk7XG4gICAgICBpZiAoY3VycmVudENhdCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgY29uc3QgY29vcmRBcnJheSA9IHBsYXllckJvYXJkRGF0YS5nZXRDb29yZGluYXRlcyhcbiAgICAgICAgY29vcmQuY29vcmRpbmF0ZXMsXG4gICAgICAgIGN1cnJlbnRDYXRcbiAgICAgICk7XG4gICAgICBpZiAoY29vcmRBcnJheSkge1xuICAgICAgICBwbGF5ZXJCb2FyZERhdGEucGxhY2VDYXQoY29vcmRBcnJheSwgY3VycmVudENhdCk7XG4gICAgICAgIHBsYXllckJvYXJkRGF0YS5jYXRBZGRlZCgpO1xuICAgICAgICBwbGF5ZXJCb2FyZERpc3BsYXkuY2xhc3NOYW1lID0gaG92ZXJFZmZlY3QoY3VycmVudENhdCk7XG4gICAgICAgIHBsYXllckJvYXJkQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdwbGF5ZXItYm9hcmQtY29udGFpbmVyJztcbiAgICAgICAgc3BvdC5hcHBlbmRDaGlsZChhZGRDYXRJbWcoY3VycmVudENhdCkpO1xuICAgICAgICBpZiAoY3VycmVudENhdC50eXBlID09PSBcImNvbXBhY3Qga2l0dHlcIikge1xuICAgICAgICAgIHBsYXllckJvYXJkQ29udGFpbmVyLnJlbW92ZUNoaWxkKHJvdGF0ZUJ1dHRvbik7XG4gICAgICAgICAgcGxheWVyQm9hcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInNocmlua1wiKTtcbiAgICAgICAgICBjb21wQm9hcmRDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICAgIGNyZWF0ZUNvbXBHYW1lQm9hcmREaXNwbGF5KGNvbXBCb2FyZERhdGEsIHBsYXllckJvYXJkRGF0YSk7XG4gICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgXCItLXNocmluay1zY2FsZVwiLFxuICAgICAgICAgICAgYG1pbigxLCAke3Nocmlua1NpemUoKX0pYFxuICAgICAgICAgICk7XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgc2V0U2hyaW5rU2NhbGUpO1xuICAgICAgICAgIGNhdFRyYWNrZXJDb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICAgIGNvbXBCb2FyZERhdGEuY29tcFBsYWNlQ2F0cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcGxheWVyQm9hcmREaXNwbGF5LmFwcGVuZENoaWxkKHNwb3QpO1xuICB9XG4gIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllckJvYXJkRGlzcGxheSk7XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlRGlzcGxheShwbGF5ZXJCb2FyZERhdGEsIGNvbXBCb2FyZERhdGEpIHtcbiAgY29uc3QgY2F0VHJhY2tlciA9IGNyZWF0ZUNhdFRyYWNrZXIoKTtcbiAgY2F0VHJhY2tlckNvbnRhaW5lci5hcHBlbmQoY2F0VHJhY2tlcik7XG4gIGFwcGVuZENhdEltYWdlcygpO1xuICBjcmVhdGVQbGF5ZXJHYW1lQm9hcmREaXNwbGF5KHBsYXllckJvYXJkRGF0YSwgY29tcEJvYXJkRGF0YSk7XG4gIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHJvdGF0ZUJ1dHRvbik7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICBpZiAoZS5rZXkgPT09IFwiU2hpZnRcIikge1xuICAgIHJvdGF0ZUNhdCgpO1xuICB9XG59KTtcblxuZXhwb3J0IHsgc3RhcnRHYW1lIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVDYXRzIH0gZnJvbSAnLi9jYXQnO1xuaW1wb3J0IHsgYWRkQ2F0SW1nIH0gZnJvbSAnLi9jYXRJbWcnO1xuXG5jb25zdCBwbGFjZSA9IChzdGF0ZSkgPT4gKHtcbiAgcGxhY2VDYXQ6IChjb29yZGluYXRlcywgY2F0KSA9PiB7XG4gICAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgc3RhdGUuYm9hcmRbYFske2Nvb3JkaW5hdGV9XWBdLm9jY3VwaWVkQnkgPSBjYXQ7XG4gICAgfSk7XG4gIH0sXG59KTtcblxuY29uc3QgcmVjZWl2ZUF0dGFjayA9IChzdGF0ZSkgPT4gKHtcbiAgdGFrZUF0dGFjazogKGNvb3JkKSA9PiB7XG4gICAgY29uc3QgY2VsbCA9IHN0YXRlLmJvYXJkW2BbJHtjb29yZH1dYF07XG4gICAgaWYgKGNlbGwuYXR0YWNrZWQpIHJldHVybjtcbiAgICBpZiAoY2VsbC5vY2N1cGllZEJ5KSB7XG4gICAgICBjZWxsLm9jY3VwaWVkQnkuaGl0KGNvb3JkKTtcbiAgICB9XG4gICAgY2VsbC5hdHRhY2tlZCA9IHRydWU7XG4gIH0sXG59KTtcblxuY29uc3QgY29vcmRJbnZhbGlkID0gKHN0YXRlKSA9PiAoe1xuICBjb29yZGluYXRlc0FyZUludmFsaWQ6IChhcnJheSkgPT5cbiAgICBhcnJheS5mbGF0KCkuc29tZSgoaXRlbSkgPT4gaXRlbSA8IDAgfHwgaXRlbSA+IDkpIHx8XG4gICAgYXJyYXkuc29tZSgoaXRlbSkgPT4gc3RhdGUuYm9hcmRbYFske2l0ZW19XWBdLm9jY3VwaWVkQnkpLFxufSk7XG5cbmNvbnN0IGdldENvb3JkID0gKHN0YXRlKSA9PiAoe1xuICBnZXRDb29yZGluYXRlczogKGNvb3JkLCBjYXQpID0+IHtcbiAgICBjb25zdCBhcnJheSA9IFtdO1xuICAgIGNvbnN0IFt4LCB5XSA9IGNvb3JkO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2F0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoY2F0Lm9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgYXJyYXkucHVzaChbeCwgeSArIGldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5LnB1c2goW3ggKyBpLCB5XSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzdGF0ZS5jb29yZGluYXRlc0FyZUludmFsaWQoYXJyYXkpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gYXJyYXk7XG4gIH0sXG59KTtcblxuY29uc3QgdHJhY2tDYXRzQWRkZWQgPSAoc3RhdGUpID0+ICh7XG4gIGNhdEFkZGVkOiAoKSA9PiB7XG4gICAgc3RhdGUuY2F0c0FkZGVkICs9IDE7XG4gIH1cbn0pO1xuXG5jb25zdCBjdXJyZW50Q2F0ID0gKHN0YXRlKSA9PiAoe1xuICBnZXRDdXJyZW50Q2F0OiAoKSA9PiB7XG4gICAgaWYgKHN0YXRlLmNhdHNBZGRlZCA+PSA1KSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gc3RhdGUuY2F0c1tzdGF0ZS5jYXRzQWRkZWRdO1xuICB9XG59KVxuXG5jb25zdCBjZWxsQXNzZXNzbWVudCA9IChzdGF0ZSkgPT4gKHtcbiAgZGV0ZXJtaW5lUmVhbEVzdGF0ZTogKHsgbGVuZ3RoLCBvcmllbnRhdGlvbiB9KSA9PiB7XG4gICAgY29uc3QgbGltaXQgPSAxMCAtIGxlbmd0aDtcbiAgICBjb25zdCBhcnJheSA9IFtdO1xuICAgIGxldCB4ID0gMTA7XG4gICAgbGV0IHkgPSAxMDtcbiAgICBpZiAob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgeSA9IGxpbWl0O1xuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gbGltaXQ7XG4gICAgfVxuICAgIGZvciAobGV0IGggPSAwOyBoIDwgeDsgaCsrKSB7XG4gICAgICBmb3IgKGxldCB2ID0gMDsgdiA8IHk7IHYrKykge1xuICAgICAgICBhcnJheS5wdXNoKFtoLCB2XSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGFycmF5TWludXNPdmVybGFwID0gYXJyYXkuZmlsdGVyKChjZWxsKSA9PlxuICAgICAgc3RhdGUuZ2V0Q29vcmRpbmF0ZXMoY2VsbCwgeyBsZW5ndGgsIG9yaWVudGF0aW9uIH0pXG4gICAgKTtcbiAgICByZXR1cm4gYXJyYXlNaW51c092ZXJsYXA7XG4gIH0sXG59KTtcblxuZnVuY3Rpb24gcmFuZG9tSW5kZXgoYXJyYXkpIHtcbiAgcmV0dXJuIGFycmF5W01hdGguZmxvb3IoYXJyYXkubGVuZ3RoICogTWF0aC5yYW5kb20oKSldO1xufVxuXG5jb25zdCBjb21wdXRlclBsYWNlQ2F0cyA9IChzdGF0ZSkgPT4gKHtcbmNvbXBQbGFjZUNhdHM6ICgpID0+IHtcbiAgc3RhdGUuY2F0cy5mb3JFYWNoKChjYXQpID0+IHtcbiAgICBjYXQucmFuZG9taXplT3JpZW50YXRpb24oKTtcbiAgICBjb25zdCBwb3RlbnRpYWxQbGFjZW1lbnRzID0gc3RhdGUuZGV0ZXJtaW5lUmVhbEVzdGF0ZShjYXQpO1xuICAgIGNvbnN0IHRhcmdldFNwYWNlID0gcmFuZG9tSW5kZXgocG90ZW50aWFsUGxhY2VtZW50cyk7XG4gICAgY29uc3QgYXJyYXlPZkNvb3JkID0gc3RhdGUuZ2V0Q29vcmRpbmF0ZXMoXG4gICAgICB0YXJnZXRTcGFjZSxcbiAgICAgIGNhdFxuICAgICk7XG4gICAgc3RhdGUucGxhY2VDYXQoYXJyYXlPZkNvb3JkLCBjYXQpO1xuICAgIGNvbnN0IGRvbVNwb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb21wLWNvb3JkPScke3RhcmdldFNwYWNlfSdgKTtcbiAgICBjb25zdCBjYXRJbWcgPSBhZGRDYXRJbWcoY2F0KTtcbiAgICBjYXRJbWcuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgZG9tU3BvdC5hcHBlbmRDaGlsZChjYXRJbWcpO1xuICAgIGNhdC5zZXREb21FbGVtZW50KGNhdEltZyk7XG4gIH0pO1xufVxufSlcblxuZnVuY3Rpb24gY3JlYXRlU3BvdCh4LCB5KSB7XG4gIHJldHVybiB7XG4gICAgY29vcmRpbmF0ZXM6IFt4LCB5XSxcbiAgICBvY2N1cGllZEJ5OiBudWxsLFxuICAgIGF0dGFja2VkOiBmYWxzZSxcbiAgfTtcbn1cblxuY29uc3Qgd2luQ2hlY2sgPSAoc3RhdGUpID0+ICh7XG4gIGNoZWNrRm9yV2luOiAoKSA9PiBzdGF0ZS5jYXRzLmV2ZXJ5KChjYXQpID0+IGNhdC5pc1N1bmsoKSksXG59KTtcblxuZnVuY3Rpb24gY3JlYXRlR2FtZUJvYXJkKCkge1xuICBjb25zdCBnYW1lQm9hcmQgPSB7fTtcbiAgZ2FtZUJvYXJkLmJvYXJkID0ge307XG4gIGdhbWVCb2FyZC5jYXRzID0gY3JlYXRlQ2F0cygpO1xuICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5ICs9IDEpIHtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4ICs9IDEpIHtcbiAgICAgIGdhbWVCb2FyZC5ib2FyZFtgWyR7eH0sJHt5fV1gXSA9IGNyZWF0ZVNwb3QoeCwgeSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgIGdhbWVCb2FyZCxcbiAgICBwbGFjZShnYW1lQm9hcmQpLFxuICAgIHJlY2VpdmVBdHRhY2soZ2FtZUJvYXJkKSxcbiAgICBjb29yZEludmFsaWQoZ2FtZUJvYXJkKSxcbiAgICBnZXRDb29yZChnYW1lQm9hcmQpLFxuICAgIHdpbkNoZWNrKGdhbWVCb2FyZCksXG4gICk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllckdhbWVCb2FyZCgpIHtcbiAgY29uc3QgZ2FtZUJvYXJkID0gY3JlYXRlR2FtZUJvYXJkKCk7XG4gIGdhbWVCb2FyZC5jb21wID0gZmFsc2U7XG4gIGdhbWVCb2FyZC5jYXRzQWRkZWQgPSAwO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihnYW1lQm9hcmQsIHRyYWNrQ2F0c0FkZGVkKGdhbWVCb2FyZCksIGN1cnJlbnRDYXQoZ2FtZUJvYXJkKSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXBHYW1lQm9hcmQoKSB7XG4gIGNvbnN0IGdhbWVCb2FyZCA9IGNyZWF0ZUdhbWVCb2FyZCgpO1xuICBnYW1lQm9hcmQuY29tcCA9IHRydWU7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKGdhbWVCb2FyZCwgY2VsbEFzc2Vzc21lbnQoZ2FtZUJvYXJkKSwgY29tcHV0ZXJQbGFjZUNhdHMoZ2FtZUJvYXJkKSk7O1xufVxuXG5leHBvcnQgeyBjcmVhdGVQbGF5ZXJHYW1lQm9hcmQsIGNyZWF0ZUNvbXBHYW1lQm9hcmQgfTtcbiIsImltcG9ydCB7IHN0YXJ0R2FtZSB9IGZyb20gJy4vZG9tJ1xuXG5jb25zdCBvcGVuaW5nU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9wZW5pbmctc2NyZWVuJyk7XG5jb25zdCBiZWdpbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iZWdpbi1idXR0b24nKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgYmVnaW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgYmVnaW5CdXR0b24uc3R5bGUudHJhbnNpdGlvbiA9ICc1cyc7XG4gICAgYmVnaW5CdXR0b24uc3R5bGUuc2NhbGUgPSA1MDtcbiAgICBvcGVuaW5nU2NyZWVuLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChvcGVuaW5nU2NyZWVuKVxuICAgIH0sIDE1MDApO1xuICB9KVxuICBzdGFydEdhbWUoKTtcbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9mb250L2NvbWZvcnRhYS12YXJpYWJsZWZvbnRfd2dodC13ZWJmb250LndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9mb250L2NvbWZvcnRhYS12YXJpYWJsZWZvbnRfd2dodC13ZWJmb250LndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuL2ltZy9ncnJhc3MuanBlZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcIi4vaW1nL3BleGVscy1waXhtaWtlLTQxMzE5NS5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiY29tZnlcXFwiO1xcbiAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSxcXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxufVxcblxcbjpyb290IHtcXG4gIC0tYmFja2dyb3VuZDogIzI4MmEzNjtcXG4gIC0tYm9hcmQtc2l6ZTogbWluKDYwdncsIDUwMHB4KTtcXG4gIC0tY2VsbC1zaXplOiBjYWxjKHZhcigtLWJvYXJkLXNpemUpIC8gMTApO1xcbiAgLS1sb2dvLWJhbGwtc2l6ZTogNzVweDtcXG4gIC0tc2hyaW5rLXNjYWxlOiAxO1xcbiAgLS1tYXJnaW46IGNhbGMoKDEwMHZ3IC0gdmFyKC0tYm9hcmQtc2l6ZSkpIC8gMik7XFxuICAtLXNocnVuay1ib2FyZDogY2FsYyh2YXIoLS1ib2FyZC1zaXplKSAqIHZhcigtLXNocmluay1zY2FsZSkpO1xcbiAgLyogLS1jYXQtdHJhY2tlci1zaXplOiBjYWxjKHZhcigtLWJvYXJkLXNpemUpICogMC40KTsgKi9cXG4gIC0tY2F0LXRyYWNrZXItcGFkZGluZzogMTBweDtcXG4gIC0tY2F0LXRyYWNrZXItd2lkdGg6IGNhbGMoXFxuICAgIG1pbigoY2FsYyh2YXIoLS1tYXJnaW4pICogMC45NSkpLCAyMDBweCkgLSAodmFyKC0tY2F0LXRyYWNrZXItcGFkZGluZykgKiAyKVxcbiAgKTtcXG4gIC0tY2F0LXRyYWNrZXItaGVpZ2h0OiBjYWxjKHZhcih2YXIoLS1jYXQtdHJhY2tlci13aWR0aCkgKiAoNCAvIDUpKSk7XFxuICAtLWNhdC10cmFja2VyLWNlbGw6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItd2lkdGgpIC8gNSk7XFxuICAtLW1hcmdpbi10b3A6IGNhbGMoKCgxMDB2aCAtIDEwMHB4KSAtIHZhcigtLWJvYXJkLXNpemUpKSAqIDAuNSk7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IGNvbWZ5LCBWZXJkYW5hLCBHZW5ldmEsIFRhaG9tYSwgc2Fucy1zZXJpZjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiAxMDBweCAxZnIgLyAxZnIgMWZyIDFmcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAvKiBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7ICovXFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyArIFwiKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDQwMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4ub3BlbmluZy1zY3JlZW4ge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgei1pbmRleDogMTA7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fICsgXCIpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogMTAwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHRyYW5zaXRpb246IDJzO1xcbn1cXG5cXG4ub3BlbmluZy1zY3JlZW4gcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjgyYTM2YmM7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgcGFkZGluZzogMzBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XFxufVxcblxcbkBrZXlmcmFtZXMgYm91bmNlIHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2xhdGU6IDA7XFxuICB9XFxuICB0byB7XFxuICAgIHRyYW5zbGF0ZTogMHB4IC0xMHB4O1xcbiAgfVxcbn1cXG5cXG4ub3BlbmluZy1zY3JlZW4gYnV0dG9uIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBib3VuY2U7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDJzO1xcbiAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XFxuICBhbmltYXRpb24tZGlyZWN0aW9uOiBhbHRlcm5hdGU7XFxuICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBib3JkZXI6IG5vbmU7XFxuICB3aWR0aDogMTUwcHg7XFxuICBoZWlnaHQ6IDE1MHB4O1xcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGhzbCgzOSwgMTAwJSwgNTglKSwgaHNsKDM5LCAxMDAlLCA1MCUpKTtcXG4gIGN1cnNvcjogZ3JhYjtcXG4gIHRyYW5zaXRpb246IDAuM3M7XFxufVxcblxcbi5vcGVuaW5nLXNjcmVlbiBidXR0b246aG92ZXIsXFxuLnBsYXktYWdhaW4tYnV0dG9uOmhvdmVyIHtcXG4gIGFuaW1hdGlvbjogbm9uZTtcXG4gIHNjYWxlOiAwLjk7XFxufVxcblxcbi5vcGVuaW5nLXNjcmVlbiBidXR0b246YWN0aXZlLFxcbi5wbGF5LWFnYWluLWJ1dHRvbjphY3RpdmUge1xcbiAgc2NhbGU6IDAuODtcXG59XFxuXFxuLnRpdGxlIHtcXG4gIGdyaWQtYXJlYTogMSAvIDEgLyAyIC8gLTE7XFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxuICBoZWlnaHQ6IHZhcigtLWxvZ28tYmFsbC1zaXplKTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmciAxZnI7XFxufVxcblxcbi50aXRsZSAuYmFsbDpudGgtY2hpbGQoNCkge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAyO1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcblxcbi50aXRsZSAuYmFsbDpudGgtY2hpbGQoMykge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMiAvIDIgLyAzO1xcbn1cXG5cXG4udGl0bGUgLmJhbGw6bnRoLWNoaWxkKDIpIHtcXG4gIGdyaWQtYXJlYTogMSAvIDMgLyAyIC8gNDtcXG59XFxuXFxuLnRpdGxlIC5iYWxsOm50aC1jaGlsZCgxKSB7XFxuICBncmlkLWFyZWE6IDEgLyA0IC8gMiAvIDU7XFxufVxcblxcbi5iYWxsIHtcXG4gIGJveC1zaGFkb3c6IDFweCAxcHggOHB4IHJnYigyNTUsIDE0MCwgMCk7XFxuICBtYXJnaW4tbGVmdDogY2FsYyh2YXIoLS1sb2dvLWJhbGwtc2l6ZSkgKiAtMC41KTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgaGVpZ2h0OiB2YXIoLS1sb2dvLWJhbGwtc2l6ZSk7XFxuICB3aWR0aDogdmFyKC0tbG9nby1iYWxsLXNpemUpO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGhzbCgzOSwgMTAwJSwgNTglKSwgaHNsKDM5LCAxMDAlLCA1MCUpKTtcXG59XFxuXFxuLndvcmRzIHtcXG4gIGdyaWQtYXJlYTogMSAvIDEgLyAyIC8gLTE7XFxufVxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIge1xcbiAgZ3JpZC1hcmVhOiAyIC8gMiAvIDMgLyAzO1xcbiAgdHJhbnNpdGlvbjogMC4zcztcXG4gIG1hcmdpbjogYXV0bztcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XFxuICB6LWluZGV4OiAzO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLFxcbi5jb21wLWJvYXJkIHtcXG4gIC8qIGJveC1zaXppbmc6IGJvcmRlci1ib3g7ICovXFxuICB3aWR0aDogdmFyKC0tYm9hcmQtc2l6ZSk7XFxuICBoZWlnaHQ6IHZhcigtLWJvYXJkLXNpemUpO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCgxMCwgYXV0bykgLyByZXBlYXQoMTAsIGF1dG8pO1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyArIFwiKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IHZhcigtLWNlbGwtc2l6ZSkgdmFyKC0tY2VsbC1zaXplKTtcXG59XFxuXFxuLmdyaWQtY2VsbCB7XFxuICB6LWluZGV4OiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJvcmRlcjogMC41cHggc29saWQgcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjE2NCk7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnBsYXllci1ib2FyZCB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uY29tcC1ib2FyZCAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDUwcHggcmdiKDI1NSwgMTIzLCAwKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG4uY29tcC1ib2FyZCAuZ3JpZC1jZWxsOmFjdGl2ZTo6YWZ0ZXIge1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCA1MHB4IDEwcHggcmdiKDI1NSwgMTIzLCAwKTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40NjIpO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmNhdC1vbmUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5ob3Jpem9udGFsXFxuICAucGxheWVyLWJvYXJkLmNhdC1vbmVcXG4gIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA1KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtdHdvIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuaG9yaXpvbnRhbFxcbiAgLnBsYXllci1ib2FyZC5jYXQtdHdvXFxuICAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNCk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuY2F0LXRocmVlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuaG9yaXpvbnRhbFxcbiAgLnBsYXllci1ib2FyZC5jYXQtdGhyZWVcXG4gIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtZm91ciAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlcixcXG4ucGxheWVyLWJvYXJkLmNhdC1maXZlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuaG9yaXpvbnRhbFxcbiAgLnBsYXllci1ib2FyZC5jYXQtZm91clxcbiAgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIsXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuaG9yaXpvbnRhbFxcbiAgLnBsYXllci1ib2FyZC5jYXQtZml2ZVxcbiAgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbmsge1xcbiAgc2NhbGU6IHZhcigtLXNocmluay1zY2FsZSk7XFxuICB0cmFuc2xhdGU6IGNhbGMoKHZhcigtLW1hcmdpbikgKyB2YXIoLS1zaHJ1bmstYm9hcmQpKSAqIC0wLjUpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbms6aG92ZXIge1xcbiAgc2NhbGU6IDAuNzU7XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmNhdC1pbWcge1xcbiAgdHJhbnNpdGlvbjogMC4zcztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogM3B4O1xcbiAgcm90YXRlOiAtOTBkZWc7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4uY2F0MSB7XFxuICByaWdodDogLTEwcHg7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSg1LjUsIDQpO1xcbn1cXG5cXG4uY2F0MS5ob3Jpem9udGFsLWNhdCB7XFxuICB0b3A6IDVweDtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA1KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMy44LCAyLjcpO1xcbn1cXG5cXG4uY2F0MiB7XFxuICB0b3A6IDVweDtcXG4gIGxlZnQ6IC01cHg7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDQpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSg0LjMsIDIuNSk7XFxufVxcblxcbi5jYXQyLmhvcml6b250YWwtY2F0IHtcXG4gIHRvcDogLTNweDtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi45LCAxLjcpO1xcbn1cXG5cXG4uY2F0MyB7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMy41LCAyLjUpO1xcbn1cXG5cXG4uY2F0My5ob3Jpem9udGFsLWNhdCB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMyk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIuNSwgMS44KTtcXG59XFxuXFxuLmNhdDQge1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIsIDIpO1xcbn1cXG5cXG4uY2F0NC5ob3Jpem9udGFsLWNhdCB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuNSk7XFxufVxcblxcbi5jYXQ1IHtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLCAxLjUpO1xcbn1cXG5cXG4uY2F0NS5ob3Jpem9udGFsLWNhdCB7XFxuICB3aWR0aDogY2FsYygodmFyKC0tY2VsbC1zaXplKSAqIDIpKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41LCAxLjEpO1xcbn1cXG5cXG4uaG9yaXpvbnRhbC1jYXQge1xcbiAgdG9wOiAwcHg7XFxuICBsZWZ0OiAwcHg7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICByb3RhdGU6IDBkZWc7XFxufVxcblxcbi5ncmlkLWNlbGwuYXR0YWNrZWQ6OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCAxNXB4IG9yYW5nZTtcXG59XFxuXFxuLmdyaWQtY2VsbC5hdHRhY2tlZDo6YmVmb3JlIHtcXG4gIHotaW5kZXg6IDE7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLyAzKTtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpIC8gMyk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMTY2LCAwLCAwLjY5OCk7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBpbnNldDogMDtcXG4gIG1hcmdpbjogYXV0bztcXG59XFxuXFxuLmdyaWQtY2VsbC5hdHRhY2tlZC5vY2N1cGllZDo6YmVmb3JlIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLyAxLjUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLyAxLjUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xcbiAgdHJhbnNpdGlvbjogMXM7XFxufVxcblxcbi5ncmlkLWNlbGwuYXR0YWNrZWQub2NjdXBpZWQuY29uc3VtZTo6YmVmb3JlIHtcXG4gIHNjYWxlOiAwO1xcbn1cXG5cXG4ucm90YXRlLWJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMzksIDEwMCUsIDUwJSk7XFxuICBhcHBlYXJhbmNlOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgd2lkdGg6IDMwcHg7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBtYXJnaW46IDVweDtcXG59XFxuXFxuLnJvdGF0ZS1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDM5LCAxMDAlLCA2MCUpO1xcbn1cXG5cXG4ucm90YXRlLWJ1dHRvbjphY3RpdmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDM5LCAxMDAlLCA3MCUpO1xcbn1cXG5cXG4uY29tcC1ib2FyZC1jb250YWluZXIge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGdyaWQtYXJlYTogMiAvIDIgLyAzIC8gMztcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgaW5zZXQ6IDA7XFxuICBtYXJnaW46IGF1dG87XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgb3BhY2l0eTogMDtcXG59XFxuXFxuLmNhdC10cmFja2VyLWNvbnRhaW5lciB7XFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNDA1KTtcXG4gIHBhZGRpbmc6IHZhcigtLWNhdC10cmFja2VyLXBhZGRpbmcpO1xcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgbWFyZ2luOiB2YXIoLS1tYXJnaW4tdG9wKSAxMHB4O1xcbiAgZ3JpZC1hcmVhOiAyIC8gMyAvIDMgLyA0O1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCg0LCBhdXRvKSAvIHJlcGVhdCg1LCBhdXRvKTtcXG4gIHdpZHRoOiB2YXIoLS1jYXQtdHJhY2tlci13aWR0aCk7XFxuICBoZWlnaHQ6IHZhcigtLWNhdC10cmFja2VyLWhlaWdodCk7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuLmNhdC10cmFja2VyIGRpdiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYm9yZGVyOiAwLjVweCBzb2xpZCByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuNSk7XFxuICBoZWlnaHQ6IHZhcigtLWNhdC10cmFja2VyLWNlbGwpO1xcbiAgd2lkdGg6IHZhcigtLWNhdC10cmFja2VyLWNlbGwpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgZGl2OjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcXG4gIHdpZHRoOiA0MCU7XFxuICBoZWlnaHQ6IDQwJTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHotaW5kZXg6IDM7XFxuICBpbnNldDogMDtcXG4gIG1hcmdpbjogYXV0bztcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2l0aW9uOiAwLjVzO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgZGl2OjpiZWZvcmUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHotaW5kZXg6IDI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwMSwgMjAxLCAyMDEsIDAuNTQpO1xcbiAgb3BhY2l0eTogMDtcXG4gIGxlZnQ6IDA7XFxufVxcblxcbi5jYXQtdHJhY2tlciBkaXYuY2F0LXRyYWNrZXItaGl0OjphZnRlcixcXG4uY2F0LXRyYWNrZXIgZGl2LmNhdC10cmFja2VyLWhpdDo6YmVmb3JlIHtcXG4gIG9wYWNpdHk6IDE7XFxufVxcblxcbi5jYXQtdHJhY2tlciBkaXYgaW1nIHtcXG4gIGhlaWdodDogdmFyKC0tY2F0LXRyYWNrZXItY2VsbCk7XFxufVxcblxcbi5jYXQtdHJhY2tlci1maXJzdCBpbWcge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItY2VsbCkgKiA1KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMy40LCAyLjcpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXItc2Vjb25kIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDQpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLjksIDEuNyk7XFxufVxcblxcbi5jYXQtdHJhY2tlci10aGlyZCBpbWcge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItY2VsbCkgKiAzKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi41LCAxLjgpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXItZm91cnRoIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXItZmlmdGggaW1nIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLWNlbGwpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuNSwgMS4xKTtcXG59XFxuXFxuLmVuZC1nYW1lIHtcXG4gIHotaW5kZXg6IDM7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI4MmEzNmNlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmb250LXNpemU6IDJyZW07XFxufVxcblxcbi5wbGF5LWFnYWluLWJ1dHRvbiB7XFxuICBhcHBlYXJhbmNlOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuICB3aWR0aDogMTAwcHg7XFxuICBoZWlnaHQ6IDEwMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGhzbCgzOSwgMTAwJSwgNTglKSwgaHNsKDM5LCAxMDAlLCA1MCUpKTtcXG4gIGN1cnNvcjogZ3JhYjtcXG4gIHRyYW5zaXRpb246IDAuM3M7XFxufVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTAwcHgpIHtcXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA4NTBweCkge1xcbiAgOnJvb3Qge1xcbiAgICAtLXNjYWxlLXNpemU6IDAuNDtcXG4gICAgLS1ib2FyZC1zaXplOiBtaW4oNjB2aCwgOTB2dyk7XFxuICAgIC0tbG9nby1iYWxsLXNpemU6IDUwcHg7XFxuICAgIC0tc2Vjb25kLXJvdzogY2FsYygoOTV2aCAtIDUwcHgpICogKDEgLyAoMS4zICsgMSkpKTtcXG4gICAgLS10aGlyZC1yb3c6IGNhbGMoKDk1dmggLSA1MHB4KSAqICgxLjMgLyAoMS4zICsgMSkpKTtcXG4gICAgLS1taW5pLWJvYXJkLXNpemU6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiB2YXIoLS1zY2FsZS1zaXplKSk7XFxuICAgIC0tY2F0LXRyYWNrZXItd2lkdGg6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiAwLjQpO1xcbiAgfVxcblxcbiAgYm9keSB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGU6IDV2aCAxZnIgMS4zZnIgNTBweC8gNTB2dyA1MHZ3O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuXFxuICAudGl0bGUge1xcbiAgICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDM7XFxuICAgIG1hcmdpbi10b3A6IDA7XFxuICB9XFxuXFxuICBoMSB7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gIH1cXG5cXG4gIC5wbGF5ZXItYm9hcmQtY29udGFpbmVyIHtcXG4gICAgZ3JpZC1hcmVhOiAzIC8gMSAvIDQgLyAzO1xcbiAgfVxcblxcbiAgLnBsYXllci1ib2FyZC1jb250YWluZXIuc2hyaW5rIHtcXG4gICAgc2NhbGU6IHZhcigtLXNjYWxlLXNpemUpO1xcbiAgICB0cmFuc2xhdGU6IDBweFxcbiAgICAgIGNhbGMoXFxuICAgICAgICAoXFxuICAgICAgICAgICAgdmFyKC0tdGhpcmQtcm93KSAtIHZhcigtLWJvYXJkLXNpemUpICsgdmFyKC0tc2Vjb25kLXJvdykgK1xcbiAgICAgICAgICAgICAgdmFyKC0tbWluaS1ib2FyZC1zaXplKVxcbiAgICAgICAgICApICogLTAuNVxcbiAgICAgICk7XFxuICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgfVxcblxcbiAgLnBsYXllci1ib2FyZC1jb250YWluZXIuc2hyaW5rOmhvdmVyIHtcXG4gICAgc2NhbGU6IDAuNzU7XFxuICB9XFxuXFxuICAuY29tcC1ib2FyZC1jb250YWluZXIge1xcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGdyaWQtYXJlYTogMyAvIDEgLyA0IC8gMztcXG4gIH1cXG5cXG4gIC5jYXQtdHJhY2tlci1jb250YWluZXIge1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIGdyaWQtYXJlYTogMiAvIDIgLyAzIC8gMztcXG4gIH1cXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0NTBweCkge1xcbiAgOnJvb3Qge1xcbiAgICAtLXNjYWxlLXNpemU6IDAuNTtcXG4gIH1cXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLG9CQUFvQjtFQUNwQjsw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bkQsb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCxrREFBa0Q7RUFDcEQ7O0VBRUE7SUFDRSxhQUFhO0lBQ2IsNENBQTRDO0lBQzVDLG1CQUFtQjtJQUNuQixxQkFBcUI7RUFDdkI7O0VBRUE7SUFDRSx3QkFBd0I7SUFDeEIsYUFBYTtFQUNmOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLHdCQUF3QjtFQUMxQjs7RUFFQTtJQUNFLHdCQUF3QjtJQUN4Qjs7Ozs7O09BTUc7SUFDSCxvQkFBb0I7RUFDdEI7O0VBRUE7SUFDRSxXQUFXO0VBQ2I7O0VBRUE7SUFDRSxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLGtCQUFrQjtJQUNsQix3QkFBd0I7RUFDMUI7O0VBRUE7SUFDRSxZQUFZO0lBQ1osd0JBQXdCO0VBQzFCO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLGlCQUFpQjtFQUNuQjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJjb21meVxcXCI7XFxuICBzcmM6IHVybChcXFwiLi9mb250L2NvbWZvcnRhYS12YXJpYWJsZWZvbnRfd2dodC13ZWJmb250LndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLFxcbiAgICB1cmwoXFxcIi4vZm9udC9jb21mb3J0YWEtdmFyaWFibGVmb250X3dnaHQtd2ViZm9udC53b2ZmXFxcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5cXG46cm9vdCB7XFxuICAtLWJhY2tncm91bmQ6ICMyODJhMzY7XFxuICAtLWJvYXJkLXNpemU6IG1pbig2MHZ3LCA1MDBweCk7XFxuICAtLWNlbGwtc2l6ZTogY2FsYyh2YXIoLS1ib2FyZC1zaXplKSAvIDEwKTtcXG4gIC0tbG9nby1iYWxsLXNpemU6IDc1cHg7XFxuICAtLXNocmluay1zY2FsZTogMTtcXG4gIC0tbWFyZ2luOiBjYWxjKCgxMDB2dyAtIHZhcigtLWJvYXJkLXNpemUpKSAvIDIpO1xcbiAgLS1zaHJ1bmstYm9hcmQ6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiB2YXIoLS1zaHJpbmstc2NhbGUpKTtcXG4gIC8qIC0tY2F0LXRyYWNrZXItc2l6ZTogY2FsYyh2YXIoLS1ib2FyZC1zaXplKSAqIDAuNCk7ICovXFxuICAtLWNhdC10cmFja2VyLXBhZGRpbmc6IDEwcHg7XFxuICAtLWNhdC10cmFja2VyLXdpZHRoOiBjYWxjKFxcbiAgICBtaW4oKGNhbGModmFyKC0tbWFyZ2luKSAqIDAuOTUpKSwgMjAwcHgpIC0gKHZhcigtLWNhdC10cmFja2VyLXBhZGRpbmcpICogMilcXG4gICk7XFxuICAtLWNhdC10cmFja2VyLWhlaWdodDogY2FsYyh2YXIodmFyKC0tY2F0LXRyYWNrZXItd2lkdGgpICogKDQgLyA1KSkpO1xcbiAgLS1jYXQtdHJhY2tlci1jZWxsOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLXdpZHRoKSAvIDUpO1xcbiAgLS1tYXJnaW4tdG9wOiBjYWxjKCgoMTAwdmggLSAxMDBweCkgLSB2YXIoLS1ib2FyZC1zaXplKSkgKiAwLjUpO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBjb21meSwgVmVyZGFuYSwgR2VuZXZhLCBUYWhvbWEsIHNhbnMtc2VyaWY7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogMTAwcHggMWZyIC8gMWZyIDFmciAxZnI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLyoganVzdGlmeS1pdGVtczogY2VudGVyOyAqL1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGJhY2tncm91bmQ6IHVybChcXFwiLi9pbWcvZ3JyYXNzLmpwZWdcXFwiKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDQwMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4ub3BlbmluZy1zY3JlZW4ge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgei1pbmRleDogMTA7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXFxcIi4vaW1nL2dycmFzcy5qcGVnXFxcIik7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1zaXplOiAxMDBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgdHJhbnNpdGlvbjogMnM7XFxufVxcblxcbi5vcGVuaW5nLXNjcmVlbiBwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyODJhMzZiYztcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICB3aWR0aDogMzAwcHg7XFxuICBwYWRkaW5nOiAzMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcXG59XFxuXFxuQGtleWZyYW1lcyBib3VuY2Uge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zbGF0ZTogMDtcXG4gIH1cXG4gIHRvIHtcXG4gICAgdHJhbnNsYXRlOiAwcHggLTEwcHg7XFxuICB9XFxufVxcblxcbi5vcGVuaW5nLXNjcmVlbiBidXR0b24ge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGJvdW5jZTtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMnM7XFxuICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcXG4gIGFuaW1hdGlvbi1kaXJlY3Rpb246IGFsdGVybmF0ZTtcXG4gIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHdpZHRoOiAxNTBweDtcXG4gIGhlaWdodDogMTUwcHg7XFxuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoaHNsKDM5LCAxMDAlLCA1OCUpLCBoc2woMzksIDEwMCUsIDUwJSkpO1xcbiAgY3Vyc29yOiBncmFiO1xcbiAgdHJhbnNpdGlvbjogMC4zcztcXG59XFxuXFxuLm9wZW5pbmctc2NyZWVuIGJ1dHRvbjpob3ZlcixcXG4ucGxheS1hZ2Fpbi1idXR0b246aG92ZXIge1xcbiAgYW5pbWF0aW9uOiBub25lO1xcbiAgc2NhbGU6IDAuOTtcXG59XFxuXFxuLm9wZW5pbmctc2NyZWVuIGJ1dHRvbjphY3RpdmUsXFxuLnBsYXktYWdhaW4tYnV0dG9uOmFjdGl2ZSB7XFxuICBzY2FsZTogMC44O1xcbn1cXG5cXG4udGl0bGUge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAtMTtcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIGhlaWdodDogdmFyKC0tbG9nby1iYWxsLXNpemUpO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyIDFmcjtcXG59XFxuXFxuLnRpdGxlIC5iYWxsOm50aC1jaGlsZCg0KSB7XFxuICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDI7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuXFxuLnRpdGxlIC5iYWxsOm50aC1jaGlsZCgzKSB7XFxuICBncmlkLWFyZWE6IDEgLyAyIC8gMiAvIDM7XFxufVxcblxcbi50aXRsZSAuYmFsbDpudGgtY2hpbGQoMikge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMyAvIDIgLyA0O1xcbn1cXG5cXG4udGl0bGUgLmJhbGw6bnRoLWNoaWxkKDEpIHtcXG4gIGdyaWQtYXJlYTogMSAvIDQgLyAyIC8gNTtcXG59XFxuXFxuLmJhbGwge1xcbiAgYm94LXNoYWRvdzogMXB4IDFweCA4cHggcmdiKDI1NSwgMTQwLCAwKTtcXG4gIG1hcmdpbi1sZWZ0OiBjYWxjKHZhcigtLWxvZ28tYmFsbC1zaXplKSAqIC0wLjUpO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBoZWlnaHQ6IHZhcigtLWxvZ28tYmFsbC1zaXplKTtcXG4gIHdpZHRoOiB2YXIoLS1sb2dvLWJhbGwtc2l6ZSk7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoaHNsKDM5LCAxMDAlLCA1OCUpLCBoc2woMzksIDEwMCUsIDUwJSkpO1xcbn1cXG5cXG4ud29yZHMge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAtMTtcXG59XFxuaDEge1xcbiAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lciB7XFxuICBncmlkLWFyZWE6IDIgLyAyIC8gMyAvIDM7XFxuICB0cmFuc2l0aW9uOiAwLjNzO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgd2lkdGg6IG1pbi1jb250ZW50O1xcbiAgaGVpZ2h0OiBtaW4tY29udGVudDtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcXG4gIHotaW5kZXg6IDM7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQsXFxuLmNvbXAtYm9hcmQge1xcbiAgLyogYm94LXNpemluZzogYm9yZGVyLWJveDsgKi9cXG4gIHdpZHRoOiB2YXIoLS1ib2FyZC1zaXplKTtcXG4gIGhlaWdodDogdmFyKC0tYm9hcmQtc2l6ZSk7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDEwLCBhdXRvKSAvIHJlcGVhdCgxMCwgYXV0byk7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXFxcIi4vaW1nL3BleGVscy1waXhtaWtlLTQxMzE5NS5qcGdcXFwiKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IHZhcigtLWNlbGwtc2l6ZSkgdmFyKC0tY2VsbC1zaXplKTtcXG59XFxuXFxuLmdyaWQtY2VsbCB7XFxuICB6LWluZGV4OiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJvcmRlcjogMC41cHggc29saWQgcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjE2NCk7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnBsYXllci1ib2FyZCB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uY29tcC1ib2FyZCAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDUwcHggcmdiKDI1NSwgMTIzLCAwKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG4uY29tcC1ib2FyZCAuZ3JpZC1jZWxsOmFjdGl2ZTo6YWZ0ZXIge1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCA1MHB4IDEwcHggcmdiKDI1NSwgMTIzLCAwKTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40NjIpO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmNhdC1vbmUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5ob3Jpem9udGFsXFxuICAucGxheWVyLWJvYXJkLmNhdC1vbmVcXG4gIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA1KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtdHdvIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuaG9yaXpvbnRhbFxcbiAgLnBsYXllci1ib2FyZC5jYXQtdHdvXFxuICAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNCk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuY2F0LXRocmVlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuaG9yaXpvbnRhbFxcbiAgLnBsYXllci1ib2FyZC5jYXQtdGhyZWVcXG4gIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtZm91ciAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlcixcXG4ucGxheWVyLWJvYXJkLmNhdC1maXZlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuaG9yaXpvbnRhbFxcbiAgLnBsYXllci1ib2FyZC5jYXQtZm91clxcbiAgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIsXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuaG9yaXpvbnRhbFxcbiAgLnBsYXllci1ib2FyZC5jYXQtZml2ZVxcbiAgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbmsge1xcbiAgc2NhbGU6IHZhcigtLXNocmluay1zY2FsZSk7XFxuICB0cmFuc2xhdGU6IGNhbGMoKHZhcigtLW1hcmdpbikgKyB2YXIoLS1zaHJ1bmstYm9hcmQpKSAqIC0wLjUpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbms6aG92ZXIge1xcbiAgc2NhbGU6IDAuNzU7XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmNhdC1pbWcge1xcbiAgdHJhbnNpdGlvbjogMC4zcztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogM3B4O1xcbiAgcm90YXRlOiAtOTBkZWc7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4uY2F0MSB7XFxuICByaWdodDogLTEwcHg7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSg1LjUsIDQpO1xcbn1cXG5cXG4uY2F0MS5ob3Jpem9udGFsLWNhdCB7XFxuICB0b3A6IDVweDtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA1KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMy44LCAyLjcpO1xcbn1cXG5cXG4uY2F0MiB7XFxuICB0b3A6IDVweDtcXG4gIGxlZnQ6IC01cHg7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDQpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSg0LjMsIDIuNSk7XFxufVxcblxcbi5jYXQyLmhvcml6b250YWwtY2F0IHtcXG4gIHRvcDogLTNweDtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi45LCAxLjcpO1xcbn1cXG5cXG4uY2F0MyB7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMy41LCAyLjUpO1xcbn1cXG5cXG4uY2F0My5ob3Jpem9udGFsLWNhdCB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMyk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIuNSwgMS44KTtcXG59XFxuXFxuLmNhdDQge1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIsIDIpO1xcbn1cXG5cXG4uY2F0NC5ob3Jpem9udGFsLWNhdCB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuNSk7XFxufVxcblxcbi5jYXQ1IHtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLCAxLjUpO1xcbn1cXG5cXG4uY2F0NS5ob3Jpem9udGFsLWNhdCB7XFxuICB3aWR0aDogY2FsYygodmFyKC0tY2VsbC1zaXplKSAqIDIpKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41LCAxLjEpO1xcbn1cXG5cXG4uaG9yaXpvbnRhbC1jYXQge1xcbiAgdG9wOiAwcHg7XFxuICBsZWZ0OiAwcHg7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICByb3RhdGU6IDBkZWc7XFxufVxcblxcbi5ncmlkLWNlbGwuYXR0YWNrZWQ6OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCAxNXB4IG9yYW5nZTtcXG59XFxuXFxuLmdyaWQtY2VsbC5hdHRhY2tlZDo6YmVmb3JlIHtcXG4gIHotaW5kZXg6IDE7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLyAzKTtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpIC8gMyk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMTY2LCAwLCAwLjY5OCk7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBpbnNldDogMDtcXG4gIG1hcmdpbjogYXV0bztcXG59XFxuXFxuLmdyaWQtY2VsbC5hdHRhY2tlZC5vY2N1cGllZDo6YmVmb3JlIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLyAxLjUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLyAxLjUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xcbiAgdHJhbnNpdGlvbjogMXM7XFxufVxcblxcbi5ncmlkLWNlbGwuYXR0YWNrZWQub2NjdXBpZWQuY29uc3VtZTo6YmVmb3JlIHtcXG4gIHNjYWxlOiAwO1xcbn1cXG5cXG4ucm90YXRlLWJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMzksIDEwMCUsIDUwJSk7XFxuICBhcHBlYXJhbmNlOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgd2lkdGg6IDMwcHg7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBtYXJnaW46IDVweDtcXG59XFxuXFxuLnJvdGF0ZS1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDM5LCAxMDAlLCA2MCUpO1xcbn1cXG5cXG4ucm90YXRlLWJ1dHRvbjphY3RpdmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDM5LCAxMDAlLCA3MCUpO1xcbn1cXG5cXG4uY29tcC1ib2FyZC1jb250YWluZXIge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGdyaWQtYXJlYTogMiAvIDIgLyAzIC8gMztcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgaW5zZXQ6IDA7XFxuICBtYXJnaW46IGF1dG87XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgb3BhY2l0eTogMDtcXG59XFxuXFxuLmNhdC10cmFja2VyLWNvbnRhaW5lciB7XFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNDA1KTtcXG4gIHBhZGRpbmc6IHZhcigtLWNhdC10cmFja2VyLXBhZGRpbmcpO1xcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgbWFyZ2luOiB2YXIoLS1tYXJnaW4tdG9wKSAxMHB4O1xcbiAgZ3JpZC1hcmVhOiAyIC8gMyAvIDMgLyA0O1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCg0LCBhdXRvKSAvIHJlcGVhdCg1LCBhdXRvKTtcXG4gIHdpZHRoOiB2YXIoLS1jYXQtdHJhY2tlci13aWR0aCk7XFxuICBoZWlnaHQ6IHZhcigtLWNhdC10cmFja2VyLWhlaWdodCk7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuLmNhdC10cmFja2VyIGRpdiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYm9yZGVyOiAwLjVweCBzb2xpZCByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuNSk7XFxuICBoZWlnaHQ6IHZhcigtLWNhdC10cmFja2VyLWNlbGwpO1xcbiAgd2lkdGg6IHZhcigtLWNhdC10cmFja2VyLWNlbGwpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgZGl2OjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcXG4gIHdpZHRoOiA0MCU7XFxuICBoZWlnaHQ6IDQwJTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHotaW5kZXg6IDM7XFxuICBpbnNldDogMDtcXG4gIG1hcmdpbjogYXV0bztcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2l0aW9uOiAwLjVzO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgZGl2OjpiZWZvcmUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHotaW5kZXg6IDI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwMSwgMjAxLCAyMDEsIDAuNTQpO1xcbiAgb3BhY2l0eTogMDtcXG4gIGxlZnQ6IDA7XFxufVxcblxcbi5jYXQtdHJhY2tlciBkaXYuY2F0LXRyYWNrZXItaGl0OjphZnRlcixcXG4uY2F0LXRyYWNrZXIgZGl2LmNhdC10cmFja2VyLWhpdDo6YmVmb3JlIHtcXG4gIG9wYWNpdHk6IDE7XFxufVxcblxcbi5jYXQtdHJhY2tlciBkaXYgaW1nIHtcXG4gIGhlaWdodDogdmFyKC0tY2F0LXRyYWNrZXItY2VsbCk7XFxufVxcblxcbi5jYXQtdHJhY2tlci1maXJzdCBpbWcge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItY2VsbCkgKiA1KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMy40LCAyLjcpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXItc2Vjb25kIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDQpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLjksIDEuNyk7XFxufVxcblxcbi5jYXQtdHJhY2tlci10aGlyZCBpbWcge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItY2VsbCkgKiAzKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi41LCAxLjgpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXItZm91cnRoIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXItZmlmdGggaW1nIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLWNlbGwpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuNSwgMS4xKTtcXG59XFxuXFxuLmVuZC1nYW1lIHtcXG4gIHotaW5kZXg6IDM7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI4MmEzNmNlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmb250LXNpemU6IDJyZW07XFxufVxcblxcbi5wbGF5LWFnYWluLWJ1dHRvbiB7XFxuICBhcHBlYXJhbmNlOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuICB3aWR0aDogMTAwcHg7XFxuICBoZWlnaHQ6IDEwMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGhzbCgzOSwgMTAwJSwgNTglKSwgaHNsKDM5LCAxMDAlLCA1MCUpKTtcXG4gIGN1cnNvcjogZ3JhYjtcXG4gIHRyYW5zaXRpb246IDAuM3M7XFxufVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTAwcHgpIHtcXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA4NTBweCkge1xcbiAgOnJvb3Qge1xcbiAgICAtLXNjYWxlLXNpemU6IDAuNDtcXG4gICAgLS1ib2FyZC1zaXplOiBtaW4oNjB2aCwgOTB2dyk7XFxuICAgIC0tbG9nby1iYWxsLXNpemU6IDUwcHg7XFxuICAgIC0tc2Vjb25kLXJvdzogY2FsYygoOTV2aCAtIDUwcHgpICogKDEgLyAoMS4zICsgMSkpKTtcXG4gICAgLS10aGlyZC1yb3c6IGNhbGMoKDk1dmggLSA1MHB4KSAqICgxLjMgLyAoMS4zICsgMSkpKTtcXG4gICAgLS1taW5pLWJvYXJkLXNpemU6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiB2YXIoLS1zY2FsZS1zaXplKSk7XFxuICAgIC0tY2F0LXRyYWNrZXItd2lkdGg6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiAwLjQpO1xcbiAgfVxcblxcbiAgYm9keSB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGU6IDV2aCAxZnIgMS4zZnIgNTBweC8gNTB2dyA1MHZ3O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuXFxuICAudGl0bGUge1xcbiAgICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDM7XFxuICAgIG1hcmdpbi10b3A6IDA7XFxuICB9XFxuXFxuICBoMSB7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gIH1cXG5cXG4gIC5wbGF5ZXItYm9hcmQtY29udGFpbmVyIHtcXG4gICAgZ3JpZC1hcmVhOiAzIC8gMSAvIDQgLyAzO1xcbiAgfVxcblxcbiAgLnBsYXllci1ib2FyZC1jb250YWluZXIuc2hyaW5rIHtcXG4gICAgc2NhbGU6IHZhcigtLXNjYWxlLXNpemUpO1xcbiAgICB0cmFuc2xhdGU6IDBweFxcbiAgICAgIGNhbGMoXFxuICAgICAgICAoXFxuICAgICAgICAgICAgdmFyKC0tdGhpcmQtcm93KSAtIHZhcigtLWJvYXJkLXNpemUpICsgdmFyKC0tc2Vjb25kLXJvdykgK1xcbiAgICAgICAgICAgICAgdmFyKC0tbWluaS1ib2FyZC1zaXplKVxcbiAgICAgICAgICApICogLTAuNVxcbiAgICAgICk7XFxuICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgfVxcblxcbiAgLnBsYXllci1ib2FyZC1jb250YWluZXIuc2hyaW5rOmhvdmVyIHtcXG4gICAgc2NhbGU6IDAuNzU7XFxuICB9XFxuXFxuICAuY29tcC1ib2FyZC1jb250YWluZXIge1xcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGdyaWQtYXJlYTogMyAvIDEgLyA0IC8gMztcXG4gIH1cXG5cXG4gIC5jYXQtdHJhY2tlci1jb250YWluZXIge1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIGdyaWQtYXJlYTogMiAvIDIgLyAzIC8gMztcXG4gIH1cXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0NTBweCkge1xcbiAgOnJvb3Qge1xcbiAgICAtLXNjYWxlLXNpemU6IDAuNTtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTsgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG5cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBpbml0IGZyb20gJy4vaW5pdCc7XG5cbmluaXQoKTtcblxuXG4iXSwibmFtZXMiOlsiZGV0ZXJtaW5lT3JpZW50YXRpb24iLCJhcnJheSIsImFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMiLCJzdGFydCIsImJvYXJkSUQiLCJjYXQiLCJheGlzIiwiZGlyZWN0aW9uIiwiYWxsRGlyIiwieCIsInkiLCJ1cCIsInJpZ2h0IiwiZG93biIsImxlZnQiLCJzb21lIiwibnVtIiwib3BwQm9hcmRDZWxsIiwiYm9hcmQiLCJhdHRhY2tlZCIsIm9jY3VwaWVkQnkiLCJmaWx0ZXIiLCJvcHQiLCJjb21wRmlyZVNob3QiLCJvcHBvbmVudEJvYXJkIiwid291bmRlZFRhcmdldHMiLCJwb3NzaWJsZUhpdHMiLCJjYXRzIiwiZm9yRWFjaCIsImhpdHMiLCJpc1N1bmsiLCJwdXNoIiwibGVuZ3RoIiwicHJpbWFyeVRhcmdldCIsImNvb3JkSGl0Iiwib3JpZW50YXRpb24iLCJPYmplY3QiLCJrZXlzIiwiY2VsbCIsImNvb3JkaW5hdGVzIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiQ2F0IiwiY29uc3RydWN0b3IiLCJ0eXBlIiwiaGl0IiwiY29vcmQiLCJyb3RhdGUiLCJyYW5kb21pemVPcmllbnRhdGlvbiIsInNldERvbUVsZW1lbnQiLCJ0YXJnZXQiLCJkb21FbGVtZW50IiwiY3JlYXRlQ2F0cyIsImNhdDEiLCJjYXQyIiwiY2F0MyIsImNhdDQiLCJjYXQ1IiwiY3JlYXRlQ2F0SW1hZ2UiLCJzb3VyY2UiLCJjYXRJbWciLCJJbWFnZSIsInNyYyIsImFkZENhdEltZyIsImN1cnJlbnRDYXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDYXRJbWFnZXMiLCJmaXJzdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInNlY29uZCIsInRoaXJkIiwiZm91cnRoIiwiZmlmdGgiLCJhcHBlbmQiLCJyb3RhdGVJY29uIiwiY3JlYXRlUGxheWVyR2FtZUJvYXJkIiwiY3JlYXRlQ29tcEdhbWVCb2FyZCIsInBsYXllckJvYXJkQ29udGFpbmVyIiwiY29tcEJvYXJkQ29udGFpbmVyIiwiY2F0VHJhY2tlckNvbnRhaW5lciIsImN1cnJlbnRQbGF5ZXJCb2FyZCIsInJvdGF0ZUNhdCIsImdldEN1cnJlbnRDYXQiLCJ0b2dnbGUiLCJyb3RhdGVCdXR0b24iLCJjcmVhdGVFbGVtZW50Iiwicm90YXRlSW1nIiwiYXBwZW5kQ2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwiY3JlYXRlQ2F0VHJhY2tlciIsImNhdFRyYWNrZXJEaXYiLCJpZCIsImRhdGFzZXQiLCJ1cGRhdGVDYXRUcmFja2VyIiwiZG9tVGFyZ2V0IiwiYXBwbHlIaXRJbWFnZSIsImNvbXAiLCJzaHJpbmtTaXplIiwib3JpZ2luYWxTaXplIiwib2Zmc2V0V2lkdGgiLCJ3aW5kb3dXaWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJzZXRTaHJpbmtTY2FsZSIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJob3ZlckVmZmVjdCIsInByZWZpeCIsInN1ZmZpeCIsInN0YXJ0R2FtZSIsInBsYXllckJvYXJkIiwiY29tcEJvYXJkIiwicG9wdWxhdGVEaXNwbGF5IiwicmVtb3ZlQ2hpbGRyZW4iLCJlbGVtZW50IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiY2xlYXJQYWdlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbW92ZSIsInZpc2liaWxpdHkiLCJlbmRHYW1lU2NyZWVuIiwibWVzc2FnZSIsInNjcmVlbiIsImVuZE1lc3NhZ2UiLCJ0ZXh0Q29udGVudCIsInBsYXlBZ2FpbkJ1dHRvbiIsImJvZHkiLCJjb21wUmV0YWxpYXRpb24iLCJ0YWtlQXR0YWNrIiwiZGF0YUlEIiwiZG9tQ2VsbCIsImNoZWNrRm9yV2luIiwiY3JlYXRlQ29tcEdhbWVCb2FyZERpc3BsYXkiLCJib2FyZERhdGEiLCJvcHBCb2FyZERhdGEiLCJjb21wQm9hcmREaXNwbGF5IiwidmFsdWVzIiwiY29tcENvb3JkIiwic3BvdCIsImRvbUVsIiwic2V0VGltZW91dCIsImNyZWF0ZVBsYXllckdhbWVCb2FyZERpc3BsYXkiLCJwbGF5ZXJCb2FyZERhdGEiLCJjb21wQm9hcmREYXRhIiwicGxheWVyQm9hcmREaXNwbGF5IiwiY29vcmRBcnJheSIsImdldENvb3JkaW5hdGVzIiwicGxhY2VDYXQiLCJjYXRBZGRlZCIsImNsYXNzTmFtZSIsImRpc3BsYXkiLCJjb21wUGxhY2VDYXRzIiwiY2F0VHJhY2tlciIsImUiLCJrZXkiLCJwbGFjZSIsInN0YXRlIiwiY29vcmRpbmF0ZSIsInJlY2VpdmVBdHRhY2siLCJjb29yZEludmFsaWQiLCJjb29yZGluYXRlc0FyZUludmFsaWQiLCJmbGF0IiwiaXRlbSIsImdldENvb3JkIiwiaSIsInRyYWNrQ2F0c0FkZGVkIiwiY2F0c0FkZGVkIiwiY2VsbEFzc2Vzc21lbnQiLCJkZXRlcm1pbmVSZWFsRXN0YXRlIiwibGltaXQiLCJoIiwidiIsImFycmF5TWludXNPdmVybGFwIiwicmFuZG9tSW5kZXgiLCJjb21wdXRlclBsYWNlQ2F0cyIsInBvdGVudGlhbFBsYWNlbWVudHMiLCJ0YXJnZXRTcGFjZSIsImFycmF5T2ZDb29yZCIsImRvbVNwb3QiLCJjcmVhdGVTcG90Iiwid2luQ2hlY2siLCJldmVyeSIsImNyZWF0ZUdhbWVCb2FyZCIsImdhbWVCb2FyZCIsImFzc2lnbiIsIm9wZW5pbmdTY3JlZW4iLCJiZWdpbkJ1dHRvbiIsImluaXQiLCJ0cmFuc2l0aW9uIiwic2NhbGUiLCJvcGFjaXR5Il0sInNvdXJjZVJvb3QiOiIifQ==