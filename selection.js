// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var transNum = function(oldNumer){
    var newNumber = 0;
    switch(oldNumer){
        case 2:
        newNumber = 1;
        break;
        case 4:
        newNumber = 2;
        break;
        case 5:
        newNumber = 3;
        break;
        case 1:
        newNumber = 4;
        break;
        case 3:
        newNumber = 5;
        break;
    }
    return newNumber;
};
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
        classicItem:cc.Node,
        enemiesItem:cc.Node,
        iceFloorItem:cc.Node,
        fogItem:cc.Node,
        trapsItem:cc.Node,
        timeTrialItem:cc.Node,

        defaultModeItem:cc.Node,
        subModel:cc.PageView,
        modelScroll:cc.ScrollView,
        btnArrowLeft:cc.Node,
        btnArrowRight:cc.Node,
        modelItemsArr:{
            default:[],
            type:cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        WAITMGR.showWaitLayer();
        this.onBuType = 0;
        this.preButton = null;
        

        // var event = {
        //     target : this.defaultModeItem,
        // }
        this.modeType = -1;
        //this.modeType = event.target.getComponent(cc.Button).clickEvents[0].customEventData;
        //this.onBtnSetMode(event,event.target.getComponent(cc.Button).clickEvents[0].customEventData);
        // this.classicItem.getChildByName("percent").getComponent(cc.Label).string = (MT.USER.ComPer - 1).toFixed(1) + "%";
        // this.enemiesItem.getChildByName("percent").getComponent(cc.Label).string = (MT.USER.DogPer - 1).toFixed(1) + "%";
        // this.iceFloorItem.getChildByName("percent").getComponent(cc.Label).string = (MT.USER.SkatPer - 1).toFixed(1) + "%";
        // this.fogItem.getChildByName("percent").getComponent(cc.Label).string = (MT.USER.NightPer - 1).toFixed(1) + "%";
        // this.trapsItem.getChildByName("percent").getComponent(cc.Label).string = (MT.USER.TrapPer - 1).toFixed(1) + "%";
        // this.timeTrialItem.getChildByName("percent").getComponent(cc.Label).string = (MT.USER.TimePer - 1).toFixed(1) + "%";
    },

    start () {
        // var self = this;
        // this.node.runAction(cc.callFunc(function(){
        //     self.subModel.scrollToPage(self.modeType);
        // }))
        var event = {
            target : MT.USER.SUBMODEL ?this.modelItemsArr[transNum(MT.USER.CustomsSize)]:this.modelItemsArr[0],
        }
        this.onBtnSetMode(event,event.target.getComponent(cc.Button).clickEvents[0].customEventData);
        this.scheduleOnce(()=>{
            WAITMGR.hideWaitLayer();
        },0.1)
    },
    
    endScene: function() {
        MT.AUDIOMGR.playEffect("button");
        MT.GLOBAL.loadScene("loginScene")
        // 0 == this.onBuType ? MT.GLOBAL.loadScene("loginScene"):MT.GLOBAL.loadScene("customScene");
    },
    // endScene: function() {
    //     MT.AUDIOMGR.playEffect("button");
    //     0 == this.onBuType ? MT.GLOBAL.loadScene("loginScene"):MT.GLOBAL.loadScene("customScene");
    // },
    onButtCommonMode: function() {
        this.onBuType = 1;
        MT.USER.CustomsSize = 0, console.log("金典模式");
        this.endScene();
    },
    onBtnSetMode:function(event,type){
        // switch(type){

        // }
        if(this.modeType == Number(type)) return;
        if(this.preButton){
            this.preButton.getComponent(cc.Sprite).enabled = false;
            this.preButton.getComponent("item").reset();
        }

        this.modeType = Number(type);
        MT.USER.CustomsSize = (this.modeType);
        this.subModel.scrollToPage(transNum(this.modeType));

        this.btnArrowShow();

        this.preButton = event.target;
        this.preButton.getComponent("item").onSelected();
        this.preButton.getComponent(cc.Sprite).enabled = true;
        //console.log(type,"typeeee")
    },
    btnArrowShow:function(){
        this.btnArrowRight.active = this.subModel.getCurrentPageIndex() != 5;
        this.btnArrowLeft.active = this.subModel.getCurrentPageIndex() != 0;
        if(this.subModel.getCurrentPageIndex() >= 3){
            this.modelScroll.scrollToBottomRight(0.5);
            if(this.subModel.getCurrentPageIndex() == 5){
                
            }
        }else{
            this.modelScroll.scrollToBottomLeft(0.5);
        }

    },
    onBtnArrowEvent:function(event,direction){
        var event = {
            target : null,
        }
        var type = null;
        switch(direction){
            case "left":
                event.target = this.modelItemsArr[this.subModel.getCurrentPageIndex() - 1]; 
                type = event.target.getComponent(cc.Button).clickEvents[0].customEventData;
            break;
            case "right":
                event.target = this.modelItemsArr[this.subModel.getCurrentPageIndex() + 1]; 
                type = event.target.getComponent(cc.Button).clickEvents[0].customEventData;
            break;
            default:
                console.error("按钮参数为空")
            break;
        }
        this.onBtnSetMode(event,type)
    },

    onUpdatePage:function(){
        if(this.preButton){
            this.preButton.getComponent(cc.Sprite).enabled = false;
            this.preButton.getComponent("item").reset();
        }
        this.btnArrowShow();

        
        this.preButton = this.modelItemsArr[this.subModel.getCurrentPageIndex()];

        MT.USER.CustomsSize = Number(this.preButton.getComponent(cc.Button).clickEvents[0].customEventData)
        this.preButton.getComponent("item").onSelected();
        this.preButton.getComponent(cc.Sprite).enabled = true;

    },




    onButtTimeMode: function() {
        this.onBuType = 1, 
        MT.USER.CustomsSize = 1;
        console.log("限时模式");
        this.endScene();
    },
    onButtDogMode: function() {
        this.onBuType = 1, MT.USER.CustomsSize = 2, console.log("狂欢模式");
        this.endScene();
    },
    onButtSkatingMode: function() {
        this.onBuType = 1, MT.USER.CustomsSize = 3, console.log("溜冰模式");
        this.endScene();
    },
    onButtNightMode: function() {
        this.onBuType = 1, MT.USER.CustomsSize = 4, console.log("黑夜模式");
        this.endScene();
    },
    onButtTrapMode: function() {
        this.onBuType = 1, MT.USER.CustomsSize = 5, console.log("陷阱模式");
        this.endScene();
    }

    // update (dt) {},
});
