/* eslint-disable default-case */
/* eslint-disable no-restricted-syntax */
import cat1 from "./img/big-stretch.svg";
import cat2 from "./img/cat2.svg";
import cat3 from "./img/walk.svg";
import cat4 from "./img/quasi-loaf2.svg";
import cat5 from "./img/lesRoll.svg";

import { handleClick, playerBoard } from "./gameboard";

const playerBoardDisplay = document.querySelector(".player-board");

function addCatImg(destination, currentCat) {
  const catImg = new Image();
  catImg.classList.add("cat-img");
  switch (currentCat.type) {
    case "big stretch":
      catImg.src = cat1;
      catImg.classList.add("cat1");
      break;
    case "downward cat":
      catImg.src = cat2;
      catImg.classList.add("cat2");
      break;
    case "stuff strutter":
      catImg.src = cat3;
      catImg.classList.add("cat3");
      break;
    case "quasi loaf":
      catImg.src = cat4;
      catImg.classList.add("cat4");
      break;
    case "compact kitty":
      catImg.src = cat5;
      catImg.classList.add("cat5");
  }
  destination.appendChild(catImg);
}

function createPlayerGameBoardDisplay() {
  for (const coord of Object.values(playerBoard.board)) {
    const spot = document.createElement("div");
    spot.classList.add("grid-cell");
    spot.addEventListener("click", () => {
      const cat = handleClick(coord, spot);
      if (cat) {
        addCatImg(spot, cat);
      }
    });
    playerBoardDisplay.appendChild(spot);
  }
}

export { createPlayerGameBoardDisplay, addCatImg };
