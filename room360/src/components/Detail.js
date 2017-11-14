import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import { connect } from 'react-redux'


class Detail extends Component{
  constructor(props){
    super(props)
    this.state={}
  }
  render() {
    return (
      <Image source={{uri:this.props.image}} style= { styles.image }/>
    );
  }
}

const styles = StyleSheet.create({
  image:{
      width: 220,
      height: 220,
      marginBottom: 30
    }
});

const mapStateToProps = (state) =>{
  return{
    image: state.image
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{

  }
}

export default connect (mapStateToProps,mapDispatchToProps)(Detail)
