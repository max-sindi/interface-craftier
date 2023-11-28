import { GlobalState , initialGlobalState } from 'src/core/store/modules/template/reducer';
import { TagNode } from '../src/core/TagNode';
import { capitalize } from 'lodash';
import fs from 'fs';
import { compileStateToProduction } from '../src/utils/compileStateToProduction';
import prettier from 'prettier';
import { GlobalState } from 'src/core/store/modules/template/reducer';
import { ExtendedNode } from '../src/core/ExtendedNode';

const template: TagNode = new TagNode({ reactComponent: true, name: 'Root' });

export const compileFigmaProject = (name: string = 'Tourism') => {
  const figmaProject = require(`../figma-${name}.json`) as DocumentNode;
  const components: Record<string, SceneNode> = {};
  const allNodesMap: Record<string, SceneNode> = {};
  let rootWidth = 0,
    rootHeight = 0;

  const recurser = (children: ReadonlyArray<SceneNode>, parentTagNode: TagNode, parentFigmaNode: SceneNode) => {
    for (let i = 0; i < children.length; i++) {
      const figmaNode = children[i];
      allNodesMap[figmaNode.id] = figmaNode;

      const { width, height, type, name } = figmaNode;

      const setRootSizes = () => {
        if (!rootHeight && !rootWidth && width && height) {
          rootWidth = width;
          rootHeight = height;
          console.log(name);
          console.log(rootWidth);
          console.log(rootHeight);
        }
      };

      const needCreateNode = true;
      let tagNode: undefined | TagNode;
      const isVectorGroup = type === 'GROUP' && figmaNode.children.every((n) => n.type === 'VECTOR');

      if (needCreateNode) {
        const tagNodeParams: Partial<TagNode> & Pick<TagNode, 'children'> = {
          name: name
            .split('')
            .filter((l) => l.toLowerCase() >= 'a' && l.toLowerCase() <= 'z')
            .join(''),
          children: [],
        };

        if (type === 'TEXT') {
          tagNodeParams.children.push(new TagNode({ isText: true, text: figmaNode.characters }));
        }

        if (isVectorGroup) {
          const { width: parentWidth, height: parentHeight } = parentFigmaNode
          const vector = figma.createVector()
          vector.vectorPaths = figmaNode.children.map(ch => (ch as any).strokes[0]);

          (async () => {
            const svg = await vector.exportAsync({ format: 'SVG' })
            console.log(svg);
          })()

          tagNodeParams.children.push(
            new TagNode({
              tag: 'svg',
              attrs: {
                attrs: {
                  width: String(parentWidth),
                  height: String(parentHeight),
                  'view-box': `0 0 ${parentWidth} ${parentHeight}`,
                  fill: 'none',
                  xmlns: 'http://www.w3.org/2000/svg',
                },
              },
              children: figmaNode.children.map((n) => {
                const strokes = (n as any).strokeGeometry as VectorPaths;
                return new TagNode({
                  tag: 'path',
                  attrs: { attrs: { d: strokes[0].data, stroke: '#000', 'stroke-width': (n as any).strokeWeight }, x: n.x, y: n.y },
                });
              }),
            })
          );
        }

        tagNode = new TagNode(tagNodeParams);
        parentTagNode.addChild(tagNode);
      }

      console.log(figmaNode.type);

      const setComponentToRegister = () => {
        if (name.length > 1 && name[0] === '.') {
          const formattedName = capitalize(name.slice(1));
          if (!components[formattedName]) {
            // components[formattedName] = new TagNode({ name: formattedName });
            components[formattedName] = figmaNode;
          }
        }
      };

      setRootSizes();
      setComponentToRegister();

      if (name === '.Navtop') {
      }

      for (let key in figmaNode) {
        if (key === 'children' && 'children' in figmaNode && !isVectorGroup) {
          recurser(figmaNode.children, tagNode || parentTagNode, figmaNode);
        }
      }
    }
  };

  recurser(figmaProject.children[0].children, template, figmaProject.children[0] as never as SceneNode);
  console.log(components);
  console.log(template);

  const pages = compileStateToProduction(
    { files: [], template: template as ExtendedNode, variables: {} } as GlobalState,
    prettier.format
  );
  console.log(pages);

  const dirPath = 'src/project';

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  for (let key in pages) {
    fs.writeFileSync(`${dirPath}/${key}`, pages[key]);
  }
};

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
