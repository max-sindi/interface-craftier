import React from 'react';
import { Resizable, ResizableBoxState, ResizableProps } from 'react-resizable';
import 'react-resizable/css/styles.css';
import styles from '../../stylotron/src/styles.json';
import { ClassNameRecord } from '../Fragment';
import { UnitName } from '../../stylotron/src/Unit';

type Size = ResizableBoxState;
export type ClassNameChange = {
  changeClassName: (newClassNameList: ClassNameRecord) => void;
  className: ClassNameRecord;
};
type Props = {
  widthClassNameCreator: (value: string | number) => string;
  heightClassNameCreator: (value: string | number) => string;
  widthClassNameRoot: string;
  heightClassNameRoot: string;
  unit: UnitName
  // changeClassName: (classNameRoot: string, className: string) => void
};

const Resize = ({
  width = 0,
  height = 0,
  widthClassNameCreator,
  heightClassNameCreator,
  widthClassNameRoot,
  heightClassNameRoot,
  className,
  changeClassName,
  unit = 'px'
}: // changeClassName,
Partial<Size> & ClassNameChange & Props) => {
  const [dimensions, setDimensions] = React.useState({ width, height });
  // console.log( { dimensions });

  // const changeClassName = (root: string, name: string) => {
  //   changeClassNamesList(classNameList.split(' ').filter(cls => cls.split('-')[0] !== root).join(' ').concat(name))
  // }

  const onResize: ResizableProps['onResize'] = (event: any, { size }) => {
    const widthDelta = (size.width - dimensions.width)
    const heightDelta = size.height - dimensions.height
    const newWidth = dimensions.width + widthDelta;
    const newHeight = dimensions.height + heightDelta;

    const findNewClassName = (
      classNameRoot: Props['widthClassNameRoot'] | Props['heightClassNameRoot'],
      classNameCreator: Props['widthClassNameCreator'] | Props['heightClassNameCreator'],
      // prevValue: number,
      delta: number
    ) => {
      const classBranch = styles.classBranches.find((branch) => branch.name === classNameRoot);
      if (classBranch) {
        const units = classBranch.units[unit]
        if(units) {
          const prevClassNameIndex = units.findIndex(({ name }) => name === className[classNameRoot])
          const nextClassName = units[prevClassNameIndex + delta]
          if (nextClassName) {
            changeClassName({ ...className, [classNameRoot]: nextClassName.name });
          }
        }
      }
    };

    if (heightDelta !== 0) { {
      findNewClassName(heightClassNameRoot, heightClassNameCreator, heightDelta)
    }
    if(widthDelta !== 0) {
      findNewClassName(widthClassNameRoot, widthClassNameCreator, widthDelta)
    }
      // const classBranch = styles.classBranches.find((branch) => branch.name === heightClassNameRoot);
      // if (classBranch) {
      //   const newClassName = classBranch.classNames.find(({ name }) => heightClassNameCreator(newHeight) === name);
      //   if (newClassName) {
      //     changeClassName({ ...className, [heightClassNameRoot]: newClassName.name });
      //   }
      // }
    }

    // if (newWidth !== dimensions.width) {
    //   const classBranch = styles.classBranches.find((branch) => branch.name === widthClassNameRoot);
    //   if (classBranch) {
    //     const newClassName = classBranch.classNames.find(({ name }) => widthClassNameCreator(newWidth) === name);
    //     if (newClassName) {
    //       changeClassName({ ...className, [widthClassNameRoot]: newClassName.name });
    //     }
    //   }
    // }
    setDimensions({ width: newWidth, height: newHeight });
  };

  return (
    <div className="layoutRoot">
      <Resizable
        {...dimensions}
        onResize={onResize}
        className={'box'}
        resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
        minConstraints={[0, 0]}
        maxConstraints={[Infinity, Infinity]}
      >
        <div>Size</div>
      </Resizable>
    </div>
  );
};

export default Resize;
