import React, { Component } from 'react';
import SvgUri from 'react-native-svg-uri';
import svgs from '../static/svgs';
import PropTypes from "prop-types";

class SvgProperties {

}

export default class Svg extends Component<SvgProperties, void> {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    color: PropTypes.string,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
  }

  render() {
    const {
      icon,
      color,
      size,
      style,
    } = this.props;
    let svgXmlData = svgs[icon];

    if (!svgXmlData) {
      let err_msg = `没有"${ this.props.icon }"这个icon，请下载最新的icon并 npm run build-svg`;
      throw new Error(err_msg);
    }
    return (
      <SvgUri
        width={ size }
        height={ size }
        svgXmlData={ svgXmlData }
        fill={ color }
        style={ style }
      />
    )
  }
}
