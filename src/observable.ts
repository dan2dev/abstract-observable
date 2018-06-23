import { IObserver } from "./observer";
import { Global } from "./global";
// let globalNotifying = false;
interface IObserverData {
  lastIndex: number;
  observers: {
    [index: number]: {
      index: number;
      notify(): void;
    };
  };
  notifying: boolean;
}
export abstract class Observable {
  private _observable: IObserverData = {
    lastIndex: -1,
    observers: {},
    notifying: false,
  };
  constructor(...args: any[]) {
    for (const arg of args) {
      if (arg && typeof (arg as IObserver).update !== "undefined") {
        const parent: IObserver = (arg as IObserver);
        parent && this.subscribe(parent);
      }
    }
  }
  public subscribe(observer: (() => void) | IObserver): () => void {
    const currentIndex = this._observable.lastIndex++;
    const notifyFunc = (typeof observer === "object") ? (observer as IObserver).update : (observer as () => void);
    this._observable.observers[currentIndex] = {
      index: this._observable.lastIndex,
      notify: notifyFunc,
    };
    // * return unsubscribe method
    return () => {
      delete this._observable.observers[currentIndex + 0];
    };
  }
  public notify(): Promise<void> | void {
    this._observable.notifying = true;
    if (!this._observable.notifying) {
      if (Global.isNotifying()) {
        this.notifyAllObservers();
      } else {
        Global.startNotifying();
        return new Promise<void>((resolve, reject) => {
          if (!this._observable.notifying) {
            setImmediate(() => {
              this.notifyAllObservers();
              resolve();
              Global.doneNotifying();
            });
          } else {
            resolve();
          }
        });
      }
    }
  }
  private notifyAllObservers(): void {
    for (const i in this._observable.observers) {
      if (this._observable.observers.hasOwnProperty(i)) {
        const holder = this._observable.observers[i];
        holder.notify();
      }
    }
    this._observable.notifying = false;
  }
}
