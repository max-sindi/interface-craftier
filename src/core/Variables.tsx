import React , { useContext , useMemo } from 'react';
// import {observer} from 'mobx-react'
// import project from '../../mobX/project'
import ObjectEditor from './TagManager/ObjectEditor'
import { ProjectContext } from './Project';
// import _ from 'lodash'

export type IVariables = {
  [key: string]: string
}

const Variables = () => {
  const { currentState, currentState: { variables }, update } = useContext(ProjectContext)

  const onChange = (cb: (variables: IVariables) => IVariables) => {
    currentState.variables = cb(variables)
    update(currentState)
    // update({...currentState, variables: cb(variables)})
  }

  return (
    <div className={``}>
      <ObjectEditor
        enableCreating
        value={variables}
        onChange={onChange}
        title={'Variables'}
        fields={[]}
    />
    </div>
  )
}

export default Variables