import { GlobalState } from 'src/core/store/modules/template/reducer';
import { collectNodeChildrenRecursively } from '../core/store/modules/template/selector';
import { createComponentFiles, variablesFileName } from './createComponentFiles';
import { destructTree } from '../utils';
import prettier from 'prettier'

export const compileStateToProduction = (state: GlobalState): Record<string, string> => {
  const result: Record<string, string> = {};
  const extendedTemplate = destructTree(state).currentState.template;

  // Create _variables.scss file
  result[variablesFileName] = Object.entries(state.variables).map(([key, value]) => `$${key}: ${value}`).join(`;
`);

  [extendedTemplate, ...collectNodeChildrenRecursively(extendedTemplate)].forEach((node) => {
    if (node.reactComponent && node.name) {
      // create each react component file
      const bunchOfFiles = createComponentFiles(state, node);
      for (let key in bunchOfFiles) {
        if (result[key] === undefined) {
          result[key] = bunchOfFiles[key] as string;
        } else {
          console.error('File already exists');
          throw new Error('File already exists, ');
        }
      }
    }
  });

  return result;
};
