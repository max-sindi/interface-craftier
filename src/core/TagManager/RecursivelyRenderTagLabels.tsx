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

interface IRecursivelyRenderTagLabelsProps {
  children: ExtendedNode['children'];
}

const RecursivelyRenderTagLabels = ({ children }: IRecursivelyRenderTagLabelsProps) => {
  const inspectedNodeState = useSelector(inspectedNodeStateSelector);
  const dispatch = useDispatch();

  return (
    <>
      {children.map((node, index) => {
        const isInspected = inspectedNodeState?.id === node.id;
        const levelDifferenceToInspectedNode = Math.abs(
          inspectedNodeState ? -inspectedNodeState.deepIndex + node.deepIndex : 0
        );
        const fontSize = labelFontSize - levelDifferenceToInspectedNode * 0.12;
        const toggleChildrenCollapsed = () => {
          dispatch(toggleChildrenCollapsedAction(node.id));
          dispatch(updateInspectedNodeAction(node.id));
        };

        return (
          <Fragment key={node.id}>
            <EachTagManagerProvider nodeId={node.id}>
              <div className={'flex align-center w-100-p'} data-name={'RecursivelyRenderTagLabels + ' + node.id}>
                {!node.isText && !!node.children.length ? (
                  <div
                    data-name={'Tag collapser button'}
                    className={`w-0`}
                    style={{ position: 'relative', left: node.deepIndex * levelDeepPx - 10 }}
                  >
                    <AiFillCaretRight
                      className={'pointer'}
                      style={{ transform: `rotate(${node.childrenCollapsed ? 0 : 45}deg)`, transition: 'all 0.4s' }}
                      onClick={toggleChildrenCollapsed}
                    />
                  </div>
                ) : null}

                <div
                  className={clsx(['relative overflow-hidden w-100-p', isInspected && 'label'])}
                  style={{
                    fontSize,
                    color: isInspected ? '#fff' : '#444',
                    minHeight: isInspected ? labelHeight + 10 : labelHeight,
                    transition: `all 0.${3 + levelDifferenceToInspectedNode}s`,
                    background: isInspected ? greenColor : 'transparent',
                    marginLeft: !isInspected ? 0 : node.deepIndex * levelDeepPx + 10
                  }}
                >
                  {isInspected ? <InspectedNodeLabel /> : <TagLabel />}
                </div>
              </div>
            </EachTagManagerProvider>
            {!!node.children.length && !node.childrenCollapsed && (
              <div className={`w-100-p`}>
                <RecursivelyRenderTagLabels children={node.children} />
              </div>
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export default RecursivelyRenderTagLabels;

// backgroundColor: `rgba(${getColorForString(String(child.deepIndex), { brightness: 50 }).join(
//   ','
// )}, 0.2)`,
