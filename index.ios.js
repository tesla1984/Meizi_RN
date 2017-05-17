/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'

import MeiziRequest from './js/MeiziRequest.js'

var meiziRequest = new MeiziRequest();

class Home extends Component{

  constructor(props) {
    super(props);

    this.state = {
      meizis:null,
    };
  }

  componentDidMount(){
      meiziRequest.requestWithPage('All',1)
        .then((results)=>{
            this.setState({
              meizis:results,
            });
        })
        .catch((error)=>{

        });
  }

  render() {
     if(!this.state.meizis){
       return this._renderLoadingView();
     }

     return this._renderMeiziView(this.state.meizis[0]);
  }

  _renderLoadingView(){
    return(
      <View style={styles.container} >
        <Text>Loading Data...</Text>
      </View>
    );
  }

  _renderMeizisView(){
    return(
      <View style={style.container}>

      </View>
    );
  }

  _renderMeiziView(meizi){
    return(
      <View style={styles.container}>
        <Image source={{uri:meizi.thumb_url}}
          style={styles.thumbnail} />
        <Text style={styles.title}>{meizi.title}</Text>
      </View>
    );
  }

}

export default class Meizi extends Component {

  render() {

    return (

      <View style={styles.container}>
        <Home />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  title: {
         fontSize: 12,
         textAlign: 'center',
     },
     thumbnail: {
         width: 100,
         height: 100,
     },
});

AppRegistry.registerComponent('Meizi', () => Meizi);
