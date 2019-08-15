// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onBoxClick:function(){
        this.jumpToOther(this.m_curBoxID);
    },

    // changeBoxIcon:function(){
    //     var apps = cc.mt.globalData.otherApps;
    //     if(apps.length==0){
    //         this.btnIcon.active=false;
    //         return;
    //     }
    //     console.log(apps);
    //     this.m_curBoxID=apps[0].appid;
    //     this.loadAppIcon(apps[0].icon);
    //     for (var i = 0; i < apps.length; i++) {
    //         this.createSchedule(i);
    //     }
    // },

    // createSchedule:function(_index){
    //     var apps=cc.mt.globalData.otherApps;
    //     this.schedule(() => {
    //         this.m_curBoxID = apps[_index].appid;
    //         this.loadAppIcon(apps[_index].icon);
    //     }, apps.length * 5, cc.macro.REPEAT_FOREVER, 5 * _index);
    // },
    // loadAppIcon:function(url){
    //     var _res=cc.loader.getRes(url);
    //     this.moreGamePanel.getComponent("moreGame").showOtherApp();
    //     if(_res){
    //         this.imgOtherAppIcon.spriteFrame = new cc.SpriteFrame(_res);
    //         return;
    //     }
    //     cc.loader.load(url, (err, res) => {
    //         if (err) {
    //             cc.warn("loadExternalAsset error", url);
    //             return;
    //         }
    //         this.imgOtherAppIcon.spriteFrame = new cc.SpriteFrame(res);
    //     });
    // },
    // jumpToOther:function(appid) {
    //     var self = this;
    //     MT.WXHELPER.wxNavigateToMiniProgram(appid,function(){
    //         console.log("跳转其他小程序成功")
    //     },function(){
    //         console.log("跳转其他小程序失败");
    //     }
    //     )
    // },

    // update (dt) {},
});
