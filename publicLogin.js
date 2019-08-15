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
        // txtProgress:cc.Label,
        // icon:cc.Node,
        btnArr:{
            default:[],
            type:cc.Node,
        },
        txtBestStage:cc.Label,
        noticeLayerPrefab:cc.Prefab,
    },
    onLoad(){
        this.tryLoginTime = 0;
        if(!MT.USER.lastOnlineTime){
            MT.USER.initGame();
        }
        this.updateBestStageInfo();
        if(MT.GLOBAL.firstLogin == true){
            this.CreateWXGameClueBtn();
            
            return;
        }
        this.initOtherAppData();
        WAITMGR.initWaitLayer();

        for(let i = 0;i != this.btnArr.length;i ++){
            this.btnArr[i].active = false;
        }

        //this.txtProgress.string = "0%";
        if (CC_WECHATGAME) {
            if (!wx.getUpdateManager) {
                console.log('不支持 wx.getUpdateManager')
                return;
            }
            let um = wx.getUpdateManager();
            um.onCheckForUpdate(function (res) {
                console.log("获取更新", res.hasUpdate);

            });
            um.onUpdateReady(function () {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                um.applyUpdate();
            })

            um.onUpdateFailed(function () {
                // 新的版本下载失败
            })
        }
        //this.initOtherAppData();
    },
    start: function() {
        //this.dogAction();

        // WAITMGR.initWaitLayer();
        if(MT.GLOBAL.firstLogin == true){
            return;
        }
        this.onLogin();

    },


    initOtherAppData(){
        var self = this;
        cc.loader.load(MT.GLOBAL.constData.app_config, (err, res) => {
            if (err) {
                cc.warn("loadExternalAsset error", url);
                return;
            }
            MT.GLOBAL.constData.otherApps = res;
            for(var i=0;i<MT.GLOBAL.constData.otherApps.length;i++){

                if(MT.GLOBAL.constData.otherApps[i].appid==MT.GLOBAL.constData.app_id){
                    MT.GLOBAL.constData.self_app = MT.GLOBAL.constData.otherApps[i];
                    MT.GLOBAL.constData.otherApps.splice(i,1);
                    break;
                }
            }
            // self.changeBoxIcon();
            // self.btnIcon.on("click",this.onBoxClick,this);
            // self.runBtnIcon();
            //console.log("---",res);
        });
    },
    onLogin:function(){
        MT.WXHELPER.initSystemInfo();
        MT.WXHELPER.WXGetUserInfo((info) => {
            this.onGetUserInfo(info);

            console.log("login成功",info)
        });
    },

    updateBestStageInfo:function(){
        var txtPassedStage = 0;
        // console.log("1111")
        //= MT.USER.ComPer + MT.USER.TimePer + MT.USER.DogPer + MT.USER.SkatPer + MT.USER.NightPer + MT.USER.TrapPer - 6;
        for(let i = 0;i != MT.USER.ComPer.length;i ++){
            txtPassedStage = txtPassedStage + MT.USER.ComPer[i] +MT.USER.TimePer[i] + MT.USER.DogPer[i] + MT.USER.SkatPer[i] + MT.USER.NightPer[i] + MT.USER.TrapPer[i];
        }
        txtPassedStage -= 30;
        this.txtBestStage.string = txtPassedStage;
    },

    
    doLogin(){
        var self = this;
        if (CC_WECHATGAME) {
            let _sessionid = cc.sys.localStorage.getItem("sessionid");
            console.log("sessionid", _sessionid);
            if (_sessionid && _sessionid != "") {
                this.checkToken();
            }
            else {
                console.log("WXLogin");
                //WXTools.WXLogin(gen_handler(this.onLoginSuccess, this), gen_handler(this.onLoginFailed, this), true);
                MT.WXHELPER.WXLogin(function(res){
                    self.onLoginSuccess(res);
                },
                function(){
                    self.onLoginFailed();
                },
                true)
            }
        }
        else {
            this.loading();
        }
    },

    onLoginSuccess(res) {
        console.log("onLoginSuccess", res);
        if (res.result) {
            // MT.USER.init(JSON.parse(res.result));
            var result = JSON.parse(res.result);
            // console.log(result.lastOnlineTime,MT.USER.lastOnlineTime,"时间时间")
            if (result.lastOnlineTime && result.lastOnlineTime > MT.USER.lastOnlineTime) {
                MT.USER.initFromServer(result);
                this.updateBestStageInfo();
                // UIManager.get_inst().getUI(UI_CONFIG.HomeUI, HomeUI).refresh();
            }
            console.log(result,"++onLoginSuccess++");
        }
        else {
            // MT.USER.init(null);
            MT.USER.initFromServer(null);
            console.log("error","++onLoginSuccess++");
            
        }
        // SceneManager.Instance.loadScene(SceneName.Game);
        
        MT.WXHELPER.getLaunchOptions();
        this.loading();
    },

    checkToken() {
        let _lastTime = MT.USER.lastOnlineTime;
        if ((Date.now() - _lastTime) / 1000 > MT.GLOBAL.tokenValidTime) {
            MT.WXHELPER.WXLogin((res) =>{
                this.onLoginSuccess(res);
            }, ()=>{
                this.onLoginFailed();
            });
        }
        else {
            //HttpServer.Instance.getUserData(gen_handler(this.onLoginSuccess, this), null);
            HttpServer.getUserData((res) =>{
                this.onLoginSuccess(res);
            },null)
        }
    },


    onLoginFailed() {
        console.log("onLoginFailed");
        var self = this;
        if(this.tryLoginTime <= 3){
            this.tryLoginTime ++;
        }
        if(this.tryLoginTime <= 2){
            self.doLogin();
        }else{
            self.loading();
        }

        // MT.WXHELPER.showModal("提示", "网络请求失败，请检查网络后重试!", false, function(){
        //     self.doLogin();
        // }, null);
    },

    // dogAction:function(){
    //     for (let i = 0; i < 3; i++) {
    //         let _node = this.icon.getChildByName("z" + i);
    //         console.log(i);
    //         _node.active = false;
    //     }

    //     this.schedule(() => {
    //         for (let i = 0; i < 3; i++) {
    //             let _n = this.icon.getChildByName("z" + i);
    //             this.scheduleOnce(() => {
    //                 _n.active = true;
    //             }, 0.2 * i);
    //         }
    //     }, 1, cc.macro.REPEAT_FOREVER);
    //     this.schedule(() => {
    //         for (let i = 0; i < 3; i++) {
    //             let _n = this.icon.getChildByName("z" + i);
    //             _n.active = false;
    //         }
    //     }, 1, cc.macro.REPEAT_FOREVER, 0.8);
    // },

    onGetUserInfo: function(res) {
        console.log(res,'++onGetUserInfo++')
        if (res && res.userInfo) {
            let _playerInfo = MT.GLOBAL.playerInfo;
            _playerInfo.avatarUrl = res.userInfo.avatarUrl ? res.userInfo.avatarUrl : "";
            _playerInfo.city = res.userInfo.city;
            _playerInfo.province = res.userInfo.province;
            _playerInfo.country = res.userInfo.country;
            _playerInfo.nickName = res.userInfo.nickName;
        }
        this.doLogin();
    },
    CreateWXGameClueBtn:function(){
        if (CC_WECHATGAME) {
            // this.m_gameClub.active = false;
            // let w = this.m_topBtns.width;
            // let left = w + 15;
            // let top = 667 - this.m_topBtns.y + this.m_gameClub.height * ConstData.screenScale / 2;
            // left = left / 2;
            // top = top / 2;
            let left = 9;
            let top = 150 / MT.GLOBAL.constData.screenScale;
            MT.WXHELPER.CreateGameClueBtn(left, top, 40, 40);
            
            // LoaderMgr.get_inst().loadAsset("arts/bigbg/btn_game", gen_handler((res) => {
                
            // }, this), cc.SpriteFrame);
        }
    },
    showNoticeLayer(){
        if(!this.noticeLayer){
            this.noticeLayer = cc.instantiate(this.noticeLayerPrefab);
            this.noticeLayer.position = cc.v2(0,0);
            this.node.addChild(this.noticeLayer);
            this.noticeLayer.getComponent("notice").onShow();
        }else{
            this.noticeLayer.getComponent("notice").onShow();
        }
    },

    onBtnOpenGongGao() {
        MT.WXHELPER.hideCreateUserInfoButton();
        if (MT.GLOBAL.gameGongGao == null) {
            HttpServer.gongGaoQuery(() => {
                this.showNoticeLayer();
            });
        }else{
            this.showNoticeLayer();            
        }
    },
    
    loading: function() {
        // cc.director.preloadScene("loginScene",(completedCount, totalCount, item) =>{
        //     //console.log(completedCount,totalCount,item);
        //     this.txtProgress.string = (completedCount / totalCount * 100).toFixed(0) + "%";
        // },(error) =>{
        //     if(!error){
        //         MT.GLOBAL.loadScene("loginScene");
        //     }else{
        //         console.log("加载失败",error)
        //     }
        // })
        // for(let i = 0;i != this.btnArr.length;i ++){
        //     this.btnArr[i].active = true;
        // }
        this.CreateWXGameClueBtn();
        if(MT.GLOBAL.firstLogin == true){
            MT.AUDIOMGR.playEffect("button");
            MT.WXHELPER.hideGameClubBtn();
            MT.GLOBAL.loadScene("selectionScene");
        }else{
            MT.GLOBAL.firstLogin = true;
            for(let i = 0;i != this.btnArr.length;i ++){
                this.btnArr[i].active = true;
            }
        }



    }
});
