/* eslint-disable no-restricted-syntax */
/* eslint-disable default-case */

import rotateIcon from "./img/format-rotate-90.svg";
import { addCatImg, appendCatImages, setCatAnimation } from "./catImg";
import { compFireShot } from "./bot";
import { createPlayerGameBoard, createCompGameBoard } from "./gameboard";

import eatSoundAudio from './sound/eatSound.ogg';
import hitAudio from './sound/hit.ogg';
import missAudio from './sound/miss.ogg';

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
rotateImg.src = rotateIcon;
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
  document.documentElement.style.setProperty(
    "--shrink-scale",
    `min(1, ${shrinkSize(board)})`
  );
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
  const playerBoard = createPlayerGameBoard();
  const compBoard = createCompGameBoard();
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
  catAnimations.forEach((catAni) => {
    catAni.remove();
  });
}

function endGameScreen(win) {
  const loseMessages = [
    "Aw shucks! At this rate Dr. Vetman is going to call KPS (Kitty Protective Services)",
    "Oh well! More to love, right?",
    "Sodium overload! Better luck next time",
    "You lose! How in the world do your cats eat so many cheese balls anyway?",
    "Welp! There goes your cats' diets!",
    "Hmm, I wonder how much it is for one of those cat treadmills...",
    "They're not fat! They just have a lot of fur!",
  ];

  const winMessages = [
    "Congrats! Your cats are looking THIN compared to your neighbor's",
    "Dr. Vetman has bigger cats to worry about now!",
    "Yeehaw! Maybe next time your neighbor will think twice!",
    "Nice aim! You must've thrown cheese balls before!",
    "This might be your greatest accomplishment",
    "Victory! But seriously, too many cheese balls is probably pretty bad for cats",
    "Winner, winner, kitty dinner!",
  ];
  const array = win ? winMessages : loseMessages;
  const screen = document.createElement("div");
  screen.style.opacity = 0;
  screen.classList.add("end-game");
  const verdict = document.createElement('div');
  verdict.classList.add('verdict');
  verdict.textContent = win ? 'Player wins! :)' : 'Neighbor Wins! :('
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

function passCatImgAcrossScreen({ type }) {
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
  const target = compFireShot(playerBoard);
  playerBoard.takeAttack(target);
  const cat = playerBoard.board[`[${target}]`].occupiedBy;
  if (cat && cat.isSunk()) {
    playSound(eatSoundAudio, 0.5);
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
          playSound(hitAudio, 0.05);
          if (coord.occupiedBy.isSunk()) {
            playSound(eatSoundAudio, 0.5);
            const cat = coord.occupiedBy;
            cat.domElement.classList.remove("hidden");
            cat.coordHit.forEach((spot) => {
              const domEl = document.querySelector(
                `[data-comp-coord='${spot}']`
              );
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
          playSound(missAudio, 0.02);
        }
        compRetaliation(oppBoardData);
      }
    });
    compBoardDisplay.appendChild(cell);
  }
  compBoardContainer.appendChild(compBoardDisplay);
}

function prepareCatAnimation(cat) {
  const ani = setCatAnimation(cat);
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
      const coordArray = playerBoardData.getCoordinates(
        coord.coordinates,
        currentCat
      );
      if (coordArray) {
        prepareCatAnimation(currentCat);
        playerBoardData.placeCat(coordArray, currentCat);
        playerBoardData.catAdded();
        playerBoardDisplay.className = hoverEffect(currentCat);
        playerBoardContainer.className = "player-board-container";
        spot.appendChild(addCatImg(currentCat));
        if (currentCat.type === "compact kitty") {
          playerBoardContainer.removeChild(rotateButton);
          playerBoardContainer.classList.add("shrink");
          compBoardContainer.style.display = "flex";
          createCompGameBoardDisplay(compBoardData, playerBoardData);
          document.documentElement.style.setProperty(
            "--shrink-scale",
            `min(1, ${shrinkSize()})`
          );
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
  appendCatImages();
  createPlayerGameBoardDisplay(playerBoardData, compBoardData);
  playerBoardContainer.appendChild(rotateButton);
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Shift") {
    rotateCat();
  }
});

export { startGame };
