"use strict";
exports.__esModule = true;
var CssClass = /** @class */ (function () {
    function CssClass(_a) {
        var _b = _a.name, name = _b === void 0 ? '!noName!' : _b, _c = _a.value, value = _c === void 0 ? '!noValue!' : _c;
        this.name = name;
        this.value = value;
    }
    CssClass.prototype.createCssRule = function () {
        return ".".concat(this.name, " {").concat(this.value, "}");
    };
    return CssClass;
}());
exports["default"] = CssClass;
