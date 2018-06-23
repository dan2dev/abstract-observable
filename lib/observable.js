"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable = /** @class */ (function () {
    function Observable() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._observable = {
            lastIndex: -1,
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
        var notifyFunc = (typeof observer === "object") ? observer.notify : observer;
        this._observable.observers[currentIndex] = {
            index: this._observable.lastIndex,
            notify: notifyFunc,
        };
        // * return unsubscribe method
        return function () {
            delete _this._observable.observers[currentIndex + 0];
        };
    };
    Observable.prototype.notify = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this._observable.notifying) {
                _this._observable.notifying = true;
                setImmediate(function () {
                    for (var i in _this._observable.observers) {
                        if (_this._observable.observers.hasOwnProperty(i)) {
                            var holder = _this._observable.observers[i];
                            holder.notify();
                        }
                    }
                    _this._observable.notifying = false;
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    };
    return Observable;
}());
exports.Observable = Observable;
//# sourceMappingURL=observable.js.map