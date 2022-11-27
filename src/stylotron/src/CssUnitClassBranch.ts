import CssClass from './CssClass';
import Unit, { Range } from './Unit';
import Media from './Media';

export default class CssUnitClassBranch extends Media {
  private readonly property: string;
  // private readonly media: boolean
  public readonly units: Unit[];
  public readonly className: string;
  public readonly classNameCreator: (arg0: string) => string;
  public readonly classes: CssClass[];
  public readonly decoratorAfter: boolean;
  public readonly decoratorBefore: boolean;
  // public readonly noUnit?: boolean;

  constructor({
    className = '',
    property = '',
    each5ValuesLimit = 0,
    px = false,
    vh = 100,
    eachValueLimit = 50,
    percent = 0,
    minus = false,
    // todo move pseudo and media  to separate js class
    decoratorAfter = true,
    decoratorBefore = true,
    media = false,
    // noUnit = false,
    classNameCreator = (str: string) => str,
  }) {
    super(media);
    this.className = className;
    this.property = property;
    this.classes = [];
    this.classNameCreator = classNameCreator;
    this.decoratorAfter = decoratorAfter;
    this.decoratorBefore = decoratorBefore;
    // todo units can (and should) be declared explicitly, right in Class instantiating
    this.units = [
      px &&
        new Unit(
          {
            unit: 'px',
            ranges: [
              eachValueLimit && { limit: eachValueLimit, step: 1 },
              each5ValuesLimit && { limit: each5ValuesLimit, step: 5 },
            ].filter(Boolean) as Range[],
            minus,
            decoratorAfter,
            decoratorBefore,
          },
          this
        ),
      percent &&
        new Unit(
          { unit: '%', prefix: 'p', ranges: [{ limit: percent, step: 5 }], minus, decoratorAfter, decoratorBefore },
          this
        ),
      percent &&
        new Unit(
          { unit: 'vh', prefix: 'vh', ranges: [{ limit: vh, step: 5 }], minus: false, decoratorAfter, decoratorBefore },
          this
        ),
    ].filter(Boolean) as Unit[];

    // todo move media to separate class
    // this.media = !media ? [] : [
    //     new Media(400),
    //     new Media(700),
    // ]

    this.populateUnits();
  }

  populateUnits(): void {
    this.units.forEach((unit) => {
      unit.populateClasses();
    });
  }

  createValue(value: string): string {
    return `${this.property}: ${this.classNameCreator(value)}`;
  }
}
