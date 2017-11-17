import React, { Component } from 'react';
import { connect } from 'react-redux'
import MapView from 'react-native-maps'
import axios from 'axios'
import {
  StyleSheet,
  Image,
  Linking,
  Alert,
  AsyncStorage
} from 'react-native';

import { detailData } from '../actions/index'
import api from '../config'

const defaultMarkerSize = 40
const defaultLocation = {
  lat: -6.180104,
  lng: 106.82198
}
const dummy = [{
  address: 'Jl kesono ksini',
  _id: '1200',
  image: 'https://i.ytimg.com/vi/Xx6t0gmQ_Tw/maxresdefault.jpg',
  price: '2.000.000/bulan',
  lat: defaultLocation.lat + 0.0029,
  lng: defaultLocation.lng,
  type: 'kos'
},{
  address: 'Jl hello world',
  _id: '1500',
  image: 'https://lh4.googleusercontent.com/_uWgFVtvSsek/TUUs53JDrCI/AAAAAAAAFCc/mXkdAs5Wdoo/s1200/Indosat.jpg',
  price: '5.000.000/hari',
  lat: defaultLocation.lat,
  lng: defaultLocation.lng,
  type: 'event'
}]

const defaultZoom = 0.019

class Map extends Component{
  constructor(props){
    super(props)
    this.state={
      initialRender: true,
      region: {
        latitude: defaultLocation.lat,
        longitude: defaultLocation.lng,
        latitudeDelta: defaultZoom,
        longitudeDelta: defaultZoom,
      }
    }
  }

  async componentWillReceiveProps(){
    await this.props.location
    if(this.props.location.non !== 'non'){
      this.setState({
        region:{
          latitude: this.props.location.lat,
          longitude: this.props.location.lng,
          latitudeDelta: defaultZoom,
          longitudeDelta: defaultZoom,
        }
      })
    }
  }

  componentDidMount(){
      const value = AsyncStorage.getItem('session');
      const headers = {}
      headers['Authorization']  = '4QRpm0bwipvxIoKnMo2S8zl41RQQwHZk'
      headers['Content-Type']   = 'application/json'
      if (value !== null){
      var url = `https://blinke-stage.apigee.net/io/users/${value}/location`;
        axios.get(url,{headers: headers})
        .then(res=>{
          alert(JSON.stringify(res))
          this.setState({
            region:{
              latitude: res.data.location.latitude,
              longitude: res.data.location.longitude,
              latitudeDelta: defaultZoom,
              longitudeDelta: defaultZoom,
            }
          })
        })
        .catch(err=>{
          this.setState({
            region:{
              latitude: defaultLocation.lat,
              longitude: defaultLocation.lng,
              latitudeDelta: defaultZoom,
              longitudeDelta: defaultZoom,
            }
          })
        })
      }
    }

  marker(type,property){
    let icon = 'http://realestate.lyongraphics.com/wp-content/uploads/house_circle.png'
    if (property === 'kos'){
      icon = 'http://realestate.lyongraphics.com/wp-content/uploads/house_circle.png'
    } else if (property === 'apartment'){
      icon = 'http://www.eatlogos.com/building_logos/png/vector_construction_3_building_logo.png'
    } else if (property === 'kantor'){
      icon = 'http://www.eatlogos.com/building_logos/png/vector_blue_building_constructions.png'
    } else if (property === 'rumah'){
      icon = 'https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/home-circle-blue-512.png'
    } else if (property === 'event'){
      icon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Capital_city_marker.svg/2000px-Capital_city_marker.svg.png'
    } else if (property === 'hotel'){
      icon = 'https://www.choicehotels.com/cms/images/choice-hotels/choice-privileges/cp-flex-rewards-icon/cp-flex-rewards-icon.png'
    }

    if(type === 'All' || type === property){
      return(
        <Image
          source={{uri: icon}}
          style={{ width: defaultMarkerSize, height: defaultMarkerSize }}
          onLayout={() => this.setState({ initialRender: false })}
          key={`${this.state.initialRender}`}
       />
      )
    }
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
          onPress={()=>this.props.detailData({image:null})}
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
                {this.marker(this.props.type,m.type)}
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
    location: state.location,
    type: state.type
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    detailData: (data) => dispatch(detailData(data))
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(Map)
