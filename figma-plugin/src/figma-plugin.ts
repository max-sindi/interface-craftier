// This file holds the main code for the plugin. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).

// import { compileFigmaProject } from 'server/compileFigmaProject';

const logObjectFields = async (root: DocumentNode) => {
  const recurser = (children: ReadonlyArray<SceneNode | PageNode>) => {
    const arr = [];

    for (let i = 0; i < children.length; i++) {
      const result = {} as Partial<SceneNode> & Record<string, any>;
      const node = children[i];

      console.log(node.type);

      if ('visible' in node && !node.visible) {
        if (!node.visible) continue;
      }

      for (let key in node) {
        if (key !== 'fillGeometry' && key !== 'vectorNetwork') {
          result[key] = (node as Record<string, any>)[key];
        }

        if (key === 'children' && 'children' in node) {
          result['children' as string] = recurser(node.children);
        }

        // if(key === 'fills' && 'fills' in node && Array.isArray(node.fills)) {
        //   node.fills.forEach((fill) => {
        //     if(fill.imageHash) {
        //       const image = figma.getImageByHash(fill.imageHash);
        //       console.log(image);
        //       debugger
        //     }
        //   })
        // }
      }

      arr.push(result);
    }

    return arr;
  };

  const data = { ...root, children: recurser(root.children) };
  // const dataToService = root;
  // const dataToService = recurser(root.children);

  await fetch('http://localhost:8000/api/wace/readFigma', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  // compileFigmaProject()

  figma.closePlugin();
};

// Runs this code if the plugin is run in Figma
if (figma.editorType === 'figma') {
  logObjectFields(figma.root);
  // This plugin creates 5 rectangles on the screen.
  // const numberOfRectangles = 2;
  //
  // const nodes: SceneNode[] = [];
  // for (let i = 0; i < numberOfRectangles; i++) {
  //   const rect = figma.createRectangle();
  //   rect.x = i * 150;
  //   rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
  //   figma.currentPage.appendChild(rect);
  //   nodes.push(rect);
  // }
  // figma.currentPage.selection = nodes;
  // console.log(figma.currentPage)
  // figma.viewport.scrollAndZoomIntoView(nodes);

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.

  // If the plugins isn't run in Figma, run this code
} else {
  debugger;
  // // This plugin creates 5 shapes and 5 connectors on the screen.
  // const numberOfShapes = 1;
  //
  // const nodes: SceneNode[] = [];
  // for (let i = 0; i < numberOfShapes; i++) {
  //   const shape = figma.createShapeWithText();
  //   // You can set shapeType to one of: 'SQUARE' | 'ELLIPSE' | 'ROUNDED_RECTANGLE' | 'DIAMOND' | 'TRIANGLE_UP' | 'TRIANGLE_DOWN' | 'PARALLELOGRAM_RIGHT' | 'PARALLELOGRAM_LEFT'
  //   shape.shapeType = "ROUNDED_RECTANGLE";
  //   shape.x = i * (shape.width + 200);
  //   shape.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
  //   figma.currentPage.appendChild(shape);
  //   nodes.push(shape);
  // }
  //
  // for (let i = 0; i < numberOfShapes - 1; i++) {
  //   const connector = figma.createConnector();
  //   connector.strokeWeight = 8;
  //
  //   connector.connectorStart = {
  //     endpointNodeId: nodes[i].id,
  //     magnet: "AUTO",
  //   };
  //
  //   connector.connectorEnd = {
  //     endpointNodeId: nodes[i + 1].id,
  //     magnet: "AUTO",
  //   };
  // }
  //
  // figma.currentPage.selection = nodes;
  // figma.viewport.scrollAndZoomIntoView(nodes);

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();
}
