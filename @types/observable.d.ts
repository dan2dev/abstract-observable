import { IObserver } from "./interface/observer";
import { IObservable } from "./interface/observable";
export declare abstract class Observable implements IObservable {
    private _observable;
    private notifyAllObservers;
    constructor(parent?: Observable);
    constructor(observer?: IObserver);
    getRoot(): IObservable | undefined;
    getParent(): IObservable | undefined;
    subscribe(observer: (() => void) | IObserver): () => void;
    notify(): Promise<void>;
}
