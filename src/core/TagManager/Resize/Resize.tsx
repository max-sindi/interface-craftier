import React from 'react';
import { Resizable, ResizableProps } from 'react-resizable';
import 'react-resizable/css/styles.css';
import clsx from 'classnames';
import UnitSelector from 'src/core/TagManager/Resize/UnitSelector';
import { ClassNameChange , ClassNameInterface , findNewClassName } from 'src/utils';

type Props = ClassNameChange & {
  heightClassNameInterface: ClassNameInterface;
  widthClassNameInterface: ClassNameInterface;
};
const Resize = ({
  widthClassNameInterface,
  heightClassNameInterface,
  classNameRecord,
  changeClassName,
}: Props) => {

  const onResize: ResizableProps['onResize'] = (event: any, { size }) => {
    const widthDelta = size.width - widthClassNameInterface.integer;
    const heightDelta = size.height - heightClassNameInterface.integer;

    if (heightDelta !== 0) {
      findNewClassName(
        classNameRecord,
        heightClassNameInterface,
        changeClassName,
        heightDelta,
      );
    }
    if (widthDelta !== 0) {
      findNewClassName(classNameRecord, widthClassNameInterface, changeClassName, widthDelta);
    }
  };

  return (
    <>
      <Resizable
        width={widthClassNameInterface.integer}
        height={heightClassNameInterface.integer}
        onResize={onResize}
        className={clsx('resizeBox')}
        resizeHandles={['w', 'e', 'n', 's']}
        minConstraints={[-Infinity, -Infinity]}
        maxConstraints={[Infinity, Infinity]}
      >
        <div className={'d-flex'}>
          <div className="d-flex">
            {widthClassNameInterface.integer}{' '}
            <UnitSelector
              classNameInterface={widthClassNameInterface}
              classNameRecord={classNameRecord}
              changeClassName={changeClassName}
            />
          </div>
          X
          <div className="d-flex">
            {heightClassNameInterface.integer}{' '}
            <UnitSelector
              classNameInterface={heightClassNameInterface}
              classNameRecord={classNameRecord}
              changeClassName={changeClassName}
            />
          </div>
        </div>
      </Resizable>
    </>
  );
};

export default Resize;
