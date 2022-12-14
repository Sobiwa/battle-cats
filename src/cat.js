class Cat {
  constructor(length, type) {
    this.length = length;
    this.type = type;
    this.hits = 0;
    this.orientation = "vertical";
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.length === this.hits;
  }

  rotate() {
    this.orientation =
      this.orientation === "vertical" ? "horizontal" : "vertical";
  }
}

function createCats() {
  const cat1 = new Cat(5, "big stretch");
  const cat2 = new Cat(4, "downward cat");
  const cat3 = new Cat(3, "stuff strutter");
  const cat4 = new Cat(2, "quasi loaf");
  const cat5 = new Cat(1, "compact kitty");
  return [cat1, cat2, cat3, cat4, cat5];
}

export { Cat, createCats };
