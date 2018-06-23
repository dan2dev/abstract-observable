import { IObserver } from "./observer";
import { Global } from "./global";
// let globalNotifying = false;
interface IObserverData {
  lastIndex: number;
  observers: {
    [index: number]: {
      index: number;
      notify: (() => void) | IObserver;
    };
  };
  notifying: boolean;
}
export abstract class Observable {
  private _observable: IObserverData = {
    lastIndex: 0,
    observers: {},
    notifying: false,
  };
  constructor(parent?: Observable);
  constructor(observer?: IObserver);
  constructor(...args: any[]) {
    for (const arg of args) {
      if (arg && typeof (arg as IObserver).notify !== "undefined") {
        const parent: IObserver = (arg as IObserver);
        parent && this.subscribe(parent);
      }
    }
  }
  public subscribe(observer: (() => void) | IObserver): () => void {
    const currentIndex = this._observable.lastIndex++;
    this._observable.observers[currentIndex] = {
      index: currentIndex,
      // notify: (typeof observer === "object") ? (observer as IObserver).update : (observer as () => void),
      notify: observer,
    };
    // * return unsubscribe method
    return () => {
      delete this._observable.observers[currentIndex];
    };
  }
  public notify(): Promise<void> {
    if (!this._observable.notifying) {
      this._observable.notifying = true;
      if (Global.isNotifying()) {
        this.notifyAllObservers();
      } else {
        Global.startNotifying();
        return new Promise<void>((resolve, reject) => {
          setImmediate(() => {
            this.notifyAllObservers();
            Global.doneNotifying();
            resolve();
          });
        });
      }
    }
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
  private notifyAllObservers(): void {
    for (const i in this._observable.observers) {
      if (this._observable.observers.hasOwnProperty(i)) {
        const holder = this._observable.observers[i];
        if (typeof holder.notify === "object") {
          // holder.notify.notify.bind(holder.notify);
          holder.notify.notify(); 
        } else {
          holder.notify();
        }
      }
    }
    this._observable.notifying = false;
  }
}
