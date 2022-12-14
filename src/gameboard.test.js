/* eslint-disable no-undef */
import { createGameBoard, getCoordinates } from './gameboard';

test('get coordinates', () => {
  expect(getCoordinates([0,0], {length: 5, orientation: 'vertical'})).toEqual([[0,0], [0, 1], [0, 2], [0, 3], [0, 4]]);
});

test('create game board', () => {
  expect(createGameBoard()).toBe();
})