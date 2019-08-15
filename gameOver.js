// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
const gameWin = 0;
const gameLose = 1;
cc.Class({
    extends: cc.Component,
    properties: {
        Father: {
            default: null
        },
        // Refuel: {
        //     default: [],
        //     type: cc.SpriteFrame
        // },
        // XyG: cc.SpriteFrame,
        advertising: cc.Node,
        Like: cc.Node,
        gameLoseLayer:cc.Node,
        gameWinLayer:cc.Node,
        BreakHome:cc.Label,
        otherAppsContent:cc.Node,
        otherAppItem:cc.Node,
        otherAppsPanel:cc.Node,
    },
    onLoad: function() {
        //console.log(console.log(cc.find("Canvas")),"MazeRecruit_GameOverJs")
        this.doubleType, this.overType, this.UpType = 0;
        this.BreakHome.string = MT.GLOBAL.constData.CONST_WORDS.hdzy;
        this.showOtherApps();
    },
    initGameOver: function(n) {
        console.log('winwinwin')
        this.overType = gameWin;
        this.showLayer();
        var e = this.node.getChildByName("content").getChildByName("Muen").getChildByName("GameOverBox").getChildByName("taiTou");
        e.opacity = 0, e.getChildByName("GuanQia").getChildByName("Num").getComponent(cc.Label).string = n, 
        this.scheduleOnce(this.visionTaiTou, 1 / 60),// this.node.getChildByName("content").getChildByName("Muen").getChildByName("GameOverBox").getChildByName("TheNextLevel").getComponent(cc.Sprite).spriteFrame = this.XyG, 
        MT.getCanShare() && "" != MT.wxVideoId ? (MT.USER.VideoAndShare ? (this.doubleType = 1, 
        MT.USER.VideoAndShare = !1) : (this.doubleType = 2, 
        MT.USER.VideoAndShare = !0), MT.USER.setSave_VideoAndShare()) : MT.getCanShare() && "" == MT.wxVideoId ? (this.doubleType = 1) 
        : MT.getCanShare() || "" == MT.wxVideoId ? (this.node.getChildByName("content").getChildByName("Muen").getChildByName("GameOverBox").getChildByName("double").active = !1) : (this.doubleType = 2);
        // var t = cc.moveTo(.5, 0, 180), i = cc.sequence(cc.delayTime(.2), t);
        // this.node.getChildByName("content").runAction(i);
    },
    initGameOver_special: function(n) {
        console.log('lose')
        this.overType = gameLose;
        this.showLayer();
        var e = this.node.getChildByName("content").getChildByName("Muen").getChildByName("GameOverBox").getChildByName("taiTou");
        e.opacity = 0, e.getChildByName("GuanQia").getChildByName("Num").getComponent(cc.Label).string = n, 
        this.scheduleOnce(this.visionTaiTou, 1 / 60), this.node.getChildByName("content").getChildByName("Muen").getChildByName("GameOverBox").getChildByName("double").active = !1, 
        this.node.getChildByName("content").getChildByName("Muen").getChildByName("GameOverBox").getChildByName("DriedFish").active = false;
        // var t = cc.moveTo(.5, 0, 180), i = cc.sequence(cc.delayTime(1), t);
        // this.node.getChildByName("content").runAction(i);
    },

    showOtherApps(){
        // this.node.getChildByName("otherAppsPanel")
        var stageNum = 0;
        // console.log("1111")
        //= MT.USER.ComPer + MT.USER.TimePer + MT.USER.DogPer + MT.USER.SkatPer + MT.USER.NightPer + MT.USER.TrapPer - 6;
        for(let i = 0;i != MT.USER.ComPer.length;i ++){
            stageNum = stageNum + MT.USER.ComPer[i] +MT.USER.TimePer[i] + MT.USER.DogPer[i] + MT.USER.SkatPer[i] + MT.USER.NightPer[i] + MT.USER.TrapPer[i];
        }
        stageNum -= 30;
        if(stageNum < 7){
            this.otherAppsPanel.active = false;
            return;
        }else{
            this.otherAppsPanel.active = true;
        }
        for(let i = 0;i != MT.GLOBAL.constData.otherApps.length;i ++){
            let pItem = cc.instantiate(this.otherAppItem);
            pItem.active = true;
            pItem.getComponent("OtherAppItemJs").setBtnInfo(i)
            this.otherAppsContent.addChild(pItem);
            //pItem.y = 91;
        }

        let pItem = cc.instantiate(this.otherAppItem);
        pItem.active = true;
        pItem.removeComponent("OtherAppItemJs");
        this.otherAppsContent.addChild(pItem);
        //pItem.y = 91;

    },

    showLayer:function(){
        this.gameLoseLayer.active = this.overType == gameLose;
        this.gameWinLayer.active = this.overType == gameWin;
    },
    visionTaiTou: function() {
        var a = this.node.getChildByName("content").getChildByName("Muen").getChildByName("GameOverBox").getChildByName("taiTou");
        a.opacity = 255;
        let str = "";
        switch(MT.USER.CustomsSize){
            case 0:
            str = "普通模式-";
            break;

            case 1:
            str = "限时模式-";
            break;

            case 2:
            str = "狂欢模式-";
            break;

            case 3:
            str = "溜冰模式-";
            break;

            case 4:
            str = "探险模式-";
            break;
            case 5:
            str = "陷阱模式-";
            break;
            default:
            console.log("关卡类型错误")
            break;
        }
        a.getChildByName("GuanQia").getChildByName("Di").getComponent(cc.Label).string = str;
    },
    start: function() {},
    onButtonMoreGame: function() {
        MT.AUDIOMGR.playEffect("button");
         //0 == this.UpType && SdkManager.showMoreGame();
    },
    onButtonBreakHome: function() {
        //o.playEffect("button"), 0 == this.UpType && (SdkManager.hideBanner(), MT.GLOBAL.loadScene("MazeRecruit_LoginScene"));
        MT.AUDIOMGR.playEffect("button");
        // if(0 == this.UpType){
        //     MT.GLOBAL.loadScene("loginScene")
        // }
        if(0 == this.UpType){
            // MT.GLOBAL.loadScene("selectionScene")
            MT.GLOBAL.loadScene("loginScene");
        }

    },
    onButtonRestartGame:function(){
        this.Father.GameReset();
        this.deleteSelf();
    },
    onButtonContinueGame: function() {
        // 0 == this.UpType && (1 == this.overType ? this.Father.GameReset() : (MT.USER.DriedFishNum += MT.GLOBAL.REWARD_NUM, 
        // MT.USER.setSave_DriedFishNum(), this.Father.newGame()),// SdkManager.hideBanner(), 
        // this.deleteSelf());

        0 == this.UpType && (gameLose == this.overType ? this.Father.GameReset() : (this.Father.newGame()),// SdkManager.hideBanner(), 
        this.deleteSelf());
    },
    onButtonShare:function(){
        console.log("++onButtonShare++")
        MT.AUDIOMGR.playEffect("button");
        let randNum = Math.floor(Math.random() * MT.GLOBAL.constData.self_app.shareImgs.length);
        MT.WXHELPER.share(MT.GLOBAL.constData.self_app.name, MT.GLOBAL.constData.self_app.shareImgs[randNum],"",function(){
            console.log("login--onBtnShare",MT.GLOBAL.constData.self_app.name,MT.GLOBAL.constData.self_app.shareImgs[randNum])
        })
    },
    onButtonDouble: function() {
        MT.AUDIOMGR.playEffect("button");
        if (0 == this.UpType) {
            console.log("点击翻倍按钮11")
            // var a = this;
            //Load_YvesYu.createLoading(this.node)
            //, 1 == this.doubleType ?(MT.MODULE.setShareCall(this.ShareCall.bind(this))) : SdkManager.showRewardedVideoAd(MT.wxVideoId, function(t) {
            //     console.log("视频回调"), t ? (MT.USER.DriedFishNum += 15, a.onButtonContinueGame()) : Hint_YvesYu.createHint("请观看完,完整的视频!", a.node), 
            //     Load_YvesYu.finishLoading();
            // });
        }
    },
    ShareCall: function() {
        showModal("双倍奖励", "通关奖励翻倍!", !1, function() {
            MT.USER.DriedFishNum += MT.GLOBAL.REWARD_NUM, this.onButtonContinueGame(), Load_YvesYu.finishLoading();
        }.bind(this), function() {}.bind(this));
    },
    deleteSelf: function() {
        MT.AUDIOMGR.playEffect("button");
        this.node.destroy();
    },
    // onButtonUp: function() {
    //     MT.AUDIOMGR.playEffect("button");
    //     if (0 == this.UpType) {
    //         this.UpType = 1;
    //         var a = cc.rotateBy(.5, 180);
    //         this.node.getChildByName("content").getChildByName("Muen").getChildByName("up").runAction(a);
    //         var e = cc.scaleTo(.5, 1, .2);
    //         this.node.getChildByName("content").getChildByName("Muen").getChildByName("GameOverBox").runAction(e);
    //         var t = cc.moveTo(.5, 0, 330);
    //         this.node.getChildByName("content").runAction(cc.sequence(t, cc.callFunc(function() {
    //             this.UpCallFunc();
    //         }.bind(this)))), this.advertising.active = !1, this.Like.active = !1;// SdkManager.hideBanner();
    //     } else this.UpType = 0, this.DownCallFunc(), a = cc.rotateBy(.5, 180), this.node.getChildByName("content").getChildByName("Muen").getChildByName("up").runAction(a), 
    //     e = cc.scaleTo(.5, 1, 1), this.node.getChildByName("content").getChildByName("Muen").getChildByName("GameOverBox").runAction(e), 
    //     t = cc.moveTo(.5, 0, 180), this.node.getChildByName("content").runAction(t), this.advertising.active = !0, 
    //     this.Like.active = !0;
    // },
    // UpCallFunc: function() {
    //     if (this.node.getChildByName("content").getChildByName("Muen").getChildByName("GameOverBox").active = !1, 
    //     this.node.getChildByName("content").getChildByName("Muen").getChildByName("GameOverBox_1").opacity = 255, 
    //     0 == this.overType) {
    //         var t = r(Math.random() * 3);
    //         console.log(t,"tttttttt");
    //         this.node.getChildByName("content").getChildByName("Muen").getChildByName("GameOverBox_1").getChildByName("Text").getComponent(cc.Label).string = MT.GLOBAL.appraise[t];
    //     } else t = r(Math.random() * 2), this.node.getChildByName("content").getChildByName("Muen").getChildByName("GameOverBox_1").getChildByName("Text").getComponent(cc.Label).string = "失败了" + t;
    // },
    // DownCallFunc: function() {
    //     this.node.getChildByName("content").getChildByName("Muen").getChildByName("GameOverBox").active = !0, 
    //     this.node.getChildByName("content").getChildByName("Muen").getChildByName("GameOverBox_1").opacity = 0;
    // }

    // update (dt) {},
});
