import { startGame } from './dom'

const openingScreen = document.querySelector('.opening-screen');
const beginButton = document.querySelector('.begin-button');

export default function init() {
  beginButton.addEventListener('click', () => {
    beginButton.style.transition = '5s';
    beginButton.style.scale = 50;
    openingScreen.style.opacity = 0;
    setTimeout(() => {
      document.body.removeChild(openingScreen)
    }, 1500);
  })
  startGame();
}