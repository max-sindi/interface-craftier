import CssUnitClassBranch from './CssUnitClassBranch';
import CssClass from './CssClass';

export type Range = { step: number; limit: number };
export type UnitName = 'px' | '%' | 'vh';

export default class Unit {
  unit: UnitName;
  ranges: Range[];
  minus: boolean;
  classBranch: CssUnitClassBranch;
  prefix?: string;
  classNames: CssClass[];
  decoratorAfter: boolean;
  decoratorBefore: boolean;

  constructor(
    {
      unit = 'px' as UnitName,
      prefix = '',
      ranges = [] as Range[],
      minus = false,
      decoratorAfter = true,
      decoratorBefore = true,
    },
    classBranch: CssUnitClassBranch
  ) {
    this.unit = unit;
    this.prefix = prefix;
    this.ranges = ranges;
    this.minus = minus;
    this.decoratorAfter = decoratorAfter;
    this.decoratorBefore = decoratorBefore;
    this.classBranch = classBranch;
    this.classNames = [];
  }

  createClassName(integer: number, minus = false) {
    const prefixes = [this.prefix, minus && 'minus'].filter(Boolean);
    const prefix = !prefixes.length ? '' : '-' + prefixes.join('-');
    const name = `${this.classBranch.className}-${integer}${prefix}`;
    const value = this.classBranch.createValue(
      String(
        `${integer * (minus ? -1 : 1)}` + // - or +
          `${integer === 0 ? '' : this.unit}` // omit redundant unit for 0 value
      )
    );
    return new CssClass({
      name,
      value,
      integer,
      decoratorAfter: this.decoratorAfter,
      decoratorBefore: this.decoratorBefore,
    });
  }

  populateClasses() {
    // firstly fill negative values
    if (this.minus) {
      this.ranges
        .sort((range1, range2) => range2.limit - range1.limit)
        .forEach((range, index, arr) => {
          const nextRange = arr[index + 1];
          for (let value = range.limit; value >= (nextRange ? nextRange.limit : 0); value -= range.step) {
            const negativeClassName = this.createClassName(value, true);
            this.classBranch.classes.push(negativeClassName);
            this.classNames.push(negativeClassName);
          }
        });
    }
    // then fill positive values
    this.ranges
      .sort((range1, range2) => range1.limit - range2.limit)
      .forEach((range, index, arr) => {
        const prevRange = arr[index - 1];
        for (let value = prevRange ? prevRange.limit : 0; value <= range.limit; value += range.step) {
          const positiveClassName = this.createClassName(value);
          this.classBranch.classes.push(positiveClassName);
          this.classNames.push(positiveClassName);
        }
      });
  }
}
