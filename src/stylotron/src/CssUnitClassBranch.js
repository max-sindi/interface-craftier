"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Unit_1 = require("./Unit");
var Media_1 = require("./Media");
var CssUnitClassBranch = /** @class */ (function (_super) {
    __extends(CssUnitClassBranch, _super);
    // public readonly noUnit?: boolean;
    function CssUnitClassBranch(_a) {
        var _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.property, property = _c === void 0 ? '' : _c, _d = _a.each5ValuesLimit, each5ValuesLimit = _d === void 0 ? 0 : _d, _e = _a.px, px = _e === void 0 ? false : _e, _f = _a.vh, vh = _f === void 0 ? 100 : _f, _g = _a.eachValueLimit, eachValueLimit = _g === void 0 ? 50 : _g, _h = _a.percent, percent = _h === void 0 ? 0 : _h, _j = _a.minus, minus = _j === void 0 ? false : _j, 
        // todo move pseudo and media  to separate js class
        _k = _a.decoratorAfter, 
        // todo move pseudo and media  to separate js class
        decoratorAfter = _k === void 0 ? true : _k, _l = _a.decoratorBefore, decoratorBefore = _l === void 0 ? true : _l, _m = _a.media, media = _m === void 0 ? false : _m, 
        // noUnit = false,
        _o = _a.classNameCreator, 
        // noUnit = false,
        classNameCreator = _o === void 0 ? function (str) { return str; } : _o;
        var _this = _super.call(this, media) || this;
        _this.className = className;
        _this.property = property;
        _this.classes = [];
        _this.classNameCreator = classNameCreator;
        _this.decoratorAfter = decoratorAfter;
        _this.decoratorBefore = decoratorBefore;
        // todo units can (and should) be declared explicitly, right in Class instantiating
        _this.units = [
            px &&
                new Unit_1["default"]({
                    unit: 'px',
                    ranges: [
                        eachValueLimit && { limit: eachValueLimit, step: 1 },
                        each5ValuesLimit && { limit: each5ValuesLimit, step: 5 },
                    ].filter(Boolean),
                    minus: minus,
                    decoratorAfter: decoratorAfter,
                    decoratorBefore: decoratorBefore
                }, _this),
            percent &&
                new Unit_1["default"]({ unit: '%', prefix: 'p', ranges: [{ limit: percent, step: 5 }], minus: minus, decoratorAfter: decoratorAfter, decoratorBefore: decoratorBefore }, _this),
            percent &&
                new Unit_1["default"]({ unit: 'vh', prefix: 'vh', ranges: [{ limit: vh, step: 5 }], minus: false, decoratorAfter: decoratorAfter, decoratorBefore: decoratorBefore }, _this),
        ].filter(Boolean);
        // todo move media to separate class
        // this.media = !media ? [] : [
        //     new Media(400),
        //     new Media(700),
        // ]
        _this.populateUnits();
        return _this;
    }
    CssUnitClassBranch.prototype.populateUnits = function () {
        this.units.forEach(function (unit) {
            unit.populateClasses();
        });
    };
    CssUnitClassBranch.prototype.createValue = function (value) {
        return "".concat(this.property, ": ").concat(this.classNameCreator(value));
    };
    return CssUnitClassBranch;
}(Media_1["default"]));
exports["default"] = CssUnitClassBranch;
