// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
import ListView, {AbsAdapter} from "./listView/ListView";

const ListAdapter = require('./listView/ListAdapter');
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
        title:cc.Label,
        listView:ListView,
        catFace:{
            default:[],
            type:cc.SpriteFrame,
        },
        houseSp:{
            default:[],
            type:cc.SpriteFrame,
        },
        themegreen:cc.Node,
        themeArr:{
            default:[],
            type:cc.Node,
        }
    },
    chooseSkin(){
        if(MT.USER.CustomsSize == 2 || MT.USER.CustomsSize == 5){
            this.themegreen.active = true;
            for(let i = 0;i != this.themeArr.length;i ++){
                this.themeArr.active = false;
            }
        }else{
            this.themegreen.active = false;
            for(let i = 0;i != this.themeArr.length;i ++){
                this.themeArr.active = true;
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad (){

        MT.GLOBAL.catFace = this.catFace;
        MT.GLOBAL.houseSp = this.houseSp;

        this.chooseSkin();

        

        this.e = MT.GLOBAL.normalStageNum / 5;
        if(3 == MT.USER.CustomsSize){
            this.e = MT.GLOBAL.iceStageNum / 5;
        }
        let a = 0;
        
        switch(MT.USER.CustomsSize){
            case 0:
            a = MT.USER.ComPer[MT.USER.SUBMODEL], console.log("____金典");
            break;

            case 1:
            a = MT.USER.TimePer[MT.USER.SUBMODEL], console.log("____限时");
            break;

            case 2:
            a = MT.USER.DogPer[MT.USER.SUBMODEL], console.log("____狂欢");
            break;

            case 3:
            a = MT.USER.SkatPer[MT.USER.SUBMODEL], console.log("____溜冰");
            break;

            case 4:
            a = MT.USER.NightPer[MT.USER.SUBMODEL], console.log("____黑夜");
            break;
            case 5:
            a = MT.USER.TrapPer[MT.USER.SUBMODEL], console.log("____陷阱");
            break;
            default:
            console.log("关卡类型错误")
            break;
        }
        this.a = a;
    },

    initData:function(){
        let adapter = new ListAdapter();
        
        let data = [];
        for(let i = 0;i < this.e;i +=4){
            let tab = [];
            tab.a = this.a;
            tab.i = i;
            data.push(tab);
        }
        // console.log(data,"data")
        adapter.setDataSet(data);
        this.listView.setAdapter(adapter);
    },
    start () {
        this.initData();
        cc.director.preloadScene("gameScene");
    },
    onButtonBreak: function() {
        MT.AUDIOMGR.playEffect("button"), 
        // cc.director.loadScene("selectionScene");
        MT.GLOBAL.loadScene("selectionScene")
    },
    onDestroy(){
        //MT.GLOBAL.catFace = [];
    },
    // update (dt) {},
});
