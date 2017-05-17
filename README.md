# ReactNatvieLearn

1. 网络处理  
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

>问题记录：   
>1. `this.getRequestUrl`这里的this不能少，不然会提示方法没有定义    
>2. 因为返回的response结构如下：
```
	{
                category: "All",
                page: 1,
                results: []
        }
```
所以responseData.result就是看results是不是有值
