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
        this.VideoTime = 0, this.ShareTime = 0, this.GetTime = 0, MT.getCanShare() || "" == MT.wxVideoId ? "" == MT.wxVideoId && MT.getCanShare() ? (this.node.getChildByName("GetBoX").getChildByName("VideoGet").active = !1)
        //this.node.getChildByName("GetBoX").getChildByName("Get").position = cc.v2(0, 15), 
        //this.node.getChildByName("GetBoX").getChildByName("ShareGet").position = cc.v2(0, -150)) 
        : "" != MT.wxVideoId || MT.getCanShare() || (this.node.getChildByName("GetBoX").getChildByName("ShareGet").active = !1, 
        this.node.getChildByName("GetBoX").getChildByName("VideoGet").active = !1)//, this.node.getChildByName("GetBoX").getChildByName("Get").position = cc.v2(0, -40)) 
        : (this.node.getChildByName("GetBoX").getChildByName("ShareGet").active = !1),
        //this.node.getChildByName("GetBoX").getChildByName("Get").position = cc.v2(0, 15), 
        //this.node.getChildByName("GetBoX").getChildByName("VideoGet").position = cc.v2(0, -150)), 
        this.getTimeState(), this.initButton();
    },
    getTimeState: function() {
        var t = this.getTimeSecond();
        0 != MT.USER.DriedGetTime && (this.GetTime = MT.USER.DriedGetTime - t), 
        0 != MT.USER.DriedGetShareTime && (this.ShareTime = MT.USER.DriedGetShareTime - t), 
        0 != MT.USER.DriedGteVideoTime && (this.VideoTime = MT.USER.DriedGteVideoTime - t);
    },
    initButton: function() {
        0 == MT.USER.DriedGetTime ? this.visionGet(this) : this.visionGet(!1), 0 == MT.USER.DriedGetShareTime ? this.visionShareGet(this) : this.visionShareGet(!1), 
        0 == MT.USER.DriedGteVideoTime ? this.visionVideoGet(this) : this.visionVideoGet(!1);
    },
    visionGet: function(a) {
        var e = this.node.getChildByName("GetBoX");
        a ? (e.getChildByName("Get").getChildByName("Time").active = !1, e.getChildByName("Get").getChildByName("FishAdd").active = !0, 
        MT.USER.DriedGetTime = this.GetTime = 0) : (e.getChildByName("Get").getChildByName("Time").active = !0, 
        e.getChildByName("Get").getChildByName("FishAdd").active = !1, this.GetTime++, this.visionGetTime(), 
        this.schedule(this.visionGetTime, 1));
    },
    visionGetTime: function() {
        this.GetTime--;
        var r = this.node.getChildByName("GetBoX");
        if (0 < this.GetTime) {
            var e, t = r.getChildByName("Get").getChildByName("Time"), i = this.GetTime, a = this.AddZero(i % 60);
            0 < (i = d(i / 60)) ? (e = this.AddZero(i % 60), i = d(i / 60)) : e = "00";
            var n = this.AddZero(i);
            t.getChildByName("TimeNum").getComponent(cc.Label).string = n + ":" + e + ":" + a;
        } else this.visionGet(!0), MT.USER.setSave_DriedGetTime(), this.unschedule(this.visionGetTime);
    },
    visionShareGet: function(a) {
        var e = this.node.getChildByName("GetBoX");
        a ? (e.getChildByName("ShareGet").getChildByName("Time").active = !1, e.getChildByName("ShareGet").getChildByName("FishAdd").active = !0, 
        this.ShareTime = MT.USER.DriedGetShareTime = 0) : (e.getChildByName("ShareGet").getChildByName("Time").active = !0, 
        e.getChildByName("ShareGet").getChildByName("FishAdd").active = !1, this.ShareTime++, 
        this.visionShareTime(), this.schedule(this.visionShareTime, 1));
    },
    visionShareTime: function() {
        this.ShareTime--;
        var r = this.node.getChildByName("GetBoX");
        if (0 < this.ShareTime) {
            var e, t = r.getChildByName("ShareGet").getChildByName("Time"), i = this.ShareTime, a = this.AddZero(i % 60);
            0 < (i = d(i / 60)) ? (e = this.AddZero(i % 60), i = d(i / 60)) : e = "00";
            var n = this.AddZero(i);
            t.getChildByName("TimeNum").getComponent(cc.Label).string = n + ":" + e + ":" + a;
        } else this.visionShareGet(!0), MT.USER.setSave_DriedGetShareTime(), this.unschedule(this.visionShareTime);
    },
    visionVideoGet: function(a) {
        var e = this.node.getChildByName("GetBoX");
        a ? (e.getChildByName("VideoGet").getChildByName("Time").active = !1, e.getChildByName("VideoGet").getChildByName("FishAdd").active = !0, 
        MT.USER.DriedGteVideoTime = this.VideoTime = 0) : (e.getChildByName("VideoGet").getChildByName("Time").active = !0, 
        e.getChildByName("VideoGet").getChildByName("FishAdd").active = !1, this.VideoTime++, 
        this.visionVideoTime(), this.schedule(this.visionVideoTime, 1));
    },
    visionVideoTime: function() {
        var r = this.node.getChildByName("GetBoX");
        if (this.VideoTime--, 0 < this.VideoTime) {
            var e, t = r.getChildByName("VideoGet").getChildByName("Time"), i = this.VideoTime, a = this.AddZero(i % 60);
            0 < (i = d(i / 60)) ? (e = this.AddZero(i % 60), i = d(i / 60)) : e = "00";
            var n = this.AddZero(i);
            t.getChildByName("TimeNum").getComponent(cc.Label).string = n + ":" + e + ":" + a;
        } else this.visionVideoGet(!0), MT.USER.setSave_DriedGteVideoTime(), this.unschedule(this.visionVideoTime);
    },
    AddZero: function(t) {
        return 10 > t ? "0" + t : "" + t;
    },
    getTimeSecond: function() {
        return d(new Date().getTime() / 1e3);
    },
    onButtonGet: function() {
        i.playEffect("button"), 0 == MT.USER.DriedGetTime ? (MT.USER.DriedFishNum += MT.GLOBAL.REWARD_NUM, 
        MT.USER.setSave_DriedFishNum(), Hint_YvesYu.createHint("奖励 + 1!", this.node, 30, 0), 
        MT.USER.DriedGetTime = this.getTimeSecond() + 10800, MT.USER.setSave_DriedGetTime(), 
        this.GetTime = 10800, this.visionGet(!1), this.Father.DownFishNum()) : Hint_YvesYu.createHint("请倒计时结束,再来领取!", this.node);
    },
    onButtonShare: function() {
        i.playEffect("button"), 0 == MT.USER.DriedGetShareTime ? (Load_YvesYu.createLoading(this.node), 
        // SdkManager.share({
        //     name: GameName,
        //     source: 5,
        //     success: function() {}
        // }),
        console.log("调用分享"),
         MT.MODULE.setShareCall(this.ShareCall.bind(this))) : Hint_YvesYu.createHint("请倒计时结束,,再来领取!", this.node);
    },
    ShareCall: function() {
        showModal("领取奖励", "奖励+1!", !1, function() {
            MT.USER.DriedFishNum += MT.GLOBAL.REWARD_NUM, MT.USER.setSave_DriedFishNum(), MT.USER.DriedGetShareTime = this.getTimeSecond() + 3600, 
            MT.USER.setSave_DriedGetShareTime(), this.ShareTime = 3600, this.visionShareGet(!1), 
            this.Father.DownFishNum(), Load_YvesYu.finishLoading();
        }.bind(this), function() {}.bind(this));// SdkManager.onShow();
    },
    onButtonVideo: function() {
        if (i.playEffect("button"), 0 == MT.USER.DriedGteVideoTime) {
            var a = this;
            console.log("视频回调")
            // Load_YvesYu.createLoading(this.node), SdkManager.showRewardedVideoAd(MT.wxVideoId, function(t) {
            //     console.log("视频回调"), t ? (MT.USER.DriedFishNum += 15, MT.USER.setSave_DriedFishNum(), 
            //     MT.USER.DriedGteVideoTime = a.getTimeSecond() + 1800, MT.USER.setSave_DriedGteVideoTime(), 
            //     a.VideoTime = 3600, a.visionVideoGet(!1), a.Father.DownFishNum()) : Hint_YvesYu.createHint("请观看完,完整的视频!", a.node), 
            //     Load_YvesYu.finishLoading();
            // });
        } else Hint_YvesYu.createHint("请倒计时结束,再来领取!", this.node);
    },
    start: function() {},
    deleteSelf: function() {
        //SdkManager.hideBanner(), 
        i.playEffect("button"), this.node.destroy();
    }
});
