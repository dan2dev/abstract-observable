import { IObserver } from "./interface/observer";
import { IObservableData, IObservable } from "./interface/observable";
import asapCall from "asap";

export abstract class Observable implements IObservable {
  private _observable: IObservableData = {
    lastIndex: 0,
    observers: {},
    notifyStack: 0,
    notifyResolve: [],
    parent: undefined
  };
  private notifyAllObservers(): void {
    for (const i in this._observable.observers) {
      if (this._observable.observers.hasOwnProperty(i)) {
        const holder = this._observable.observers[i];
        if (typeof holder.notify === "object") {
            (holder.notify as Observable).notify(false);
        } else {
            (holder as IObserver).notify();
        }
      }
    }
    const resolvers = this._observable.notifyResolve;
    while(resolvers.length > 0) {
      const resolve = resolvers.shift();
      if(resolve !== undefined) {
        resolve();
      }
    }
  }
  protected constructor(parent?: Observable);
  protected constructor(observer?: IObserver);
  protected constructor(...args: any[]) {
    for (const arg of args) {
      if (arg && typeof (arg as IObserver).notify !== "undefined") {
        const parent: IObservable = (arg as IObservable);
        if (parent) {
          this.subscribe(parent);
        }
      }
    }
  }
  public getRoot(): IObservable | undefined {
    let root = this.getParent();
    while (root !== undefined) {
      root = this.getParent();
    }
    if (root === undefined) {
      root = this;
    }
    return root;
  }
  public getParent(): IObservable | undefined {
    return this._observable.parent;
  }
  public subscribe(observer: (() => void) | IObserver): () => void {
    const currentIndex = this._observable.lastIndex++;
    this._observable.observers[currentIndex] = {
      index: currentIndex,
      notify: observer,
    };
    // * return unsubscribe method
    return () => {
      delete this._observable.observers[currentIndex];
    };
  }
  public async notify(asap = true): Promise<void> {
    this._observable.notifyStack += 1;
    return new Promise<void>((resolve, reject) => {
      (this.getRoot() as this)._observable.notifyResolve.push(resolve);
      const action: () => void = () => {
          if (this._observable.notifyStack > 1) {
              this._observable.notifyStack -= 1;
          } else {
              this.notifyAllObservers();
          }
      };
      asap && asapCall(() => {
        action();
      });
      !asap && action();
    });
  }
} 
