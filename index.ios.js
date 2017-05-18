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
  ListView
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'

import MeiziRequest from './js/MeiziRequest.js'

var meiziRequest = new MeiziRequest();

class Home extends Component{

  constructor(props) {
    super(props);

    this.state = {
      meizis:null,
      dataSource: new ListView.DataSource(
        {
          rowHasChanged:(row1,row2)=>row1!=row2,
        }
      ),
      loaded:false,
    };
  }

  componentDidMount(){
      meiziRequest.requestWithPage('All',1)
        .then((results)=>{
            this.setState({
              loaded:true,
              dataSource:this.state.dataSource.cloneWithRows(results),
            });
        })
        .catch((error)=>{

        });
  }

  render() {
     if(!this.state.loaded){
       return this._renderLoadingView();
     }

     //return this._renderMeiziView(this.state.meizis[0]);
     return this._renderMeizisView();
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
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderMeiziView}
          style={styles.listView} />
      </View>
    );
  }

  _renderMeiziView(meizi){
    return(
      <View style={styles.rowContainer}>
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
         fontSize: 18,
         textAlign: 'center',
         marginLeft:10,
     },
     thumbnail: {
         width: 100,
         height: 100,
     },
     listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('Meizi', () => Meizi);
