import React from 'react';
import classes from 'src/core/UI/Switch.module.scss';
import clsx from 'classnames';

interface ISwitchProps {
  value: boolean;
  onChange: (newValue: boolean) => void;
  label: string;
  disabled?: boolean;
}

const Switch = ({ value, onChange, label, disabled }: ISwitchProps) => {
  const handleChange = () => onChange(!value);

  return (
    <div
      className={clsx([classes.label, !disabled && classes.labelEnabled])}
      onClick={!disabled ? handleChange : () => {}}
    >
      <span>{label}</span>
      <div className={clsx([classes.switch, value && classes.switchActive])}>
        <div className={classes.switchCircle} />
      </div>
    </div>
  );
};

export default Switch;
