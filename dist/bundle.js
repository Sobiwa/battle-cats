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
function addPoints(oppBoard, coord, direction, max) {
  let points = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;
  const cell = oppBoard.board[`[${coord}]`];
  if (points === max - 1 || coord.some(num => num > 9 || num < 0) || cell.attacked) return points;
  const [x, y] = coord;
  let newCoord;
  switch (direction) {
    case "up":
      newCoord = [x, y + 1];
      break;
    case "right":
      newCoord = [x + 1, y];
      break;
    case "down":
      newCoord = [x, y - 1];
      break;
    case "left":
      newCoord = [x - 1, y];
      break;
    default:
      break;
  }
  return addPoints(oppBoard, newCoord, direction, max, points + 1);
}
function gradeSpot(opponentBoard, coord) {
  const lengthOfLongestCatRemaining = opponentBoard.cats.reduce((a, b) => !b.isSunk() && b.length > a ? b.length : a, 0);
  return addPoints(opponentBoard, coord, "up", lengthOfLongestCatRemaining) + addPoints(opponentBoard, coord, "right", lengthOfLongestCatRemaining) + addPoints(opponentBoard, coord, "down", lengthOfLongestCatRemaining) + addPoints(opponentBoard, coord, "left", lengthOfLongestCatRemaining);
}
;
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
    const allPossibleHits = [];
    Object.keys(opponentBoard.board).forEach(cell => {
      if (!opponentBoard.board[cell].attacked) {
        allPossibleHits.push(opponentBoard.board[cell].coordinates);
      }
    });
    let topScore = 0;
    possibleHits = allPossibleHits.reduce((a, b) => {
      const spotGrade = gradeSpot(opponentBoard, b);
      console.log(spotGrade, topScore);
      if (spotGrade > topScore) {
        topScore = spotGrade;
        return [b];
      }
      if (spotGrade === topScore) {
        a.push(b);
      }
      return a;
    }, []);
    console.log(possibleHits);
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
/* harmony export */   "appendCatImages": () => (/* binding */ appendCatImages),
/* harmony export */   "setCatAnimation": () => (/* binding */ setCatAnimation)
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
function setCatAnimation(cat) {
  let catImageSrc;
  let tag;
  switch (cat.type) {
    case 'big stretch':
      catImageSrc = _img_big_stretch_svg__WEBPACK_IMPORTED_MODULE_0__;
      tag = 'catOne';
      break;
    case 'downward cat':
      catImageSrc = _img_cat2_svg__WEBPACK_IMPORTED_MODULE_1__;
      tag = 'catTwo';
      break;
    case 'stuff strutter':
      catImageSrc = _img_walk_svg__WEBPACK_IMPORTED_MODULE_2__;
      tag = 'catThree';
      break;
    case 'quasi loaf':
      catImageSrc = _img_quasi_loaf2_svg__WEBPACK_IMPORTED_MODULE_3__;
      tag = 'catFour';
      break;
    case 'compact kitty':
      catImageSrc = _img_lesRoll_svg__WEBPACK_IMPORTED_MODULE_4__;
      tag = 'catFive';
      break;
    default:
      break;
  }
  const container = document.createElement('div');
  container.classList.add('cat-animation');
  container.classList.add(`${tag}`);
  const catImg = new Image();
  catImg.src = catImageSrc;
  container.append(catImg);
  container.classList.add(`${cat.orientation}`);
  return container;
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
/* harmony import */ var _sound_eatSound_ogg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sound/eatSound.ogg */ "./src/sound/eatSound.ogg");
/* harmony import */ var _sound_hit_ogg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sound/hit.ogg */ "./src/sound/hit.ogg");
/* harmony import */ var _sound_miss_ogg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sound/miss.ogg */ "./src/sound/miss.ogg");
/* eslint-disable no-restricted-syntax */
/* eslint-disable default-case */








const fullGameDisplay = document.querySelector('.full-game');
function playSound(src, vol) {
  const sound = new Audio(src);
  sound.volume = vol;
  sound.play();
}
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
  const board = document.querySelector(".comp-board");
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
  window.removeEventListener("resize", setShrinkScale);
  playerBoardContainer.classList.remove("shrink");
  removeChildren(playerBoardContainer);
  removeChildren(compBoardContainer);
  removeChildren(catTrackerContainer);
  catTrackerContainer.style.visibility = "hidden";
  const catAnimations = document.querySelectorAll('.cat-animation');
  catAnimations.forEach(catAni => {
    catAni.remove();
  });
}
function endGameScreen(win) {
  const loseMessages = ["Aw shucks! At this rate Dr. Vetman is going to call KPS (Kitty Protective Services)", "Oh well! More to love, right?", "Sodium overload! Better luck next time", "You lose! How in the world do your cats eat so many cheese balls anyway?", "Welp! There goes your cats' diets!", "Hmm, I wonder how much it is for one of those cat treadmills...", "They're not fat! They just have a lot of fur!"];
  const winMessages = ["Congrats! Your cats are looking THIN compared to your neighbor's", "Dr. Vetman has bigger cats to worry about now!", "Yeehaw! Maybe next time your neighbor will think twice!", "Nice aim! You must've thrown cheese balls before!", "This might be your greatest accomplishment", "Victory! But seriously, too many cheese balls is probably pretty bad for cats", "Winner, winner, kitty dinner!"];
  const array = win ? winMessages : loseMessages;
  const screen = document.createElement("div");
  screen.style.opacity = 0;
  screen.classList.add("end-game");
  const verdict = document.createElement('div');
  verdict.classList.add('verdict');
  verdict.textContent = win ? 'Player wins! :)' : 'Neighbor Wins! :(';
  const endMessage = document.createElement("div");
  endMessage.classList.add("end-message");
  endMessage.textContent = array[Math.floor(Math.random() * array.length)];
  const playAgainButton = document.createElement("button");
  playAgainButton.classList.add("play-again-button");
  playAgainButton.textContent = "play again";
  playAgainButton.addEventListener("click", () => {
    screen.remove();
    clearPage();
    startGame();
  });
  screen.append(verdict, endMessage, playAgainButton);
  document.body.appendChild(screen);
  setTimeout(() => {
    screen.style.opacity = 1;
  }, 100);
}
function passCatImgAcrossScreen(_ref) {
  let {
    type
  } = _ref;
  let targetClass;
  switch (type) {
    case 'big stretch':
      targetClass = 'catOne';
      break;
    case 'downward cat':
      targetClass = 'catTwo';
      break;
    case 'stuff strutter':
      targetClass = 'catThree';
      break;
    case 'quasi loaf':
      targetClass = 'catFour';
      break;
    case 'compact kitty':
      targetClass = 'catFive';
      break;
    default:
      break;
  }
  const targetElement = document.querySelector(`.${targetClass}`);
  targetElement.classList.add('move');
}
function compRetaliation(playerBoard) {
  const target = (0,_bot__WEBPACK_IMPORTED_MODULE_2__.compFireShot)(playerBoard);
  playerBoard.takeAttack(target);
  const cat = playerBoard.board[`[${target}]`].occupiedBy;
  if (cat && cat.isSunk()) {
    playSound(_sound_eatSound_ogg__WEBPACK_IMPORTED_MODULE_4__, 0.5);
    passCatImgAcrossScreen(cat);
  }
  const dataID = `[data-coord='${target}']`;
  const domCell = document.querySelector(dataID);
  applyHitImage(domCell, playerBoard, target);
  if (playerBoard.checkForWin()) {
    endGameScreen(false);
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
          playSound(_sound_hit_ogg__WEBPACK_IMPORTED_MODULE_5__, 0.05);
          if (coord.occupiedBy.isSunk()) {
            playSound(_sound_eatSound_ogg__WEBPACK_IMPORTED_MODULE_4__, 0.5);
            const cat = coord.occupiedBy;
            cat.domElement.classList.remove("hidden");
            cat.coordHit.forEach(spot => {
              const domEl = document.querySelector(`[data-comp-coord='${spot}']`);
              setTimeout(() => {
                domEl.classList.add("consume");
              }, 200);
            });
            if (boardData.checkForWin()) {
              endGameScreen(true);
              return;
            }
          }
        } else {
          playSound(_sound_miss_ogg__WEBPACK_IMPORTED_MODULE_6__, 0.02);
        }
        compRetaliation(oppBoardData);
      }
    });
    compBoardDisplay.appendChild(cell);
  }
  compBoardContainer.appendChild(compBoardDisplay);
}
function prepareCatAnimation(cat) {
  const ani = (0,_catImg__WEBPACK_IMPORTED_MODULE_1__.setCatAnimation)(cat);
  fullGameDisplay.append(ani);
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
        prepareCatAnimation(currentCat);
        playerBoardData.placeCat(coordArray, currentCat);
        playerBoardData.catAdded();
        playerBoardDisplay.className = hoverEffect(currentCat);
        playerBoardContainer.className = "player-board-container";
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
    const limit = 11 - length;
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
/* harmony import */ var _sound_battle_cat_theme_one_loop_mp3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sound/battle-cat-theme-one-loop.mp3 */ "./src/sound/battle-cat-theme-one-loop.mp3");
/* harmony import */ var _sound_battle_cats_theme2_mp3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sound/battle-cats-theme2.mp3 */ "./src/sound/battle-cats-theme2.mp3");



