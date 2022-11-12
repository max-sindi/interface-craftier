import React, { useContext } from 'react';
import { ProjectContext } from '../Project';

const VariableSelector = ( { onChange }: { onChange: (value: string) => void}) => {
  const { currentState: { variables }} = useContext(ProjectContext)

  return (
    <div>
      {Object.entries(variables).map(([name, value]) =>
        <div className="flex align-center pointer text-no-wrap justify-space-between" onClick={() => onChange(value)} key={name}>
          <div className={`mr-10`}>{name}:</div> <div>{value}</div>
        </div>
      )}
    </div>
  )
}

export default VariableSelector