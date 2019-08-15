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
    initHint: function(t) {
        this.node.getChildByName("HintBox").getChildByName("Hint_Text").getChildByName("Num").getComponent(cc.Label).string = t;

        // MT.getCanShare() || false ? false && MT.getCanShare() ? (this.node.getChildByName("HintBox").getChildByName("Video_Hint").active = !1, 
        // this.node.getChildByName("HintBox").getChildByName("DriedFish_Hint").position = cc.v2(0, -14), 
        // this.node.getChildByName("HintBox").getChildByName("Share_Hint").position = cc.v2(0, -140)) : true || MT.getCanShare() || (this.node.getChildByName("HintBox").getChildByName("Share_Hint").active = !1, 
        // this.node.getChildByName("HintBox").getChildByName("Video_Hint").active = !1, this.node.getChildByName("HintBox").getChildByName("DriedFish_Hint").position = cc.v2(0, -30)) : (this.node.getChildByName("HintBox").getChildByName("Share_Hint").active = !1, 
        // this.node.getChildByName("HintBox").getChildByName("DriedFish_Hint").position = cc.v2(0, -14), 
        // this.node.getChildByName("HintBox").getChildByName("Video_Hint").position = cc.v2(0, -140));
    },
    start: function() {},
    onButtonDriedFish: function() {
        MT.AUDIOMGR.playEffect("button");
        MT.GLOBAL.PRICE <= MT.USER.DriedFishNum ? (MT.USER.DriedFishNum -= MT.GLOBAL.PRICE, 
        MT.USER.setSave_DriedFishNum(), this.UseHint()) :(console.log("数量不足"), Hint_YvesYu.createHint("提示数量不足!", this.node));
    },
    onButtonVideo: function() {
        // var a = this;
        // Load_YvesYu.createLoading(this.node), i.playEffect("button"), SdkManager.showRewardedVideoAd(wxVideoId, function(t) {
        //     console.log("视频回调"), t ? a.UseHint() : Hint_YvesYu.createHint("请观看完,完整的视频!", a.node), 
        //     Load_YvesYu.finishLoading();
        // });
    },
    onButtonShare: function() {
        MT.AUDIOMGR.playEffect("button");
        //  Load_YvesYu.createLoading(this.node), SdkManager.share({
        //     name: GameName,
        //     source: 5,
        //     success: function() {}
        // }), MT.MODULE.setShareCall(this.ShareCall.bind(this));
    },
    ShareCall: function() {
        // showModal("游戏提示", "游戏提示一次", !1, function() {
        //     this.UseHint(), Load_YvesYu.finishLoading();
        // }.bind(this), function() {}.bind(this));
    },
    UseHint: function() {
        this.Father.UseHint(), this.onButtonClose();
    },
    onButtonClose: function() {
        MT.AUDIOMGR.playEffect("button");
        this.node.destroy(), this.Father.recoverTimeCall();
    }
});
