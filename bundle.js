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
/* eslint-disable no-restricted-syntax */
/* eslint-disable default-case */





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
const loseMessages = ['Aw shucks! At this rate Dr. Vetman is going to call KPS (Kitty Protective Services).', 'Oh well! More to love, right?', 'Sodium overload! Better luck next time.', 'You lose! How in the world do your cats eat so many cheese balls anyway?', 'Welp! There goes your cats\' diets!', 'Hmm, I wonder how much it is for one of those cat treadmills...', 'They\'re not fat! They just have a lot of fur!'];
const winMessages = ['Congrats! Your cats are looking THIN compared to your neighbor\'s', 'Dr. Vetman has bigger cats to worry about now!', 'Yeehaw! Maybe next time your neighbor will think twice!', 'Nice aim! You must\'ve thrown cheese balls before!', 'This might be your greatest accomplishment.', 'Victory! But seriously, too many cheese balls is probably pretty bad for cats.', 'Winner, winner, kitty dinner!'];
function compRetaliation(playerBoard) {
  const target = (0,_bot__WEBPACK_IMPORTED_MODULE_2__.compFireShot)(playerBoard);
  playerBoard.takeAttack(target);
  const dataID = `[data-coord='${target}']`;
  const domCell = document.querySelector(dataID);
  applyHitImage(domCell, playerBoard, target);
  if (playerBoard.checkForWin()) {
    endGameScreen(loseMessages[Math.floor(Math.random() * loseMessages.length)]);
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
              endGameScreen(winMessages[Math.floor(Math.random() * winMessages.length)]);
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
/* harmony export */   "createGameBoard": () => (/* binding */ createGameBoard),
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
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"comfy\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"woff2\"),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"woff\");\n  font-weight: 600;\n  font-style: normal;\n}\n\n:root {\n  --background: #282a36;\n  --board-size: min(60vw, 500px);\n  --cell-size: calc(var(--board-size) / 10);\n  --logo-ball-size: 75px;\n  --shrink-scale: 1;\n  --margin: calc((100vw - var(--board-size)) / 2);\n  --shrunk-board: calc(var(--board-size) * var(--shrink-scale));\n  /* --cat-tracker-size: calc(var(--board-size) * 0.4); */\n  --cat-tracker-padding: 10px;\n  --cat-tracker-width: calc(\n    min((calc(var(--margin) * 0.95)), 200px) - (var(--cat-tracker-padding) * 2)\n  );\n  --cat-tracker-height: calc(var(var(--cat-tracker-width) * (4 / 5)));\n  --cat-tracker-cell: calc(var(--cat-tracker-width) / 5);\n  --margin-top: calc(((100vh - 100px) - var(--board-size)) * 0.5);\n}\n\nbody {\n  font-family: comfy, Verdana, Geneva, Tahoma, sans-serif;\n  position: relative;\n  display: grid;\n  grid-template: 100px 1fr / 1fr 1fr 1fr;\n  align-items: center;\n  /* justify-items: center; */\n  margin: 0;\n  padding: 0;\n  position: relative;\n  color: whitesmoke;\n  height: 100vh;\n  width: 100vw;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  background-repeat: repeat;\n  background-size: 400px;\n  text-align: center;\n}\n\n.opening-screen {\n  overflow: hidden;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  z-index: 10;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  background-repeat: repeat;\n  background-size: 100px;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  transition: 2s;\n}\n\n.opening-screen p {\n  background-color: #282a36bc;\n  box-sizing: border-box;\n  width: 300px;\n  padding: 30px;\n  border-radius: 30px;\n}\n\n@keyframes bounce {\n  from {\n    translate: 0;\n  }\n  to {\n    translate: 0px -10px;\n  }\n}\n\n.opening-screen button {\n  animation-name: bounce;\n  animation-duration: 2s;\n  animation-iteration-count: infinite;\n  animation-direction: alternate;\n  animation-timing-function: ease-out;\n  color: whitesmoke;\n  font-family: inherit;\n  font-size: 1.5rem;\n  appearance: none;\n  border-radius: 50%;\n  border: none;\n  width: 150px;\n  height: 150px;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n  cursor: grab;\n  transition: 0.3s;\n}\n\n.opening-screen button:hover,\n.play-again-button:hover {\n  animation: none;\n  scale: 0.9;\n}\n\n.opening-screen button:active,\n.play-again-button:active {\n  scale: 0.8;\n}\n\n.title {\n  grid-area: 1 / 1 / 2 / -1;\n  width: min-content;\n  height: var(--logo-ball-size);\n  margin: auto;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n}\n\n.title .ball:nth-child(4) {\n  grid-area: 1 / 1 / 2 / 2;\n  margin-left: 0;\n}\n\n.title .ball:nth-child(3) {\n  grid-area: 1 / 2 / 2 / 3;\n}\n\n.title .ball:nth-child(2) {\n  grid-area: 1 / 3 / 2 / 4;\n}\n\n.title .ball:nth-child(1) {\n  grid-area: 1 / 4 / 2 / 5;\n}\n\n.ball {\n  box-shadow: 1px 1px 8px rgb(255, 140, 0);\n  margin-left: calc(var(--logo-ball-size) * -0.5);\n  content: \"\";\n  height: var(--logo-ball-size);\n  width: var(--logo-ball-size);\n  border-radius: 50%;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n}\n\n.words {\n  grid-area: 1 / 1 / 2 / -1;\n}\nh1 {\n  font-size: 2rem;\n}\n\n.player-board-container {\n  grid-area: 2 / 2 / 3 / 3;\n  transition: 0.3s;\n  margin: auto;\n  width: min-content;\n  height: min-content;\n  transform-origin: 0 0;\n  z-index: 3;\n}\n\n.player-board,\n.comp-board {\n  /* box-sizing: border-box; */\n  width: var(--board-size);\n  height: var(--board-size);\n  display: grid;\n  grid-template: repeat(10, auto) / repeat(10, auto);\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n  background-repeat: repeat;\n  background-size: var(--cell-size) var(--cell-size);\n}\n\n.grid-cell {\n  z-index: 0;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.164);\n  width: var(--cell-size);\n  height: var(--cell-size);\n  position: relative;\n}\n\n.player-board {\n  overflow: hidden;\n}\n\n.comp-board .grid-cell:hover::after {\n  box-shadow: inset 0px 0px 50px rgb(255, 123, 0);\n  cursor: pointer;\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.comp-board .grid-cell:active::after {\n  box-shadow: inset 0px 0px 50px 10px rgb(255, 123, 0);\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.player-board .grid-cell:hover::after {\n  position: absolute;\n  left: 0;\n  content: \"\";\n  background-color: rgba(0, 0, 0, 0.462);\n  border-radius: 5px;\n}\n\n.player-board.cat-one .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 5);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-one\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 5);\n}\n\n.player-board.cat-two .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 4);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-two\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 4);\n}\n\n.player-board.cat-three .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 3);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-three\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 3);\n}\n\n.player-board.cat-four .grid-cell:hover::after,\n.player-board.cat-five .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 2);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-four\n  .grid-cell:hover::after,\n.player-board-container.horizontal\n  .player-board.cat-five\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 2);\n}\n\n.player-board-container.shrink {\n  scale: var(--shrink-scale);\n  translate: calc((var(--margin) + var(--shrunk-board)) * -0.5);\n}\n\n.player-board-container.shrink:hover {\n  scale: 0.75;\n  border: 2px solid black;\n}\n\n.cat-img {\n  transition: 0.3s;\n  position: absolute;\n  top: 3px;\n  rotate: -90deg;\n  width: var(--cell-size);\n  pointer-events: none;\n}\n\n.cat1 {\n  right: -10px;\n  height: calc(var(--cell-size) * 5);\n  transform: scale(5.5, 4);\n}\n\n.cat1.horizontal-cat {\n  top: 5px;\n  width: calc(var(--cell-size) * 5);\n  transform: scale(3.8, 2.7);\n}\n\n.cat2 {\n  top: 5px;\n  left: -5px;\n  height: calc(var(--cell-size) * 4);\n  transform: scale(4.3, 2.5);\n}\n\n.cat2.horizontal-cat {\n  top: -3px;\n  width: calc(var(--cell-size) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat3 {\n  left: 0;\n  height: calc(var(--cell-size) * 3);\n  transform: scale(3.5, 2.5);\n}\n\n.cat3.horizontal-cat {\n  width: calc(var(--cell-size) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat4 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 2);\n}\n\n.cat4.horizontal-cat {\n  width: calc(var(--cell-size) * 2);\n  transform: scale(1.5);\n}\n\n.cat5 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 1.5);\n}\n\n.cat5.horizontal-cat {\n  width: calc((var(--cell-size) * 2));\n  transform: scale(1.5, 1.1);\n}\n\n.horizontal-cat {\n  top: 0px;\n  left: 0px;\n  height: var(--cell-size);\n  rotate: 0deg;\n}\n\n.grid-cell.attacked::after {\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  box-shadow: inset 0px 0px 15px orange;\n}\n\n.grid-cell.attacked::before {\n  z-index: 1;\n  position: absolute;\n  content: \"\";\n  width: calc(var(--cell-size) / 3);\n  height: calc(var(--cell-size) / 3);\n  background-color: rgba(255, 166, 0, 0.698);\n  border-radius: 50%;\n  inset: 0;\n  margin: auto;\n}\n\n.grid-cell.attacked.occupied::before {\n  width: calc(var(--cell-size) / 1.5);\n  height: calc(var(--cell-size) / 1.5);\n  background-color: orange;\n  transition: 1s;\n}\n\n.grid-cell.attacked.occupied.consume::before {\n  scale: 0;\n}\n\n.rotate-button {\n  background-color: hsl(39, 100%, 50%);\n  appearance: none;\n  border: none;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  cursor: pointer;\n  margin: 5px;\n}\n\n.rotate-button:hover {\n  background-color: hsl(39, 100%, 60%);\n}\n\n.rotate-button:active {\n  background-color: hsl(39, 100%, 70%);\n}\n\n.comp-board-container {\n  overflow: hidden;\n  grid-area: 2 / 2 / 3 / 3;\n  width: min-content;\n  height: min-content;\n  display: none;\n  inset: 0;\n  margin: auto;\n}\n\n.hidden {\n  opacity: 0;\n}\n\n.cat-tracker-container {\n  width: min-content;\n  background-color: rgba(255, 255, 255, 0.405);\n  padding: var(--cat-tracker-padding);\n  border-radius: 20px;\n  overflow: hidden;\n  align-self: flex-start;\n  margin: var(--margin-top) 10px;\n  grid-area: 2 / 3 / 3 / 4;\n  visibility: hidden;\n}\n\n.cat-tracker {\n  display: grid;\n  grid-template: repeat(4, auto) / repeat(5, auto);\n  width: var(--cat-tracker-width);\n  height: var(--cat-tracker-height);\n  align-items: center;\n  justify-items: flex-start;\n}\n\n.cat-tracker div {\n  position: relative;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.5);\n  height: var(--cat-tracker-cell);\n  width: var(--cat-tracker-cell);\n}\n\n.cat-tracker div::after {\n  position: absolute;\n  content: \"\";\n  background-color: orange;\n  width: 40%;\n  height: 40%;\n  border-radius: 50%;\n  z-index: 3;\n  inset: 0;\n  margin: auto;\n  opacity: 0;\n  transition: 0.5s;\n}\n\n.cat-tracker div::before {\n  position: absolute;\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  background-color: rgba(201, 201, 201, 0.54);\n  opacity: 0;\n  left: 0;\n}\n\n.cat-tracker div.cat-tracker-hit::after,\n.cat-tracker div.cat-tracker-hit::before {\n  opacity: 1;\n}\n\n.cat-tracker div img {\n  height: var(--cat-tracker-cell);\n}\n\n.cat-tracker-first img {\n  width: calc(var(--cat-tracker-cell) * 5);\n  transform: scale(3.4, 2.7);\n}\n\n.cat-tracker-second img {\n  width: calc(var(--cat-tracker-cell) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat-tracker-third img {\n  width: calc(var(--cat-tracker-cell) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat-tracker-fourth img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5);\n}\n\n.cat-tracker-fifth img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5, 1.1);\n}\n\n.end-game {\n  z-index: 3;\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  background-color: #282a36ce;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: 2rem;\n}\n\n.end-message {\n  width: 300px;\n}\n\n.play-again-button {\n  margin: 10px;\n  appearance: none;\n  border: none;\n  font-family: inherit;\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n  cursor: grab;\n  transition: 0.3s;\n}\n\n@media only screen and (max-width: 900px) {\n}\n\n@media only screen and (max-width: 850px) {\n  :root {\n    --scale-size: 0.4;\n    --board-size: min(60vh, 90vw);\n    --logo-ball-size: 50px;\n    --second-row: calc((95vh - 50px) * (1 / (1.3 + 1)));\n    --third-row: calc((95vh - 50px) * (1.3 / (1.3 + 1)));\n    --mini-board-size: calc(var(--board-size) * var(--scale-size));\n    --cat-tracker-width: calc(var(--board-size) * 0.4);\n  }\n\n  body {\n    display: grid;\n    grid-template: 5vh 1fr 1.3fr 50px/ 50vw 50vw;\n    align-items: center;\n    justify-items: center;\n  }\n\n  .title {\n    grid-area: 1 / 1 / 2 / 3;\n    margin-top: 0;\n  }\n\n  h1 {\n    font-size: 1rem;\n  }\n\n  .player-board-container {\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .player-board-container.shrink {\n    scale: var(--scale-size);\n    translate: 0px\n      calc(\n        (\n            var(--third-row) - var(--board-size) + var(--second-row) +\n              var(--mini-board-size)\n          ) * -0.5\n      );\n    justify-self: center;\n  }\n\n  .player-board-container.shrink:hover {\n    scale: 0.75;\n  }\n\n  .comp-board-container {\n    margin-top: auto;\n    display: none;\n    position: relative;\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .cat-tracker-container {\n    margin: auto;\n    grid-area: 2 / 2 / 3 / 3;\n  }\n}\n\n@media only screen and (max-width: 450px) {\n  :root {\n    --scale-size: 0.5;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n  font-family: \"comfy\";\n  src: url(\"./font/comfortaa-variablefont_wght-webfont.woff2\") format(\"woff2\"),\n    url(\"./font/comfortaa-variablefont_wght-webfont.woff\") format(\"woff\");\n  font-weight: 600;\n  font-style: normal;\n}\n\n:root {\n  --background: #282a36;\n  --board-size: min(60vw, 500px);\n  --cell-size: calc(var(--board-size) / 10);\n  --logo-ball-size: 75px;\n  --shrink-scale: 1;\n  --margin: calc((100vw - var(--board-size)) / 2);\n  --shrunk-board: calc(var(--board-size) * var(--shrink-scale));\n  /* --cat-tracker-size: calc(var(--board-size) * 0.4); */\n  --cat-tracker-padding: 10px;\n  --cat-tracker-width: calc(\n    min((calc(var(--margin) * 0.95)), 200px) - (var(--cat-tracker-padding) * 2)\n  );\n  --cat-tracker-height: calc(var(var(--cat-tracker-width) * (4 / 5)));\n  --cat-tracker-cell: calc(var(--cat-tracker-width) / 5);\n  --margin-top: calc(((100vh - 100px) - var(--board-size)) * 0.5);\n}\n\nbody {\n  font-family: comfy, Verdana, Geneva, Tahoma, sans-serif;\n  position: relative;\n  display: grid;\n  grid-template: 100px 1fr / 1fr 1fr 1fr;\n  align-items: center;\n  /* justify-items: center; */\n  margin: 0;\n  padding: 0;\n  position: relative;\n  color: whitesmoke;\n  height: 100vh;\n  width: 100vw;\n  background: url(\"./img/grrass.jpeg\");\n  background-repeat: repeat;\n  background-size: 400px;\n  text-align: center;\n}\n\n.opening-screen {\n  overflow: hidden;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  z-index: 10;\n  background: url(\"./img/grrass.jpeg\");\n  background-repeat: repeat;\n  background-size: 100px;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  transition: 2s;\n}\n\n.opening-screen p {\n  background-color: #282a36bc;\n  box-sizing: border-box;\n  width: 300px;\n  padding: 30px;\n  border-radius: 30px;\n}\n\n@keyframes bounce {\n  from {\n    translate: 0;\n  }\n  to {\n    translate: 0px -10px;\n  }\n}\n\n.opening-screen button {\n  animation-name: bounce;\n  animation-duration: 2s;\n  animation-iteration-count: infinite;\n  animation-direction: alternate;\n  animation-timing-function: ease-out;\n  color: whitesmoke;\n  font-family: inherit;\n  font-size: 1.5rem;\n  appearance: none;\n  border-radius: 50%;\n  border: none;\n  width: 150px;\n  height: 150px;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n  cursor: grab;\n  transition: 0.3s;\n}\n\n.opening-screen button:hover,\n.play-again-button:hover {\n  animation: none;\n  scale: 0.9;\n}\n\n.opening-screen button:active,\n.play-again-button:active {\n  scale: 0.8;\n}\n\n.title {\n  grid-area: 1 / 1 / 2 / -1;\n  width: min-content;\n  height: var(--logo-ball-size);\n  margin: auto;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n}\n\n.title .ball:nth-child(4) {\n  grid-area: 1 / 1 / 2 / 2;\n  margin-left: 0;\n}\n\n.title .ball:nth-child(3) {\n  grid-area: 1 / 2 / 2 / 3;\n}\n\n.title .ball:nth-child(2) {\n  grid-area: 1 / 3 / 2 / 4;\n}\n\n.title .ball:nth-child(1) {\n  grid-area: 1 / 4 / 2 / 5;\n}\n\n.ball {\n  box-shadow: 1px 1px 8px rgb(255, 140, 0);\n  margin-left: calc(var(--logo-ball-size) * -0.5);\n  content: \"\";\n  height: var(--logo-ball-size);\n  width: var(--logo-ball-size);\n  border-radius: 50%;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n}\n\n.words {\n  grid-area: 1 / 1 / 2 / -1;\n}\nh1 {\n  font-size: 2rem;\n}\n\n.player-board-container {\n  grid-area: 2 / 2 / 3 / 3;\n  transition: 0.3s;\n  margin: auto;\n  width: min-content;\n  height: min-content;\n  transform-origin: 0 0;\n  z-index: 3;\n}\n\n.player-board,\n.comp-board {\n  /* box-sizing: border-box; */\n  width: var(--board-size);\n  height: var(--board-size);\n  display: grid;\n  grid-template: repeat(10, auto) / repeat(10, auto);\n  background: url(\"./img/pexels-pixmike-413195.jpg\");\n  background-repeat: repeat;\n  background-size: var(--cell-size) var(--cell-size);\n}\n\n.grid-cell {\n  z-index: 0;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.164);\n  width: var(--cell-size);\n  height: var(--cell-size);\n  position: relative;\n}\n\n.player-board {\n  overflow: hidden;\n}\n\n.comp-board .grid-cell:hover::after {\n  box-shadow: inset 0px 0px 50px rgb(255, 123, 0);\n  cursor: pointer;\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.comp-board .grid-cell:active::after {\n  box-shadow: inset 0px 0px 50px 10px rgb(255, 123, 0);\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.player-board .grid-cell:hover::after {\n  position: absolute;\n  left: 0;\n  content: \"\";\n  background-color: rgba(0, 0, 0, 0.462);\n  border-radius: 5px;\n}\n\n.player-board.cat-one .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 5);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-one\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 5);\n}\n\n.player-board.cat-two .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 4);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-two\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 4);\n}\n\n.player-board.cat-three .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 3);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-three\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 3);\n}\n\n.player-board.cat-four .grid-cell:hover::after,\n.player-board.cat-five .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 2);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-four\n  .grid-cell:hover::after,\n.player-board-container.horizontal\n  .player-board.cat-five\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 2);\n}\n\n.player-board-container.shrink {\n  scale: var(--shrink-scale);\n  translate: calc((var(--margin) + var(--shrunk-board)) * -0.5);\n}\n\n.player-board-container.shrink:hover {\n  scale: 0.75;\n  border: 2px solid black;\n}\n\n.cat-img {\n  transition: 0.3s;\n  position: absolute;\n  top: 3px;\n  rotate: -90deg;\n  width: var(--cell-size);\n  pointer-events: none;\n}\n\n.cat1 {\n  right: -10px;\n  height: calc(var(--cell-size) * 5);\n  transform: scale(5.5, 4);\n}\n\n.cat1.horizontal-cat {\n  top: 5px;\n  width: calc(var(--cell-size) * 5);\n  transform: scale(3.8, 2.7);\n}\n\n.cat2 {\n  top: 5px;\n  left: -5px;\n  height: calc(var(--cell-size) * 4);\n  transform: scale(4.3, 2.5);\n}\n\n.cat2.horizontal-cat {\n  top: -3px;\n  width: calc(var(--cell-size) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat3 {\n  left: 0;\n  height: calc(var(--cell-size) * 3);\n  transform: scale(3.5, 2.5);\n}\n\n.cat3.horizontal-cat {\n  width: calc(var(--cell-size) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat4 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 2);\n}\n\n.cat4.horizontal-cat {\n  width: calc(var(--cell-size) * 2);\n  transform: scale(1.5);\n}\n\n.cat5 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 1.5);\n}\n\n.cat5.horizontal-cat {\n  width: calc((var(--cell-size) * 2));\n  transform: scale(1.5, 1.1);\n}\n\n.horizontal-cat {\n  top: 0px;\n  left: 0px;\n  height: var(--cell-size);\n  rotate: 0deg;\n}\n\n.grid-cell.attacked::after {\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  box-shadow: inset 0px 0px 15px orange;\n}\n\n.grid-cell.attacked::before {\n  z-index: 1;\n  position: absolute;\n  content: \"\";\n  width: calc(var(--cell-size) / 3);\n  height: calc(var(--cell-size) / 3);\n  background-color: rgba(255, 166, 0, 0.698);\n  border-radius: 50%;\n  inset: 0;\n  margin: auto;\n}\n\n.grid-cell.attacked.occupied::before {\n  width: calc(var(--cell-size) / 1.5);\n  height: calc(var(--cell-size) / 1.5);\n  background-color: orange;\n  transition: 1s;\n}\n\n.grid-cell.attacked.occupied.consume::before {\n  scale: 0;\n}\n\n.rotate-button {\n  background-color: hsl(39, 100%, 50%);\n  appearance: none;\n  border: none;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  cursor: pointer;\n  margin: 5px;\n}\n\n.rotate-button:hover {\n  background-color: hsl(39, 100%, 60%);\n}\n\n.rotate-button:active {\n  background-color: hsl(39, 100%, 70%);\n}\n\n.comp-board-container {\n  overflow: hidden;\n  grid-area: 2 / 2 / 3 / 3;\n  width: min-content;\n  height: min-content;\n  display: none;\n  inset: 0;\n  margin: auto;\n}\n\n.hidden {\n  opacity: 0;\n}\n\n.cat-tracker-container {\n  width: min-content;\n  background-color: rgba(255, 255, 255, 0.405);\n  padding: var(--cat-tracker-padding);\n  border-radius: 20px;\n  overflow: hidden;\n  align-self: flex-start;\n  margin: var(--margin-top) 10px;\n  grid-area: 2 / 3 / 3 / 4;\n  visibility: hidden;\n}\n\n.cat-tracker {\n  display: grid;\n  grid-template: repeat(4, auto) / repeat(5, auto);\n  width: var(--cat-tracker-width);\n  height: var(--cat-tracker-height);\n  align-items: center;\n  justify-items: flex-start;\n}\n\n.cat-tracker div {\n  position: relative;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.5);\n  height: var(--cat-tracker-cell);\n  width: var(--cat-tracker-cell);\n}\n\n.cat-tracker div::after {\n  position: absolute;\n  content: \"\";\n  background-color: orange;\n  width: 40%;\n  height: 40%;\n  border-radius: 50%;\n  z-index: 3;\n  inset: 0;\n  margin: auto;\n  opacity: 0;\n  transition: 0.5s;\n}\n\n.cat-tracker div::before {\n  position: absolute;\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  background-color: rgba(201, 201, 201, 0.54);\n  opacity: 0;\n  left: 0;\n}\n\n.cat-tracker div.cat-tracker-hit::after,\n.cat-tracker div.cat-tracker-hit::before {\n  opacity: 1;\n}\n\n.cat-tracker div img {\n  height: var(--cat-tracker-cell);\n}\n\n.cat-tracker-first img {\n  width: calc(var(--cat-tracker-cell) * 5);\n  transform: scale(3.4, 2.7);\n}\n\n.cat-tracker-second img {\n  width: calc(var(--cat-tracker-cell) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat-tracker-third img {\n  width: calc(var(--cat-tracker-cell) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat-tracker-fourth img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5);\n}\n\n.cat-tracker-fifth img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5, 1.1);\n}\n\n.end-game {\n  z-index: 3;\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  background-color: #282a36ce;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: 2rem;\n}\n\n.end-message {\n  width: 300px;\n}\n\n.play-again-button {\n  margin: 10px;\n  appearance: none;\n  border: none;\n  font-family: inherit;\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n  cursor: grab;\n  transition: 0.3s;\n}\n\n@media only screen and (max-width: 900px) {\n}\n\n@media only screen and (max-width: 850px) {\n  :root {\n    --scale-size: 0.4;\n    --board-size: min(60vh, 90vw);\n    --logo-ball-size: 50px;\n    --second-row: calc((95vh - 50px) * (1 / (1.3 + 1)));\n    --third-row: calc((95vh - 50px) * (1.3 / (1.3 + 1)));\n    --mini-board-size: calc(var(--board-size) * var(--scale-size));\n    --cat-tracker-width: calc(var(--board-size) * 0.4);\n  }\n\n  body {\n    display: grid;\n    grid-template: 5vh 1fr 1.3fr 50px/ 50vw 50vw;\n    align-items: center;\n    justify-items: center;\n  }\n\n  .title {\n    grid-area: 1 / 1 / 2 / 3;\n    margin-top: 0;\n  }\n\n  h1 {\n    font-size: 1rem;\n  }\n\n  .player-board-container {\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .player-board-container.shrink {\n    scale: var(--scale-size);\n    translate: 0px\n      calc(\n        (\n            var(--third-row) - var(--board-size) + var(--second-row) +\n              var(--mini-board-size)\n          ) * -0.5\n      );\n    justify-self: center;\n  }\n\n  .player-board-container.shrink:hover {\n    scale: 0.75;\n  }\n\n  .comp-board-container {\n    margin-top: auto;\n    display: none;\n    position: relative;\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .cat-tracker-container {\n    margin: auto;\n    grid-area: 2 / 2 / 3 / 3;\n  }\n}\n\n@media only screen and (max-width: 450px) {\n  :root {\n    --scale-size: 0.5;\n  }\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFlBQVksTUFBTSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLE1BQU0sVUFBVSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxNQUFNLE1BQU0sWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLE9BQU8sWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxPQUFPLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sT0FBTyxZQUFZLGFBQWEsT0FBTyxNQUFNLFlBQVksYUFBYSxPQUFPLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFB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Ozs7OztBQ3JFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDZkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NmQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7Ozs7O1dDckJBOzs7Ozs7Ozs7Ozs7O0FDQXFCO0FBQ0s7QUFFMUJpRixpREFBSSxFQUFFLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9ib3QuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvY2F0LmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vc3JjL2NhdEltZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vc3JjL2luaXQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cblxuZnVuY3Rpb24gZGV0ZXJtaW5lT3JpZW50YXRpb24oYXJyYXkpIHtcbiAgcmV0dXJuIGFycmF5WzBdWzBdID09PSBhcnJheVsxXVswXSA/IFwieVwiIDogXCJ4XCI7XG59XG5cbmZ1bmN0aW9uIGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoc3RhcnQsIGJvYXJkSUQsIGNhdCwgYXhpcywgZGlyZWN0aW9uKSB7XG4gIGxldCBhbGxEaXI7XG4gIGNvbnN0IFt4LCB5XSA9IHN0YXJ0O1xuICBjb25zdCB1cCA9ICgpID0+IGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoW3gsIHkgLSAxXSwgYm9hcmRJRCwgY2F0LCBcInlcIiwgLTEpO1xuICBjb25zdCByaWdodCA9ICgpID0+XG4gICAgYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyhbeCArIDEsIHldLCBib2FyZElELCBjYXQsIFwieFwiLCAxKTtcbiAgY29uc3QgZG93biA9ICgpID0+XG4gICAgYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyhbeCwgeSArIDFdLCBib2FyZElELCBjYXQsIFwieVwiLCAxKTtcbiAgY29uc3QgbGVmdCA9ICgpID0+XG4gICAgYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyhbeCAtIDEsIHldLCBib2FyZElELCBjYXQsIFwieFwiLCAtMSk7XG5cbiAgaWYgKHN0YXJ0LnNvbWUoKG51bSkgPT4gbnVtID4gOSB8fCBudW0gPCAwKSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3Qgb3BwQm9hcmRDZWxsID0gYm9hcmRJRC5ib2FyZFtgWyR7c3RhcnR9XWBdO1xuICBpZiAoXG4gICAgb3BwQm9hcmRDZWxsLmF0dGFja2VkICYmXG4gICAgKCFvcHBCb2FyZENlbGwub2NjdXBpZWRCeSB8fCBvcHBCb2FyZENlbGwub2NjdXBpZWRCeSAhPT0gY2F0KVxuICApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoIW9wcEJvYXJkQ2VsbC5hdHRhY2tlZCkgcmV0dXJuIHN0YXJ0O1xuXG4gIGlmIChheGlzKSB7XG4gICAgaWYgKGF4aXMgPT09IFwieFwiKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBhc3Nlc3NBZGphY2VudENvb3JkaW5hdGVzKFxuICAgICAgICAgIFt4ICsgMSAqIGRpcmVjdGlvbiwgeV0sXG4gICAgICAgICAgYm9hcmRJRCxcbiAgICAgICAgICBjYXQsXG4gICAgICAgICAgYXhpcyxcbiAgICAgICAgICBkaXJlY3Rpb25cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGFsbERpciA9IFtsZWZ0KCksIHJpZ2h0KCldO1xuICAgIH0gZWxzZSBpZiAoYXhpcyA9PT0gXCJ5XCIpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoXG4gICAgICAgICAgW3gsIHkgKyAxICogZGlyZWN0aW9uXSxcbiAgICAgICAgICBib2FyZElELFxuICAgICAgICAgIGNhdCxcbiAgICAgICAgICBheGlzLFxuICAgICAgICAgIGRpcmVjdGlvblxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgYWxsRGlyID0gW3VwKCksIGRvd24oKV07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGFsbERpciA9IFt1cCgpLCByaWdodCgpLCBkb3duKCksIGxlZnQoKV07XG4gIH1cbiAgcmV0dXJuIGFsbERpci5maWx0ZXIoKG9wdCkgPT4gb3B0ICE9PSBudWxsKTtcbn1cblxuZnVuY3Rpb24gY29tcEZpcmVTaG90KG9wcG9uZW50Qm9hcmQpIHtcbiAgY29uc3Qgd291bmRlZFRhcmdldHMgPSBbXTtcbiAgbGV0IHBvc3NpYmxlSGl0cztcbiAgb3Bwb25lbnRCb2FyZC5jYXRzLmZvckVhY2goKGNhdCkgPT4ge1xuICAgIGlmIChjYXQuaGl0cyA+IDAgJiYgIWNhdC5pc1N1bmsoKSkge1xuICAgICAgd291bmRlZFRhcmdldHMucHVzaChjYXQpO1xuICAgIH1cbiAgfSk7XG4gIGlmICh3b3VuZGVkVGFyZ2V0cy5sZW5ndGgpIHtcbiAgICBjb25zdCBwcmltYXJ5VGFyZ2V0ID0gd291bmRlZFRhcmdldHNbMF07XG4gICAgaWYgKHByaW1hcnlUYXJnZXQuY29vcmRIaXQubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3Qgb3JpZW50YXRpb24gPSBkZXRlcm1pbmVPcmllbnRhdGlvbihwcmltYXJ5VGFyZ2V0LmNvb3JkSGl0KTtcbiAgICAgIHBvc3NpYmxlSGl0cyA9IGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoXG4gICAgICAgIHByaW1hcnlUYXJnZXQuY29vcmRIaXRbMF0sXG4gICAgICAgIG9wcG9uZW50Qm9hcmQsXG4gICAgICAgIHByaW1hcnlUYXJnZXQsXG4gICAgICAgIG9yaWVudGF0aW9uXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3NzaWJsZUhpdHMgPSBhc3Nlc3NBZGphY2VudENvb3JkaW5hdGVzKFxuICAgICAgICBwcmltYXJ5VGFyZ2V0LmNvb3JkSGl0WzBdLFxuICAgICAgICBvcHBvbmVudEJvYXJkLFxuICAgICAgICBwcmltYXJ5VGFyZ2V0XG4gICAgICApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBwb3NzaWJsZUhpdHMgPSBbXTtcbiAgICBPYmplY3Qua2V5cyhvcHBvbmVudEJvYXJkLmJvYXJkKS5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICBpZiAoIW9wcG9uZW50Qm9hcmQuYm9hcmRbY2VsbF0uYXR0YWNrZWQpIHtcbiAgICAgICAgcG9zc2libGVIaXRzLnB1c2gob3Bwb25lbnRCb2FyZC5ib2FyZFtjZWxsXS5jb29yZGluYXRlcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHBvc3NpYmxlSGl0c1tNYXRoLmZsb29yKHBvc3NpYmxlSGl0cy5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKV07XG59XG5cbmV4cG9ydCB7IGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMsIGNvbXBGaXJlU2hvdCB9O1xuIiwiY2xhc3MgQ2F0IHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCB0eXBlKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBcInZlcnRpY2FsXCI7XG4gICAgdGhpcy5jb29yZEhpdCA9IFtdO1xuICB9XG5cbiAgaGl0KGNvb3JkKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gICAgdGhpcy5jb29yZEhpdC5wdXNoKGNvb3JkKTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGggPT09IHRoaXMuaGl0cztcbiAgfVxuXG4gIHJvdGF0ZSgpIHtcbiAgICB0aGlzLm9yaWVudGF0aW9uID1cbiAgICAgIHRoaXMub3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIiA/IFwiaG9yaXpvbnRhbFwiIDogXCJ2ZXJ0aWNhbFwiO1xuICB9XG5cbiAgcmFuZG9taXplT3JpZW50YXRpb24oKSB7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IE1hdGgucmFuZG9tKCkgPiAwLjUgPyBcInZlcnRpY2FsXCIgOiBcImhvcml6b250YWxcIjtcbiAgfVxuXG4gIHNldERvbUVsZW1lbnQodGFyZ2V0KSB7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gdGFyZ2V0O1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNhdHMoKSB7XG4gIGNvbnN0IGNhdDEgPSBuZXcgQ2F0KDUsIFwiYmlnIHN0cmV0Y2hcIik7XG4gIGNvbnN0IGNhdDIgPSBuZXcgQ2F0KDQsIFwiZG93bndhcmQgY2F0XCIpO1xuICBjb25zdCBjYXQzID0gbmV3IENhdCgzLCBcInN0dWZmIHN0cnV0dGVyXCIpO1xuICBjb25zdCBjYXQ0ID0gbmV3IENhdCgyLCBcInF1YXNpIGxvYWZcIik7XG4gIGNvbnN0IGNhdDUgPSBuZXcgQ2F0KDIsIFwiY29tcGFjdCBraXR0eVwiKTtcbiAgcmV0dXJuIFtjYXQxLCBjYXQyLCBjYXQzLCBjYXQ0LCBjYXQ1XTtcbn1cblxuZXhwb3J0IHsgQ2F0LCBjcmVhdGVDYXRzIH07XG4iLCJpbXBvcnQgY2F0MSBmcm9tIFwiLi9pbWcvYmlnLXN0cmV0Y2guc3ZnXCI7XG5pbXBvcnQgY2F0MiBmcm9tIFwiLi9pbWcvY2F0Mi5zdmdcIjtcbmltcG9ydCBjYXQzIGZyb20gXCIuL2ltZy93YWxrLnN2Z1wiO1xuaW1wb3J0IGNhdDQgZnJvbSBcIi4vaW1nL3F1YXNpLWxvYWYyLnN2Z1wiO1xuaW1wb3J0IGNhdDUgZnJvbSBcIi4vaW1nL2xlc1JvbGwuc3ZnXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNhdEltYWdlKHNvdXJjZSkge1xuICBjb25zdCBjYXRJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgY2F0SW1nLnNyYyA9IHNvdXJjZTtcbiAgcmV0dXJuIGNhdEltZztcbn1cblxuZnVuY3Rpb24gYWRkQ2F0SW1nKGN1cnJlbnRDYXQpIHtcbiAgY29uc3QgY2F0SW1nID0gbmV3IEltYWdlKCk7XG4gIGNhdEltZy5jbGFzc0xpc3QuYWRkKFwiY2F0LWltZ1wiKTtcbiAgc3dpdGNoIChjdXJyZW50Q2F0LnR5cGUpIHtcbiAgICBjYXNlIFwiYmlnIHN0cmV0Y2hcIjpcbiAgICAgIGNhdEltZy5zcmMgPSBjYXQxO1xuICAgICAgY2F0SW1nLmNsYXNzTGlzdC5hZGQoXCJjYXQxXCIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImRvd253YXJkIGNhdFwiOlxuICAgICAgY2F0SW1nLnNyYyA9IGNhdDI7XG4gICAgICBjYXRJbWcuY2xhc3NMaXN0LmFkZChcImNhdDJcIik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwic3R1ZmYgc3RydXR0ZXJcIjpcbiAgICAgIGNhdEltZy5zcmMgPSBjYXQzO1xuICAgICAgY2F0SW1nLmNsYXNzTGlzdC5hZGQoXCJjYXQzXCIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInF1YXNpIGxvYWZcIjpcbiAgICAgIGNhdEltZy5zcmMgPSBjYXQ0O1xuICAgICAgY2F0SW1nLmNsYXNzTGlzdC5hZGQoXCJjYXQ0XCIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImNvbXBhY3Qga2l0dHlcIjpcbiAgICAgIGNhdEltZy5zcmMgPSBjYXQ1O1xuICAgICAgY2F0SW1nLmNsYXNzTGlzdC5hZGQoXCJjYXQ1XCIpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG4gIGlmIChjdXJyZW50Q2F0Lm9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgIGNhdEltZy5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbC1jYXRcIik7XG4gIH1cbiAgcmV0dXJuIGNhdEltZztcbn1cblxuZnVuY3Rpb24gYXBwZW5kQ2F0SW1hZ2VzKCkge1xuICBjb25zdCBmaXJzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNlbGw9JzAtMCddYCk7XG4gIGNvbnN0IHNlY29uZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNlbGw9XCIwLTFcIl0nKTtcbiAgY29uc3QgdGhpcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jZWxsPVwiMC0yXCJdJyk7XG4gIGNvbnN0IGZvdXJ0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNlbGw9XCIwLTNcIl0nKTtcbiAgY29uc3QgZmlmdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jZWxsPVwiMi0zXCJdJyk7XG4gIGZpcnN0LmFwcGVuZChjcmVhdGVDYXRJbWFnZShjYXQxKSk7XG4gIGZpcnN0LmNsYXNzTGlzdC5hZGQoXCJjYXQtdHJhY2tlci1maXJzdFwiKTtcbiAgc2Vjb25kLmFwcGVuZChjcmVhdGVDYXRJbWFnZShjYXQyKSk7XG4gIHNlY29uZC5jbGFzc0xpc3QuYWRkKFwiY2F0LXRyYWNrZXItc2Vjb25kXCIpO1xuICB0aGlyZC5hcHBlbmQoY3JlYXRlQ2F0SW1hZ2UoY2F0MykpO1xuICB0aGlyZC5jbGFzc0xpc3QuYWRkKFwiY2F0LXRyYWNrZXItdGhpcmRcIik7XG4gIGZvdXJ0aC5hcHBlbmQoY3JlYXRlQ2F0SW1hZ2UoY2F0NCkpO1xuICBmb3VydGguY2xhc3NMaXN0LmFkZChcImNhdC10cmFja2VyLWZvdXJ0aFwiKTtcbiAgZmlmdGguYXBwZW5kKGNyZWF0ZUNhdEltYWdlKGNhdDUpKTtcbiAgZmlmdGguY2xhc3NMaXN0LmFkZChcImNhdC10cmFja2VyLWZpZnRoXCIpO1xufVxuXG5leHBvcnQgeyBhZGRDYXRJbWcsIGFwcGVuZENhdEltYWdlcyB9OyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBkZWZhdWx0LWNhc2UgKi9cblxuaW1wb3J0IHJvdGF0ZUljb24gZnJvbSBcIi4vaW1nL2Zvcm1hdC1yb3RhdGUtOTAuc3ZnXCI7XG5pbXBvcnQgeyBhZGRDYXRJbWcsIGFwcGVuZENhdEltYWdlcyB9IGZyb20gXCIuL2NhdEltZ1wiO1xuaW1wb3J0IHsgY29tcEZpcmVTaG90IH0gZnJvbSBcIi4vYm90XCI7XG5pbXBvcnQgeyBjcmVhdGVQbGF5ZXJHYW1lQm9hcmQsIGNyZWF0ZUNvbXBHYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ib2FyZC1jb250YWluZXJcIik7XG5jb25zdCBjb21wQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXAtYm9hcmQtY29udGFpbmVyXCIpO1xuY29uc3QgY2F0VHJhY2tlckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2F0LXRyYWNrZXItY29udGFpbmVyXCIpO1xuXG5sZXQgY3VycmVudFBsYXllckJvYXJkO1xuXG5mdW5jdGlvbiByb3RhdGVDYXQoKSB7XG4gIGlmICghY3VycmVudFBsYXllckJvYXJkKSByZXR1cm47XG4gIGNvbnN0IGN1cnJlbnRDYXQgPSBjdXJyZW50UGxheWVyQm9hcmQuZ2V0Q3VycmVudENhdCgpO1xuICBpZiAoIWN1cnJlbnRDYXQpIHJldHVybjtcbiAgY3VycmVudENhdC5yb3RhdGUoKTtcbiAgcGxheWVyQm9hcmRDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZShcImhvcml6b250YWxcIik7XG59XG5cbmNvbnN0IHJvdGF0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5jb25zdCByb3RhdGVJbWcgPSBuZXcgSW1hZ2UoKTtcbnJvdGF0ZUltZy5zcmMgPSByb3RhdGVJY29uO1xucm90YXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyb3RhdGUtYnV0dG9uXCIpO1xucm90YXRlQnV0dG9uLmFwcGVuZENoaWxkKHJvdGF0ZUltZyk7XG5yb3RhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgcm90YXRlQ2F0KCk7XG59KTtcblxuZnVuY3Rpb24gY3JlYXRlQ2F0VHJhY2tlcigpIHtcbiAgY29uc3QgY2F0VHJhY2tlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNhdFRyYWNrZXJEaXYuY2xhc3NMaXN0LmFkZChcImNhdC10cmFja2VyXCIpO1xuICBmb3IgKGxldCB5ID0gMDsgeSA8IDQ7IHkrKykge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgNTsgeCsrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnN0IGlkID0gYCR7eH0tJHt5fWA7XG4gICAgICBjZWxsLmRhdGFzZXQuY2VsbCA9IGlkO1xuICAgICAgY2F0VHJhY2tlckRpdi5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNhdFRyYWNrZXJEaXY7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNhdFRyYWNrZXIoY2F0KSB7XG4gIGxldCB5O1xuICBsZXQgeCA9IDA7XG4gIHN3aXRjaCAoY2F0LnR5cGUpIHtcbiAgICBjYXNlIFwiYmlnIHN0cmV0Y2hcIjpcbiAgICAgIHkgPSAwO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImRvd253YXJkIGNhdFwiOlxuICAgICAgeSA9IDE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwic3R1ZmYgc3RydXR0ZXJcIjpcbiAgICAgIHkgPSAyO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInF1YXNpIGxvYWZcIjpcbiAgICAgIHkgPSAzO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImNvbXBhY3Qga2l0dHlcIjpcbiAgICAgIHkgPSAzO1xuICAgICAgeCA9IDI7XG4gICAgICBicmVhaztcbiAgfVxuICBjb25zdCBjb29yZCA9IGAke3ggKyBjYXQuaGl0cyAtIDF9LSR7eX1gO1xuICBjb25zdCBkb21UYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jZWxsPScke2Nvb3JkfSddYCk7XG4gIGRvbVRhcmdldC5jbGFzc0xpc3QuYWRkKFwiY2F0LXRyYWNrZXItaGl0XCIpO1xufVxuXG5mdW5jdGlvbiBhcHBseUhpdEltYWdlKHRhcmdldCwgYm9hcmRJRCwgY29vcmQpIHtcbiAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhdHRhY2tlZFwiKTtcbiAgaWYgKGJvYXJkSUQuYm9hcmRbYFske2Nvb3JkfV1gXS5vY2N1cGllZEJ5KSB7XG4gICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJvY2N1cGllZFwiKTtcbiAgICBpZiAoYm9hcmRJRC5jb21wKSB7XG4gICAgICB1cGRhdGVDYXRUcmFja2VyKGJvYXJkSUQuYm9hcmRbYFske2Nvb3JkfV1gXS5vY2N1cGllZEJ5KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hyaW5rU2l6ZSgpIHtcbiAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcC1ib2FyZCcpXG4gIGNvbnN0IG9yaWdpbmFsU2l6ZSA9IGJvYXJkLm9mZnNldFdpZHRoO1xuICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICByZXR1cm4gKHdpbmRvd1dpZHRoIC0gb3JpZ2luYWxTaXplKSAvIDIuMyAvIG9yaWdpbmFsU2l6ZTtcbn1cblxuZnVuY3Rpb24gc2V0U2hyaW5rU2NhbGUoYm9hcmQpIHtcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgIFwiLS1zaHJpbmstc2NhbGVcIixcbiAgICBgbWluKDEsICR7c2hyaW5rU2l6ZShib2FyZCl9KWBcbiAgKTtcbn1cblxuZnVuY3Rpb24gaG92ZXJFZmZlY3QoY2F0KSB7XG4gIGNvbnN0IHByZWZpeCA9IFwicGxheWVyLWJvYXJkXCI7XG4gIGxldCBzdWZmaXg7XG4gIHN3aXRjaCAoY2F0LnR5cGUpIHtcbiAgICBjYXNlIFwiYmlnIHN0cmV0Y2hcIjpcbiAgICAgIHN1ZmZpeCA9IFwiY2F0LXR3b1wiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImRvd253YXJkIGNhdFwiOlxuICAgICAgc3VmZml4ID0gXCJjYXQtdGhyZWVcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJzdHVmZiBzdHJ1dHRlclwiOlxuICAgICAgc3VmZml4ID0gXCJjYXQtZm91clwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInF1YXNpIGxvYWZcIjpcbiAgICAgIHN1ZmZpeCA9IFwiY2F0LWZpdmVcIjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBzdWZmaXggPSBcIlwiO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIGAke3ByZWZpeH0gJHtzdWZmaXh9YDtcbn1cblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IGNyZWF0ZVBsYXllckdhbWVCb2FyZCgpO1xuICBjb25zdCBjb21wQm9hcmQgPSBjcmVhdGVDb21wR2FtZUJvYXJkKCk7XG4gIHBvcHVsYXRlRGlzcGxheShwbGF5ZXJCb2FyZCwgY29tcEJvYXJkKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGRyZW4oZWxlbWVudCkge1xuICB3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFyUGFnZSgpIHtcbiAgY3VycmVudFBsYXllckJvYXJkID0gMDtcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHNldFNocmlua1NjYWxlKTtcbiAgcGxheWVyQm9hcmRDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hyaW5rJyk7XG4gIHJlbW92ZUNoaWxkcmVuKHBsYXllckJvYXJkQ29udGFpbmVyKTtcbiAgcmVtb3ZlQ2hpbGRyZW4oY29tcEJvYXJkQ29udGFpbmVyKTtcbiAgcmVtb3ZlQ2hpbGRyZW4oY2F0VHJhY2tlckNvbnRhaW5lcik7XG4gIGNhdFRyYWNrZXJDb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xufVxuXG5mdW5jdGlvbiBlbmRHYW1lU2NyZWVuKG1lc3NhZ2UpIHtcbiAgY29uc3Qgc2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2NyZWVuLmNsYXNzTGlzdC5hZGQoXCJlbmQtZ2FtZVwiKTtcbiAgY29uc3QgZW5kTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGVuZE1lc3NhZ2UuY2xhc3NMaXN0LmFkZChcImVuZC1tZXNzYWdlXCIpO1xuICBlbmRNZXNzYWdlLnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgY29uc3QgcGxheUFnYWluQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgcGxheUFnYWluQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJwbGF5LWFnYWluLWJ1dHRvblwiKTtcbiAgcGxheUFnYWluQnV0dG9uLnRleHRDb250ZW50ID0gXCJwbGF5IGFnYWluXCI7XG4gIHBsYXlBZ2FpbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHNjcmVlbi5yZW1vdmUoKTtcbiAgICBjbGVhclBhZ2UoKTtcbiAgICBzdGFydEdhbWUoKTtcbiAgfSk7XG4gIHNjcmVlbi5hcHBlbmQoZW5kTWVzc2FnZSwgcGxheUFnYWluQnV0dG9uKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JlZW4pO1xufVxuXG5jb25zdCBsb3NlTWVzc2FnZXMgPSBbXG4gICdBdyBzaHVja3MhIEF0IHRoaXMgcmF0ZSBEci4gVmV0bWFuIGlzIGdvaW5nIHRvIGNhbGwgS1BTIChLaXR0eSBQcm90ZWN0aXZlIFNlcnZpY2VzKS4nLFxuICAnT2ggd2VsbCEgTW9yZSB0byBsb3ZlLCByaWdodD8nLFxuICAnU29kaXVtIG92ZXJsb2FkISBCZXR0ZXIgbHVjayBuZXh0IHRpbWUuJyxcbiAgJ1lvdSBsb3NlISBIb3cgaW4gdGhlIHdvcmxkIGRvIHlvdXIgY2F0cyBlYXQgc28gbWFueSBjaGVlc2UgYmFsbHMgYW55d2F5PycsXG4gICdXZWxwISBUaGVyZSBnb2VzIHlvdXIgY2F0c1xcJyBkaWV0cyEnLCBcbiAgJ0htbSwgSSB3b25kZXIgaG93IG11Y2ggaXQgaXMgZm9yIG9uZSBvZiB0aG9zZSBjYXQgdHJlYWRtaWxscy4uLicsXG4gICdUaGV5XFwncmUgbm90IGZhdCEgVGhleSBqdXN0IGhhdmUgYSBsb3Qgb2YgZnVyISdcbl07XG5cbmNvbnN0IHdpbk1lc3NhZ2VzID0gW1xuICAnQ29uZ3JhdHMhIFlvdXIgY2F0cyBhcmUgbG9va2luZyBUSElOIGNvbXBhcmVkIHRvIHlvdXIgbmVpZ2hib3JcXCdzJyxcbiAgJ0RyLiBWZXRtYW4gaGFzIGJpZ2dlciBjYXRzIHRvIHdvcnJ5IGFib3V0IG5vdyEnLFxuICAnWWVlaGF3ISBNYXliZSBuZXh0IHRpbWUgeW91ciBuZWlnaGJvciB3aWxsIHRoaW5rIHR3aWNlIScsXG4gICdOaWNlIGFpbSEgWW91IG11c3RcXCd2ZSB0aHJvd24gY2hlZXNlIGJhbGxzIGJlZm9yZSEnLFxuICAnVGhpcyBtaWdodCBiZSB5b3VyIGdyZWF0ZXN0IGFjY29tcGxpc2htZW50LicsXG4gICdWaWN0b3J5ISBCdXQgc2VyaW91c2x5LCB0b28gbWFueSBjaGVlc2UgYmFsbHMgaXMgcHJvYmFibHkgcHJldHR5IGJhZCBmb3IgY2F0cy4nLFxuICAnV2lubmVyLCB3aW5uZXIsIGtpdHR5IGRpbm5lciEnXG5dO1xuZnVuY3Rpb24gY29tcFJldGFsaWF0aW9uKHBsYXllckJvYXJkKSB7XG4gIGNvbnN0IHRhcmdldCA9IGNvbXBGaXJlU2hvdChwbGF5ZXJCb2FyZCk7XG4gIHBsYXllckJvYXJkLnRha2VBdHRhY2sodGFyZ2V0KTtcbiAgY29uc3QgZGF0YUlEID0gYFtkYXRhLWNvb3JkPScke3RhcmdldH0nXWA7XG4gIGNvbnN0IGRvbUNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRhdGFJRCk7XG4gIGFwcGx5SGl0SW1hZ2UoZG9tQ2VsbCwgcGxheWVyQm9hcmQsIHRhcmdldCk7XG4gIGlmIChwbGF5ZXJCb2FyZC5jaGVja0ZvcldpbigpKSB7XG4gICAgZW5kR2FtZVNjcmVlbihsb3NlTWVzc2FnZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbG9zZU1lc3NhZ2VzLmxlbmd0aCldKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wR2FtZUJvYXJkRGlzcGxheShib2FyZERhdGEsIG9wcEJvYXJkRGF0YSkge1xuICBjb25zdCBjb21wQm9hcmREaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29tcEJvYXJkRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwiY29tcC1ib2FyZFwiKTtcblxuICBmb3IgKGNvbnN0IGNvb3JkIG9mIE9iamVjdC52YWx1ZXMoYm9hcmREYXRhLmJvYXJkKSkge1xuICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbiAgICBjZWxsLmRhdGFzZXQuY29tcENvb3JkID0gY29vcmQuY29vcmRpbmF0ZXM7XG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaWYgKCFjb29yZC5hdHRhY2tlZCkge1xuICAgICAgICBib2FyZERhdGEudGFrZUF0dGFjayhjb29yZC5jb29yZGluYXRlcyk7XG4gICAgICAgIGFwcGx5SGl0SW1hZ2UoY2VsbCwgYm9hcmREYXRhLCBjb29yZC5jb29yZGluYXRlcyk7XG4gICAgICAgIGlmIChjb29yZC5vY2N1cGllZEJ5KSB7XG4gICAgICAgICAgaWYgKGNvb3JkLm9jY3VwaWVkQnkuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhdCA9IGNvb3JkLm9jY3VwaWVkQnk7XG4gICAgICAgICAgICBjYXQuZG9tRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgY2F0LmNvb3JkSGl0LmZvckVhY2goKHNwb3QpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZG9tRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgIGBbZGF0YS1jb21wLWNvb3JkPScke3Nwb3R9J11gXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRvbUVsLmNsYXNzTGlzdC5hZGQoXCJjb25zdW1lXCIpO1xuICAgICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoYm9hcmREYXRhLmNoZWNrRm9yV2luKCkpIHtcbiAgICAgICAgICAgICAgZW5kR2FtZVNjcmVlbih3aW5NZXNzYWdlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB3aW5NZXNzYWdlcy5sZW5ndGgpXSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29tcFJldGFsaWF0aW9uKG9wcEJvYXJkRGF0YSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29tcEJvYXJkRGlzcGxheS5hcHBlbmRDaGlsZChjZWxsKTtcbiAgfVxuICBjb21wQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY29tcEJvYXJkRGlzcGxheSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllckdhbWVCb2FyZERpc3BsYXkocGxheWVyQm9hcmREYXRhLCBjb21wQm9hcmREYXRhKSB7XG4gIGN1cnJlbnRQbGF5ZXJCb2FyZCA9IHBsYXllckJvYXJkRGF0YTtcbiAgY29uc3QgcGxheWVyQm9hcmREaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcGxheWVyQm9hcmREaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItYm9hcmRcIik7XG4gIHBsYXllckJvYXJkRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwiY2F0LW9uZVwiKTtcbiAgZm9yIChjb25zdCBjb29yZCBvZiBPYmplY3QudmFsdWVzKHBsYXllckJvYXJkRGF0YS5ib2FyZCkpIHtcbiAgICBjb25zdCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzcG90LmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGxcIik7XG4gICAgc3BvdC5kYXRhc2V0LmNvb3JkID0gY29vcmQuY29vcmRpbmF0ZXM7XG4gICAgc3BvdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudENhdCA9IHBsYXllckJvYXJkRGF0YS5nZXRDdXJyZW50Q2F0KCk7XG4gICAgICBpZiAoY3VycmVudENhdCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgY29uc3QgY29vcmRBcnJheSA9IHBsYXllckJvYXJkRGF0YS5nZXRDb29yZGluYXRlcyhcbiAgICAgICAgY29vcmQuY29vcmRpbmF0ZXMsXG4gICAgICAgIGN1cnJlbnRDYXRcbiAgICAgICk7XG4gICAgICBpZiAoY29vcmRBcnJheSkge1xuICAgICAgICBwbGF5ZXJCb2FyZERhdGEucGxhY2VDYXQoY29vcmRBcnJheSwgY3VycmVudENhdCk7XG4gICAgICAgIHBsYXllckJvYXJkRGF0YS5jYXRBZGRlZCgpO1xuICAgICAgICBwbGF5ZXJCb2FyZERpc3BsYXkuY2xhc3NOYW1lID0gaG92ZXJFZmZlY3QoY3VycmVudENhdCk7XG4gICAgICAgIHBsYXllckJvYXJkQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdwbGF5ZXItYm9hcmQtY29udGFpbmVyJztcbiAgICAgICAgc3BvdC5hcHBlbmRDaGlsZChhZGRDYXRJbWcoY3VycmVudENhdCkpO1xuICAgICAgICBpZiAoY3VycmVudENhdC50eXBlID09PSBcImNvbXBhY3Qga2l0dHlcIikge1xuICAgICAgICAgIHBsYXllckJvYXJkQ29udGFpbmVyLnJlbW92ZUNoaWxkKHJvdGF0ZUJ1dHRvbik7XG4gICAgICAgICAgcGxheWVyQm9hcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInNocmlua1wiKTtcbiAgICAgICAgICBjb21wQm9hcmRDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICAgIGNyZWF0ZUNvbXBHYW1lQm9hcmREaXNwbGF5KGNvbXBCb2FyZERhdGEsIHBsYXllckJvYXJkRGF0YSk7XG4gICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgXCItLXNocmluay1zY2FsZVwiLFxuICAgICAgICAgICAgYG1pbigxLCAke3Nocmlua1NpemUoKX0pYFxuICAgICAgICAgICk7XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgc2V0U2hyaW5rU2NhbGUpO1xuICAgICAgICAgIGNhdFRyYWNrZXJDb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICAgIGNvbXBCb2FyZERhdGEuY29tcFBsYWNlQ2F0cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcGxheWVyQm9hcmREaXNwbGF5LmFwcGVuZENoaWxkKHNwb3QpO1xuICB9XG4gIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllckJvYXJkRGlzcGxheSk7XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlRGlzcGxheShwbGF5ZXJCb2FyZERhdGEsIGNvbXBCb2FyZERhdGEpIHtcbiAgY29uc3QgY2F0VHJhY2tlciA9IGNyZWF0ZUNhdFRyYWNrZXIoKTtcbiAgY2F0VHJhY2tlckNvbnRhaW5lci5hcHBlbmQoY2F0VHJhY2tlcik7XG4gIGFwcGVuZENhdEltYWdlcygpO1xuICBjcmVhdGVQbGF5ZXJHYW1lQm9hcmREaXNwbGF5KHBsYXllckJvYXJkRGF0YSwgY29tcEJvYXJkRGF0YSk7XG4gIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHJvdGF0ZUJ1dHRvbik7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICBpZiAoZS5rZXkgPT09IFwiU2hpZnRcIikge1xuICAgIHJvdGF0ZUNhdCgpO1xuICB9XG59KTtcblxuZXhwb3J0IHsgc3RhcnRHYW1lIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVDYXRzIH0gZnJvbSAnLi9jYXQnO1xuaW1wb3J0IHsgYWRkQ2F0SW1nIH0gZnJvbSAnLi9jYXRJbWcnO1xuXG5jb25zdCBwbGFjZSA9IChzdGF0ZSkgPT4gKHtcbiAgcGxhY2VDYXQ6IChjb29yZGluYXRlcywgY2F0KSA9PiB7XG4gICAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgc3RhdGUuYm9hcmRbYFske2Nvb3JkaW5hdGV9XWBdLm9jY3VwaWVkQnkgPSBjYXQ7XG4gICAgfSk7XG4gIH0sXG59KTtcblxuY29uc3QgcmVjZWl2ZUF0dGFjayA9IChzdGF0ZSkgPT4gKHtcbiAgdGFrZUF0dGFjazogKGNvb3JkKSA9PiB7XG4gICAgY29uc3QgY2VsbCA9IHN0YXRlLmJvYXJkW2BbJHtjb29yZH1dYF07XG4gICAgaWYgKGNlbGwuYXR0YWNrZWQpIHJldHVybjtcbiAgICBpZiAoY2VsbC5vY2N1cGllZEJ5KSB7XG4gICAgICBjZWxsLm9jY3VwaWVkQnkuaGl0KGNvb3JkKTtcbiAgICB9XG4gICAgY2VsbC5hdHRhY2tlZCA9IHRydWU7XG4gIH0sXG59KTtcblxuY29uc3QgY29vcmRJbnZhbGlkID0gKHN0YXRlKSA9PiAoe1xuICBjb29yZGluYXRlc0FyZUludmFsaWQ6IChhcnJheSkgPT5cbiAgICBhcnJheS5mbGF0KCkuc29tZSgoaXRlbSkgPT4gaXRlbSA8IDAgfHwgaXRlbSA+IDkpIHx8XG4gICAgYXJyYXkuc29tZSgoaXRlbSkgPT4gc3RhdGUuYm9hcmRbYFske2l0ZW19XWBdLm9jY3VwaWVkQnkpLFxufSk7XG5cbmNvbnN0IGdldENvb3JkID0gKHN0YXRlKSA9PiAoe1xuICBnZXRDb29yZGluYXRlczogKGNvb3JkLCBjYXQpID0+IHtcbiAgICBjb25zdCBhcnJheSA9IFtdO1xuICAgIGNvbnN0IFt4LCB5XSA9IGNvb3JkO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2F0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoY2F0Lm9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgYXJyYXkucHVzaChbeCwgeSArIGldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5LnB1c2goW3ggKyBpLCB5XSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzdGF0ZS5jb29yZGluYXRlc0FyZUludmFsaWQoYXJyYXkpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gYXJyYXk7XG4gIH0sXG59KTtcblxuY29uc3QgdHJhY2tDYXRzQWRkZWQgPSAoc3RhdGUpID0+ICh7XG4gIGNhdEFkZGVkOiAoKSA9PiB7XG4gICAgc3RhdGUuY2F0c0FkZGVkICs9IDE7XG4gIH1cbn0pO1xuXG5jb25zdCBjdXJyZW50Q2F0ID0gKHN0YXRlKSA9PiAoe1xuICBnZXRDdXJyZW50Q2F0OiAoKSA9PiB7XG4gICAgaWYgKHN0YXRlLmNhdHNBZGRlZCA+PSA1KSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gc3RhdGUuY2F0c1tzdGF0ZS5jYXRzQWRkZWRdO1xuICB9XG59KVxuXG5jb25zdCBjZWxsQXNzZXNzbWVudCA9IChzdGF0ZSkgPT4gKHtcbiAgZGV0ZXJtaW5lUmVhbEVzdGF0ZTogKHsgbGVuZ3RoLCBvcmllbnRhdGlvbiB9KSA9PiB7XG4gICAgY29uc3QgbGltaXQgPSAxMCAtIGxlbmd0aDtcbiAgICBjb25zdCBhcnJheSA9IFtdO1xuICAgIGxldCB4ID0gMTA7XG4gICAgbGV0IHkgPSAxMDtcbiAgICBpZiAob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgeSA9IGxpbWl0O1xuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gbGltaXQ7XG4gICAgfVxuICAgIGZvciAobGV0IGggPSAwOyBoIDwgeDsgaCsrKSB7XG4gICAgICBmb3IgKGxldCB2ID0gMDsgdiA8IHk7IHYrKykge1xuICAgICAgICBhcnJheS5wdXNoKFtoLCB2XSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGFycmF5TWludXNPdmVybGFwID0gYXJyYXkuZmlsdGVyKChjZWxsKSA9PlxuICAgICAgc3RhdGUuZ2V0Q29vcmRpbmF0ZXMoY2VsbCwgeyBsZW5ndGgsIG9yaWVudGF0aW9uIH0pXG4gICAgKTtcbiAgICByZXR1cm4gYXJyYXlNaW51c092ZXJsYXA7XG4gIH0sXG59KTtcblxuZnVuY3Rpb24gcmFuZG9tSW5kZXgoYXJyYXkpIHtcbiAgcmV0dXJuIGFycmF5W01hdGguZmxvb3IoYXJyYXkubGVuZ3RoICogTWF0aC5yYW5kb20oKSldO1xufVxuXG5jb25zdCBjb21wdXRlclBsYWNlQ2F0cyA9IChzdGF0ZSkgPT4gKHtcbmNvbXBQbGFjZUNhdHM6ICgpID0+IHtcbiAgc3RhdGUuY2F0cy5mb3JFYWNoKChjYXQpID0+IHtcbiAgICBjYXQucmFuZG9taXplT3JpZW50YXRpb24oKTtcbiAgICBjb25zdCBwb3RlbnRpYWxQbGFjZW1lbnRzID0gc3RhdGUuZGV0ZXJtaW5lUmVhbEVzdGF0ZShjYXQpO1xuICAgIGNvbnN0IHRhcmdldFNwYWNlID0gcmFuZG9tSW5kZXgocG90ZW50aWFsUGxhY2VtZW50cyk7XG4gICAgY29uc3QgYXJyYXlPZkNvb3JkID0gc3RhdGUuZ2V0Q29vcmRpbmF0ZXMoXG4gICAgICB0YXJnZXRTcGFjZSxcbiAgICAgIGNhdFxuICAgICk7XG4gICAgc3RhdGUucGxhY2VDYXQoYXJyYXlPZkNvb3JkLCBjYXQpO1xuICAgIGNvbnN0IGRvbVNwb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb21wLWNvb3JkPScke3RhcmdldFNwYWNlfSdgKTtcbiAgICBjb25zdCBjYXRJbWcgPSBhZGRDYXRJbWcoY2F0KTtcbiAgICBjYXRJbWcuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgZG9tU3BvdC5hcHBlbmRDaGlsZChjYXRJbWcpO1xuICAgIGNhdC5zZXREb21FbGVtZW50KGNhdEltZyk7XG4gIH0pO1xufVxufSlcblxuZnVuY3Rpb24gY3JlYXRlU3BvdCh4LCB5KSB7XG4gIHJldHVybiB7XG4gICAgY29vcmRpbmF0ZXM6IFt4LCB5XSxcbiAgICBvY2N1cGllZEJ5OiBudWxsLFxuICAgIGF0dGFja2VkOiBmYWxzZSxcbiAgfTtcbn1cblxuY29uc3Qgd2luQ2hlY2sgPSAoc3RhdGUpID0+ICh7XG4gIGNoZWNrRm9yV2luOiAoKSA9PiBzdGF0ZS5jYXRzLmV2ZXJ5KChjYXQpID0+IGNhdC5pc1N1bmsoKSksXG59KTtcblxuZnVuY3Rpb24gY3JlYXRlR2FtZUJvYXJkKCkge1xuICBjb25zdCBnYW1lQm9hcmQgPSB7fTtcbiAgZ2FtZUJvYXJkLmJvYXJkID0ge307XG4gIGdhbWVCb2FyZC5jYXRzID0gY3JlYXRlQ2F0cygpO1xuICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5ICs9IDEpIHtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4ICs9IDEpIHtcbiAgICAgIGdhbWVCb2FyZC5ib2FyZFtgWyR7eH0sJHt5fV1gXSA9IGNyZWF0ZVNwb3QoeCwgeSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgIGdhbWVCb2FyZCxcbiAgICBwbGFjZShnYW1lQm9hcmQpLFxuICAgIHJlY2VpdmVBdHRhY2soZ2FtZUJvYXJkKSxcbiAgICBjb29yZEludmFsaWQoZ2FtZUJvYXJkKSxcbiAgICBnZXRDb29yZChnYW1lQm9hcmQpLFxuICAgIHdpbkNoZWNrKGdhbWVCb2FyZCksXG4gICk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllckdhbWVCb2FyZCgpIHtcbiAgY29uc3QgZ2FtZUJvYXJkID0gY3JlYXRlR2FtZUJvYXJkKCk7XG4gIGdhbWVCb2FyZC5jb21wID0gZmFsc2U7XG4gIGdhbWVCb2FyZC5jYXRzQWRkZWQgPSAwO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihnYW1lQm9hcmQsIHRyYWNrQ2F0c0FkZGVkKGdhbWVCb2FyZCksIGN1cnJlbnRDYXQoZ2FtZUJvYXJkKSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXBHYW1lQm9hcmQoKSB7XG4gIGNvbnN0IGdhbWVCb2FyZCA9IGNyZWF0ZUdhbWVCb2FyZCgpO1xuICBnYW1lQm9hcmQuY29tcCA9IHRydWU7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKGdhbWVCb2FyZCwgY2VsbEFzc2Vzc21lbnQoZ2FtZUJvYXJkKSwgY29tcHV0ZXJQbGFjZUNhdHMoZ2FtZUJvYXJkKSk7O1xufVxuXG5leHBvcnQgeyBjcmVhdGVQbGF5ZXJHYW1lQm9hcmQsIGNyZWF0ZUNvbXBHYW1lQm9hcmQsIGNyZWF0ZUdhbWVCb2FyZCB9O1xuIiwiaW1wb3J0IHsgc3RhcnRHYW1lIH0gZnJvbSAnLi9kb20nXG5cbmNvbnN0IG9wZW5pbmdTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3BlbmluZy1zY3JlZW4nKTtcbmNvbnN0IGJlZ2luQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJlZ2luLWJ1dHRvbicpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KCkge1xuICBiZWdpbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBiZWdpbkJ1dHRvbi5zdHlsZS50cmFuc2l0aW9uID0gJzVzJztcbiAgICBiZWdpbkJ1dHRvbi5zdHlsZS5zY2FsZSA9IDUwO1xuICAgIG9wZW5pbmdTY3JlZW4uc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKG9wZW5pbmdTY3JlZW4pXG4gICAgfSwgMTUwMCk7XG4gIH0pXG4gIHN0YXJ0R2FtZSgpO1xufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ZvbnQvY29tZm9ydGFhLXZhcmlhYmxlZm9udF93Z2h0LXdlYmZvbnQud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2ZvbnQvY29tZm9ydGFhLXZhcmlhYmxlZm9udF93Z2h0LXdlYmZvbnQud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4vaW1nL2dycmFzcy5qcGVnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi9pbWcvcGV4ZWxzLXBpeG1pa2UtNDEzMTk1LmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJjb21meVxcXCI7XFxuICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLFxcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXFxuOnJvb3Qge1xcbiAgLS1iYWNrZ3JvdW5kOiAjMjgyYTM2O1xcbiAgLS1ib2FyZC1zaXplOiBtaW4oNjB2dywgNTAwcHgpO1xcbiAgLS1jZWxsLXNpemU6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgLyAxMCk7XFxuICAtLWxvZ28tYmFsbC1zaXplOiA3NXB4O1xcbiAgLS1zaHJpbmstc2NhbGU6IDE7XFxuICAtLW1hcmdpbjogY2FsYygoMTAwdncgLSB2YXIoLS1ib2FyZC1zaXplKSkgLyAyKTtcXG4gIC0tc2hydW5rLWJvYXJkOiBjYWxjKHZhcigtLWJvYXJkLXNpemUpICogdmFyKC0tc2hyaW5rLXNjYWxlKSk7XFxuICAvKiAtLWNhdC10cmFja2VyLXNpemU6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiAwLjQpOyAqL1xcbiAgLS1jYXQtdHJhY2tlci1wYWRkaW5nOiAxMHB4O1xcbiAgLS1jYXQtdHJhY2tlci13aWR0aDogY2FsYyhcXG4gICAgbWluKChjYWxjKHZhcigtLW1hcmdpbikgKiAwLjk1KSksIDIwMHB4KSAtICh2YXIoLS1jYXQtdHJhY2tlci1wYWRkaW5nKSAqIDIpXFxuICApO1xcbiAgLS1jYXQtdHJhY2tlci1oZWlnaHQ6IGNhbGModmFyKHZhcigtLWNhdC10cmFja2VyLXdpZHRoKSAqICg0IC8gNSkpKTtcXG4gIC0tY2F0LXRyYWNrZXItY2VsbDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci13aWR0aCkgLyA1KTtcXG4gIC0tbWFyZ2luLXRvcDogY2FsYygoKDEwMHZoIC0gMTAwcHgpIC0gdmFyKC0tYm9hcmQtc2l6ZSkpICogMC41KTtcXG59XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogY29tZnksIFZlcmRhbmEsIEdlbmV2YSwgVGFob21hLCBzYW5zLXNlcmlmO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IDEwMHB4IDFmciAvIDFmciAxZnIgMWZyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIC8qIGp1c3RpZnktaXRlbXM6IGNlbnRlcjsgKi9cXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXG4gIGhlaWdodDogMTAwdmg7XFxuICB3aWR0aDogMTAwdnc7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fICsgXCIpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogNDAwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5vcGVuaW5nLXNjcmVlbiB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICB6LWluZGV4OiAxMDtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gKyBcIik7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1zaXplOiAxMDBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgdHJhbnNpdGlvbjogMnM7XFxufVxcblxcbi5vcGVuaW5nLXNjcmVlbiBwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyODJhMzZiYztcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICB3aWR0aDogMzAwcHg7XFxuICBwYWRkaW5nOiAzMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcXG59XFxuXFxuQGtleWZyYW1lcyBib3VuY2Uge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zbGF0ZTogMDtcXG4gIH1cXG4gIHRvIHtcXG4gICAgdHJhbnNsYXRlOiAwcHggLTEwcHg7XFxuICB9XFxufVxcblxcbi5vcGVuaW5nLXNjcmVlbiBidXR0b24ge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGJvdW5jZTtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMnM7XFxuICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcXG4gIGFuaW1hdGlvbi1kaXJlY3Rpb246IGFsdGVybmF0ZTtcXG4gIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHdpZHRoOiAxNTBweDtcXG4gIGhlaWdodDogMTUwcHg7XFxuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoaHNsKDM5LCAxMDAlLCA1OCUpLCBoc2woMzksIDEwMCUsIDUwJSkpO1xcbiAgY3Vyc29yOiBncmFiO1xcbiAgdHJhbnNpdGlvbjogMC4zcztcXG59XFxuXFxuLm9wZW5pbmctc2NyZWVuIGJ1dHRvbjpob3ZlcixcXG4ucGxheS1hZ2Fpbi1idXR0b246aG92ZXIge1xcbiAgYW5pbWF0aW9uOiBub25lO1xcbiAgc2NhbGU6IDAuOTtcXG59XFxuXFxuLm9wZW5pbmctc2NyZWVuIGJ1dHRvbjphY3RpdmUsXFxuLnBsYXktYWdhaW4tYnV0dG9uOmFjdGl2ZSB7XFxuICBzY2FsZTogMC44O1xcbn1cXG5cXG4udGl0bGUge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAtMTtcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIGhlaWdodDogdmFyKC0tbG9nby1iYWxsLXNpemUpO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyIDFmcjtcXG59XFxuXFxuLnRpdGxlIC5iYWxsOm50aC1jaGlsZCg0KSB7XFxuICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDI7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuXFxuLnRpdGxlIC5iYWxsOm50aC1jaGlsZCgzKSB7XFxuICBncmlkLWFyZWE6IDEgLyAyIC8gMiAvIDM7XFxufVxcblxcbi50aXRsZSAuYmFsbDpudGgtY2hpbGQoMikge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMyAvIDIgLyA0O1xcbn1cXG5cXG4udGl0bGUgLmJhbGw6bnRoLWNoaWxkKDEpIHtcXG4gIGdyaWQtYXJlYTogMSAvIDQgLyAyIC8gNTtcXG59XFxuXFxuLmJhbGwge1xcbiAgYm94LXNoYWRvdzogMXB4IDFweCA4cHggcmdiKDI1NSwgMTQwLCAwKTtcXG4gIG1hcmdpbi1sZWZ0OiBjYWxjKHZhcigtLWxvZ28tYmFsbC1zaXplKSAqIC0wLjUpO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBoZWlnaHQ6IHZhcigtLWxvZ28tYmFsbC1zaXplKTtcXG4gIHdpZHRoOiB2YXIoLS1sb2dvLWJhbGwtc2l6ZSk7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoaHNsKDM5LCAxMDAlLCA1OCUpLCBoc2woMzksIDEwMCUsIDUwJSkpO1xcbn1cXG5cXG4ud29yZHMge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAtMTtcXG59XFxuaDEge1xcbiAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lciB7XFxuICBncmlkLWFyZWE6IDIgLyAyIC8gMyAvIDM7XFxuICB0cmFuc2l0aW9uOiAwLjNzO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgd2lkdGg6IG1pbi1jb250ZW50O1xcbiAgaGVpZ2h0OiBtaW4tY29udGVudDtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcXG4gIHotaW5kZXg6IDM7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQsXFxuLmNvbXAtYm9hcmQge1xcbiAgLyogYm94LXNpemluZzogYm9yZGVyLWJveDsgKi9cXG4gIHdpZHRoOiB2YXIoLS1ib2FyZC1zaXplKTtcXG4gIGhlaWdodDogdmFyKC0tYm9hcmQtc2l6ZSk7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDEwLCBhdXRvKSAvIHJlcGVhdCgxMCwgYXV0byk7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fICsgXCIpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogdmFyKC0tY2VsbC1zaXplKSB2YXIoLS1jZWxsLXNpemUpO1xcbn1cXG5cXG4uZ3JpZC1jZWxsIHtcXG4gIHotaW5kZXg6IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYm9yZGVyOiAwLjVweCBzb2xpZCByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMTY0KTtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5jb21wLWJvYXJkIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggNTBweCByZ2IoMjU1LCAxMjMsIDApO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxufVxcblxcbi5jb21wLWJvYXJkIC5ncmlkLWNlbGw6YWN0aXZlOjphZnRlciB7XFxuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDUwcHggMTBweCByZ2IoMjU1LCAxMjMsIDApO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQ2Mik7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuY2F0LW9uZSAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNSk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQtY29udGFpbmVyLmhvcml6b250YWxcXG4gIC5wbGF5ZXItYm9hcmQuY2F0LW9uZVxcbiAgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmNhdC10d28gLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDQpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5ob3Jpem9udGFsXFxuICAucGxheWVyLWJvYXJkLmNhdC10d29cXG4gIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtdGhyZWUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5ob3Jpem9udGFsXFxuICAucGxheWVyLWJvYXJkLmNhdC10aHJlZVxcbiAgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmNhdC1mb3VyIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyLFxcbi5wbGF5ZXItYm9hcmQuY2F0LWZpdmUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5ob3Jpem9udGFsXFxuICAucGxheWVyLWJvYXJkLmNhdC1mb3VyXFxuICAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlcixcXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5ob3Jpem9udGFsXFxuICAucGxheWVyLWJvYXJkLmNhdC1maXZlXFxuICAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQtY29udGFpbmVyLnNocmluayB7XFxuICBzY2FsZTogdmFyKC0tc2hyaW5rLXNjYWxlKTtcXG4gIHRyYW5zbGF0ZTogY2FsYygodmFyKC0tbWFyZ2luKSArIHZhcigtLXNocnVuay1ib2FyZCkpICogLTAuNSk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQtY29udGFpbmVyLnNocmluazpob3ZlciB7XFxuICBzY2FsZTogMC43NTtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4uY2F0LWltZyB7XFxuICB0cmFuc2l0aW9uOiAwLjNzO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAzcHg7XFxuICByb3RhdGU6IC05MGRlZztcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbi5jYXQxIHtcXG4gIHJpZ2h0OiAtMTBweDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNSk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDUuNSwgNCk7XFxufVxcblxcbi5jYXQxLmhvcml6b250YWwtY2F0IHtcXG4gIHRvcDogNXB4O1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjgsIDIuNyk7XFxufVxcblxcbi5jYXQyIHtcXG4gIHRvcDogNXB4O1xcbiAgbGVmdDogLTVweDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNCk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDQuMywgMi41KTtcXG59XFxuXFxuLmNhdDIuaG9yaXpvbnRhbC1jYXQge1xcbiAgdG9wOiAtM3B4O1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDQpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLjksIDEuNyk7XFxufVxcblxcbi5jYXQzIHtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjUsIDIuNSk7XFxufVxcblxcbi5jYXQzLmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi41LCAxLjgpO1xcbn1cXG5cXG4uY2F0NCB7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMiwgMik7XFxufVxcblxcbi5jYXQ0Lmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41KTtcXG59XFxuXFxuLmNhdDUge1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIsIDEuNSk7XFxufVxcblxcbi5jYXQ1Lmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKCh2YXIoLS1jZWxsLXNpemUpICogMikpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUsIDEuMSk7XFxufVxcblxcbi5ob3Jpem9udGFsLWNhdCB7XFxuICB0b3A6IDBweDtcXG4gIGxlZnQ6IDBweDtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHJvdGF0ZTogMGRlZztcXG59XFxuXFxuLmdyaWQtY2VsbC5hdHRhY2tlZDo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDE1cHggb3JhbmdlO1xcbn1cXG5cXG4uZ3JpZC1jZWxsLmF0dGFja2VkOjpiZWZvcmUge1xcbiAgei1pbmRleDogMTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAvIDMpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLyAzKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAxNjYsIDAsIDAuNjk4KTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGluc2V0OiAwO1xcbiAgbWFyZ2luOiBhdXRvO1xcbn1cXG5cXG4uZ3JpZC1jZWxsLmF0dGFja2VkLm9jY3VwaWVkOjpiZWZvcmUge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAvIDEuNSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAvIDEuNSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7XFxuICB0cmFuc2l0aW9uOiAxcztcXG59XFxuXFxuLmdyaWQtY2VsbC5hdHRhY2tlZC5vY2N1cGllZC5jb25zdW1lOjpiZWZvcmUge1xcbiAgc2NhbGU6IDA7XFxufVxcblxcbi5yb3RhdGUtYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGhzbCgzOSwgMTAwJSwgNTAlKTtcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxuICBib3JkZXI6IG5vbmU7XFxuICB3aWR0aDogMzBweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIG1hcmdpbjogNXB4O1xcbn1cXG5cXG4ucm90YXRlLWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMzksIDEwMCUsIDYwJSk7XFxufVxcblxcbi5yb3RhdGUtYnV0dG9uOmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMzksIDEwMCUsIDcwJSk7XFxufVxcblxcbi5jb21wLWJvYXJkLWNvbnRhaW5lciB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgZ3JpZC1hcmVhOiAyIC8gMiAvIDMgLyAzO1xcbiAgd2lkdGg6IG1pbi1jb250ZW50O1xcbiAgaGVpZ2h0OiBtaW4tY29udGVudDtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBpbnNldDogMDtcXG4gIG1hcmdpbjogYXV0bztcXG59XFxuXFxuLmhpZGRlbiB7XFxuICBvcGFjaXR5OiAwO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXItY29udGFpbmVyIHtcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40MDUpO1xcbiAgcGFkZGluZzogdmFyKC0tY2F0LXRyYWNrZXItcGFkZGluZyk7XFxuICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxuICBtYXJnaW46IHZhcigtLW1hcmdpbi10b3ApIDEwcHg7XFxuICBncmlkLWFyZWE6IDIgLyAzIC8gMyAvIDQ7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbi5jYXQtdHJhY2tlciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDQsIGF1dG8pIC8gcmVwZWF0KDUsIGF1dG8pO1xcbiAgd2lkdGg6IHZhcigtLWNhdC10cmFja2VyLXdpZHRoKTtcXG4gIGhlaWdodDogdmFyKC0tY2F0LXRyYWNrZXItaGVpZ2h0KTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgZGl2IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBib3JkZXI6IDAuNXB4IHNvbGlkIHJnYmEoMTI4LCAxMjgsIDEyOCwgMC41KTtcXG4gIGhlaWdodDogdmFyKC0tY2F0LXRyYWNrZXItY2VsbCk7XFxuICB3aWR0aDogdmFyKC0tY2F0LXRyYWNrZXItY2VsbCk7XFxufVxcblxcbi5jYXQtdHJhY2tlciBkaXY6OmFmdGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xcbiAgd2lkdGg6IDQwJTtcXG4gIGhlaWdodDogNDAlO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgei1pbmRleDogMztcXG4gIGluc2V0OiAwO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IDAuNXM7XFxufVxcblxcbi5jYXQtdHJhY2tlciBkaXY6OmJlZm9yZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgei1pbmRleDogMjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjAxLCAyMDEsIDIwMSwgMC41NCk7XFxuICBvcGFjaXR5OiAwO1xcbiAgbGVmdDogMDtcXG59XFxuXFxuLmNhdC10cmFja2VyIGRpdi5jYXQtdHJhY2tlci1oaXQ6OmFmdGVyLFxcbi5jYXQtdHJhY2tlciBkaXYuY2F0LXRyYWNrZXItaGl0OjpiZWZvcmUge1xcbiAgb3BhY2l0eTogMTtcXG59XFxuXFxuLmNhdC10cmFja2VyIGRpdiBpbWcge1xcbiAgaGVpZ2h0OiB2YXIoLS1jYXQtdHJhY2tlci1jZWxsKTtcXG59XFxuXFxuLmNhdC10cmFja2VyLWZpcnN0IGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDUpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjQsIDIuNyk7XFxufVxcblxcbi5jYXQtdHJhY2tlci1zZWNvbmQgaW1nIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLWNlbGwpICogNCk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIuOSwgMS43KTtcXG59XFxuXFxuLmNhdC10cmFja2VyLXRoaXJkIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDMpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLjUsIDEuOCk7XFxufVxcblxcbi5jYXQtdHJhY2tlci1mb3VydGggaW1nIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLWNlbGwpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuNSk7XFxufVxcblxcbi5jYXQtdHJhY2tlci1maWZ0aCBpbWcge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItY2VsbCkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41LCAxLjEpO1xcbn1cXG5cXG4uZW5kLWdhbWUge1xcbiAgei1pbmRleDogMztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjgyYTM2Y2U7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuXFxuLmVuZC1tZXNzYWdlIHtcXG4gIHdpZHRoOiAzMDBweDtcXG59XFxuXFxuLnBsYXktYWdhaW4tYnV0dG9uIHtcXG4gIG1hcmdpbjogMTBweDtcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxuICBib3JkZXI6IG5vbmU7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDtcXG4gIHdpZHRoOiAxMDBweDtcXG4gIGhlaWdodDogMTAwcHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoaHNsKDM5LCAxMDAlLCA1OCUpLCBoc2woMzksIDEwMCUsIDUwJSkpO1xcbiAgY3Vyc29yOiBncmFiO1xcbiAgdHJhbnNpdGlvbjogMC4zcztcXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5MDBweCkge1xcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDg1MHB4KSB7XFxuICA6cm9vdCB7XFxuICAgIC0tc2NhbGUtc2l6ZTogMC40O1xcbiAgICAtLWJvYXJkLXNpemU6IG1pbig2MHZoLCA5MHZ3KTtcXG4gICAgLS1sb2dvLWJhbGwtc2l6ZTogNTBweDtcXG4gICAgLS1zZWNvbmQtcm93OiBjYWxjKCg5NXZoIC0gNTBweCkgKiAoMSAvICgxLjMgKyAxKSkpO1xcbiAgICAtLXRoaXJkLXJvdzogY2FsYygoOTV2aCAtIDUwcHgpICogKDEuMyAvICgxLjMgKyAxKSkpO1xcbiAgICAtLW1pbmktYm9hcmQtc2l6ZTogY2FsYyh2YXIoLS1ib2FyZC1zaXplKSAqIHZhcigtLXNjYWxlLXNpemUpKTtcXG4gICAgLS1jYXQtdHJhY2tlci13aWR0aDogY2FsYyh2YXIoLS1ib2FyZC1zaXplKSAqIDAuNCk7XFxuICB9XFxuXFxuICBib2R5IHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZTogNXZoIDFmciAxLjNmciA1MHB4LyA1MHZ3IDUwdnc7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIH1cXG5cXG4gIC50aXRsZSB7XFxuICAgIGdyaWQtYXJlYTogMSAvIDEgLyAyIC8gMztcXG4gICAgbWFyZ2luLXRvcDogMDtcXG4gIH1cXG5cXG4gIGgxIHtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgfVxcblxcbiAgLnBsYXllci1ib2FyZC1jb250YWluZXIge1xcbiAgICBncmlkLWFyZWE6IDMgLyAxIC8gNCAvIDM7XFxuICB9XFxuXFxuICAucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbmsge1xcbiAgICBzY2FsZTogdmFyKC0tc2NhbGUtc2l6ZSk7XFxuICAgIHRyYW5zbGF0ZTogMHB4XFxuICAgICAgY2FsYyhcXG4gICAgICAgIChcXG4gICAgICAgICAgICB2YXIoLS10aGlyZC1yb3cpIC0gdmFyKC0tYm9hcmQtc2l6ZSkgKyB2YXIoLS1zZWNvbmQtcm93KSArXFxuICAgICAgICAgICAgICB2YXIoLS1taW5pLWJvYXJkLXNpemUpXFxuICAgICAgICAgICkgKiAtMC41XFxuICAgICAgKTtcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICB9XFxuXFxuICAucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbms6aG92ZXIge1xcbiAgICBzY2FsZTogMC43NTtcXG4gIH1cXG5cXG4gIC5jb21wLWJvYXJkLWNvbnRhaW5lciB7XFxuICAgIG1hcmdpbi10b3A6IGF1dG87XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZ3JpZC1hcmVhOiAzIC8gMSAvIDQgLyAzO1xcbiAgfVxcblxcbiAgLmNhdC10cmFja2VyLWNvbnRhaW5lciB7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgZ3JpZC1hcmVhOiAyIC8gMiAvIDMgLyAzO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQ1MHB4KSB7XFxuICA6cm9vdCB7XFxuICAgIC0tc2NhbGUtc2l6ZTogMC41O1xcbiAgfVxcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usb0JBQW9CO0VBQ3BCOzBEQUN1RTtFQUN2RSxnQkFBZ0I7RUFDaEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLDhCQUE4QjtFQUM5Qix5Q0FBeUM7RUFDekMsc0JBQXNCO0VBQ3RCLGlCQUFpQjtFQUNqQiwrQ0FBK0M7RUFDL0MsNkRBQTZEO0VBQzdELHVEQUF1RDtFQUN2RCwyQkFBMkI7RUFDM0I7O0dBRUM7RUFDRCxtRUFBbUU7RUFDbkUsc0RBQXNEO0VBQ3RELCtEQUErRDtBQUNqRTs7QUFFQTtFQUNFLHVEQUF1RDtFQUN2RCxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxtQkFBbUI7RUFDbkIsMkJBQTJCO0VBQzNCLFNBQVM7RUFDVCxVQUFVO0VBQ1Ysa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2IsWUFBWTtFQUNaLG1EQUFvQztFQUNwQyx5QkFBeUI7RUFD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RUFDRTtJQUNFLGlCQUFpQjtFQUNuQjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJjb21meVxcXCI7XFxuICBzcmM6IHVybChcXFwiLi9mb250L2NvbWZvcnRhYS12YXJpYWJsZWZvbnRfd2dodC13ZWJmb250LndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLFxcbiAgICB1cmwoXFxcIi4vZm9udC9jb21mb3J0YWEtdmFyaWFibGVmb250X3dnaHQtd2ViZm9udC53b2ZmXFxcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5cXG46cm9vdCB7XFxuICAtLWJhY2tncm91bmQ6ICMyODJhMzY7XFxuICAtLWJvYXJkLXNpemU6IG1pbig2MHZ3LCA1MDBweCk7XFxuICAtLWNlbGwtc2l6ZTogY2FsYyh2YXIoLS1ib2FyZC1zaXplKSAvIDEwKTtcXG4gIC0tbG9nby1iYWxsLXNpemU6IDc1cHg7XFxuICAtLXNocmluay1zY2FsZTogMTtcXG4gIC0tbWFyZ2luOiBjYWxjKCgxMDB2dyAtIHZhcigtLWJvYXJkLXNpemUpKSAvIDIpO1xcbiAgLS1zaHJ1bmstYm9hcmQ6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiB2YXIoLS1zaHJpbmstc2NhbGUpKTtcXG4gIC8qIC0tY2F0LXRyYWNrZXItc2l6ZTogY2FsYyh2YXIoLS1ib2FyZC1zaXplKSAqIDAuNCk7ICovXFxuICAtLWNhdC10cmFja2VyLXBhZGRpbmc6IDEwcHg7XFxuICAtLWNhdC10cmFja2VyLXdpZHRoOiBjYWxjKFxcbiAgICBtaW4oKGNhbGModmFyKC0tbWFyZ2luKSAqIDAuOTUpKSwgMjAwcHgpIC0gKHZhcigtLWNhdC10cmFja2VyLXBhZGRpbmcpICogMilcXG4gICk7XFxuICAtLWNhdC10cmFja2VyLWhlaWdodDogY2FsYyh2YXIodmFyKC0tY2F0LXRyYWNrZXItd2lkdGgpICogKDQgLyA1KSkpO1xcbiAgLS1jYXQtdHJhY2tlci1jZWxsOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLXdpZHRoKSAvIDUpO1xcbiAgLS1tYXJnaW4tdG9wOiBjYWxjKCgoMTAwdmggLSAxMDBweCkgLSB2YXIoLS1ib2FyZC1zaXplKSkgKiAwLjUpO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBjb21meSwgVmVyZGFuYSwgR2VuZXZhLCBUYWhvbWEsIHNhbnMtc2VyaWY7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogMTAwcHggMWZyIC8gMWZyIDFmciAxZnI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLyoganVzdGlmeS1pdGVtczogY2VudGVyOyAqL1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGJhY2tncm91bmQ6IHVybChcXFwiLi9pbWcvZ3JyYXNzLmpwZWdcXFwiKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDQwMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4ub3BlbmluZy1zY3JlZW4ge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgei1pbmRleDogMTA7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXFxcIi4vaW1nL2dycmFzcy5qcGVnXFxcIik7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1zaXplOiAxMDBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgdHJhbnNpdGlvbjogMnM7XFxufVxcblxcbi5vcGVuaW5nLXNjcmVlbiBwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyODJhMzZiYztcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICB3aWR0aDogMzAwcHg7XFxuICBwYWRkaW5nOiAzMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcXG59XFxuXFxuQGtleWZyYW1lcyBib3VuY2Uge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zbGF0ZTogMDtcXG4gIH1cXG4gIHRvIHtcXG4gICAgdHJhbnNsYXRlOiAwcHggLTEwcHg7XFxuICB9XFxufVxcblxcbi5vcGVuaW5nLXNjcmVlbiBidXR0b24ge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGJvdW5jZTtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMnM7XFxuICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcXG4gIGFuaW1hdGlvbi1kaXJlY3Rpb246IGFsdGVybmF0ZTtcXG4gIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHdpZHRoOiAxNTBweDtcXG4gIGhlaWdodDogMTUwcHg7XFxuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoaHNsKDM5LCAxMDAlLCA1OCUpLCBoc2woMzksIDEwMCUsIDUwJSkpO1xcbiAgY3Vyc29yOiBncmFiO1xcbiAgdHJhbnNpdGlvbjogMC4zcztcXG59XFxuXFxuLm9wZW5pbmctc2NyZWVuIGJ1dHRvbjpob3ZlcixcXG4ucGxheS1hZ2Fpbi1idXR0b246aG92ZXIge1xcbiAgYW5pbWF0aW9uOiBub25lO1xcbiAgc2NhbGU6IDAuOTtcXG59XFxuXFxuLm9wZW5pbmctc2NyZWVuIGJ1dHRvbjphY3RpdmUsXFxuLnBsYXktYWdhaW4tYnV0dG9uOmFjdGl2ZSB7XFxuICBzY2FsZTogMC44O1xcbn1cXG5cXG4udGl0bGUge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAtMTtcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIGhlaWdodDogdmFyKC0tbG9nby1iYWxsLXNpemUpO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyIDFmcjtcXG59XFxuXFxuLnRpdGxlIC5iYWxsOm50aC1jaGlsZCg0KSB7XFxuICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDI7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuXFxuLnRpdGxlIC5iYWxsOm50aC1jaGlsZCgzKSB7XFxuICBncmlkLWFyZWE6IDEgLyAyIC8gMiAvIDM7XFxufVxcblxcbi50aXRsZSAuYmFsbDpudGgtY2hpbGQoMikge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMyAvIDIgLyA0O1xcbn1cXG5cXG4udGl0bGUgLmJhbGw6bnRoLWNoaWxkKDEpIHtcXG4gIGdyaWQtYXJlYTogMSAvIDQgLyAyIC8gNTtcXG59XFxuXFxuLmJhbGwge1xcbiAgYm94LXNoYWRvdzogMXB4IDFweCA4cHggcmdiKDI1NSwgMTQwLCAwKTtcXG4gIG1hcmdpbi1sZWZ0OiBjYWxjKHZhcigtLWxvZ28tYmFsbC1zaXplKSAqIC0wLjUpO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBoZWlnaHQ6IHZhcigtLWxvZ28tYmFsbC1zaXplKTtcXG4gIHdpZHRoOiB2YXIoLS1sb2dvLWJhbGwtc2l6ZSk7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoaHNsKDM5LCAxMDAlLCA1OCUpLCBoc2woMzksIDEwMCUsIDUwJSkpO1xcbn1cXG5cXG4ud29yZHMge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAtMTtcXG59XFxuaDEge1xcbiAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lciB7XFxuICBncmlkLWFyZWE6IDIgLyAyIC8gMyAvIDM7XFxuICB0cmFuc2l0aW9uOiAwLjNzO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgd2lkdGg6IG1pbi1jb250ZW50O1xcbiAgaGVpZ2h0OiBtaW4tY29udGVudDtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcXG4gIHotaW5kZXg6IDM7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQsXFxuLmNvbXAtYm9hcmQge1xcbiAgLyogYm94LXNpemluZzogYm9yZGVyLWJveDsgKi9cXG4gIHdpZHRoOiB2YXIoLS1ib2FyZC1zaXplKTtcXG4gIGhlaWdodDogdmFyKC0tYm9hcmQtc2l6ZSk7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDEwLCBhdXRvKSAvIHJlcGVhdCgxMCwgYXV0byk7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXFxcIi4vaW1nL3BleGVscy1waXhtaWtlLTQxMzE5NS5qcGdcXFwiKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IHZhcigtLWNlbGwtc2l6ZSkgdmFyKC0tY2VsbC1zaXplKTtcXG59XFxuXFxuLmdyaWQtY2VsbCB7XFxuICB6LWluZGV4OiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJvcmRlcjogMC41cHggc29saWQgcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjE2NCk7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnBsYXllci1ib2FyZCB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uY29tcC1ib2FyZCAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDUwcHggcmdiKDI1NSwgMTIzLCAwKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG4uY29tcC1ib2FyZCAuZ3JpZC1jZWxsOmFjdGl2ZTo6YWZ0ZXIge1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCA1MHB4IDEwcHggcmdiKDI1NSwgMTIzLCAwKTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40NjIpO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmNhdC1vbmUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5ob3Jpem9udGFsXFxuICAucGxheWVyLWJvYXJkLmNhdC1vbmVcXG4gIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA1KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtdHdvIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuaG9yaXpvbnRhbFxcbiAgLnBsYXllci1ib2FyZC5jYXQtdHdvXFxuICAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNCk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuY2F0LXRocmVlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuaG9yaXpvbnRhbFxcbiAgLnBsYXllci1ib2FyZC5jYXQtdGhyZWVcXG4gIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtZm91ciAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlcixcXG4ucGxheWVyLWJvYXJkLmNhdC1maXZlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuaG9yaXpvbnRhbFxcbiAgLnBsYXllci1ib2FyZC5jYXQtZm91clxcbiAgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIsXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuaG9yaXpvbnRhbFxcbiAgLnBsYXllci1ib2FyZC5jYXQtZml2ZVxcbiAgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbmsge1xcbiAgc2NhbGU6IHZhcigtLXNocmluay1zY2FsZSk7XFxuICB0cmFuc2xhdGU6IGNhbGMoKHZhcigtLW1hcmdpbikgKyB2YXIoLS1zaHJ1bmstYm9hcmQpKSAqIC0wLjUpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbms6aG92ZXIge1xcbiAgc2NhbGU6IDAuNzU7XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmNhdC1pbWcge1xcbiAgdHJhbnNpdGlvbjogMC4zcztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogM3B4O1xcbiAgcm90YXRlOiAtOTBkZWc7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4uY2F0MSB7XFxuICByaWdodDogLTEwcHg7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSg1LjUsIDQpO1xcbn1cXG5cXG4uY2F0MS5ob3Jpem9udGFsLWNhdCB7XFxuICB0b3A6IDVweDtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA1KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMy44LCAyLjcpO1xcbn1cXG5cXG4uY2F0MiB7XFxuICB0b3A6IDVweDtcXG4gIGxlZnQ6IC01cHg7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDQpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSg0LjMsIDIuNSk7XFxufVxcblxcbi5jYXQyLmhvcml6b250YWwtY2F0IHtcXG4gIHRvcDogLTNweDtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi45LCAxLjcpO1xcbn1cXG5cXG4uY2F0MyB7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMy41LCAyLjUpO1xcbn1cXG5cXG4uY2F0My5ob3Jpem9udGFsLWNhdCB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMyk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIuNSwgMS44KTtcXG59XFxuXFxuLmNhdDQge1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIsIDIpO1xcbn1cXG5cXG4uY2F0NC5ob3Jpem9udGFsLWNhdCB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuNSk7XFxufVxcblxcbi5jYXQ1IHtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLCAxLjUpO1xcbn1cXG5cXG4uY2F0NS5ob3Jpem9udGFsLWNhdCB7XFxuICB3aWR0aDogY2FsYygodmFyKC0tY2VsbC1zaXplKSAqIDIpKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41LCAxLjEpO1xcbn1cXG5cXG4uaG9yaXpvbnRhbC1jYXQge1xcbiAgdG9wOiAwcHg7XFxuICBsZWZ0OiAwcHg7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICByb3RhdGU6IDBkZWc7XFxufVxcblxcbi5ncmlkLWNlbGwuYXR0YWNrZWQ6OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCAxNXB4IG9yYW5nZTtcXG59XFxuXFxuLmdyaWQtY2VsbC5hdHRhY2tlZDo6YmVmb3JlIHtcXG4gIHotaW5kZXg6IDE7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLyAzKTtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpIC8gMyk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMTY2LCAwLCAwLjY5OCk7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBpbnNldDogMDtcXG4gIG1hcmdpbjogYXV0bztcXG59XFxuXFxuLmdyaWQtY2VsbC5hdHRhY2tlZC5vY2N1cGllZDo6YmVmb3JlIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLyAxLjUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLyAxLjUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xcbiAgdHJhbnNpdGlvbjogMXM7XFxufVxcblxcbi5ncmlkLWNlbGwuYXR0YWNrZWQub2NjdXBpZWQuY29uc3VtZTo6YmVmb3JlIHtcXG4gIHNjYWxlOiAwO1xcbn1cXG5cXG4ucm90YXRlLWJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMzksIDEwMCUsIDUwJSk7XFxuICBhcHBlYXJhbmNlOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgd2lkdGg6IDMwcHg7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBtYXJnaW46IDVweDtcXG59XFxuXFxuLnJvdGF0ZS1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDM5LCAxMDAlLCA2MCUpO1xcbn1cXG5cXG4ucm90YXRlLWJ1dHRvbjphY3RpdmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDM5LCAxMDAlLCA3MCUpO1xcbn1cXG5cXG4uY29tcC1ib2FyZC1jb250YWluZXIge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGdyaWQtYXJlYTogMiAvIDIgLyAzIC8gMztcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgaW5zZXQ6IDA7XFxuICBtYXJnaW46IGF1dG87XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgb3BhY2l0eTogMDtcXG59XFxuXFxuLmNhdC10cmFja2VyLWNvbnRhaW5lciB7XFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNDA1KTtcXG4gIHBhZGRpbmc6IHZhcigtLWNhdC10cmFja2VyLXBhZGRpbmcpO1xcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgbWFyZ2luOiB2YXIoLS1tYXJnaW4tdG9wKSAxMHB4O1xcbiAgZ3JpZC1hcmVhOiAyIC8gMyAvIDMgLyA0O1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCg0LCBhdXRvKSAvIHJlcGVhdCg1LCBhdXRvKTtcXG4gIHdpZHRoOiB2YXIoLS1jYXQtdHJhY2tlci13aWR0aCk7XFxuICBoZWlnaHQ6IHZhcigtLWNhdC10cmFja2VyLWhlaWdodCk7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuLmNhdC10cmFja2VyIGRpdiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYm9yZGVyOiAwLjVweCBzb2xpZCByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuNSk7XFxuICBoZWlnaHQ6IHZhcigtLWNhdC10cmFja2VyLWNlbGwpO1xcbiAgd2lkdGg6IHZhcigtLWNhdC10cmFja2VyLWNlbGwpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgZGl2OjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcXG4gIHdpZHRoOiA0MCU7XFxuICBoZWlnaHQ6IDQwJTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHotaW5kZXg6IDM7XFxuICBpbnNldDogMDtcXG4gIG1hcmdpbjogYXV0bztcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2l0aW9uOiAwLjVzO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgZGl2OjpiZWZvcmUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHotaW5kZXg6IDI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwMSwgMjAxLCAyMDEsIDAuNTQpO1xcbiAgb3BhY2l0eTogMDtcXG4gIGxlZnQ6IDA7XFxufVxcblxcbi5jYXQtdHJhY2tlciBkaXYuY2F0LXRyYWNrZXItaGl0OjphZnRlcixcXG4uY2F0LXRyYWNrZXIgZGl2LmNhdC10cmFja2VyLWhpdDo6YmVmb3JlIHtcXG4gIG9wYWNpdHk6IDE7XFxufVxcblxcbi5jYXQtdHJhY2tlciBkaXYgaW1nIHtcXG4gIGhlaWdodDogdmFyKC0tY2F0LXRyYWNrZXItY2VsbCk7XFxufVxcblxcbi5jYXQtdHJhY2tlci1maXJzdCBpbWcge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItY2VsbCkgKiA1KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMy40LCAyLjcpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXItc2Vjb25kIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDQpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLjksIDEuNyk7XFxufVxcblxcbi5jYXQtdHJhY2tlci10aGlyZCBpbWcge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItY2VsbCkgKiAzKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi41LCAxLjgpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXItZm91cnRoIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXItZmlmdGggaW1nIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLWNlbGwpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuNSwgMS4xKTtcXG59XFxuXFxuLmVuZC1nYW1lIHtcXG4gIHotaW5kZXg6IDM7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI4MmEzNmNlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmb250LXNpemU6IDJyZW07XFxufVxcblxcbi5lbmQtbWVzc2FnZSB7XFxuICB3aWR0aDogMzAwcHg7XFxufVxcblxcbi5wbGF5LWFnYWluLWJ1dHRvbiB7XFxuICBtYXJnaW46IDEwcHg7XFxuICBhcHBlYXJhbmNlOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuICB3aWR0aDogMTAwcHg7XFxuICBoZWlnaHQ6IDEwMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGhzbCgzOSwgMTAwJSwgNTglKSwgaHNsKDM5LCAxMDAlLCA1MCUpKTtcXG4gIGN1cnNvcjogZ3JhYjtcXG4gIHRyYW5zaXRpb246IDAuM3M7XFxufVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTAwcHgpIHtcXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA4NTBweCkge1xcbiAgOnJvb3Qge1xcbiAgICAtLXNjYWxlLXNpemU6IDAuNDtcXG4gICAgLS1ib2FyZC1zaXplOiBtaW4oNjB2aCwgOTB2dyk7XFxuICAgIC0tbG9nby1iYWxsLXNpemU6IDUwcHg7XFxuICAgIC0tc2Vjb25kLXJvdzogY2FsYygoOTV2aCAtIDUwcHgpICogKDEgLyAoMS4zICsgMSkpKTtcXG4gICAgLS10aGlyZC1yb3c6IGNhbGMoKDk1dmggLSA1MHB4KSAqICgxLjMgLyAoMS4zICsgMSkpKTtcXG4gICAgLS1taW5pLWJvYXJkLXNpemU6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiB2YXIoLS1zY2FsZS1zaXplKSk7XFxuICAgIC0tY2F0LXRyYWNrZXItd2lkdGg6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiAwLjQpO1xcbiAgfVxcblxcbiAgYm9keSB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGU6IDV2aCAxZnIgMS4zZnIgNTBweC8gNTB2dyA1MHZ3O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuXFxuICAudGl0bGUge1xcbiAgICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDM7XFxuICAgIG1hcmdpbi10b3A6IDA7XFxuICB9XFxuXFxuICBoMSB7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gIH1cXG5cXG4gIC5wbGF5ZXItYm9hcmQtY29udGFpbmVyIHtcXG4gICAgZ3JpZC1hcmVhOiAzIC8gMSAvIDQgLyAzO1xcbiAgfVxcblxcbiAgLnBsYXllci1ib2FyZC1jb250YWluZXIuc2hyaW5rIHtcXG4gICAgc2NhbGU6IHZhcigtLXNjYWxlLXNpemUpO1xcbiAgICB0cmFuc2xhdGU6IDBweFxcbiAgICAgIGNhbGMoXFxuICAgICAgICAoXFxuICAgICAgICAgICAgdmFyKC0tdGhpcmQtcm93KSAtIHZhcigtLWJvYXJkLXNpemUpICsgdmFyKC0tc2Vjb25kLXJvdykgK1xcbiAgICAgICAgICAgICAgdmFyKC0tbWluaS1ib2FyZC1zaXplKVxcbiAgICAgICAgICApICogLTAuNVxcbiAgICAgICk7XFxuICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgfVxcblxcbiAgLnBsYXllci1ib2FyZC1jb250YWluZXIuc2hyaW5rOmhvdmVyIHtcXG4gICAgc2NhbGU6IDAuNzU7XFxuICB9XFxuXFxuICAuY29tcC1ib2FyZC1jb250YWluZXIge1xcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGdyaWQtYXJlYTogMyAvIDEgLyA0IC8gMztcXG4gIH1cXG5cXG4gIC5jYXQtdHJhY2tlci1jb250YWluZXIge1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIGdyaWQtYXJlYTogMiAvIDIgLyAzIC8gMztcXG4gIH1cXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0NTBweCkge1xcbiAgOnJvb3Qge1xcbiAgICAtLXNjYWxlLXNpemU6IDAuNTtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTsgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG5cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBpbml0IGZyb20gJy4vaW5pdCc7XG5cbmluaXQoKTtcblxuXG4iXSwibmFtZXMiOlsiZGV0ZXJtaW5lT3JpZW50YXRpb24iLCJhcnJheSIsImFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMiLCJzdGFydCIsImJvYXJkSUQiLCJjYXQiLCJheGlzIiwiZGlyZWN0aW9uIiwiYWxsRGlyIiwieCIsInkiLCJ1cCIsInJpZ2h0IiwiZG93biIsImxlZnQiLCJzb21lIiwibnVtIiwib3BwQm9hcmRDZWxsIiwiYm9hcmQiLCJhdHRhY2tlZCIsIm9jY3VwaWVkQnkiLCJmaWx0ZXIiLCJvcHQiLCJjb21wRmlyZVNob3QiLCJvcHBvbmVudEJvYXJkIiwid291bmRlZFRhcmdldHMiLCJwb3NzaWJsZUhpdHMiLCJjYXRzIiwiZm9yRWFjaCIsImhpdHMiLCJpc1N1bmsiLCJwdXNoIiwibGVuZ3RoIiwicHJpbWFyeVRhcmdldCIsImNvb3JkSGl0Iiwib3JpZW50YXRpb24iLCJPYmplY3QiLCJrZXlzIiwiY2VsbCIsImNvb3JkaW5hdGVzIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiQ2F0IiwiY29uc3RydWN0b3IiLCJ0eXBlIiwiaGl0IiwiY29vcmQiLCJyb3RhdGUiLCJyYW5kb21pemVPcmllbnRhdGlvbiIsInNldERvbUVsZW1lbnQiLCJ0YXJnZXQiLCJkb21FbGVtZW50IiwiY3JlYXRlQ2F0cyIsImNhdDEiLCJjYXQyIiwiY2F0MyIsImNhdDQiLCJjYXQ1IiwiY3JlYXRlQ2F0SW1hZ2UiLCJzb3VyY2UiLCJjYXRJbWciLCJJbWFnZSIsInNyYyIsImFkZENhdEltZyIsImN1cnJlbnRDYXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDYXRJbWFnZXMiLCJmaXJzdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInNlY29uZCIsInRoaXJkIiwiZm91cnRoIiwiZmlmdGgiLCJhcHBlbmQiLCJyb3RhdGVJY29uIiwiY3JlYXRlUGxheWVyR2FtZUJvYXJkIiwiY3JlYXRlQ29tcEdhbWVCb2FyZCIsInBsYXllckJvYXJkQ29udGFpbmVyIiwiY29tcEJvYXJkQ29udGFpbmVyIiwiY2F0VHJhY2tlckNvbnRhaW5lciIsImN1cnJlbnRQbGF5ZXJCb2FyZCIsInJvdGF0ZUNhdCIsImdldEN1cnJlbnRDYXQiLCJ0b2dnbGUiLCJyb3RhdGVCdXR0b24iLCJjcmVhdGVFbGVtZW50Iiwicm90YXRlSW1nIiwiYXBwZW5kQ2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwiY3JlYXRlQ2F0VHJhY2tlciIsImNhdFRyYWNrZXJEaXYiLCJpZCIsImRhdGFzZXQiLCJ1cGRhdGVDYXRUcmFja2VyIiwiZG9tVGFyZ2V0IiwiYXBwbHlIaXRJbWFnZSIsImNvbXAiLCJzaHJpbmtTaXplIiwib3JpZ2luYWxTaXplIiwib2Zmc2V0V2lkdGgiLCJ3aW5kb3dXaWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJzZXRTaHJpbmtTY2FsZSIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJob3ZlckVmZmVjdCIsInByZWZpeCIsInN1ZmZpeCIsInN0YXJ0R2FtZSIsInBsYXllckJvYXJkIiwiY29tcEJvYXJkIiwicG9wdWxhdGVEaXNwbGF5IiwicmVtb3ZlQ2hpbGRyZW4iLCJlbGVtZW50IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiY2xlYXJQYWdlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbW92ZSIsInZpc2liaWxpdHkiLCJlbmRHYW1lU2NyZWVuIiwibWVzc2FnZSIsInNjcmVlbiIsImVuZE1lc3NhZ2UiLCJ0ZXh0Q29udGVudCIsInBsYXlBZ2FpbkJ1dHRvbiIsImJvZHkiLCJsb3NlTWVzc2FnZXMiLCJ3aW5NZXNzYWdlcyIsImNvbXBSZXRhbGlhdGlvbiIsInRha2VBdHRhY2siLCJkYXRhSUQiLCJkb21DZWxsIiwiY2hlY2tGb3JXaW4iLCJjcmVhdGVDb21wR2FtZUJvYXJkRGlzcGxheSIsImJvYXJkRGF0YSIsIm9wcEJvYXJkRGF0YSIsImNvbXBCb2FyZERpc3BsYXkiLCJ2YWx1ZXMiLCJjb21wQ29vcmQiLCJzcG90IiwiZG9tRWwiLCJzZXRUaW1lb3V0IiwiY3JlYXRlUGxheWVyR2FtZUJvYXJkRGlzcGxheSIsInBsYXllckJvYXJkRGF0YSIsImNvbXBCb2FyZERhdGEiLCJwbGF5ZXJCb2FyZERpc3BsYXkiLCJjb29yZEFycmF5IiwiZ2V0Q29vcmRpbmF0ZXMiLCJwbGFjZUNhdCIsImNhdEFkZGVkIiwiY2xhc3NOYW1lIiwiZGlzcGxheSIsImNvbXBQbGFjZUNhdHMiLCJjYXRUcmFja2VyIiwiZSIsImtleSIsInBsYWNlIiwic3RhdGUiLCJjb29yZGluYXRlIiwicmVjZWl2ZUF0dGFjayIsImNvb3JkSW52YWxpZCIsImNvb3JkaW5hdGVzQXJlSW52YWxpZCIsImZsYXQiLCJpdGVtIiwiZ2V0Q29vcmQiLCJpIiwidHJhY2tDYXRzQWRkZWQiLCJjYXRzQWRkZWQiLCJjZWxsQXNzZXNzbWVudCIsImRldGVybWluZVJlYWxFc3RhdGUiLCJsaW1pdCIsImgiLCJ2IiwiYXJyYXlNaW51c092ZXJsYXAiLCJyYW5kb21JbmRleCIsImNvbXB1dGVyUGxhY2VDYXRzIiwicG90ZW50aWFsUGxhY2VtZW50cyIsInRhcmdldFNwYWNlIiwiYXJyYXlPZkNvb3JkIiwiZG9tU3BvdCIsImNyZWF0ZVNwb3QiLCJ3aW5DaGVjayIsImV2ZXJ5IiwiY3JlYXRlR2FtZUJvYXJkIiwiZ2FtZUJvYXJkIiwiYXNzaWduIiwib3BlbmluZ1NjcmVlbiIsImJlZ2luQnV0dG9uIiwiaW5pdCIsInRyYW5zaXRpb24iLCJzY2FsZSIsIm9wYWNpdHkiXSwic291cmNlUm9vdCI6IiJ9