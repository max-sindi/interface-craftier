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
import { Fragment } from '../Tag';
import { BsArrowsCollapse, BsArrowsExpand, BsArrowBarDown, BsArrowBarRight, BsFillPenFill } from 'react-icons/bs';
import { BiLayer } from 'react-icons/bi';
import { IoMdSquareOutline } from 'react-icons/io';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import EditMode from './EditMode';

type Props = {
  fragment: Fragment;
  deepLevel: number;
  indexInLevel: number;
  first: boolean;
  lastInLevel: boolean;
  xpath: string;
  parentXpath: string;
  // selectedNode? : Fragment | undefined;
  // unselectCurrentNode : () => void;
  // id : string;
  // update : (arg1: GlobalState) => void;
  // currentState: GlobalState
};

// type State = {
//   pastedData: string
// }

function EachTagManager({
  fragment,
  first,
  lastInLevel,
  parentXpath,
  indexInLevel,
  deepLevel,
  xpath,
  ...props
}: Props) {
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
  // console.log(currentState);
  const unselectCurrentNode = () => updateSelectedNode(undefined);
  // state = {
  //   isOpened: true, // @todo false
  //   pastedData: '',
  //   localFragmentState: null, // local state for improving performance
  // };

  // get breadcrumbsInTree() {
  //   return breadcrumbs;
  // }

  // get fragment() {
  //   return fragment;
  // }

  // get isObject() {
  //   return _.isObject(fragment);
  // }

  // componentDidMount() {
  // console.log('Mounted')
  // setState(old => ({...old, localFragmentState: fragment}))
  // }

  // componentDidUpdate() {
  // set opened
  // if(
  //   _.get(props, 'popup.fragmentState.id', true) === fragmentState.id
  //   && state.isOpened === false
  // ) setState(state => ({...state, isOpened: true}))
  // }

  const createFieldUpdater = (path: 'style' | 'attrs') => {
    return (mutator: (record: Record<string, string>) => Record<string, string>) => {
      transform((old) => {
        return { ...old, [path]: mutator(old[path]) };
      });
    };
  };

  // toggleVisibility = () => setState((state) => ({ isOpened: !state.isOpened }));

  const addNewChild = async (creator = () => createFragment()) => {
    const newFragment = creator();
    if (!newFragment.children) {
      debugger;
    }
    transform((node) => {
      return { ...node, children: [...(node as Fragment).children, newFragment] };
    });
  };

  const transformParent = (updater: (arg1: Fragment) => Fragment) => transform(updater, parentXpath);

  const deleteElement = () =>
    transformParent((parent) => ({
      ...parent,
      children: (parent as Fragment).children.filter((i, index) => index !== indexInLevel),
    }));

  // makeItText = () => transform('');

  const makeItDiv = () => transform(() => createFragment());

  const changeText = (evt: any) => transform(evt.target.value);

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

  const changeClassName = (evt: any) => transform((val) => ({ ...val, className: evt.target.value }));

  const changeClassNamesList = (className: string) => transform((val) => ({ ...val, className }));

  const wrapWithDiv = () => transform((node) => ({ ...createFragment(), children: [node] }));

  const wrapChildren = () => transform((node) => ({ ...node, children: [createFragment(fragmentState.children)] }));

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

  const selectParent = () => updateSelectedNode(_.get(currentState, `template${parentXpath}`));
  const selectChild = (child: Fragment) => updateSelectedNode(child);
  const onHighlight = () => updateHoveredNode(hoveredNode?.id === fragment.id ? undefined : fragment);
  const [textEditModeIndex, setTextEditModeIndex] = useState(-1);
  const closeTextEditMode = () => setTextEditModeIndex(-1)
  // const selectTextEditMode = (index: number) => textEditMode(fragment.children[index])

  // cloneDeepWithUniqueId = (data: Fragment) =>
  //   _.cloneDeepWith(data, (target: Fragment) =>
  //     Array.isArray(target.children)
  //       ? { ...target, id: uuid(), children: target.children.map((child) => cloneDeepWithUniqueId(child)) }
  //       : target
  //   );

  const createFragment = (children: Fragment['children'] = []): Fragment => ({
    children,
    tag: 'div',
    className: '',
    name: '',
    attrs: {},
    style: {},
    id: uuid(),
  });

  // duplicateFragment = () =>
  //   transformParent((parent) => ({
  //     ...parent,
  //     children: [...parent.children, cloneDeepWithUniqueId(parent.children[indexInLevel])],
  //   }));

  const onNameChange = ({ target: { value: name } }: any) => transform((node) => ({ ...node, name }));

  const onAttrsChange = ({ target: { value: attrs } }: any) => transform((node) => ({ ...node, attrs }));

  const onTagSelect = ({ target: { value: tag } }: any) => transform((node) => ({ ...node, tag }));

  // local fragment copy for better performance
  const [fragmentState, setFragmentState] = useState(fragment);
  // console.log(fragmentState);
  // const setCurrentState = _.debounce((...args) => _.setWith.apply(null, args), 1000);

  const save = _.debounce((newValue) => {
    _.setWith(currentState, `template.${xpath}`, newValue);
    update(currentState);
  }, 1200);

  const transform = (updater: (arg1: Fragment) => Fragment, xpathForUpdate = xpath) => {
    // const isParentTransform = xpathForUpdate === parentXpath;
    // const firstTwoArgs: [Fragment, string] = [currentState.template, `${xpathForUpdate ? `.${xpathForUpdate}` : ''}`];

    const newValue = updater(fragmentState);
    setFragmentState(newValue);
    save(newValue);

    // const setStateCb = (old) => {
    //   return { ...old, localFragmentState: newValue };
    // };

    // if (isParentTransform) {
    //   parentSetState(setStateCb);
    // } else {
    //   setState(setStateCb);
    // }

    // setCurrentState(...firstTwoArgs, newValue, undefined);
    // save();
  };

  const rendererTagSelect = () => (
    <select value={(fragment as Fragment).tag} onChange={onTagSelect}>
      {tags.map((tag) => (
        <option value={tag} label={tag} key={tag} />
      ))}
    </select>
  );

  const recursiveRenderChildren = () => {
    return fragmentState.children.map((child, index, arr) =>
      typeof child !== 'string' ? (
        <div key={index} className={``}>
          <EachTagManager
            {...props}
            first={false}
            fragment={child}
            key={(_.isObject(child) && child.id) || String(deepLevel) + String(indexInLevel)}
            deepLevel={deepLevel + 1}
            indexInLevel={index}
            parentXpath={xpath}
            lastInLevel={index === arr.length - 1}
            xpath={`${xpath}${xpath ? '.' : ''}children[${index}]`}

            // parentSetState={setState.bind(this)}
            // isParentOpened={state.isOpened}
          />
        </div>
      ) : null
    ); // @todo create component for texts
  };

  // render() {
  console.log('render tag manager ');
  // if (_.isNull(fragment)) return null;

  // const { deepLevel, indexInLevel, first, lastInLevel, parentXpath, selectedNode, unselectCurrentNode } = props;
  // const { fragment, isObject } = this;
  const isVisible = selectedNode && selectedNode.id === fragmentState.id;
  // const {isOpened} = state
  // if(!isOpened && !isParentOpened) {
  //     return recursiveRenderChildren() || null
  // }

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className={'relative min-h-20'}>
      {/* render children */}
      {recursiveRenderChildren()}

      {/* Toggle or Expand menu */}
      <div className={'absolute r-5 b-0 pointer'} onClick={toggleToolbarVisibility}>
        {toolbarCollapsed ? <BsArrowsExpand /> : <BsArrowsCollapse />}
      </div>

      {/* hide all nodes from inspecting except selected  */}
      <div className={isVisible && !toolbarCollapsed ? '' : 'd-none'}>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} forceRenderTabPanel>
          {/* 1 - General */}
          <TabPanel>
            <div className={'tabPanel'}>
              {/* Deep level */}
              <Tooltip overlay={'Deep level'} placement={'top'}>
                <div onClick={selectParent} className={'d-inline-flex align-center pointer'}>
                  <BiLayer /> <span>{deepLevel + 1}</span>
                </div>
              </Tooltip>
              {/* Child level */}
              <Tooltip overlay={'Child level'}>
                <div className={'d-inline-flex align-center ml-15'}>
                  <BiLayer className={'rotate-90'} /> <span>{indexInLevel + 1}</span>
                </div>
              </Tooltip>
              {/*Highlight*/}
              <button onClick={onHighlight} className={`ml-20 black pointer fz-13`}>
                {'Highlight'}
              </button>
              {/* Close Popup */}
              <Tooltip overlay={'Unselect'}>
                <FaRegWindowClose onClick={unselectCurrentNode} size={20} className={`r-3 t-3 z-index-5`} />
              </Tooltip>
              {/* Tag */}
              <div className={`flex align-center`}>
                <div className={`mr-5 ml-5`}>Tag:</div>
                {rendererTagSelect()}
              </div>
              {/* Name */}
              <div className="w-100-p flex align-center mt-5">
                {'Name:'}
                <textarea value={fragmentState.name || ''} onChange={onNameChange} rows={1} className={`grow-1 ml-5`} />
              </div>
              {/* Child Navigation */}
              <div data-name={'children-navigation'} className={'flex mt-5'}>
                <div>{'Children: '}</div>
                {fragment.children.map((child, index) => {
                  const editModeEnabled = textEditModeIndex === index;
                  const setEditMode = () => setTextEditModeIndex(index)

                  return (
                    <EditMode active={editModeEnabled} closeTextEditMode={closeTextEditMode} activateEditMode={setEditMode}>
                      {typeof child === 'string' ? (
                        !editModeEnabled ? (
                          /* select text child for edit */
                          <div className={'pointer'} onClick={setEditMode}>
                            <BsFillPenFill />
                            {child}
                          </div>
                        ) : (
                          <div className={'relative'}>
                            <input type='text' autoFocus={true} value={child} on />
                          </div>
                        ) 
                      ) : (
                        /* select block child */
                        <div className={'flex align-center pointer'} onClick={() => selectChild(child)}>
                          <IoMdSquareOutline />
                          {child.tag}
                        </div>
                      )}
                    </EditMode>
                  )

                  // return (
                  //   <div className={'flex mr-5'}>
                      {/*<div className={''}>*/}
                      {/*  {typeof child === 'string' ? (*/}
                      {/*    editModeEnabled ? (*/}
                      {/*    ) : (*/}
                      {/*      // <div className={'pointer'} onClick={() => setTextEditModeIndex(index)}>*/}
                      {/*      //   <BsFillPenFill />*/}
                      {/*      //   {child}*/}
                      {/*      // </div>*/}
                      {/*    )*/}
                      {/*  // ) : (*/}
                      {/*  //   <div className={'flex align-center pointer'} onClick={() => selectChild(child)}>*/}
                      {/*  //     <IoMdSquareOutline />*/}
                      {/*  //     {child.tag}*/}
                      {/*  //   </div>*/}
                      {/*  // )}*/}
                      {/*</div>*/}
                    {/*</div>*/}
                  {/*);*/}
                })}
              </div>
            </div>
          </TabPanel>

          {/*2 Classes */}
          <TabPanel>
            <div className={'tabPanel'}>
              <ClassNamesSelector onChange={changeClassNamesList} value={fragmentState.className} />
              <textarea
                value={fragmentState.className}
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
                onChange={createFieldUpdater('style')}
                value={fragmentState.style}
                fields={stylesExisting}
                title={'Styles: '}
              />
            </div>
          </TabPanel>

          {/* 4 - Attributes */}
          <TabPanel>
            <div className={'tabPanel'}>
              <ObjectEditor
                onChange={createFieldUpdater('attrs')}
                value={fragmentState.attrs}
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

        {/*<div className={cc([`relative flex-wrap align-center w-100-p fz-15`])}>*/}
        {/*  <div className={``}>*/}
        {/*{parentXpath && (*/}
        {/*  <button className={`ml-20 black pointer fz-13`} onClick={onParentClick}>*/}
        {/*    Parent*/}
        {/*  </button>*/}
        {/*)}*/}
        {/*<button className={`ml-20 black pointer fz-13`} onClick={onFocusInspectClick}>*/}
        {/*  Focus*/}
        {/*</button>*/}
        {/*<CopyToClipboard text={JSON.stringify(fragment)} onCopy={() => alert('Copied')}>*/}
        {/*  <button className={`black pointer fz-13 `} style={{ background: 'transparent', border: 0 }}>*/}
        {/*    <img src={process.env.PUBLIC_URL + '/copy-icon.svg'} className={'pointer mr-5 ml-5 w-30 h-30'} />*/}
        {/*  </button>*/}
        {/*</CopyToClipboard>*/}
        {/*</div>*/}

        {/* Object elements */}
        {/*{!first && (*/}
        {/*  <>*/}
        {/* Make text */}
        {/*<Tooltip overlay={'Make it text'} placement={`top`}>*/}
        {/*<SVGBlockToText*/}
        {/*  onClick={makeItText}*/}
        {/*  color={'#fff'}*/}
        {/*  className={'pointer ml-15'}*/}
        {/*  title={'Make it text'}*/}
        {/*/>*/}
        {/*</Tooltip>*/}

        {/*<div className={`w-100-p flex align-center`}>*/}
        {/*    <div className="mr-15">Attrs: </div>*/}
        {/*    <textarea value={fragmentState.attrs || ''} onChange={onAttrsChange} className={`w-200 grow-1`} rows={1}/>*/}
        {/*</div>*/}
        {/*_____________________________________________*/}

        {/*<div className={`flex align-flex-end h-40`}>*/}
        {/*<Tooltip overlay={'Add block'} placement={`top`}>*/}
        {/*  <AiOutlineFileAdd*/}
        {/*    size={22}*/}
        {/*    onClick={() => addNewChild(() => createFragment())}*/}
        {/*    title={'Add block +'}*/}
        {/*    className={`mr-10 pointer`}*/}
        {/*    style={{ marginBottom: 2 }}*/}
        {/*  />*/}
        {/*</Tooltip>*/}
        {/*<Tooltip*/}
        {/*  overlay={*/}
        {/*    <textarea*/}
        {/*      rows={10}*/}
        {/*      placeholder={'Add Child by Paste'}*/}
        {/*      value={state.pastedData}*/}
        {/*      onChange={changeTextPastedData}*/}
        {/*    />*/}
        {/*  }*/}
        {/*  placement={`top`}*/}
        {/*>*/}
        {/*  <AiOutlineFileAdd*/}
        {/*    size={22}*/}
        {/*    onClick={addNewChildFromPasted}*/}
        {/*    className={`mr-10 pointer`}*/}
        {/*    style={{ marginBottom: 2 }}*/}
        {/*  />*/}
        {/*</Tooltip>*/}
        {/*<Tooltip overlay={'Add text'} placement={`top`}>*/}
        {/*  <div*/}
        {/*    onClick={() => addNewChild(() => '')}*/}
        {/*    title={'Add text +'}*/}
        {/*    className={`mr-10 pointer`}*/}
        {/*    style={{ marginBottom: 2 }}*/}
        {/*  >*/}
        {/*    + A*/}
        {/*  </div>*/}
        {/*</Tooltip>*/}

        {/*<Tooltip overlay={`Duplicate`} placement={`top`}>*/}
        {/*  <img*/}
        {/*    src={process.env.PUBLIC_URL + '/duplicate-node.svg'}*/}
        {/*    onClick={duplicateFragment}*/}
        {/*    className={'pointer mr-5 ml-5 w-30 h-30'}*/}
        {/*  />*/}
        {/*</Tooltip>*/}
        {/*</div>*/}

        {/*<div className={`w-100-p flex align-center`}>*/}
        {/*  Padding:*/}
        {/*  <Resize />*/}
        {/*</div>*/}
        {/*</>*/}
        {/*)}*/}

        {/* text elements */}
        {/*{!first && !isObject && (*/}
        {/*  <>*/}
        {/*    /!* Make it div *!/*/}
        {/*    <SVGBlockToText*/}
        {/*      onClick={makeItDiv}*/}
        {/*      className={`pointer mr-10 ml-10`}*/}
        {/*      style={{ transform: 'scaleX(-1' }}*/}
        {/*      color={'#fff'}*/}
        {/*    />*/}
        {/*    <textarea onChange={changeText} className={`h-60`} rows={1} value={fragment} />*/}
        {/*  </>*/}
        {/*)}*/}

        {/* general actions */}
        {/*{!first && (*/}
        {/*  <div className={`flex align-flex-end h-40`}>*/}
        {/* Delete */}

        {/*<Tooltip overlay={'Delete'} placement={`top`}>*/}
        {/*  <img*/}
        {/*    src={process.env.PUBLIC_URL + '/trash.svg'}*/}
        {/*    className={'pointer mr-5 ml-5 w-35 h-35'}*/}
        {/*    onClick={deleteElement}*/}
        {/*  />*/}
        {/*</Tooltip>*/}
        {/* Wrap with div */}
        {/*<Tooltip overlay={'Wrap with div'} placement={`top`}>*/}
        {/*  <img*/}
        {/*    src={process.env.PUBLIC_URL + '/wrap-with-div.svg'}*/}
        {/*    onClick={wrapWithDiv}*/}
        {/*    className={'pointer mr-5 ml-5 w-25 h-25'}*/}
        {/*  />*/}
        {/*</Tooltip>*/}
        {/* Wrap children */}
        {/*<Tooltip overlay={'Wrap children'} placement={`top`}>*/}
        {/*  <img*/}
        {/*    src={process.env.PUBLIC_URL + '/wrap-children.svg'}*/}
        {/*    onClick={wrapChildren}*/}
        {/*    className={'pointer mr-5 ml-5 w-25 h-25'}*/}
        {/*  />*/}
        {/*</Tooltip>*/}

        {/* Set on parent */}
        {/*<Tooltip overlay={'Set on parent'} placement={`top`}>*/}
        {/*  <img*/}
        {/*    src={process.env.PUBLIC_URL + '/set-on-parent.svg'}*/}
        {/*    onClick={setOnParent}*/}
        {/*    className={'pointer mr-5 ml-5 w-25 h-25'}*/}
        {/*  />*/}
        {/*</Tooltip>*/}
        {/* Move upward in level */}
        {/*{indexInLevel > 0 && (*/}
        {/*  <Tooltip overlay={`Move Upward`} placement={`top`}>*/}
        {/*    <MdArrowUpward onClick={moveUpward} title={`Move Upward`} size={25} />*/}
        {/*  </Tooltip>*/}
        {/*)}*/}
        {/* Move downward in level */}
        {/*{lastInLevel === false && (*/}
        {/*  <Tooltip overlay={`Move Downward`} placement={`top`}>*/}
        {/*    <MdArrowDownward onClick={moveDownward} title={`Move Downward`} size={25} />*/}
        {/*  </Tooltip>*/}
        {/*)}*/}
        {/*</div>*/}
        {/*)}*/}
        {/*</div>*/}
        {/*  {!first && (*/}
        {/*    <>*/}
        {/*      <div className={``}>*/}
        {/*        <div className={`flex`}>*/}
        {/*          <ClassNamesSelector onChange={changeClassNamesList} value={fragmentState.className} />*/}
        {/*          <textarea*/}
        {/*            value={fragmentState.className}*/}
        {/*            onChange={changeClassName}*/}
        {/*            rows={2}*/}
        {/*            className={`grow-1 max-w-120 ml-a`}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*        <ObjectEditor*/}
        {/*          onChange={createFieldUpdater('style')}*/}
        {/*          value={fragmentState.style}*/}
        {/*          fields={stylesExisting}*/}
        {/*          title={'Styles: '}*/}
        {/*        />*/}
        {/*        <ObjectEditor*/}
        {/*          onChange={createFieldUpdater('attrs')}*/}
        {/*          value={fragmentState.attrs}*/}
        {/*          fields={attrsExisting}*/}
        {/*          title={'Attri-butes: '}*/}
        {/*        />*/}

        {/*        /!* Toggle expand *!/*/}
        {/*        /!*<div className={'ml-a mr-20 w-20'}>*!/*/}
        {/*        /!*    {_.isArray(fragmentState.children) && !_.isEmpty(fragmentState.children) && (isOpened*!/*/}
        {/*        /!*        ? <aiIcons.AiOutlineMinusSquare onClick={toggleVisibility} size={25}/>*!/*/}
        {/*        /!*        : <aiIcons.AiOutlinePlusSquare onClick={toggleVisibility} size={25}/>*!/*/}
        {/*        /!*    )}*!/*/}
        {/*        /!*</div>*!/*/}
        {/*      </div>*/}
        {/*    </>*/}
        {/*  )}*/}
      </div>
      {/* Children  */}
      {/*{first &&  && recursiveRenderChildren()}*/}
    </div>
  );
  // }
}

export default EachTagManager;
