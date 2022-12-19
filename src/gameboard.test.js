/* eslint-disable no-undef */
import { createGameBoard } from './gameboard';

const gb = createGameBoard();
test('get coordinates', () => {
  expect(gb.getCoordinates([0,0], {length: 5, orientation: 'vertical'})).toEqual([[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]);
});

test('receive attack', () => {
  expect((() => {
    gb.takeAttack([0,0]);
    return gb.board['[0,0]'].attacked;
  })()).toEqual(true);
})

test('place cat', () => {
  expect((() => {
    gb.placeCat([[0,1]], 'cat');
    return gb.board['[0,1]'].occupiedBy;
  })()).toBe('cat');
})