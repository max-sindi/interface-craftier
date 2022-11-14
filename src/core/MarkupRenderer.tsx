import React , { useContext } from 'react';
import Tag  from './Tag';
import { ProjectContext } from './Project';
// import _ from "lodash"
// import { GlobalState } from './Project';
// import {useRecoilState} from 'recoil'
// import {popupState} from './hook/popup'

const MarkupRenderer: React.FunctionComponent = () => {
  const { currentState: { template }} = useContext(ProjectContext)
  // const [popup, setPopup] = useRecoilState(popupState)
  // const template = te

  return !template ? null : (
    <>
      {/* start of tool */}
      <Tag
        key={0}
        indexInLevel={0}
        deepLevel={0}
        node={template}

        // popup={popup}
        // setPopup={setPopup}
      />
    </>
  )
}

export default MarkupRenderer