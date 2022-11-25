"use strict";
exports.__esModule = true;
var CssClass_1 = require("./CssClass");
var Unit = /** @class */ (function () {
    function Unit(_a, classBranch) {
        var _b = _a.unit, unit = _b === void 0 ? 'px' : _b, _c = _a.prefix, prefix = _c === void 0 ? '' : _c, _d = _a.ranges, ranges = _d === void 0 ? [] : _d, _e = _a.minus, minus = _e === void 0 ? false : _e, _f = _a.decoratorAfter, decoratorAfter = _f === void 0 ? true : _f, _g = _a.decoratorBefore, decoratorBefore = _g === void 0 ? true : _g;
        this.unit = unit;
        this.prefix = prefix;
        this.ranges = ranges;
        this.minus = minus;
        this.decoratorAfter = decoratorAfter;
        this.decoratorBefore = decoratorBefore;
        this.classBranch = classBranch;
        this.classNames = [];
    }
    Unit.prototype.createClassName = function (integer, minus) {
        if (minus === void 0) { minus = false; }
        var prefixes = [this.prefix, minus && 'minus'].filter(Boolean);
        var prefix = !prefixes.length ? '' : '-' + prefixes.join('-');
        var name = "".concat(this.classBranch.className, "-").concat(integer).concat(prefix);
        var value = this.classBranch.createValue(String("".concat(integer * (minus ? -1 : 1)) + // - or +
            "".concat(integer === 0 ? '' : this.unit) // omit redundant unit for 0 value
        ));
        return new CssClass_1["default"]({
            name: name,
            value: value,
            integer: integer,
            decoratorAfter: this.decoratorAfter,
            decoratorBefore: this.decoratorBefore
        });
    };
    Unit.prototype.populateClasses = function () {
        var _this = this;
        // firstly fill negative values
        if (this.minus) {
            this.ranges
                .sort(function (range1, range2) { return range2.limit - range1.limit; })
                .forEach(function (range, index, arr) {
                var nextRange = arr[index + 1];
                for (var value = range.limit; value >= (nextRange ? nextRange.limit : 0); value -= range.step) {
                    var negativeClassName = _this.createClassName(value, true);
                    _this.classBranch.classes.push(negativeClassName);
                    _this.classNames.push(negativeClassName);
                }
            });
        }
        // then fill positive values
        this.ranges
            .sort(function (range1, range2) { return range1.limit - range2.limit; })
            .forEach(function (range, index, arr) {
            var prevRange = arr[index - 1];
            for (var value = prevRange ? prevRange.limit : 0; value <= range.limit; value += range.step) {
                var positiveClassName = _this.createClassName(value);
                _this.classBranch.classes.push(positiveClassName);
                _this.classNames.push(positiveClassName);
            }
        });
    };
    return Unit;
}());
exports["default"] = Unit;
