import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types'
import { color, screen } from '../../utils'
import S from "../../public/style";

class ImageAuto extends Component {
  static propTypes = {
    uri: PropTypes.string.isRequired
  }

  state = {
    imgWidth: 0,
    imgHeight: 0,
  }

  componentDidMount() {
    const { uri } = this.props
    Image.getSize(`${ uri }`, (w, h) => {
      if (w >= screen.width - 120) {
        const scaleFactor = h / w
        const imgHeight = scaleFactor * (screen.width - 120)
        this.setState({
          imgWidth: screen.width - 120,
          imgHeight
        })
      } else {
        this.setState({
          imgWidth: w,
          imgHeight: h
        })
      }
    })
  }

  showLarge = () => {

  }

  render() {
    const { imgWidth, imgHeight } = this.state
    return (
      <TouchableOpacity onPress={ this.showLarge }
                        activeOpacity={ 0.8 }
                        style={ { marginBottom: 5 } }>
        <Image style={ { width: imgWidth, height: imgHeight } } source={ { uri: `${ this.props.uri }` } }/>
      </TouchableOpacity>
    )
  }

}

class MessageImage extends Component {
  static propTypes = {
    content: PropTypes.array,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { content, out } = this.props
    return (
      <View style={ [out ? S.chatBubblesRight : S.chatBubblesLeft, S.shadow, {
        backgroundColor: color.white,
        maxWidth: screen.width - 120,
        padding: 3
      }] }>
        {
          content.map((uri, index) => {
            return <ImageAuto uri={ uri } key={ index }/>
          })
        }
      </View>
    )
  }
}


export default MessageImage
