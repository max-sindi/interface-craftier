import React, { useContext } from 'react';
import _ from 'lodash';
import EachTagManager from './TagManager/EachTagManager';
import { GlobalState, ProjectContext } from './Project';
// import {useRecoilState} from 'recoil'
// import {popupState} from './hook/popup'
// import {proxy} from 'valtio'

// const expandedLog = (function(){
//   const MAX_DEPTH = 100;
//
//   return function(item, depth){
//
//     depth = depth || 0;
//
//     if (depth > MAX_DEPTH ) {
//       return;
//     }
//
//     if (_.isObject(item)) {
//       _.each(item, function(value, key) {
//         console.group(key + ' : ' +(typeof value));
//         expandedLog(value, depth + 1);
//         console.groupEnd();
//       });
//     } else {}
//   }
// })();

// const state = proxy({})
//
// type Props = {
//   currentState: GlobalState
// }

const HtmlManager = () => {
  const {
    currentState,
    currentState: { template },
    selectedNode,
    updateSelectedNode,
    update,
  } = useContext(ProjectContext);

  // if (!template) return null;

  // const unselectCurrentNode = () => updateSelectedNode(undefined);
  // const save = (template: RootFragment) => update(prev => ({...prev, template}))
  return (
    <div id="toolbar" className={'fixed b-20 l-50-p transform-left-center'} style={{ width: 500 }}>
      {!selectedNode ? (
        <img
          src="https://cdn2.iconfinder.com/data/icons/visual-empty-state/32/No_Data_Found_Not_Found_Lost_Searching_Search-1024.png"
          alt="No data"
          width={50}
          height={50}
          className={'mr-a ml-a d-block'}
        />
      ) : (
        <EachTagManager
          first={true}
          // currentState={currentState}
          fragment={template}
          // key={0}
          indexInLevel={0}
          parentXpath={`template`}
          xpath={`template`}
          // selectedNode={selectedNode}
          // unselectCurrentNode={unselectCurrentNode}
          // update={update}
          deepLevel={0}
          lastInLevel={true}
          parentNode={template}
          transformParent={(updater) => {
            currentState.template = updater(template)
            update(currentState)
          }}
          // popup={popup}
          // setPopup={setPopup}
        />
      )}
      {/*)}*/}
    </div>
  );
};

export default HtmlManager;
