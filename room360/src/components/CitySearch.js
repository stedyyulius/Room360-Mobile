import React, { Component } from 'react'
import { connect } from 'react-redux'
import Geocoder from 'react-native-geocoder';
import axios from 'axios'
import{
  View,
  StyleSheet,
  TextInput
} from 'react-native'

import { getLocation } from '../actions/index'

class CitySearch extends Component{
  constructor(props){
    super(props)
    this.state={}
  }

  searchCity(loc){
    if(loc.length === 0){
      this.props.getLocation({
        lat: -6.180104,
        lng: 106.82198
      })
    } else{
      Geocoder.geocodeAddress(loc).then(res => {
        this.props.getLocation({
          lat: res[0].position.lat,
          lng: res[0].position.lng
        })
      })
    }
  }


  render(){
    return(
      <View>
        <TextInput
        style={styles.searchBar}
        placeholder="Search Place"
        onChangeText={(e)=> this.searchCity(e)}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchBar:{
    backgroundColor: 'white',
  }
})


const mapStateToProps = (state) =>{
  return{

  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    getLocation: (loc) => dispatch(getLocation(loc))
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(CitySearch)
