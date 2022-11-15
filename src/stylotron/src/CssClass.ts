export default class CssClass {
    public readonly name: string
    public readonly value: string
    public readonly integer: number

    constructor({ name = '!noName!', value = '!noValue!', integer = 0 }) {
        this.name = name;
        this.value = value;
        this.integer = integer;
    }

    createCssRule() {
        return `.${this.name} {${this.value}}`
    }
}