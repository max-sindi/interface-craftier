import React from 'react';
import cc from 'classnames'

const IconButton = ({ children, centering }: { children: JSX.Element, centering?: boolean }) => {
  return (
    <div className={cc([centering && 'flex flex-center'])}>
      {children}
    </div>
  );
};

export default IconButton;