import { Observable } from "../src/main";
export declare class SomeChild extends Observable {
    version: number;
    updateVersion(): Promise<void>;
    constructor(parent: Observable);
}
export declare class SomeRoot extends Observable {
    children: SomeChild[];
    constructor();
    newChildren(): void;
}
