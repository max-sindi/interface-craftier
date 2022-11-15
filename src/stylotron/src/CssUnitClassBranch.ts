import CssClass from "./CssClass"
import Unit from "./Unit"
import Media from "./Media"
// import { isFunction } from "lodash"


export default class CssUnitClassBranch extends Media {
    private readonly property: string
    // private readonly media: boolean
    public readonly units: Unit[]
    public readonly className: string
    public readonly classNameCreator: (arg0: string) => string
    public readonly classes: CssClass[]

    constructor({
        className = '',
        property = '',
        each5ValuesLimit = 0,
        px = false,
        vh = 100,
        eachValueLimit =  0,
        percent = 0,
        minus = false,
        // todo move pseudo and media  to separate js class
        after = false,
        before = false,
        media = false,
        classNameCreator = (str: string) => str
    }) {
        super(media)
        this.className = className
        this.property = property
        this.classes = []
        this.classNameCreator = classNameCreator
        // todo units can (and should) be declared explicitly, right in Class instantiating
        this.units = [
            // px && new Unit({ unit: 'px', limit: eachValueLimit, step: 1, minus }, this),
            px && new Unit({ unit: 'px', ranges: [{ limit: eachValueLimit, step: 2 }, { limit : each5ValuesLimit , step : 5 }], minus }, this),
            percent && new Unit({ unit: "%", prefix: "p", ranges: [ { limit : percent , step : 5 }], minus }, this),
            percent && new Unit({ unit: "vh", prefix: "vh", ranges: [ { limit : vh , step : 5 }], minus: false }, this),
        ].filter(Boolean) as Unit[]

        // todo move media to separate class
        // this.media = !media ? [] : [
        //     new Media(400),
        //     new Media(700),
        // ]

        this.populateUnits()
    }


    populateUnits(): void {
        this.units.forEach(unit => {
            unit.populateClasses()
        })
    }

    createValue(value: string): string {
        return `${this.property}: ${this.classNameCreator(value)}`
    }

}