import React, { Component } from 'react';
import './MultiSwitch.css';
import { isColor } from '../../utils';

export default class MultiSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSwitch: props.selectedSwitch || 0,
      loaded: false,
    };
  }

  onToggle(ev) {
    const id = ev && parseInt(ev.target.id, 10);
    this.props.onToggleCallback && this.props.onToggleCallback(id);
    this.setState({
      loaded: true,
      selectedSwitch: id,
    });
  }

  render() {
    const {
      texts,
      bgColor,
      eachSwitchWidth,
      fontColor,
      fontSize,
      fontWeight,
      borderColor,
      borderWidth,
      selectedSwitchColor,
      labels,
    } = this.props;
    const { selectedSwitch } = this.state;
    const noOfSwitches = texts.length || 2;
    const switchWidth = noOfSwitches * eachSwitchWidth;
    let classNameHandle = 'multi-switch-handle multi-switch-handle-move';
    let classSwitchContent = `multi-switch-content`;
    const switchStyles = {
      // width: `${switchWidth}px`,
      backgroundColor: bgColor,
      borderWidth,
      borderColor,
      // height,
    };
    const labelWidth = `${eachSwitchWidth || switchWidth / noOfSwitches}px`;

    const switches = texts.map((text, index) => {
      const description = labels[index]
      const labelStyles = {
        width: labelWidth,
        color: isColor(text) ? text : fontColor,
        fontSize,
        fontWeight,
      };

      if (selectedSwitch === index) {
        classSwitchContent = `${classSwitchContent} multi-switch-handle-color`;
        // labelStyles.color = selectedFontColor;
      }

      return (
        <label
          key={index}
          id={index}
          className={classSwitchContent}
          style={labelStyles}
          onClick={this.onToggle.bind(this)}
        >
          {description && description + ':\n'}
          {text}
        </label>
      );
    });

    const switchHandleStyles = {
      width: labelWidth,
      left: `${selectedSwitch * eachSwitchWidth + 2}px`,
      // height,
      // lineHeight: height,
      backgroundColor: selectedSwitchColor,
    };

    return (
      <div className="multi-switch-container" style={switchStyles}>
        {switches}
        <span className={classNameHandle} style={switchHandleStyles}>
          {}
        </span>
      </div>
    );
  }
}
//
// MultiSwitch.propTypes = {
//   texts: Array.isRequired,
//   selectedSwitch: ReactPropTypes.number,
//   bgColor: ReactPropTypes.string,
//   borderColor: ReactPropTypes.string,
//   borderWidth: ReactPropTypes.string,
//   fontColor: ReactPropTypes.string,
//   selectedFontColor: ReactPropTypes.string,
//   selectedSwitchColor: ReactPropTypes.string,
//   fontSize: ReactPropTypes.string,
//   fontWeight: ReactPropTypes.string,
//   onToggleCallback: ReactPropTypes.func,
//   eachSwitchWidth: ReactPropTypes.number,
//   height: ReactPropTypes.string,
// }

MultiSwitch.defaultProps = {
  texts: ['Text 1', 'Text 2'],
  // selectedSwitch: 0,
  bgColor: 'white',
  borderColor: 'black',
  borderWidth: '0.1rem',
  fontColor: 'black',
  selectedFontColor: 'yellow',
  selectedSwitchColor: 'teal',
  eachSwitchWidth: 100,
  height: '30px',
  fontSize: '12px',
  fontWeight: 'bold',
  labels: []
};
