import { applyHitImage, endGameScreen } from './dom';
import { compPlaceCats, compFireShot, compCats } from './bot';
import { playerBoard, playerCats, compBoard } from './gameboard.js';

function beginGame() {
  compPlaceCats();
}

function checkForWin() {
  if (compCats.every(cat => cat.isSunk())) {
    return 'player wins'
  }
  if (playerCats.every(cat => cat.isSunk())) {
    return 'computer wins';
  }
  return false;
}

function compRetaliation() {
  const target = compFireShot(playerBoard, playerCats);
  playerBoard.takeAttack(target);
  const dataID = `[data-coord='${target}']`
  const domCell = document.querySelector(dataID);
  applyHitImage(domCell, playerBoard, target);
  if (checkForWin() === 'computer wins') {
    endGameScreen('Computer wins');
  };
}

export { beginGame, compRetaliation, checkForWin }