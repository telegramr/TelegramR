import {StyleSheet} from 'react-native';
import { Colors } from './index';

export default StyleSheet.create({
  flexSA: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flexAIC: {
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexCol: {
    flexDirection: 'column',
  },
  flexSB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexStart: {
    justifyContent: 'flex-start',
  },
  flexCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accentMainText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.colorAccentMain,
  },
  hashTagText: {
    color: Colors.colorAccentMain,
  },
  italicText: {
    fontStyle: 'italic',
  },
  boldText: {
    fontWeight: 'bold',
  },
  urlText: {
    color: Colors.chat_inSiteNameText,
  },
  urlLink: {
    color: Colors.chat_inSiteNameText,
    textDecorationLine: 'underline',
  },
  messageShadow: {
    shadowColor: 'rgba(58,55,55,0.1)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    elevation: 2,
  },
  chatsName: {
    color: Colors.chatsName,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
  chatsTitle: {
    color: Colors.chatsTitle,
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    // fontWeight: '600',
  },
});
