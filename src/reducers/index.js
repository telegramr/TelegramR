'use strict';

import { combineReducers } from 'redux';
import loginIn from './loginReducer';
import counter from './counterReducer';
import orientation from './orientationReducer';
import chat from './chatReducer'
import messageMedia from './messageMediaReducer';
import messageMediaPhoto from './messageMediaPhotoReducer';

const rootReducer = combineReducers({
  loginIn,
  counter,
  orientation,
  chat,
  messageMedia,
  messageMediaPhoto
});

export default rootReducer;
