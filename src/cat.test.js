/* eslint-disable no-undef */
import { Cat } from "./cat";

const testCat = new Cat(5, "carrier");

test("create cat", () => {
  expect(testCat).toEqual({ length: 5, type: "carrier", hits: 0, orientation: 'vertical', coordHit: []});
});

test("apply hit", () => {
  expect((() => {
    testCat.hit([0, 0]);
    return testCat.hits;
  })()).toBe(1);
});

test('track coordinates hit', () => {
  expect(testCat.coordHit).toEqual([[0,0]]);
})

test('sink cat', () => {
  expect((() => {
    testCat.hit();
    testCat.hit();
    testCat.hit();
    testCat.hit();
    return testCat.isSunk();
  })()).toBe(true);
})
