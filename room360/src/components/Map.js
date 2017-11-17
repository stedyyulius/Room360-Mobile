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

const defaultMarkerSize = 50
const defaultLocation = {
  lat: -6.180104,
  lng: 106.82198
}
const dummy = [{
  name: 'Orori Gathering',
  address: ' Jl Abdul Muis No.46, RT.2/RW.3, Petojo Selatan, Gambir, RT.2/RW.3, Petojo Sel., Gambir, Jakarta, Daerah Khusus Ibukota Jakarta 10160',
  _id: '1000',
  image: 'https://pbs.twimg.com/profile_images/2220184700/LOGO_ORORI-03.jpg',
  lat: -6.174688,
  lng: 106.820000,
  type: 'meetup',
  url:'www.orori.com',
  description: 'Gathering Orori employees',
  date: '20 November 2017'
},{
  name: 'IWIC HACKHATON',
  address: 'Indosat KPPTI, Jl. Medan Merdeka Barat, Jakarta Pusat 10110',
  _id: '1001',
  image: 'https://lh4.googleusercontent.com/_uWgFVtvSsek/TUUs53JDrCI/AAAAAAAAFCc/mXkdAs5Wdoo/s1200/Indosat.jpg',
  lat: defaultLocation.lat,
  lng: defaultLocation.lng,
  type: 'competition',
  url: 'https://iwic.indosatooredoo.com/',
  description: 'Tahun ini Indosat Ooredoo menyelenggarakan kembali acara HACKATHON IWIC 11 sebagai bagian dari kontes inovasi IWIC 11 (Indosat Ooredoo Wireless Innovation Contest ke-11).',
  date: '17 November 2017'
},{
  name: 'Angel sweet 17th Party',
  address: 'Jl. Boulevard Gading Serpong, Sentra Gading Serpong, Pakulonan Barat, Kelapa Dua, Pakulonan Bar., Klp. Dua, Tangerang,',
  _id: '1002',
  image: 'https://media-cdn.tripadvisor.com/media/photo-s/03/aa/43/2a/summarecon-mal-serpong.jpg',
  lat: -6.240338,
  lng: 106.628022,
  type: 'competition',
  url: 'https://iwic.indosatooredoo.com/',
  description: 'Angel swwet 17th bitrhday party invite every penabur alumnus',
  date: '25 November 2017'
}]

const defaultZoom = 0.009

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

  marker(type,event,image){
    // let icon = 'http://realestate.lyongraphics.com/wp-content/uploads/house_circle.png'
    // if (property === 'kos'){
    //   icon = 'http://realestate.lyongraphics.com/wp-content/uploads/house_circle.png'
    // } else if (property === 'apartment'){
    //   icon = 'http://www.eatlogos.com/building_logos/png/vector_construction_3_building_logo.png'
    // } else if (property === 'kantor'){
    //   icon = 'http://www.eatlogos.com/building_logos/png/vector_blue_building_constructions.png'
    // } else if (property === 'rumah'){
    //   icon = 'https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/home-circle-blue-512.png'
    // } else if (property === 'event'){
    //   icon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Capital_city_marker.svg/2000px-Capital_city_marker.svg.png'
    // } else if (property === 'hotel'){
    //   icon = 'https://www.choicehotels.com/cms/images/choice-hotels/choice-privileges/cp-flex-rewards-icon/cp-flex-rewards-icon.png'
    // }

    if(type === 'All' || type === event){
      return(
        <Image
          source={{uri: image}}
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
                title={m.name}
                description={m.date}
                onPress={()=>this.props.detailData(m)}
                >
                {this.marker(this.props.type,m.type,m.image)}
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
    type: state.type,
    event: state.event
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    detailData: (data) => dispatch(detailData(data))
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(Map)
