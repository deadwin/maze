"use strict";
var mtModule = {
    Module: null,
    ShareCall: null,

    initModule:function() {
        var a = new MT.PUBLIC();
        a.onLoad(), a.initView(), a.pushPrefab(a._hint), a.pushPrefab(a._load),new Date().getTime(),
        a.registerLoadResourceEndCallBack(mtModule.onResourceLoaded.bind(this)), a.preloadResources(), 
        mtModule.Module = a, console.log("time" + new Date().getTime());
        // console.log(cc.instantiate(a.preloadResources(a._preloadList[0])),a.preloadResources(a._preloadList[1]),a._preloadList)

    },
    setShareCall: function(t) {
        this.ShareCall = t, console.log("游戏回调设置" + this.ShareCall);
    },
    WxShareCall: function() {
        console.log("游戏回调设置11111111" + this.ShareCall), null != this.ShareCall && (this.ShareCall(), 
        this.ShareCall = null);
    },
    onResourceLoaded: function() {
        //console.log("王贝贝不不" + new Date().getTime())
        Hint_YvesYu.initHint(mtModule.Module._resources[mtModule.Module._hint]), 
        Load_YvesYu.initLoading(mtModule.Module._resources[mtModule.Module._load]);
    },
}
module.exports = mtModule;