import React  from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface ITagChildMenuProps {
  deleteChild: () => void
}

const TagChildMenu = ({ deleteChild } : ITagChildMenuProps ) => {
  return (
    <div>
      <RiDeleteBin6Line onClick={deleteChild} />
    </div>
  );
};

export default TagChildMenu;
