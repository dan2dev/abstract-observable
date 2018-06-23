# abstract-observable
Simple typescript abstract class for observer pattern.
## Install
```bash
yarn add abstract-observable
```
or
```bash
npm install --save abstract-observable
```

### 1 - Create an observable class
```ts
export class WantToObserved extends Observable {
  public someAction() {
    // do stuff here then notify
    this.notify();
  }
}
const observableInstance = new WantToObserved();
```
### 2 - Create some observers
```ts
export class WantToObserve implements IObserver {
  public notify(): void {
    // do stuff here
  }
}
export function observerFunction(): void {
  // do some other stuff here
}
```
### 3 - Subscribe the observers
```ts
const observerInstance = new WantToObserve();
const unsubscribeInstance = observableInstance.subscribe(observerInstance);
observableInstance.subscribe(observerFunction);
// to unsubscribe call the return of subscribe
unsubscribeInstance();
