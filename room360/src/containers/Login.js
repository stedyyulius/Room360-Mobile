import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from 'tcomb-form-native';
import{
  View,
  StyleSheet,
  Button,
  AsyncStorage
} from 'react-native'

import { setSession } from '../actions/index'

const Form = t.form.Form
var Message = t.struct({
  handphone : t.String,
  password  : t.String
});
var options = {}

class Login extends Component{
  constructor(props){
    super(props)
    this.state={}
  }
  static navigationOptions = ({ navigation }) => ({
    title: `Login`,
    headerTitleStyle: {
      alignSelf: 'center'
    }
  })
  async login(){
    let input = this.refs.form.getValue()
    await AsyncStorage.setItem('session',input.handphone)
    this.props.navigation.navigate('Room360')
  }

async componentDidMount(){
  try {
    const value = await AsyncStorage.getItem('session');
    if (value !== null){
      this.props.navigation.navigate('Room360')
    }
    } catch (error) {
      alert(error)
    }
  }

  render(){
    return(
      <View>
        <Form
          ref="form"
          type={Message}
          options={options}
        />
        <Button
          title="tes"
          onPress={()=> this.login()}
        />
      </View>
    )
  }
}

const style = StyleSheet.create({

})

const mapStateToProps = (state) =>{
  return{

  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    setSession: (status) => dispatch(setSession(status))
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(Login)
