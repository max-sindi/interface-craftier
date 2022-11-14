import React, { useContext, useState } from 'react';
// import PropTypes from "prop-types"
import _ from 'lodash';
import { TagWrapper } from './styled';
import * as aiIcons from 'react-icons/ai';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { FaRegWindowClose } from 'react-icons/fa';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import ClassNamesSelector from './ClassNamesSelector';
import ObjectEditor from './ObjectEditor';
import SVGBlockToText from '../UI/svg/BlockToText';
import Tooltip from 'rc-tooltip';
// import {closePopup} from '../hook/popup'
import { v4 as uuid } from 'uuid';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Resize from './Resize';
import { GlobalState, ProjectContext } from '../Project';
import cc from 'classnames';
import { attrsExisting, stylesExisting, tags } from './config';
import { BsArrowsCollapse, BsArrowsExpand, BsArrowBarDown, BsArrowBarRight, BsFillPenFill } from 'react-icons/bs';
import { BiLayer } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdSquareOutline, IoMdReturnLeft, IoMdAdd } from 'react-icons/io';
import { TbPlaylistAdd } from 'react-icons/tb';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Fragment } from '../Fragment';
import EditableField from './EditableField';
import TagChildMenu from './TagChildMenu';
import IconButton from './IconButton';

import classNames from '../../stylotron/src/styles.json'
import DimensionsResize from './DimensionsResize';

export type IEachTagManagerProps = {
  fragment: Fragment;
  deepLevel: number;
  indexInLevel: number;
  first?: boolean;
  lastInLevel: boolean;
  xpath: string;
  parentXpath: string;
  parentNode: Fragment;
  transformParent: (updater: (fragment: Fragment) => Fragment) => void;
};

const cloneDeepWithUniqueId = (data: Fragment): Fragment =>
  _.cloneDeepWith(data, (target: Fragment) =>
    Array.isArray(target.children)
      ? { ...target, id: uuid(), children: target.children.map((child) => cloneDeepWithUniqueId(child)) }
      : target
  );

export const createDeleter =
  (indexInLevel: number) =>
  (prev: Fragment): Fragment => {
    return {
      ...prev,
      children: prev.children.filter((i, index) => index !== indexInLevel),
    };
  };

