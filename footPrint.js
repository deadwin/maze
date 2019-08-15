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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    onLoad: function() {},
    initFooprint: function(t) {
        0 == t ? (this.node.angle = -90)//,this.node.getChildByName("node").height = 100)
        : 1 == t ? (this.node.angle = -270)//,this.node.getChildByName("node").height = 100)
        : 2 == t ? (this.node.angle = 0)//,this.node.getChildByName("node").height = 100.5)
        : 3 == t && (this.node.angle = -180)//,this.node.getChildByName("node").height = 100.5);
        this.node.scaleY = 0;
    },
    runFootPrintAction: function(time) {
        // var r = cc.fadeTo(1, 150), e = cc.scaleTo(1, .5), t = cc.fadeTo(1, 255), i = cc.scaleTo(1, .7), a = cc.spawn(r, e), n = cc.spawn(t, i), o = cc.sequence(a, n);
        // this.node.runAction(cc.repeatForever(o));


        this.node.runAction(cc.scaleTo(time,1,1));
    },
    start: function() {},
    deleteSelf: function(time) {
        var self = this;
        
        this.node.stopAllActions();
        this.node.runAction(cc.sequence(cc.scaleTo(time,1,0),cc.callFunc(function(){
           self.node.destroy();
        })))

    }

    // update (dt) {},
});
