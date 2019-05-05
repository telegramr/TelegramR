'use strict';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';


const key = 'session'

export default class SessionDao extends Component {
  static save(value: Object, callback?: ?(error: ?Error) => void) {
    return AsyncStorage.setItem(key, JSON.stringify(value), callback);
  }

  static get(): string {
    return AsyncStorage.getItem(key).then((value) => {
      return JSON.parse(value);
    })
  }

  static update(value, callback?: ?(error: ?Error) => void) {
    this.get().then((item) => {
      value = typeof value === 'string' ? value : Object.assign({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value), callback);
    })
  }

  static delete(callback?: ?(error: ?Error) => void) {
    AsyncStorage.removeItem(key, callback);
  }
}
