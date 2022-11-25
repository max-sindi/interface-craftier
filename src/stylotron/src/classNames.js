"use strict";
exports.__esModule = true;
exports.widthClassNameInstance = void 0;
var CssUnitClassBranch_1 = require("./CssUnitClassBranch");
var CssSimpleClassBranch_1 = require("./CssSimpleClassBranch");
exports.widthClassNameInstance = new CssUnitClassBranch_1["default"]({
    className: 'w',
    property: 'width',
    media: true,
    percent: 200,
    each5ValuesLimit: 1200,
    eachValueLimit: 20,
    px: true,
    vh: 100
});
var heightClassNameInstance = new CssUnitClassBranch_1["default"]({
    className: 'h',
    property: 'height',
    media: true,
    percent: 200,
    each5ValuesLimit: 1000,
    eachValueLimit: 50,
    px: true,
    vh: 100
});
var classNames = [
    new CssSimpleClassBranch_1["default"]({
        className: 'container',
        fast: 'max-width: 1200px; box-sizing: content-box; width: 100%; margin-left: auto; margin-right: auto; padding-left: 90px; padding-right: 90px'
    }),
    exports.widthClassNameInstance,
    new CssUnitClassBranch_1["default"]({
        className: 'w-calc',
        property: 'width',
        classNameCreator: function (mdf) { return "calc(100% + ".concat(mdf, ")"); },
        media: true,
        each5ValuesLimit: 400,
        eachValueLimit: 50,
        px: true
    }),
    heightClassNameInstance,
    new CssUnitClassBranch_1["default"]({
        className: 'max-w',
        property: 'max-width',
        media: true,
        percent: 200,
        each5ValuesLimit: 800,
        px: true,
        vh: 100
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'max-h',
        property: 'max-height',
        media: true,
        percent: 200,
        each5ValuesLimit: 1000,
        px: true,
        vh: 100
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'min-w',
        property: 'min-width',
        media: true,
        percent: 200,
        each5ValuesLimit: 200,
        px: true,
        vh: 100
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'min-h',
        property: 'min-height',
        media: true,
        percent: 200,
        each5ValuesLimit: 700,
        px: true,
        vh: 100
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'p',
        property: 'padding',
        media: true,
        percent: 200,
        each5ValuesLimit: 200,
        px: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'pl',
        property: 'padding-left',
        media: true,
        percent: 200,
        each5ValuesLimit: 400,
        eachValueLimit: 50,
        px: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'pr',
        property: 'padding-right',
        media: true,
        percent: 200,
        each5ValuesLimit: 400,
        eachValueLimit: 50,
        px: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'pt',
        property: 'padding-top',
        media: true,
        percent: 200,
        each5ValuesLimit: 400,
        eachValueLimit: 50,
        px: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'pb',
        property: 'padding-bottom',
        media: true,
        percent: 200,
        each5ValuesLimit: 400,
        eachValueLimit: 50,
        px: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'm',
        property: 'margin',
        media: true,
        percent: 200,
        each5ValuesLimit: 400,
        px: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'ml',
        property: 'margin-left',
        media: true,
        percent: 200,
        each5ValuesLimit: 400,
        px: true,
        minus: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'mr',
        property: 'margin-right',
        media: true,
        percent: 200,
        each5ValuesLimit: 400,
        px: true,
        minus: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'mt',
        property: 'margin-top',
        media: true,
        percent: 200,
        each5ValuesLimit: 400,
        px: true,
        minus: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'mb',
        property: 'margin-bottom',
        media: true,
        percent: 200,
        each5ValuesLimit: 400,
        px: true,
        minus: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'l',
        property: 'left',
        media: true,
        percent: 200,
        each5ValuesLimit: 1000,
        eachValueLimit: 15,
        px: true,
        minus: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'r',
        property: 'right',
        media: true,
        percent: 200,
        each5ValuesLimit: 1000,
        eachValueLimit: 15,
        px: true,
        minus: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 't',
        property: 'top',
        media: true,
        percent: 200,
        each5ValuesLimit: 1000,
        eachValueLimit: 15,
        px: true,
        minus: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'b',
        property: 'bottom',
        media: true,
        percent: 200,
        each5ValuesLimit: 1000,
        eachValueLimit: 15,
        px: true,
        minus: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'fz',
        property: 'font-size',
        media: true,
        percent: 200,
        eachValueLimit: 50,
        px: true
    }),
    new CssUnitClassBranch_1["default"]({ className: 'border-radius', property: 'border-radius', eachValueLimit: 10, px: true }),
    new CssUnitClassBranch_1["default"]({ className: 'border-width', property: 'border-width', eachValueLimit: 10, px: true }),
    new CssUnitClassBranch_1["default"]({ className: 'lh', property: 'line-height', eachValueLimit: 100, px: true }),
    new CssUnitClassBranch_1["default"]({ className: 'z-index', property: 'z-index', media: true, eachValueLimit: 40, minus: true }),
    new CssUnitClassBranch_1["default"]({
        className: 'order',
        property: 'order',
        media: true,
        eachValueLimit: 10
    }),
    new CssSimpleClassBranch_1["default"]({ className: 't-a', fast: 'top: auto', media: true }),
    new CssSimpleClassBranch_1["default"]({ className: 'ml-a', fast: 'margin-left: auto', media: true }),
    new CssSimpleClassBranch_1["default"]({ className: 'mr-a', fast: 'margin-right: auto', media: true }),
    new CssSimpleClassBranch_1["default"]({
        property: 'display',
        classNameCreator: function (mdf) { return "d-".concat(mdf); },
        values: ['none', 'flex', 'inline-flex', 'block', 'inline', 'inline-block']
    }),
    new CssSimpleClassBranch_1["default"]({
        property: 'align-items',
        classNameCreator: function (mdf) { return "align-".concat(mdf); },
        values: ['center', 'flex-start', 'flex-end']
    }),
    new CssSimpleClassBranch_1["default"]({
        property: 'justify-content',
        classNameCreator: function (mdf) { return "justify-".concat(mdf); },
        values: ['center', 'space-between', 'space-around', 'flex-end', 'flex-start']
    }),
    new CssSimpleClassBranch_1["default"]({
        property: 'position',
        values: ['fixed', 'relative', 'absolute', 'static']
    }),
    new CssSimpleClassBranch_1["default"]({
        property: 'overflow',
        classNameCreator: function (mdf) { return "overflow-".concat(mdf); },
        values: ['hidden', 'auto']
    }),
    new CssSimpleClassBranch_1["default"]({
        property: 'border-style',
        values: ['solid', 'dashed']
    }),
    new CssSimpleClassBranch_1["default"]({
        property: 'text-align',
        classNameCreator: function (mdf) { return "text-".concat(mdf); },
        values: ['center', 'left', 'right']
    }),
    new CssSimpleClassBranch_1["default"]({
        className: 'bg-cover',
        fast: 'background-size: cover'
    }),
    new CssSimpleClassBranch_1["default"]({
        className: 'bg-no-repeat',
        fast: 'background-repeat: no-repeat'
    }),
    new CssSimpleClassBranch_1["default"]({
        className: 'bg-center',
        fast: 'background-position: center'
    }),
    new CssSimpleClassBranch_1["default"]({
        property: 'flex-grow',
        classNameCreator: function (mdf) { return "grow-".concat(mdf); },
        values: ['1', '2', '3']
    }),
    new CssSimpleClassBranch_1["default"]({ className: 'flex-wrap', fast: 'flex-wrap: wrap', media: true }),
    new CssSimpleClassBranch_1["default"]({ className: 'flex', fast: 'display: flex', media: true }),
    new CssSimpleClassBranch_1["default"]({ className: 'flex-center', fast: 'justify-content: center; align-items: center' }),
    new CssSimpleClassBranch_1["default"]({ className: 'pre-wrap', fast: 'white-space: pre-wrap' }),
    new CssSimpleClassBranch_1["default"]({ className: 'text-wrap', fast: 'white-space: normal', media: true }),
    new CssSimpleClassBranch_1["default"]({ className: 'text-no-wrap', fast: 'white-space: nowrap', media: true }),
    new CssSimpleClassBranch_1["default"]({ className: 'bold', fast: 'font-weight: 700' }),
    new CssSimpleClassBranch_1["default"]({ className: 'pointer', fast: 'cursor: pointer' }),
    new CssSimpleClassBranch_1["default"]({ className: 'fw-bold', fast: 'font-weight: 700' }),
    new CssSimpleClassBranch_1["default"]({ className: 'ls-027', fast: 'letter-spacing: 0.27px' }),
    new CssSimpleClassBranch_1["default"]({ className: 'ls-05', fast: 'letter-spacing: 0.54px' }),
    new CssSimpleClassBranch_1["default"]({ className: 'transform-left-top-center', fast: 'transform: translate(-50%, -50%)' }),
    new CssSimpleClassBranch_1["default"]({ className: 'transform-right-top-center', fast: 'transform: translate(50%, -50%)' }),
    new CssSimpleClassBranch_1["default"]({ className: 'transform-left-bottom-center', fast: 'transform: translate(-50%, 50%)' }),
    new CssSimpleClassBranch_1["default"]({ className: 'transform-right-bottom-center', fast: 'transform: translate(50%, 50%)' }),
    new CssSimpleClassBranch_1["default"]({ className: 'transform-right-center', fast: 'transform: translateX(50%)' }),
    new CssSimpleClassBranch_1["default"]({ className: 'transform-left-center', fast: 'transform: translateX(-50%)' }),
    new CssSimpleClassBranch_1["default"]({ className: 'transform-top-center', fast: 'transform: translateY(-50%)' }),
    new CssSimpleClassBranch_1["default"]({ className: 'transform-bottom-center', fast: 'transform: translateY(50%)' }),
    new CssSimpleClassBranch_1["default"]({ className: 'scale-75-p', fast: 'transform: scale(0.75)', media: true }),
    new CssSimpleClassBranch_1["default"]({ className: 't-a', fast: 'top: auto' }),
    new CssSimpleClassBranch_1["default"]({ className: 'l-a', fast: 'left: auto', media: true }),
    /* special */
    new CssSimpleClassBranch_1["default"]({
        className: 'color-white',
        fast: "color: white"
    }),
    new CssSimpleClassBranch_1["default"]({
        className: 'ff-primary',
        fast: "font-family: \"Maitree, serif\""
    }),
    new CssSimpleClassBranch_1["default"]({
        className: 'ff-secondary',
        fast: "font-family: \"Raleway, serif\""
    }),
    new CssSimpleClassBranch_1["default"]({
        className: 'ff-thirdly',
        fast: "font-family: \"Circe, serif\""
    }),
    new CssSimpleClassBranch_1["default"]({
        className: 'black',
        fast: "color: #111"
    }),
    new CssSimpleClassBranch_1["default"]({
        className: 'flex-column',
        fast: 'flex-direction: column'
    }),
    new CssSimpleClassBranch_1["default"]({
        classNameCreator: function (mdf) { return "fw-".concat(mdf); },
        property: "font-weight",
        values: ['300', '400', '500', '600', '700', '800', '900']
    }),
    new CssSimpleClassBranch_1["default"]({
        property: "text-transform",
        values: ['capitalize', 'uppercase']
    }),
];
exports["default"] = classNames;
