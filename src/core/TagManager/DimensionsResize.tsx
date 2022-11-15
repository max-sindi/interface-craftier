import React from 'react';
import Resize , { ClassNameChange } from './Resize';

const DimensionsResize = (props: ClassNameChange) => {
  return (
    <Resize
      widthClassNameCreator={(value: string | number) => `w-${value}`}
      heightClassNameCreator={(value: string | number) => `h-${value}`}
      widthClassNameRoot={'w'}
      heightClassNameRoot={'h'}
      unit={'px'}
      {...props}
    />
  );
};

export default DimensionsResize;
