

export const stylesExisting = [
  {
    name: 'backgroundImage',
    withFile: true,
    // fileValueCreator: fileName => `url('http://localhost:8000${fileName}')`
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
  }
]

export const attrsExisting = [
  {
    name: 'src',
    withFile: true,
    // fileValueCreator: fileName => `http://localhost:8000${fileName}`
  },
  {
    name: 'title',
  },
  {
    name: 'href',
  },
]

export const tags = ['div', 'span', 'input', 'img', 'a', 'button', 'h1', 'h2', 'h3', 'h4', 'h5', '']
