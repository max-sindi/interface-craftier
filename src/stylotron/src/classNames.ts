import CssUnitClassBranch from './CssUnitClassBranch';
import CssSimpleClassBranch from './CssSimpleClassBranch';

const widthClassNameInstance = new CssUnitClassBranch({
  className: 'w',
  property: 'width',
  media: true,
  percent: 200,
  each5ValuesLimit: 1200,
  eachValueLimit: 20,
  px: true,
  vh: 100,
  // decoratorAfter: false,
  // decoratorBefore: false,
});

const heightClassNameInstance = new CssUnitClassBranch({
  className: 'h',
  property: 'height',
  media: true,
  percent: 200,
  each5ValuesLimit: 1000,
  eachValueLimit: 50,
  px: true,
  vh: 100,
});

const maxWidthClassNameInstance = new CssUnitClassBranch({
  className: 'max-w',
  property: 'max-width',
  media: true,
  percent: 200,
  each5ValuesLimit: 1200,
  px: true,
  vh: 100,
});

const classNames = [
  new CssSimpleClassBranch({
    className: 'container',
    fast: 'max-width: 1500px; box-sizing: border-box; width: 100%; margin-left: auto; margin-right: auto; padding-left: 30px; padding-right: 30px',
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
  new CssUnitClassBranch({
    className: 'max-h',
    property: 'max-height',
    media: true,
    percent: 200,
    each5ValuesLimit: 1000,
    px: true,
    vh: 100,
  }),
  new CssUnitClassBranch({
    className: 'min-w',
    property: 'min-width',
    media: true,
    percent: 200,
    each5ValuesLimit: 1000,
    px: true,
    vh: 100,
  }),
  new CssUnitClassBranch({
    className: 'min-h',
    property: 'min-height',
    media: true,
    percent: 200,
    each5ValuesLimit: 700,
    px: true,
    vh: 100,
  }),
  new CssUnitClassBranch({
    className: 'p',
    property: 'padding',
    media: true,
    percent: 200,
    each5ValuesLimit: 500,
    px: true,
  }),
  new CssUnitClassBranch({
    className: 'pl',
    property: 'padding-left',
    media: true,
    percent: 200,
    each5ValuesLimit: 500,
    eachValueLimit: 20,
    px: true,
  }),
  new CssUnitClassBranch({
    className: 'pr',
    property: 'padding-right',
    media: true,
    percent: 200,
    each5ValuesLimit: 400,
    eachValueLimit: 20,
    px: true,
  }),
  new CssUnitClassBranch({
    className: 'pt',
    property: 'padding-top',
    media: true,
    percent: 200,
    each5ValuesLimit: 400,
    eachValueLimit: 20,
    px: true,
  }),
  new CssUnitClassBranch({
    className: 'pb',
    property: 'padding-bottom',
    media: true,
    percent: 200,
    each5ValuesLimit: 400,
    eachValueLimit: 20,
    px: true,
  }),
  new CssUnitClassBranch({
    className: 'm',
    property: 'margin',
    media: true,
    percent: 200,
    each5ValuesLimit: 400,
    eachValueLimit: 20,
    px: true,
  }),
  new CssUnitClassBranch({
    className: 'ml',
    property: 'margin-left',
    media: true,
    percent: 200,
    each5ValuesLimit: 400,
    eachValueLimit: 20,
    px: true,
    minus: true,
  }),
  new CssUnitClassBranch({
    className: 'mr',
    property: 'margin-right',
    media: true,
    percent: 200,
    each5ValuesLimit: 400,
    eachValueLimit: 20,
    px: true,
    minus: true,
  }),
  new CssUnitClassBranch({
    className: 'mt',
    property: 'margin-top',
    media: true,
    percent: 200,
    each5ValuesLimit: 400,
    eachValueLimit: 20,
    px: true,
    minus: true,
  }),
  new CssUnitClassBranch({
    className: 'mb',
    property: 'margin-bottom',
    media: true,
    percent: 200,
    each5ValuesLimit: 400,
    eachValueLimit: 20,
    px: true,
    minus: true,
  }),
  new CssUnitClassBranch({
    className: 't',
    property: 'top',
    media: true,
    percent: 200,
    each5ValuesLimit: 1000,
    eachValueLimit: 15,
    px: true,
    minus: true,
  }),
  new CssUnitClassBranch({
    className: 'b',
    property: 'bottom',
    media: true,
    percent: 200,
    each5ValuesLimit: 1000,
    eachValueLimit: 15,
    px: true,
    minus: true,
  }),
  new CssUnitClassBranch({
    className: 'r',
    property: 'right',
    media: true,
    percent: 200,
    each5ValuesLimit: 1000,
    eachValueLimit: 15,
    px: true,
    minus: true,
  }),
  new CssUnitClassBranch({
    className: 'l',
    property: 'left',
    media: true,
    percent: 200,
    each5ValuesLimit: 1000,
    eachValueLimit: 15,
    px: true,
    minus: true,
  }),
  new CssUnitClassBranch({
    className: 'bw',
    property: 'border-width',
    media: true,
    eachValueLimit: 15,
    px: true,
  }),
  new CssUnitClassBranch({
    className: 'bl',
    property: 'border-left-width',
    media: true,
    eachValueLimit: 15,
    px: true,
  }),
  new CssUnitClassBranch({
    className: 'br',
    property: 'border-right-width',
    media: true,
    eachValueLimit: 15,
    px: true,
  }),
  new CssUnitClassBranch({
    className: 'bt',
    property: 'border-top-width',
    media: true,
    eachValueLimit: 15,
    px: true,
  }),
  new CssUnitClassBranch({
    className: 'bb',
    property: 'border-bottom-width',
    media: true,
    eachValueLimit: 15,
    px: true,
  }),
  new CssUnitClassBranch({
    className: 'fz',
    property: 'font-size',
    media: true,
    percent: 200,
    eachValueLimit: 50,
    px: true,
  }),
  new CssSimpleClassBranch({
    classNameCreator: (mdf) => `fw-${mdf}`,
    property: `font-weight`,
    values: ['300', '400', '500', '600', '700', '800', '900'],
  }),
  new CssUnitClassBranch({
    className: 'border-radius',
    property: 'border-radius',
    eachValueLimit: 10,
    each5ValuesLimit: 100,
    px: true,
  }),
  new CssUnitClassBranch({ className: 'border-width', property: 'border-width', eachValueLimit: 10, px: true }),
  new CssUnitClassBranch({ className: 'lh', property: 'line-height', eachValueLimit: 100, px: true }),
  new CssSimpleClassBranch({
    classNameCreator: (mdf) => `z-index-${mdf}`,
    property: 'z-index',
    media: true,
    values: ['-1', '0', '1', '2', '3'],
  }),
  new CssSimpleClassBranch({
    classNameCreator: mdf => `order-${mdf}`,
    property: 'order',
    media: true,
    values: ['-1', '0', '1', '2', '3'],
  }),
  new CssSimpleClassBranch({
    property: 'display',
    classNameCreator: (mdf) => `d-${mdf}`,
    values: ['none', 'flex', 'inline-flex', 'block', 'inline', 'inline-block'],
  }),
  new CssSimpleClassBranch({
    property: 'flex-direction',
    classNameCreator: (mdf) => `flex-${mdf}`,
    values: ['row', 'column', 'row-reverse', 'column-reverse'],
  }),
  new CssSimpleClassBranch({
    property: 'align-items',
    classNameCreator: (mdf) => `align-${mdf}`,
    values: ['center', 'flex-start', 'flex-end'],
  }),
  new CssSimpleClassBranch({
    property: 'justify-content',
    classNameCreator: (mdf) => `justify-${mdf}`,
    values: ['center', 'space-between', 'space-around', 'flex-end', 'flex-start'],
  }),
  new CssSimpleClassBranch({
    property: 'position',
    values: ['fixed', 'relative', 'absolute', 'static'],
  }),
  new CssSimpleClassBranch({
    property: 'overflow',
    classNameCreator: (mdf) => `overflow-${mdf}`,
    values: ['hidden', 'auto'],
  }),
  new CssSimpleClassBranch({
    property: 'visibility',
    classNameCreator: (mdf) => `visibility-${mdf}`,
    values: ['visible', 'hidden'],
  }),
  new CssSimpleClassBranch({
    property: 'border-style',
    values: ['solid', 'dashed'],
  }),
  new CssSimpleClassBranch({
    property: 'text-align',
    classNameCreator: (mdf) => `text-${mdf}`,
    values: ['center', 'left', 'right'],
  }),

  new CssSimpleClassBranch({
    className: 'bg-cover',
    fast: 'background-size: cover',
  }),
  new CssSimpleClassBranch({
    className: 'bg-no-repeat',
    fast: 'background-repeat: no-repeat',
  }),
  new CssSimpleClassBranch({
    className: 'bg-center',
    fast: 'background-position: center',
  }),
  new CssSimpleClassBranch({
    property: 'flex-grow',
    classNameCreator: (mdf) => `grow-${mdf}`,
    values: ['1', '2', '3'],
  }),
  new CssSimpleClassBranch({
    property: 'white-space',
    classNameCreator: (mdf) => `white-space-${mdf}`,
    values: ['pre-wrap', 'text-wrap', 'text-no-wrap'],
  }),
  new CssSimpleClassBranch({ className: 'flex-wrap', fast: 'flex-wrap: wrap', media: true }),
  new CssSimpleClassBranch({
    className: 'flex-center',
    fast: 'display: flex; justify-content: center; align-items: center',
  }),
  new CssSimpleClassBranch({ className: 'pointer', fast: 'cursor: pointer' }),
  new CssSimpleClassBranch({ className: 'transform-left-top-center', fast: 'transform: translate(-50%, -50%)' }), // both edges
  new CssSimpleClassBranch({ className: 'transform-right-top-center', fast: 'transform: translate(50%, -50%)' }), // useful transform values
  new CssSimpleClassBranch({ className: 'transform-left-bottom-center', fast: 'transform: translate(-50%, 50%)' }),
  new CssSimpleClassBranch({ className: 'transform-right-bottom-center', fast: 'transform: translate(50%, 50%)' }),
  new CssSimpleClassBranch({ className: 'transform-right-center', fast: 'transform: translateX(50%)' }), // edges center
  new CssSimpleClassBranch({ className: 'transform-left-center', fast: 'transform: translateX(-50%)' }),
  new CssSimpleClassBranch({ className: 'transform-top-center', fast: 'transform: translateY(-50%)' }),
  new CssSimpleClassBranch({ className: 'transform-bottom-center', fast: 'transform: translateY(50%)' }),
  new CssSimpleClassBranch({ className: 'scale-75-p', fast: 'transform: scale(0.75)', media: true }),
  new CssSimpleClassBranch({ className: 'rotate-180-deg', fast: 'transform: rotate(180deg)', media: true }),
  new CssSimpleClassBranch({ className: 'rotate-90-deg', fast: 'transform: rotate(90deg)', media: true }),
  new CssSimpleClassBranch({
    property: `text-transform`,
    values: ['capitalize', 'uppercase'],
  }),
  new CssSimpleClassBranch({
    property: 'text-decoration',
    values: ['none', 'underline', 'linethrough'],
  }),
  new CssSimpleClassBranch({
    property: 'box-sizing',
    values: ['border-box', 'content-box'],
  }),
];

export default classNames;
