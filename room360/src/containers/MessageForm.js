import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from 'tcomb-form-native';
import{
  View,
  StyleSheet,
  Text,
  Button,
  TouchableHighlight,
  Image
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

  componentDidMount(){

  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.detail}>
          <Image style={styles.image} source={{uri:this.props.detail.image}} />
          <View style={styles.specs}>
            <Text>
              {this.props.detail.date}
            </Text>
            <Text style={styles.detailText}>
              {this.props.detail.name}
            </Text>
            <Text style={styles.detailText}>
              {this.props.detail.address}
            </Text>
            <Text>
              {this.props.detail.description}
            </Text>
            <Text style={{color:'blue',marginTop:20}}
              onPress={() => Linking.openURL(this.props.detail.url)}>
              {this.props.detail.url}
            </Text>
          </View>
        </View>
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
  },
  image:{
    width: 150,
    height: 150,
    marginRight: 20,
    marginBottom: 30
  },
  detail:{
    flexDirection: 'row',
  },
  specs:{
    flexDirection: 'column'
  },
  detailText:{
    fontSize: 15,
    fontWeight: 'bold'
  }
})

const mapStateToProps = (state) =>{
  return{
    detail: state.detail
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{

  }
}

export default connect (mapStateToProps,mapDispatchToProps)(MessageForm)
