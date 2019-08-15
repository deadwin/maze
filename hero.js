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
        // Cae_0: {
        //     default: null,
        //     type: cc.Color,
        // },
        // Cae_1: {
        //     default: null,
        //     type: cc.Color
        // },
        // Cae_2: {
        //     default: null,
        //     type: cc.Color
        // },
        // Cae_3: {
        //     default: null,
        //     type: cc.Color
        // },
        // Cae_4: {
        //     default: null,
        //     type: cc.Color
        // },
        // Cae_5: {
        //     default: null,
        //     type: cc.Color
        // },
        // Die: {
        //     default: null,
        //     type: cc.Color
        // },
        FacePoin:cc.Sprite,
        Father: {
            default: null
        }
    },
    onLoad: function() {
        //this.initCatSkin();
        //this.schedule(this.updateSink, .1);
        //this.FacePoin.runAction(cc.repeatForever(cc.sequence()))
    },
    updateSink: function() {
        //this.TypeSkin != MT.USER.Cat_Skin && this.initCatSkin();
    },
    initCatSkin: function() {
        // switch (this.TypeSkin = MT.USER.Cat_Skin, MT.USER.Cat_Skin) {
        //   case 0:
        //     this.catSkin = this.Cae_0;
        //     break;

        //   case 1:
        //     this.catSkin = this.Cae_1;
        //     break;

        //   case 2:
        //     this.catSkin = this.Cae_2;
        //     break;

        //   case 3:
        //     this.catSkin = this.Cae_3;
        //     break;

        //   case 4:
        //     this.catSkin = this.Cae_4;
        //     break;

        //   case 5:
        //     this.catSkin = this.Cae_5;
        // }
        this.time = 0;
        this.node.active = true;
        this.node.scale = 1;
        //this.node.color = this.catSkin;
        //this.schedule(this.switchoverCatSkin, .5);
    },
    // switchoverCatSkin: function() {
    //     this.time++, 3 < this.time && (this.time = 0), this.node.getComponent(cc.Sprite).spriteFrame = this.catSkin[this.time];
    // },
    rundieAction: function() {
        //console.log("rundieActionrundieAction")
        var t = cc.scaleTo(.5, .05);
        this.node.runAction(cc.sequence(t, cc.callFunc(function() {
            this.visiondieState();
        }.bind(this))));
    },
    visiondieState: function() {
        //this.unschedule(this.switchoverCatSkin);
        this.time = 0,
        // this.catSkin = this.Die, 
        //this.node.getComponent(cc.Sprite).spriteFrame = this.catSkin[this.time],
        this.schedule(this.dieCall, 1);
        var t = cc.scaleTo(.2, .2);
        this.node.runAction(t);
    },
    dieCall: function() {
        //console.log('dieCalldieCall')
        this.time++, 1 < this.time && (this.time = 0);
        //this.node.getComponent(cc.Sprite).spriteFrame = this.catSkin[this.time];
    },
    deleteSelf: function() {
        this.node.destroy();
    },
    // onCollisionStay: function(a, e) {

    // },
    onCollisionEnter: function (other, self) {
        //console.log(other,self,'++onCollisionStay++')
        this.Father.impact && this.Father.ImpactOfZoon(other, self);
    },

    hideAcion:function(){
        //console.log("移动隐藏身上道具")
        for(let i = 0;i != 4;i ++){
            this.node.getChildByName("arrow_" + i).active = false;
        }
    },
    showAction:function(i){
        //console.log("显示身上道具");
        // for(let i = 0;i != 4;i ++){
        //     this.node.getChildByName("arrow_" + i).active = true;
        // }
        //for(let i = 0;i != 4;i ++){
            let arrow = this.node.getChildByName("arrow_" + i);
            arrow.active = true;
            arrow.stopAllActions();
            arrow.runAction(this.getArrowAction());
            
        //}
    },
    setDirection:function(newPos){
        //console.log(newPos,this.node.position);
        if(newPos.x > (this.node.x + 10)){
            
            this.FacePoin.node.angle = 90;
        }else if(newPos.x < (this.node.x - 10)){
            this.FacePoin.node.angle = -90;
        }else if(newPos.y > (this.node.y + 10)){
            this.FacePoin.node.angle = -180;
        }else{
            this.FacePoin.node.angle = 0;
        }
        //console.log(this.node.angle,"旋转角度")
    },
    start: function() {
        for(let i = 0;i != 4;i ++){
            this.node.getChildByName("arrow_" + i).runAction(this.getArrowAction())
        }
    },
    getArrowAction:function(){
        return cc.repeatForever(cc.sequence(cc.scaleTo(1.8,0.7),cc.scaleTo(1.8,1.1)));
    }
});
