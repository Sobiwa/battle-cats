/* eslint-disable no-undef */
import { assessAdjacentCoordinates } from "./bot";

function createSpot(x, y) {
  return {
    coordinates: [x, y],
    occupiedBy: null,
    attacked: false,
  };
}

const board = {
  board: (() => {
    const obj = {};
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        obj[`[${x},${y}]`] = createSpot(x, y);
      }
    }
    return obj;
  })(),
};

board.board["[2,2]"].attacked = true;
board.board["[2,2]"].occupiedBy = "mockCat";

test("adj. spaces - open all around", () => {
  expect(assessAdjacentCoordinates([2, 2], board, 'mockCat')).toEqual([
    [2, 1],
    [3, 2],
    [2, 3],
    [1, 2],
  ]);
});

describe('add second cat', () => {
  beforeAll(() => {
    board.board["[1,2]"].attacked = true;
    board.board["[1,2]"].occupiedBy = "mockCat2";
  })

  test('adj. spaces - recognizes different cat is hit', () => {
    expect(assessAdjacentCoordinates([2,2], board, 'mockCat')).toEqual([
      [2, 1],
      [3, 2],
      [2, 3],
    ]);
  })
})

describe("add second hit", () => {
  beforeAll(() => {
    board.board["[2,1]"].attacked = true;
    board.board["[2,1]"].occupiedBy = "mockCat";
  });

  test('adj. spaces - linear', () => {
    expect(assessAdjacentCoordinates([2,2], board, 'mockCat', 'y')).toEqual([[2, 0], [2, 3]]);
  });

  describe('add third hit', () => {
    beforeAll(() => {
      board.board["[2,0]"].attacked = true;
      board.board["[2,0]"].occupiedBy = "mockCat";
    })

    test('adj.spaces - reach edge', () => {
      expect(assessAdjacentCoordinates([2,2], board, 'mockCat', 'y')).toEqual([[2, 3]]);
    })
  })
});

