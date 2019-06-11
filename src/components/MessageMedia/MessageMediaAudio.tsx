/**
 * @param  id 	          {long} 	  Audio ID
 * @param  access_hash 	  {long} 	  Check sum, dependant on the audio ID
 * @param  user_id 	      {int} 	  Author
 * @param  date 	        {int} 	  Date created
 * @param  duration 	    {int} 	  Duration in seconds
 * @param  mime_type 	    {string} 	MIME-type of the audio file
 * @param  Parameter      {added}   in Layer 13.
 * @param  size 	        {int} 	  File size in bytes
 * @param  dc_id 	        {int} 	  DC number
 * */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import S from '../../public/style'
import Svg from "../../lib/svg";
import { color, screen } from "../../utils";

interface Props {

}

interface State {

}


class MessageMediaAudio extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  onTouchStart = () => {

  }

  onTouchOver = () => {

  }

  onTouchMovee = () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.audioMainContainer}>
          <TouchableOpacity style={[S.flexCenter, styles.audioActionContainer]}>
            <Svg icon="audio" size="40" color={color.white}/>
          </TouchableOpacity>
        </View>
        <View style={styles.audioMainContainer}>
          <Text style={styles.Text}>按住说话</Text>
          <TouchableOpacity activeOpacity={0.5} style={[S.flexCenter, styles.audioContainer]}>
            <Svg icon="audio" size="40" color={color.white}/>
          </TouchableOpacity>
        </View>
        <View style={styles.audioMainContainer}>
          <TouchableOpacity style={[S.flexCenter, styles.audioActionContainer]}>
            <Svg icon="audio" size="40" color={color.white}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default MessageMediaAudio

const styles = StyleSheet.create({
  container: {
    height: 180,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  audioMainContainer: {
    height: 180,
    flexDirection: 'column',
    alignItems: 'center'
  },
  Text: {
    marginTop: 10,
    color: color.gray,
    fontSize: 14
  },
  audioContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    backgroundColor: color.blueLight
  },
  audioActionContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: 45,
    borderWidth: screen.onePixel,
   borderColor: color.gray,
  }
})
