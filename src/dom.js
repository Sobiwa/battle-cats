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

import { beginGame, compRetaliation } from "./game";

const playerBoardContainer = document.querySelector(".player-board-container");
const playerBoardDisplay = document.querySelector(".player-board");
const compBoardContainer = document.querySelector(".comp-board-container");
const compBoardDisplay = document.querySelector(".comp-board");

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

function addCatImg(destination, currentCat) {
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
  destination.appendChild(catImg);
}

function applyHitImage(target, boardID, coord) {
  target.classList.add("attacked");
  if (boardID.board[`[${coord}]`].occupiedBy) {
    target.classList.add("occupied");
  }
}

function createCompGameBoardDisplay() {
  for (const { coordinates } of Object.values(compBoard.board)) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    cell.addEventListener("click", () => {
      if (!compBoard.board[`[${coordinates}]`].attacked) {
        compBoard.takeAttack(coordinates);
        applyHitImage(cell, compBoard, coordinates);
        compRetaliation();
      }
    });
    compBoardDisplay.appendChild(cell);
  }
}

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
          playerBoardContainer.classList.add('shrink');
          compBoardContainer.style.display = 'flex';
          createCompGameBoardDisplay();
          beginGame();
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

const cat1tracker = createCatImage(cat1);
const cat2tracker = createCatImage(cat2);
const cat3tracker = createCatImage(cat3);
const cat4tracker = createCatImage(cat4);
const cat5tracker = createCatImage(cat5);

catTracker.append(
  cat1tracker,
  cat2tracker,
  cat3tracker,
  cat4tracker,
  cat5tracker
);

export {
  createPlayerGameBoardDisplay,
  createCompGameBoardDisplay,
  addCatImg,
  applyHitImage,
};
