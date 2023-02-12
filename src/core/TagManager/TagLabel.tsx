import React, { useContext } from 'react';
import { BsFillPenFill } from 'react-icons/bs';
import { IoMdSquareOutline } from 'react-icons/io';
import { capitalize } from 'lodash';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import { levelDeepPx } from 'src/utils';
import { useSelector } from 'react-redux';
import { inspectedNodeDeepnessSelector } from 'src/core/store/modules/template/selector';

const TagLabel = () => {
  const {
    nodeApi: { nodeState, inspectThisNode, highlightThisNode, highlightInspectedNodeAction, deepness },
  } = useContext(EachTagManagerProviderContext);
  const inspectedNodeDeepness = useSelector(inspectedNodeDeepnessSelector);
  const remotenessFromInspectedNode = deepness - inspectedNodeDeepness;

  return (
    <div
      data-name={'Tag label '}
      style={{
        paddingLeft: nodeState.deepIndex * levelDeepPx + 10,
        transform: `rotate3d(1, 0, -0, ${0.001 * remotenessFromInspectedNode}turn)`,
      }}
      className={'w-100-p h-100-p d-flex align-center pointer pl-15'}
      onClick={(evt) => {
        evt.stopPropagation()
        inspectThisNode()
      }}
      onMouseEnter={highlightThisNode}
      onMouseLeave={highlightInspectedNodeAction}
    >
      {nodeState.isText ? <BsFillPenFill /> : <IoMdSquareOutline className={'mr-5'} />}
      {
        nodeState.isText
          ? nodeState.text?.slice(0, 216) + (nodeState.text.length < 216 ? '' : '...') // Tag text
          : `${nodeState.tag} (${capitalize(nodeState.name.slice(0, 50))})` // Text tag
      }
    </div>
  );
};

export default TagLabel;
