import React from 'react';
import { Resizable, ResizableProps } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { ClassNameChange , ClassNameInterface , extractNumber , findNewClassName , lastArrayItem } from 'src/utils';
import clsx from 'classnames';
import UnitSelector from 'src/core/TagManager/Resize/UnitSelector';

type Props = ClassNameChange & {
  reverse?: boolean;
  title: string;
  topClassNameInterface: ClassNameInterface;
  bottomClassNameInterface: ClassNameInterface;
  leftClassNameInterface: ClassNameInterface;
  rightClassNameInterface: ClassNameInterface;
};

export const extractClassNameValue = (rawValue: string) => {
  return extractNumber(rawValue) * (lastArrayItem(rawValue.split('-')) === 'minus' ? -1 : 1);
};

const ResizeSpaces = ({
  changeClassName,
  classNameRecord,
  reverse,
  title,
  topClassNameInterface,
  bottomClassNameInterface,
  leftClassNameInterface,
  rightClassNameInterface,
}: Props) => {
  const nodeWidth = rightClassNameInterface.integer + leftClassNameInterface.integer;
  const nodeHeight = topClassNameInterface.integer + bottomClassNameInterface.integer;

  const onResize: ResizableProps['onResize'] = (event: any, { size, handle }) => {
    const widthDelta = (size.width - nodeWidth) * (reverse ? -1 : 1);
    const heightDelta = (size.height - nodeHeight) * (reverse ? -1 : 1);

    if (handle === 'n') {
      findNewClassName(classNameRecord, topClassNameInterface, changeClassName, heightDelta);
    }
    if (handle === 's') {
      findNewClassName(classNameRecord, bottomClassNameInterface, changeClassName, heightDelta);
    }
    if (handle === 'w') {
      findNewClassName(classNameRecord, leftClassNameInterface, changeClassName, widthDelta);
    }
    if (handle === 'e') {
      findNewClassName(classNameRecord, rightClassNameInterface, changeClassName, widthDelta);
    }
  };

  return (
    <>
      {/*<div className={'flex flex-center'}>{title}</div>*/}
      <Resizable
        width={nodeWidth}
        height={nodeHeight}
        onResize={onResize}
        className={clsx('resizeBox', reverse && 'resizeBoxReverse')}
        resizeHandles={['w', 'e', 'n', 's']}
        minConstraints={[-Infinity, -Infinity]}
        maxConstraints={[Infinity, Infinity]}
      >
        <div>
          <div className="absolute l-50-p t-0 transform-left-center flex p-15">
            {topClassNameInterface.integer}{' '}
            <UnitSelector classNameInterface={topClassNameInterface} classNameRecord={classNameRecord} changeClassName={changeClassName} />
          </div>
          <div className="absolute t-50-p r-0 transform-top-center flex p-15">
            {rightClassNameInterface.integer}{' '}
            <UnitSelector classNameInterface={rightClassNameInterface} classNameRecord={classNameRecord} changeClassName={changeClassName} />
          </div>
          <div className="absolute l-50-p b-0 transform-left-center flex p-15">
            {bottomClassNameInterface.integer}{' '}
            <UnitSelector classNameInterface={bottomClassNameInterface} classNameRecord={classNameRecord} changeClassName={changeClassName} />
          </div>
          <div className="absolute t-50-p l-0 transform-top-center flex p-15">
            {leftClassNameInterface.integer}{' '}
            <UnitSelector classNameInterface={leftClassNameInterface} classNameRecord={classNameRecord} changeClassName={changeClassName} />
          </div>
        </div>
      </Resizable>
    </>
  );
};

export default ResizeSpaces;
