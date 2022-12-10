import React from 'react';
import cc from 'classnames'

const IconButton = ({ children, centering, ...props }: Record<string, any>) => {
  return (
    <div className={cc([centering && 'flex flex-center', 'pointer pl-5 pr-5'])} {...props}>
      {children}
    </div>
  );
};

export default IconButton;