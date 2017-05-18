# ReactNatvieLearn

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
1. `this.state`中`dataSource`定义
2. `ListView`中`dataSource`和`renderRow`指定
