import React, { Component, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// import {toJS} from 'mobx'
import classNames from 'classnames';
import { ProjectContext } from './Project';
const hyperscript = require('react-hyperscript');

//todo move to utils
const logObjectFields = (object: any) => Object.keys(object).forEach((name) => console.log(name, ': ', object[name]));

type Attrs = {};

export type Fragment = {
  name: string;
  id: string;
  className: string;
  attrs: Attrs;
  style: { [key: string]: any };
  tag: string;
  children: (string | Fragment)[];
};

// export type TextNode = NodeProto & { children: string }
// export type ObjectNode = NodeProto & { children: (ObjectNode | TextNode)[]}
// export type Fragment = TextNode | ObjectNode
export type RootFragment = Fragment & { children: Fragment[] };

type Props = {
  deepLevel: number;
  indexInLevel: number;
  node: Fragment;
};

function Tag({ deepLevel, indexInLevel, node }: Props) {
  const { updateHoveredNode, hoveredNode, updateSelectedNode } = useContext(ProjectContext);

  // static propTypes = {
  //   indexInLevel: PropTypes.number,
  //   deepLevel: PropTypes.number,
  // }
  //
  // static defaultProps = {
  //   indexInLevel: 0,
  //   deepLevel: 0,
  // }
  //
  // initialState = {
  //   hover: false,
  // }
  //
  // state = initialState

  // componentDidUpdate() {
  //   // @ts-ignore
  //   const shouldHighlight =_.get(props, 'popup.highlightNode.id', true) === _.get(props, `node.id`, false)
  //     && !state.hover
  //
  //   if(shouldHighlight) {
  //     setState(s => ({...s, hover: true}))
  //   } else {
  //     // turn off highlight
  //     // popup.highlightNode && state.hover && setState(s => ({...s, hover: false}))
  //   }
  // }

  const isHovered = hoveredNode && hoveredNode.id === node.id;

  const attrs = {
    'data-name': node.name || '',
    'data-deep-level': deepLevel + 1,
    'data-index-in-level': indexInLevel,
    'data-id': node.id,
    title: _.capitalize(node.name || ''),
    className: classNames(node.className, isHovered && 'tag_hover'),
    ...(node.attrs || {}),
    style: node.style || {},
    // onClick: (event: any) => {
    //   event.stopPropagation()
    //   !event.metaKey && event.preventDefault() // enable native click with ctrl
    //   const top = event.clientY + window.scrollY
    //   const left = event.clientX + window.scrollX
    //   setPopup({
    //     coords: {top, left},
    //     node: node,
    //     highlightNode: node,
    //     domElement: event.target
    //   })
    // },
    onMouseOut: (event: any) => {
      event.stopPropagation();
      updateHoveredNode(undefined);
    },
    onMouseOver: (event: any) => {
      event.stopPropagation();
      updateHoveredNode(node);
    },
    onClick: (event: any) => {
      event.stopPropagation();
      updateSelectedNode(node);
    },
  };

  const recursiveRenderChildren = () =>
    node.children.map((child, index) =>
      typeof child === 'string' ? child : <Tag node={child} deepLevel={deepLevel + 1} indexInLevel={index} />
    );

  const canTagHaveChildren = (tag: string) => !['input', 'img'].includes(tag);

  // render() {
  // todo find reason why tag can be undefined, probably it happens with root node
  return hyperscript(node.tag, attrs, canTagHaveChildren(node.tag) ? recursiveRenderChildren() : undefined);
  // }
}

export default Tag;
