import React , { useEffect , useState } from 'react';
import RenderState from './MarkupRenderer';
import Manager from './StateTreeManager';
import { useDispatch } from 'react-redux';
import { Uuid } from 'src/core/store/modules/template/reducer';
import { current } from '@reduxjs/toolkit';
import axios from 'src/axios';

type IProjectContext = {
  toolbarCollapsed: boolean;
  toggleToolbarVisibility: () => void;
  nodeDragging?: Uuid
  setNodeDragging: (nodeId?: Uuid) => void
  nodeHoveredDragging?: Uuid
  setNodeHoveredDragging: (nodeId?: Uuid) => void
};

export const ProjectContext = React.createContext<IProjectContext>({} as IProjectContext);

function Project() {
  const [nodeDragging, setNodeDragging] = useState<Uuid>()
  const [nodeHoveredDragging, setNodeHoveredDragging] = useState<Uuid>()
  const [toolbarCollapsed, setToolbarCollapsed] = useState(false);
  const toggleToolbarVisibility = () => setToolbarCollapsed((prev) => !prev);
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-ignore
    window.reduxDispatch = dispatch
    // @ts-ignore
    window.logProxy = current
    // @ts-ignore
    window.axios = axios
  })

  return (
    <ProjectContext.Provider
      value={{
        toolbarCollapsed,
        toggleToolbarVisibility,
        nodeDragging,
        setNodeDragging,
        nodeHoveredDragging,
        setNodeHoveredDragging,
      }}
    >
      <>
        <div className={'scene'}>
          <RenderState />
        </div>
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
