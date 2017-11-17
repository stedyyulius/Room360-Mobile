import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Picker,
  StyleSheet
} from 'react-native'

import { searchType } from '../actions/index'

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
          selectedValue={this.props.type}
          onValueChange={(itemValue, itemIndex) => this.props.searchType(itemValue)}>
          <Picker.Item label="Select Property Type" value="All" />
          <Picker.Item label="Kos" value="kos" />
          <Picker.Item label="kantor" value="kantor" />
          <Picker.Item label="Event" value="event" />
          <Picker.Item label="Rumah" value="rumah" />
          <Picker.Item label="Apartment" value="apartment" />
          <Picker.Item label="Hotel" value="hotel" />
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
    type: state.type
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    searchType: (type) => dispatch(searchType(type))
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(Search)
