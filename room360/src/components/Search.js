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
          <Picker.Item label="Select Event Type" value="All" />
          <Picker.Item label="Competition" value="competition" />
          <Picker.Item label="Gathering" value="gathering" />
          <Picker.Item label="Meetup" value="meetup" />
          <Picker.Item label="Party" value="party" />
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
