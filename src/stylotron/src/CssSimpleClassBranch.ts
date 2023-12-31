import CssClass from './CssClass';

export default class CssSimpleClassBranch {
  private readonly fast: string;
  private readonly property: string;
  private readonly classNameCreator: (arg: string) => string;
  public readonly values: string[];
  // private readonly media: []
  public readonly className: string;
  public readonly classes: CssClass[];
  public readonly units: false;

  constructor({
    className = '',
    fast = '',
    property = '',
    values = [] as string[],
    media = false,
    classNameCreator = (str: string) => str,
  }) {
    this.className = className || property;
    this.fast = fast;
    this.property = property;
    this.values = values;
    this.classNameCreator = classNameCreator;
    this.classes = [];
    this.units = false;

    this.populateEnumerates();
    this.populateFast();
  }

  populateEnumerates(): void {
    this.values.length &&
      this.values.forEach((value) =>
        this.classes.push(
          new CssClass({
            name: this.classNameCreator(value),
            value: this.createValue(value),
          })
        )
      );
  }

  populateFast(): void {
    if (this.fast) {
      this.classes.push(
        new CssClass({
          name: this.className,
          value: this.fast,
        })
      );
    }
  }

  createValue(value: string): string {
    return `${this.property}: ${value}`;
  }
}
