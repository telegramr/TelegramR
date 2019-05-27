import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';
// import PropTypes from 'prop-types'
import { screen } from '../../utils'


interface ImageAutoProps {
  uri: string
}

interface ImageAutoState {
  imgWidth: number;
  imgHeight: number
}

class ImageAuto extends Component<ImageAutoProps,ImageAutoState> {
  // static propTypes = {
  //   uri: PropTypes.string.isRequired
  // }

  state = {
    imgWidth: 0,
    imgHeight: 0,
  }

  componentDidMount() {
    const { uri } = this.props
    // @ts-ignore
    Image.getSize(`${ uri }`, (w, h) => {
      if (w >= screen.width - 200) {
        const scaleFactor = h / w
        const imgHeight = scaleFactor * (screen.width - 200)
        this.setState({
          imgWidth: screen.width - 200,
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


interface Props {
  uri: string;
  out?: boolean;
}

interface State {

}

class MessageSticker extends Component<Props, State> {
  // static propTypes = {
  //   uri: PropTypes.string.isRequired
  // }

  constructor(props:Props) {
    super(props)
  }

  render() {
    const { uri } = this.props
    return (
      <View style={ [{
        maxWidth: screen.width - 200,
      }] }>
        <ImageAuto uri={ uri }/>
      </View>
    )
  }
}


export default MessageSticker
