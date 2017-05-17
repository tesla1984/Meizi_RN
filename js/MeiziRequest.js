'use strict'

export default class MeiziRequest{

    getRequestUrl(category,page){
        let url = "https://meizi.leanapp.cn/category/" + category + "/page/" + page;
        console.log("url:" + url);
        return url;
    }

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

}
