import React, { useEffect, useState } from 'react';
import RenderState from './MarkupRenderer';
import Manager from './StateTreeManager';
import { IVariables } from './Variables';
import { stateProxy } from 'react-state-proxy';
import { Fragment } from './Fragment';

export type GlobalState = {
  template: Fragment;
  variables: IVariables;
};

enum StorageMap {
  State = 'state',
}

const initialGlobalState: GlobalState = {
  variables: {},
  template: new Fragment({
    children: [
      new Fragment({
        children: [
          new Fragment({
            tag: 'span',
            isText: true,
            text: 'tratatat',
          }),
        ],
      }),
    ],
  }),
};

type IProjectContext = {
  currentState: GlobalState;
  update: (arg1: GlobalState) => void;
  hoveredNode?: Fragment;
  selectedNode?: Fragment;
  updateHoveredNode: (node?: Fragment) => void;
  updateSelectedNode: (node?: Fragment) => void;
  toolbarCollapsed: boolean;
  toggleToolbarVisibility: () => void;
};

type State = {
  currentState: IProjectContext['currentState'];
  hoveredNode?: IProjectContext['hoveredNode'];
  selectedNode?: IProjectContext['selectedNode'];
};

export const ProjectContext = React.createContext<IProjectContext>({} as IProjectContext);

function Project() {
  const state: State = stateProxy({
    currentState: initialGlobalState,
    hoveredNode: undefined,
    selectedNode: undefined,
    __init__() {
      const currentStateFromStorage = localStorage.getItem(StorageMap.State);
      // console.log('state from storage', currentStateFromStorage);
      if (!currentStateFromStorage) {
        this.currentState = initialGlobalState;
        // console.log(initialGlobalState);
        localStorage.setItem(StorageMap.State, JSON.stringify(initialGlobalState));
      } else {
        try {
          this.currentState = JSON.parse(currentStateFromStorage) as GlobalState;
          console.log(JSON.parse(currentStateFromStorage));
        } catch (e) {
          console.error(e);
        }
      }
    },
  });

  const updateState: IProjectContext['update'] = (currentState) => {
    setTimeout(() => {
      localStorage.setItem(StorageMap.State, JSON.stringify(currentState));
    }, 100);
  };

  const updateHoveredNode: IProjectContext['updateHoveredNode'] = (hoveredNode) => {
    if (!hoveredNode || hoveredNode.id !== state.hoveredNode?.id) {
      state.hoveredNode = hoveredNode;
    }
  };
  const updateSelectedNode: IProjectContext['updateSelectedNode'] = (selectedNode) => {
    state.hoveredNode = selectedNode;
    state.selectedNode = selectedNode;
  };

  const { currentState, hoveredNode, selectedNode } = state;
  const [toolbarCollapsed, setToolbarCollapsed] = useState(false);
  const toggleToolbarVisibility = () => setToolbarCollapsed((prev) => !prev);

  return (
    <ProjectContext.Provider
      value={{
        currentState,
        update: updateState,
        hoveredNode,
        updateHoveredNode,
        selectedNode,
        updateSelectedNode: updateSelectedNode,
        toolbarCollapsed,
        toggleToolbarVisibility,
      }}
    >
      <>
        <RenderState />
        <Manager />
      </>
    </ProjectContext.Provider>
  );
}

export default Project;

// const initialSelectingState = {
//   updateInterval: null as unknown as ReturnType<typeof setInterval>,
//   mouseX: 0,
//   mouseY: 0,
//   startX: 0,
//   startY: 0,
// };
// const initialMouseCoords = {
//   X: 0,
//   Y: 0,
// };

// state: State = { ...initialSelectingState, currentState: initialState };
// mouseCoords = { ...initialMouseCoords };

// get mouseX() {
//   return this.state.mouseX && this.state.mouseX - 300;
// }
// get mouseY() {
//   return this.state.mouseX && this.state.mouseY;
// }

// startSelect = (evt: any) => {
//   const { clientY } = evt;
//   const clientX = evt.clientX - 300; // - 300 sidebar width for now
//   this.mouseCoords = { ...initialMouseCoords };
//   this.setState((state) => ({ ...state, ...initialSelectingState, startX: clientX, startY: clientY }));
//   this.startHuntTheValue();
// };

// startHuntTheValue = () => {
//   const updateInterval = setInterval(
//     () =>
//       this.setState({
//         mouseX: this.mouseCoords.X,
//         mouseY: this.mouseCoords.Y,
//       }),
//     30
//   );
//
//   this.setState({ updateInterval });
//   window.addEventListener('mousemove', this.mouseMoveHandler);
// };

// mouseMoveHandler = (evt: any) => {
//   this.mouseCoords.X = evt.clientX;
//   this.mouseCoords.Y = evt.clientY;
// };

// stopSelect = () => {
//   this.setState((st) => {
//     st.updateInterval && clearInterval(st.updateInterval);
//
//     return {
//       ...st,
//       updateInterval: null as unknown as ReturnType<typeof setInterval>,
//     };
//   });
//   window.removeEventListener('mousemove', this.mouseMoveHandler);
//   saveElement();
//
//   // start collect results of area selecting
//   function saveElement() {}
// };

// get getFrameDimentions() {
//   const { state } = this;
//   const XDiff = this.mouseX - state.startX;
//   const YDiff = this.mouseY - state.startY;
//   const isWidthPositive = XDiff >= 0;
//   const isHeightPositive = YDiff >= 0;
//   // console.log(Math.abs(XDiff), Math.abs(YDiff))
//
//   return {
//     top: isHeightPositive ? state.startY : this.mouseY,
//     left: isWidthPositive ? state.startX : this.mouseX,
//     width: this.mouseX ? Math.abs(XDiff) : 0,
//     height: this.mouseY ? Math.abs(YDiff) : 0,
//   };
// }

// <div onMouseDown={this.startSelect} onMouseUp={this.stopSelect} className={`w-100-p relative`} style={{}}>
//   startY: { this.state.startY}, startX: {this.state.startX}, <br/>
//   mouseY: {this.mouseY},  mouseX: {this.mouseX},
//   <div style={{position: 'absolute', ...this.getFrameDimentions, background: '#ff7341f5'}}/>
// </div>
