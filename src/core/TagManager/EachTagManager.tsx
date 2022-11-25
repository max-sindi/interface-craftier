import React, { useCallback, useContext, useMemo, useState } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { FaRegWindowClose } from 'react-icons/fa';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import ClassNamesSelector from './ClassNamesSelector';
import ObjectEditor from './ObjectEditor';
import SVGBlockToText from '../UI/svg/BlockToText';
import Tooltip from 'rc-tooltip';
import { v4 as uuid } from 'uuid';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ProjectContext } from '../Project';
import cc from 'classnames';
import { attrsExisting, stylesExisting, tags } from './config';
import { BsArrowsCollapse, BsArrowsExpand, BsArrowBarDown, BsArrowBarRight, BsFillPenFill } from 'react-icons/bs';
import { BiLayer } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdSquareOutline, IoMdReturnLeft, IoMdAdd } from 'react-icons/io';
import { TbPlaylistAdd } from 'react-icons/tb';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ClassNameRecord, Node } from '../Node';
import EditableField from './EditableField';
import TagChildMenu from './TagChildMenu';
import IconButton from './IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { createNodeSelector, hoveredNodeSelector } from 'src/core/store/modules/template/selector';
import {
  addChildToNodeAction,
  resetHoveredNodeAction,
  updateHoveredNodeAction,
  updateInspectedNodeAction,
  updateNodeAction,
} from 'src/core/store/modules/template/actions';
import { Uuid } from 'src/core/store/modules/template/reducer';
import Resizers from 'src/core/TagManager/Resize/Resizers';
import { cloneDeepWith } from 'lodash';

export type IEachTagManagerProps = {
  nodeId: Uuid;
};

const cloneDeepWithUniqueId = (data: Node): Node =>
  cloneDeepWith(data, (target: Node) =>
    Array.isArray(target.children)
      ? { ...target, id: uuid(), children: target.children.map((child) => cloneDeepWithUniqueId(child)) }
      : target
  );

export const createDeleter =
  (indexInLevel: number) =>
  (prev: Node): Node => {
    return {
      ...prev,
      children: prev.children.filter((i, index) => index !== indexInLevel),
    };
  };

