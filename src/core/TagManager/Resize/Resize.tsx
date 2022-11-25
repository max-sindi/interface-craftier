import React from 'react';
import { Resizable, ResizableProps } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { ClassNameRecord } from 'src/core/Node';
import styles from 'src/stylotron/src/styles.json';
import clsx from 'classnames';
import UnitSelector from 'src/core/TagManager/Resize/UnitSelector';
import { ClassNameChange , ClassNameInterface } from 'src/utils';

type Props = ClassNameChange & {
  heightClassNameInterface: ClassNameInterface;
  widthClassNameInterface: ClassNameInterface;
};

export const findNewClassName = (
  className: ClassNameRecord,
  classNameInterface: ClassNameInterface,
  changeClassName: ClassNameChange['changeClassName'],
  delta: number,
) => {
  const { classNameRoot, defaultClassName, unit } = classNameInterface
  const classBranch = styles.classBranches.find((branch) => branch.name === classNameRoot);
  if (classBranch) {
    const units = classBranch.units && classBranch.units[unit];
    if (units) {
      const prevClassNameIndex = units.findIndex(({ name }) => name === (className[classNameRoot] || defaultClassName));
      const nextClassName = units[prevClassNameIndex + delta];
      if (nextClassName) {
        changeClassName({ ...className, [classNameRoot]: nextClassName.name });
      }
    }
  }
};

const Resize = ({
  widthClassNameInterface,
  heightClassNameInterface,
  classNameRecord,
  changeClassName,
}: Props) => {

  const onResize: ResizableProps['onResize'] = (event: any, { size, handle }) => {
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
        <div className={'flex'}>
          <div className="flex">
            {widthClassNameInterface.integer}{' '}
            <UnitSelector
              classNameInterface={widthClassNameInterface}
              classNameRecord={classNameRecord}
              changeClassName={changeClassName}
            />
          </div>
          X
          <div className="flex">
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
