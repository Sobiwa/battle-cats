import cat1 from "./img/big-stretch.svg";
import cat2 from "./img/cat2.svg";
import cat3 from "./img/walk.svg";
import cat4 from "./img/quasi-loaf2.svg";
import cat5 from "./img/lesRoll.svg";

function createCatImage(source) {
  const catImg = new Image();
  catImg.src = source;
  return catImg;
}

function addCatImg(currentCat) {
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
      break;
    default:
      break;
  }
  if (currentCat.orientation === "horizontal") {
    catImg.classList.add("horizontal-cat");
  }
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

function setCatAnimation(cat) {
  let catImageSrc;
  let tag;
  switch (cat.type) {
    case 'big stretch':
      catImageSrc = cat1;
      tag = 'catOne';
      break;
    case 'downward cat':
      catImageSrc = cat2;
      tag = 'catTwo';
      break;
    case 'stuff strutter':
      catImageSrc = cat3;
      tag = 'catThree';
      break;
    case 'quasi loaf':
      catImageSrc = cat4;
      tag = 'catFour';
      break;
    case 'compact kitty':
      catImageSrc = cat5;
      tag = 'catFive';
      break;
    default:
      break;
  }
  const container = document.createElement('div');
  container.classList.add('cat-animation');
  container.classList.add(`${tag}`);
  const catImg = new Image();
  catImg.src = catImageSrc;
  container.append(catImg);
  container.classList.add(`${cat.orientation}`);
  return container;
}

export { addCatImg, appendCatImages, setCatAnimation };
