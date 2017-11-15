import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';

import Map from '../components/Map'
import Detail from '../components/Detail'

class Home extends Component{
  constructor(props){
    super(props)
    this.state={
      index: 1
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: `Home`,
    headerTitleStyle: {
      alignSelf: 'center'
    }
  })

  render() {
    return (
        <View style={styles.container}>
          <Map />
          <Detail navigation={this.props.navigation}/>
        </View>
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

const mapStateToProps = (state) =>{
  return{

  }
}

const mapDispatchToProps = (dispatch) =>{
  return{

  }
}

export default connect (mapStateToProps,mapDispatchToProps)(Home)
