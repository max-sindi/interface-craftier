"use strict";
exports.__esModule = true;
var CssClass_1 = require("./CssClass");
var Unit = /** @class */ (function () {
    function Unit(_a, classBranch) {
        var _b = _a.unit, unit = _b === void 0 ? "!noUnit!" : _b, _c = _a.prefix, prefix = _c === void 0 ? "" : _c, _d = _a.limit, limit = _d === void 0 ? 1000 : _d, _e = _a.step, step = _e === void 0 ? 1 : _e, _f = _a.minus, minus = _f === void 0 ? false : _f;
        this.unit = unit;
        this.prefix = prefix;
        this.limit = limit;
        this.step = step;
        this.minus = minus;
        this.classBranch = classBranch;
    }
    Unit.prototype.createClassName = function (integer, minus) {
        if (minus === void 0) { minus = false; }
        var prefixes = [
            this.prefix,
            minus && 'minus'
        ].filter(Boolean);
        var prefix = !prefixes.length ? '' : '-' + prefixes.join('-');
        var name = "".concat(this.classBranch.className, "-").concat(integer).concat(prefix);
        var value = this.classBranch.createValue(String("".concat(integer * (minus ? -1 : 1)) // - or +
            +
                "".concat(integer == 0 ? '' : this.unit) // omit redundant unit for 0 value
        ));
        return new CssClass_1["default"]({ name: name, value: value });
    };
    Unit.prototype.populateClasses = function () {
        for (var value = 0; value <= this.limit; value += this.step) {
            // create positive values
            this.classBranch.classes.push(this.createClassName(value));
            // create negative values
            this.minus && this.classBranch.classes.push(this.createClassName(value, true));
        }
    };
    return Unit;
}());
exports["default"] = Unit;
