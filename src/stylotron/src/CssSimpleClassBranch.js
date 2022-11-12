"use strict";
exports.__esModule = true;
var CssClass_1 = require("./CssClass");
// import * as _ from "lodash"
var CssSimpleClassBranch = /** @class */ (function () {
    function CssSimpleClassBranch(_a) {
        var _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.fast, fast = _c === void 0 ? '' : _c, _d = _a.property, property = _d === void 0 ? '' : _d, _e = _a.values, values = _e === void 0 ? [] : _e, _f = _a.media, media = _f === void 0 ? false : _f, _g = _a.classNameCreator, classNameCreator = _g === void 0 ? function (str) { return str; } : _g;
        this.className = className || property;
        this.fast = fast;
        this.property = property;
        this.values = values;
        this.classNameCreator = classNameCreator;
        this.classes = [];
        this.populateEnumerates();
        this.populateFast();
    }
    CssSimpleClassBranch.prototype.populateEnumerates = function () {
        var _this = this;
        // if(this.classNameCreator && Array.isArray(this.values)) {
        this.values.length && this.values.forEach(function (value) {
            return _this.classes.push(new CssClass_1["default"]({
                name: _this.classNameCreator(value),
                value: _this.createValue(value)
            }));
        });
        // }
    };
    CssSimpleClassBranch.prototype.populateFast = function () {
        if (this.fast) {
            this.classes.push(new CssClass_1["default"]({
                name: this.className,
                value: this.fast
            }));
        }
    };
    CssSimpleClassBranch.prototype.createValue = function (value) {
        return "".concat(this.property, ": ").concat(value);
    };
    return CssSimpleClassBranch;
}());
exports["default"] = CssSimpleClassBranch;
