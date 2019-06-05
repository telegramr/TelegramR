import React, { Component } from 'react'
import { Provider } from 'react-redux';
import AppContainer from './src/container/App';
import ImageViewer from './src/components/ImageViewer'
import configureStore from './src/store/ConfigureStore'


const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <AppContainer/>
        <ImageViewer />
      </Provider>
    )
  }
}
