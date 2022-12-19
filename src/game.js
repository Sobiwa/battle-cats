import { applyHitImage } from './dom';
import { compPlaceCats, compFireShot, compCats } from './bot';
import { playerBoard, playerCats, compBoard } from './gameboard.js';

function beginGame() {
  compPlaceCats();
}

function compRetaliation() {
  console.log(playerBoard);
  const target = compFireShot(playerBoard, playerCats);
  console.log(target);
  playerBoard.takeAttack(target);
  const dataID = `[data-coord='${target}']`
  console.log(dataID);
  const domCell = document.querySelector(dataID);
  applyHitImage(domCell, playerBoard, target);
}

export { beginGame, compRetaliation }