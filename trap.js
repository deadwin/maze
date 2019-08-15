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
        time:6,
        //pitfallNum:0,
        bAction: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.bAction = false;
    },

    start () {
        this.schedule(this.createAction,1);
    },
    startAction:function(){
        this.bAction = true;
        for(let i = 0; i != this.node.children.length;i ++){
            this.node.children[i].getComponent("pitfall").run();
        }
    },
    stopAction:function(){
        this.bAction = false;
        for(let i = 0; i != this.node.children.length;i ++){
            this.node.children[i].getComponent("pitfall").stop();
        }
    }, 
    createAction:function(){
        var self = this;
        if(this.bAction){
            //console.log("createAction")
            this.time += 1;
            let i = Math.floor(this.time);
            //console.log(i,MT.GLOBAL.trapFreshTime)
            if(i % MT.GLOBAL.trapFreshTime == 0){
                self.createPitfall();
            }
            // self.node.runAction(cc.sequence(cc.delayTime(self.time % MT.GLOBAL.trapFreshTime),cc.callFunc(function(){
            //     self.createPitfall();
            // }),cc.delayTime(MT.GLOBAL.trapFreshTime),cc.callFunc(function(){
            //     self.node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function(){
            //         self.createPitfall();
            //     }),cc.delayTime(MT.GLOBAL.trapFreshTime))))
            // })))

        }
    },
    createPitfall:function(){
        let gameComp = cc.find("Canvas").getComponent("game")
        let pitfall = cc.instantiate(gameComp._resources[gameComp._pitfall]);
        pitfall.position = cc.v2(pitfall.width,0);
        // console.log(++this.pitfallNum,"pitfallNum");
        pitfall.group = MT.MazeRecruit_Group.getMazeRecruit_Zoon();
        //console.log(pitfall.group,"group")
        this.node.addChild(pitfall);
        pitfall.getComponent("pitfall").run();
    },
    onDestroy(){
        this.unschedule(this.createAction,this);
    }
    // update (dt) {
    // },
});
