# ReactNatvieLearn

[豆瓣妹子图iOS客户端](https://github.com/Sunnyyoung/Meizi)

### 获取网络数据  
```
    requestWithPage(category,page){   
        return new Promise((resolve, reject)=>{   
            fetch(this.getRequestUrl(category,page))   
                .then((response)=>response.json())   
                .catch((error)=>{   
                    reject(error);
                })
                .then((responseData)=>{
                    if(!responseData || !responseData.results){
                        reject(new Error('responseData is null'));
                        return;
                    }
                    console.log('responseData.results:' + responseData.results);
                    resolve(responseData.results);
                })
                .done();
        })
    }
```

问题记录：   
1. `this.getRequestUrl`这里的this不能少，不然会提示方法没有定义    
2. 因为返回的response结构如下：
```
	{
                category: "All",
                page: 1,
                results: []
        }
```
所以responseData.result就是看results是不是有值

### 显示网络数据第一个
构造方法`constructor`中给state定义`meizis`变量，网络数据获取到更新该变量`this.setState`，当state发生改变的时候会调用`render()`，在`render()`中根据`meizis`不同显示不同界面
>[IOS下Image标签加载网络图片不显示](http://www.jianshu.com/p/634d3ccbf311)
>在ios中，http的图片地址显示不出来，按照上面修改

### 显示数据到listView中
[网络获取数据和ListView](http://blog.csdn.net/totogo2010/article/details/51593833)
1. `this.state`中`dataSource`定义
2. `ListView`中`dataSource`和`renderRow`指定

### ListView添加下拉刷新
[基础篇章：关于 React Native 之 RefreshControl 组件的讲解](http://godcoder.me/2016/11/09/%E5%9F%BA%E7%A1%80%E7%AF%87%E7%AB%A0%EF%BC%9A%E5%85%B3%E4%BA%8E%20React%20Native%20%E4%B9%8B%20RefreshControl%20%E7%BB%84%E4%BB%B6%E7%9A%84%E8%AE%B2%E8%A7%A3/)   
**this.state设置值**
```
//适合多个state设值
this.setState({
	refreshing:true
});   
//单个state改变
this.state.refreshing = true;
```

### bind(this)
[React/React Native 的ES5 ES6写法对照表](http://bbs.reactnative.cn/topic/15/react-react-native-%E7%9A%84es5-es6%E5%86%99%E6%B3%95%E5%AF%B9%E7%85%A7%E8%A1%A8)
>**把方法作为回调提供**   
很多习惯于ES6的用户反而不理解在ES5下可以这么做：   
>
```//ES5
var PostInfo = React.createClass({
    handleOptionsButtonClick: function(e) {
        // Here, 'this' refers to the component instance.
        this.setState({showOptionsModal: true});
    },
    render: function(){
        return (
            <TouchableHighlight onPress={this.handleOptionsButtonClick}>
                <Text>{this.props.label}</Text>
            </TouchableHighlight>
        )
    },
});
```
>在ES5下，React.createClass会把所有的方法都bind一遍，这样可以提交到任意的地方作为回调函数，而this不会变化。但官方现在逐步认为这反而是不标准、不易理解的。
>在ES6下，你需要通过bind来绑定this引用，或者使用箭头函数（它会绑定当前scope的this引用）来调用

>
```//ES6
class PostInfo extends React.Component
{
    handleOptionsButtonClick(e){
        this.setState({showOptionsModal: true});
    }
    render(){
        return (
            <TouchableHighlight
                onPress={this.handleOptionsButtonClick.bind(this)}
                onPress={e=>this.handleOptionsButtonClick(e)}
                >
                <Text>{this.props.label}</Text>
            </TouchableHighlight>
        )
    },
}
```

### listview上拉加载更多
[ListView介绍](http://reactnative.cn/docs/0.44/listview.html#content)   
>`onEndReached` function 
当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用。原生的滚动事件会被作为参数传递。译注：当第一次渲染时，如果数据不足一屏（比如初始值是空的），这个事件也会被触发，请自行做标记过滤。

>`onEndReachedThreshold` number 
调用onEndReached之前的临界值，单位是像素。

根据上面listview两个属性实现加载更多   
需要定义一个Array来处理数据

```
var _data = new Array()//定义

//page=1，清空数据
_data.length=0

//添加新数据
_data.push(..)

```

[ListView组件之上拉刷新](http://www.voidcn.com/blog/hsbirenjie/article/p-6160823.html)   
这里定义一个变量来控制footview显示，来实现上拉加载更多提示显示
