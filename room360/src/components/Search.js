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
      type: 'All'
    }
  }

  render(){
    return(
        <Picker
          style={styles.picker}
          selectedValue={this.state.type}
          onValueChange={(itemValue, itemIndex) => this.setState({type:itemValue})}>
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Kos" value="Kos" />
          <Picker.Item label="Gedung Kawin" value="Gedung Kawin" />
          <Picker.Item label="Gedung Acara" value="Gedung Acara" />
          <Picker.Item label="Rumah" value="Rumah" />
          <Picker.Item label="Apartment" value="Apartment" />
        </Picker>
    )
  }
}

const styles = StyleSheet.create({
  picker:{
    backgroundColor: 'black',
    color: 'white'
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
