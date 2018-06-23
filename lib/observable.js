"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = require("./global");
var Observable = /** @class */ (function () {
    function Observable() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._observable = {
            lastIndex: 0,
            observers: {},
            notifying: false,
        };
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var arg = args_1[_a];
            if (arg && typeof arg.notify !== "undefined") {
                var parent_1 = arg;
                parent_1 && this.subscribe(parent_1);
            }
        }
    }
    Observable.prototype.subscribe = function (observer) {
        var _this = this;
        var currentIndex = this._observable.lastIndex++;
        this._observable.observers[currentIndex] = {
            index: currentIndex,
            // notify: (typeof observer === "object") ? (observer as IObserver).update : (observer as () => void),
            notify: observer,
        };
        // * return unsubscribe method
        return function () {
            delete _this._observable.observers[currentIndex];
        };
    };
    Observable.prototype.notify = function () {
        var _this = this;
        if (!this._observable.notifying) {
            this._observable.notifying = true;
            if (global_1.Global.isNotifying()) {
                this.notifyAllObservers();
            }
            else {
                global_1.Global.startNotifying();
                return new Promise(function (resolve, reject) {
                    setImmediate(function () {
                        _this.notifyAllObservers();
                        global_1.Global.doneNotifying();
                        resolve();
                    });
                });
            }
        }
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    Observable.prototype.notifyAllObservers = function () {
        for (var i in this._observable.observers) {
            if (this._observable.observers.hasOwnProperty(i)) {
                var holder = this._observable.observers[i];
                if (typeof holder.notify === "object") {
                    // holder.notify.notify.bind(holder.notify);
                    holder.notify.notify();
                }
                else {
                    holder.notify();
                }
            }
        }
        this._observable.notifying = false;
    };
    return Observable;
}());
exports.Observable = Observable;
//# sourceMappingURL=observable.js.map