"use strict";
exports.__esModule = true;
var CssClass = /** @class */ (function () {
    function CssClass(_a) {
        var _b = _a.name, name = _b === void 0 ? '!noName!' : _b, _c = _a.value, value = _c === void 0 ? '!noValue!' : _c, _d = _a.integer, integer = _d === void 0 ? 0 : _d;
        this.name = name;
        this.value = value;
        this.integer = integer;
    }
    CssClass.prototype.createCssRule = function () {
        return ".".concat(this.name, " {").concat(this.value, "}");
    };
    return CssClass;
}());
exports["default"] = CssClass;
