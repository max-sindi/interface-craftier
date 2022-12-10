import React , { useContext } from 'react';
import { ExtendedNode } from 'src/core/ExtendedNode';
import Resizers from 'src/core/TagManager/Resize/Resizers';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import { FaRegWindowClose } from 'react-icons/fa';
// import clsx from 'classnames';

interface ILiveTagManagerProps {
}

const LiveTagManager = (props : ILiveTagManagerProps) => {
  const { nodeApi: { nodeState, changeClassNamesList, unselectCurrentNode }} = useContext(EachTagManagerProviderContext)
  const unselect = (evt: any) => {
    evt.stopPropagation()
    unselectCurrentNode()
  }
  return (
    <>
      <Resizers nodeId={nodeState.id} classNameRecord={nodeState.className} changeClassName={changeClassNamesList}/>

      <FaRegWindowClose onClick={unselect} size={20} className={`absolute r-10 b-120-p z-index-5  pointer`} />
    </>
  );
};

export default LiveTagManager;
