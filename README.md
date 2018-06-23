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
export class WantToBeObserved extends Observable {
  public someAction() {
    // do stuff here then notify
    this.notify();
  }
}
const observableInstance = new WantToBeObserved();
```
### 2 - Create some observers
```ts
export class WantToObserve implements IObserver {
  public notify(): void {
    // do stuff here
  }
}
export function wantToObserveFunction(): void {
  // do some other stuff here
}
```
### 3 - Subscribe the observers
```ts
// subscribe class instance
const observerInstance = new WantToObserve();
const unsubscribeInstance = observableInstance.subscribe(observerInstance);

// subscribe function
observableInstance.subscribe(wantToObserveFunction);

// to unsubscribe call the return of subscribe
unsubscribeInstance();
```