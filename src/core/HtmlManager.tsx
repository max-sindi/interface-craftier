import React, { useContext } from 'react';
import _ from 'lodash';
import EachTagManager from './TagManager/EachTagManager';
import { Fragment, RootFragment } from './Tag';
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
  console.log(template);
  return (
    <div id="toolbar" className={'fixed w-400 b-20 l-50-p transform-left-center'}>
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
          parentXpath={``}
          xpath={``}
          // selectedNode={selectedNode}
          // unselectCurrentNode={unselectCurrentNode}
          // update={update}
          deepLevel={0}
          lastInLevel={true}
          // popup={popup}
          // setPopup={setPopup}
        />
      )}
      {/*)}*/}
    </div>
  );
};

export default HtmlManager;
