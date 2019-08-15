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
        //DiredFish_Pre: cc.Prefab
    },
    onLoad: function() {
        this.DownFishNum(), this.schedule(this.DownFishNum, 1);
    },
    DownFishNum: function() {
        var t = MT.USER.DriedFishNum;
        1e4 < t && (t = d(t / 1e3) + "K"), this.node.getChildByName("fishNum").getComponent(cc.Label).string = t;
    },
    onButtonSelf: function() {
        MT.AUDIOMGR.playEffect("button");
        // var a = cc.instantiate(this.DiredFish_Pre);
        // a.getComponent(MT.GLOBAL.CONST_TEXT.GetMoreStar).Father = this, cc.find("Canvas").addChild(a);
    },
    start: function() {},
});