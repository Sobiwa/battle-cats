/* eslint-disable default-case */
/* eslint-disable no-restricted-syntax */
import rotateIcon from "./img/format-rotate-90.svg";

import { addCatImg, appendCatImages } from "./catImg";

import { compFireShot } from "./bot";

import { createPlayerGameBoard, createCompGameBoard } from "./gameboard";

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
  const board = document.querySelector('.comp-board')
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
  const target = compFireShot(playerBoard);
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
            cat.coordHit.forEach((spot) => {
              const domEl = document.querySelector(
                `[data-comp-coord='${spot}']`
              );
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
      const coordArray = playerBoardData.getCoordinates(
        coord.coordinates,
        currentCat
      );
      if (coordArray) {
        playerBoardData.placeCat(coordArray, currentCat);
        playerBoardData.catAdded();
        playerBoardDisplay.className = hoverEffect(currentCat);
        playerBoardContainer.className = 'player-board-container';
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