function EachTagManager({
  fragment: fragmentOriginal,
  first,
  lastInLevel,
  parentXpath,
  indexInLevel,
  deepLevel,
  xpath,
  parentNode,
  transformParent,
  ...props
}: IEachTagManagerProps) {
  const {
    updateSelectedNode,
    currentState,
    selectedNode,
    update,
    toggleToolbarVisibility,
    toolbarCollapsed,
    updateHoveredNode,
    hoveredNode,
  } = useContext(ProjectContext);

  const unselectCurrentNode = () => updateSelectedNode(undefined);

  const createObjectFieldUpdater = (path: 'style' | 'attrs') => {
    return (mutator: (record: Record<string, string>) => Record<string, string>) => {
      transform((old) => {
        return { ...old, [path]: mutator(old[path]) };
      });
    };
  };

  const createHtmlChangeHandler = (path: keyof Fragment) => {
    return (evt: any) => transform((old) => ({ ...old, [path]: evt.target.value }));
  };

  // const transformParent = (updater: (arg1: Fragment) => Fragment) => transform(updater, parentXpath);
  // const deleteElement = () =>
  // transformParent();
  // };

  // const deleteElement = () => transformParent(createDeleter(indexInLevel))

  // makeItText = () => transform('');

  const makeItDiv = () => transform(() => createFragment());

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
  //     transform((node) => ({ ...node, children: [...node.children, cloneDeepWithUniqueId(parsedData)] }));
  // };

  const changeText = createHtmlChangeHandler('text');
  const changeClassName = createHtmlChangeHandler('className');

  const changeClassNamesList = (className: string) => transform((val) => ({ ...val, className }));

  const wrapWithDiv = () => transform((node) => ({ ...createFragment(), children: [node] }));

  const wrapChildren = () => transform((node) => ({ ...node, children: [createFragment(fragment.children)] }));

  const setOnParent = () =>
    transformParent((node: Fragment) => ({
      ...fragment,
      children: node.children.filter((item, index) => index !== indexInLevel),
    }));

  const moveUpward = () => swapElements(indexInLevel - 1, indexInLevel);

  const moveDownward = () => swapElements(indexInLevel, indexInLevel + 1);

  const swapElements = (firstIndex: number, secondIndex: number) =>
    transformParent((parent) => {
      const { children: childrenOriginal } = parent;
      const children = _.clone(childrenOriginal);
      const firstElement = children[firstIndex];
      const secondElement = children[secondIndex];
      children[firstIndex] = secondElement;
      children[secondIndex] = firstElement;
      return { ...parent, children };
    });

  const selectParent = () => updateSelectedNode(parentNode);
  const selectChild = (child: Fragment) => updateSelectedNode(child);
  const onHighlight = (hoveringFragment = fragment) =>
    updateHoveredNode(hoveredNode?.id === hoveringFragment.id ? undefined : hoveringFragment);
  const addBlockNode = (evt: any) => addChild();
  const addTextNode = (evt: any) => addChild(() => new Fragment({ isText: true }));

  const createFragment = (children?: Fragment['children']): Fragment =>
    new Fragment({
      children,
    });

  const addChild = async (creator = createFragment) => {
    const newFragment = creator();
    transform((node) => {
      return { ...node, children: [...node.children, newFragment] };
    });
    /* Preset newly added child*/
    // updateSelectedNode(newFragment)
  };

  // duplicateFragment = () =>
  //   transformParent((parent) => ({
  //     ...parent,
  //     children: [...parent.children, cloneDeepWithUniqueId(parent.children[indexInLevel])],
  //   }));

  const changeName = createHtmlChangeHandler('name');
  const changeTag = createHtmlChangeHandler('tag');

  // local fragment copy for better performance
  const [fragment, setFragmentState] = useState(fragmentOriginal);

  const save = _.debounce((newValue) => {
    _.setWith(currentState, `${xpath}`, newValue);
    update(currentState);
  }, 1300);

  const transform = (updater: (arg1: Fragment) => Fragment) => {
    const newValue = updater(fragment);
    setFragmentState(newValue);
    save(newValue);
    return newValue;
  };

  const rendererTagSelect = () => (
    <select value={fragment.tag} onChange={changeTag}>
      {tags.map((tag) => (
        <option value={tag} label={tag} key={tag} />
      ))}
    </select>
  );

  const recursiveRenderChildren = () => {
    return fragment.children.map((child, index, arr) =>
      typeof !child.isText ? (
        <div key={index} className={``}>
          <EachTagManager
            {...props}
            fragment={child}
            key={child.id}
            deepLevel={deepLevel + 1}
            indexInLevel={index}
            parentXpath={xpath}
            lastInLevel={index === arr.length - 1}
            xpath={`${xpath}${xpath ? '.' : ''}children[${index}]`}
            parentNode={fragment}
            transformParent={transform}
          />
        </div>
      ) : null
    );
  };

  const onMouseOut = (event: any) => {
    event.stopPropagation();
    updateHoveredNode(undefined);
  };
  const onMouseOver = (event: any) => {
    event.stopPropagation();
    updateHoveredNode(fragment);
  };

  const isVisible = selectedNode && selectedNode.id === fragment.id;
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className={cc(isVisible && 'relative min-h-20')}>
      {/* render children */}
      {recursiveRenderChildren()}

      {/* Toggle or Expand menu */}
      {isVisible && (
        <div className={'absolute r-5 b-0 pointer'} onClick={toggleToolbarVisibility}>
          {toolbarCollapsed ? <BsArrowsExpand /> : <BsArrowsCollapse />}
        </div>
      )}

      {/* hide all nodes from inspecting except selected  */}
      <div className={isVisible && !toolbarCollapsed ? '' : 'd-none'}>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} forceRenderTabPanel  onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
          {/* 1 - General */}
          <TabPanel>
            <div className={'tabPanel'}>
              <div className="flex">
                <Tooltip overlay={'Level Up'} placement={'top'}>
                  <div onClick={selectParent} className={cc(deepLevel !== 0 && 'pointer', 'flex align-center pr-5')}>
                    <IoMdReturnLeft />
                  </div>
                </Tooltip>
                {/* Deep level */}
                <Tooltip overlay={'Deep level'} placement={'top'}>
                  <div className={'d-inline-flex align-center pointer'}>
                    <BiLayer /> <span>{deepLevel + 1}</span>
                  </div>
                </Tooltip>
                {/* Child level */}
                <Tooltip overlay={'Child level'} placement={'top'}>
                  <div className={'d-inline-flex align-center ml-5'}>
                    <BiLayer className={'rotate-90'} /> <span>{indexInLevel + 1}</span>
                  </div>
                </Tooltip>
                {/* Tag */}
                <div className={`flex align-center ml-10`}>
                  <div className={``}>Tag:</div>
                  {rendererTagSelect()}
                </div>
                {/*Highlight*/}
                <div>
                  <button onClick={() => onHighlight()} className={`ml-20 black pointer fz-13`}>
                    {'Highlight'}
                  </button>
                </div>

                 {/* Resize  */}
                <DimensionsResize changeClassNamesList={changeClassNamesList} classNameList={fragment.className} />

                {/* Close Popup */}
                <Tooltip overlay={'Unselect'} placement={'top'}>
                  <FaRegWindowClose
                    onClick={unselectCurrentNode}
                    size={20}
                    className={`r-3 t-3 z-index-5 ml-a pointer`}
                  />
                </Tooltip>
              </div>
              {/* Name */}
              <div className="flex">
                <div>{'Name: '}</div>
                <EditableField
                  notEditElement={fragment.name || '-'}
                  editElement={<input type="text" value={fragment.name} onChange={changeName} autoFocus={true} />}
                />
              </div>
              {/* Text */}
              <div data-name={'children-navigation'} className={'flex mt-5'}>
                {fragment.isText ? (
                  <>
                    <div>{'Text: '}</div>
                    <EditableField
                      notEditElement={fragment.text}
                      editElement={
                        <div>
                          <input type="text" value={fragment.text} onChange={changeText} autoFocus={true} />
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
                      {fragment.children.map((child, index) => (
                        <Tooltip
                          placement={'top'}
                          // onVisibleChange={(visible: boolean) => visible && onHighlight(child)}
                          overlay={() => <TagChildMenu index={index} transform={transform} key={child.id} />}
                        >
                          <div
                            className={'flex align-center pointer ml-5 mb-5'}
                            onClick={() => selectChild(child)}
                            onMouseOver={(event: any) => {
                              event.stopPropagation();
                              updateHoveredNode(child);
                            }}
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
            </div>
          </TabPanel>

          {/*2 Classes */}
          <TabPanel>
            <div className={'tabPanel'}>
              <ClassNamesSelector onChange={changeClassNamesList} value={fragment.className} />
              <textarea
                value={fragment.className}
                onChange={changeClassName}
                rows={2}
                className={`grow-1 max-w-120 ml-a`}
              />
            </div>
          </TabPanel>

          {/* 3 - Styles */}
          <TabPanel>
            <div className={'tabPanel'}>
              <ObjectEditor
                onChange={createObjectFieldUpdater('style')}
                value={fragment.style}
                fields={stylesExisting}
                title={'Styles: '}
              />
            </div>
          </TabPanel>

          {/* 4 - Attributes */}
          <TabPanel>
            <div className={'tabPanel'}>
              <ObjectEditor
                onChange={createObjectFieldUpdater('attrs')}
                value={fragment.attrs}
                fields={attrsExisting}
                title={'Attri-butes: '}
              />
            </div>
          </TabPanel>
          <TabList>
            <Tab>General</Tab>
            <Tab>Classes</Tab>
            <Tab>Styles</Tab>
            <Tab>Attributes</Tab>
          </TabList>
        </Tabs>
      </div>
    </div>
  );
}

export default EachTagManager;
