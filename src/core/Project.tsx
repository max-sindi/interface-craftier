import React , { useEffect , useState } from 'react';
import RenderState from './MarkupRenderer';
import Manager from './StateTreeManager';
import { Fragment, RootFragment } from './Tag';
import Variables, { IVariables } from './Variables';
import { stateProxy } from 'react-state-proxy';

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

export type GlobalState = {
  template: Fragment;
  variables: IVariables;
};

enum StorageMap {
  // Variables = 'variables',
  State = 'state',
}

const initialState: GlobalState = {
  variables: {},
  template: {
    attrs: {},
    children: [
      {
        attrs: {},
        children: ['Child of Root node'],
        className: '',
        id: '2',
        name: 'Child of Root dadada',
        style: {},
        tag: 'div',
      },
    ],
    className: '',
    id: '1',
    name: 'Root Node',
    style: {},
    tag: 'div',
  } as RootFragment,
};

type IProjectContext = {
  currentState: GlobalState;
  update: (arg1: GlobalState) => void;
  hoveredNode?: Fragment;
  selectedNode?: Fragment;
  updateHoveredNode: (node?: Fragment) => void;
  updateSelectedNode: (node?: Fragment) => void;
  toolbarCollapsed: boolean
  toggleToolbarVisibility: () => void
};

type State = {
  currentState: IProjectContext['currentState'];
  hoveredNode?: IProjectContext['hoveredNode'];
  selectedNode?: IProjectContext['selectedNode'];
};

export const ProjectContext = React.createContext<IProjectContext>({} as IProjectContext);

function Project() {
  // state: State = { ...initialSelectingState, currentState: initialState };
  // mouseCoords = { ...initialMouseCoords };

  // get mouseX() {
  //   return this.state.mouseX && this.state.mouseX - 300;
  // }
  // get mouseY() {
  //   return this.state.mouseX && this.state.mouseY;
  // }

  const state: State = stateProxy({
    currentState : initialState ,
    hoveredNode : undefined ,
    selectedNode : undefined ,
    __init__() {
      const currentStateFromStorage = localStorage.getItem(StorageMap.State);
      console.log('state from storage', currentStateFromStorage);
      if (!currentStateFromStorage) {
        this.currentState = initialState
        localStorage.setItem(StorageMap.State, JSON.stringify(initialState));
      } else {
        try {
          this.currentState = JSON.parse( currentStateFromStorage ) as GlobalState
        } catch ( e ) {
          console.error( e );
        }
      }
    }
  })

  const updateState: IProjectContext['update'] = (currentState) => {
    // setTimeout(() =>
      localStorage.setItem(StorageMap.State, JSON.stringify(currentState))
      // , 100);
  };

  const updateHoveredNode: IProjectContext['updateHoveredNode'] = (hoveredNode) =>
    state.hoveredNode = hoveredNode
  const updateSelectedNode: IProjectContext['updateSelectedNode'] = (selectedNode) => {
    state.hoveredNode = selectedNode
    state.selectedNode = selectedNode
  };

  // useEffect(() => {
  //   syncState();
  // }, [])

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

  // render() {
  const { currentState, hoveredNode, selectedNode } = state;
  const [toolbarCollapsed, setToolbarCollapsed] = useState(false)
  const toggleToolbarVisibility = () => setToolbarCollapsed(prev => !prev)

    return (
      <ProjectContext.Provider
        value={{
          currentState,
          update: updateState,
          hoveredNode,
          updateHoveredNode: updateHoveredNode,
          selectedNode,
          updateSelectedNode: updateSelectedNode,
          toolbarCollapsed,
          toggleToolbarVisibility,
        }}
      >
        <>
          <RenderState />
          <Manager />
        {/*<div onMouseDown={this.startSelect} onMouseUp={this.stopSelect} className={`w-100-p relative`} style={{}}>*/}
          {/*startY: { this.state.startY}, startX: {this.state.startX}, <br/>*/}
          {/*mouseY: {this.mouseY},  mouseX: {this.mouseX},*/}
          {/*<div style={{position: 'absolute', ...this.getFrameDimentions, background: '#ff7341f5'}}/>*/}

          {/* current state view */}
          {/*{currentState && <RenderState template={currentState.template}}*/}

          {/*<button onClick={this.saveState} className={`fixed t-60 r-40`}>*/}
          {/*  Save*/}
          {/*</button>*/}
        </>
        {/*</div>*/}
      </ProjectContext.Provider>
    );
  // }
}

export default Project;
