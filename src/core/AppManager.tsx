import React from 'react'
import PropTypes from 'prop-types'
import Variables from './Variables'
// import { GlobalState } from './Project';

class AppManager extends React.Component {
  static propTypes = {
    currentState: PropTypes.object,
  }

  // uploadFilesClickHandler = (fileFormData) => {
  //     const data = new FormData()
  //     data.append('file', fileFormData.value)
  //     this.props.project.loadAsset(data)
  // }

  render() {
    return (
      <div className={'app-manager pt-20 pb-20'}>
        <Variables />

        {/*<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon"*/}
        {/*     style="pointer-events: none; display: block; width: 100%; height: 100%;">*/}
        {/*  <g className="style-scope yt-icon">*/}
        {/*    <path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z" className="style-scope yt-icon"></path>*/}
        {/*  </g>*/}
        {/*</svg>*/}

        {/*<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon"*/}
        {/*     style="pointer-events: none; display: block; width: 100%; height: 100%;">*/}
        {/*  <g className="style-scope yt-icon">*/}
        {/*    <path*/}
        {/*      d="M12 3C10.34 3 9 4.37 9 6.07V11.93C9 13.63 10.34 15 12 15C13.66 15 15 13.63 15 11.93V6.07C15 4.37 13.66 3 12 3ZM18.5 12H17.5C17.5 15.03 15.03 17.5 12 17.5C8.97 17.5 6.5 15.03 6.5 12H5.5C5.5 15.24 7.89 17.93 11 18.41V21H13V18.41C16.11 17.93 18.5 15.24 18.5 12Z"*/}
        {/*      className="style-scope yt-icon"></path>*/}
        {/*  </g>*/}
        {/*</svg>*/}

        {/*<form action="http://localhost:8000/api/z/asset" method="post" encType="multipart/form-data">*/}
        {/*  <input type="file" name="asset" multiple={true}/>*/}
        {/*  <input type="submit"/>*/}

        {/*</form>*/}
      </div>
    )
  }
}

export default AppManager
