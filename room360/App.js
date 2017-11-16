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
import Login from './src/containers/Login'
import Home from './src/containers/Home'
import MessageForm from './src/containers/MessageForm'

const Navigator = StackNavigator({
  Login        : { screen: Login },
  Room360      : { screen: Home },
  MessageForm  : { screen: MessageForm }
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
