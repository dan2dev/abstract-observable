import { IObserver } from "./observer";
export declare abstract class Observable {
    private _observable;
    constructor(...args: any[]);
    subscribe(observer: (() => void) | IObserver): () => void;
    notify(): Promise<void>;
}
