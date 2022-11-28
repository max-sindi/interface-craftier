import React from 'react';
import { BsFillPenFill } from 'react-icons/bs';
import { IoMdSquareOutline } from 'react-icons/io';
import { capitalize } from 'lodash';
import { ExtendedNode } from 'src/core/ExtendedNode';
import { useTagApi } from 'src/core/TagManager/useTagApi';

interface ITagLabelProps {
  node: ExtendedNode,
  nodeApi: ReturnType<typeof useTagApi>,
  onClick: () => void
}

const TagLabel = ( { node, nodeApi, onClick } : ITagLabelProps ) => {
  return (
    <div
      className={'flex align-center pointer ml-5 mb-5'}
      onClick={onClick}
      onMouseEnter={(event: any) => {
        event.stopPropagation();
        nodeApi.updateHoveredNode(node);
      }}
      onMouseLeave={nodeApi.onMouseEnter}
    >
      {node.isText ? <BsFillPenFill /> : <IoMdSquareOutline />}
      {node.isText ? node.text?.slice(0, 6) + '...' : `${node.tag} (${capitalize(node.name.slice(0, 50))})`}
    </div>
  );
};

export default TagLabel;