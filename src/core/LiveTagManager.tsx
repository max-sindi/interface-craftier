import React, { useContext, useRef } from 'react';
import Resizers from 'src/core/TagManager/Resize/Resizers';
import { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import { FaRegWindowClose } from 'react-icons/fa';
import Tooltip from 'rc-tooltip';
import { capitalize } from 'lodash';
// import clsx from 'classnames';

interface ILiveTagManagerProps {
  domInterface: HTMLDivElement;
}

const LiveTagManager = ({ domInterface }: ILiveTagManagerProps) => {
  const {
    nodeApi: { nodeState },
  } = useContext(EachTagManagerProviderContext);

  return (
    <div>
      <div className={'fz-17 fw-500 mb-3'}>
        {capitalize(nodeState.name)}
      </div>
      <div className={'d-flex'}>
        <div>width: </div>
        <div>{domInterface.clientWidth}</div>
      </div>
      <div className={'d-flex'}>
        <div>height: </div>
        <div>{domInterface.clientHeight}</div>
      </div>
    </div>
  );
};

export default LiveTagManager;
