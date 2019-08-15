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
        cricle: cc.Node
    },
    onLoad: function() {
        console.log("--------------111111111111");
        var t = cc.rotateBy(2, 360);
        this.cricle.runAction(cc.repeatForever(t)), this.scheduleOnce(this.finishLoading, 12);
    },
    start: function() {},
    finishLoading: function() {
        Load_YvesYu.setM_LoadNull(), this.node.destroy();
    }
});
