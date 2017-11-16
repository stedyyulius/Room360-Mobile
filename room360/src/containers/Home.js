import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  Modal,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import Map from '../components/Map'
import Detail from '../components/Detail'
import Search from '../components/Search'
import CitySearch from '../components/CitySearch'

class Home extends Component{
  constructor(props){
    super(props)
    this.state={
      index: 1,
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: `Room360`,
    headerTitleStyle: {
      alignSelf: 'center'
    },
    headerLeft: null,
    headerRight: (
      <Button
      title="Logout"
      onPress={()=>{
        AsyncStorage.removeItem('session')
        navigation.navigate('Login')
      }}/>
    )
  })

  // async componentDidMount(){
  //   try {
  //   const value = await AsyncStorage.getItem('session');
  //   if (value !== null){
  //     alert(value);
  //   }
  //   } catch (error) {
  //     alert(error)
  //     this.props.navigation.navigate('Login')
  //   }
  // }

  render() {
    return (
        <View style={styles.container}>
          <Image
            source={require('../assets/home-circle-blue-512.png')}
            style={{ width: 0, height: 0 }}
          />
          <Map />
          <Search />
          <CitySearch />
          <Detail navigation={this.props.navigation}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image:{
      width: 120,
      height: 120
    }
});

const mapStateToProps = (state) =>{
  return{

  }
}

const mapDispatchToProps = (dispatch) =>{
  return{

  }
}

export default connect (mapStateToProps,mapDispatchToProps)(Home)
