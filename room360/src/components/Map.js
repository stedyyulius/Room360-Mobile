/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Linking,
  Alert
} from 'react-native';

import { connect } from 'react-redux'
import MapView from 'react-native-maps'

const defaultMarkerSize = 40

class Map extends Component{
  constructor(props){
    super(props)
    this.state={
      index : 1,
      size  : defaultMarkerSize
    }
  }

  marker(size){
    return(
      <Image
        source={{uri:'https://socu.org/images/house-circle.png'}}
        style={{ width: size, height: size }}
     />
    )
  }

  vr(url){
      Alert.alert(
      `Opening ${url}?`,
      'this will open up your browser',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => Linking.openURL(url)},
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
        <MapView
          style={ styles.map }
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
            <MapView.Marker
                coordinate={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                }}
                onCalloutPress={()=> this.vr('http://localhost:8080/vr')}
                title="Rumah"
                description="http://localhost:8080/vr"
                >
                {this.marker(defaultMarkerSize)}
            </MapView.Marker>
          </MapView>
      );
    }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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

export default connect (mapStateToProps,mapDispatchToProps)(Map)
