# vue-wx-jssdk

### 一、Introduction

微信端项目经常需要使用weixin-js-sdk来调用微信的一些接口，比如微信分享接口（onMenuShareAppMessage，onMenuShareTimeline..）、
拍照或从手机相册中选图接口（chooseImage）、录音接口（startRecord、stopRecord）等等。该插件是为了能在vue项目中能更方便地使用weixin-js-sdk。

### 二、Usage

#### 1、下载

```javascript
npm install vue-wx-jssdk --save
```

#### 2、引入项目并配置
main.js文件
```javascript
import Vue from 'vue';
import wxjssdkPlugin from 'vue-wx-jssdk';
import axios from 'axios';
const options = {
        
        /*
        *    config可以有两种形式：object或者promise
        *    1、如果是object，则必须包含以下属性：
        *        appId: '', // 必填，公众号的唯一标识
                 timestamp: , // 必填，生成签名的时间戳
                 nonceStr: '', // 必填，生成签名的随机串
                 signature: '',// 必填，签名
        *   
        *    2、如果是promise，则该promise的返回值中必须要能获取到上面格式的object。
        *    下面是一个promise格式的例子，该示例中，从后端的auth/base接口中获取微信配置信息。
        *    该接口返回一个对象，如：
        *    {
        *       data:{
        *           wx:{
        *                appId: 'xxx', 
                         timestamp: xx, 
                         nonceStr: 'xxx', 
                         signature: 'xxx',
        *           }
        *       }
        *    }
        *       
        *    
        * */
    
        config:axios.get('/auth/base'),
        
        // path指定如何从promise返回值中拿到符合格式的object
        path:'data.data.wx',
        
        // 声明用到的微信api
        actions:['onMenuShareAppMessage','onMenuShareTimeline']
};

Vue.use(wxjssdkPlugin,options);

```
#### 3、使用接口

##### （1）在最外层的vue实例上使用：
```javascript
    // 微信分享
    // vm是Vue的一个实例
    vm.wx.ready(function () {
        // 分享给朋友
        vm.wx.onMenuShareAppMessage({
            title: '微信分享标题',
            desc: '微信分享描述',
            link: location.href,
            imgUrl: location.origin+'/static/share.png',
            success: function () {
               alert("分享成功");
            }
        });
        // 分享到朋友圈
        vm.wx.onMenuShareTimeline({
            title: '微信分享标题',
            link: location.href,
            imgUrl: location.origin+'/static/share.png',
            success: function () {
                alert("分享成功");
            }
        });
    });

```
##### （2）在vue组件内使用：
```javascript
    var _this = this;
    _this.wx.ready(function () {
        // 分享给朋友
        _this.wx.onMenuShareAppMessage({
            title: '微信分享标题',
            desc: '微信分享描述',
            link: location.href,
            imgUrl: location.origin+'/static/share.png',
            success: function () {
               alert("分享成功");
            }
        });
        // 分享到朋友圈
        _this.wx.onMenuShareTimeline({
            title: '微信分享标题',
            link: location.href,
            imgUrl: location.origin+'/static/share.png',
            success: function () {
                alert("分享成功");
            }
        });
    });
```