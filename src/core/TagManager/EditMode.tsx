import React from 'react';

const EditMode = ({
  children,
  active = false,
  closeTextEditMode,
  activateEditMode,
}: {
  children: any;
  active: boolean;
  closeTextEditMode: () => void;
  activateEditMode: () => void;
}) => {
  return (
    <div style={{ transition: 'all 1s' }} className={!active ? '' : 'absolute-center flex flex-center '}>
      {active && <div className={`absolute-center pointer z-0`} style={{ background: '#11111130' }} onClick={closeTextEditMode} />}
      {children}
    </div>
  );
  // return (
  //   <div>
  //     {children}
  //   </div>
  // );
};

export default EditMode;
