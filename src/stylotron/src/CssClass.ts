export default class CssClass {
    private readonly name: string
    private readonly value: string

    constructor({ name = '!noName!', value = '!noValue!' }) {
        this.name = name;
        this.value = value;
    }

    createCssRule() {
        return `.${this.name} {${this.value}}`
    }
}