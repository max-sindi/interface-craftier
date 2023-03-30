import React, { useState } from 'react';
import classes from './Dropdown.module.scss';
// import { ReactComponent as CaretIcon } from 'images/caret.svg';
// import { ReactComponent as CheckmarkIcon } from 'images/checkmark.svg';
import Tooltip from 'rc-tooltip';
import clsx from 'classnames';

export interface IDropdownProps {
  children: string | JSX.Element;
  title?: string | JSX.Element;
  inputWrapperClassName: string;
  options: { onClick: () => void; displayName: string | JSX.Element; id: string; active?: boolean }[];
  keepOpenOnClick?: boolean;
}

const Dropdown = ({ title, options, keepOpenOnClick, children, inputWrapperClassName }: IDropdownProps) => {
  const [active, setActive] = useState(false);
  const triggerActive = () => setActive((prev) => !prev);
  const setInactive = () => setActive(false);

  const onOptionClick = () => {
    if (!keepOpenOnClick) {
      setActive(false);
    }
  };

  return (
    <>
      {!!options.length && active && <div className={classes.outClickHandler} onClick={setInactive} />}
      <Tooltip
        overlayInnerStyle={{ padding: 0 }}
        visible={!!options.length && active}
        zIndex={1300}
        placement={'bottom'}
        overlay={() => (
          <div className={clsx([classes.dropdownContainer, inputWrapperClassName])}>
            {title && <div className={classes.dropdownTitle}>{title}</div>}

            {options.map(({ active, id, displayName, onClick }) => (
              <div
                className={clsx([classes.dropdownItem, active && classes.dropdownItemActive])}
                key={id}
                onClick={() => {
                  onOptionClick();
                  onClick();
                }}
              >
                {/*{active && <CheckmarkIcon className={classes.checkmarkIcon} />}*/}
                {displayName}
              </div>
            ))}
          </div>
        )}
      >
        <div className={clsx([classes.menuWrapper, active && classes.menuWrapperActive])} onClick={triggerActive}>
          {children}
        </div>
      </Tooltip>
    </>
  );
};

export default Dropdown;
