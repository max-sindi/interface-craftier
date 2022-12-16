import React , { useState } from 'react';
import DimensionsResize from 'src/core/TagManager/Resize/DimensionsResize';
import PaddingResize from 'src/core/TagManager/Resize/PaddingResize';
import MarginResize from 'src/core/TagManager/Resize/MarginResize';
import { Uuid } from 'src/core/store/modules/template/reducer';
import PositionsResize from 'src/core/TagManager/Resize/PositionsResize';
import { ClassNameChange } from 'src/utils';
import clsx from 'classnames';

interface IResizersProps extends ClassNameChange {
  nodeId: Uuid;
}

const Resizers = ({ nodeId, ...classNameChange }: IResizersProps) => {
  const [currentModeNumber, setCurrentModeNumber] = useState(0)
  return (
    <div className={' absolute t-0 l-0 b-0 r-0'} title={'Resizers'}>
      <div className='absolute b-100-p l-0' title={'Labels layout'}>
        <div className={'flex align-center'} title={`Labels inner`}>
          <div className={clsx([ 'resizers-label', currentModeNumber === 0 && 'resizers-label-active'])} title={'Label Positioning'} onClick={() => setCurrentModeNumber(0)}>
            Pos
          </div>
          <div className={clsx([ 'resizers-label', currentModeNumber === 1 && 'resizers-label-active'])} title={'Label Margin'} onClick={() => setCurrentModeNumber(1)}>
            Mar
          </div>
          <div className={clsx([ 'resizers-label', currentModeNumber === 2 && 'resizers-label-active'])} title={'Label Padding'} onClick={() => setCurrentModeNumber(2)}>
            Pad
          </div>
          <div className={clsx([ 'resizers-label', currentModeNumber === 3 && 'resizers-label-active'])} title={'Label Dimensions'} onClick={() => setCurrentModeNumber(3)}>
            Size
          </div>
        </div>
      </div>
      {currentModeNumber === 0 && <div className={ 'absolute t-0 r-0 b-0 l-0 positioning-resize' } title={ 'Position' }>
        <PositionsResize { ... classNameChange } key={ nodeId + 'position' } />
      </div> }
      {currentModeNumber === 1 && <div className={`absolute t-${0 * 6} r-${0 * 0.8} b-0 l-${0 * 0.8} margin-resize`} title={'Margin'} >
        <MarginResize {...classNameChange} key={nodeId + 'margin'}/>
      </div>}
      {currentModeNumber === 2 && <div className={`absolute t-${0 * 6} r-${0 * 0.8} b-0 l-${0 * 0.8} padding-resize`} title={'Padding'}>
        <PaddingResize {...classNameChange} key={nodeId + 'padding'} />
      </div>}
      {currentModeNumber === 3 && <div className={`absolute t-${0 * 6} r-${0 * 0.8} b-0 l-${0 * 0.8} dimensions-resize`} title={'Dimensions'}>
        <DimensionsResize {...classNameChange} key={nodeId + 'dimensions'} />
      </div>}
    </div>
  );
};

export default Resizers;
