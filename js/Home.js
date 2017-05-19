import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  RefreshControl,
	Picker,
	TouchableHighlight
} from 'react-native';

import MeiziRequest from './MeiziRequest.js'

var meiziRequest = new MeiziRequest();
var map = new Map();

export default class Home extends Component{

  _data = new Array();
  _page = 1;

  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource(
        {
          rowHasChanged:(row1,row2)=>row1!=row2,
        }
      ),
      loaded:false,
      refreshing:false,
			category:'All',
    };

		map.set('All','所有');
		map.set('DaXiong','大胸');
		map.set('QiaoTun','翘臀');
		map.set('HeiSi','黑丝');
		map.set('MeiTui','美腿');
		map.set('QingXin','清新');
		map.set('ZaHui','杂烩');
  }

  componentDidMount(){
      meiziRequest.requestWithPage(this.state.category,1)
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

	/*
	 * 加载中界面
	 */
  _renderLoadingView(){
    return(
      <View style={styles.container} >
        <Text>Loading Data...</Text>
      </View>
    );
  }

	/*
	 * Picker界面
	 */
  _renderPicker(){
		return(
			<Picker selectedValue={this.state.category}
					style={{width:200}}
					mode={'dropdown'}
					onValueChange={(cat) => this.setState({category:cat})}>
					<Picker.Item label='所有' value='All' />
					<Picker.Item label='大胸' value='DaXiong' />
					<Picker.Item label='翘臀' value='QiaoTun' />
					<Picker.Item label='黑丝' value='HeiSi' />
					<Picker.Item label='美腿' value='MeiTui' />
					<Picker.Item label='清新' value='QingXin' />
					<Picker.Item label='杂烩' value='ZaHui' />

			</Picker>
		)
	}

	_renderPickerItem(key){
		return(
			<Picker.Item label={map.get(key)} value={key} />
		)
	}

	/*
	 * 数据界面 listview
	 */
  _renderMeizisView(){
    return(
      <View style={styles.container}>

				<TouchableHighlight onPress={this._selectCategory.bind(this)}>
					<Text style={styles.header}>{map.get(this.state.category)}</Text>
				</TouchableHighlight>

				{this._renderPicker()}

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderMeiziView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              enable={true} />
          }
          onEndReached={this._onLoadMore.bind(this)}
          onEndReachedThreshold={0}
          style={styles.listView} />

      </View>

    );
  }

	/*
	 * 类型点击事件
	 */
	_selectCategory(){

	}

	/*
	 * RefreshControl刷新事件
	 */
  _onRefresh(){
      this._page = 1;

      this._loadData();
  }

	/*
	 * 加载更多事件
	 */
  _onLoadMore(){
    this._page++;
    this._loadData();
  }

	/*
	 * 加载数据
	 */
  _loadData(){
    if(this._page === 1){
      this.state.refreshing = true;
    }
    meiziRequest.requestWithPage(this.state.category,this._page)
      .then((results)=>{
          if(this._page === 1){
            this._data.length = 0;
          }
          for(var i=0;i<results.length;i++){
            this._data.push(results[i]);
          }
          this.setState({
            refreshing:false,
            dataSource:this.state.dataSource.cloneWithRows(this._data),
          });
      })
      .catch((error)=>{
        this.state.refreshing=false;
      });
  }

	/*
	 * ListView item界面
	 */
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


const styles = StyleSheet.create({
  container: {
		flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rowContainer:{
    flex:1,
    flexDirection:'row',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding:5,
  },
  title: {
         fontSize: 15,
         textAlign: 'center',
         marginLeft:10,
     },
		 headerContainer:{
			 flex:1,
			 flexDirection:'row',
			 alignItems:'center',
			 padding:5,
			 height:50,
			 backgroundColor:'#7ec235',
		 },
		 header: {
						fontSize: 15,
						textAlign: 'center',
						marginTop:20,
						padding:10,
				},
  thumbnail: {
         width: 100,
         height: 100,
     },
  listView: {
    backgroundColor: '#F5FCFF',
  },
});
