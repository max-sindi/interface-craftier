import React from 'react';
import ObjectEditor from './TagManager/ObjectEditor'
import { useDispatch , useSelector } from 'react-redux';
import { variablesSelector } from 'src/core/store/modules/template/selector';
import { IVariables } from 'src/core/store/modules/template/reducer';
import { updateVariablesAction } from 'src/core/store/modules/template/actions';

const Variables = () => {
  const variables = useSelector(variablesSelector)
  const dispatch = useDispatch()

  const onChange = (cb: (variables: IVariables) => IVariables) => {
    dispatch(updateVariablesAction(cb(variables)))
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