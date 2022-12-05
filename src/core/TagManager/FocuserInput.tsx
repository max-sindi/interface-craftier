import React from 'react';

interface IFocuserInputProps {}

const FocuserInput = (props: IFocuserInputProps) => {
  return <input type="text" className="label-focus" autoFocus={true} />;
};

export default FocuserInput;
