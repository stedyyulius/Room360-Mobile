import React, { Component } from 'react'
import { connect } from 'react-redux'
import{
  View,
  StyleSheet,
  Text
} from 'react-native'

class Payment extends Component{
  constructor(props){
    super(props)
    this.state={}
  }
  static navigationOptions = ({ navigation }) => ({
    title: `Payment`,
    headerTitleStyle: {
      alignSelf: 'center'
    }
  })

  render(){
    return(
      <View>
        <Text>
          ini payment
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

const mapStateToProps = (state) =>{
  return{

  }
}

const mapDispatchToProps = (dispatch) =>{
  return{

  }
}

export default connect (mapStateToProps,mapDispatchToProps)(Payment)
