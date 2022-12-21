/* eslint-disable default-case */
/* eslint-disable no-restricted-syntax */
import cat1 from "./img/big-stretch.svg";
import cat2 from "./img/cat2.svg";
import cat3 from "./img/walk.svg";
import cat4 from "./img/quasi-loaf2.svg";
import cat5 from "./img/lesRoll.svg";
import rotateIcon from "./img/format-rotate-90.svg";

import {
  handleClick,
  playerBoard,
  compBoard,
  getCurrentCat,
} from "./gameboard";

import { beginGame, checkForWin, compRetaliation } from "./game";

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
  first.append(createCatImage(cat1));
  first.classList.add("cat-tracker-first");
  second.append(createCatImage(cat2));
  second.classList.add("cat-tracker-second");
  third.append(createCatImage(cat3));
  third.classList.add("cat-tracker-third");
  fourth.append(createCatImage(cat4));
  fourth.classList.add("cat-tracker-fourth");
  fifth.append(createCatImage(cat5));
  fifth.classList.add("cat-tracker-fifth");
}

const catTracker = createCatTracker();
catTrackerContainer.append(catTracker);
appendCatImages();

function rotateCat() {
  const currentCat = getCurrentCat();
  if (!currentCat) return;
  currentCat.rotate();
  playerBoardDisplay.classList.toggle("horizontal");
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Shift") {
    rotateCat();
  }
});

const rotateButton = document.createElement("button");
const rotateImg = new Image();
rotateImg.src = rotateIcon;
rotateButton.classList.add("rotate-button");
rotateButton.appendChild(rotateImg);
rotateButton.addEventListener("click", () => {
  rotateCat();
});
playerBoardContainer.appendChild(rotateButton);

function addCatImg(destination, currentCat, hidden) {
  const catImg = new Image();
  catImg.classList.add("cat-img");
  switch (currentCat.type) {
    case "big stretch":
      catImg.src = cat1;
      catImg.classList.add("cat1");
      playerBoardDisplay.className = "player-board cat-two";
      break;
    case "downward cat":
      catImg.src = cat2;
      catImg.classList.add("cat2");
      playerBoardDisplay.className = "player-board cat-three";
      break;
    case "stuff strutter":
      catImg.src = cat3;
      catImg.classList.add("cat3");
      playerBoardDisplay.className = "player-board cat-four";
      break;
    case "quasi loaf":
      catImg.src = cat4;
      catImg.classList.add("cat4");
      playerBoardDisplay.className = "player-board cat-five";
      break;
    case "compact kitty":
      catImg.src = cat5;
      catImg.classList.add("cat5");
      playerBoardDisplay.className = "player-board";
  }
  if (currentCat.orientation === "horizontal") {
    catImg.classList.add("horizontal-cat");
  }
  if (hidden) {
    catImg.classList.add("hidden");
  }
  destination.appendChild(catImg);
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
  domTarget.classList.add('cat-tracker-hit');
}

function applyHitImage(target, boardID, coord) {
  target.classList.add("attacked");
  if (boardID.board[`[${coord}]`].occupiedBy) {
    target.classList.add("occupied");
    if(boardID === compBoard) {
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
  for (const { coordinates } of Object.values(compBoard.board)) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    cell.dataset.compCoord = coordinates;
    cell.addEventListener("click", () => {
      if (!compBoard.board[`[${coordinates}]`].attacked) {
        compBoard.takeAttack(coordinates);
        applyHitImage(cell, compBoard, coordinates);
        if (checkForWin() === "player wins") {
          endGameScreen("player wins");
        } else {
          compRetaliation();
        }
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
  document.documentElement.style.setProperty(
    "--shrink-scale",
    `min(1, ${shrinkSize()})`
  );
});

function createPlayerGameBoardDisplay() {
  for (const coord of Object.values(playerBoard.board)) {
    const spot = document.createElement("div");
    spot.classList.add("grid-cell");
    spot.dataset.coord = coord.coordinates;
    spot.addEventListener("click", () => {
      const currentCat = getCurrentCat();
      if (currentCat === null) return;
      const coordArray = playerBoard.getCoordinates(
        coord.coordinates,
        currentCat
      );
      if (coordArray) {
        handleClick(coordArray);
        addCatImg(spot, currentCat);
        if (currentCat.type === "compact kitty") {
          playerBoardContainer.removeChild(rotateButton);
          playerBoardContainer.classList.add("shrink");
          compBoardContainer.style.display = "flex";
          createCompGameBoardDisplay();
          document.documentElement.style.setProperty(
            "--shrink-scale",
            `min(1, ${shrinkSize()})`
          );
          catTrackerContainer.style.visibility = "visible";
          beginGame();
        }
      }
    });
    playerBoardDisplay.appendChild(spot);
  }
}

export {
  createPlayerGameBoardDisplay,
  createCompGameBoardDisplay,
  addCatImg,
  applyHitImage,
  endGameScreen,
};
