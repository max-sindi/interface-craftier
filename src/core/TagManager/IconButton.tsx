import React , { HTMLAttributes } from "react";
import cc from 'classnames'

interface IIconButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: any, centering?: boolean, className?: string
}

const IconButton = ({ children, centering, className, ...props }: IIconButtonProps) => {
  return (
    <div className={cc([centering && 'd-flex flex-center', 'pointer pl-5 pr-5', className])} {...props}>
      {children}
    </div>
  );
};

export default IconButton;