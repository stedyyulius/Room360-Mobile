import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation'

import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import store from './src/store.js'
import Home from './src/containers/Home'
import Payment from './src/containers/Payment'

const Navigator = StackNavigator({
  home    : { screen: Home },
  Payment : { screen: Payment }
});

export default class App extends Component{
  constructor(props){
    super(props)
    this.state={}
  }
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});
