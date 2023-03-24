import { serverUrl } from 'src/utils';

const fileValueCreator = (fileName: string) => `url("${serverUrl}/${fileName}")`

export const stylesExisting = [
  {
    name: 'backgroundImage',
    withFile: true,
    fileValueCreator 
  },
  {
    name: 'backgroundColor',
    withVariable: true
  },
  {
    name: 'borderColor',
    withVariable: true
  },
  {
    name: 'color',
    withVariable: true
  },
  {
    name: 'lineHeight',
    withVariable: true
  },
  {
    name: 'fontFamily'
  },
  {
    name: 'boxShadow'
  },
  {
    name: 'fontSize'
  },
]

export const attrsExisting = [
  {
    name: 'src',
    withFile: true,
    fileValueCreator
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
]

export const tags = ['div', 'span', 'input', 'img', 'a', 'button', 'h1', 'h2', 'h3', 'h4', 'h5', 'br']
export const tagsWithNoChildren = ['input', 'img', 'br']
