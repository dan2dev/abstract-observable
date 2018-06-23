import { IObserver } from "./observer";
export declare abstract class Observable {
    private _observable;
    constructor(parent?: Observable);
    constructor(observer?: IObserver);
    subscribe(observer: (() => void) | IObserver): () => void;
    notify(): Promise<void>;
    private notifyAllObservers;
}
