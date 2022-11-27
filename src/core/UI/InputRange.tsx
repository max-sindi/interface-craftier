import React from 'react';

interface IInputRangeProps {
  min: number,
  max: number,
  onChange: (value: string) => void,
  defaultValue?: any,
  value?: number
}

const InputRange = ( { min, max, onChange, defaultValue, value } : IInputRangeProps ) => {
  const onInputChange = (evt: any) => onChange(evt.target.value)

  return (
    <div>
      <input type='range' value={value || defaultValue} min={min} max={max} onChange={onInputChange} />
    </div>
  );
};

export default InputRange;