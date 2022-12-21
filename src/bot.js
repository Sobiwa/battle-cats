/* eslint-disable no-plusplus */
import { createCats } from "./cat";
import { compBoard } from "./gameboard";
import { addCatImg } from './dom';

function randomIndex(array) {
  return array[Math.floor(array.length * Math.random())];
}

const compCats = createCats();

function compPlaceCats() {
  compCats.forEach((cat) => {
    cat.randomizeOrientation();
    const potentialPlacements = compBoard.determineRealEstate(cat);
    const targetSpace = randomIndex(potentialPlacements);
    const arrayOfCoord = compBoard.getCoordinates(
      targetSpace,
      cat
    );
    compBoard.placeCat(arrayOfCoord, cat);
    const domSpot = document.querySelector(`[data-comp-coord='${targetSpace}'`);
    addCatImg(domSpot, cat, true);
    cat.setDomElement(domSpot);
  });
}

function determineOrientation(array) {
  return array[0][0] === array[1][0] ? "y" : "x";
}

function assessAdjacentCoordinates(start, boardID, cat, axis, direction) {
  let allDir;
  const [x, y] = start;
  const up = () => assessAdjacentCoordinates([x, y - 1], boardID, cat, "y", -1);
  const right = () =>
    assessAdjacentCoordinates([x + 1, y], boardID, cat, "x", 1);
  const down = () =>
    assessAdjacentCoordinates([x, y + 1], boardID, cat, "y", 1);
  const left = () =>
    assessAdjacentCoordinates([x - 1, y], boardID, cat, "x", -1);

  if (start.some((num) => num > 9 || num < 0)) return null;

  const oppBoardCell = boardID.board[`[${start}]`];
  if (
    oppBoardCell.attacked &&
    (!oppBoardCell.occupiedBy || oppBoardCell.occupiedBy !== cat)
  ) {
    return null;
  }
  if (!oppBoardCell.attacked) return start;

  if (axis) {
    if (axis === "x") {
      if (direction) {
        return assessAdjacentCoordinates(
          [x + 1 * direction, y],
          boardID,
          cat,
          axis,
          direction
        );
      }
      allDir = [left(), right()];
    } else if (axis === "y") {
      if (direction) {
        return assessAdjacentCoordinates(
          [x, y + 1 * direction],
          boardID,
          cat,
          axis,
          direction
        );
      }
      allDir = [up(), down()];
    }
  } else {
    allDir = [up(), right(), down(), left()];
  }
  return allDir.filter((opt) => opt !== null);
}

function compFireShot(opponentBoard, opponentCats) {
  const woundedTargets = [];
  let possibleHits;
  opponentCats.forEach((cat) => {
    if (cat.hits > 0 && !cat.isSunk()) {
      woundedTargets.push(cat);
    }
  });
  if (woundedTargets.length) {
    const primaryTarget = woundedTargets[0];
    if (primaryTarget.coordHit.length > 1) {
      const orientation = determineOrientation(primaryTarget.coordHit);
      possibleHits = assessAdjacentCoordinates(
        primaryTarget.coordHit[0],
        opponentBoard,
        primaryTarget,
        orientation
      );
    } else {
      possibleHits = assessAdjacentCoordinates(
        primaryTarget.coordHit[0],
        opponentBoard,
        primaryTarget
      );
    }
  } else {
    possibleHits = [];
    Object.keys(opponentBoard.board).forEach((cell) => {
      if (!opponentBoard.board[cell].attacked) {
        possibleHits.push(opponentBoard.board[cell].coordinates);
      }
    });
  }
  return possibleHits[Math.floor(possibleHits.length * Math.random())];
}

export { assessAdjacentCoordinates, compPlaceCats, compFireShot, compCats };
