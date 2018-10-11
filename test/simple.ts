import { Observable, IObserver } from "../src/main";

export class SomeChild extends Observable {
  public version: number = 0;
  public async updateVersion(): Promise<void> {
    this.version += 1;
    this.notify();
  }
  public constructor(parent: Observable) {
    super(parent);
  }
}
export class SomeRoot extends Observable {
  public children: SomeChild[] = [];
  public constructor() {
    super();
  }
  public newChildren() {
    this.children.push(new SomeChild(this));
    this.notify();
  }
}