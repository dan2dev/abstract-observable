import { Observable, IObserver } from "../src/main";
export class DeliveryResource extends Observable {
  public resourceId: number;
  public constructor(root: Observable) {
    super(root);
  }
}
export class DeliveryBoy extends Observable {
  public placeId: number = 0;
  public resource: DeliveryResource;
  public constructor() {
    super();
  }
  public changePlace(newPlaceId: number) {
    this.placeId = newPlaceId;
  }
}
export class BoyController implements IObserver {
  public updatedCount: number = 0;
  public notify(): void {
    this.updatedCount++;
  }
}
test("class created", () => {
  expect(true).toBe(true);
});
