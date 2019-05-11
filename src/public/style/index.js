import {
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native'

const { width, height } = Dimensions.get('window');
import { screen, color } from '../../utils'

export default StyleSheet.create({
  grayText: {
    color: 'rgb(153, 153, 153)'
  },
  flex: {
    display: 'flex'
  },
  flexSA: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flexAIC: {
    alignItems: 'center'
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
    alignItems: 'center'
  },
  pd5: {
    padding: 5
  },
  pd8: {
    padding: 8
  },
  pd10: {
    padding: 10
  },
  ph5: {
    paddingHorizontal: 5
  },
  ph10: {
    paddingHorizontal: 10
  },
  pv5: {
    paddingVertical: 5
  },
  pv10: {
    paddingVertical: 10
  },
  mr5: {
    marginRight: 5
  },
  mr10: {
    marginRight: 10
  },
  mb5: {
    marginBottom: 5
  },
  mb10: {
    marginBottom: 10
  },
  btnContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  absolute: {
    position: 'absolute'
  },
  spacing: {
    width,
    height: 9,
    backgroundColor: '#f1f1f1',
    borderBottomWidth: screen.onePixel,
    borderBottomColor: '#e0e0e0'
  },
  border: {
    borderBottomWidth: screen.onePixel,
    borderBottomColor: color.border
  },
  noBorder: {
    borderWidth: 0,
    borderBottomWidth: 0
  },
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  // nav
  backBtn: {
    flexDirection: 'row',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImg: {
    transform: [{
      scale: 0.5,
    }],
  },
  yesImg: {
    width: 20,
    height: 20,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#991010',
    width,
    height: 50,
    alignItems: 'center'
  },
  navHeaderText: {
    color: '#fff',
    fontSize: 12
  },
  navHeaderTitle: {
    color: '#fff',
    fontSize: 16,
  },
  navHeaderRightNull: {
    width: 20
  },
  // tab bottom
  tabBottomImg: {
    transform: [{
      scale: 0.45,
    }]
  },
  // Flalist style Config
  separator: {
    width,
    height: 1,
    backgroundColor: '#eee',
  },
  loadingView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineStyle: {
    height: 2,
    backgroundColor: '#991010',
  },
  chatBubblesLeft: {
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden'
  },
  chatBubblesRight: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden'
  },
  shadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    zIndex: Platform === 'ios' ? 1 : 0
  },
  borderTopOne: {
    borderTopWidth: screen.onePixel,
    borderTopColor: color.borderOne,
  },
  inputBar: {
    height: 46,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: screen.onePixel,
    borderTopColor: color.borderOne,
    backgroundColor: color.white
  },
  borderOne: {
    width: screen.width,
    height: screen.onePixel,
    backgroundColor: color.borderOne
  },
  cell: {
    backgroundColor: '#fff',
    padding: 10
  }
});
