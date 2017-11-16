import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  View,
  Picker,
  StyleSheet
} from 'react-native'

class Search extends Component{
  constructor(props){
    super(props)
    this.state={
      type: 'Select Type'
    }
  }

  render(){
    return(
        <Picker
          style={styles.picker}
          selectedValue={this.state.type}
          onValueChange={(itemValue, itemIndex) => this.setState({type:itemValue})}>
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Kos" value="kos" />
          <Picker.Item label="Gedung Kawin" value="gedung kawin" />
          <Picker.Item label="Gedung Acara" value="gedung acara" />
          <Picker.Item label="Rumah" value="rumah" />
          <Picker.Item label="Apartment" value="apartment" />
        </Picker>
    )
  }
}

const styles = StyleSheet.create({
  picker:{
    backgroundColor: 'black',
    color: 'white',
  }
})

const mapStateToProps = (state) =>{
  return{

  }
}

const mapDispatchToProps = (dispatch) =>{
  return{

  }
}

export default connect (mapStateToProps,mapDispatchToProps)(Search)
