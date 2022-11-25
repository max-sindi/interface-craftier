export default class CssClass {
  public readonly name: string;
  public readonly value: string;
  public readonly integer: number;
  public readonly decoratorAfter: boolean;
  public readonly decoratorBefore: boolean;

  constructor({ name = '!noName!', value = '!noValue!', integer = 0, decoratorAfter = true, decoratorBefore = true }) {
    this.name = name;
    this.value = value;
    this.integer = integer;
    this.decoratorAfter = decoratorAfter;
    this.decoratorBefore = decoratorBefore;
  }

  createCssRule() {
    return `.${this.name} { ${this.value} }`;
  }

  createBeforeRule() {
    return `.decor-before-${this.name}::before { ${this.value} }`;
  }

  createAfterRule() {
    return `.decor-after-${this.name}::after { ${this.value} }`;
  }
}
