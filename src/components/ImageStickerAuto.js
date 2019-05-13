import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  Alert
} from 'react-native';
import PropTypes from 'prop-types'
import { screen } from "../utils";

export default class ImageStickerAuto extends Component {
  static propTypes = {
    uri: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      imgWidth: 0,
      imgHeight: 0
    }
  }

  componentDidMount() {
    const { uri } = this.props
    Image.getSize(`${ uri }`, (w, h) => {
      // TODO: auto adjust
      // const adjust = w <= (screen.width - 2 * 10) / 5 ? w : h / w * (screen.width - 120)
      this.setState({
        imgWidth: (screen.width - 2 * 10) / 5,
        imgHeight: (screen.width - 2 * 10) / 5
      })
    })
  }

  render() {
    const { imgWidth, imgHeight } = this.state
    return <Image source={ { uri: `${ this.props.uri }` } }
                  style={ { width: imgWidth, height: imgHeight, borderRadius: 4 } }/>
  }
}
