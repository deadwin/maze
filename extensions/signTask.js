// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
const SignReward = [1,1,1,2,2,2,3];
const RewardInfo = [
    "小鱼干x1",
    "小鱼干x1",
    "小鱼干x1",
    "小鱼干x2",
    "小鱼干x2",
    "小鱼干x2",
    "小鱼干x3",
]

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
        itemArr:{
            default:[],
            type:cc.Node,
        },
        bg_red:cc.Node,

        bg_dark:cc.SpriteFrame,
        bg_light:cc.SpriteFrame,
        catArr:{
            default:[],
            type:cc.SpriteFrame,
        },
        btn_receive_spfm:cc.SpriteFrame,
        btn_receive_dark_spfm:cc.SpriteFrame,
        tipLayer:cc.Node,
        txtRewardInfo:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        for(let i = 0;i != this.itemArr.length;i ++){
            let randNum = Math.floor(Math.random() * 7);
            this.itemArr[i].getChildByName("cat").getComponent(cc.Sprite).spriteFrame = this.catArr[randNum];
        }
        this.tipLayer.active = false;
    },

    start () {

    },
    onBtnClose:function(){
        MT.WXHELPER.showCreateUserInfoButton();
        this.node.active = false;
    },
    onShow:function(){
        let _loginDays = MT.USER.loginDays;
        let _loginRewardDays = MT.USER.loginRewardDays;
        //console.log(_loginDays,_loginRewardDays,"aaaaa")

        for(let i = 0;i !=  this.itemArr.length;i ++){
            if(i == _loginDays && _loginDays != _loginRewardDays){
                this.itemArr[i].getChildByName("btn_receive").getComponent(cc.Sprite).spriteFrame = this.btn_receive_spfm;
                this.itemArr[i].getChildByName("btn_receive").active = true;
                this.itemArr[i].getChildByName("btn_receive").getComponent(cc.Button).interactable = true;
                this.itemArr[i].getChildByName("day").zIndex = 10;
                this.itemArr[i].getChildByName("btn_receive").on("click",this.onBtnGet,this);
                this.bg_red.parent = this.itemArr[i];
                this.bg_red.zIndex = 0;
                this.bg_red.position = cc.v2(0,77);
                this.bg_red.active = true;
            }else{
                this.itemArr[i].getChildByName("btn_receive").active = false;
                this.itemArr[i].getChildByName("btn_receive").getComponent(cc.Button).interactable = false;
            }
            if(i <= _loginRewardDays){
                this.itemArr[i].getChildByName("btn_receive").getComponent(cc.Sprite).spriteFrame = this.btn_receive_dark_spfm;
                this.itemArr[i].getChildByName("btn_receive").active = true;
            }
            //console.log(RewardInfo[i])
            this.itemArr[i].getChildByName("txtRewardInfo").getComponent(cc.Label).string = RewardInfo[i];
            // else{
                
            // }
        }
        MT.WXHELPER.hideCreateUserInfoButton();
        
        this.node.active = true;

        let _sessionid = cc.sys.localStorage.getItem("sessionid");
        if (_sessionid && _sessionid != "") {
        }else{
            for(let i = 0;i !=  this.itemArr.length;i ++){
                this.itemArr[i].getChildByName("btn_receive").active = false;
            }
        }
    },
    onBtnGet() {
        //console.log("aaaaa")
        MT.USER.loginRewardDays++;
        MT.USER.SetDataFife("loginRewardDays",MT.USER.loginRewardDays)
        this.onShow();
        
        this.tipLayer.active = true;
        this.tipLayer.getChildByName("FishTwinkle").runAction(cc.blink(1.5,3));

        this.txtRewardInfo.string = "X" + SignReward[MT.USER.loginDays];
        //this.m_rewardPage1.active = true;

        //let _reward = this.m_rewards[MT.USER.loginDays];
        //this.m_page1_lbl.string = "+" + _reward.toString();
        MT.USER.DriedFishNum += SignReward[MT.USER.loginDays];
        MT.USER.setSave_DriedFishNum();
    },
    onBtnHideTipLayer:function(){
        this.tipLayer.active = false;
    },

    // update (dt) {},
});
