// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

/**
 *     MessageType : cc.Enum({
        getInfo:0,
        showVRank: 1,
        showHRank:2,
        showRandRank:3,
        hideRank: 4,
    }),
 */
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
        rankPanel:cc.Sprite,
        line:cc.Node,
        bg:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    onGetWXFriendInfo:function(){
        // console.log("++onGetWXFriendInfo++")
        MT.WXHELPER.wxPostMessage(MT.WXHELPER.MessageType.getInfo,MT.WXHELPER.MessageInfoType.score)
    },
    onShowRandRank:function(){
        //console.log("++onShowRandRank++")
        this.node.active = false;
        MT.WXHELPER.wxPostMessage(MT.WXHELPER.MessageType.showRandRank)
        this.bg.active = false;
        this.rankPanel.enabled = false;
        this.line.active = false;
        

        setTimeout(() => {
            if(this.node && this.node.active == false){
                this.node.active = true;
            }
        }, 140);
    },
    onShowVRank:function(){
        //console.log("++onShowVRank++")
        MT.WXHELPER.wxPostMessage(MT.WXHELPER.MessageType.showVRank)
        this.rankPanel.enabled = true;
        this.bg.active = true;
        this.line.active = true;
        MT.WXHELPER.hideCreateUserInfoButton();
        this.node.active = true;
    },
    hide:function(){
        MT.WXHELPER.showCreateUserInfoButton();
        this.node.active = false;
    },
    // update (dt) {},
});
