import React , { useEffect } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { createDeleter, IEachTagManagerProps } from './EachTagManager';

const TagChildMenu = ({ transform, index }: { transform: IEachTagManagerProps['transformParent']; index: number }) => {
  const deleteChild = () => transform(createDeleter(index));

  return (
    <div>
      <RiDeleteBin6Line onClick={deleteChild} />
    </div>
  );
};

export default TagChildMenu;
