import { Observable, IObserver } from "../src/main";
function teste() {
  return 0;
}

test("basic", () => {
  expect(teste()).toBe(0);
});

test("basic again", () => {
  expect(3).toBe(3);
});
