import React, { useContext } from 'react';
import { BsFillPenFill } from 'react-icons/bs';
import { IoMdSquareOutline } from 'react-icons/io';
import { capitalize } from 'lodash';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';

interface ITagLabelProps {}

const TagLabel = (props: ITagLabelProps) => {
  const {
    nodeApi: { nodeState, inspectThisNode, highlightThisNode, highlightInspectedNodeAction },
  } = useContext(EachTagManagerProviderContext);

  return (
    <div
      className={'w-100-p h-100-p flex align-center pointer ml-5 pl-15'}
      onClick={inspectThisNode}
      onMouseEnter={highlightThisNode}
      onMouseLeave={highlightInspectedNodeAction}
    >
      {nodeState.isText ? <BsFillPenFill /> : <IoMdSquareOutline className={'mr-5'} />}
      {nodeState.isText
        ? nodeState.text?.slice(0, 6) + '...' // Tag text
        : `${nodeState.tag} (${capitalize(nodeState.name.slice(0, 50))})` // Text tag
      }
    </div>
  );
};

export default TagLabel;
