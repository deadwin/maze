// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
const orginPos = new cc.v2(0,57);
const newPos = new cc.v2(0,112);
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
        Bottom_IconOn:cc.Node,
        img:cc.Node,
        modelName:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.reset();
    },

    start () {

    },
    reset(){
        this.Bottom_IconOn.active = false;
        this.modelName.active = false;
        this.img.position = orginPos;
    },
    onSelected(){
        this.Bottom_IconOn.active = true;
        this.modelName.active = true;
        this.img.position = newPos;
        this.Bottom_IconOn.stopAllActions();
        this.img.stopAllActions();
        this.img.active = true;

        let sc1 = cc.scaleTo(0.1,1.05,1.05);
        let sc2 = cc.scaleTo(0.1,0.95,0.95);
        let sc3 = cc.scaleTo(0.1,1,1);

        this.img.runAction(cc.sequence(cc.scaleTo(0.1,1.05,1.05),cc.scaleTo(0.1,0.95,0.95),cc.scaleTo(0.1,1.05,1.05),cc.scaleTo(0.1,0.95,0.95),cc.scaleTo(0.1,1,1)));
        this.Bottom_IconOn.runAction(cc.sequence(sc1,sc2,sc1,sc2,sc3));



        // var ac1 = cc.


    },
    // update (dt) {},
});
