import React, { Fragment } from 'react';
import { ExtendedNode } from 'src/core/ExtendedNode';
import EachTagManagerProvider from 'src/core/TagManager/EachTagManagerProvider';
import TagLabel from 'src/core/TagManager/TagLabel';
import { greenColor, labelFontSize, labelHeight, levelDeepPx } from 'src/utils';
import { useDispatch, useSelector } from 'react-redux';
import { inspectedNodeStateSelector } from 'src/core/store/modules/template/selector';
import InspectedNodeLabel from 'src/core/TagManager/InspectedNodeLabel';
import clsx from 'classnames';
import { AiFillCaretRight } from 'react-icons/ai';
import { toggleChildrenCollapsedAction, updateInspectedNodeAction } from 'src/core/store/modules/template/actions';
import ChildTagNode from 'src/core/TagManager/ChildTagNode';

interface IRecursivelyRenderTagLabelsProps {
  children: ExtendedNode['children'];
}

const RecursivelyRenderTagLabels = ({ children }: IRecursivelyRenderTagLabelsProps) => {


  return (
    <>
      {children.map((node, index) => {
        return (
          <EachTagManagerProvider nodeId={node.id}>
            <ChildTagNode/>
          </EachTagManagerProvider>
        )
      })}
    </>
  );
};

export default RecursivelyRenderTagLabels;

// backgroundColor: `rgba(${getColorForString(String(child.deepIndex), { brightness: 50 }).join(
//   ','
// )}, 0.2)`,
