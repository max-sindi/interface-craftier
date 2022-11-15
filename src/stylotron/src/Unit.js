"use strict";
exports.__esModule = true;
var CssClass_1 = require("./CssClass");
var Unit = /** @class */ (function () {
    // step: number
    // name: string
    function Unit(_a, classBranch) {
        var _b = _a.unit, unit = _b === void 0 ? 'px' : _b, _c = _a.prefix, prefix = _c === void 0 ? "" : _c, _d = _a.ranges, ranges = _d === void 0 ? [] : _d, 
        // limit = 1000,
        // step = 1,
        _e = _a.minus, 
        // limit = 1000,
        // step = 1,
        minus = _e === void 0 ? false : _e;
        this.unit = unit;
        this.prefix = prefix;
        this.ranges = ranges;
        // this.step = step
        this.minus = minus;
        // this.name = name
        this.classBranch = classBranch;
        this.classNames = [];
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
                "".concat(integer === 0 ? '' : this.unit) // omit redundant unit for 0 value
        ));
        return new CssClass_1["default"]({ name: name, value: value, integer: integer });
    };
    Unit.prototype.populateClasses = function () {
        var _this = this;
        this.ranges.forEach(function (_a) {
            var limit = _a.limit, step = _a.step;
            // create negative values
            if (_this.minus) {
                for (var value = limit; value >= 0; value -= step) {
                    var negativeClassName = _this.createClassName(value, true);
                    _this.classBranch.classes.push(negativeClassName);
                    _this.classNames.push(negativeClassName);
                }
            }
            var _loop_1 = function (value) {
                var positiveClassName = _this.createClassName(value);
                var alreadyExist = _this.classBranch.classes.find(function (_a) {
                    var name = _a.name;
                    return name === positiveClassName.name;
                });
                if (!alreadyExist) {
                    _this.classBranch.classes.push(positiveClassName);
                    _this.classNames.push(positiveClassName);
                }
            };
            // create positive values
            for (var value = 0; value <= limit; value += step) {
                _loop_1(value);
            }
        });
    };
    return Unit;
}());
exports["default"] = Unit;
