import { createCompGameBoardDisplay, createPlayerGameBoardDisplay } from './dom'

export default function init() {
  createPlayerGameBoardDisplay();
  createCompGameBoardDisplay();
}