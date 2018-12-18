import wx from 'weixin-js-sdk';
const wxPlugin = {};
wxPlugin.install = function (Vue, options) {
    alert("确认分享吗？");
    function extend(obj1, obj2) {
        for (var k in obj2){
            if (obj1.hasOwnProperty(k)) {
                if (isObject(obj2[k])) {
                    extend(obj1[k], obj2[k])
                } else {
                    obj1[k] = obj2[k]
                }
            } else {
                obj1[k] = obj2[k]
            }
        }
        return obj1;
    }
    function getProp(obj,str) {
        var result = extend({},obj);
        var array = str.split('.');
        for (var i=0;i<array.length;i++){
            if (result[array[i]]){
                result = result[array[i]];
            }else{
                result = result[array[i]];
                break;
            }
        }
        return result;
    }
    // 判断options.config的数据类型
    if(!options.config){
        console.error("wxPlugin Error：config属性必须为一个对象或者promise，不能为空");
        return;
    }
    // 如果config为一个对象
    if(Object.prototype.toString.call(options.config) == '[object Object]'){
        wxConfig(options.config)
    }
    // 如果config为一个promise
    if(options.config instanceof  Promise){
        options.config.then(function (res) {
            var config;
            if(options.path){
                config = getProp(res,options.path)
            }else{
                config = res.data;
            }
            wxConfig(config);
        })
    }
    function wxConfig(config){
        wx.config({
            debug: false,
            appId: config.appId,
            timestamp: config.timestamp,
            nonceStr: config.nonceStr,
            signature: config.signature,
            jsApiList:options.actions
        });
        wx.error(function (err) {
            console.error(err);
        })
    }
    Vue.prototype.wx = wx;
};
export default wxPlugin;
