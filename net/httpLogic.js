var HttpLogic = {
    loginFailedCnt : 0,
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
            // this.loading();
        }
    },

    onLoginFailed() {
        console.log("onLoginFailed,不做处理");
        // var self = this;
        // if(this.tryLoginTime <= 3){
        //     this.tryLoginTime ++;
        // }
        // if(this.tryLoginTime <= 2){
        //     self.doLogin();
        // }else{
        //     // self.loading();
        // }

        // MT.WXHELPER.showModal("提示", "网络请求失败，请检查网络后重试!", false, function(){
        //     self.doLogin();
        // }, null);
    },

    onLoginSuccess(res) {
        console.log("HTTP:onLoginSuccess", res);
        if (res.result) {
            // MT.USER.init(JSON.parse(res.result));
            var result = JSON.parse(res.result);

            if (result.lastOnlineTime && result.lastOnlineTime > MT.USER.lastOnlineTime) {
                MT.USER.initFromServer(result);
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
        // this.loading();
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

};


module.exports = HttpLogic;