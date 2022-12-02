import React from 'react';
import { ExtendedNode } from 'src/core/ExtendedNode';
import EachTagManagerProvider from 'src/core/TagManager/EachTagManagerProvider';
import TagLabel from 'src/core/TagManager/TagLabel';
import { labelFontSize, labelHeight, levelDeepPx } from 'src/utils';
import { useSelector } from 'react-redux';
import { inspectedNodeStateSelector } from 'src/core/store/modules/template/selector';
import { getColorForString } from 'generate-colors';
import InspectedNodeLabel from 'src/core/TagManager/InspectedNodeLabel';

interface IRecursivelyRenderTagLabelsProps {
  children: ExtendedNode['children'];
}

const RecursivelyRenderTagLabels = ({ children }: IRecursivelyRenderTagLabelsProps) => {
  const inspectedNodeState = useSelector(inspectedNodeStateSelector);

  return (
    <>
      {children.map((child, index) => {
        const isInspected = inspectedNodeState?.id === child.id;
        const fontSize =
          labelFontSize - Math.abs((inspectedNodeState ? -inspectedNodeState.deepIndex + child.deepIndex : 0) * 1.2);

        return (
          <div key={child.id}>
            <EachTagManagerProvider nodeId={child.id}>
              {isInspected ? (
                <div className={'label h-35'}>
                  <InspectedNodeLabel />
                </div>
              ) : (
                <div
                  className={'relative overflow-hidden'}
                  style={{
                    fontSize,
                    color: '#444',
                    height: labelHeight,
                    backgroundColor: `rgba(${getColorForString(String(child.deepIndex), { brightness: 50 }).join(
                      ','
                    )}, 0.2)`,
                  }}
                >
                  <TagLabel />
                  <div data-name={'left-bottom-corner'} className="absolute l-20-minus t-5 label-corner" />
                </div>
              )}
            </EachTagManagerProvider>
            <div style={{ paddingLeft: levelDeepPx }}>
              {child.children.length ? <RecursivelyRenderTagLabels children={child.children} /> : null}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default RecursivelyRenderTagLabels;
