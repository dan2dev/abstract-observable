import { Observable, IObserver } from "../src/main";
import { SomeChild, SomeRoot } from "./simple";

const someRoot = new SomeRoot();

test("basic", async (done) => {
  var i: number = 0;
  var value = "testing";
  someRoot.subscribe(() => {
    i += 1;
    value = "changed notify";
  });
  someRoot.subscribe(() =>{
    expect(i).toBe(1);
    done();
  });
  someRoot.newChildren();
  someRoot.newChildren();
  someRoot.newChildren();
  someRoot.newChildren();
  value = "changed - 2";
  expect(1).toBe(1);
  // done();
});
