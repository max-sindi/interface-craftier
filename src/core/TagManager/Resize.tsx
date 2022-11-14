import React from 'react';
import { Resizable, ResizableBoxState, ResizableProps } from 'react-resizable';
import 'react-resizable/css/styles.css';
import styles from '../../stylotron/src/styles.json';

type Size = ResizableBoxState;
export type ClassNameChange =  { changeClassNamesList : (newClassNameList: string) => void, classNameList: string }

const Resize = ({
  width = 0,
  height = 0,
  widthClassNameCreator,
  heightClassNameCreator,
  widthClassNameRoot,
  heightClassNameRoot,
  classNameList,
  changeClassNamesList,
                  // changeClassName,
}: Partial<Size> & ClassNameChange & {
  widthClassNameCreator: (value: string | number) => string
  heightClassNameCreator: (value: string | number) => string
  widthClassNameRoot: string
  heightClassNameRoot: string
  // changeClassName: (classNameRoot: string, className: string) => void
}) => {
  const [dimensions, setDimensions] = React.useState({ width, height });
  console.log( { dimensions });

  const changeClassName = (root: string, name: string) => {
    changeClassNamesList(classNameList.split(' ').filter(cls => cls.split('-')[0] !== root).join(' ').concat(name))
  }

  const onResize: ResizableProps['onResize'] = (event: any, { size }) => {
    const newWidth = dimensions.width + (size.width - dimensions.width);
    const newHeight = dimensions.height + (size.height - dimensions.height);
    if (newHeight !== dimensions.height) {
      const classBranch = styles.classBranches.find(branch => branch.name === heightClassNameRoot)
      if(classBranch) {
        const className = classBranch.classNames.find(({ name }) => heightClassNameCreator(newHeight))
        if(className) {
          changeClassName(heightClassNameRoot, className.name)
        }
      }
    }
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
        maxConstraints={[500, 500]}
      >
        <div>Size</div>
      </Resizable>
    </div>
  );
};

export default Resize;
