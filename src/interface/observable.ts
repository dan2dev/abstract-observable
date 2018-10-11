import { IObserver } from "./observer";
export interface IObservable extends IObserver {
  subscribe(observer: (() => void) | IObserver): () => void;
  getRoot(): IObservable | undefined;
}
export interface IObservableData {
    lastIndex: number;
    observers: {
      [index: number]: {
        index: number;
        notify: (() => void) | IObserver;
      };
    };
    parent: IObservable | undefined;
    // notifying: Promise<void> | undefined;
    notifyStack: number;
    notifyResolve: Array<(value?: void | PromiseLike<void>) => void>

  }