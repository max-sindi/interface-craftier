import React, { Component, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// import {toJS} from 'mobx'
import classNames from 'classnames';
import { ProjectContext } from './Project';
import { Fragment } from './Fragment';
const hyperscript = require('react-hyperscript');

//todo move to utils
const logObjectFields = (object: any) => Object.keys(object).forEach((name) => console.log(name, ': ', object[name]));

type Props = {
  deepLevel: number;
  indexInLevel: number;
  node: Fragment;
  text?: string;
};

function Tag({ deepLevel, indexInLevel, node, text }: Props) {
  const { updateHoveredNode, hoveredNode, updateSelectedNode } = useContext(ProjectContext);
  const isHovered = hoveredNode && hoveredNode.id === node.id;
  const canTagHaveChildren = (tag: string) => !['input', 'img'].includes(tag);

  const recursiveRenderChildren = () =>
    !node.isText
      ? node.children.map((child, index) => <Tag node={child} deepLevel={deepLevel + 1} indexInLevel={index} />)
      : node.text;

  const attrs = {
    'data-name': node.name || '',
    'data-deep-level': deepLevel + 1,
    'data-index-in-level': indexInLevel,
    'data-id': node.id,
    title: _.capitalize(node.name || ''),
    className: classNames(node.className, isHovered && 'tag_hover'),
    ...(node.attrs || {}),
    style: node.style || {},
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

  return hyperscript(node.tag, attrs, canTagHaveChildren(node.tag) ? recursiveRenderChildren() : undefined);
}

export default Tag;
