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
      {children.map((child, index) => {
        const isInspected = inspectedNodeState?.id === child.id;
        const levelDifferenceToInspectedNode = Math.abs(
          inspectedNodeState ? -inspectedNodeState.deepIndex + child.deepIndex : 0
        );
        const fontSize = labelFontSize - levelDifferenceToInspectedNode * 0.12;
        const toggleChildrenCollapsed = () => {
          dispatch(toggleChildrenCollapsedAction(child.id));
          dispatch(updateInspectedNodeAction(child.id));
        };

        return (
          <Fragment key={child.id}>
            <EachTagManagerProvider nodeId={child.id}>
              <div className={'flex align-center'}>
                {!child.isText && !!child.children.length ? (
                  <AiFillCaretRight
                    className={'pointer'}
                    style={{ transform: `rotate(${child.childrenCollapsed ? 0 : 45}deg)`, transition: 'all 0.4s' }}
                    onClick={toggleChildrenCollapsed}
                  />
                ) : (
                  <div className="w-15" />
                )}

                <div
                  className={clsx(['relative overflow-hidden', isInspected && 'label'])}
                  style={{
                    fontSize,
                    color: isInspected ? '#fff' : '#444',
                    minHeight: isInspected ? labelHeight + 10 : labelHeight,
                    transition: `all 0.${3 + levelDifferenceToInspectedNode}s`,
                    background: isInspected ? greenColor : 'transparent',
                  }}
                >
                  {isInspected ? <InspectedNodeLabel /> : <TagLabel />}
                </div>
              </div>
            </EachTagManagerProvider>
            {!!child.children.length && !child.childrenCollapsed && (
              <div style={{ paddingLeft: levelDeepPx }}>
                <RecursivelyRenderTagLabels children={child.children} />
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
