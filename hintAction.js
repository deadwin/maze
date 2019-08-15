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
        BackGround: cc.Node,
        Text: cc.Label
    },
    onLoad: function() {
        this.heig, this.index;
    },
    initHint: function(a, e) {
        this.Text.getComponent(cc.Label).string = a, this.scheduleOnce(this.nextFrame_1, 2 / 60), 
        this.node.opacity = 0, this.index = e, this.scheduleOnce(this.deleteHint, 2);
    },
    setindex: function(t) {
        this.index = t;
    },
    nextFrame_1: function() {
        380 <= this.Text.node.width ? (this.Text.getComponent(cc.Label).overflow = 3, this.Text.node.width = 380, 
        this.scheduleOnce(this.nextFrame_2, 2 / 60)) : this.nextFrame_2();
    },
    nextFrame_2: function() {
        this.node.opacity = 255, this.Text.node.width;
        var a = this.Text.node.width;
        this.BackGround.width = a + 20, a = this.Text.node.height, this.BackGround.height = a + 20, 
        this.heig = a + 110;
        var e = cc.moveBy(.2, 0, 5), t = cc.fadeOut(10);
        this.node.runAction(cc.repeatForever(t)), this.node.runAction(e), Hint_YvesYu.ImprovePosition(this.heig, this.index);
    },
    deleteHint: function() {
        Hint_YvesYu.deleteHint(this.index), this.node.destroy();
    },
    start: function() {}
});