const openingScreen = document.querySelector('.opening-screen');
const beginButton = document.querySelector('.begin-button');
const themeMusic = new Audio(_sound_battle_cat_theme_one_loop_mp3__WEBPACK_IMPORTED_MODULE_1__);
const themeMusic2 = new Audio(_sound_battle_cats_theme2_mp3__WEBPACK_IMPORTED_MODULE_2__);
const fullGameDisplay = document.querySelector('.full-game');
themeMusic2.onended = () => {
  themeMusic.play();
};
themeMusic.loop = true;
themeMusic2.volume = 0.2;
themeMusic.volume = 0.5;
function init() {
  beginButton.addEventListener('click', () => {
    themeMusic2.play();
    beginButton.style.transition = '5s';
    beginButton.style.scale = 50;
    openingScreen.style.opacity = 0;
    setTimeout(() => {
      fullGameDisplay.removeChild(openingScreen);
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
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"comfy\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"woff2\"),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"woff\");\n  font-weight: 600;\n  font-style: normal;\n}\n\n:root {\n  --background: #282a36;\n  --board-size: min(60vw, 500px);\n  --cell-size: calc(var(--board-size) / 10);\n  --logo-ball-size: 75px;\n  --shrink-scale: 1;\n  --margin: calc((100vw - var(--board-size)) / 2);\n  --shrunk-board: calc(var(--board-size) * var(--shrink-scale));\n  /* --cat-tracker-size: calc(var(--board-size) * 0.4); */\n  --cat-tracker-padding: 10px;\n  --cat-tracker-width: calc(\n    min((calc(var(--margin) * 0.95)), 200px) - (var(--cat-tracker-padding) * 2)\n  );\n  --cat-tracker-height: calc(var(var(--cat-tracker-width) * (4 / 5)));\n  --cat-tracker-cell: calc(var(--cat-tracker-width) / 5);\n  --margin-top: calc(((100vh - 100px) - var(--board-size)) * 0.5);\n}\n\nbody {\n  font-family: comfy, Verdana, Geneva, Tahoma, sans-serif;\n  margin: 0;\n  padding: 0;\n  color: whitesmoke;\n  height: 100vh;\n  width: 100vw;\n  -webkit-user-select: none; /* Safari */\n  -ms-user-select: none; /* IE 10 and IE 11 */\n  user-select: none; /* Standard syntax */\n}\n\n.full-game {\n  position: relative;\n  display: grid;\n  grid-template: 100px 1fr / 1fr 1fr 1fr;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  background-repeat: repeat;\n  background-size: 400px;\n  text-align: center;\n  overflow: hidden;\n}\n\n.opening-screen {\n  overflow: hidden;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  z-index: 10;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  background-repeat: repeat;\n  background-size: 100px;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  transition: 2s;\n}\n\n.opening-screen p {\n  background-color: #282a36bc;\n  box-sizing: border-box;\n  width: 300px;\n  padding: 30px;\n  border-radius: 30px;\n}\n\n@keyframes bounce {\n  from {\n    translate: 0;\n  }\n  to {\n    translate: 0px -10px;\n  }\n}\n\n.opening-screen button {\n  animation-name: bounce;\n  animation-duration: 2s;\n  animation-iteration-count: infinite;\n  animation-direction: alternate;\n  animation-timing-function: ease-out;\n  color: whitesmoke;\n  font-family: inherit;\n  font-size: 1.5rem;\n  appearance: none;\n  border-radius: 50%;\n  border: none;\n  width: 150px;\n  height: 150px;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n  cursor: grab;\n  transition: 0.3s;\n}\n\n.opening-screen button:hover,\n.play-again-button:hover {\n  animation: none;\n  scale: 0.9;\n}\n\n.opening-screen button:active,\n.play-again-button:active {\n  scale: 0.8;\n}\n\n.title {\n  grid-area: 1 / 1 / 2 / -1;\n  width: min-content;\n  height: var(--logo-ball-size);\n  margin: auto;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n}\n\n.title .ball:nth-child(4) {\n  grid-area: 1 / 1 / 2 / 2;\n  margin-left: 0;\n}\n\n.title .ball:nth-child(3) {\n  grid-area: 1 / 2 / 2 / 3;\n}\n\n.title .ball:nth-child(2) {\n  grid-area: 1 / 3 / 2 / 4;\n}\n\n.title .ball:nth-child(1) {\n  grid-area: 1 / 4 / 2 / 5;\n}\n\n.ball {\n  box-shadow: 1px 1px 8px rgb(255, 140, 0);\n  margin-left: calc(var(--logo-ball-size) * -0.5);\n  content: \"\";\n  height: var(--logo-ball-size);\n  width: var(--logo-ball-size);\n  border-radius: 50%;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n}\n\n.words {\n  grid-area: 1 / 1 / 2 / -1;\n}\nh1 {\n  font-size: 2rem;\n}\n\n.player-board-container {\n  grid-area: 2 / 2 / 3 / 3;\n  transition: 0.3s;\n  margin: auto;\n  width: min-content;\n  height: min-content;\n  transform-origin: 0 0;\n  z-index: 3;\n}\n\n.player-board,\n.comp-board {\n  /* box-sizing: border-box; */\n  width: var(--board-size);\n  height: var(--board-size);\n  display: grid;\n  grid-template: repeat(10, auto) / repeat(10, auto);\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n  background-repeat: repeat;\n  background-size: var(--cell-size) var(--cell-size);\n}\n\n.grid-cell {\n  z-index: 0;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.164);\n  width: var(--cell-size);\n  height: var(--cell-size);\n  position: relative;\n}\n\n.player-board {\n  overflow: hidden;\n}\n\n.comp-board .grid-cell:hover::after {\n  box-shadow: inset 0px 0px 50px rgb(255, 123, 0);\n  cursor: pointer;\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.comp-board .grid-cell:active::after {\n  box-shadow: inset 0px 0px 50px 10px rgb(255, 123, 0);\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.player-board .grid-cell:hover::after {\n  position: absolute;\n  left: 0;\n  content: \"\";\n  background-color: rgba(0, 0, 0, 0.462);\n  border-radius: 5px;\n}\n\n.player-board.cat-one .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 5);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-one\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 5);\n}\n\n.player-board.cat-two .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 4);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-two\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 4);\n}\n\n.player-board.cat-three .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 3);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-three\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 3);\n}\n\n.player-board.cat-four .grid-cell:hover::after,\n.player-board.cat-five .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 2);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-four\n  .grid-cell:hover::after,\n.player-board-container.horizontal\n  .player-board.cat-five\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 2);\n}\n\n.player-board-container.shrink {\n  scale: var(--shrink-scale);\n  translate: calc((var(--margin) + var(--shrunk-board)) * -0.5);\n}\n\n.player-board-container.shrink:hover {\n  scale: 0.75;\n  border: 2px solid black;\n}\n\n.cat-img {\n  transition: 0.3s;\n  position: absolute;\n  top: 3px;\n  rotate: -90deg;\n  width: var(--cell-size);\n  pointer-events: none;\n}\n\n.cat1 {\n  right: -10px;\n  height: calc(var(--cell-size) * 5);\n  transform: scale(5.5, 4);\n}\n\n.cat1.horizontal-cat {\n  top: 5px;\n  width: calc(var(--cell-size) * 5);\n  transform: scale(3.8, 2.7);\n}\n\n.cat2 {\n  top: 5px;\n  left: -5px;\n  height: calc(var(--cell-size) * 4);\n  transform: scale(4.3, 2.5);\n}\n\n.cat2.horizontal-cat {\n  top: -3px;\n  width: calc(var(--cell-size) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat3 {\n  left: 0;\n  height: calc(var(--cell-size) * 3);\n  transform: scale(3.5, 2.5);\n}\n\n.cat3.horizontal-cat {\n  width: calc(var(--cell-size) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat4 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 2);\n}\n\n.cat4.horizontal-cat {\n  width: calc(var(--cell-size) * 2);\n  transform: scale(1.5);\n}\n\n.cat5 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 1.5);\n}\n\n.cat5.horizontal-cat {\n  width: calc((var(--cell-size) * 2));\n  transform: scale(1.5, 1.1);\n}\n\n.horizontal-cat {\n  top: 0px;\n  left: 0px;\n  height: var(--cell-size);\n  rotate: 0deg;\n}\n\n.grid-cell.attacked::after {\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  box-shadow: inset 0px 0px 15px orange;\n}\n\n.grid-cell.attacked::before {\n  z-index: 1;\n  position: absolute;\n  content: \"\";\n  width: calc(var(--cell-size) / 3);\n  height: calc(var(--cell-size) / 3);\n  background-color: rgba(255, 166, 0, 0.698);\n  border-radius: 50%;\n  inset: 0;\n  margin: auto;\n}\n\n.grid-cell.attacked.occupied::before {\n  width: calc(var(--cell-size) / 1.5);\n  height: calc(var(--cell-size) / 1.5);\n  background-color: orange;\n  transition: 1s;\n}\n\n.grid-cell.attacked.occupied.consume::before {\n  scale: 0;\n}\n\n.rotate-button {\n  background-color: hsl(39, 100%, 50%);\n  appearance: none;\n  border: none;\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  cursor: pointer;\n  margin: 5px;\n}\n\n.rotate-button img {\n  height: 100%;\n  width: 100%;\n}\n\n.rotate-button:hover {\n  background-color: hsl(39, 100%, 60%);\n}\n\n.rotate-button:active {\n  background-color: hsl(39, 100%, 80%);\n}\n\n.comp-board-container {\n  overflow: hidden;\n  grid-area: 2 / 2 / 3 / 3;\n  width: min-content;\n  height: min-content;\n  display: none;\n  inset: 0;\n  margin: auto;\n}\n\n.hidden {\n  opacity: 0;\n}\n\n.cat-tracker-container {\n  width: min-content;\n  background-color: rgba(255, 255, 255, 0.405);\n  padding: var(--cat-tracker-padding);\n  border-radius: 20px;\n  overflow: hidden;\n  align-self: flex-start;\n  margin: var(--margin-top) 10px;\n  grid-area: 2 / 3 / 3 / 4;\n  visibility: hidden;\n}\n\n.cat-tracker {\n  display: grid;\n  grid-template: repeat(4, auto) / repeat(5, auto);\n  width: var(--cat-tracker-width);\n  height: var(--cat-tracker-height);\n  align-items: center;\n  justify-items: flex-start;\n}\n\n.cat-tracker div {\n  position: relative;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.5);\n  height: var(--cat-tracker-cell);\n  width: var(--cat-tracker-cell);\n}\n\n.cat-tracker div::after {\n  position: absolute;\n  content: \"\";\n  background-color: orange;\n  width: 40%;\n  height: 40%;\n  border-radius: 50%;\n  z-index: 3;\n  inset: 0;\n  margin: auto;\n  opacity: 0;\n  transition: 0.5s;\n}\n\n.cat-tracker div::before {\n  position: absolute;\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  background-color: rgba(201, 201, 201, 0.54);\n  opacity: 0;\n  left: 0;\n}\n\n.cat-tracker div.cat-tracker-hit::after,\n.cat-tracker div.cat-tracker-hit::before {\n  opacity: 1;\n}\n\n.cat-tracker div img {\n  height: var(--cat-tracker-cell);\n}\n\n.cat-tracker-first img {\n  width: calc(var(--cat-tracker-cell) * 5);\n  transform: scale(3.4, 2.7);\n}\n\n.cat-tracker-second img {\n  width: calc(var(--cat-tracker-cell) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat-tracker-third img {\n  width: calc(var(--cat-tracker-cell) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat-tracker-fourth img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5);\n}\n\n.cat-tracker-fifth img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5, 1.1);\n}\n\n.end-game {\n  z-index: 3;\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  background-color: #282a36ce;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.5rem;\n  transition: 0.5s;\n}\n\n.end-game .verdict {\n  font-size: 2rem;\n  border: 1px solid orange;\n  background: radial-gradient(hsl(39, 100%, 58%), hsla(39, 100%, 50%, 0.8));\n  padding: 50px;\n  border-radius: 50px;\n}\n\n.end-message {\n  width: 300px;\n}\n\n.play-again-button {\n  color: whitesmoke;\n  margin: 10px;\n  appearance: none;\n  border: none;\n  font-family: inherit;\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n  cursor: grab;\n  transition: 0.3s;\n  font-size: 100%;\n}\n\n.cat-animation {\n  position: absolute;\n  z-index: 20;\n  width: 100vw;\n  height: auto;\n  pointer-events: none;\n  /* transform-origin: top left; */\n  transition: translate 1.5s ease-in-out;\n  inset: 0;\n  margin: auto;\n}\n\n.cat-animation.vertical {\n  rotate: -90deg;\n}\n\n.cat-animation.catOne,\n.cat-animation.catTwo,\n.cat-animation.catFour,\n.cat-animation.catThree.move,\n.cat-animation.catFive.move {\n  translate: -100vw;\n}\n\n.cat-animation.catThree,\n.cat-animation.catFive,\n.cat-animation.catOne.move,\n.cat-animation.catTwo.move,\n.cat-animation.catFour.move {\n  translate: 100vw;\n}\n\n.cat-animation.catOne.vertical,\n.cat-animation.catTwo.vertical,\n.cat-animation.catFour.vertical,\n.cat-animation.catThree.vertical.move,\n.cat-animation.catFive.vertical.move  {\n  translate: 0 120vh;\n}\n\n.cat-animation.catThree.vertical,\n.cat-animation.catFive.vertical,\n.cat-animation.catOne.vertical.move,\n.cat-animation.catTwo.vertical.move,\n.cat-animation.catFour.vertical.move  {\n  translate: 0 -120vh;\n}\n\n.cat-animation img {\n  width: 100%;\n  height: 100%;\n}\n\n@media only screen and (max-width: 850px) {\n  :root {\n    --scale-size: 0.4;\n    --board-size: min(60vh, 90vw);\n    --logo-ball-size: 50px;\n    --second-row: calc((95vh - 50px) * (1 / (1.3 + 1)));\n    --third-row: calc((95vh - 50px) * (1.3 / (1.3 + 1)));\n    --mini-board-size: calc(var(--board-size) * var(--scale-size));\n    --cat-tracker-width: calc(var(--board-size) * 0.4);\n  }\n\n  .full-game {\n    display: grid;\n    grid-template: 5vh 1fr 1.3fr 50px/ 50vw 50vw;\n    align-items: center;\n    justify-items: center;\n  }\n\n  .title {\n    grid-area: 1 / 1 / 2 / 3;\n    margin-top: 0;\n  }\n\n  h1 {\n    font-size: 1rem;\n  }\n\n  .player-board-container {\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .player-board-container.shrink {\n    scale: var(--scale-size);\n    translate: 0px\n      calc(\n        (\n            var(--third-row) - var(--board-size) + var(--second-row) +\n              var(--mini-board-size)\n          ) * -0.5\n      );\n    justify-self: center;\n  }\n\n  .player-board-container.shrink:hover {\n    scale: 0.75;\n  }\n\n  .comp-board-container {\n    margin-top: auto;\n    display: none;\n    position: relative;\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .cat-tracker-container {\n    margin: auto;\n    grid-area: 2 / 2 / 3 / 3;\n  }\n}\n\n@media only screen and (max-width: 450px) {\n  :root {\n    --scale-size: 0.5;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n  font-family: \"comfy\";\n  src: url(\"./font/comfortaa-variablefont_wght-webfont.woff2\") format(\"woff2\"),\n    url(\"./font/comfortaa-variablefont_wght-webfont.woff\") format(\"woff\");\n  font-weight: 600;\n  font-style: normal;\n}\n\n:root {\n  --background: #282a36;\n  --board-size: min(60vw, 500px);\n  --cell-size: calc(var(--board-size) / 10);\n  --logo-ball-size: 75px;\n  --shrink-scale: 1;\n  --margin: calc((100vw - var(--board-size)) / 2);\n  --shrunk-board: calc(var(--board-size) * var(--shrink-scale));\n  /* --cat-tracker-size: calc(var(--board-size) * 0.4); */\n  --cat-tracker-padding: 10px;\n  --cat-tracker-width: calc(\n    min((calc(var(--margin) * 0.95)), 200px) - (var(--cat-tracker-padding) * 2)\n  );\n  --cat-tracker-height: calc(var(var(--cat-tracker-width) * (4 / 5)));\n  --cat-tracker-cell: calc(var(--cat-tracker-width) / 5);\n  --margin-top: calc(((100vh - 100px) - var(--board-size)) * 0.5);\n}\n\nbody {\n  font-family: comfy, Verdana, Geneva, Tahoma, sans-serif;\n  margin: 0;\n  padding: 0;\n  color: whitesmoke;\n  height: 100vh;\n  width: 100vw;\n  -webkit-user-select: none; /* Safari */\n  -ms-user-select: none; /* IE 10 and IE 11 */\n  user-select: none; /* Standard syntax */\n}\n\n.full-game {\n  position: relative;\n  display: grid;\n  grid-template: 100px 1fr / 1fr 1fr 1fr;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n  background: url(\"./img/grrass.jpeg\");\n  background-repeat: repeat;\n  background-size: 400px;\n  text-align: center;\n  overflow: hidden;\n}\n\n.opening-screen {\n  overflow: hidden;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  z-index: 10;\n  background: url(\"./img/grrass.jpeg\");\n  background-repeat: repeat;\n  background-size: 100px;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  transition: 2s;\n}\n\n.opening-screen p {\n  background-color: #282a36bc;\n  box-sizing: border-box;\n  width: 300px;\n  padding: 30px;\n  border-radius: 30px;\n}\n\n@keyframes bounce {\n  from {\n    translate: 0;\n  }\n  to {\n    translate: 0px -10px;\n  }\n}\n\n.opening-screen button {\n  animation-name: bounce;\n  animation-duration: 2s;\n  animation-iteration-count: infinite;\n  animation-direction: alternate;\n  animation-timing-function: ease-out;\n  color: whitesmoke;\n  font-family: inherit;\n  font-size: 1.5rem;\n  appearance: none;\n  border-radius: 50%;\n  border: none;\n  width: 150px;\n  height: 150px;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n  cursor: grab;\n  transition: 0.3s;\n}\n\n.opening-screen button:hover,\n.play-again-button:hover {\n  animation: none;\n  scale: 0.9;\n}\n\n.opening-screen button:active,\n.play-again-button:active {\n  scale: 0.8;\n}\n\n.title {\n  grid-area: 1 / 1 / 2 / -1;\n  width: min-content;\n  height: var(--logo-ball-size);\n  margin: auto;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n}\n\n.title .ball:nth-child(4) {\n  grid-area: 1 / 1 / 2 / 2;\n  margin-left: 0;\n}\n\n.title .ball:nth-child(3) {\n  grid-area: 1 / 2 / 2 / 3;\n}\n\n.title .ball:nth-child(2) {\n  grid-area: 1 / 3 / 2 / 4;\n}\n\n.title .ball:nth-child(1) {\n  grid-area: 1 / 4 / 2 / 5;\n}\n\n.ball {\n  box-shadow: 1px 1px 8px rgb(255, 140, 0);\n  margin-left: calc(var(--logo-ball-size) * -0.5);\n  content: \"\";\n  height: var(--logo-ball-size);\n  width: var(--logo-ball-size);\n  border-radius: 50%;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n}\n\n.words {\n  grid-area: 1 / 1 / 2 / -1;\n}\nh1 {\n  font-size: 2rem;\n}\n\n.player-board-container {\n  grid-area: 2 / 2 / 3 / 3;\n  transition: 0.3s;\n  margin: auto;\n  width: min-content;\n  height: min-content;\n  transform-origin: 0 0;\n  z-index: 3;\n}\n\n.player-board,\n.comp-board {\n  /* box-sizing: border-box; */\n  width: var(--board-size);\n  height: var(--board-size);\n  display: grid;\n  grid-template: repeat(10, auto) / repeat(10, auto);\n  background: url(\"./img/pexels-pixmike-413195.jpg\");\n  background-repeat: repeat;\n  background-size: var(--cell-size) var(--cell-size);\n}\n\n.grid-cell {\n  z-index: 0;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.164);\n  width: var(--cell-size);\n  height: var(--cell-size);\n  position: relative;\n}\n\n.player-board {\n  overflow: hidden;\n}\n\n.comp-board .grid-cell:hover::after {\n  box-shadow: inset 0px 0px 50px rgb(255, 123, 0);\n  cursor: pointer;\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.comp-board .grid-cell:active::after {\n  box-shadow: inset 0px 0px 50px 10px rgb(255, 123, 0);\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.player-board .grid-cell:hover::after {\n  position: absolute;\n  left: 0;\n  content: \"\";\n  background-color: rgba(0, 0, 0, 0.462);\n  border-radius: 5px;\n}\n\n.player-board.cat-one .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 5);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-one\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 5);\n}\n\n.player-board.cat-two .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 4);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-two\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 4);\n}\n\n.player-board.cat-three .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 3);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-three\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 3);\n}\n\n.player-board.cat-four .grid-cell:hover::after,\n.player-board.cat-five .grid-cell:hover::after {\n  width: var(--cell-size);\n  height: calc(var(--cell-size) * 2);\n}\n\n.player-board-container.horizontal\n  .player-board.cat-four\n  .grid-cell:hover::after,\n.player-board-container.horizontal\n  .player-board.cat-five\n  .grid-cell:hover::after {\n  height: var(--cell-size);\n  width: calc(var(--cell-size) * 2);\n}\n\n.player-board-container.shrink {\n  scale: var(--shrink-scale);\n  translate: calc((var(--margin) + var(--shrunk-board)) * -0.5);\n}\n\n.player-board-container.shrink:hover {\n  scale: 0.75;\n  border: 2px solid black;\n}\n\n.cat-img {\n  transition: 0.3s;\n  position: absolute;\n  top: 3px;\n  rotate: -90deg;\n  width: var(--cell-size);\n  pointer-events: none;\n}\n\n.cat1 {\n  right: -10px;\n  height: calc(var(--cell-size) * 5);\n  transform: scale(5.5, 4);\n}\n\n.cat1.horizontal-cat {\n  top: 5px;\n  width: calc(var(--cell-size) * 5);\n  transform: scale(3.8, 2.7);\n}\n\n.cat2 {\n  top: 5px;\n  left: -5px;\n  height: calc(var(--cell-size) * 4);\n  transform: scale(4.3, 2.5);\n}\n\n.cat2.horizontal-cat {\n  top: -3px;\n  width: calc(var(--cell-size) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat3 {\n  left: 0;\n  height: calc(var(--cell-size) * 3);\n  transform: scale(3.5, 2.5);\n}\n\n.cat3.horizontal-cat {\n  width: calc(var(--cell-size) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat4 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 2);\n}\n\n.cat4.horizontal-cat {\n  width: calc(var(--cell-size) * 2);\n  transform: scale(1.5);\n}\n\n.cat5 {\n  left: 0;\n  height: calc(var(--cell-size) * 2);\n  transform: scale(2, 1.5);\n}\n\n.cat5.horizontal-cat {\n  width: calc((var(--cell-size) * 2));\n  transform: scale(1.5, 1.1);\n}\n\n.horizontal-cat {\n  top: 0px;\n  left: 0px;\n  height: var(--cell-size);\n  rotate: 0deg;\n}\n\n.grid-cell.attacked::after {\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  box-shadow: inset 0px 0px 15px orange;\n}\n\n.grid-cell.attacked::before {\n  z-index: 1;\n  position: absolute;\n  content: \"\";\n  width: calc(var(--cell-size) / 3);\n  height: calc(var(--cell-size) / 3);\n  background-color: rgba(255, 166, 0, 0.698);\n  border-radius: 50%;\n  inset: 0;\n  margin: auto;\n}\n\n.grid-cell.attacked.occupied::before {\n  width: calc(var(--cell-size) / 1.5);\n  height: calc(var(--cell-size) / 1.5);\n  background-color: orange;\n  transition: 1s;\n}\n\n.grid-cell.attacked.occupied.consume::before {\n  scale: 0;\n}\n\n.rotate-button {\n  background-color: hsl(39, 100%, 50%);\n  appearance: none;\n  border: none;\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  cursor: pointer;\n  margin: 5px;\n}\n\n.rotate-button img {\n  height: 100%;\n  width: 100%;\n}\n\n.rotate-button:hover {\n  background-color: hsl(39, 100%, 60%);\n}\n\n.rotate-button:active {\n  background-color: hsl(39, 100%, 80%);\n}\n\n.comp-board-container {\n  overflow: hidden;\n  grid-area: 2 / 2 / 3 / 3;\n  width: min-content;\n  height: min-content;\n  display: none;\n  inset: 0;\n  margin: auto;\n}\n\n.hidden {\n  opacity: 0;\n}\n\n.cat-tracker-container {\n  width: min-content;\n  background-color: rgba(255, 255, 255, 0.405);\n  padding: var(--cat-tracker-padding);\n  border-radius: 20px;\n  overflow: hidden;\n  align-self: flex-start;\n  margin: var(--margin-top) 10px;\n  grid-area: 2 / 3 / 3 / 4;\n  visibility: hidden;\n}\n\n.cat-tracker {\n  display: grid;\n  grid-template: repeat(4, auto) / repeat(5, auto);\n  width: var(--cat-tracker-width);\n  height: var(--cat-tracker-height);\n  align-items: center;\n  justify-items: flex-start;\n}\n\n.cat-tracker div {\n  position: relative;\n  box-sizing: border-box;\n  border: 0.5px solid rgba(128, 128, 128, 0.5);\n  height: var(--cat-tracker-cell);\n  width: var(--cat-tracker-cell);\n}\n\n.cat-tracker div::after {\n  position: absolute;\n  content: \"\";\n  background-color: orange;\n  width: 40%;\n  height: 40%;\n  border-radius: 50%;\n  z-index: 3;\n  inset: 0;\n  margin: auto;\n  opacity: 0;\n  transition: 0.5s;\n}\n\n.cat-tracker div::before {\n  position: absolute;\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  background-color: rgba(201, 201, 201, 0.54);\n  opacity: 0;\n  left: 0;\n}\n\n.cat-tracker div.cat-tracker-hit::after,\n.cat-tracker div.cat-tracker-hit::before {\n  opacity: 1;\n}\n\n.cat-tracker div img {\n  height: var(--cat-tracker-cell);\n}\n\n.cat-tracker-first img {\n  width: calc(var(--cat-tracker-cell) * 5);\n  transform: scale(3.4, 2.7);\n}\n\n.cat-tracker-second img {\n  width: calc(var(--cat-tracker-cell) * 4);\n  transform: scale(2.9, 1.7);\n}\n\n.cat-tracker-third img {\n  width: calc(var(--cat-tracker-cell) * 3);\n  transform: scale(2.5, 1.8);\n}\n\n.cat-tracker-fourth img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5);\n}\n\n.cat-tracker-fifth img {\n  width: calc(var(--cat-tracker-cell) * 2);\n  transform: scale(1.5, 1.1);\n}\n\n.end-game {\n  z-index: 3;\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  background-color: #282a36ce;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.5rem;\n  transition: 0.5s;\n}\n\n.end-game .verdict {\n  font-size: 2rem;\n  border: 1px solid orange;\n  background: radial-gradient(hsl(39, 100%, 58%), hsla(39, 100%, 50%, 0.8));\n  padding: 50px;\n  border-radius: 50px;\n}\n\n.end-message {\n  width: 300px;\n}\n\n.play-again-button {\n  color: whitesmoke;\n  margin: 10px;\n  appearance: none;\n  border: none;\n  font-family: inherit;\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  background: radial-gradient(hsl(39, 100%, 58%), hsl(39, 100%, 50%));\n  cursor: grab;\n  transition: 0.3s;\n  font-size: 100%;\n}\n\n.cat-animation {\n  position: absolute;\n  z-index: 20;\n  width: 100vw;\n  height: auto;\n  pointer-events: none;\n  /* transform-origin: top left; */\n  transition: translate 1.5s ease-in-out;\n  inset: 0;\n  margin: auto;\n}\n\n.cat-animation.vertical {\n  rotate: -90deg;\n}\n\n.cat-animation.catOne,\n.cat-animation.catTwo,\n.cat-animation.catFour,\n.cat-animation.catThree.move,\n.cat-animation.catFive.move {\n  translate: -100vw;\n}\n\n.cat-animation.catThree,\n.cat-animation.catFive,\n.cat-animation.catOne.move,\n.cat-animation.catTwo.move,\n.cat-animation.catFour.move {\n  translate: 100vw;\n}\n\n.cat-animation.catOne.vertical,\n.cat-animation.catTwo.vertical,\n.cat-animation.catFour.vertical,\n.cat-animation.catThree.vertical.move,\n.cat-animation.catFive.vertical.move  {\n  translate: 0 120vh;\n}\n\n.cat-animation.catThree.vertical,\n.cat-animation.catFive.vertical,\n.cat-animation.catOne.vertical.move,\n.cat-animation.catTwo.vertical.move,\n.cat-animation.catFour.vertical.move  {\n  translate: 0 -120vh;\n}\n\n.cat-animation img {\n  width: 100%;\n  height: 100%;\n}\n\n@media only screen and (max-width: 850px) {\n  :root {\n    --scale-size: 0.4;\n    --board-size: min(60vh, 90vw);\n    --logo-ball-size: 50px;\n    --second-row: calc((95vh - 50px) * (1 / (1.3 + 1)));\n    --third-row: calc((95vh - 50px) * (1.3 / (1.3 + 1)));\n    --mini-board-size: calc(var(--board-size) * var(--scale-size));\n    --cat-tracker-width: calc(var(--board-size) * 0.4);\n  }\n\n  .full-game {\n    display: grid;\n    grid-template: 5vh 1fr 1.3fr 50px/ 50vw 50vw;\n    align-items: center;\n    justify-items: center;\n  }\n\n  .title {\n    grid-area: 1 / 1 / 2 / 3;\n    margin-top: 0;\n  }\n\n  h1 {\n    font-size: 1rem;\n  }\n\n  .player-board-container {\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .player-board-container.shrink {\n    scale: var(--scale-size);\n    translate: 0px\n      calc(\n        (\n            var(--third-row) - var(--board-size) + var(--second-row) +\n              var(--mini-board-size)\n          ) * -0.5\n      );\n    justify-self: center;\n  }\n\n  .player-board-container.shrink:hover {\n    scale: 0.75;\n  }\n\n  .comp-board-container {\n    margin-top: auto;\n    display: none;\n    position: relative;\n    grid-area: 3 / 1 / 4 / 3;\n  }\n\n  .cat-tracker-container {\n    margin: auto;\n    grid-area: 2 / 2 / 3 / 3;\n  }\n}\n\n@media only screen and (max-width: 450px) {\n  :root {\n    --scale-size: 0.5;\n  }\n}\n"],"sourceRoot":""}]);
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

module.exports = __webpack_require__.p + "1ee448e2b90a46f5d062.svg";

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

/***/ }),

