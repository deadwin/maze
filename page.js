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
        modelID:-1,
        title:cc.Label,
        btnSubModelArr:{
            default:[],
            type:cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(this.modelID < 0){
            console.log("未初始化modelID");
        }
        this.title.string = MT.GLOBAL.constData.CONST_WORDS["model" + this.modelID];

        var a = null;
        var number = 20;
        switch(this.modelID){
            case 0:
            a = MT.USER.ComPer, console.log("____金典");
            break;

            case 1:
            a = MT.USER.TimePer, console.log("____限时");
            break;

            case 2:
            a = MT.USER.DogPer, console.log("____狂欢");
            break;
            case 3:
            a = MT.USER.SkatPer, console.log("____溜冰");
            number = 9;
            break;
            case 4:
            a = MT.USER.NightPer, console.log("____黑夜");
            break;
            case 5:
            a = MT.USER.TrapPer, console.log("____陷阱");
            break;
            default:
            console.log("关卡类型错误")
            break;
        }


        for(let i = 0;i != this.btnSubModelArr.length;i ++){
            let progressBar = this.btnSubModelArr[i].getChildByName("progressBar");
            let txtProgress = progressBar.getChildByName("txtProgress");
            progressBar.getComponent(cc.ProgressBar).progress = (a[i] - 1) / number;
            txtProgress.getComponent(cc.Label).string = ((a[i] - 1) / number * 100).toFixed(0) + "%";
        }

    },
    onBtnSelectStage:function(event,type){

        //MT.USER.CustomsSize = type;
        MT.AUDIOMGR.playEffect("button");
        //console.log(MT.USER.CustomsSize);
        MT.USER.SUBMODEL =  type;
        MT.GLOBAL.loadScene("customScene");
    },

    start () {

    },

    // update (dt) {},
});
