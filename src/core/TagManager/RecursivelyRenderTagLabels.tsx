import React  from 'react';
import { ExtendedNode } from 'src/core/ExtendedNode';
import EachTagManagerProvider from 'src/core/TagManager/EachTagManagerProvider';
import ChildTagNode from 'src/core/TagManager/ChildTagNode';

interface IRecursivelyRenderTagLabelsProps {
  children: ExtendedNode['children'];
}

const RecursivelyRenderTagLabels = ({ children }: IRecursivelyRenderTagLabelsProps) => {
  return (
    <>
      {children.map((node, index) => (
        <EachTagManagerProvider nodeId={node.id} key={node.id}>
          <ChildTagNode />
        </EachTagManagerProvider>
      ))}
    </>
  );
};

export default RecursivelyRenderTagLabels;

// backgroundColor: `rgba(${getColorForString(String(child.deepIndex), { brightness: 50 }).join(
//   ','
// )}, 0.2)`,
