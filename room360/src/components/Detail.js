import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'


class Detail extends Component{
  constructor(props){
    super(props)
    this.state={}
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=> navigate('MessageForm')}>
          <Image source={{uri:this.props.detail.image.standard}} style= { styles.image }/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image:{
      width: 180,
      height: 180,
      marginBottom: 30,
    }
});

const mapStateToProps = (state) =>{
  return{
    detail: state.detail
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{

  }
}

export default connect (mapStateToProps,mapDispatchToProps)(Detail)
