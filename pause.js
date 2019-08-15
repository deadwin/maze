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
        Father: {
            default: null
        },
    },
    onLoad: function() {
        //console.log(cc.find("Canvas"),"pauseJS")
        MT.USER.Music || (this.node.getChildByName("pauseBox").getChildByName("Music").getChildByName("Box").getChildByName("on").active = !1), 
        MT.USER.Sound || (this.node.getChildByName("pauseBox").getChildByName("Sound").getChildByName("Box").getChildByName("on").active = !1);
    },
    start: function() {},
    onButtonMusic: function() {
        MT.USER.Music ? (MT.USER.Music = !1, MT.AUDIOMGR.stopMusic(), this.node.getChildByName("pauseBox").getChildByName("Music").getChildByName("Box").getChildByName("on").active = !1) : (MT.USER.Music = !0, 
            this.node.getChildByName("pauseBox").getChildByName("Music").getChildByName("Box").getChildByName("on").active = !0, 
            MT.AUDIOMGR.playMusic("BackMusic", !0, .5, !1)), MT.USER.setSave_Music(), MT.AUDIOMGR.playEffect("button");
    },
    onButtonSound: function() {
        MT.USER.Sound ? (MT.USER.Sound = !1, MT.AUDIOMGR.setSoundSilence(!0), this.node.getChildByName("pauseBox").getChildByName("Sound").getChildByName("Box").getChildByName("on").active = !1) : (MT.USER.Sound = !0, 
        MT.AUDIOMGR.setSoundSilence(!1), this.node.getChildByName("pauseBox").getChildByName("Sound").getChildByName("Box").getChildByName("on").active = !0), 
        MT.USER.setSave_Sound();
        MT.AUDIOMGR.playEffect("button");
    },
    onButtonReset: function() {
        //SdkManager.hideBanner(), t.playEffect("button"), 
        MT.AUDIOMGR.playEffect("button");
        this.Father.GameReset(), this.node.destroy();
    },
    onButtonHelp: function() {
        var n = this;
        console.log('帮助界面');
        // cc.loader.loadRes("MazeRecruit/prefabs/GameHelp", function(a, e) {
        //     var t = cc.instantiate(e);
        //     n.node.addChild(t);
        // });
        MT.AUDIOMGR.playEffect("button");
    },
    onButtonHome: function() {
        //SdkManager.hideBanner(), t.playEffect("button"), 
        MT.AUDIOMGR.playEffect("button");
        MT.GLOBAL.loadScene("loginScene");
    },
    onButtonClose: function() {
        //SdkManager.hideBanner(), t.playEffect("button"), 
        MT.AUDIOMGR.playEffect("button");
        this.Father.buttonPauseOff(), this.node.destroy();
    }
});
