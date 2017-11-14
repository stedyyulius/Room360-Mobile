/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import { Provider } from 'react-redux'

import store from './src/store.js'
import Map from './src/components/Map'
import Detail from './src/components/Detail'

export default class App extends Component{
  constructor(props){
    super(props)
    this.state={
      index: 1
    }
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Map />
          <Detail />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image:{
      width: 120,
      height: 120
    }
});
