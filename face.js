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
        //Help: cc.SpriteFrame,
        // facePicture: {
        //     default: [],
        //     type: cc.SpriteFrame
        // }
    },
    onLoad: function() {
        this.node.active = false;
        //this.node.zIndex = 10, this.FaseSetPosition(), this.schedule(this.FaseSetPosition, 1 / 60);
    },
    FaseSetPosition: function() {
        // var a = this.Cat.convertToWorldSpaceAR(cc.v2(0, 0)), e = this.node.getParent().convertToNodeSpaceAR(a);
        // this.node.position = e;
    },
    visionHilp: function() {
        // this.node.active = !0, this.node.getComponent(cc.Sprite).spriteFrame = this.Help, 
        // this.node.tag = -1, this.scheduleOnce(this.deletePicture, 2);
    },
    setCat: function(t) {
        //this.Cat = t;
    },
    deletePicture: function() {
        //this.node.active = !1;
    },
    deleteHelp: function() {
        //-1 == this.node.tag && 1 == this.node.active && (this.node.active = !1);
    },
    viisonFace: function() {
        //1 == this.node.active && -1 == this.node.tag || (this.node.active = !0, this.node.tag = r(cc.rand() % 28), 
        //this.node.getComponent(cc.Sprite).spriteFrame = this.facePicture[this.node.tag], 
        //this.scheduleOnce(this.deletePicture, 3));
    },
    deleteSelf: function() {
        //this.node.destroy();
    },
    start: function() {}

    // update (dt) {},
});
