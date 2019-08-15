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
    properties: {},
    onLoad: function() {
        this.goalPoint, this.finishPos, this.node.opacity = 0;
    },
    setGoalPoint: function(t) {
        this.goalPoint = t;
    },
    startAction: function(n, e) {
        this.finishPos = this.node.position;
        var t = cc.moveTo(n, this.goalPoint.x, this.goalPoint.y), i = cc.fadeIn(n);
        this.node.runAction(cc.sequence(cc.delayTime(e), cc.spawn(i, t)));
        //console.log(this.node,)
    },
    finishAction: function(n, e) {
        var t = cc.moveTo(n, this.finishPos.x, this.finishPos.y), i = cc.fadeOut(n);
        this.node.runAction(cc.sequence(cc.delayTime(e), cc.spawn(i, t), cc.callFunc(function() {
            this.deleteSelf();
        }.bind(this))));
    },
    deleteSelf: function() {
        this.node.destroy();
    }

    // update (dt) {},
});
