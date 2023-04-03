import React , { InputHTMLAttributes , TextareaHTMLAttributes , useMemo } from 'react';
import classes from './Input.module.scss';
import clsx from 'classnames';
import { GiTireIronCross } from 'react-icons/gi';

interface IInputProps extends Omit<Partial<InputHTMLAttributes<any> & TextareaHTMLAttributes<any>>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: JSX.Element;
  asTextarea?: boolean;
  resetButtonEnabled?: boolean;
  inputWrapperClassName?: string;
}

const Input = (props: IInputProps) => {
  const {
    value,
    onChange,
    placeholder = '',
    disabled,
    label,
    asTextarea,
    inputWrapperClassName,
    resetButtonEnabled,
    ...attrs
  } = props;

  const handleChange = (evt: any) => {
    onChange(evt.target.value);
  };

  const resetValue = () => onChange('')

  return (
    <div className={clsx([classes.inputWrapper, inputWrapperClassName])}>
      {resetButtonEnabled && value && (
        <div onClick={resetValue} className={'absolute r-0 t-50-p transform-top-center pointer'}>
          <GiTireIronCross size={15}/>
        </div>
      )}
      {label && label}
      {!asTextarea ? (
        <input
          {...attrs}
          type="text"
          disabled={disabled}
          onChange={handleChange}
          value={value}
          className={classes.input}
          placeholder={placeholder}
        />
      ) : (
        <textarea
          {...attrs}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          className={classes.input}
          placeholder={placeholder}
          rows={attrs.rows || 8}
        ></textarea>
      )}
    </div>
  );
};

export default Input;
