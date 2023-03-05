import CssUnitClassBranch from './CssUnitClassBranch';
import CssSimpleClassBranch from './CssSimpleClassBranch';
import * as fs from 'fs';
import classBranches from './classNames';
import { UnitName } from './Unit';
import CssClass from './CssClass';

class ClassesStorage {
  private readonly classBranches: (CssUnitClassBranch | CssSimpleClassBranch)[];
  private readonly pathRoot: string;

  constructor(classBranches: (CssUnitClassBranch | CssSimpleClassBranch)[]) {
    this.classBranches = classBranches;
    this.pathRoot = './src/';
  }

  generateCss() {
    const path = this.pathRoot + 'styles.css';
    const content = this.classBranches
      .map((classBranch) =>
        classBranch.classes
          .map((cssClass) =>
            [
              cssClass.createCssRule(),
              cssClass.decoratorBefore && cssClass.createBeforeRule(),
              cssClass.decoratorAfter && cssClass.createAfterRule(),
            ]
              .filter(Boolean)
              .join('\n')
          )
          .join('\n')
      )
      .join('\n');

    fs.writeFileSync(path, content);
  }

  generateJson() {
    const path = this.pathRoot + 'styles.json';
    const content = JSON.stringify({
      classBranches: this.classBranches.map((branch) => {
        if (branch instanceof CssUnitClassBranch) {
          return {
            property: branch.property,
            name: branch.className,
            units: branch.units.reduce(
              (acc, unit) => ({
                ...acc,
                [unit.unit]: unit.classNames,
              }),
              {} as Record<UnitName, CssClass>
            ),
          };
        } else {
          return {
            name: branch.className,
            range: branch.classes.map(({ name }) => name),
            values: branch.values,
            classes: branch.classes,
          };
        }
      }),
    });

    fs.writeFileSync(path, content);
  }
}

const classesStorage = new ClassesStorage(classBranches);
classesStorage.generateCss();
classesStorage.generateJson();

// const mediaConfig = [
//   { name: 'lg', p: '1440', result: '' },
//   { name: 'mlg', p: '1100', result: '' },
//   { name: 'md', p: '768' , result: '' },
//   { name: 'smd', p: '580' , result: '' },
//   { name: 'sm', p: '411' , result: '' },
// ];

// let result = ''
// let mediaResult = {
//   lg: ``,
//   md: ``,
//   sm: ``,
// }
// @ts-ignore
// const styleNames = []

// classNames.forEach(({ className, rule, fast, media = true, each5ValuesLimit = false, eachValuesLimit = false, px = false, minus = false, percent = false, value, after = true, before = true }) => {
//   let cls = className
//
//
//   const populateResultWithStatement = (({ cls, fast, value, minus = false, measure = '' }) => {
//     styleNames.push(cls)
//     result += '\n' +
//         `.${cls}{${fast ? fast : `${rule}: ${minus ? '-' : ''}${value}${measure}`}}`
//     }
//   );
//
//    // @media (max-width: ${media.p}px) {
//   // media fast? need to refactor
//   const populateMediaResultWithStatement = (({ cls, value, media, minus = false, measure = '' }) =>  {
//     styleNames.push(cls)
//     mediaResult[media.name] += '\n' +
//         `.${cls}{${fast ? fast : `${rule}: ${minus ? '-' : ''}${value}${measure}`}}`
//     }
//   );
//
//   if(fast) {
//     populateResultWithStatement({ cls, fast });
//     prefixes({ cls, fast})
//   }
//
//   if(each5ValuesLimit) {
//     for(let i = 0; i < 1200; i++) {
//       if(i % 5 !== 0) continue;
//       populateResultWithStatement({ cls: `${cls}-${i}`, value: i, measure: 'px' });
//       suffixes({ cls: `${cls}-${i}`, value: i, measure: 'px'}, prefixes);
//     }
//   }
//
//   if(eachValuesLimit) {
//     for(let i = 0; i <= eachValuesLimit; i++) {
//       populateResultWithStatement({ cls: `${cls}-${i}`, value: i, measure: px ? 'px' : '' })
//       suffixes({ cls: `${cls}-${i}`, value: i, measure: px ? 'px' : '' }, prefixes);
//     }
//   }
//
//   function suffixes({ cls, value, ...args }, next) {
//
//     runPercent({ cls, value, ...args });
//     runMinus({ cls, value, ...args });
//     next({ cls, value, ...args });
//
//     function runPercent({ cls, value, ...args }) {
//       if(percent) {
//         populateResultWithStatement({ cls: `${cls}-p`, value: value, ...args, measure: '%'})
//         next({ cls: `${cls}-p`,  value, ...args, measure: '%'})
//         runMinus({ cls: `${cls}-p`,  value, ...args, measure: '%'})
//       }
//     }
//
//     function runMinus({ cls, value, ...args}) {
//       if(minus) {
//         populateResultWithStatement({ cls: `${cls}-minus`, value, minus: true, ...args})
//         next({ cls: `${cls}-minus`, value, minus: true, ...args})
//       }
//     }
//   }
//
//   function prefixes({ cls, value, ...args }) {
//     decorators({ cls, value, ...args })
//     media({ cls, value, ...args });
//
//     function decorators({ cls, value, ...args }) {
//       // if no one decor
//       if(!(after || before)) {
//         return;
//       }
//
//       if(before) {
//         populateResultWithStatement({ cls: `decorator-${cls}:before`, value, ...args })
//         media({ cls: `decorator-${cls}:before`, value, ...args })
//       }
//       if(after) {
//         populateResultWithStatement({ cls: `decorator-alter-${cls}:after`, value, ...args })
//         media({ cls: `decorator-alter-${cls}:after`, value, ...args })
//       }
//     }
//
//     function media({ cls, value, ...args }) {
//       mediaConfig.forEach(br =>
//         populateMediaResultWithStatement({ cls: `${br.name}-${cls}`, value: value, media: br, ...args})
//       )
//     }
//   }
// })

// @ts-ignore
// const media = mediaConfig.map(m => `\n @media (max-width:${m.p}px){${ mediaResult[m.name] as any }}`).join('\n')

// @ts-ignore
// fs.writeFileSync(
//   './_styles.css',
//   (result + media) // persist true order: non-media then media
// );
// @ts-ignore
// fs.writeFileSync('./_styles.json', JSON.stringify({classNames: styleNames}))
// @ts-ignore
// fs.writeFileSync('./classNames.json', JSON.stringify({classNames}))
// console.log(styleNames)

// module.exports.styleNames = styleNames
