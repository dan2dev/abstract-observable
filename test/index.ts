import {Observable, IObserver} from "../src/main";
import {SomeChild, SomeRoot} from "./simple";

(async () => {
    const someRoot = new SomeRoot();
    let i: number = 0;
    let value = "testing";
    someRoot.subscribe(() => {
        i += 1;
        value = "changed notify", i;
        console.log("root notified -", i);
    });
    someRoot.newChildren();
    console.log("---");
    someRoot.children[0].subscribe(() => {
        console.log("children notified -", this);
    });
    someRoot.children[0].updateVersion();
    someRoot.children[0].updateVersion();
    someRoot.children[0].updateVersion();
    console.log("--- version", someRoot.children[0].version);
    await someRoot.notify();
    console.log("after notify -");
    someRoot.children[0].notify();

    someRoot.newChildren();
    console.log("n", 2);
    value = "changed 2";
    someRoot.newChildren();
    console.log("n", 3);
    someRoot.newChildren();
    console.log(value.toString(), i.toString());
    console.log(someRoot.children.toString());


    const teste2 = new Promise<void>(() => {

    });
})();
