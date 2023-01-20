import React , { HTMLAttributes } from "react";
import cc from 'classnames'

interface IIconButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: any, centering?: boolean
}

const IconButton = ({ children, centering, ...props }: IIconButtonProps) => {
  return (
    <div className={cc([centering && 'flex flex-center', 'pointer pl-5 pr-5'])} {...props}>
      {children}
    </div>
  );
};

export default IconButton;