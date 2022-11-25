import React from 'react';
import DimensionsResize from 'src/core/TagManager/Resize/DimensionsResize';
import PaddingResize from 'src/core/TagManager/Resize/PaddingResize';
import MarginResize from 'src/core/TagManager/Resize/MarginResize';
import { Uuid } from 'src/core/store/modules/template/reducer';
import PositionsResize from 'src/core/TagManager/Resize/PositionsResize';
import { ClassNameChange } from 'src/utils';

interface IResizersProps extends ClassNameChange {
  nodeId: Uuid;
}

const Resizers = ({ nodeId, ...classNameChange }: IResizersProps) => {
  return (
    <div className={'w-700 h-320 relative mb-10'}>
      <div className={'absolute t-0 r-0 b-0 l-0 position-resize'} title={'Position'}>
        <PositionsResize {...classNameChange} key={nodeId + 'position'} />
      </div>
      <div className={`absolute t-${10 * 6} r-${100 * 0.8} b-25 l-${100 * 0.8} margin-resize`} title={'Margin'} >
        <MarginResize {...classNameChange} key={nodeId + 'margin'}/>
      </div>
      <div className={`absolute t-${20 * 6} r-${200 * 0.8} b-50 l-${200 * 0.8} padding-resize`} title={'Padding'}>
        <PaddingResize {...classNameChange} key={nodeId + 'padding'} />
      </div>
      <div className={`absolute t-${30 * 6} r-${300 * 0.8} b-75 l-${300 * 0.8} dimensions-resize`} title={'Dimensions'}>
        <DimensionsResize {...classNameChange} key={nodeId + 'dimensions'} />
      </div>
    </div>
  );
};

export default Resizers;
