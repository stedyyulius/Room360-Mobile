import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from 'tcomb-form-native';
import{
  View,
  StyleSheet,
  Text,
  Button,
  TouchableHighlight
} from 'react-native'

const Form = t.form.Form
var Message = t.struct({
  message: t.String,
  // surname: t.maybe(t.String),
  // age: t.Number,
  // rememberMe: t.Boolean
});
var options = {}

class MessageForm extends Component{
  constructor(props){
    super(props)
    this.state={}
  }
  static navigationOptions = ({ navigation }) => ({
    title: `Message Owner`,
    headerTitleStyle: {
      alignSelf: 'center'
    }
  })

  render(){
    return(
      <View style={styles.container}>
        <Form
          ref="form"
          type={Message}
          options={options}
        />
       <TouchableHighlight style={styles.button} underlayColor='#99d9f4'>
         <Text style={styles.buttonText}>Send</Text>
       </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  justifyContent: 'center',
  marginTop: 50,
  padding: 20,
  backgroundColor: '#ffffff',
},
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
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

export default connect (mapStateToProps,mapDispatchToProps)(MessageForm)
