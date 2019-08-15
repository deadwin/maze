var HttpServer = cc.Class({
    statics:{
        getInstance:function(){
            //this.HttpServer || (this.HttpServer = new HttpServer());
            if(this.HttpServer == null){
                return new HttpServer();
            }
            return this.HttpServer;
        },
    },
    properties:{
        // website:"http://192.168.0.71:8080/",
        // website:"https://www.meitianmedia.com/",
        //https://www.meitianmedia.com/mazeCat
        website:"https://www.playinnanjing.com/",
    },

    getSessionid() {
        return cc.sys.localStorage.getItem("sessionid");
    },

    login(_data, _success, _failed, _getData) {
        var self = this;
        this.httpPost("ppt/maze/login", _data,(res) => {
            console.log("ppt/maze/login", res);
            if (res.code == 200) {
                console.log("set token", res.token);
                cc.sys.localStorage.setItem("sessionid", res.token);
                if (_getData) {
                    self.getUserData(_success, _failed);
                }
                else {
                    if (_success) {
                        _success(res);
                    }
                }
            }
            else {
                console.log("登陆失败");
                if (_failed) {
                    _failed(res);
                }
            }
        }, (res) => {
            cc.sys.localStorage.removeItem("sessionid");
            console.log("登陆失败");
            if (_failed) {
                _failed(res);
            }
        });
    },
    getUserData(_success, _failed) {
        let _data = {};
        _data.token = cc.sys.localStorage.getItem("sessionid");
        this.httpPost("ppt/maze/user/get", _data,(res) => {
            console.log("getUserData", res);
            if (res.code == 200) {
                if (_success) {
                    _success(res);
                }
            }
            else {
                console.log("获取用户信息失败");
                if (_failed) {
                    _failed(res);
                }
            }
        }, _failed);
    },
    httpPost(_path, _data, _success, _failed) {
        this.httpRequest(_path, JSON.stringify(_data), "post", _success, _failed);
    },

    httpGet(_path, _success, _failed) {
        this.httpRequest(_path, null, "get", _success, _failed);
    },

    httpRequest(_path, _data, _type, _success, _failed) {
        let url = this.website + _path;
        console.log("http send", _data, "url=", url);
        wx.request({
            url: url,
            data: _data,
            method: _type,
            success: res => {
                console.log(res);
                if (res.data) {
                    var ret = res.data;
                    if (_success !== null) {
                        _success(ret);
                    }
                }
                else if (_failed) {
                    _failed(res);
                }
            },
            fail: res => {
                if (_failed) {
                    _failed(res);
                }
            }
        })
    },

    // saveUserData(_playerData) {
    //     let _data = {};
    //     _data.token = cc.sys.localStorage.getItem("sessionid");
    //     if (_data.token && _data.token != "") {
    //         _data.result = _playerData;
    //         this.httpPost("ppt/maze/user/save", _data, (res) => {
    //             console.log("saveUserData", res);
    //             if (res.code == 200) {
    //                 console.log("保存成功");
    //                 //MT.USER.setLastOnlineTime(MT.USER.lastOnlineTime);
    //             }else if (res.code == -1){
    //                 HttpLogic.doLogin();
    //             }
    //             else {
    //                 console.log(res.code,res.msg);
    //                 // if (_failed) {
    //                 //     _failed.exec();
    //                 // }
    //             }
    //         }, () => {
    //             console.log("保存失败saveUserData");
    //         });
    //     }else{
    //         console.log("token为空");
    //     }
        
    // },
    saveUserData(_playerData) {
        let _data = {};
        _data.token = cc.sys.localStorage.getItem("sessionid");
        _data.result = _playerData;
        this.httpPost("ppt/maze/user/save", _data, (res) => {
            console.log("saveUserData", res);
            if (res.code == 200) {
                console.log("保存成功");
                //MT.USER.setLastOnlineTime(MT.USER.lastOnlineTime);
            }else if (res.code == -1){
                HttpLogic.doLogin();
            }
            else {
                console.log(res.code,res.msg);
                // if (_failed) {
                //     _failed.exec();
                // }
            }
        }, () => {
            console.log("保存失败saveUserData");
        });
        
    },



    postLuckyWheel(_luckCnt, _shareCnt, _luckyUpTime) {
        // let _data = {};
        // _data.token = cc.sys.localStorage.getItem("sessionid");
        // _data.luck = {};
        // _data.luck.luckCount = _luckCnt;
        // _data.luck.luckShareCount = _shareCnt;
        // _data.luck.luckUpTime = _luckyUpTime;
        // this.httpPost("ppt/maze/luck/update", _data, gen_handler((res) => {
        //     console.log("postLuckyWheel", res);
        //     if (res.code == 200) {
        //         console.log("成功");
        //     }
        //     else {
        //         console.log(res);
        //     }
        // }, this), gen_handler((res) => {
        //     console.log(res);
        // }));
    },

    openLuckyWheel(_success, _failed) {
        // let _data: any = {};
        // _data.token = cc.sys.localStorage.getItem("sessionid");
        // this.httpPost("ppt/empire/luck/get", _data, gen_handler((res) => {
        //     console.log("postLuckyWheel", res);
        //     if (res.code == 200) {
        //         if (_success) {
        //             _success.exec(res);
        //         }
        //     }
        //     else {
        //         console.log(res);
        //     }
        // }, this), gen_handler((res) => {
        //     console.log(res);
        // }));
    },

    invitePlayerQuery(_type, _success) {
        let _data = {};
        _data.token = cc.sys.localStorage.getItem("sessionid");
        _data.shareType = _type;
        if(!CC_WECHATGAME){
            console.log("找不到微信invitePlayerQuery")
            return;
        }
        this.httpPost("ppt/maze/invite/get", _data, (res) => {
            console.log("invitePlayerQuery", res);
            if (res.code == 200) {
                if (_success) {
                    _success(res);
                }
            }
            else if(res.code == -1){
                HttpLogic.doLogin();
            }
            else {
                console.log(res);
            }
        }, (res) => {
            console.log(res,"++invitePlayerQuery++");
        }
        );
    },

    updateFriendDraw(_openid, _success) {
        let _data = {};
        _data.token = cc.sys.localStorage.getItem("sessionid");
        _data.openid = _openid;
        _data.shareType = 10;
        if(!CC_WECHATGAME){
            console.log("找不到微信updateFriendDraw")
            return;
        }
        this.httpPost("ppt/maze/invite/update", _data, (res) => {
            console.log("updateFriendDraw", res);
            if (res.code == 200) {
                if (_success) {
                    _success(res);
                }
            }
            else if(res.code == -1){
                HttpLogic.doLogin();
            }
            else {
                console.log(res);
            }
        }, (res) => {
            console.log(res,"++updateFriendDraw++");
        });
    },

    saveInvitePlayer() {
        if (MT.WXHELPER.onShowQuery.token == cc.sys.localStorage.getItem("sessionid")) {
            return;
        }
        let _data = {};
        _data.fOpenid = MT.WXHELPER.onShowQuery.token;
        _data.openId = cc.sys.localStorage.getItem("sessionid");
        _data.shareType = MT.WXHELPER.onShowQuery.prop;
        _data.name = MT.GLOBAL.playerInfo.nickName;
        _data.iconUrl = MT.GLOBAL.playerInfo.avatarUrl;
        this.httpPost("ppt/maze/invite/put", _data, (res) => {
            console.log("saveInvitePlayer", res);
            if (res.code == 200) {
                console.log("saveInvitePlayer success");
            }else if(res.code == -1) {
                HttpLogic.doLogin();
                console.log("saveInvitePlayer failed",res.code);
            }
            else {
                console.log("saveInvitePlayer failed");
            }
        }, (res) => {
            console.log("saveInvitePlayer failed",res);
        });
    },

    gongGaoQuery(_success) {
        this.httpGet("ppt/maze/notice/get", (res) => {
            if (res.code == 200) {
                if (res.cfg && res.cfg.content) {
                   MT.GLOBAL.gameGongGao = res.cfg.content;
                }
                if (_success) {
                    _success();
                }
            }
            else {
                console.log("gongGaoQuery failed",res);
            }
        }, (res) => {
            console.log("gongGaoQuery failed",res);
        })
    },



});

module.exports = HttpServer.getInstance();