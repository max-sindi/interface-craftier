import { getFileNamePromPath, serverUrl } from '../../utils';

const fileValueCreatorDev = (fileName: string) => `url("${serverUrl}/${fileName}")`;
const fileValueCreatorProd = (fileName: string) => `url("./files/${getFileNamePromPath(fileName)}")`;

export const stylesExisting: {
  name: string;
  withVariable?: boolean;
  withFile?: boolean;
  fileValueCreatorProd?: (name: string) => string;
  fileValueCreatorDev?: (name: string) => string;
}[] = [
  {
    name: 'backgroundImage',
    withFile: true,
    fileValueCreatorDev,
    fileValueCreatorProd,
  },
  {
    name: 'backgroundColor',
    withVariable: true,
  },
  {
    name: 'borderColor',
    withVariable: true,
  },
  {
    name: 'color',
    withVariable: true,
  },
  {
    name: 'lineHeight',
    withVariable: true,
  },
  {
    name: 'fontFamily',
  },
  {
    name: 'boxShadow',
  },
  {
    name: 'fontSize',
  },
];

export const attrsExisting = [
  {
    name: 'src',
    withFile: true,
    fileValueCreatorDev,
    fileValueCreatorProd,
  },
  {
    name: 'title',
  },
  {
    name: 'href',
  },
  {
    name: 'placeholder',
  },
  {
    name: 'value',
  },
];

export const tags = ['div', 'span', 'input', 'img', 'a', 'button', 'h1', 'h2', 'h3', 'h4', 'h5', 'br'];
export const tagsWithNoChildren = ['input', 'img', 'br'];
