import React, { useContext } from 'react';
import EditableField from 'src/core/TagManager/EditableField';
import IconButton from 'src/core/TagManager/IconButton';
import { IoMdAdd } from 'react-icons/io';
import { TbPlaylistAdd } from 'react-icons/tb';
import Tooltip from 'rc-tooltip';
import TagChildMenu from 'src/core/TagManager/TagChildMenu';
import TagLabel from 'src/core/TagManager/TagLabel';
// import { NodeApi , useTagApi } from 'src/core/TagManager/useTagApi';
import { Uuid } from 'src/core/store/modules/template/reducer';
import EachTagManagerProvider , { EachTagManagerProviderContext } from 'src/core/TagManager/EachTagManagerProvider';
import { useSelector } from 'react-redux';
import { nodesMapSelector } from 'src/core/store/modules/template/selector';

interface ITreeNavigationProps {}

const TreeNavigation = ({}: ITreeNavigationProps) => {
  const {
    parentNodeApi,
    nodeApi: { nodeState, changeName, highlightThisNode, changeText, addBlockNode, addTextNode, deleteChild, selectChild },
  } = useContext(EachTagManagerProviderContext);

  const nodesMap = useSelector(nodesMapSelector)

  const parents = (() => {
    const limit = 5
    const parents = []
    let node = nodeState;

    for (let i = 0; i < limit; i++) {
      if(node.parentId) {
        parents.push(node.parentId)
        node = nodesMap[node.parentId]
      }
    }

    return parents
  })()

  const levelDeepPx = 15
  const thisNodeLevelDeepPx = (parents.length + 1) * levelDeepPx

  return (
    <div className={'pt-20'}>
      {parents.reverse().map((nodeId, index) => (
          <div className={''} style={{ paddingLeft: levelDeepPx * index }} key={nodeId}>
            <EachTagManagerProvider nodeId={nodeId}>
              <TagLabel onMouseLeave={highlightThisNode}/>
            </EachTagManagerProvider>
          </div>
        ))
      }

      <div style={{ paddingLeft: thisNodeLevelDeepPx }}>
        {/* Name */}
        <div className="flex pt-10 pb-5">
          <div>{'Name: '}</div>
          <EditableField
            notEditElement={nodeState.name || '-'}
            editElement={<input type="text" value={nodeState.name} onChange={changeName} autoFocus={true} />}
          />
        </div>
        {/* Children */}
        {/* Text child */}
        <div data-name={'children-navigation'} className={'flex'}>
          {nodeState.isText ? (
            <div className={'pl-15'}>
              <div>{'Text: '}</div>
              <EditableField
                notEditElement={nodeState.text}
                editElement={
                  <div>
                    <input type="text" value={nodeState.text} onChange={changeText} autoFocus={true} />
                  </div>
                }
              />
            </div>
          ) : (
            /* Children */
            <div className={'flex align-center '}>
              <div>{'Children: '}</div>
              <div className="flex flex-column">
                <IconButton centering>
                  <IoMdAdd className={'pointer'} onClick={addBlockNode} title={'Add block child'} />
                </IconButton>
                <IconButton centering>
                  <TbPlaylistAdd className={'pointer'} onClick={addTextNode} title={'Add text child'} />
                </IconButton>
              </div>
              {/* Map children */}
              <div className={''}>
                {nodeState.children.map((child, index) => (
                  // <Tooltip
                  //   key={child.id}
                  //   placement={'top'}
                  //   overlay={() => <TagChildMenu key={child.id} deleteChild={() => deleteChild(index)} />}
                  // >
                    <div style={{ paddingLeft: levelDeepPx }}>
                      <EachTagManagerProvider nodeId={child.id}>
                        <TagLabel onMouseLeave={highlightThisNode} />
                      </EachTagManagerProvider>
                    </div>
                  // </Tooltip>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/*{parentNodeApi && (*/}
      {/*  <div className="flex">*/}
      {/*    Parent:*/}
      {/*    <TagLabel onMouseLeave={highlightThisNode} />*/}
      {/*  </div>*/}
      {/*)}*/}

    </div>
  );
};

export default TreeNavigation;