/***/ "./src/sound/battle-cat-theme-one-loop.mp3":
/*!*************************************************!*\
  !*** ./src/sound/battle-cat-theme-one-loop.mp3 ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "330da9788abbfae296f4.mp3";

/***/ }),

/***/ "./src/sound/battle-cats-theme2.mp3":
/*!******************************************!*\
  !*** ./src/sound/battle-cats-theme2.mp3 ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "1a801ab60f5f623a6c1e.mp3";

/***/ }),

/***/ "./src/sound/eatSound.ogg":
/*!********************************!*\
  !*** ./src/sound/eatSound.ogg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3a86c720060afa329a22.ogg";

/***/ }),

/***/ "./src/sound/hit.ogg":
/*!***************************!*\
  !*** ./src/sound/hit.ogg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0b958c637c5309144508.ogg";

/***/ }),

/***/ "./src/sound/miss.ogg":
/*!****************************!*\
  !*** ./src/sound/miss.ogg ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "13de4f1d7c17ae9022cd.ogg";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxNQUFNLE1BQU0sWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLE9BQU8sWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxPQUFPLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sT0FBTyxZQUFZLGFBQWEsT0FBTyxNQUFNLFlBQVksYUFBYSxPQUFPLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLFdBQVcsVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsWUFBWSxh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Olsid2VicGFjazovL2JhdHRsZS1jYXRzLy4vc3JjL2JvdC5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9jYXQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvY2F0SW1nLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9zcmMvaW5pdC5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZS1jYXRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlLWNhdHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2JhdHRsZS1jYXRzL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGUtY2F0cy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVPcmllbnRhdGlvbihhcnJheSkge1xuICByZXR1cm4gYXJyYXlbMF1bMF0gPT09IGFycmF5WzFdWzBdID8gXCJ5XCIgOiBcInhcIjtcbn1cblxuZnVuY3Rpb24gYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyhzdGFydCwgYm9hcmRJRCwgY2F0LCBheGlzLCBkaXJlY3Rpb24pIHtcbiAgbGV0IGFsbERpcjtcbiAgY29uc3QgW3gsIHldID0gc3RhcnQ7XG4gIGNvbnN0IHVwID0gKCkgPT4gYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyhbeCwgeSAtIDFdLCBib2FyZElELCBjYXQsIFwieVwiLCAtMSk7XG4gIGNvbnN0IHJpZ2h0ID0gKCkgPT5cbiAgICBhc3Nlc3NBZGphY2VudENvb3JkaW5hdGVzKFt4ICsgMSwgeV0sIGJvYXJkSUQsIGNhdCwgXCJ4XCIsIDEpO1xuICBjb25zdCBkb3duID0gKCkgPT5cbiAgICBhc3Nlc3NBZGphY2VudENvb3JkaW5hdGVzKFt4LCB5ICsgMV0sIGJvYXJkSUQsIGNhdCwgXCJ5XCIsIDEpO1xuICBjb25zdCBsZWZ0ID0gKCkgPT5cbiAgICBhc3Nlc3NBZGphY2VudENvb3JkaW5hdGVzKFt4IC0gMSwgeV0sIGJvYXJkSUQsIGNhdCwgXCJ4XCIsIC0xKTtcblxuICBpZiAoc3RhcnQuc29tZSgobnVtKSA9PiBudW0gPiA5IHx8IG51bSA8IDApKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBvcHBCb2FyZENlbGwgPSBib2FyZElELmJvYXJkW2BbJHtzdGFydH1dYF07XG4gIGlmIChcbiAgICBvcHBCb2FyZENlbGwuYXR0YWNrZWQgJiZcbiAgICAoIW9wcEJvYXJkQ2VsbC5vY2N1cGllZEJ5IHx8IG9wcEJvYXJkQ2VsbC5vY2N1cGllZEJ5ICE9PSBjYXQpXG4gICkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmICghb3BwQm9hcmRDZWxsLmF0dGFja2VkKSByZXR1cm4gc3RhcnQ7XG5cbiAgaWYgKGF4aXMpIHtcbiAgICBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoXG4gICAgICAgICAgW3ggKyAxICogZGlyZWN0aW9uLCB5XSxcbiAgICAgICAgICBib2FyZElELFxuICAgICAgICAgIGNhdCxcbiAgICAgICAgICBheGlzLFxuICAgICAgICAgIGRpcmVjdGlvblxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgYWxsRGlyID0gW2xlZnQoKSwgcmlnaHQoKV07XG4gICAgfSBlbHNlIGlmIChheGlzID09PSBcInlcIikge1xuICAgICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgICByZXR1cm4gYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyhcbiAgICAgICAgICBbeCwgeSArIDEgKiBkaXJlY3Rpb25dLFxuICAgICAgICAgIGJvYXJkSUQsXG4gICAgICAgICAgY2F0LFxuICAgICAgICAgIGF4aXMsXG4gICAgICAgICAgZGlyZWN0aW9uXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBhbGxEaXIgPSBbdXAoKSwgZG93bigpXTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYWxsRGlyID0gW3VwKCksIHJpZ2h0KCksIGRvd24oKSwgbGVmdCgpXTtcbiAgfVxuICByZXR1cm4gYWxsRGlyLmZpbHRlcigob3B0KSA9PiBvcHQgIT09IG51bGwpO1xufVxuXG5mdW5jdGlvbiBhZGRQb2ludHMob3BwQm9hcmQsIGNvb3JkLCBkaXJlY3Rpb24sIG1heCwgcG9pbnRzID0gLTEpIHtcbiAgY29uc3QgY2VsbCA9IG9wcEJvYXJkLmJvYXJkW2BbJHtjb29yZH1dYF07XG4gIGlmIChcbiAgICBwb2ludHMgPT09IG1heCAtIDEgfHxcbiAgICBjb29yZC5zb21lKChudW0pID0+IG51bSA+IDkgfHwgbnVtIDwgMCkgfHxcbiAgICBjZWxsLmF0dGFja2VkXG4gIClcbiAgICByZXR1cm4gcG9pbnRzO1xuICBjb25zdCBbeCwgeV0gPSBjb29yZDtcbiAgbGV0IG5ld0Nvb3JkO1xuICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgbmV3Q29vcmQgPSBbeCwgeSArIDFdO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICBuZXdDb29yZCA9IFt4ICsgMSwgeV07XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZG93blwiOlxuICAgICAgbmV3Q29vcmQgPSBbeCwgeSAtIDFdO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImxlZnRcIjpcbiAgICAgIG5ld0Nvb3JkID0gW3ggLSAxLCB5XTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4gYWRkUG9pbnRzKG9wcEJvYXJkLCBuZXdDb29yZCwgZGlyZWN0aW9uLCBtYXgsIHBvaW50cyArIDEpO1xufVxuXG5mdW5jdGlvbiBncmFkZVNwb3Qob3Bwb25lbnRCb2FyZCwgY29vcmQpIHtcbiAgY29uc3QgbGVuZ3RoT2ZMb25nZXN0Q2F0UmVtYWluaW5nID0gb3Bwb25lbnRCb2FyZC5jYXRzLnJlZHVjZShcbiAgICAoYSwgYikgPT4gKCFiLmlzU3VuaygpICYmIGIubGVuZ3RoID4gYSA/IGIubGVuZ3RoIDogYSksXG4gICAgMFxuICApO1xuICByZXR1cm4gKFxuICAgIGFkZFBvaW50cyhvcHBvbmVudEJvYXJkLCBjb29yZCwgXCJ1cFwiLCBsZW5ndGhPZkxvbmdlc3RDYXRSZW1haW5pbmcpICtcbiAgICBhZGRQb2ludHMob3Bwb25lbnRCb2FyZCwgY29vcmQsIFwicmlnaHRcIiwgbGVuZ3RoT2ZMb25nZXN0Q2F0UmVtYWluaW5nKSArXG4gICAgYWRkUG9pbnRzKG9wcG9uZW50Qm9hcmQsIGNvb3JkLCBcImRvd25cIiwgbGVuZ3RoT2ZMb25nZXN0Q2F0UmVtYWluaW5nKSArXG4gICAgYWRkUG9pbnRzKG9wcG9uZW50Qm9hcmQsIGNvb3JkLCBcImxlZnRcIiwgbGVuZ3RoT2ZMb25nZXN0Q2F0UmVtYWluaW5nKVxuICApO1xufTtcblxuZnVuY3Rpb24gY29tcEZpcmVTaG90KG9wcG9uZW50Qm9hcmQpIHtcbiAgY29uc3Qgd291bmRlZFRhcmdldHMgPSBbXTtcbiAgbGV0IHBvc3NpYmxlSGl0cztcbiAgb3Bwb25lbnRCb2FyZC5jYXRzLmZvckVhY2goKGNhdCkgPT4ge1xuICAgIGlmIChjYXQuaGl0cyA+IDAgJiYgIWNhdC5pc1N1bmsoKSkge1xuICAgICAgd291bmRlZFRhcmdldHMucHVzaChjYXQpO1xuICAgIH1cbiAgfSk7XG4gIGlmICh3b3VuZGVkVGFyZ2V0cy5sZW5ndGgpIHtcbiAgICBjb25zdCBwcmltYXJ5VGFyZ2V0ID0gd291bmRlZFRhcmdldHNbMF07XG4gICAgaWYgKHByaW1hcnlUYXJnZXQuY29vcmRIaXQubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3Qgb3JpZW50YXRpb24gPSBkZXRlcm1pbmVPcmllbnRhdGlvbihwcmltYXJ5VGFyZ2V0LmNvb3JkSGl0KTtcbiAgICAgIHBvc3NpYmxlSGl0cyA9IGFzc2Vzc0FkamFjZW50Q29vcmRpbmF0ZXMoXG4gICAgICAgIHByaW1hcnlUYXJnZXQuY29vcmRIaXRbMF0sXG4gICAgICAgIG9wcG9uZW50Qm9hcmQsXG4gICAgICAgIHByaW1hcnlUYXJnZXQsXG4gICAgICAgIG9yaWVudGF0aW9uXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3NzaWJsZUhpdHMgPSBhc3Nlc3NBZGphY2VudENvb3JkaW5hdGVzKFxuICAgICAgICBwcmltYXJ5VGFyZ2V0LmNvb3JkSGl0WzBdLFxuICAgICAgICBvcHBvbmVudEJvYXJkLFxuICAgICAgICBwcmltYXJ5VGFyZ2V0XG4gICAgICApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAgY29uc3QgYWxsUG9zc2libGVIaXRzID0gW107XG4gICAgT2JqZWN0LmtleXMob3Bwb25lbnRCb2FyZC5ib2FyZCkuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgaWYgKCFvcHBvbmVudEJvYXJkLmJvYXJkW2NlbGxdLmF0dGFja2VkKSB7XG4gICAgICAgIGFsbFBvc3NpYmxlSGl0cy5wdXNoKG9wcG9uZW50Qm9hcmQuYm9hcmRbY2VsbF0uY29vcmRpbmF0ZXMpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGxldCB0b3BTY29yZSA9IDA7XG4gICAgcG9zc2libGVIaXRzID0gYWxsUG9zc2libGVIaXRzLnJlZHVjZSgoYSwgYikgPT4ge1xuICAgICAgY29uc3Qgc3BvdEdyYWRlID0gZ3JhZGVTcG90KG9wcG9uZW50Qm9hcmQsIGIpO1xuICAgICAgY29uc29sZS5sb2coc3BvdEdyYWRlLCB0b3BTY29yZSk7XG4gICAgICBpZiAoc3BvdEdyYWRlID4gdG9wU2NvcmUpIHtcbiAgICAgICAgdG9wU2NvcmUgPSBzcG90R3JhZGU7XG4gICAgICAgIHJldHVybiBbYl07XG4gICAgICB9XG4gICAgICBpZiAoc3BvdEdyYWRlID09PSB0b3BTY29yZSkge1xuICAgICAgICBhLnB1c2goYik7XG4gICAgICB9XG4gICAgICByZXR1cm4gYVxuICAgIH0sIFtdKTtcbiAgICBjb25zb2xlLmxvZyhwb3NzaWJsZUhpdHMpO1xuICB9XG4gIHJldHVybiBwb3NzaWJsZUhpdHNbTWF0aC5mbG9vcihwb3NzaWJsZUhpdHMubGVuZ3RoICogTWF0aC5yYW5kb20oKSldO1xufVxuXG5leHBvcnQgeyBhc3Nlc3NBZGphY2VudENvb3JkaW5hdGVzLCBjb21wRmlyZVNob3QgfTtcbiIsImNsYXNzIENhdCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgdHlwZSkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5oaXRzID0gMDtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xuICAgIHRoaXMuY29vcmRIaXQgPSBbXTtcbiAgfVxuXG4gIGhpdChjb29yZCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICAgIHRoaXMuY29vcmRIaXQucHVzaChjb29yZCk7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVuZ3RoID09PSB0aGlzLmhpdHM7XG4gIH1cblxuICByb3RhdGUoKSB7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9XG4gICAgICB0aGlzLm9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIjtcbiAgfVxuXG4gIHJhbmRvbWl6ZU9yaWVudGF0aW9uKCkge1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBNYXRoLnJhbmRvbSgpID4gMC41ID8gXCJ2ZXJ0aWNhbFwiIDogXCJob3Jpem9udGFsXCI7XG4gIH1cblxuICBzZXREb21FbGVtZW50KHRhcmdldCkge1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IHRhcmdldDtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDYXRzKCkge1xuICBjb25zdCBjYXQxID0gbmV3IENhdCg1LCBcImJpZyBzdHJldGNoXCIpO1xuICBjb25zdCBjYXQyID0gbmV3IENhdCg0LCBcImRvd253YXJkIGNhdFwiKTtcbiAgY29uc3QgY2F0MyA9IG5ldyBDYXQoMywgXCJzdHVmZiBzdHJ1dHRlclwiKTtcbiAgY29uc3QgY2F0NCA9IG5ldyBDYXQoMiwgXCJxdWFzaSBsb2FmXCIpO1xuICBjb25zdCBjYXQ1ID0gbmV3IENhdCgyLCBcImNvbXBhY3Qga2l0dHlcIik7XG4gIHJldHVybiBbY2F0MSwgY2F0MiwgY2F0MywgY2F0NCwgY2F0NV07XG59XG5cbmV4cG9ydCB7IENhdCwgY3JlYXRlQ2F0cyB9O1xuIiwiaW1wb3J0IGNhdDEgZnJvbSBcIi4vaW1nL2JpZy1zdHJldGNoLnN2Z1wiO1xuaW1wb3J0IGNhdDIgZnJvbSBcIi4vaW1nL2NhdDIuc3ZnXCI7XG5pbXBvcnQgY2F0MyBmcm9tIFwiLi9pbWcvd2Fsay5zdmdcIjtcbmltcG9ydCBjYXQ0IGZyb20gXCIuL2ltZy9xdWFzaS1sb2FmMi5zdmdcIjtcbmltcG9ydCBjYXQ1IGZyb20gXCIuL2ltZy9sZXNSb2xsLnN2Z1wiO1xuXG5mdW5jdGlvbiBjcmVhdGVDYXRJbWFnZShzb3VyY2UpIHtcbiAgY29uc3QgY2F0SW1nID0gbmV3IEltYWdlKCk7XG4gIGNhdEltZy5zcmMgPSBzb3VyY2U7XG4gIHJldHVybiBjYXRJbWc7XG59XG5cbmZ1bmN0aW9uIGFkZENhdEltZyhjdXJyZW50Q2F0KSB7XG4gIGNvbnN0IGNhdEltZyA9IG5ldyBJbWFnZSgpO1xuICBjYXRJbWcuY2xhc3NMaXN0LmFkZChcImNhdC1pbWdcIik7XG4gIHN3aXRjaCAoY3VycmVudENhdC50eXBlKSB7XG4gICAgY2FzZSBcImJpZyBzdHJldGNoXCI6XG4gICAgICBjYXRJbWcuc3JjID0gY2F0MTtcbiAgICAgIGNhdEltZy5jbGFzc0xpc3QuYWRkKFwiY2F0MVwiKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJkb3dud2FyZCBjYXRcIjpcbiAgICAgIGNhdEltZy5zcmMgPSBjYXQyO1xuICAgICAgY2F0SW1nLmNsYXNzTGlzdC5hZGQoXCJjYXQyXCIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInN0dWZmIHN0cnV0dGVyXCI6XG4gICAgICBjYXRJbWcuc3JjID0gY2F0MztcbiAgICAgIGNhdEltZy5jbGFzc0xpc3QuYWRkKFwiY2F0M1wiKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJxdWFzaSBsb2FmXCI6XG4gICAgICBjYXRJbWcuc3JjID0gY2F0NDtcbiAgICAgIGNhdEltZy5jbGFzc0xpc3QuYWRkKFwiY2F0NFwiKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJjb21wYWN0IGtpdHR5XCI6XG4gICAgICBjYXRJbWcuc3JjID0gY2F0NTtcbiAgICAgIGNhdEltZy5jbGFzc0xpc3QuYWRkKFwiY2F0NVwiKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxuICBpZiAoY3VycmVudENhdC5vcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICBjYXRJbWcuY2xhc3NMaXN0LmFkZChcImhvcml6b250YWwtY2F0XCIpO1xuICB9XG4gIHJldHVybiBjYXRJbWc7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZENhdEltYWdlcygpIHtcbiAgY29uc3QgZmlyc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jZWxsPScwLTAnXWApO1xuICBjb25zdCBzZWNvbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jZWxsPVwiMC0xXCJdJyk7XG4gIGNvbnN0IHRoaXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY2VsbD1cIjAtMlwiXScpO1xuICBjb25zdCBmb3VydGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jZWxsPVwiMC0zXCJdJyk7XG4gIGNvbnN0IGZpZnRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY2VsbD1cIjItM1wiXScpO1xuICBmaXJzdC5hcHBlbmQoY3JlYXRlQ2F0SW1hZ2UoY2F0MSkpO1xuICBmaXJzdC5jbGFzc0xpc3QuYWRkKFwiY2F0LXRyYWNrZXItZmlyc3RcIik7XG4gIHNlY29uZC5hcHBlbmQoY3JlYXRlQ2F0SW1hZ2UoY2F0MikpO1xuICBzZWNvbmQuY2xhc3NMaXN0LmFkZChcImNhdC10cmFja2VyLXNlY29uZFwiKTtcbiAgdGhpcmQuYXBwZW5kKGNyZWF0ZUNhdEltYWdlKGNhdDMpKTtcbiAgdGhpcmQuY2xhc3NMaXN0LmFkZChcImNhdC10cmFja2VyLXRoaXJkXCIpO1xuICBmb3VydGguYXBwZW5kKGNyZWF0ZUNhdEltYWdlKGNhdDQpKTtcbiAgZm91cnRoLmNsYXNzTGlzdC5hZGQoXCJjYXQtdHJhY2tlci1mb3VydGhcIik7XG4gIGZpZnRoLmFwcGVuZChjcmVhdGVDYXRJbWFnZShjYXQ1KSk7XG4gIGZpZnRoLmNsYXNzTGlzdC5hZGQoXCJjYXQtdHJhY2tlci1maWZ0aFwiKTtcbn1cblxuZnVuY3Rpb24gc2V0Q2F0QW5pbWF0aW9uKGNhdCkge1xuICBsZXQgY2F0SW1hZ2VTcmM7XG4gIGxldCB0YWc7XG4gIHN3aXRjaCAoY2F0LnR5cGUpIHtcbiAgICBjYXNlICdiaWcgc3RyZXRjaCc6XG4gICAgICBjYXRJbWFnZVNyYyA9IGNhdDE7XG4gICAgICB0YWcgPSAnY2F0T25lJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Rvd253YXJkIGNhdCc6XG4gICAgICBjYXRJbWFnZVNyYyA9IGNhdDI7XG4gICAgICB0YWcgPSAnY2F0VHdvJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3N0dWZmIHN0cnV0dGVyJzpcbiAgICAgIGNhdEltYWdlU3JjID0gY2F0MztcbiAgICAgIHRhZyA9ICdjYXRUaHJlZSc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdxdWFzaSBsb2FmJzpcbiAgICAgIGNhdEltYWdlU3JjID0gY2F0NDtcbiAgICAgIHRhZyA9ICdjYXRGb3VyJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2NvbXBhY3Qga2l0dHknOlxuICAgICAgY2F0SW1hZ2VTcmMgPSBjYXQ1O1xuICAgICAgdGFnID0gJ2NhdEZpdmUnO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY2F0LWFuaW1hdGlvbicpO1xuICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChgJHt0YWd9YCk7XG4gIGNvbnN0IGNhdEltZyA9IG5ldyBJbWFnZSgpO1xuICBjYXRJbWcuc3JjID0gY2F0SW1hZ2VTcmM7XG4gIGNvbnRhaW5lci5hcHBlbmQoY2F0SW1nKTtcbiAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYCR7Y2F0Lm9yaWVudGF0aW9ufWApO1xuICByZXR1cm4gY29udGFpbmVyO1xufVxuXG5leHBvcnQgeyBhZGRDYXRJbWcsIGFwcGVuZENhdEltYWdlcywgc2V0Q2F0QW5pbWF0aW9uIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuLyogZXNsaW50LWRpc2FibGUgZGVmYXVsdC1jYXNlICovXG5cbmltcG9ydCByb3RhdGVJY29uIGZyb20gXCIuL2ltZy9mb3JtYXQtcm90YXRlLTkwLnN2Z1wiO1xuaW1wb3J0IHsgYWRkQ2F0SW1nLCBhcHBlbmRDYXRJbWFnZXMsIHNldENhdEFuaW1hdGlvbiB9IGZyb20gXCIuL2NhdEltZ1wiO1xuaW1wb3J0IHsgY29tcEZpcmVTaG90IH0gZnJvbSBcIi4vYm90XCI7XG5pbXBvcnQgeyBjcmVhdGVQbGF5ZXJHYW1lQm9hcmQsIGNyZWF0ZUNvbXBHYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuaW1wb3J0IGVhdFNvdW5kQXVkaW8gZnJvbSAnLi9zb3VuZC9lYXRTb3VuZC5vZ2cnO1xuaW1wb3J0IGhpdEF1ZGlvIGZyb20gJy4vc291bmQvaGl0Lm9nZyc7XG5pbXBvcnQgbWlzc0F1ZGlvIGZyb20gJy4vc291bmQvbWlzcy5vZ2cnO1xuXG5jb25zdCBmdWxsR2FtZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnVsbC1nYW1lJyk7XG5cbmZ1bmN0aW9uIHBsYXlTb3VuZChzcmMsIHZvbCkge1xuICBjb25zdCBzb3VuZCA9IG5ldyBBdWRpbyhzcmMpO1xuICBzb3VuZC52b2x1bWUgPSB2b2w7XG4gIHNvdW5kLnBsYXkoKTtcbn1cblxuY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ib2FyZC1jb250YWluZXJcIik7XG5jb25zdCBjb21wQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXAtYm9hcmQtY29udGFpbmVyXCIpO1xuY29uc3QgY2F0VHJhY2tlckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2F0LXRyYWNrZXItY29udGFpbmVyXCIpO1xuXG5sZXQgY3VycmVudFBsYXllckJvYXJkO1xuXG5mdW5jdGlvbiByb3RhdGVDYXQoKSB7XG4gIGlmICghY3VycmVudFBsYXllckJvYXJkKSByZXR1cm47XG4gIGNvbnN0IGN1cnJlbnRDYXQgPSBjdXJyZW50UGxheWVyQm9hcmQuZ2V0Q3VycmVudENhdCgpO1xuICBpZiAoIWN1cnJlbnRDYXQpIHJldHVybjtcbiAgY3VycmVudENhdC5yb3RhdGUoKTtcbiAgcGxheWVyQm9hcmRDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZShcImhvcml6b250YWxcIik7XG59XG5cbmNvbnN0IHJvdGF0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5jb25zdCByb3RhdGVJbWcgPSBuZXcgSW1hZ2UoKTtcbnJvdGF0ZUltZy5zcmMgPSByb3RhdGVJY29uO1xucm90YXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyb3RhdGUtYnV0dG9uXCIpO1xucm90YXRlQnV0dG9uLmFwcGVuZENoaWxkKHJvdGF0ZUltZyk7XG5yb3RhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgcm90YXRlQ2F0KCk7XG59KTtcblxuZnVuY3Rpb24gY3JlYXRlQ2F0VHJhY2tlcigpIHtcbiAgY29uc3QgY2F0VHJhY2tlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNhdFRyYWNrZXJEaXYuY2xhc3NMaXN0LmFkZChcImNhdC10cmFja2VyXCIpO1xuICBmb3IgKGxldCB5ID0gMDsgeSA8IDQ7IHkrKykge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgNTsgeCsrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnN0IGlkID0gYCR7eH0tJHt5fWA7XG4gICAgICBjZWxsLmRhdGFzZXQuY2VsbCA9IGlkO1xuICAgICAgY2F0VHJhY2tlckRpdi5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNhdFRyYWNrZXJEaXY7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNhdFRyYWNrZXIoY2F0KSB7XG4gIGxldCB5O1xuICBsZXQgeCA9IDA7XG4gIHN3aXRjaCAoY2F0LnR5cGUpIHtcbiAgICBjYXNlIFwiYmlnIHN0cmV0Y2hcIjpcbiAgICAgIHkgPSAwO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImRvd253YXJkIGNhdFwiOlxuICAgICAgeSA9IDE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwic3R1ZmYgc3RydXR0ZXJcIjpcbiAgICAgIHkgPSAyO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInF1YXNpIGxvYWZcIjpcbiAgICAgIHkgPSAzO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImNvbXBhY3Qga2l0dHlcIjpcbiAgICAgIHkgPSAzO1xuICAgICAgeCA9IDI7XG4gICAgICBicmVhaztcbiAgfVxuICBjb25zdCBjb29yZCA9IGAke3ggKyBjYXQuaGl0cyAtIDF9LSR7eX1gO1xuICBjb25zdCBkb21UYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jZWxsPScke2Nvb3JkfSddYCk7XG4gIGRvbVRhcmdldC5jbGFzc0xpc3QuYWRkKFwiY2F0LXRyYWNrZXItaGl0XCIpO1xufVxuXG5mdW5jdGlvbiBhcHBseUhpdEltYWdlKHRhcmdldCwgYm9hcmRJRCwgY29vcmQpIHtcbiAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhdHRhY2tlZFwiKTtcbiAgaWYgKGJvYXJkSUQuYm9hcmRbYFske2Nvb3JkfV1gXS5vY2N1cGllZEJ5KSB7XG4gICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJvY2N1cGllZFwiKTtcbiAgICBpZiAoYm9hcmRJRC5jb21wKSB7XG4gICAgICB1cGRhdGVDYXRUcmFja2VyKGJvYXJkSUQuYm9hcmRbYFske2Nvb3JkfV1gXS5vY2N1cGllZEJ5KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hyaW5rU2l6ZSgpIHtcbiAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXAtYm9hcmRcIik7XG4gIGNvbnN0IG9yaWdpbmFsU2l6ZSA9IGJvYXJkLm9mZnNldFdpZHRoO1xuICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICByZXR1cm4gKHdpbmRvd1dpZHRoIC0gb3JpZ2luYWxTaXplKSAvIDIuMyAvIG9yaWdpbmFsU2l6ZTtcbn1cblxuZnVuY3Rpb24gc2V0U2hyaW5rU2NhbGUoYm9hcmQpIHtcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgIFwiLS1zaHJpbmstc2NhbGVcIixcbiAgICBgbWluKDEsICR7c2hyaW5rU2l6ZShib2FyZCl9KWBcbiAgKTtcbn1cblxuZnVuY3Rpb24gaG92ZXJFZmZlY3QoY2F0KSB7XG4gIGNvbnN0IHByZWZpeCA9IFwicGxheWVyLWJvYXJkXCI7XG4gIGxldCBzdWZmaXg7XG4gIHN3aXRjaCAoY2F0LnR5cGUpIHtcbiAgICBjYXNlIFwiYmlnIHN0cmV0Y2hcIjpcbiAgICAgIHN1ZmZpeCA9IFwiY2F0LXR3b1wiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImRvd253YXJkIGNhdFwiOlxuICAgICAgc3VmZml4ID0gXCJjYXQtdGhyZWVcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJzdHVmZiBzdHJ1dHRlclwiOlxuICAgICAgc3VmZml4ID0gXCJjYXQtZm91clwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInF1YXNpIGxvYWZcIjpcbiAgICAgIHN1ZmZpeCA9IFwiY2F0LWZpdmVcIjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBzdWZmaXggPSBcIlwiO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIGAke3ByZWZpeH0gJHtzdWZmaXh9YDtcbn1cblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IGNyZWF0ZVBsYXllckdhbWVCb2FyZCgpO1xuICBjb25zdCBjb21wQm9hcmQgPSBjcmVhdGVDb21wR2FtZUJvYXJkKCk7XG4gIHBvcHVsYXRlRGlzcGxheShwbGF5ZXJCb2FyZCwgY29tcEJvYXJkKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGRyZW4oZWxlbWVudCkge1xuICB3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFyUGFnZSgpIHtcbiAgY3VycmVudFBsYXllckJvYXJkID0gMDtcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgc2V0U2hyaW5rU2NhbGUpO1xuICBwbGF5ZXJCb2FyZENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwic2hyaW5rXCIpO1xuICByZW1vdmVDaGlsZHJlbihwbGF5ZXJCb2FyZENvbnRhaW5lcik7XG4gIHJlbW92ZUNoaWxkcmVuKGNvbXBCb2FyZENvbnRhaW5lcik7XG4gIHJlbW92ZUNoaWxkcmVuKGNhdFRyYWNrZXJDb250YWluZXIpO1xuICBjYXRUcmFja2VyQ29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICBjb25zdCBjYXRBbmltYXRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhdC1hbmltYXRpb24nKTtcbiAgY2F0QW5pbWF0aW9ucy5mb3JFYWNoKChjYXRBbmkpID0+IHtcbiAgICBjYXRBbmkucmVtb3ZlKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBlbmRHYW1lU2NyZWVuKHdpbikge1xuICBjb25zdCBsb3NlTWVzc2FnZXMgPSBbXG4gICAgXCJBdyBzaHVja3MhIEF0IHRoaXMgcmF0ZSBEci4gVmV0bWFuIGlzIGdvaW5nIHRvIGNhbGwgS1BTIChLaXR0eSBQcm90ZWN0aXZlIFNlcnZpY2VzKVwiLFxuICAgIFwiT2ggd2VsbCEgTW9yZSB0byBsb3ZlLCByaWdodD9cIixcbiAgICBcIlNvZGl1bSBvdmVybG9hZCEgQmV0dGVyIGx1Y2sgbmV4dCB0aW1lXCIsXG4gICAgXCJZb3UgbG9zZSEgSG93IGluIHRoZSB3b3JsZCBkbyB5b3VyIGNhdHMgZWF0IHNvIG1hbnkgY2hlZXNlIGJhbGxzIGFueXdheT9cIixcbiAgICBcIldlbHAhIFRoZXJlIGdvZXMgeW91ciBjYXRzJyBkaWV0cyFcIixcbiAgICBcIkhtbSwgSSB3b25kZXIgaG93IG11Y2ggaXQgaXMgZm9yIG9uZSBvZiB0aG9zZSBjYXQgdHJlYWRtaWxscy4uLlwiLFxuICAgIFwiVGhleSdyZSBub3QgZmF0ISBUaGV5IGp1c3QgaGF2ZSBhIGxvdCBvZiBmdXIhXCIsXG4gIF07XG5cbiAgY29uc3Qgd2luTWVzc2FnZXMgPSBbXG4gICAgXCJDb25ncmF0cyEgWW91ciBjYXRzIGFyZSBsb29raW5nIFRISU4gY29tcGFyZWQgdG8geW91ciBuZWlnaGJvcidzXCIsXG4gICAgXCJEci4gVmV0bWFuIGhhcyBiaWdnZXIgY2F0cyB0byB3b3JyeSBhYm91dCBub3chXCIsXG4gICAgXCJZZWVoYXchIE1heWJlIG5leHQgdGltZSB5b3VyIG5laWdoYm9yIHdpbGwgdGhpbmsgdHdpY2UhXCIsXG4gICAgXCJOaWNlIGFpbSEgWW91IG11c3QndmUgdGhyb3duIGNoZWVzZSBiYWxscyBiZWZvcmUhXCIsXG4gICAgXCJUaGlzIG1pZ2h0IGJlIHlvdXIgZ3JlYXRlc3QgYWNjb21wbGlzaG1lbnRcIixcbiAgICBcIlZpY3RvcnkhIEJ1dCBzZXJpb3VzbHksIHRvbyBtYW55IGNoZWVzZSBiYWxscyBpcyBwcm9iYWJseSBwcmV0dHkgYmFkIGZvciBjYXRzXCIsXG4gICAgXCJXaW5uZXIsIHdpbm5lciwga2l0dHkgZGlubmVyIVwiLFxuICBdO1xuICBjb25zdCBhcnJheSA9IHdpbiA/IHdpbk1lc3NhZ2VzIDogbG9zZU1lc3NhZ2VzO1xuICBjb25zdCBzY3JlZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzY3JlZW4uc3R5bGUub3BhY2l0eSA9IDA7XG4gIHNjcmVlbi5jbGFzc0xpc3QuYWRkKFwiZW5kLWdhbWVcIik7XG4gIGNvbnN0IHZlcmRpY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdmVyZGljdC5jbGFzc0xpc3QuYWRkKCd2ZXJkaWN0Jyk7XG4gIHZlcmRpY3QudGV4dENvbnRlbnQgPSB3aW4gPyAnUGxheWVyIHdpbnMhIDopJyA6ICdOZWlnaGJvciBXaW5zISA6KCdcbiAgY29uc3QgZW5kTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGVuZE1lc3NhZ2UuY2xhc3NMaXN0LmFkZChcImVuZC1tZXNzYWdlXCIpO1xuICBlbmRNZXNzYWdlLnRleHRDb250ZW50ID0gYXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyYXkubGVuZ3RoKV07XG4gIGNvbnN0IHBsYXlBZ2FpbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHBsYXlBZ2FpbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicGxheS1hZ2Fpbi1idXR0b25cIik7XG4gIHBsYXlBZ2FpbkJ1dHRvbi50ZXh0Q29udGVudCA9IFwicGxheSBhZ2FpblwiO1xuICBwbGF5QWdhaW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBzY3JlZW4ucmVtb3ZlKCk7XG4gICAgY2xlYXJQYWdlKCk7XG4gICAgc3RhcnRHYW1lKCk7XG4gIH0pO1xuICBzY3JlZW4uYXBwZW5kKHZlcmRpY3QsIGVuZE1lc3NhZ2UsIHBsYXlBZ2FpbkJ1dHRvbik7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyZWVuKTtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgc2NyZWVuLnN0eWxlLm9wYWNpdHkgPSAxO1xuICB9LCAxMDApO1xufVxuXG5mdW5jdGlvbiBwYXNzQ2F0SW1nQWNyb3NzU2NyZWVuKHsgdHlwZSB9KSB7XG4gIGxldCB0YXJnZXRDbGFzcztcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnYmlnIHN0cmV0Y2gnOlxuICAgICAgdGFyZ2V0Q2xhc3MgPSAnY2F0T25lJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Rvd253YXJkIGNhdCc6XG4gICAgICB0YXJnZXRDbGFzcyA9ICdjYXRUd28nO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc3R1ZmYgc3RydXR0ZXInOlxuICAgICAgdGFyZ2V0Q2xhc3MgPSAnY2F0VGhyZWUnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncXVhc2kgbG9hZic6XG4gICAgICB0YXJnZXRDbGFzcyA9ICdjYXRGb3VyJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2NvbXBhY3Qga2l0dHknOlxuICAgICAgdGFyZ2V0Q2xhc3MgPSAnY2F0Rml2ZSc7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cbiAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3RhcmdldENsYXNzfWApO1xuICB0YXJnZXRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21vdmUnKTtcbn1cblxuZnVuY3Rpb24gY29tcFJldGFsaWF0aW9uKHBsYXllckJvYXJkKSB7XG4gIGNvbnN0IHRhcmdldCA9IGNvbXBGaXJlU2hvdChwbGF5ZXJCb2FyZCk7XG4gIHBsYXllckJvYXJkLnRha2VBdHRhY2sodGFyZ2V0KTtcbiAgY29uc3QgY2F0ID0gcGxheWVyQm9hcmQuYm9hcmRbYFske3RhcmdldH1dYF0ub2NjdXBpZWRCeTtcbiAgaWYgKGNhdCAmJiBjYXQuaXNTdW5rKCkpIHtcbiAgICBwbGF5U291bmQoZWF0U291bmRBdWRpbywgMC41KTtcbiAgICBwYXNzQ2F0SW1nQWNyb3NzU2NyZWVuKGNhdCk7XG4gIH1cbiAgY29uc3QgZGF0YUlEID0gYFtkYXRhLWNvb3JkPScke3RhcmdldH0nXWA7XG4gIGNvbnN0IGRvbUNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRhdGFJRCk7XG4gIGFwcGx5SGl0SW1hZ2UoZG9tQ2VsbCwgcGxheWVyQm9hcmQsIHRhcmdldCk7XG4gIGlmIChwbGF5ZXJCb2FyZC5jaGVja0ZvcldpbigpKSB7XG4gICAgZW5kR2FtZVNjcmVlbihmYWxzZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tcEdhbWVCb2FyZERpc3BsYXkoYm9hcmREYXRhLCBvcHBCb2FyZERhdGEpIHtcbiAgY29uc3QgY29tcEJvYXJkRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbXBCb2FyZERpc3BsYXkuY2xhc3NMaXN0LmFkZChcImNvbXAtYm9hcmRcIik7XG5cbiAgZm9yIChjb25zdCBjb29yZCBvZiBPYmplY3QudmFsdWVzKGJvYXJkRGF0YS5ib2FyZCkpIHtcbiAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGxcIik7XG4gICAgY2VsbC5kYXRhc2V0LmNvbXBDb29yZCA9IGNvb3JkLmNvb3JkaW5hdGVzO1xuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmICghY29vcmQuYXR0YWNrZWQpIHtcbiAgICAgICAgYm9hcmREYXRhLnRha2VBdHRhY2soY29vcmQuY29vcmRpbmF0ZXMpO1xuICAgICAgICBhcHBseUhpdEltYWdlKGNlbGwsIGJvYXJkRGF0YSwgY29vcmQuY29vcmRpbmF0ZXMpO1xuICAgICAgICBpZiAoY29vcmQub2NjdXBpZWRCeSkge1xuICAgICAgICAgIHBsYXlTb3VuZChoaXRBdWRpbywgMC4wNSk7XG4gICAgICAgICAgaWYgKGNvb3JkLm9jY3VwaWVkQnkuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIHBsYXlTb3VuZChlYXRTb3VuZEF1ZGlvLCAwLjUpO1xuICAgICAgICAgICAgY29uc3QgY2F0ID0gY29vcmQub2NjdXBpZWRCeTtcbiAgICAgICAgICAgIGNhdC5kb21FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICBjYXQuY29vcmRIaXQuZm9yRWFjaCgoc3BvdCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBkb21FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgYFtkYXRhLWNvbXAtY29vcmQ9JyR7c3BvdH0nXWBcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZG9tRWwuY2xhc3NMaXN0LmFkZChcImNvbnN1bWVcIik7XG4gICAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChib2FyZERhdGEuY2hlY2tGb3JXaW4oKSkge1xuICAgICAgICAgICAgICBlbmRHYW1lU2NyZWVuKHRydWUpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBsYXlTb3VuZChtaXNzQXVkaW8sIDAuMDIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbXBSZXRhbGlhdGlvbihvcHBCb2FyZERhdGEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbXBCb2FyZERpc3BsYXkuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gIH1cbiAgY29tcEJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXBCb2FyZERpc3BsYXkpO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlQ2F0QW5pbWF0aW9uKGNhdCkge1xuICBjb25zdCBhbmkgPSBzZXRDYXRBbmltYXRpb24oY2F0KTtcbiAgZnVsbEdhbWVEaXNwbGF5LmFwcGVuZChhbmkpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXJHYW1lQm9hcmREaXNwbGF5KHBsYXllckJvYXJkRGF0YSwgY29tcEJvYXJkRGF0YSkge1xuICBjdXJyZW50UGxheWVyQm9hcmQgPSBwbGF5ZXJCb2FyZERhdGE7XG4gIGNvbnN0IHBsYXllckJvYXJkRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHBsYXllckJvYXJkRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwicGxheWVyLWJvYXJkXCIpO1xuICBwbGF5ZXJCb2FyZERpc3BsYXkuY2xhc3NMaXN0LmFkZChcImNhdC1vbmVcIik7XG4gIGZvciAoY29uc3QgY29vcmQgb2YgT2JqZWN0LnZhbHVlcyhwbGF5ZXJCb2FyZERhdGEuYm9hcmQpKSB7XG4gICAgY29uc3Qgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc3BvdC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsXCIpO1xuICAgIHNwb3QuZGF0YXNldC5jb29yZCA9IGNvb3JkLmNvb3JkaW5hdGVzO1xuICAgIHNwb3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRDYXQgPSBwbGF5ZXJCb2FyZERhdGEuZ2V0Q3VycmVudENhdCgpO1xuICAgICAgaWYgKGN1cnJlbnRDYXQgPT09IG51bGwpIHJldHVybjtcbiAgICAgIGNvbnN0IGNvb3JkQXJyYXkgPSBwbGF5ZXJCb2FyZERhdGEuZ2V0Q29vcmRpbmF0ZXMoXG4gICAgICAgIGNvb3JkLmNvb3JkaW5hdGVzLFxuICAgICAgICBjdXJyZW50Q2F0XG4gICAgICApO1xuICAgICAgaWYgKGNvb3JkQXJyYXkpIHtcbiAgICAgICAgcHJlcGFyZUNhdEFuaW1hdGlvbihjdXJyZW50Q2F0KTtcbiAgICAgICAgcGxheWVyQm9hcmREYXRhLnBsYWNlQ2F0KGNvb3JkQXJyYXksIGN1cnJlbnRDYXQpO1xuICAgICAgICBwbGF5ZXJCb2FyZERhdGEuY2F0QWRkZWQoKTtcbiAgICAgICAgcGxheWVyQm9hcmREaXNwbGF5LmNsYXNzTmFtZSA9IGhvdmVyRWZmZWN0KGN1cnJlbnRDYXQpO1xuICAgICAgICBwbGF5ZXJCb2FyZENvbnRhaW5lci5jbGFzc05hbWUgPSBcInBsYXllci1ib2FyZC1jb250YWluZXJcIjtcbiAgICAgICAgc3BvdC5hcHBlbmRDaGlsZChhZGRDYXRJbWcoY3VycmVudENhdCkpO1xuICAgICAgICBpZiAoY3VycmVudENhdC50eXBlID09PSBcImNvbXBhY3Qga2l0dHlcIikge1xuICAgICAgICAgIHBsYXllckJvYXJkQ29udGFpbmVyLnJlbW92ZUNoaWxkKHJvdGF0ZUJ1dHRvbik7XG4gICAgICAgICAgcGxheWVyQm9hcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInNocmlua1wiKTtcbiAgICAgICAgICBjb21wQm9hcmRDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICAgIGNyZWF0ZUNvbXBHYW1lQm9hcmREaXNwbGF5KGNvbXBCb2FyZERhdGEsIHBsYXllckJvYXJkRGF0YSk7XG4gICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgXCItLXNocmluay1zY2FsZVwiLFxuICAgICAgICAgICAgYG1pbigxLCAke3Nocmlua1NpemUoKX0pYFxuICAgICAgICAgICk7XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgc2V0U2hyaW5rU2NhbGUpO1xuICAgICAgICAgIGNhdFRyYWNrZXJDb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICAgIGNvbXBCb2FyZERhdGEuY29tcFBsYWNlQ2F0cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcGxheWVyQm9hcmREaXNwbGF5LmFwcGVuZENoaWxkKHNwb3QpO1xuICB9XG4gIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllckJvYXJkRGlzcGxheSk7XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlRGlzcGxheShwbGF5ZXJCb2FyZERhdGEsIGNvbXBCb2FyZERhdGEpIHtcbiAgY29uc3QgY2F0VHJhY2tlciA9IGNyZWF0ZUNhdFRyYWNrZXIoKTtcbiAgY2F0VHJhY2tlckNvbnRhaW5lci5hcHBlbmQoY2F0VHJhY2tlcik7XG4gIGFwcGVuZENhdEltYWdlcygpO1xuICBjcmVhdGVQbGF5ZXJHYW1lQm9hcmREaXNwbGF5KHBsYXllckJvYXJkRGF0YSwgY29tcEJvYXJkRGF0YSk7XG4gIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHJvdGF0ZUJ1dHRvbik7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICBpZiAoZS5rZXkgPT09IFwiU2hpZnRcIikge1xuICAgIHJvdGF0ZUNhdCgpO1xuICB9XG59KTtcblxuZXhwb3J0IHsgc3RhcnRHYW1lIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVDYXRzIH0gZnJvbSAnLi9jYXQnO1xuaW1wb3J0IHsgYWRkQ2F0SW1nIH0gZnJvbSAnLi9jYXRJbWcnO1xuXG5jb25zdCBwbGFjZSA9IChzdGF0ZSkgPT4gKHtcbiAgcGxhY2VDYXQ6IChjb29yZGluYXRlcywgY2F0KSA9PiB7XG4gICAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgc3RhdGUuYm9hcmRbYFske2Nvb3JkaW5hdGV9XWBdLm9jY3VwaWVkQnkgPSBjYXQ7XG4gICAgfSk7XG4gIH0sXG59KTtcblxuY29uc3QgcmVjZWl2ZUF0dGFjayA9IChzdGF0ZSkgPT4gKHtcbiAgdGFrZUF0dGFjazogKGNvb3JkKSA9PiB7XG4gICAgY29uc3QgY2VsbCA9IHN0YXRlLmJvYXJkW2BbJHtjb29yZH1dYF07XG4gICAgaWYgKGNlbGwuYXR0YWNrZWQpIHJldHVybjtcbiAgICBpZiAoY2VsbC5vY2N1cGllZEJ5KSB7XG4gICAgICBjZWxsLm9jY3VwaWVkQnkuaGl0KGNvb3JkKTtcbiAgICB9XG4gICAgY2VsbC5hdHRhY2tlZCA9IHRydWU7XG4gIH0sXG59KTtcblxuY29uc3QgY29vcmRJbnZhbGlkID0gKHN0YXRlKSA9PiAoe1xuICBjb29yZGluYXRlc0FyZUludmFsaWQ6IChhcnJheSkgPT5cbiAgICBhcnJheS5mbGF0KCkuc29tZSgoaXRlbSkgPT4gaXRlbSA8IDAgfHwgaXRlbSA+IDkpIHx8XG4gICAgYXJyYXkuc29tZSgoaXRlbSkgPT4gc3RhdGUuYm9hcmRbYFske2l0ZW19XWBdLm9jY3VwaWVkQnkpLFxufSk7XG5cbmNvbnN0IGdldENvb3JkID0gKHN0YXRlKSA9PiAoe1xuICBnZXRDb29yZGluYXRlczogKGNvb3JkLCBjYXQpID0+IHtcbiAgICBjb25zdCBhcnJheSA9IFtdO1xuICAgIGNvbnN0IFt4LCB5XSA9IGNvb3JkO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2F0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoY2F0Lm9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgYXJyYXkucHVzaChbeCwgeSArIGldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5LnB1c2goW3ggKyBpLCB5XSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzdGF0ZS5jb29yZGluYXRlc0FyZUludmFsaWQoYXJyYXkpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gYXJyYXk7XG4gIH0sXG59KTtcblxuY29uc3QgdHJhY2tDYXRzQWRkZWQgPSAoc3RhdGUpID0+ICh7XG4gIGNhdEFkZGVkOiAoKSA9PiB7XG4gICAgc3RhdGUuY2F0c0FkZGVkICs9IDE7XG4gIH1cbn0pO1xuXG5jb25zdCBjdXJyZW50Q2F0ID0gKHN0YXRlKSA9PiAoe1xuICBnZXRDdXJyZW50Q2F0OiAoKSA9PiB7XG4gICAgaWYgKHN0YXRlLmNhdHNBZGRlZCA+PSA1KSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gc3RhdGUuY2F0c1tzdGF0ZS5jYXRzQWRkZWRdO1xuICB9XG59KVxuXG5jb25zdCBjZWxsQXNzZXNzbWVudCA9IChzdGF0ZSkgPT4gKHtcbiAgZGV0ZXJtaW5lUmVhbEVzdGF0ZTogKHsgbGVuZ3RoLCBvcmllbnRhdGlvbiB9KSA9PiB7XG4gICAgY29uc3QgbGltaXQgPSAxMSAtIGxlbmd0aDtcbiAgICBjb25zdCBhcnJheSA9IFtdO1xuICAgIGxldCB4ID0gMTA7XG4gICAgbGV0IHkgPSAxMDtcbiAgICBpZiAob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgeSA9IGxpbWl0O1xuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gbGltaXQ7XG4gICAgfVxuICAgIGZvciAobGV0IGggPSAwOyBoIDwgeDsgaCsrKSB7XG4gICAgICBmb3IgKGxldCB2ID0gMDsgdiA8IHk7IHYrKykge1xuICAgICAgICBhcnJheS5wdXNoKFtoLCB2XSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGFycmF5TWludXNPdmVybGFwID0gYXJyYXkuZmlsdGVyKChjZWxsKSA9PlxuICAgICAgc3RhdGUuZ2V0Q29vcmRpbmF0ZXMoY2VsbCwgeyBsZW5ndGgsIG9yaWVudGF0aW9uIH0pXG4gICAgKTtcbiAgICByZXR1cm4gYXJyYXlNaW51c092ZXJsYXA7XG4gIH0sXG59KTtcblxuZnVuY3Rpb24gcmFuZG9tSW5kZXgoYXJyYXkpIHtcbiAgcmV0dXJuIGFycmF5W01hdGguZmxvb3IoYXJyYXkubGVuZ3RoICogTWF0aC5yYW5kb20oKSldO1xufVxuXG5jb25zdCBjb21wdXRlclBsYWNlQ2F0cyA9IChzdGF0ZSkgPT4gKHtcbmNvbXBQbGFjZUNhdHM6ICgpID0+IHtcbiAgc3RhdGUuY2F0cy5mb3JFYWNoKChjYXQpID0+IHtcbiAgICBjYXQucmFuZG9taXplT3JpZW50YXRpb24oKTtcbiAgICBjb25zdCBwb3RlbnRpYWxQbGFjZW1lbnRzID0gc3RhdGUuZGV0ZXJtaW5lUmVhbEVzdGF0ZShjYXQpO1xuICAgIGNvbnN0IHRhcmdldFNwYWNlID0gcmFuZG9tSW5kZXgocG90ZW50aWFsUGxhY2VtZW50cyk7XG4gICAgY29uc3QgYXJyYXlPZkNvb3JkID0gc3RhdGUuZ2V0Q29vcmRpbmF0ZXMoXG4gICAgICB0YXJnZXRTcGFjZSxcbiAgICAgIGNhdFxuICAgICk7XG4gICAgc3RhdGUucGxhY2VDYXQoYXJyYXlPZkNvb3JkLCBjYXQpO1xuICAgIGNvbnN0IGRvbVNwb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb21wLWNvb3JkPScke3RhcmdldFNwYWNlfSdgKTtcbiAgICBjb25zdCBjYXRJbWcgPSBhZGRDYXRJbWcoY2F0KTtcbiAgICBjYXRJbWcuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgZG9tU3BvdC5hcHBlbmRDaGlsZChjYXRJbWcpO1xuICAgIGNhdC5zZXREb21FbGVtZW50KGNhdEltZyk7XG4gIH0pO1xufVxufSlcblxuZnVuY3Rpb24gY3JlYXRlU3BvdCh4LCB5KSB7XG4gIHJldHVybiB7XG4gICAgY29vcmRpbmF0ZXM6IFt4LCB5XSxcbiAgICBvY2N1cGllZEJ5OiBudWxsLFxuICAgIGF0dGFja2VkOiBmYWxzZSxcbiAgfTtcbn1cblxuY29uc3Qgd2luQ2hlY2sgPSAoc3RhdGUpID0+ICh7XG4gIGNoZWNrRm9yV2luOiAoKSA9PiBzdGF0ZS5jYXRzLmV2ZXJ5KChjYXQpID0+IGNhdC5pc1N1bmsoKSksXG59KTtcblxuZnVuY3Rpb24gY3JlYXRlR2FtZUJvYXJkKCkge1xuICBjb25zdCBnYW1lQm9hcmQgPSB7fTtcbiAgZ2FtZUJvYXJkLmJvYXJkID0ge307XG4gIGdhbWVCb2FyZC5jYXRzID0gY3JlYXRlQ2F0cygpO1xuICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5ICs9IDEpIHtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4ICs9IDEpIHtcbiAgICAgIGdhbWVCb2FyZC5ib2FyZFtgWyR7eH0sJHt5fV1gXSA9IGNyZWF0ZVNwb3QoeCwgeSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgIGdhbWVCb2FyZCxcbiAgICBwbGFjZShnYW1lQm9hcmQpLFxuICAgIHJlY2VpdmVBdHRhY2soZ2FtZUJvYXJkKSxcbiAgICBjb29yZEludmFsaWQoZ2FtZUJvYXJkKSxcbiAgICBnZXRDb29yZChnYW1lQm9hcmQpLFxuICAgIHdpbkNoZWNrKGdhbWVCb2FyZCksXG4gICk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllckdhbWVCb2FyZCgpIHtcbiAgY29uc3QgZ2FtZUJvYXJkID0gY3JlYXRlR2FtZUJvYXJkKCk7XG4gIGdhbWVCb2FyZC5jb21wID0gZmFsc2U7XG4gIGdhbWVCb2FyZC5jYXRzQWRkZWQgPSAwO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihnYW1lQm9hcmQsIHRyYWNrQ2F0c0FkZGVkKGdhbWVCb2FyZCksIGN1cnJlbnRDYXQoZ2FtZUJvYXJkKSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXBHYW1lQm9hcmQoKSB7XG4gIGNvbnN0IGdhbWVCb2FyZCA9IGNyZWF0ZUdhbWVCb2FyZCgpO1xuICBnYW1lQm9hcmQuY29tcCA9IHRydWU7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKGdhbWVCb2FyZCwgY2VsbEFzc2Vzc21lbnQoZ2FtZUJvYXJkKSwgY29tcHV0ZXJQbGFjZUNhdHMoZ2FtZUJvYXJkKSk7O1xufVxuXG5leHBvcnQgeyBjcmVhdGVQbGF5ZXJHYW1lQm9hcmQsIGNyZWF0ZUNvbXBHYW1lQm9hcmQsIGNyZWF0ZUdhbWVCb2FyZCB9O1xuIiwiaW1wb3J0IHsgc3RhcnRHYW1lIH0gZnJvbSAnLi9kb20nXG5pbXBvcnQgYmF0dGxlQ2F0c1RoZW1lIGZyb20gJy4vc291bmQvYmF0dGxlLWNhdC10aGVtZS1vbmUtbG9vcC5tcDMnO1xuaW1wb3J0IGJhdHRsZUNhdHNUaGVtZTIgZnJvbSAnLi9zb3VuZC9iYXR0bGUtY2F0cy10aGVtZTIubXAzJztcblxuY29uc3Qgb3BlbmluZ1NjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcGVuaW5nLXNjcmVlbicpO1xuY29uc3QgYmVnaW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmVnaW4tYnV0dG9uJyk7XG5jb25zdCB0aGVtZU11c2ljID0gbmV3IEF1ZGlvKGJhdHRsZUNhdHNUaGVtZSk7XG5jb25zdCB0aGVtZU11c2ljMiA9IG5ldyBBdWRpbyhiYXR0bGVDYXRzVGhlbWUyKTtcbmNvbnN0IGZ1bGxHYW1lRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mdWxsLWdhbWUnKTtcbnRoZW1lTXVzaWMyLm9uZW5kZWQgPSAoKSA9PiB7XG4gIHRoZW1lTXVzaWMucGxheSgpO1xufVxudGhlbWVNdXNpYy5sb29wID0gdHJ1ZTtcbnRoZW1lTXVzaWMyLnZvbHVtZSA9IDAuMjtcbnRoZW1lTXVzaWMudm9sdW1lID0gMC41O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KCkge1xuICBiZWdpbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICB0aGVtZU11c2ljMi5wbGF5KCk7XG4gICAgYmVnaW5CdXR0b24uc3R5bGUudHJhbnNpdGlvbiA9ICc1cyc7XG4gICAgYmVnaW5CdXR0b24uc3R5bGUuc2NhbGUgPSA1MDtcbiAgICBvcGVuaW5nU2NyZWVuLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZnVsbEdhbWVEaXNwbGF5LnJlbW92ZUNoaWxkKG9wZW5pbmdTY3JlZW4pXG4gICAgfSwgMTUwMCk7XG4gIH0pXG4gIHN0YXJ0R2FtZSgpO1xufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ZvbnQvY29tZm9ydGFhLXZhcmlhYmxlZm9udF93Z2h0LXdlYmZvbnQud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2ZvbnQvY29tZm9ydGFhLXZhcmlhYmxlZm9udF93Z2h0LXdlYmZvbnQud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4vaW1nL2dycmFzcy5qcGVnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi9pbWcvcGV4ZWxzLXBpeG1pa2UtNDEzMTk1LmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJjb21meVxcXCI7XFxuICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLFxcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXFxuOnJvb3Qge1xcbiAgLS1iYWNrZ3JvdW5kOiAjMjgyYTM2O1xcbiAgLS1ib2FyZC1zaXplOiBtaW4oNjB2dywgNTAwcHgpO1xcbiAgLS1jZWxsLXNpemU6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgLyAxMCk7XFxuICAtLWxvZ28tYmFsbC1zaXplOiA3NXB4O1xcbiAgLS1zaHJpbmstc2NhbGU6IDE7XFxuICAtLW1hcmdpbjogY2FsYygoMTAwdncgLSB2YXIoLS1ib2FyZC1zaXplKSkgLyAyKTtcXG4gIC0tc2hydW5rLWJvYXJkOiBjYWxjKHZhcigtLWJvYXJkLXNpemUpICogdmFyKC0tc2hyaW5rLXNjYWxlKSk7XFxuICAvKiAtLWNhdC10cmFja2VyLXNpemU6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiAwLjQpOyAqL1xcbiAgLS1jYXQtdHJhY2tlci1wYWRkaW5nOiAxMHB4O1xcbiAgLS1jYXQtdHJhY2tlci13aWR0aDogY2FsYyhcXG4gICAgbWluKChjYWxjKHZhcigtLW1hcmdpbikgKiAwLjk1KSksIDIwMHB4KSAtICh2YXIoLS1jYXQtdHJhY2tlci1wYWRkaW5nKSAqIDIpXFxuICApO1xcbiAgLS1jYXQtdHJhY2tlci1oZWlnaHQ6IGNhbGModmFyKHZhcigtLWNhdC10cmFja2VyLXdpZHRoKSAqICg0IC8gNSkpKTtcXG4gIC0tY2F0LXRyYWNrZXItY2VsbDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci13aWR0aCkgLyA1KTtcXG4gIC0tbWFyZ2luLXRvcDogY2FsYygoKDEwMHZoIC0gMTAwcHgpIC0gdmFyKC0tYm9hcmQtc2l6ZSkpICogMC41KTtcXG59XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogY29tZnksIFZlcmRhbmEsIEdlbmV2YSwgVGFob21hLCBzYW5zLXNlcmlmO1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7IC8qIFNhZmFyaSAqL1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lOyAvKiBJRSAxMCBhbmQgSUUgMTEgKi9cXG4gIHVzZXItc2VsZWN0OiBub25lOyAvKiBTdGFuZGFyZCBzeW50YXggKi9cXG59XFxuXFxuLmZ1bGwtZ2FtZSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogMTAwcHggMWZyIC8gMWZyIDFmciAxZnI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fICsgXCIpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogNDAwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4ub3BlbmluZy1zY3JlZW4ge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgei1pbmRleDogMTA7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fICsgXCIpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogMTAwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHRyYW5zaXRpb246IDJzO1xcbn1cXG5cXG4ub3BlbmluZy1zY3JlZW4gcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjgyYTM2YmM7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgcGFkZGluZzogMzBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XFxufVxcblxcbkBrZXlmcmFtZXMgYm91bmNlIHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2xhdGU6IDA7XFxuICB9XFxuICB0byB7XFxuICAgIHRyYW5zbGF0ZTogMHB4IC0xMHB4O1xcbiAgfVxcbn1cXG5cXG4ub3BlbmluZy1zY3JlZW4gYnV0dG9uIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBib3VuY2U7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDJzO1xcbiAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XFxuICBhbmltYXRpb24tZGlyZWN0aW9uOiBhbHRlcm5hdGU7XFxuICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBib3JkZXI6IG5vbmU7XFxuICB3aWR0aDogMTUwcHg7XFxuICBoZWlnaHQ6IDE1MHB4O1xcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGhzbCgzOSwgMTAwJSwgNTglKSwgaHNsKDM5LCAxMDAlLCA1MCUpKTtcXG4gIGN1cnNvcjogZ3JhYjtcXG4gIHRyYW5zaXRpb246IDAuM3M7XFxufVxcblxcbi5vcGVuaW5nLXNjcmVlbiBidXR0b246aG92ZXIsXFxuLnBsYXktYWdhaW4tYnV0dG9uOmhvdmVyIHtcXG4gIGFuaW1hdGlvbjogbm9uZTtcXG4gIHNjYWxlOiAwLjk7XFxufVxcblxcbi5vcGVuaW5nLXNjcmVlbiBidXR0b246YWN0aXZlLFxcbi5wbGF5LWFnYWluLWJ1dHRvbjphY3RpdmUge1xcbiAgc2NhbGU6IDAuODtcXG59XFxuXFxuLnRpdGxlIHtcXG4gIGdyaWQtYXJlYTogMSAvIDEgLyAyIC8gLTE7XFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxuICBoZWlnaHQ6IHZhcigtLWxvZ28tYmFsbC1zaXplKTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmciAxZnI7XFxufVxcblxcbi50aXRsZSAuYmFsbDpudGgtY2hpbGQoNCkge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAyO1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcblxcbi50aXRsZSAuYmFsbDpudGgtY2hpbGQoMykge1xcbiAgZ3JpZC1hcmVhOiAxIC8gMiAvIDIgLyAzO1xcbn1cXG5cXG4udGl0bGUgLmJhbGw6bnRoLWNoaWxkKDIpIHtcXG4gIGdyaWQtYXJlYTogMSAvIDMgLyAyIC8gNDtcXG59XFxuXFxuLnRpdGxlIC5iYWxsOm50aC1jaGlsZCgxKSB7XFxuICBncmlkLWFyZWE6IDEgLyA0IC8gMiAvIDU7XFxufVxcblxcbi5iYWxsIHtcXG4gIGJveC1zaGFkb3c6IDFweCAxcHggOHB4IHJnYigyNTUsIDE0MCwgMCk7XFxuICBtYXJnaW4tbGVmdDogY2FsYyh2YXIoLS1sb2dvLWJhbGwtc2l6ZSkgKiAtMC41KTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgaGVpZ2h0OiB2YXIoLS1sb2dvLWJhbGwtc2l6ZSk7XFxuICB3aWR0aDogdmFyKC0tbG9nby1iYWxsLXNpemUpO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGhzbCgzOSwgMTAwJSwgNTglKSwgaHNsKDM5LCAxMDAlLCA1MCUpKTtcXG59XFxuXFxuLndvcmRzIHtcXG4gIGdyaWQtYXJlYTogMSAvIDEgLyAyIC8gLTE7XFxufVxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIge1xcbiAgZ3JpZC1hcmVhOiAyIC8gMiAvIDMgLyAzO1xcbiAgdHJhbnNpdGlvbjogMC4zcztcXG4gIG1hcmdpbjogYXV0bztcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XFxuICB6LWluZGV4OiAzO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLFxcbi5jb21wLWJvYXJkIHtcXG4gIC8qIGJveC1zaXppbmc6IGJvcmRlci1ib3g7ICovXFxuICB3aWR0aDogdmFyKC0tYm9hcmQtc2l6ZSk7XFxuICBoZWlnaHQ6IHZhcigtLWJvYXJkLXNpemUpO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCgxMCwgYXV0bykgLyByZXBlYXQoMTAsIGF1dG8pO1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyArIFwiKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IHZhcigtLWNlbGwtc2l6ZSkgdmFyKC0tY2VsbC1zaXplKTtcXG59XFxuXFxuLmdyaWQtY2VsbCB7XFxuICB6LWluZGV4OiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJvcmRlcjogMC41cHggc29saWQgcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjE2NCk7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnBsYXllci1ib2FyZCB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uY29tcC1ib2FyZCAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDUwcHggcmdiKDI1NSwgMTIzLCAwKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG4uY29tcC1ib2FyZCAuZ3JpZC1jZWxsOmFjdGl2ZTo6YWZ0ZXIge1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCA1MHB4IDEwcHggcmdiKDI1NSwgMTIzLCAwKTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40NjIpO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmNhdC1vbmUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5ob3Jpem9udGFsXFxuICAucGxheWVyLWJvYXJkLmNhdC1vbmVcXG4gIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA1KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtdHdvIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuaG9yaXpvbnRhbFxcbiAgLnBsYXllci1ib2FyZC5jYXQtdHdvXFxuICAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNCk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuY2F0LXRocmVlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuaG9yaXpvbnRhbFxcbiAgLnBsYXllci1ib2FyZC5jYXQtdGhyZWVcXG4gIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtZm91ciAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlcixcXG4ucGxheWVyLWJvYXJkLmNhdC1maXZlIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuaG9yaXpvbnRhbFxcbiAgLnBsYXllci1ib2FyZC5jYXQtZm91clxcbiAgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIsXFxuLnBsYXllci1ib2FyZC1jb250YWluZXIuaG9yaXpvbnRhbFxcbiAgLnBsYXllci1ib2FyZC5jYXQtZml2ZVxcbiAgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbmsge1xcbiAgc2NhbGU6IHZhcigtLXNocmluay1zY2FsZSk7XFxuICB0cmFuc2xhdGU6IGNhbGMoKHZhcigtLW1hcmdpbikgKyB2YXIoLS1zaHJ1bmstYm9hcmQpKSAqIC0wLjUpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbms6aG92ZXIge1xcbiAgc2NhbGU6IDAuNzU7XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmNhdC1pbWcge1xcbiAgdHJhbnNpdGlvbjogMC4zcztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogM3B4O1xcbiAgcm90YXRlOiAtOTBkZWc7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4uY2F0MSB7XFxuICByaWdodDogLTEwcHg7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSg1LjUsIDQpO1xcbn1cXG5cXG4uY2F0MS5ob3Jpem9udGFsLWNhdCB7XFxuICB0b3A6IDVweDtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA1KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMy44LCAyLjcpO1xcbn1cXG5cXG4uY2F0MiB7XFxuICB0b3A6IDVweDtcXG4gIGxlZnQ6IC01cHg7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDQpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSg0LjMsIDIuNSk7XFxufVxcblxcbi5jYXQyLmhvcml6b250YWwtY2F0IHtcXG4gIHRvcDogLTNweDtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi45LCAxLjcpO1xcbn1cXG5cXG4uY2F0MyB7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMy41LCAyLjUpO1xcbn1cXG5cXG4uY2F0My5ob3Jpem9udGFsLWNhdCB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMyk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIuNSwgMS44KTtcXG59XFxuXFxuLmNhdDQge1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIsIDIpO1xcbn1cXG5cXG4uY2F0NC5ob3Jpem9udGFsLWNhdCB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuNSk7XFxufVxcblxcbi5jYXQ1IHtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLCAxLjUpO1xcbn1cXG5cXG4uY2F0NS5ob3Jpem9udGFsLWNhdCB7XFxuICB3aWR0aDogY2FsYygodmFyKC0tY2VsbC1zaXplKSAqIDIpKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41LCAxLjEpO1xcbn1cXG5cXG4uaG9yaXpvbnRhbC1jYXQge1xcbiAgdG9wOiAwcHg7XFxuICBsZWZ0OiAwcHg7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICByb3RhdGU6IDBkZWc7XFxufVxcblxcbi5ncmlkLWNlbGwuYXR0YWNrZWQ6OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCAxNXB4IG9yYW5nZTtcXG59XFxuXFxuLmdyaWQtY2VsbC5hdHRhY2tlZDo6YmVmb3JlIHtcXG4gIHotaW5kZXg6IDE7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLyAzKTtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpIC8gMyk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMTY2LCAwLCAwLjY5OCk7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBpbnNldDogMDtcXG4gIG1hcmdpbjogYXV0bztcXG59XFxuXFxuLmdyaWQtY2VsbC5hdHRhY2tlZC5vY2N1cGllZDo6YmVmb3JlIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLyAxLjUpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLyAxLjUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xcbiAgdHJhbnNpdGlvbjogMXM7XFxufVxcblxcbi5ncmlkLWNlbGwuYXR0YWNrZWQub2NjdXBpZWQuY29uc3VtZTo6YmVmb3JlIHtcXG4gIHNjYWxlOiAwO1xcbn1cXG5cXG4ucm90YXRlLWJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMzksIDEwMCUsIDUwJSk7XFxuICBhcHBlYXJhbmNlOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgd2lkdGg6IDUwcHg7XFxuICBoZWlnaHQ6IDUwcHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBtYXJnaW46IDVweDtcXG59XFxuXFxuLnJvdGF0ZS1idXR0b24gaW1nIHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4ucm90YXRlLWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMzksIDEwMCUsIDYwJSk7XFxufVxcblxcbi5yb3RhdGUtYnV0dG9uOmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMzksIDEwMCUsIDgwJSk7XFxufVxcblxcbi5jb21wLWJvYXJkLWNvbnRhaW5lciB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgZ3JpZC1hcmVhOiAyIC8gMiAvIDMgLyAzO1xcbiAgd2lkdGg6IG1pbi1jb250ZW50O1xcbiAgaGVpZ2h0OiBtaW4tY29udGVudDtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBpbnNldDogMDtcXG4gIG1hcmdpbjogYXV0bztcXG59XFxuXFxuLmhpZGRlbiB7XFxuICBvcGFjaXR5OiAwO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXItY29udGFpbmVyIHtcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40MDUpO1xcbiAgcGFkZGluZzogdmFyKC0tY2F0LXRyYWNrZXItcGFkZGluZyk7XFxuICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxuICBtYXJnaW46IHZhcigtLW1hcmdpbi10b3ApIDEwcHg7XFxuICBncmlkLWFyZWE6IDIgLyAzIC8gMyAvIDQ7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbi5jYXQtdHJhY2tlciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDQsIGF1dG8pIC8gcmVwZWF0KDUsIGF1dG8pO1xcbiAgd2lkdGg6IHZhcigtLWNhdC10cmFja2VyLXdpZHRoKTtcXG4gIGhlaWdodDogdmFyKC0tY2F0LXRyYWNrZXItaGVpZ2h0KTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgZGl2IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBib3JkZXI6IDAuNXB4IHNvbGlkIHJnYmEoMTI4LCAxMjgsIDEyOCwgMC41KTtcXG4gIGhlaWdodDogdmFyKC0tY2F0LXRyYWNrZXItY2VsbCk7XFxuICB3aWR0aDogdmFyKC0tY2F0LXRyYWNrZXItY2VsbCk7XFxufVxcblxcbi5jYXQtdHJhY2tlciBkaXY6OmFmdGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xcbiAgd2lkdGg6IDQwJTtcXG4gIGhlaWdodDogNDAlO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgei1pbmRleDogMztcXG4gIGluc2V0OiAwO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IDAuNXM7XFxufVxcblxcbi5jYXQtdHJhY2tlciBkaXY6OmJlZm9yZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgei1pbmRleDogMjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjAxLCAyMDEsIDIwMSwgMC41NCk7XFxuICBvcGFjaXR5OiAwO1xcbiAgbGVmdDogMDtcXG59XFxuXFxuLmNhdC10cmFja2VyIGRpdi5jYXQtdHJhY2tlci1oaXQ6OmFmdGVyLFxcbi5jYXQtdHJhY2tlciBkaXYuY2F0LXRyYWNrZXItaGl0OjpiZWZvcmUge1xcbiAgb3BhY2l0eTogMTtcXG59XFxuXFxuLmNhdC10cmFja2VyIGRpdiBpbWcge1xcbiAgaGVpZ2h0OiB2YXIoLS1jYXQtdHJhY2tlci1jZWxsKTtcXG59XFxuXFxuLmNhdC10cmFja2VyLWZpcnN0IGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDUpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjQsIDIuNyk7XFxufVxcblxcbi5jYXQtdHJhY2tlci1zZWNvbmQgaW1nIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLWNlbGwpICogNCk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIuOSwgMS43KTtcXG59XFxuXFxuLmNhdC10cmFja2VyLXRoaXJkIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDMpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLjUsIDEuOCk7XFxufVxcblxcbi5jYXQtdHJhY2tlci1mb3VydGggaW1nIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLWNlbGwpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuNSk7XFxufVxcblxcbi5jYXQtdHJhY2tlci1maWZ0aCBpbWcge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItY2VsbCkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41LCAxLjEpO1xcbn1cXG5cXG4uZW5kLWdhbWUge1xcbiAgei1pbmRleDogMztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjgyYTM2Y2U7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgdHJhbnNpdGlvbjogMC41cztcXG59XFxuXFxuLmVuZC1nYW1lIC52ZXJkaWN0IHtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIG9yYW5nZTtcXG4gIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChoc2woMzksIDEwMCUsIDU4JSksIGhzbGEoMzksIDEwMCUsIDUwJSwgMC44KSk7XFxuICBwYWRkaW5nOiA1MHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcXG59XFxuXFxuLmVuZC1tZXNzYWdlIHtcXG4gIHdpZHRoOiAzMDBweDtcXG59XFxuXFxuLnBsYXktYWdhaW4tYnV0dG9uIHtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgbWFyZ2luOiAxMHB4O1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcbiAgd2lkdGg6IDEwMHB4O1xcbiAgaGVpZ2h0OiAxMDBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChoc2woMzksIDEwMCUsIDU4JSksIGhzbCgzOSwgMTAwJSwgNTAlKSk7XFxuICBjdXJzb3I6IGdyYWI7XFxuICB0cmFuc2l0aW9uOiAwLjNzO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbn1cXG5cXG4uY2F0LWFuaW1hdGlvbiB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB6LWluZGV4OiAyMDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogYXV0bztcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgLyogdHJhbnNmb3JtLW9yaWdpbjogdG9wIGxlZnQ7ICovXFxuICB0cmFuc2l0aW9uOiB0cmFuc2xhdGUgMS41cyBlYXNlLWluLW91dDtcXG4gIGluc2V0OiAwO1xcbiAgbWFyZ2luOiBhdXRvO1xcbn1cXG5cXG4uY2F0LWFuaW1hdGlvbi52ZXJ0aWNhbCB7XFxuICByb3RhdGU6IC05MGRlZztcXG59XFxuXFxuLmNhdC1hbmltYXRpb24uY2F0T25lLFxcbi5jYXQtYW5pbWF0aW9uLmNhdFR3byxcXG4uY2F0LWFuaW1hdGlvbi5jYXRGb3VyLFxcbi5jYXQtYW5pbWF0aW9uLmNhdFRocmVlLm1vdmUsXFxuLmNhdC1hbmltYXRpb24uY2F0Rml2ZS5tb3ZlIHtcXG4gIHRyYW5zbGF0ZTogLTEwMHZ3O1xcbn1cXG5cXG4uY2F0LWFuaW1hdGlvbi5jYXRUaHJlZSxcXG4uY2F0LWFuaW1hdGlvbi5jYXRGaXZlLFxcbi5jYXQtYW5pbWF0aW9uLmNhdE9uZS5tb3ZlLFxcbi5jYXQtYW5pbWF0aW9uLmNhdFR3by5tb3ZlLFxcbi5jYXQtYW5pbWF0aW9uLmNhdEZvdXIubW92ZSB7XFxuICB0cmFuc2xhdGU6IDEwMHZ3O1xcbn1cXG5cXG4uY2F0LWFuaW1hdGlvbi5jYXRPbmUudmVydGljYWwsXFxuLmNhdC1hbmltYXRpb24uY2F0VHdvLnZlcnRpY2FsLFxcbi5jYXQtYW5pbWF0aW9uLmNhdEZvdXIudmVydGljYWwsXFxuLmNhdC1hbmltYXRpb24uY2F0VGhyZWUudmVydGljYWwubW92ZSxcXG4uY2F0LWFuaW1hdGlvbi5jYXRGaXZlLnZlcnRpY2FsLm1vdmUgIHtcXG4gIHRyYW5zbGF0ZTogMCAxMjB2aDtcXG59XFxuXFxuLmNhdC1hbmltYXRpb24uY2F0VGhyZWUudmVydGljYWwsXFxuLmNhdC1hbmltYXRpb24uY2F0Rml2ZS52ZXJ0aWNhbCxcXG4uY2F0LWFuaW1hdGlvbi5jYXRPbmUudmVydGljYWwubW92ZSxcXG4uY2F0LWFuaW1hdGlvbi5jYXRUd28udmVydGljYWwubW92ZSxcXG4uY2F0LWFuaW1hdGlvbi5jYXRGb3VyLnZlcnRpY2FsLm1vdmUgIHtcXG4gIHRyYW5zbGF0ZTogMCAtMTIwdmg7XFxufVxcblxcbi5jYXQtYW5pbWF0aW9uIGltZyB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA4NTBweCkge1xcbiAgOnJvb3Qge1xcbiAgICAtLXNjYWxlLXNpemU6IDAuNDtcXG4gICAgLS1ib2FyZC1zaXplOiBtaW4oNjB2aCwgOTB2dyk7XFxuICAgIC0tbG9nby1iYWxsLXNpemU6IDUwcHg7XFxuICAgIC0tc2Vjb25kLXJvdzogY2FsYygoOTV2aCAtIDUwcHgpICogKDEgLyAoMS4zICsgMSkpKTtcXG4gICAgLS10aGlyZC1yb3c6IGNhbGMoKDk1dmggLSA1MHB4KSAqICgxLjMgLyAoMS4zICsgMSkpKTtcXG4gICAgLS1taW5pLWJvYXJkLXNpemU6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiB2YXIoLS1zY2FsZS1zaXplKSk7XFxuICAgIC0tY2F0LXRyYWNrZXItd2lkdGg6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiAwLjQpO1xcbiAgfVxcblxcbiAgLmZ1bGwtZ2FtZSB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGU6IDV2aCAxZnIgMS4zZnIgNTBweC8gNTB2dyA1MHZ3O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuXFxuICAudGl0bGUge1xcbiAgICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDM7XFxuICAgIG1hcmdpbi10b3A6IDA7XFxuICB9XFxuXFxuICBoMSB7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gIH1cXG5cXG4gIC5wbGF5ZXItYm9hcmQtY29udGFpbmVyIHtcXG4gICAgZ3JpZC1hcmVhOiAzIC8gMSAvIDQgLyAzO1xcbiAgfVxcblxcbiAgLnBsYXllci1ib2FyZC1jb250YWluZXIuc2hyaW5rIHtcXG4gICAgc2NhbGU6IHZhcigtLXNjYWxlLXNpemUpO1xcbiAgICB0cmFuc2xhdGU6IDBweFxcbiAgICAgIGNhbGMoXFxuICAgICAgICAoXFxuICAgICAgICAgICAgdmFyKC0tdGhpcmQtcm93KSAtIHZhcigtLWJvYXJkLXNpemUpICsgdmFyKC0tc2Vjb25kLXJvdykgK1xcbiAgICAgICAgICAgICAgdmFyKC0tbWluaS1ib2FyZC1zaXplKVxcbiAgICAgICAgICApICogLTAuNVxcbiAgICAgICk7XFxuICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgfVxcblxcbiAgLnBsYXllci1ib2FyZC1jb250YWluZXIuc2hyaW5rOmhvdmVyIHtcXG4gICAgc2NhbGU6IDAuNzU7XFxuICB9XFxuXFxuICAuY29tcC1ib2FyZC1jb250YWluZXIge1xcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGdyaWQtYXJlYTogMyAvIDEgLyA0IC8gMztcXG4gIH1cXG5cXG4gIC5jYXQtdHJhY2tlci1jb250YWluZXIge1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIGdyaWQtYXJlYTogMiAvIDIgLyAzIC8gMztcXG4gIH1cXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0NTBweCkge1xcbiAgOnJvb3Qge1xcbiAgICAtLXNjYWxlLXNpemU6IDAuNTtcXG4gIH1cXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLG9CQUFvQjtFQUNwQjswREFDdUU7RUFDdkUsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQiw4QkFBOEI7RUFDOUIseUNBQXlDO0VBQ3pDLHNCQUFzQjtFQUN0QixpQkFBaUI7RUFDakIsK0NBQStDO0VBQy9DLDZEQUE2RDtFQUM3RCx1REFBdUQ7RUFDdkQsMkJBQTJCO0VBQzNCOztHQUVDO0VBQ0QsbUVBQW1FO0VBQ25FLHNEQUFzRDtFQUN0RCwrREFBK0Q7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V0FBVztFQUNYLFlBQVk7RUFDWixZQUFZO0VBQ1osb0JBQW9CO0VBQ3BCLGdDQUFnQztFQUNoQyxzQ0FBc0M7RUFDdEMsUUFBUTtFQUNSLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7Ozs7O0VBS0UsaUJBQWlCO0FBQ25COztBQUVBOzs7OztFQUtFLGdCQUFnQjtBQUNsQjs7QUFFQTs7Ozs7RUFLRSxrQkFBa0I7QUFDcEI7O0FBRUE7Ozs7O0VBS0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFO0lBQ0UsaUJBQWlCO0lBQ2pCLDZCQUE2QjtJQUM3QixzQkFBc0I7SUFDdEIsbURBQW1EO0lBQ25ELG9EQUFvRDtJQUNwRCw4REFBOEQ7SUFDOUQsa0RBQWtEO0VBQ3BEOztFQUVBO0lBQ0UsYUFBYTtJQUNiLDRDQUE0QztJQUM1QyxtQkFBbUI7SUFDbkIscUJBQXFCO0VBQ3ZCOztFQUVBO0lBQ0Usd0JBQXdCO0lBQ3hCLGFBQWE7RUFDZjs7RUFFQTtJQUNFLGVBQWU7RUFDakI7O0VBRUE7SUFDRSx3QkFBd0I7RUFDMUI7O0VBRUE7SUFDRSx3QkFBd0I7SUFDeEI7Ozs7OztPQU1HO0lBQ0gsb0JBQW9CO0VBQ3RCOztFQUVBO0lBQ0UsV0FBVztFQUNiOztFQUVBO0lBQ0UsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsd0JBQXdCO0VBQzFCOztFQUVBO0lBQ0UsWUFBWTtJQUNaLHdCQUF3QjtFQUMxQjtBQUNGOztBQUVBO0VBQ0U7SUFDRSxpQkFBaUI7RUFDbkI7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiY29tZnlcXFwiO1xcbiAgc3JjOiB1cmwoXFxcIi4vZm9udC9jb21mb3J0YWEtdmFyaWFibGVmb250X3dnaHQtd2ViZm9udC53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSxcXG4gICAgdXJsKFxcXCIuL2ZvbnQvY29tZm9ydGFhLXZhcmlhYmxlZm9udF93Z2h0LXdlYmZvbnQud29mZlxcXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXFxuOnJvb3Qge1xcbiAgLS1iYWNrZ3JvdW5kOiAjMjgyYTM2O1xcbiAgLS1ib2FyZC1zaXplOiBtaW4oNjB2dywgNTAwcHgpO1xcbiAgLS1jZWxsLXNpemU6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgLyAxMCk7XFxuICAtLWxvZ28tYmFsbC1zaXplOiA3NXB4O1xcbiAgLS1zaHJpbmstc2NhbGU6IDE7XFxuICAtLW1hcmdpbjogY2FsYygoMTAwdncgLSB2YXIoLS1ib2FyZC1zaXplKSkgLyAyKTtcXG4gIC0tc2hydW5rLWJvYXJkOiBjYWxjKHZhcigtLWJvYXJkLXNpemUpICogdmFyKC0tc2hyaW5rLXNjYWxlKSk7XFxuICAvKiAtLWNhdC10cmFja2VyLXNpemU6IGNhbGModmFyKC0tYm9hcmQtc2l6ZSkgKiAwLjQpOyAqL1xcbiAgLS1jYXQtdHJhY2tlci1wYWRkaW5nOiAxMHB4O1xcbiAgLS1jYXQtdHJhY2tlci13aWR0aDogY2FsYyhcXG4gICAgbWluKChjYWxjKHZhcigtLW1hcmdpbikgKiAwLjk1KSksIDIwMHB4KSAtICh2YXIoLS1jYXQtdHJhY2tlci1wYWRkaW5nKSAqIDIpXFxuICApO1xcbiAgLS1jYXQtdHJhY2tlci1oZWlnaHQ6IGNhbGModmFyKHZhcigtLWNhdC10cmFja2VyLXdpZHRoKSAqICg0IC8gNSkpKTtcXG4gIC0tY2F0LXRyYWNrZXItY2VsbDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci13aWR0aCkgLyA1KTtcXG4gIC0tbWFyZ2luLXRvcDogY2FsYygoKDEwMHZoIC0gMTAwcHgpIC0gdmFyKC0tYm9hcmQtc2l6ZSkpICogMC41KTtcXG59XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogY29tZnksIFZlcmRhbmEsIEdlbmV2YSwgVGFob21hLCBzYW5zLXNlcmlmO1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7IC8qIFNhZmFyaSAqL1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lOyAvKiBJRSAxMCBhbmQgSUUgMTEgKi9cXG4gIHVzZXItc2VsZWN0OiBub25lOyAvKiBTdGFuZGFyZCBzeW50YXggKi9cXG59XFxuXFxuLmZ1bGwtZ2FtZSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogMTAwcHggMWZyIC8gMWZyIDFmciAxZnI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXFxcIi4vaW1nL2dycmFzcy5qcGVnXFxcIik7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1zaXplOiA0MDBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5vcGVuaW5nLXNjcmVlbiB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICB6LWluZGV4OiAxMDtcXG4gIGJhY2tncm91bmQ6IHVybChcXFwiLi9pbWcvZ3JyYXNzLmpwZWdcXFwiKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB0cmFuc2l0aW9uOiAycztcXG59XFxuXFxuLm9wZW5pbmctc2NyZWVuIHAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI4MmEzNmJjO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHdpZHRoOiAzMDBweDtcXG4gIHBhZGRpbmc6IDMwcHg7XFxuICBib3JkZXItcmFkaXVzOiAzMHB4O1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGJvdW5jZSB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNsYXRlOiAwO1xcbiAgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2xhdGU6IDBweCAtMTBweDtcXG4gIH1cXG59XFxuXFxuLm9wZW5pbmctc2NyZWVuIGJ1dHRvbiB7XFxuICBhbmltYXRpb24tbmFtZTogYm91bmNlO1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAycztcXG4gIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xcbiAgYW5pbWF0aW9uLWRpcmVjdGlvbjogYWx0ZXJuYXRlO1xcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7XFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICBhcHBlYXJhbmNlOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgd2lkdGg6IDE1MHB4O1xcbiAgaGVpZ2h0OiAxNTBweDtcXG4gIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChoc2woMzksIDEwMCUsIDU4JSksIGhzbCgzOSwgMTAwJSwgNTAlKSk7XFxuICBjdXJzb3I6IGdyYWI7XFxuICB0cmFuc2l0aW9uOiAwLjNzO1xcbn1cXG5cXG4ub3BlbmluZy1zY3JlZW4gYnV0dG9uOmhvdmVyLFxcbi5wbGF5LWFnYWluLWJ1dHRvbjpob3ZlciB7XFxuICBhbmltYXRpb246IG5vbmU7XFxuICBzY2FsZTogMC45O1xcbn1cXG5cXG4ub3BlbmluZy1zY3JlZW4gYnV0dG9uOmFjdGl2ZSxcXG4ucGxheS1hZ2Fpbi1idXR0b246YWN0aXZlIHtcXG4gIHNjYWxlOiAwLjg7XFxufVxcblxcbi50aXRsZSB7XFxuICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIC0xO1xcbiAgd2lkdGg6IG1pbi1jb250ZW50O1xcbiAgaGVpZ2h0OiB2YXIoLS1sb2dvLWJhbGwtc2l6ZSk7XFxuICBtYXJnaW46IGF1dG87XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnIgMWZyO1xcbn1cXG5cXG4udGl0bGUgLmJhbGw6bnRoLWNoaWxkKDQpIHtcXG4gIGdyaWQtYXJlYTogMSAvIDEgLyAyIC8gMjtcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcbn1cXG5cXG4udGl0bGUgLmJhbGw6bnRoLWNoaWxkKDMpIHtcXG4gIGdyaWQtYXJlYTogMSAvIDIgLyAyIC8gMztcXG59XFxuXFxuLnRpdGxlIC5iYWxsOm50aC1jaGlsZCgyKSB7XFxuICBncmlkLWFyZWE6IDEgLyAzIC8gMiAvIDQ7XFxufVxcblxcbi50aXRsZSAuYmFsbDpudGgtY2hpbGQoMSkge1xcbiAgZ3JpZC1hcmVhOiAxIC8gNCAvIDIgLyA1O1xcbn1cXG5cXG4uYmFsbCB7XFxuICBib3gtc2hhZG93OiAxcHggMXB4IDhweCByZ2IoMjU1LCAxNDAsIDApO1xcbiAgbWFyZ2luLWxlZnQ6IGNhbGModmFyKC0tbG9nby1iYWxsLXNpemUpICogLTAuNSk7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGhlaWdodDogdmFyKC0tbG9nby1iYWxsLXNpemUpO1xcbiAgd2lkdGg6IHZhcigtLWxvZ28tYmFsbC1zaXplKTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChoc2woMzksIDEwMCUsIDU4JSksIGhzbCgzOSwgMTAwJSwgNTAlKSk7XFxufVxcblxcbi53b3JkcyB7XFxuICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIC0xO1xcbn1cXG5oMSB7XFxuICBmb250LXNpemU6IDJyZW07XFxufVxcblxcbi5wbGF5ZXItYm9hcmQtY29udGFpbmVyIHtcXG4gIGdyaWQtYXJlYTogMiAvIDIgLyAzIC8gMztcXG4gIHRyYW5zaXRpb246IDAuM3M7XFxuICBtYXJnaW46IGF1dG87XFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxuICBoZWlnaHQ6IG1pbi1jb250ZW50O1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xcbiAgei1pbmRleDogMztcXG59XFxuXFxuLnBsYXllci1ib2FyZCxcXG4uY29tcC1ib2FyZCB7XFxuICAvKiBib3gtc2l6aW5nOiBib3JkZXItYm94OyAqL1xcbiAgd2lkdGg6IHZhcigtLWJvYXJkLXNpemUpO1xcbiAgaGVpZ2h0OiB2YXIoLS1ib2FyZC1zaXplKTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTAsIGF1dG8pIC8gcmVwZWF0KDEwLCBhdXRvKTtcXG4gIGJhY2tncm91bmQ6IHVybChcXFwiLi9pbWcvcGV4ZWxzLXBpeG1pa2UtNDEzMTk1LmpwZ1xcXCIpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogdmFyKC0tY2VsbC1zaXplKSB2YXIoLS1jZWxsLXNpemUpO1xcbn1cXG5cXG4uZ3JpZC1jZWxsIHtcXG4gIHotaW5kZXg6IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYm9yZGVyOiAwLjVweCBzb2xpZCByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMTY0KTtcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5jb21wLWJvYXJkIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggNTBweCByZ2IoMjU1LCAxMjMsIDApO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxufVxcblxcbi5jb21wLWJvYXJkIC5ncmlkLWNlbGw6YWN0aXZlOjphZnRlciB7XFxuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDUwcHggMTBweCByZ2IoMjU1LCAxMjMsIDApO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQ2Mik7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQuY2F0LW9uZSAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNSk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQtY29udGFpbmVyLmhvcml6b250YWxcXG4gIC5wbGF5ZXItYm9hcmQuY2F0LW9uZVxcbiAgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmNhdC10d28gLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDQpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5ob3Jpem9udGFsXFxuICAucGxheWVyLWJvYXJkLmNhdC10d29cXG4gIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyIHtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiA0KTtcXG59XFxuXFxuLnBsYXllci1ib2FyZC5jYXQtdGhyZWUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5ob3Jpem9udGFsXFxuICAucGxheWVyLWJvYXJkLmNhdC10aHJlZVxcbiAgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLmNhdC1mb3VyIC5ncmlkLWNlbGw6aG92ZXI6OmFmdGVyLFxcbi5wbGF5ZXItYm9hcmQuY2F0LWZpdmUgLmdyaWQtY2VsbDpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDIpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5ob3Jpem9udGFsXFxuICAucGxheWVyLWJvYXJkLmNhdC1mb3VyXFxuICAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlcixcXG4ucGxheWVyLWJvYXJkLWNvbnRhaW5lci5ob3Jpem9udGFsXFxuICAucGxheWVyLWJvYXJkLmNhdC1maXZlXFxuICAuZ3JpZC1jZWxsOmhvdmVyOjphZnRlciB7XFxuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQtY29udGFpbmVyLnNocmluayB7XFxuICBzY2FsZTogdmFyKC0tc2hyaW5rLXNjYWxlKTtcXG4gIHRyYW5zbGF0ZTogY2FsYygodmFyKC0tbWFyZ2luKSArIHZhcigtLXNocnVuay1ib2FyZCkpICogLTAuNSk7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQtY29udGFpbmVyLnNocmluazpob3ZlciB7XFxuICBzY2FsZTogMC43NTtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4uY2F0LWltZyB7XFxuICB0cmFuc2l0aW9uOiAwLjNzO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAzcHg7XFxuICByb3RhdGU6IC05MGRlZztcXG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbi5jYXQxIHtcXG4gIHJpZ2h0OiAtMTBweDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNSk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDUuNSwgNCk7XFxufVxcblxcbi5jYXQxLmhvcml6b250YWwtY2F0IHtcXG4gIHRvcDogNXB4O1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDUpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjgsIDIuNyk7XFxufVxcblxcbi5jYXQyIHtcXG4gIHRvcDogNXB4O1xcbiAgbGVmdDogLTVweDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogNCk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDQuMywgMi41KTtcXG59XFxuXFxuLmNhdDIuaG9yaXpvbnRhbC1jYXQge1xcbiAgdG9wOiAtM3B4O1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDQpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyLjksIDEuNyk7XFxufVxcblxcbi5jYXQzIHtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDMpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgzLjUsIDIuNSk7XFxufVxcblxcbi5jYXQzLmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAzKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi41LCAxLjgpO1xcbn1cXG5cXG4uY2F0NCB7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMiwgMik7XFxufVxcblxcbi5jYXQ0Lmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41KTtcXG59XFxuXFxuLmNhdDUge1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIsIDEuNSk7XFxufVxcblxcbi5jYXQ1Lmhvcml6b250YWwtY2F0IHtcXG4gIHdpZHRoOiBjYWxjKCh2YXIoLS1jZWxsLXNpemUpICogMikpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUsIDEuMSk7XFxufVxcblxcbi5ob3Jpem9udGFsLWNhdCB7XFxuICB0b3A6IDBweDtcXG4gIGxlZnQ6IDBweDtcXG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcXG4gIHJvdGF0ZTogMGRlZztcXG59XFxuXFxuLmdyaWQtY2VsbC5hdHRhY2tlZDo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDE1cHggb3JhbmdlO1xcbn1cXG5cXG4uZ3JpZC1jZWxsLmF0dGFja2VkOjpiZWZvcmUge1xcbiAgei1pbmRleDogMTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAvIDMpO1xcbiAgaGVpZ2h0OiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgLyAzKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAxNjYsIDAsIDAuNjk4KTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGluc2V0OiAwO1xcbiAgbWFyZ2luOiBhdXRvO1xcbn1cXG5cXG4uZ3JpZC1jZWxsLmF0dGFja2VkLm9jY3VwaWVkOjpiZWZvcmUge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAvIDEuNSk7XFxuICBoZWlnaHQ6IGNhbGModmFyKC0tY2VsbC1zaXplKSAvIDEuNSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7XFxuICB0cmFuc2l0aW9uOiAxcztcXG59XFxuXFxuLmdyaWQtY2VsbC5hdHRhY2tlZC5vY2N1cGllZC5jb25zdW1lOjpiZWZvcmUge1xcbiAgc2NhbGU6IDA7XFxufVxcblxcbi5yb3RhdGUtYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGhzbCgzOSwgMTAwJSwgNTAlKTtcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxuICBib3JkZXI6IG5vbmU7XFxuICB3aWR0aDogNTBweDtcXG4gIGhlaWdodDogNTBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIG1hcmdpbjogNXB4O1xcbn1cXG5cXG4ucm90YXRlLWJ1dHRvbiBpbWcge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcblxcbi5yb3RhdGUtYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGhzbCgzOSwgMTAwJSwgNjAlKTtcXG59XFxuXFxuLnJvdGF0ZS1idXR0b246YWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGhzbCgzOSwgMTAwJSwgODAlKTtcXG59XFxuXFxuLmNvbXAtYm9hcmQtY29udGFpbmVyIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBncmlkLWFyZWE6IDIgLyAyIC8gMyAvIDM7XFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxuICBoZWlnaHQ6IG1pbi1jb250ZW50O1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGluc2V0OiAwO1xcbiAgbWFyZ2luOiBhdXRvO1xcbn1cXG5cXG4uaGlkZGVuIHtcXG4gIG9wYWNpdHk6IDA7XFxufVxcblxcbi5jYXQtdHJhY2tlci1jb250YWluZXIge1xcbiAgd2lkdGg6IG1pbi1jb250ZW50O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQwNSk7XFxuICBwYWRkaW5nOiB2YXIoLS1jYXQtdHJhY2tlci1wYWRkaW5nKTtcXG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcXG4gIG1hcmdpbjogdmFyKC0tbWFyZ2luLXRvcCkgMTBweDtcXG4gIGdyaWQtYXJlYTogMiAvIDMgLyAzIC8gNDtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG59XFxuXFxuLmNhdC10cmFja2VyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoNCwgYXV0bykgLyByZXBlYXQoNSwgYXV0byk7XFxuICB3aWR0aDogdmFyKC0tY2F0LXRyYWNrZXItd2lkdGgpO1xcbiAgaGVpZ2h0OiB2YXIoLS1jYXQtdHJhY2tlci1oZWlnaHQpO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktaXRlbXM6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5jYXQtdHJhY2tlciBkaXYge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJvcmRlcjogMC41cHggc29saWQgcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjUpO1xcbiAgaGVpZ2h0OiB2YXIoLS1jYXQtdHJhY2tlci1jZWxsKTtcXG4gIHdpZHRoOiB2YXIoLS1jYXQtdHJhY2tlci1jZWxsKTtcXG59XFxuXFxuLmNhdC10cmFja2VyIGRpdjo6YWZ0ZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7XFxuICB3aWR0aDogNDAlO1xcbiAgaGVpZ2h0OiA0MCU7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB6LWluZGV4OiAzO1xcbiAgaW5zZXQ6IDA7XFxuICBtYXJnaW46IGF1dG87XFxuICBvcGFjaXR5OiAwO1xcbiAgdHJhbnNpdGlvbjogMC41cztcXG59XFxuXFxuLmNhdC10cmFja2VyIGRpdjo6YmVmb3JlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB6LWluZGV4OiAyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMDEsIDIwMSwgMjAxLCAwLjU0KTtcXG4gIG9wYWNpdHk6IDA7XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgZGl2LmNhdC10cmFja2VyLWhpdDo6YWZ0ZXIsXFxuLmNhdC10cmFja2VyIGRpdi5jYXQtdHJhY2tlci1oaXQ6OmJlZm9yZSB7XFxuICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXIgZGl2IGltZyB7XFxuICBoZWlnaHQ6IHZhcigtLWNhdC10cmFja2VyLWNlbGwpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXItZmlyc3QgaW1nIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLWNlbGwpICogNSk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDMuNCwgMi43KTtcXG59XFxuXFxuLmNhdC10cmFja2VyLXNlY29uZCBpbWcge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItY2VsbCkgKiA0KTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMi45LCAxLjcpO1xcbn1cXG5cXG4uY2F0LXRyYWNrZXItdGhpcmQgaW1nIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNhdC10cmFja2VyLWNlbGwpICogMyk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIuNSwgMS44KTtcXG59XFxuXFxuLmNhdC10cmFja2VyLWZvdXJ0aCBpbWcge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY2F0LXRyYWNrZXItY2VsbCkgKiAyKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41KTtcXG59XFxuXFxuLmNhdC10cmFja2VyLWZpZnRoIGltZyB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jYXQtdHJhY2tlci1jZWxsKSAqIDIpO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUsIDEuMSk7XFxufVxcblxcbi5lbmQtZ2FtZSB7XFxuICB6LWluZGV4OiAzO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyODJhMzZjZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICB0cmFuc2l0aW9uOiAwLjVzO1xcbn1cXG5cXG4uZW5kLWdhbWUgLnZlcmRpY3Qge1xcbiAgZm9udC1zaXplOiAycmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgb3JhbmdlO1xcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGhzbCgzOSwgMTAwJSwgNTglKSwgaHNsYSgzOSwgMTAwJSwgNTAlLCAwLjgpKTtcXG4gIHBhZGRpbmc6IDUwcHg7XFxuICBib3JkZXItcmFkaXVzOiA1MHB4O1xcbn1cXG5cXG4uZW5kLW1lc3NhZ2Uge1xcbiAgd2lkdGg6IDMwMHB4O1xcbn1cXG5cXG4ucGxheS1hZ2Fpbi1idXR0b24ge1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxuICBtYXJnaW46IDEwcHg7XFxuICBhcHBlYXJhbmNlOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuICB3aWR0aDogMTAwcHg7XFxuICBoZWlnaHQ6IDEwMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGhzbCgzOSwgMTAwJSwgNTglKSwgaHNsKDM5LCAxMDAlLCA1MCUpKTtcXG4gIGN1cnNvcjogZ3JhYjtcXG4gIHRyYW5zaXRpb246IDAuM3M7XFxuICBmb250LXNpemU6IDEwMCU7XFxufVxcblxcbi5jYXQtYW5pbWF0aW9uIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDIwO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAvKiB0cmFuc2Zvcm0tb3JpZ2luOiB0b3AgbGVmdDsgKi9cXG4gIHRyYW5zaXRpb246IHRyYW5zbGF0ZSAxLjVzIGVhc2UtaW4tb3V0O1xcbiAgaW5zZXQ6IDA7XFxuICBtYXJnaW46IGF1dG87XFxufVxcblxcbi5jYXQtYW5pbWF0aW9uLnZlcnRpY2FsIHtcXG4gIHJvdGF0ZTogLTkwZGVnO1xcbn1cXG5cXG4uY2F0LWFuaW1hdGlvbi5jYXRPbmUsXFxuLmNhdC1hbmltYXRpb24uY2F0VHdvLFxcbi5jYXQtYW5pbWF0aW9uLmNhdEZvdXIsXFxuLmNhdC1hbmltYXRpb24uY2F0VGhyZWUubW92ZSxcXG4uY2F0LWFuaW1hdGlvbi5jYXRGaXZlLm1vdmUge1xcbiAgdHJhbnNsYXRlOiAtMTAwdnc7XFxufVxcblxcbi5jYXQtYW5pbWF0aW9uLmNhdFRocmVlLFxcbi5jYXQtYW5pbWF0aW9uLmNhdEZpdmUsXFxuLmNhdC1hbmltYXRpb24uY2F0T25lLm1vdmUsXFxuLmNhdC1hbmltYXRpb24uY2F0VHdvLm1vdmUsXFxuLmNhdC1hbmltYXRpb24uY2F0Rm91ci5tb3ZlIHtcXG4gIHRyYW5zbGF0ZTogMTAwdnc7XFxufVxcblxcbi5jYXQtYW5pbWF0aW9uLmNhdE9uZS52ZXJ0aWNhbCxcXG4uY2F0LWFuaW1hdGlvbi5jYXRUd28udmVydGljYWwsXFxuLmNhdC1hbmltYXRpb24uY2F0Rm91ci52ZXJ0aWNhbCxcXG4uY2F0LWFuaW1hdGlvbi5jYXRUaHJlZS52ZXJ0aWNhbC5tb3ZlLFxcbi5jYXQtYW5pbWF0aW9uLmNhdEZpdmUudmVydGljYWwubW92ZSAge1xcbiAgdHJhbnNsYXRlOiAwIDEyMHZoO1xcbn1cXG5cXG4uY2F0LWFuaW1hdGlvbi5jYXRUaHJlZS52ZXJ0aWNhbCxcXG4uY2F0LWFuaW1hdGlvbi5jYXRGaXZlLnZlcnRpY2FsLFxcbi5jYXQtYW5pbWF0aW9uLmNhdE9uZS52ZXJ0aWNhbC5tb3ZlLFxcbi5jYXQtYW5pbWF0aW9uLmNhdFR3by52ZXJ0aWNhbC5tb3ZlLFxcbi5jYXQtYW5pbWF0aW9uLmNhdEZvdXIudmVydGljYWwubW92ZSAge1xcbiAgdHJhbnNsYXRlOiAwIC0xMjB2aDtcXG59XFxuXFxuLmNhdC1hbmltYXRpb24gaW1nIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDg1MHB4KSB7XFxuICA6cm9vdCB7XFxuICAgIC0tc2NhbGUtc2l6ZTogMC40O1xcbiAgICAtLWJvYXJkLXNpemU6IG1pbig2MHZoLCA5MHZ3KTtcXG4gICAgLS1sb2dvLWJhbGwtc2l6ZTogNTBweDtcXG4gICAgLS1zZWNvbmQtcm93OiBjYWxjKCg5NXZoIC0gNTBweCkgKiAoMSAvICgxLjMgKyAxKSkpO1xcbiAgICAtLXRoaXJkLXJvdzogY2FsYygoOTV2aCAtIDUwcHgpICogKDEuMyAvICgxLjMgKyAxKSkpO1xcbiAgICAtLW1pbmktYm9hcmQtc2l6ZTogY2FsYyh2YXIoLS1ib2FyZC1zaXplKSAqIHZhcigtLXNjYWxlLXNpemUpKTtcXG4gICAgLS1jYXQtdHJhY2tlci13aWR0aDogY2FsYyh2YXIoLS1ib2FyZC1zaXplKSAqIDAuNCk7XFxuICB9XFxuXFxuICAuZnVsbC1nYW1lIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZTogNXZoIDFmciAxLjNmciA1MHB4LyA1MHZ3IDUwdnc7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIH1cXG5cXG4gIC50aXRsZSB7XFxuICAgIGdyaWQtYXJlYTogMSAvIDEgLyAyIC8gMztcXG4gICAgbWFyZ2luLXRvcDogMDtcXG4gIH1cXG5cXG4gIGgxIHtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgfVxcblxcbiAgLnBsYXllci1ib2FyZC1jb250YWluZXIge1xcbiAgICBncmlkLWFyZWE6IDMgLyAxIC8gNCAvIDM7XFxuICB9XFxuXFxuICAucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbmsge1xcbiAgICBzY2FsZTogdmFyKC0tc2NhbGUtc2l6ZSk7XFxuICAgIHRyYW5zbGF0ZTogMHB4XFxuICAgICAgY2FsYyhcXG4gICAgICAgIChcXG4gICAgICAgICAgICB2YXIoLS10aGlyZC1yb3cpIC0gdmFyKC0tYm9hcmQtc2l6ZSkgKyB2YXIoLS1zZWNvbmQtcm93KSArXFxuICAgICAgICAgICAgICB2YXIoLS1taW5pLWJvYXJkLXNpemUpXFxuICAgICAgICAgICkgKiAtMC41XFxuICAgICAgKTtcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICB9XFxuXFxuICAucGxheWVyLWJvYXJkLWNvbnRhaW5lci5zaHJpbms6aG92ZXIge1xcbiAgICBzY2FsZTogMC43NTtcXG4gIH1cXG5cXG4gIC5jb21wLWJvYXJkLWNvbnRhaW5lciB7XFxuICAgIG1hcmdpbi10b3A6IGF1dG87XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZ3JpZC1hcmVhOiAzIC8gMSAvIDQgLyAzO1xcbiAgfVxcblxcbiAgLmNhdC10cmFja2VyLWNvbnRhaW5lciB7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgZ3JpZC1hcmVhOiAyIC8gMiAvIDMgLyAzO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQ1MHB4KSB7XFxuICA6cm9vdCB7XFxuICAgIC0tc2NhbGUtc2l6ZTogMC41O1xcbiAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpOyAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH0gLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXG5cbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IGluaXQgZnJvbSAnLi9pbml0JztcblxuaW5pdCgpO1xuXG5cbiJdLCJuYW1lcyI6WyJkZXRlcm1pbmVPcmllbnRhdGlvbiIsImFycmF5IiwiYXNzZXNzQWRqYWNlbnRDb29yZGluYXRlcyIsInN0YXJ0IiwiYm9hcmRJRCIsImNhdCIsImF4aXMiLCJkaXJlY3Rpb24iLCJhbGxEaXIiLCJ4IiwieSIsInVwIiwicmlnaHQiLCJkb3duIiwibGVmdCIsInNvbWUiLCJudW0iLCJvcHBCb2FyZENlbGwiLCJib2FyZCIsImF0dGFja2VkIiwib2NjdXBpZWRCeSIsImZpbHRlciIsIm9wdCIsImFkZFBvaW50cyIsIm9wcEJvYXJkIiwiY29vcmQiLCJtYXgiLCJwb2ludHMiLCJjZWxsIiwibmV3Q29vcmQiLCJncmFkZVNwb3QiLCJvcHBvbmVudEJvYXJkIiwibGVuZ3RoT2ZMb25nZXN0Q2F0UmVtYWluaW5nIiwiY2F0cyIsInJlZHVjZSIsImEiLCJiIiwiaXNTdW5rIiwibGVuZ3RoIiwiY29tcEZpcmVTaG90Iiwid291bmRlZFRhcmdldHMiLCJwb3NzaWJsZUhpdHMiLCJmb3JFYWNoIiwiaGl0cyIsInB1c2giLCJwcmltYXJ5VGFyZ2V0IiwiY29vcmRIaXQiLCJvcmllbnRhdGlvbiIsImFsbFBvc3NpYmxlSGl0cyIsIk9iamVjdCIsImtleXMiLCJjb29yZGluYXRlcyIsInRvcFNjb3JlIiwic3BvdEdyYWRlIiwiY29uc29sZSIsImxvZyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIkNhdCIsImNvbnN0cnVjdG9yIiwidHlwZSIsImhpdCIsInJvdGF0ZSIsInJhbmRvbWl6ZU9yaWVudGF0aW9uIiwic2V0RG9tRWxlbWVudCIsInRhcmdldCIsImRvbUVsZW1lbnQiLCJjcmVhdGVDYXRzIiwiY2F0MSIsImNhdDIiLCJjYXQzIiwiY2F0NCIsImNhdDUiLCJjcmVhdGVDYXRJbWFnZSIsInNvdXJjZSIsImNhdEltZyIsIkltYWdlIiwic3JjIiwiYWRkQ2F0SW1nIiwiY3VycmVudENhdCIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENhdEltYWdlcyIsImZpcnN0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic2Vjb25kIiwidGhpcmQiLCJmb3VydGgiLCJmaWZ0aCIsImFwcGVuZCIsInNldENhdEFuaW1hdGlvbiIsImNhdEltYWdlU3JjIiwidGFnIiwiY29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsInJvdGF0ZUljb24iLCJjcmVhdGVQbGF5ZXJHYW1lQm9hcmQiLCJjcmVhdGVDb21wR2FtZUJvYXJkIiwiZWF0U291bmRBdWRpbyIsImhpdEF1ZGlvIiwibWlzc0F1ZGlvIiwiZnVsbEdhbWVEaXNwbGF5IiwicGxheVNvdW5kIiwidm9sIiwic291bmQiLCJBdWRpbyIsInZvbHVtZSIsInBsYXkiLCJwbGF5ZXJCb2FyZENvbnRhaW5lciIsImNvbXBCb2FyZENvbnRhaW5lciIsImNhdFRyYWNrZXJDb250YWluZXIiLCJjdXJyZW50UGxheWVyQm9hcmQiLCJyb3RhdGVDYXQiLCJnZXRDdXJyZW50Q2F0IiwidG9nZ2xlIiwicm90YXRlQnV0dG9uIiwicm90YXRlSW1nIiwiYXBwZW5kQ2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwiY3JlYXRlQ2F0VHJhY2tlciIsImNhdFRyYWNrZXJEaXYiLCJpZCIsImRhdGFzZXQiLCJ1cGRhdGVDYXRUcmFja2VyIiwiZG9tVGFyZ2V0IiwiYXBwbHlIaXRJbWFnZSIsImNvbXAiLCJzaHJpbmtTaXplIiwib3JpZ2luYWxTaXplIiwib2Zmc2V0V2lkdGgiLCJ3aW5kb3dXaWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJzZXRTaHJpbmtTY2FsZSIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJob3ZlckVmZmVjdCIsInByZWZpeCIsInN1ZmZpeCIsInN0YXJ0R2FtZSIsInBsYXllckJvYXJkIiwiY29tcEJvYXJkIiwicG9wdWxhdGVEaXNwbGF5IiwicmVtb3ZlQ2hpbGRyZW4iLCJlbGVtZW50IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiY2xlYXJQYWdlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbW92ZSIsInZpc2liaWxpdHkiLCJjYXRBbmltYXRpb25zIiwicXVlcnlTZWxlY3RvckFsbCIsImNhdEFuaSIsImVuZEdhbWVTY3JlZW4iLCJ3aW4iLCJsb3NlTWVzc2FnZXMiLCJ3aW5NZXNzYWdlcyIsInNjcmVlbiIsIm9wYWNpdHkiLCJ2ZXJkaWN0IiwidGV4dENvbnRlbnQiLCJlbmRNZXNzYWdlIiwicGxheUFnYWluQnV0dG9uIiwiYm9keSIsInNldFRpbWVvdXQiLCJwYXNzQ2F0SW1nQWNyb3NzU2NyZWVuIiwidGFyZ2V0Q2xhc3MiLCJ0YXJnZXRFbGVtZW50IiwiY29tcFJldGFsaWF0aW9uIiwidGFrZUF0dGFjayIsImRhdGFJRCIsImRvbUNlbGwiLCJjaGVja0ZvcldpbiIsImNyZWF0ZUNvbXBHYW1lQm9hcmREaXNwbGF5IiwiYm9hcmREYXRhIiwib3BwQm9hcmREYXRhIiwiY29tcEJvYXJkRGlzcGxheSIsInZhbHVlcyIsImNvbXBDb29yZCIsInNwb3QiLCJkb21FbCIsInByZXBhcmVDYXRBbmltYXRpb24iLCJhbmkiLCJjcmVhdGVQbGF5ZXJHYW1lQm9hcmREaXNwbGF5IiwicGxheWVyQm9hcmREYXRhIiwiY29tcEJvYXJkRGF0YSIsInBsYXllckJvYXJkRGlzcGxheSIsImNvb3JkQXJyYXkiLCJnZXRDb29yZGluYXRlcyIsInBsYWNlQ2F0IiwiY2F0QWRkZWQiLCJjbGFzc05hbWUiLCJkaXNwbGF5IiwiY29tcFBsYWNlQ2F0cyIsImNhdFRyYWNrZXIiLCJlIiwia2V5IiwicGxhY2UiLCJzdGF0ZSIsImNvb3JkaW5hdGUiLCJyZWNlaXZlQXR0YWNrIiwiY29vcmRJbnZhbGlkIiwiY29vcmRpbmF0ZXNBcmVJbnZhbGlkIiwiZmxhdCIsIml0ZW0iLCJnZXRDb29yZCIsImkiLCJ0cmFja0NhdHNBZGRlZCIsImNhdHNBZGRlZCIsImNlbGxBc3Nlc3NtZW50IiwiZGV0ZXJtaW5lUmVhbEVzdGF0ZSIsImxpbWl0IiwiaCIsInYiLCJhcnJheU1pbnVzT3ZlcmxhcCIsInJhbmRvbUluZGV4IiwiY29tcHV0ZXJQbGFjZUNhdHMiLCJwb3RlbnRpYWxQbGFjZW1lbnRzIiwidGFyZ2V0U3BhY2UiLCJhcnJheU9mQ29vcmQiLCJkb21TcG90IiwiY3JlYXRlU3BvdCIsIndpbkNoZWNrIiwiZXZlcnkiLCJjcmVhdGVHYW1lQm9hcmQiLCJnYW1lQm9hcmQiLCJhc3NpZ24iLCJiYXR0bGVDYXRzVGhlbWUiLCJiYXR0bGVDYXRzVGhlbWUyIiwib3BlbmluZ1NjcmVlbiIsImJlZ2luQnV0dG9uIiwidGhlbWVNdXNpYyIsInRoZW1lTXVzaWMyIiwib25lbmRlZCIsImxvb3AiLCJpbml0IiwidHJhbnNpdGlvbiIsInNjYWxlIl0sInNvdXJjZVJvb3QiOiIifQ==