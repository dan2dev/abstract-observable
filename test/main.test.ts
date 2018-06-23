import { Observable, IObserver } from "../src/main";
import { BoyController, DeliveryBoy, DeliveryResource } from "./simple";

const newDeliveryBoy1 = new DeliveryBoy();
const boysController = new BoyController();
newDeliveryBoy1.subscribe(boysController);
newDeliveryBoy1.resource = new DeliveryResource(newDeliveryBoy1);

test("basic", (done) => {
  newDeliveryBoy1.changePlace(1);
  newDeliveryBoy1.resource.notify().then(() => {
    expect(boysController.updatedCount).toBe(1);
    expect(newDeliveryBoy1.placeId).toBe(1);
    newDeliveryBoy1.notify().then(() => {
      expect(boysController.updatedCount).toBe(2);
      done();
    });
  });
});