function EachTagManager({ nodeId }: IEachTagManagerProps) {
  const { toggleToolbarVisibility, toolbarCollapsed } = useContext(ProjectContext);
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();
  const hoveredNode = useSelector(hoveredNodeSelector);
  const nodeSelector = useCallback(createNodeSelector(nodeId), [nodeId]);
  const nodeState = useSelector(nodeSelector);
  const parentNodeSelector = useMemo(
    () => (nodeState.parentId ? createNodeSelector(nodeState.parentId) : () => undefined),
    [nodeState.parentId]
  );
  const parentNodeState = useSelector(parentNodeSelector);

  const updateInspectedNode = (node?: Node) => dispatch(updateInspectedNodeAction(node?.id));
  const updateHoveredNode = (node: Node) => dispatch(updateHoveredNodeAction(node.id));
  const resetHoveredNode = () => dispatch(resetHoveredNodeAction());
  const unselectCurrentNode = () => dispatch(updateInspectedNodeAction(undefined));
  const transformField = (field: keyof Node, value: any) => dispatch(updateNodeAction({ id: nodeId, field, value }));
  const transformParentField = (field: keyof Node, value: any) =>
    parentNodeState && dispatch(updateNodeAction({ id: parentNodeState.id, field, value }));
  const selectParent = () => updateInspectedNode(parentNodeState);
  const selectChild = (child: Node) => updateInspectedNode(child);
  const onHighlight = (hoveringNode = nodeState) => updateHoveredNode(hoveringNode);

  // const createObjectFieldUpdater = (field: 'style' | 'attrs') => {
  //   return (value) => {
  //     transformField(field, value);
  //   };
  // };

  const createHtmlChangeHandler = (path: keyof Node) => (evt: any) => transformField(path, evt.target.value);
  const createChangeHandler = (path: keyof Node) => (value: any) => {
    value instanceof Function ? transformField(path, value(nodeState[path])) : transformField(path, value);
  };

  // const transformParent = (updater: (arg1: Node) => Node) => transformField(updater, parentXpath);
  // const deleteElement = () =>
  // transformParent();
  // };

  // const deleteElement = () => transformParent(createDeleter(indexInLevel))

  // makeItText = () => transformField('');

  // const makeItDiv = () => transformField(() => createNode());

  const changeTextPastedData = (evt: any) => {
    evt.persist();
    // setState((state) => ({ ...state, pastedData: evt.target.value }));
  };

  // addNewChildFromPasted = () => {
  //   const parsedData = (() => {
  //     try {
  //       return JSON.parse(state.pastedData);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   })();
  //
  //   parsedData &&
  //     transformField((node) => ({ ...node, children: [...nodeState.children, cloneDeepWithUniqueId(parsedData)] }));
  // };

  const changeText = createHtmlChangeHandler('text');
  // const changeClassName = createHtmlChangeHandler('className');

  const changeClassNamesList = createChangeHandler('className');

  // const wrapWithDiv = () => transformField((node) => ({ ...createNode(), children: [node] }));

  // const wrapChildren = () => transformField((node) => ({ ...node, children: [createNode(nodeState.children)] }));

  // const setOnParent = () =>
  //   transformParent((node: Node) => ({
  //     ...fragment,
  //     children: nodeState.children.filter((item, index) => index !== indexInLevel),
  //   }));

  // const moveUpward = () => swapElements(indexInLevel - 1, indexInLevel);
  //
  // const moveDownward = () => swapElements(indexInLevel, indexInLevel + 1);

  // const swapElements = (firstIndex: number, secondIndex: number) =>
  //   transformParent((parent) => {
  //     const { children: childrenOriginal } = parent;
  //     const children = _.clone(childrenOriginal);
  //     const firstElement = children[firstIndex];
  //     const secondElement = children[secondIndex];
  //     children[firstIndex] = secondElement;
  //     children[secondIndex] = firstElement;
  //     return { ...parent, children };
  //   });

  const addChild = async (creator = createNode) => {
    dispatch(addChildToNodeAction({ id: nodeId, newChild: creator() }));
    // const newNode = creator();
    // transformField((node) => {
    //   node.children.push(newNode)
    // });
  };

  const addBlockNode = (evt: any) => addChild();
  const addTextNode = (evt: any) => addChild(() => new Node({ isText: true }));

  const createNode = (children?: Node['children']): Node =>
    new Node({
      children,
    });

  // duplicateNode = () =>
  //   transformParent((parent) => ({
  //     ...parent,
  //     children: [...parent.children, cloneDeepWithUniqueId(parent.children[indexInLevel])],
  //   }));

  const changeName = createHtmlChangeHandler('name');
  const changeTag = createHtmlChangeHandler('tag');

  // const save = _.debounce((newValue) => {
  //   _.setWith(currentState, `${xpath}`, newValue);
  //   update(currentState);
  // }, 300);

  // const transformField = (updater: (arg1: Node) => Node) => {
  //   const newValue = updater(fragment);
  //   setNodeState(newValue);
  //   save(newValue);
  //   return newValue;
  // };

  const rendererTagSelect = () => (
    <select value={nodeState.tag} onChange={changeTag}>
      {tags.map((tag: string) => (
        <option value={tag} label={tag} key={tag} />
      ))}
    </select>
  );
  //
  // const recursiveRenderChildren = () => {
  //   return nodeState.children.map((child, index, arr) =>
  //     typeof !child.isText ? (
  //       <div key={child.id} className={``}>
  //         <EachTagManager
  //           {...props}
  //           fragment={child}
  //           key={child.id}
  //           deepLevel={deepLevel + 1}
  //           indexInLevel={index}
  //           lastInLevel={index === arr.length - 1}
  //           parentXpath={xpath}
  //           grandParentXpath={parentXpath}
  //           xpath={`${xpath}${xpath ? '.' : ''}children[${index}]`}
  //           parentNode={fragment}
  //           transformParent={transformField}
  //         />
  //       </div>
  //     ) : null
  //   );
  // };

  // const onMouseLeave = (event: any) => {
  //   event.stopPropagation();
  //   resetHoveredNode();
  // };
  const onMouseEnter = (event: any) => {
    event.stopPropagation();
    updateHoveredNode(nodeState);
  };

  return (
    <div className={cc('relative min-h-20')}>
      {/* Toggle or Expand menu */}
      <div className={'absolute r-5 b-0 pointer'} onClick={toggleToolbarVisibility}>
        {toolbarCollapsed ? <BsArrowsExpand /> : <BsArrowsCollapse />}
      </div>

      <div className={!toolbarCollapsed ? '' : 'd-none'}>
        <div className="flex">
          <Tooltip overlay={'Level Up'} placement={'top'}>
            <div onClick={selectParent} className={cc('flex align-center pr-5 pointer')}>
              <IoMdReturnLeft />
            </div>
          </Tooltip>
          {/* Deep level */}
          <Tooltip overlay={'Deep level'} placement={'top'}>
            <div className={'d-inline-flex align-center pointer'}>
              <BiLayer /> <span>{nodeState.deepIndex + 1}</span>
            </div>
          </Tooltip>
          {/* Child level */}
          <Tooltip overlay={'Child level'} placement={'top'}>
            <div className={'d-inline-flex align-center ml-5'}>
              <BiLayer className={'rotate-90'} /> <span>{nodeState.childIndex + 1}</span>
            </div>
          </Tooltip>
          {/* Tag */}
          <div className={`flex align-center ml-10`}>
            <div className={`pr-5`}>Tag:</div>
            {rendererTagSelect()}
          </div>
          {/*Highlight*/}
          <div>
            <button onClick={() => onHighlight()} className={`ml-20 pointer fz-13`}>
              {'Highlight'}
            </button>
          </div>
          {/* Close Popup */}
          <Tooltip overlay={'Unselect'} placement={'top'}>
            <FaRegWindowClose
              onClick={unselectCurrentNode}
              size={20}
              className={`r-3 t-3 z-index-5 ml-a pointer`}
            />
          </Tooltip>
        </div>
        {/* Children */}
        {/* Text */}
        <div data-name={'children-navigation'} className={'flex mt-5'}>
          {nodeState.isText ? (
            <>
              <div>{'Text: '}</div>
              <EditableField
                notEditElement={nodeState.text}
                editElement={
                  <div>
                    <input type="text" value={nodeState.text} onChange={changeText} autoFocus={true} />
                  </div>
                }
              />
            </>
          ) : (
            /* Children */
            <div className={'flex align-center '}>
              <div>{'Children: '}</div>
              <div className="flex flex-column">
                <IconButton centering>
                  {/*<Tooltip overlay={'Add block child'} placement={'top'}>*/}
                  <IoMdAdd className={'pointer'} onClick={addBlockNode} title={'Add block child'} />
                  {/*</Tooltip>*/}
                </IconButton>
                <IconButton centering>
                  {/*<Tooltip overlay={'Add text child'} placement={'top'}>*/}
                  <TbPlaylistAdd className={'pointer'} onClick={addTextNode} title={'Add text child'} />
                  {/*</Tooltip>*/}
                </IconButton>
              </div>
              {/* Map children */}
              <div className={'flex flex-wrap'}>
                {nodeState.children.map((child, index) => (
                  <Tooltip
                    key={child.id}
                    placement={'top'}
                    // onVisibleChange={(visible: boolean) => visible && onHighlight(child)}
                    overlay={() => <TagChildMenu key={child.id} />}
                  >
                    <div
                      className={'flex align-center pointer ml-5 mb-5'}
                      onClick={() => selectChild(child)}
                      onMouseEnter={(event: any) => {
                        event.stopPropagation();
                        updateHoveredNode(child);
                      }}
                      onMouseLeave={onMouseEnter}
                    >
                      {child.isText ? <BsFillPenFill /> : <IoMdSquareOutline />}
                      {child.isText ? child.text?.slice(0, 6) + '...' : child.tag}
                    </div>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}
        </div>
        <Tabs
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
          forceRenderTabPanel
          onMouseEnter={onMouseEnter}
          // onMouseLeave={onMouseLeave}
        >
          {/* 1 - Tree */}
          <TabPanel>
            <div className={'tabPanel'}>

              {/* Name */}
              <div className="flex">
                <div>{'Name: '}</div>
                <EditableField
                  notEditElement={nodeState.name || '-'}
                  editElement={<input type="text" value={nodeState.name} onChange={changeName} autoFocus={true} />}
                />
              </div>
            </div>
          </TabPanel>

          {/* Layout */}
          <TabPanel>
            <div className='tabPanel'>
              {/* Resizers */}
              <Resizers changeClassName={changeClassNamesList} classNameRecord={nodeState.className} nodeId={nodeId} />

            </div>
          </TabPanel>

          {/*2 Classes */}
          <TabPanel>
            <div className={'tabPanel'}>
              <ClassNamesSelector changeClassName={changeClassNamesList} classNameRecord={nodeState.className} />
              {/*<textarea*/}
              {/*  value={nodeState.className}*/}
              {/*  onChange={changeClassName}*/}
              {/*  rows={2}*/}
              {/*  className={`grow-1 max-w-120 ml-a`}*/}
              {/*/>*/}
            </div>
          </TabPanel>

          {/* 3 - Styles */}
          <TabPanel>
            <div className={'tabPanel'}>
              <ObjectEditor
                onChange={createChangeHandler('style')}
                value={nodeState.style}
                fields={stylesExisting}
                title={'Styles: '}
              />
            </div>
          </TabPanel>

          {/* 4 - Attributes */}
          <TabPanel>
            <div className={'tabPanel'}>
              <ObjectEditor
                onChange={createChangeHandler('attrs')}
                value={nodeState.attrs}
                fields={attrsExisting}
                title={'Attri-butes: '}
              />
            </div>
          </TabPanel>
          <TabList>
            <Tab>Tree</Tab>
            <Tab>Layout</Tab>
            <Tab>Classes</Tab>
            <Tab>Styles</Tab>
            <Tab>Attributes</Tab>
          </TabList>
        </Tabs>
      </div>
      {/*</>*/}
      {/*)}*/}
    </div>
  );
}

export default EachTagManager;
