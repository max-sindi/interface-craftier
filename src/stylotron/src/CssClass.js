"use strict";
exports.__esModule = true;
exports.isNumber = void 0;
var isNumber = function (value) { return -Math.abs(value) < 0; };
exports.isNumber = isNumber;
var CssClass = /** @class */ (function () {
    function CssClass(_a) {
        var _b = _a.name, name = _b === void 0 ? '!noName!' : _b, _c = _a.value, value = _c === void 0 ? '!noValue!' : _c, _d = _a.integer, integer = _d === void 0 ? NaN : _d, _e = _a.decoratorAfter, decoratorAfter = _e === void 0 ? true : _e, _f = _a.decoratorBefore, decoratorBefore = _f === void 0 ? true : _f;
        this.name = name;
        this.value = value;
        if (!Number.isNaN(integer)) {
            this.integer = integer;
        }
        this.decoratorAfter = decoratorAfter;
        this.decoratorBefore = decoratorBefore;
    }
    CssClass.prototype.createCssRule = function () {
        return ".".concat(this.name, " { ").concat(this.value, " }");
    };
    CssClass.prototype.createBeforeRule = function () {
        return ".decor-before-".concat(this.name, "::before { ").concat(this.value, " }");
    };
    CssClass.prototype.createAfterRule = function () {
        return ".decor-after-".concat(this.name, "::after { ").concat(this.value, " }");
    };
    return CssClass;
}());
exports["default"] = CssClass;
