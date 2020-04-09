import React, {Component} from 'react';
import SvgUri from 'react-native-svg-uri';
import svgs from '../static/svgs';
import PropTypes from 'prop-types';

export default class Svg extends Component {
  static propTypes = {
    style: PropTypes.object,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    svgXmlData: PropTypes.string,
    source: PropTypes.any,
    fill: PropTypes.string,
  };

  render() {
    const {icon, fill, size, style} = this.props;
    let svgXmlData = svgs[icon];

    if (!svgXmlData) {
      let err_msg = `svg icon ${this.props.icon} not found`;
      throw new Error(err_msg);
    }
    return (
      <SvgUri
        width={size}
        height={size}
        svgXmlData={svgXmlData}
        fill={fill}
        style={style}
      />
    );
  }
}
