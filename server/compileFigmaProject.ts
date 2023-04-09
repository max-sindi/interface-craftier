const figmaProject = require('../figma-content.json') as DocumentNode;

// console.log(figmaProject);

export const compileFigmaProject = () => {
  const allNodes: SceneNode[] = [];
  let rootWidth = 0, rootHeight = 0;

  const recurser = (children: ReadonlyArray<SceneNode>) => {
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      allNodes.push(node);

      const setRootSizes = () => {
        if(!rootHeight && !rootWidth && node.width && node.height) {
          rootWidth = node.width
          rootHeight = node.height
          console.log(node.name)
          console.log(rootWidth)
          console.log(rootWidth)
        }
      }

      setRootSizes()

      if(node.name === 'Navtop') {

      }

      for (let key in node) {
        if (key === 'children' && 'children' in node) {
          recurser(node.children);
        }
      }

        // if('fills' in node && Array.isArray(node.fills)) {
        //   node.fills.forEach((fill) => {
        // console.log(fill);
        // console.log(figma);
        // if(fill.type === 'IMAGE') {

        // const image = figma.getImageByHash(fill.imageHash);
        // console.log(image);
        // }
        // })
        // }

        // if ( 'type' in node && node.type === 'IMAGE') {
        // Paints reference images by their hash.
        // }
    }
  };

  const template = recurser(figmaProject.children[0].children);


  // console.log(rootWidth);
  // console.log(rootHeight);
  // console.log('_________________----------------->>>>>>>>>>>>>>>');
  // console.log(allNodes[0]);
  // console.log('_________________----------------->>>>>>>>>>>>>>>');
  // console.log(allNodes[1]);
};
