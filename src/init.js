import startGame from './dom'
import battleCatsTheme from './sound/battle-cat-theme-one-loop.mp3';
import battleCatsTheme2 from './sound/battle-cats-theme2.mp3';

const openingScreen = document.querySelector('.opening-screen');
const beginButton = document.querySelector('.begin-button');
const themeMusic = new Audio(battleCatsTheme);
const themeMusic2 = new Audio(battleCatsTheme2);
const fullGameDisplay = document.querySelector('.full-game');
themeMusic2.onended = () => {
  themeMusic.play();
}
themeMusic.loop = true;
themeMusic2.volume = 0.2;
themeMusic.volume = 0.5;

export default function init() {
  beginButton.addEventListener('click', () => {
    themeMusic2.play();
    beginButton.style.transition = '5s';
    beginButton.style.scale = 50;
    openingScreen.style.opacity = 0;
    setTimeout(() => {
      fullGameDisplay.removeChild(openingScreen)
    }, 1500);
  })
  startGame();
}