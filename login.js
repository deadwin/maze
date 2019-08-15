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
        advertisingIcon: cc.Node,
        Like: cc.Node,
        wxRankPanelPrefab:cc.Prefab,
        btnMusicON:cc.Node,
        btnMusicOFF:cc.Node,
        followLayerPrefab:cc.Prefab,
        //txtBestStage:cc.Label,
        fengche:cc.Node,
        signInUIPrefab:cc.Prefab,
        inviteFriendPrefab:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //MT.USER.initGame();



        console.log(MT.AUDIOMGR);
        // let str = MT.USER.GetDataFifeString("ttt",{a:5,b:6});
        // console.log(str);
        // MT.USER.setDataForKey("ttt",JSON.stringify({a:5,b:6}))
        // let data =JSON.parse(MT.USER.GetDataFifeString("ttt",{}));
        // console.log(data.a,data)
        // console.log(MT.USER.ComPer)
        
        // console.log(MT.USER.ComPer)
        MT.MODULE.initModule();
        if(MT.USER.Music){
            //MT.AUDIOMGR.loadAudio("sounds/BackMusic")
        }
        MT.USER.Music || MT.AUDIOMGR.setSoundSilence(true);
        MT.WXHELPER.wxOnShow();
        // MT.AUDIOMGR.loadAudio("sounds/button"), 
        //             //MT.AUDIOMGR.loadAudio("sounds/Gamedie"),
        //              MT.AUDIOMGR.loadAudio("sounds/clock_ticking"), 
        //             MT.AUDIOMGR.loadAudio("sounds/corner"),
        //             //MT.AUDIOMGR.loadAudio("sounds/pass"), 
        //             MT.AUDIOMGR.loadAudio("sounds/level_complete"),
        //              MT.AUDIOMGR.loadAudio("sounds/level_creation");
                    //MT.AUDIOMGR.loadAudio("sounds/BackMusic");

        this.setMusicBtnStatus();
        // var txtPassedStage = 0;
        // // console.log("1111")
        // //= MT.USER.ComPer + MT.USER.TimePer + MT.USER.DogPer + MT.USER.SkatPer + MT.USER.NightPer + MT.USER.TrapPer - 6;
        // for(let i = 0;i != MT.USER.ComPer.length;i ++){
        //     txtPassedStage = txtPassedStage + MT.USER.ComPer[i] +MT.USER.TimePer[i] + MT.USER.DogPer[i] + MT.USER.SkatPer[i] + MT.USER.NightPer[i] + MT.USER.TrapPer[i];
        // }
        // txtPassedStage -= 30;
        // this.txtBestStage.string = txtPassedStage;
        this.fengche.runAction(cc.repeatForever(cc.rotateBy(0.5,-300)));
        this.fengche.parent.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(2,30),cc.rotateTo(2,-30))))
        cc.director.preloadScene("selectionScene");
    },

    start () {
        // var arr = [2,5,8];
        // var index = arr.indexOf(5);
        // if(index > -1){
        //     arr.splice(index,1);
        // }
    },
    onButtonStartGame: function() {
        MT.AUDIOMGR.playEffect("button");
        MT.WXHELPER.hideGameClubBtn();
        MT.GLOBAL.firstLogin = true;
        MT.GLOBAL.loadScene("selectionScene");
        
    },

    onBtnShare:function(){
        MT.AUDIOMGR.playEffect("button");
        let randNum = Math.floor(Math.random() * MT.GLOBAL.constData.self_app.shareImgs.length);
        MT.WXHELPER.share(MT.GLOBAL.constData.self_app.name, MT.GLOBAL.constData.self_app.shareImgs[randNum],"",function(){
            console.log("login--onBtnShare",MT.GLOBAL.constData.self_app.name,MT.GLOBAL.constData.self_app.shareImgs[randNum])
        })
    },

    onBtnShowInviteLayer:function(){
        if(this.inviteFriendLayer == null){
            this.inviteFriendLayer = cc.instantiate(this.inviteFriendPrefab);
            this.inviteFriendLayer.position = cc.v2(0,0);
            this.node.addChild(this.inviteFriendLayer);
        }
        this.inviteFriendLayer.getComponent("inviteFriend").onShow();
    },
    onBtnShowRank:function(){
        this.showWXRankPanel();
    },
    onBtnDateSign:function(){
        if(this.signInUI == null){
            this.signInUI = cc.instantiate(this.signInUIPrefab);
            this.signInUI.position = cc.v2(0,0);
            this.node.addChild(this.signInUI);
        }
        this.signInUI.getComponent("signTask").onShow();
    },

    showWXRankPanel:function(){
        if(this.wxRankPanel == null){
            this.wxRankPanel = cc.instantiate(this.wxRankPanelPrefab);
            this.wxRankPanel.position = cc.v2(0,0);
            this.node.getChildByName("wxRankNode").addChild(this.wxRankPanel);
        }

        this.wxRankPanel.getComponent("wxRank").onGetWXFriendInfo();
        this.wxRankPanel.getComponent("wxRank").onShowVRank();

        // var self = this;
        // self.schedule(function(){
        //     let i = Math.floor(Math.random() * 3);
        //     //console.log(self.wxRankPanel,"wwwwwww")
        //     switch(i){
        //         case 0:
        //         self.wxRankPanel.getComponent("wxRank").onGetWXFriendInfo();
        //         break;
        //         case 1:
        //         self.wxRankPanel.getComponent("wxRank").onShowRandRank();
        //         break;
        //         case 2:
        //         self.wxRankPanel.getComponent("wxRank").onShowVRank();
        //         break;
        //         default:
        //         self.wxRankPanel.getComponent("wxRank").hide();
        //         break;
        //     }

        // },1)

    },

    setMusicBtnStatus(){
        this.btnMusicON.active = MT.USER.Music;
        this.btnMusicOFF.active = !MT.USER.Music;
    },

    onButtonMusic: function() {
        if(MT.USER.Music){
            MT.USER.Music = false;
            MT.AUDIOMGR.setSoundSilence(true);
            MT.USER.Sound = false;
            MT.AUDIOMGR.stopMusic();
            this.setMusicBtnStatus();
        }else{
            MT.USER.Music = true;
            MT.USER.Sound = true;
            this.setMusicBtnStatus();
            MT.AUDIOMGR.setSoundSilence(false);
            MT.AUDIOMGR.playMusic("BackMusic", true, .5, !1)
        }
        MT.USER.setSave_Music();
        MT.AUDIOMGR.playEffect("button");
    },

    btnOnFollowLayer:function(){
        this.node.getChildByName("mainNode").addChild(cc.instantiate(this.followLayerPrefab));
    },

    // onButtonSound: function() {
    //     MT.USER.Sound ? (MT.USER.Sound = !1, t.setSoundSilence(!0), this.node.getChildByName("pauseBox").getChildByName("Sound").getChildByName("Box").getChildByName("on").active = !1) : (MT.USER.Sound = !0, 
    //     t.setSoundSilence(!1), this.node.getChildByName("pauseBox").getChildByName("Sound").getChildByName("Box").getChildByName("on").active = !0), 
    //     MT.USER.setSave_Sound();
    //     MT.AUDIOMGR.playEffect("button");
    // },

    // update (dt) {},
});
