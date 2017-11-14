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

import { detail } from '../actions/index'

const defaultMarkerSize = 40
const dummy = [{
  address: 'Jl kesono ksini',
  url: 'http://localhost:8080/vr?1200',
  image: 'https://i.ytimg.com/vi/Xx6t0gmQ_Tw/maxresdefault.jpg',
  lat: 37.7805,
  lng: -122.4100
},{
  address: 'Jl hello world',
  url: 'http://localhost:8080/vr?1500',
  image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?h=350&auto=compress&cs=tinysrgb',
  lat: 37.78000,
  lng: -122.4350
}]

class Map extends Component{
  constructor(props){
    super(props)
    this.state={}
  }

  marker(){
    return(
      <Image
        source={{uri:'https://socu.org/images/house-circle.png'}}
        style={{ width: defaultMarkerSize, height: defaultMarkerSize }}
     />
    )
  }

  vr(url){
      Alert.alert(
      `Do you want to visit this property?`,
      `this will redirect you to ${url}`,
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
          {dummy.map((m,i)=>
            <MapView.Marker
                key={i}
                coordinate={{
                  latitude: m.lat,
                  longitude: m.lng,
                }}
                onCalloutPress={()=> this.vr(m.url)}
                title={m.address}
                description={m.url}
                onPress={()=>this.props.detail(m.image)}
                >
                {this.marker()}
            </MapView.Marker>
          )}
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
  },
});

const mapStateToProps = (state) =>{
  return{

  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    detail: (image) => dispatch(detail(image))
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(Map)
