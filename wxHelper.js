var wxHelper = {
    MessageType : cc.Enum({
        getInfo:0,
        showVRank: 1,
        showHRank:2,
        showRandRank:3,
        hideRank: 4,
    }),
    MessageInfoType:{
        score : "score",
    },

    m_lastShareTime : 0,
    m_title : null,
    m_query : null,
    m_imageUrl : null,
    m_sucCallBack : null,
    m_failCallBack : null,
    m_shareCnt : 0,
    clubButton:null,
    userInfoButton:null,
    onShowQuery : {},


    getLaunchOptions() {
        if (CC_WECHATGAME) {
            let e = wx.getLaunchOptionsSync();
            console.log("query11", e.query);
            if (!MT.WXHELPER.onShowQuery.prop && e.query) {
                console.log("query22", e.query);
                MT.WXHELPER.onShowQuery = e.query;
                if (e.query.token && (e.query.prop)) {
                    console.log("query33", e.query);
                    HttpServer.saveInvitePlayer();
                }
            }
        }
    },

    showToast(_str, _duration) {
        if (CC_WECHATGAME) {
            wx.showToast({
                title: _str,
                icon: 'none',
                duration: _duration
            })
        }
    },

    showToastWithIcon(_str, _duration) {
        if (CC_WECHATGAME) {
            wx.showToast({
                title: _str,
                icon: 'success',
                duration: _duration
            })
        }
    },

    share:function(title,imageUrl,query,sucCallBack,failCallBack,_shareType){

        this.m_lastShareTime = Date.now();
        this.m_title = title;
        this.m_imageUrl = imageUrl;
        this.m_query = query;
        this.m_sucCallBack = sucCallBack;
        this.m_failCallBack = failCallBack;
        this.m_shareCnt ++;
        if (!_shareType) {
            _shareType = 10;
        }

        if(CC_WECHATGAME){
            wx.shareAppMessage({
                title : this.m_title,
                imageUrl : this.m_imageUrl,
                query: "token=" + cc.sys.localStorage.getItem("sessionid") + "&prop=" + _shareType
                
            })
        }
        else{
            if(this.m_sucCallBack){
                this.m_sucCallBack();
            }
        }
    },

    resetShareData:function(){
        this.m_lastShareTime = 0;
        this.m_title = null;
        this.m_imageUrl = null;
        this.m_query = null;
        this.m_sucCallBack = null;
        this.m_failCallBack = null;
    },
    wxOnShow(){
        if (CC_WECHATGAME) {
            let that = this;
            wx.onShow(function (e) {
                //console.log("wx.onshow======",that.m_lastShareTime)
                if (that.m_lastShareTime > 0) {
                    that.resetShareData();
                    if (that.m_sucCallBack) {
                        //that.showToast("分享成功",1500)
                        that.m_sucCallBack();
                    }
                }
                //console.log("wxOnShow1", that.m_lastShareTime);
                that.resetShareData();
            });
        }else{
            console.log("++wxOnShow++")
        }
    },

    showModal(_title, _content, _showCanel, _success, _canel) {
        if (CC_WECHATGAME) {
            wx.showModal({
                title: _title,
                content: _content,
                showCancel: _showCanel,
                cancelText: "取消",
                cancelColor: "#000000",
                confirmText: "确定",
                confirmColor: "#1AAC19",
                success: function (res) {
                    if (res.confirm) {
                        if (_success) {
                            _success();
                        }
                    }
                    else if (res.cancel) {
                        if (_canel) {
                            _canel();
                        }
                    }
                },
                fail: function () {

                }
            });
        }
    },

    /**
     * 
     * @param {string} appid  要打开的appid
     * @param {function} sucCallBack    成功打开后的回调
     * @param {function} failCallBack 
     */
    wxNavigateToMiniProgram:function(appid,sucCallBack,failCallBack){
        if(CC_WECHATGAME){
            wx.navigateToMiniProgram({
                appId: appid,
                path: "",
                extraData: {
                //   foo: 'bar'
                },
                //envVersion: 'develop',
                envVersion:"",
                success(res) {
                    if(sucCallBack){
                        sucCallBack();
                    }
                },
                fail(res){
                    console.log("打开失败2222",res)
                }
              })
        }else{
            if(failCallBack){
                failCallBack();
            }
        }
    },
    /**
     * 利用微信接口加载图片wx.previewImage
     */
    previewImage:function() {
        let _urls = [];
        _urls.push(cc.mt.globalData.self_app.kefuma);
        if (CC_WECHATGAME) {
            wx.previewImage({
                urls: _urls,
                current: _urls[0],
                success: function (){
                    console.log("success");
                },
                fail: function (){
                    console.log("fail");
                }
            })
        }
    },
    wxPostMessage:function(messageType,infoType){
        if(CC_WECHATGAME){
            wx.getOpenDataContext().postMessage({
                message: messageType,
                infoType:infoType,
            });
        }else{
            console.log("wxPostMessage error,找不到微信子域");
        }
    },

    //   MT.WXHELPER.setUserCloudStorage(MT.WXHELPER.MessageInfoType.score,this.score)
    setUserCloudStorage:function(infoType,score){
        if(CC_WECHATGAME){
            wx.setUserCloudStorage({
                KVDataList: [{
                    key: infoType,
                    value:JSON.stringify({
                        wxgame:{
                            score:score,
                            update_time:Date.now()
                        }
                    })
                }],
                success: function() {
                    console.log("上传分数成功",infoType,score)
                },
                fail: function() {
                    console.error("第一次上传分数失败");
                }
            });
        }else{
            console.log("setUserCloudStorage error,找不到微信子域");
        }
    },
    WXGetUserInfo:function(_success){
        if (CC_WECHATGAME) {
            wx.getUserInfo({
                withCredentials: false,
                success: function (res) {
                    if (_success) {
                        _success(res);
                    }
                },
                fail: function () {
                    console.log("getUserInfo fail");
                    MT.WXHELPER.createUserInfoButton(_success);
                }
            });
        }
        else {
            if (_success) {
                _success("not wx");
            }
        }
    },

    initSystemInfo() {
        if (CC_WECHATGAME) {
            MT.WXHELPER.getSystemInfo();
        }
        else {
            console.log("initSystemInfo not wechat")
        }
    },
    getSystemInfo() {
        if (CC_WECHATGAME) {
            wx.getSystemInfo({
                success: res => {
                    MT.GLOBAL.constData.systemInfo = res;
                    let x = 720 / res.screenWidth;
                    let t = 1280 / x;
                    let r = t / res.screenHeight;
                    MT.GLOBAL.constData.screenScale = r;
                }
            });
        }
    },

    createUserInfoButton(_onClick) {
        let sw = MT.GLOBAL.constData.systemInfo.screenWidth;
        let sh = MT.GLOBAL.constData.systemInfo.screenHeight;
        this.userInfoButton = wx.createUserInfoButton({
            type: 'image',
            image: 'bg/commonBtn.png',
            style: {
                left: (sw - 186) / 2,
                top: .27* sh,
                width: 186,
                height: 185,
                lineHeight: 40,
                backgroundColor: '#1AAC19',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 5
            }
        });
        this.userInfoButton.onTap((e) => {
            if ("getUserInfo:ok" == e.errMsg) {
                this.userInfoButton.offTap(this);
                this.userInfoButton.destroy();
                if (_onClick) {
                    MT.GLOBAL.firstLogin = true;
                    _onClick(e);
                }
            }
        })
    },
    //隐藏微信授权按钮
    hideCreateUserInfoButton:function(){
        if(this.userInfoButton){
            this.userInfoButton.hide();
        }
    },
    showCreateUserInfoButton:function(){
        if(this.userInfoButton){
            this.userInfoButton.show();
        }
    },



    /**
     * 微信登陆，获取code发送给服务器
     */
    WXLogin(_success, _failed, _getData) {
        if (CC_WECHATGAME) {
            wx.login({
                success: function (res) {
                    console.log("login success : ", res.code);
                    let playerInfo = MT.GLOBAL.playerInfo;
                    let _data = {};
                    _data.js_code = res.code;
                    _data.type = "maze";
                    _data.avatar_url = playerInfo.avatarUrl;
                    _data.city = playerInfo.city; _data.province = playerInfo.province;
                    _data.country = playerInfo.country; _data.nickName = playerInfo.nickName;
                    _data.shareuser = ""; _data.prop = "0";
                    _data.scene = "0"; _data.appid = "0";
                    _data.channel = ""; _data.shareid = "";
                    let a = wx.getLaunchOptionsSync();
                    if (a) {
                        if (a.query) {
                            var o = a.query;
                            console.log("error  wxlogin",o)
                            o.channel && (_data.channel = o.channel),
                                o.shareuser && (_data.shareuser = o.shareuser, _data.prop = o.prop, _data.shareid = o.shareid);
                        }
                        a.scene && (_data.scene = a.scene), a.referrerInfo && a.referrerInfo.appId && (_data.appid = a.referrerInfo.appId);
                    }
                    console.log("start login", _data);
                    HttpServer.login(_data, _success, _failed, _getData);
                },
                fail:function(res){
                    console.log("微信login失败")
                    if(_failed){
                        _failed();
                    }
                },
            });
        }
    },


        /**
     * 创建微信游戏圈按钮，将常驻在游戏最上层
     */
    CreateGameClueBtn(_left, _top, w, h) {
        if (CC_WECHATGAME) {
            this.clubButton = wx.createGameClubButton({
                type: 'image',
                image: 'bg/clubIcon.png',
                icon: "white",
                style: {
                    left: _left,
                    top: _top,
                    width: 43,
                    height: 37
                }
            });
        }
    },
    hideGameClubBtn:function(){
        if(CC_WECHATGAME && this.clubButton){
            this.clubButton.hide();
        }
    },

    preloadVideo:function(func){
        if (CC_WECHATGAME) {
            if ("2.0.4" <= wx.getSystemInfoSync().SDKVersion) {
                this.m_videoAd = wx.createRewardedVideoAd({
                    adUnitId: 'adunit-4f250ecd0398a4f9'
                })

                this.m_videoAd.onClose(res => {
                    if (res.isEnded) {
                        console.log("看广告成功");
                        if (this.m_RewardADSuccess) {
                            this.m_RewardADSuccess();
                            this.clearReawardADHandle();
                        }
                    }
                    else {
                        console.log("主动关闭了广告");
                        if (this.m_RewardADClose) {
                            this.m_RewardADClose();
                            this.clearReawardADHandle();
                        }
                    }
                });
                this.m_videoAd.onLoad(() => {
                    console.log('激励视频 广告加载成功')
                    //self.videoAd.show().then(() => console.log('激励视频 广告显示'))
                })

                this.m_videoAd.onError(res => {
                    console.log("videoAd.onError", res.errMsg, res.errCode);
                    if (this.m_RewardADError) {
                        this.m_RewardADError();
                        this.clearReawardADHandle();
                    }
                })

            }else{
            console.log("wx video sdkverison error")
            }
        }else{
            console.log("no wx video")
        }
    },

    createRewardedVideoAd() {
        if (CC_WECHATGAME) {
            if ("2.0.4" <= wx.getSystemInfoSync().SDKVersion) {
                this.m_videoAd = wx.createRewardedVideoAd({
                    adUnitId: ''
                })
                this.m_videoAd.onClose(res => {
                    if (res.isEnded) {
                        console.log("看广告成功");
                        if (this.m_RewardADSuccess) {
                            this.m_RewardADSuccess();
                            this.clearReawardADHandle();
                        }
                    }
                    else {
                        console.log("主动关闭了广告");
                        if (this.m_RewardADClose) {
                            this.m_RewardADClose();
                            this.clearReawardADHandle();
                        }
                    }
                });
                this.m_videoAd.onError(res => {
                    console.log("videoAd.onError", res.errMsg, res.errCode);
                    if (this.m_RewardADError) {
                        this.m_RewardADError();
                        this.clearReawardADHandle();
                    }
                })
            }
        }
    },

    showRewardedVideoAd(_success, _close, _error) {
        if (CC_WECHATGAME) {
            this.m_RewardADSuccess = _success;
            this.m_RewardADClose = _close;
            this.m_RewardADError = _error;
            wx.showLoading({
                title: '加载中',
                mask: true,
            });
            if ("2.0.4" <= wx.getSystemInfoSync().SDKVersion) {
                this.m_videoAd.load()
                    .then(() => {
                        wx.hideLoading();
                        this.m_videoAd.show();
                    })
                    .catch(err => {
                        console.log("videoAd.load error", err.errMsg);
                        wx.hideLoading();
                        if (this.m_RewardADError) {
                            this.m_RewardADError();
                            this.clearReawardADHandle();
                        }
                    });
            }
            else {
                wx.hideLoading();
                if (this.m_RewardADError) {
                    this.m_RewardADError();
                    this.clearReawardADHandle();
                }
            }
        } else {
            if (_success) {
                _success();
            }
        }
    },

    clearReawardADHandle() {
        this.m_RewardADSuccess = null;
        this.m_RewardADClose = null;
        this.m_RewardADError = null;
    },


    // doLogin(){
    //     if (CC_WECHATGAME) {
    //         let _sessionid = cc.sys.localStorage.getItem("sessionid");
    //         console.log("sessionid", _sessionid);
    //         if (_sessionid && _sessionid != "") {
    //             this.checkToken();
    //         }
    //         else {
    //             console.log("WXLogin");
    //             this.WXLogin(gen_handler(this.onLoginSuccess, this), gen_handler(this.onLoginFailed, this), true);
    //         }
    //     }
    //     else {
    //         this.startGameFromLocal();
    //     }
    // }


};

module.exports = wxHelper;