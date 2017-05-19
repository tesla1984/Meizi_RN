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
  Image,
  ListView,
  RefreshControl,
  TabBarIOS
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'

import MeiziRequest from './js/MeiziRequest.js'
import MyProfile from './js/MyProfile.js'
import Home from './js/Home.js'

export default class Meizi extends Component {

  constructor(props){
    super(props);
    this.state={
      selectedTab:'meizi',
    }
  }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor='gray'
        tintColor='blue'>
          <TabBarIOS.Item
            title='妹子'
            systemIcon='contacts'
            selected={this.state.selectedTab === 'meizi'}
            onPress={()=>{this.setState({selectedTab:'meizi'})}}>
            <Home />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title='设置'
            systemIcon='more'
            selected={this.state.selectedTab === 'setting'}
            onPress={()=>{this.setState({selectedTab:'setting'})}}>
            <MyProfile />
          </TabBarIOS.Item>
      </TabBarIOS>

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
  rowContainer:{
    flex:1,
    flexDirection:'row',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding:10,
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
         fontSize: 15,
         textAlign: 'center',
         marginLeft:10,
     },
  thumbnail: {
         width: 100,
         height: 100,
     },
  listView: {
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('Meizi', () => Meizi);
