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
        Dog_0: {
            default: [],
            type: cc.SpriteFrame
        },
        Dog_1: {
            default: [],
            type: cc.SpriteFrame
        },
        Dog_2: {
            default: [],
            type: cc.SpriteFrame
        }
    },
    onLoad: function() {
        var t = r(Math.random() * 2);
        switch (this.DogSkin = null, t) {
          case 0:
            this.DogSkin = this.Dog_0;
            break;

          case 1:
            this.DogSkin = this.Dog_1;
            break;

          case 2:
            this.DogSkin = this.Dog_2;
        }
        this.time = 0, this.node.getComponent(cc.Sprite).spriteFrame = this.DogSkin[this.time], 
        this.schedule(this.qieHuanDogSkin, 1), this.RunType = !1, this.RunPosition, this.runTiam, 
        this.getRunTiem();
    },
    qieHuanDogSkin: function() {
        this.time++, 1 < this.time && (this.time = 0), this.node.getComponent(cc.Sprite).spriteFrame = this.DogSkin[this.time];
    },
    getRunTiem: function() {
        this.runTiam = (r(Math.random() * 4) + 3) / 10;
    },
    setDogRunAction: function(a) {
        30 > r(Math.random() * 100) && this.getRunTiem(), this.RunType = !0;
        var e = cc.moveTo(this.runTiam, a.x, a.y);
        this.node.runAction(cc.sequence(e, cc.callFunc(function() {
            this.RunType = !1;
        }.bind(this))));
    },
    deleteSelf: function() {
        this.node.destroy();
    },
    RunState: function() {
        return this.RunType;
    },
    start: function() {}
});
