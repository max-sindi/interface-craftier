import React , { useContext } from 'react';
import { BsFillPenFill } from 'react-icons/bs';
import { IoMdSquareOutline } from 'react-icons/io';
import { capitalize } from 'lodash';
import { ExtendedNode } from 'src/core/ExtendedNode';
import { NodeApi , useTagApi } from 'src/core/TagManager/useTagApi';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';

interface ITagLabelProps {
  // node: ExtendedNode,
  // nodeApi: NodeApi,
  // onClick: () => void
  onMouseLeave: (event: any) => void
}

const TagLabel = ( { onMouseLeave } : ITagLabelProps ) => {
  const { nodeApi: { nodeState, inspectThisNode, highlightThisNode } } = useContext(EachTagManagerProviderContext)

  return (
    <div
      className={'flex align-center pointer ml-5 mb-5'}
      onClick={inspectThisNode}
      onMouseEnter={highlightThisNode}
      onMouseLeave={onMouseLeave}
    >
      {nodeState.isText ? <BsFillPenFill /> : <IoMdSquareOutline />}
      {nodeState.isText ? nodeState.text?.slice(0, 6) + '...' : `${nodeState.tag} (${capitalize(nodeState.name.slice(0, 50))})`}
    </div>
  );
};

export default TagLabel;