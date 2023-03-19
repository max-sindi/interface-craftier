"use strict";
exports.__esModule = true;
var CssUnitClassBranch_1 = require("./CssUnitClassBranch");
var CssSimpleClassBranch_1 = require("./CssSimpleClassBranch");
var widthClassNameInstance = new CssUnitClassBranch_1["default"]({
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
var maxWidthClassNameInstance = new CssUnitClassBranch_1["default"]({
    className: 'max-w',
    property: 'max-width',
    media: true,
    percent: 200,
    each5ValuesLimit: 1200,
    px: true,
    vh: 100
});
var classNames = [
    new CssSimpleClassBranch_1["default"]({
        className: 'container',
        fast: 'max-width: 1500px; box-sizing: border-box; width: 100%; margin-left: auto; margin-right: auto; padding-left: 30px; padding-right: 30px'
    }),
    widthClassNameInstance,
    // new CssUnitClassBranch({
    //   className: 'w-calc',
    //   property: 'width',
    //   classNameCreator: (mdf: string) => `calc(100% + ${mdf})`,
    //   media: true,
    //   each5ValuesLimit: 400,
    //   eachValueLimit: 50,
    //   px: true,
    // }),
    heightClassNameInstance,
    maxWidthClassNameInstance,
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
        each5ValuesLimit: 1000,
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
        each5ValuesLimit: 500,
        px: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'pl',
        property: 'padding-left',
        media: true,
        percent: 200,
        each5ValuesLimit: 500,
        eachValueLimit: 20,
        px: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'pr',
        property: 'padding-right',
        media: true,
        percent: 200,
        each5ValuesLimit: 400,
        eachValueLimit: 20,
        px: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'pt',
        property: 'padding-top',
        media: true,
        percent: 200,
        each5ValuesLimit: 400,
        eachValueLimit: 20,
        px: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'pb',
        property: 'padding-bottom',
        media: true,
        percent: 200,
        each5ValuesLimit: 400,
        eachValueLimit: 20,
        px: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'm',
        property: 'margin',
        media: true,
        percent: 200,
        each5ValuesLimit: 400,
        eachValueLimit: 20,
        px: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'ml',
        property: 'margin-left',
        media: true,
        percent: 200,
        each5ValuesLimit: 400,
        eachValueLimit: 20,
        px: true,
        minus: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'mr',
        property: 'margin-right',
        media: true,
        percent: 200,
        each5ValuesLimit: 400,
        eachValueLimit: 20,
        px: true,
        minus: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'mt',
        property: 'margin-top',
        media: true,
        percent: 200,
        each5ValuesLimit: 400,
        eachValueLimit: 20,
        px: true,
        minus: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'mb',
        property: 'margin-bottom',
        media: true,
        percent: 200,
        each5ValuesLimit: 400,
        eachValueLimit: 20,
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
        className: 'bw',
        property: 'border-width',
        media: true,
        eachValueLimit: 15,
        px: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'bl',
        property: 'border-left-width',
        media: true,
        eachValueLimit: 15,
        px: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'br',
        property: 'border-right-width',
        media: true,
        eachValueLimit: 15,
        px: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'bt',
        property: 'border-top-width',
        media: true,
        eachValueLimit: 15,
        px: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'bb',
        property: 'border-bottom-width',
        media: true,
        eachValueLimit: 15,
        px: true
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'fz',
        property: 'font-size',
        media: true,
        percent: 200,
        eachValueLimit: 50,
        px: true
    }),
    new CssSimpleClassBranch_1["default"]({
        classNameCreator: function (mdf) { return "fw-".concat(mdf); },
        property: "font-weight",
        values: ['300', '400', '500', '600', '700', '800', '900']
    }),
    new CssUnitClassBranch_1["default"]({
        className: 'border-radius',
        property: 'border-radius',
        eachValueLimit: 10,
        each5ValuesLimit: 100,
        px: true
    }),
    new CssUnitClassBranch_1["default"]({ className: 'border-width', property: 'border-width', eachValueLimit: 10, px: true }),
    new CssUnitClassBranch_1["default"]({ className: 'lh', property: 'line-height', eachValueLimit: 100, px: true }),
    new CssSimpleClassBranch_1["default"]({
        classNameCreator: function (mdf) { return "z-index-".concat(mdf); },
        property: 'z-index',
        media: true,
        values: ['-1', '0', '1', '2', '3']
    }),
    new CssSimpleClassBranch_1["default"]({
        classNameCreator: function (mdf) { return "order-".concat(mdf); },
        property: 'order',
        media: true,
        values: ['-1', '0', '1', '2', '3']
    }),
    new CssSimpleClassBranch_1["default"]({
        property: 'display',
        classNameCreator: function (mdf) { return "d-".concat(mdf); },
        values: ['none', 'flex', 'inline-flex', 'block', 'inline', 'inline-block']
    }),
    new CssSimpleClassBranch_1["default"]({
        property: 'flex-direction',
        classNameCreator: function (mdf) { return "flex-".concat(mdf); },
        values: ['row', 'column', 'row-reverse', 'column-reverse']
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
        property: 'visibility',
        classNameCreator: function (mdf) { return "visibility-".concat(mdf); },
        values: ['visible', 'hidden']
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
    new CssSimpleClassBranch_1["default"]({
        property: 'white-space',
        classNameCreator: function (mdf) { return "white-space-".concat(mdf); },
        values: ['pre-wrap', 'text-wrap', 'nowrap']
    }),
    new CssSimpleClassBranch_1["default"]({ className: 'flex-wrap', fast: 'flex-wrap: wrap', media: true }),
    new CssSimpleClassBranch_1["default"]({
        className: 'flex-center',
        fast: 'display: flex; justify-content: center; align-items: center'
    }),
    new CssSimpleClassBranch_1["default"]({ className: 'pointer', fast: 'cursor: pointer' }),
    new CssSimpleClassBranch_1["default"]({ className: 'transform-left-top-center', fast: 'transform: translate(-50%, -50%)' }),
    new CssSimpleClassBranch_1["default"]({ className: 'transform-right-top-center', fast: 'transform: translate(50%, -50%)' }),
    new CssSimpleClassBranch_1["default"]({ className: 'transform-left-bottom-center', fast: 'transform: translate(-50%, 50%)' }),
    new CssSimpleClassBranch_1["default"]({ className: 'transform-right-bottom-center', fast: 'transform: translate(50%, 50%)' }),
    new CssSimpleClassBranch_1["default"]({ className: 'transform-right-center', fast: 'transform: translateX(50%)' }),
    new CssSimpleClassBranch_1["default"]({ className: 'transform-left-center', fast: 'transform: translateX(-50%)' }),
    new CssSimpleClassBranch_1["default"]({ className: 'transform-top-center', fast: 'transform: translateY(-50%)' }),
    new CssSimpleClassBranch_1["default"]({ className: 'transform-bottom-center', fast: 'transform: translateY(50%)' }),
    new CssSimpleClassBranch_1["default"]({ className: 'scale-75-p', fast: 'transform: scale(0.75)', media: true }),
    new CssSimpleClassBranch_1["default"]({ className: 'rotate-180-deg', fast: 'transform: rotate(180deg)', media: true }),
    new CssSimpleClassBranch_1["default"]({ className: 'rotate-90-deg', fast: 'transform: rotate(90deg)', media: true }),
    new CssSimpleClassBranch_1["default"]({
        property: "text-transform",
        values: ['capitalize', 'uppercase']
    }),
    new CssSimpleClassBranch_1["default"]({
        property: 'text-decoration',
        values: ['none', 'underline', 'linethrough']
    }),
    new CssSimpleClassBranch_1["default"]({
        property: 'box-sizing',
        values: ['border-box', 'content-box']
    }),
];
exports["default"] = classNames;
