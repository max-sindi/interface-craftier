import React from 'react'
import { ResizableBox } from 'react-resizable'
// import { useResizeDetector } from 'react-resize-detector';

// {}
const Resize = (props) => {
  const [dimensions, setDimensions] = React.useState({width: 100, height: 100})



  function onResize(event, { size }) {
    debugger
    setDimensions({...size})
  }

  return (
    <ResizableBox
      {...dimensions}
      onResize={onResize}
      style={{background: 'red'}}
      minConstraints={[100, 100]}
      maxConstraints={[300, 300]}

    />
  )
}

export default Resize