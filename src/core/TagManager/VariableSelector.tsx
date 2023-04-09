import React  from 'react';
import { useSelector } from 'react-redux';
import { variablesSelector } from 'src/core/store/modules/template/selector';

const VariableSelector = ( { onChange }: { onChange: (value: string) => void}) => {
  const variables = useSelector(variablesSelector)

  return (
    <div style={{ background: '#178'}} className={'white p-6 border-radius-5 fw-500 fz-16'}>
      {Object.entries(variables).map(([name, value]) =>
        <div className="d-flex align-center pointer text-no-wrap justify-space-between" onClick={() => onChange(value)} key={name}>
          <div className={`mr-10`}>{name}:</div> <div>{value}</div>
        </div>
      )}
    </div>
  )
}

export default VariableSelector