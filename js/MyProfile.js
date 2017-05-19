import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class MyProfile extends Component{

  render(){
    return(
        <View style={styles.container}>
          <Text style={styles.settingItem}>设置</Text>
					<Text style={styles.settingItem}>关于</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		flexDirection:'column',
    backgroundColor: '#F5FCFF',
		paddingTop:40,
  },
  settingItem: {
         fontSize: 15,
         textAlign: 'center',
				 height:50,
				 marginTop:5,
				 backgroundColor:'#ffffff',
     },
});
