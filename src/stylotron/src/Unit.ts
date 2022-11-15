import CssUnitClassBranch from "./CssUnitClassBranch"
import CssClass from "./CssClass"

type Range = { step: number, limit: number }
export type UnitName = 'px' | '%' | 'vh'

export default class Unit {
    unit: UnitName
    // limit: number
    ranges: Range[]
    minus: boolean
    classBranch: CssUnitClassBranch
    prefix?: string
    classNames: CssClass[]
    // step: number
    // name: string

    constructor({
        unit = 'px' as UnitName,
        prefix = "",
      ranges = [] as Range[],
        // limit = 1000,
        // step = 1,
        minus = false,
      // name = ''
    }, classBranch: CssUnitClassBranch) {
        this.unit = unit
        this.prefix = prefix
        this.ranges = ranges
        // this.step = step
        this.minus = minus
        // this.name = name
        this.classBranch = classBranch
        this.classNames = []
    }

    createClassName(integer: number, minus = false) {
        const prefixes = [
            this.prefix,
            minus && 'minus'
        ].filter(Boolean)

        const prefix = !prefixes.length ? '' : '-' + prefixes.join('-')
        const name = `${this.classBranch.className}-${integer}${prefix}`
        const value = this.classBranch.createValue(String(
         `${integer * (minus ? -1 : 1)}` // - or +
            +
            `${integer === 0 ? '' : this.unit}` // omit redundant unit for 0 value
        ))
        return new CssClass({ name, value, integer })
    }

    populateClasses() {
        this.ranges.forEach(( { limit, step }) => {
            // create negative values
            if(this.minus) {
                for (let value = limit; value >= 0; value -= step) {
                    const negativeClassName = this.createClassName(value, true)
                    this.classBranch.classes.push(negativeClassName)
                    this.classNames.push(negativeClassName)
                }
            }
            // create positive values
            for (let value = 0; value <= limit; value += step) {
                const positiveClassName = this.createClassName(value)
                const alreadyExist = this.classBranch.classes.find(({ name }) => name === positiveClassName.name)
                if(!alreadyExist) {
                    this.classBranch.classes.push(positiveClassName)
                    this.classNames.push(positiveClassName)
                }
            }
        })
    }
}