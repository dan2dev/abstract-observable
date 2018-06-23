"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global;
(function (Global) {
    var notifying = false;
    function isNotifying() {
        return notifying;
    }
    Global.isNotifying = isNotifying;
    function startNotifying() {
        notifying = true;
    }
    Global.startNotifying = startNotifying;
    function doneNotifying() {
        notifying = false;
    }
    Global.doneNotifying = doneNotifying;
})(Global = exports.Global || (exports.Global = {}));
//# sourceMappingURL=global.js.map