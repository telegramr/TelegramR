import React, {Component} from 'react';
import {
  Image,
} from 'react-native';
import {screen} from '../utils'
import PropTypes from 'prop-types'

export default class ImageAuto extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    uri: PropTypes.string.isRequired
  }

  state = {
    imgWidth: 0,
    imgHeight: 0,
  }

  componentDidMount() {
    const {width, height, uri} = this.props

    Image.getSize(`${uri}`, (w, h) => {
      if(width) {
        const scaleFactor = w / width
        const imageHeight = h * scaleFactor
        this.setState({imgWidth: width, imgHeight: imageHeight})
      } else if (height) {
        const scaleFactor = height / h
        const imageWidth = w * scaleFactor
        this.setState({imgWidth: imageWidth, imgHeight: height})
      } else {
        const screenWidth = screen.width
        const scaleFactor = w / screenWidth
        const imageHeight = h / scaleFactor
        this.setState({imgWidth: screenWidth, imgHeight: imageHeight})
      }
    })
  }

  render() {
    const {imgWidth, imgHeight} = this.state
    return (
      <Image style={{width: imgWidth, height: imgHeight}} source={{uri: `${this.props.uri}`}}/>
    )
  }
}
