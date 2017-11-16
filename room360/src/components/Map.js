import React, { Component } from 'react';
import { connect } from 'react-redux'
import MapView from 'react-native-maps'
import axios from 'axios'
import {
  StyleSheet,
  Image,
  Linking,
  Alert
} from 'react-native';

import { detailData } from '../actions/index'
import api from '../config'

const defaultMarkerSize = 40
const dummy = [{
  address: 'Jl kesono ksini',
  _id: '1200',
  image: 'https://i.ytimg.com/vi/Xx6t0gmQ_Tw/maxresdefault.jpg',
  price: '2.000.000/bulan',
  lat: -6.1744,
  lng: 106.8294
},{
  address: 'Jl hello world',
  _id: '1500',
  image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?h=350&auto=compress&cs=tinysrgb',
  price: '5.000.000/bulan',
  lat: -6.1784,
  lng: 106.8294
}]

const defaultZoom = 0.0090

class Map extends Component{
  constructor(props){
    super(props)
    this.state={
      initialRender: true,
      region: {
        latitude: -6.1744,
        longitude: 106.8294,
        latitudeDelta: defaultZoom,
        longitudeDelta: defaultZoom,
      }
    }
  }

  async componentWillReceiveProps(){
    await this.props.location
    this.setState({
      region:{
        latitude: this.props.location.lat,
        longitude: this.props.location.lng,
        latitudeDelta: defaultZoom,
        longitudeDelta: defaultZoom,
      }
    })
  }

  componentWillMount(){
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     alert(position);
    //    },
    //    (error) => {
    //     alert(error)
    //   },
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
    // );
    var url = 'https://freegeoip.net/json/';
    axios.get(url)
    .then(res=>{
      this.setState({
        region:{
          latitude: res.data.latitude,
          longitude: res.data.longitude,
          latitudeDelta: defaultZoom,
          longitudeDelta: defaultZoom,
        }
      })
    })
  }

  marker(){
    return(
      <Image
        source={require('../assets/home-circle-blue-512.png')}
        style={{ width: defaultMarkerSize, height: defaultMarkerSize }}
        onLayout={() => this.setState({ initialRender: false })}
        key={`${this.state.initialRender}`}
     />
    )
  }

  vr(_id){
      Alert.alert(
      `Do you want to visit this property?`,
      `this will redirect you to ${api}?${_id}`,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => Linking.openURL(`${api}?${_id}`)},
      ],
      { cancelable: false }
    )
  }


  render() {
    return (
        <MapView
          style={ styles.map }
          region={this.state.region}
          >
          {dummy.map((m,i)=>
            <MapView.Marker
                key={i}
                coordinate={{
                  latitude: m.lat,
                  longitude: m.lng,
                }}
                onCalloutPress={()=> this.vr(m._id)}
                title={m.address}
                description={m.price}
                onPress={()=>this.props.detailData(m)}
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
    location: state.location
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    detailData: (data) => dispatch(detailData(data))
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(Map)
