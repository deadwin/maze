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
        appsIcon:cc.Sprite,
        txtGameName:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this.index = 0;
    },

    start () {

    },
    setBtnInfo:function(i){
        this.index = i;
        var self = this;
        // cc.loader.loadRes("appIcon/" + (i + 1),cc.SpriteFrame,function(err,sp){
        //     if(!err){
        //         self.node.getComponent(cc.Sprite).spriteFrame = sp;
        //     }
        // })
        this.txtGameName.string = MT.GLOBAL.constData.otherApps[i].name;
        self.loadAppIcon(MT.GLOBAL.constData.otherApps[i].icon)
    },
    loadAppIcon:function(url){
        var _res=cc.loader.getRes(url);
        if(_res){
            this.appsIcon.spriteFrame = new cc.SpriteFrame(_res);
            return;
        }
        cc.loader.load(url, (err, res) => {
            if (err) {
                cc.warn("loadExternalAsset error", url);
                return;
            }
            this.appsIcon.spriteFrame = new cc.SpriteFrame(res);
        });
    },
    onBtnOpenOtherApp:function(){
        MT.WXHELPER.wxNavigateToMiniProgram(MT.GLOBAL.constData.otherApps[this.index].appid,()=>{
            console.log("打开其他小程序成功");
        },()=>{

        });
    },
    // update (dt) {},
});
