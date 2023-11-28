import { GlobalState } from 'src/core/store/modules/template/reducer';
import { collectNodeChildrenRecursively } from '../core/store/modules/template/selector';
import { createComponentFiles, variablesFileName } from './createComponentFiles';
import { destructTree, lastArrayItem } from '../utils';
import prettier from 'prettier';

export const compileStateToProduction = (
  state: GlobalState,
  formatter?: typeof prettier.format
): Record<string, string> => {
  const result: Record<string, string> = {};
  const extendedTemplate = destructTree(state).currentState.template;

  // Create variables.scss file
  result[variablesFileName] = Object.entries(state.variables).map(([key, value]) => `$${key}: ${value}`).join(`;
`);

  collectNodeChildrenRecursively(extendedTemplate, true).forEach((node) => {
    if (node.reactComponent && node.name) {
      // create each react component file
      const bunchOfFiles = createComponentFiles(state, node);

      for (let key in bunchOfFiles) {
        if (result[key] === undefined) {
          result[key] = formatter
            ? formatter(bunchOfFiles[key], {
                parser: lastArrayItem(key.split('.')) === 'scss' ? 'scss' : 'typescript',
                ...{
                  printWidth: 80,
                  trailingComma: 'all',
                  tabWidth: 2,
                  semi: false,
                  jsxBracketSameLine: false,
                  arrowParens: 'always',
                },
              })
            : bunchOfFiles[key];
        } else {
          console.error('File already exists');
          // throw new Error('File already exists, ');
        }
      }
    }
  });

  return result;
};
