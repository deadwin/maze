

var user = {
    Cat_Skin: 0,
    SkinArr: null,
    SUBMODEL:null,
    ComPer: 0,
    TimePer: 0,
    DogPer: 0,
    SkatPer: 0,
    NightPer: 0,
    TrapPer: 0,
    CustomsSize: -1,
    VideoAndShare: !1,
    GuanNum: 0,
    Music: !0,
    Sound: !0,
    DriedFishNum: 0,
    DriedGetTime: 0,
    DriedGetShareTime: 0,
    DriedGteVideoTime: 0,

    GetMap: function(t, n, i) {
        MT.GLOBAL.MAP = null;
        var self = this;
        // cc.loader.load("https://idata.igame58.com/wxxyx/mazedaren/levels/" + t + "/" + n + ".json", function(a, e) {
        //     a ? console.log("读取关卡数据失败") : (this.MAP = e, this.GuanNum = n,
        //         console.log(e,"关卡信息"),
        //     i());
        // });
        console.log(t,n,"===========")
        cc.loader.loadRes("jsonData/" + t + "/" + n,cc.JsonAsset,function(a, e) {
            a ? console.log("读取关卡数据失败") : (MT.GLOBAL.MAP = e.json, self.GuanNum = n,
                //console.log(MT.GLOBAL.MAP,"关卡信息"),
            i());
        });
    },
    initGame: function() {
        this.Cat_Skin = this.GetDataFifeInt(MT.GLOBAL.CONST_TEXT.Cat_Skin, 0), 
        this.SkinArr = this.GetDataFifeIntArray(MT.GLOBAL.CONST_TEXT.SkinArr, [ 1, 0, 0, 0, 0, 0 ]), 
        this.ComPer = this.GetDataFifeIntArray(MT.GLOBAL.CONST_TEXT.ComPer, [1,1,1,1,1]), 
        this.TimePer = this.GetDataFifeIntArray(MT.GLOBAL.CONST_TEXT.TimePer, [1,1,1,1,1]), 
        this.DogPer = this.GetDataFifeIntArray(MT.GLOBAL.CONST_TEXT.DogPer, [1,1,1,1,1]), 
        this.SkatPer = this.GetDataFifeIntArray(MT.GLOBAL.CONST_TEXT.SkatPer, [1,1,1,1,1]), 
        this.NightPer = this.GetDataFifeIntArray(MT.GLOBAL.CONST_TEXT.NightPer, [1,1,1,1,1]), 
        this.TrapPer = this.GetDataFifeIntArray(MT.GLOBAL.CONST_TEXT.TrapPer, [1,1,1,1,1]), 
        this.DriedFishNum = this.GetDataFifeInt(MT.GLOBAL.CONST_TEXT.DriedFishNum, 3), //提示道具数量
        this.DriedGetTime = this.GetDataFifeInt(MT.GLOBAL.CONST_TEXT.DriedGetTime, 0), 
        this.DriedGetShareTime = this.GetDataFifeInt(MT.GLOBAL.CONST_TEXT.DriedGetShareTime, 0), 
        this.DriedGteVideoTime = this.GetDataFifeInt(MT.GLOBAL.CONST_TEXT.DriedGteVideoTime, 0), 
        this.VideoAndShare = this.GetDataFifeBool(MT.GLOBAL.CONST_TEXT.VideoAndShare, !0), 
        this.Music = this.GetDataFifeBool(MT.GLOBAL.GAME_SETTING.Key_Music, !0);
        this.Sound = this.GetDataFifeBool(MT.GLOBAL.GAME_SETTING.Key_Sound, !0);
        this.loginRewardDays = this.GetDataFifeInt("loginRewardDays",-1);
        this.friendDraw = this.GetDataFifeBool("friendDraw",true);
        this.luckyShareCount = this.GetDataFifeInt("luckyShareCount",0);
        this.loginDays = this.GetDataFifeInt("loginDays",0);
        this.lastOnlineTime = this.getLastOnlineTime();
        // let str = JSON.stringify(this);
        // console.log(str,"ssssssssssss")
        this.calcDate();

    },


    calcDate() {
        let _last = this.lastOnlineTime;
        let _lastDate = new Date(Number(_last));
        let _now = new Date(Date.now());
        let _lastD = _lastDate.getDate();
        let _nowD = _now.getDate();
        //console.log(_lastD, _nowD);
        if (this.checkPassDay()) {
            this.loginDays = this.loginRewardDays + 1;
            this.SetDataFife("loginDays",this.loginDays);
            this.passDay();
        }
        if (this.loginDays == 7) {
            this.loginDays = 0;
            this.SetDataFife("loginDays",this.loginDays);
            this.loginRewardDays = -1;
            this.SetDataFife("loginRewardDays",this.loginRewardDays)
        }
    },

    /**
     * 过了一天
     */
    passDay() {
        this.friendDraw = false;
        this.luckyShareCount = 0;
    },

    /**
     * 是否过了一天
     */
    checkPassDay() {
        let _last = this.lastOnlineTime;
        let _lastDate = new Date(_last);
        let _now = new Date(Date.now());
        let _lastM = _lastDate.getMonth();
        let _nowM = _now.getMonth();
        let _lastD = _lastDate.getDate();
        let _nowD = _now.getDate();
        //console.log("还是同一天",_last,_lastDate,_lastD,_nowD)
        if (_lastDate.getFullYear() < _now.getFullYear()) {
            return true;
        }
        else if (_lastDate.getFullYear() == _now.getFullYear() && _lastM < _nowM) {
            return true;
        }
        else if (_lastDate.getFullYear() == _now.getFullYear() && _lastM == _nowM && _lastD < _nowD) {
            return true;
        }
        //console.log("还是同一天",_last,_lastDate,_lastD,_nowD)
        return false;
    },

    // saveDataToLocalStorage(){
    //     this.SetDataFife("loginDays",this.loginDays);
    // },

    initFromServer:function(_json){
        if (_json) {
            if (_json.Cat_Skin != undefined){
                this.Cat_Skin = _json.Cat_Skin;
                this.setSave_Cat_Skin();
            }
            if (_json.SkinArr != undefined)
                {
                    this.SkinArr = _json.SkinArr;
                    this.setSave_SkinArr();
                }
            if (_json.ComPer != undefined){
                this.ComPer = _json.ComPer;
                this.setSave_ComPer();
            }

            if (_json.TimePer != undefined){
                this.TimePer = _json.TimePer;
                this.setSave_TimePer();
            }

            if (_json.DogPer != undefined){
                this.DogPer = _json.DogPer;
                this.setSave_DogPer();
            }
            if (_json.SkatPer != undefined){
                this.SkatPer = _json.SkatPer;
                this.setSave_SkatPer();
            }
            if (_json.NightPer != undefined){
                this.NightPer = _json.NightPer;
                //console.log(this.NightPer,"nnnnnn")
                this.setSave_NightPer();
            }
            if (_json.TrapPer != undefined){
                this.TrapPer = _json.TrapPer;
                this.setSave_TrapPer();
            }
            if (_json.DriedFishNum != undefined){
                this.DriedFishNum = _json.DriedFishNum;
                this.setSave_DriedFishNum();
            }
            if (_json.DriedGetTime != undefined){
                this.DriedGetTime = _json.DriedGetTime;
                this.setSave_DriedGetTime();
            }
            if (_json.DriedGetShareTime != undefined){
                this.DriedGetShareTime = _json.DriedGetShareTime;
                this.setSave_DriedGetShareTime();
            }
            if (_json.DriedGteVideoTime != undefined){
                this.DriedGteVideoTime = _json.DriedGteVideoTime;
                this.setSave_DriedGteVideoTime();
            }            // if (_json.VideoAndShare != undefined)
            //     this.speedTime = 0;//_json.speedTime;
            if (_json.VideoAndShare != undefined){
                this.VideoAndShare = _json.VideoAndShare;
                this.setSave_VideoAndShare();
            }
            if (_json.Music != undefined){
                this.Music = _json.Music;
                this.setSave_Music();
            }
            if (_json.Sound != undefined){
                this.Sound = _json.Sound;
                this.setSave_Sound();
            }
            if (_json.luckyCount != undefined){
                this.luckyCount = _json.luckyCount;
            }
            if (_json.luckyShareCount != undefined)
                this.luckyShareCount = _json.luckyShareCount;
            if (_json.luckyUpTime != undefined)
                this.luckyUpTime = _json.luckyUpTime;
            if (_json.friendDraw != undefined)
                this.friendDraw = _json.friendDraw;
            if(_json.loginRewardDays != undefined){
                this.loginRewardDays = _json.loginRewardDays;
                this.SetDataFife("loginRewardDays",this.loginRewardDays);
            }
            if(_json.loginDays != undefined){
                this.loginDays = _json.loginDays;
                this.SetDataFife("loginDays",this.loginDays);
            }
            if(_json.lastOnlineTime != undefined){
                this.lastOnlineTime = _json.lastOnlineTime;
                this.setLastOnlineTime(this.lastOnlineTime);
            }

            this.calcDate();
        }
    },
    saveToServer:function(){
        this.lastOnlineTime = Date.now();
        //console.log(this.lastOnlineTime,"tttttttttsaveToServer")
        this.setLastOnlineTime(this.lastOnlineTime);
        let str = JSON.stringify(this);
        if (CC_WECHATGAME) {
            HttpServer.saveUserData(str);
        }
    },


    setLastOnlineTime(time){
        cc.sys.localStorage.setItem("lastOnlineTime", time);
    },
    getLastOnlineTime(){
        let result = cc.sys.localStorage.getItem("lastOnlineTime");
        if(result == "undefined" || result == "" || result == "NaN" || result == null){
            result = 0;
        }
        result = Number(result);
        return result;
    },

    SetDataFife: function(a, e) {
        cc.sys.localStorage.setItem(a, "" + e);
    },
    GetDataFifeInt: function(a) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0, t = cc.sys.localStorage.getItem(a);
        return "undefined" != t && "" != t && null != t && "NaN" != t && (e = parseInt(t)), 
        e;
    },
    GetDataFifeBool: function(a) {
        var e = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1], t = cc.sys.localStorage.getItem(a);
        return "undefined" != t && "" != t && null != t && "NaN" != t && "false" == t && (e = !1), 
        e;
    },
    GetDataFifeString: function(a) {
        var e = "", t = cc.sys.localStorage.getItem(a);
        return "undefined" != t && "" != t && null != t && "NaN" != t && (e = t), e;
    },
    GetDataFifeFloat: function(a) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0, t = cc.sys.localStorage.getItem(a);
        return "undefined" != t && "" != t && null != t && "NaN" != t && (e = parseFloat(t)), 
        e;
    },
    GetDataFifeIntArray: function(o) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [], t = cc.sys.localStorage.getItem(o);
        if ("undefined" != t && "" != t && null != t && "NaN" != t) for (var i = t.split(","), a = 0; a < i.length; a++) e[a] = parseInt(i[a]);
        return e;
    },



    
    getBoolForKey: function(a) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "false";
        return "false" == e || (e = e ? "true" : "false"), "true" == i(a, e);
    },
    getIntForKey: function(a) {
        var e = i(a, 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0);
        return parseInt(e);
    },
    getStringForKey: function(t) {
        return i(t, 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "");
    },
    getFloatForKey: function(a) {
        var e = i(a, 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0);
        return parseFloat(e);
    },
    setDataForKey: function(a, e) {
        cc.sys.localStorage.setItem(a, e);
    },
    setBoolForKey: function(a, e) {
        e = e ? "true" : "false", cc.sys.localStorage.setItem(a, e);
    },



    setSave_VideoAndShare: function() {
        this.SetDataFife(MT.GLOBAL.CONST_TEXT.VideoAndShare, MT.USER.VideoAndShare);
    },
    setSave_Music: function() {
        this.SetDataFife(MT.GLOBAL.GAME_SETTING.Key_Music, MT.USER.Music);
    },
    setSave_Sound: function() {
        this.SetDataFife(MT.GLOBAL.GAME_SETTING.Key_Sound, MT.USER.Sound);
    },
    setSave_DriedFishNum: function() {
        this.SetDataFife(MT.GLOBAL.CONST_TEXT.DriedFishNum, MT.USER.DriedFishNum);
        this.saveToServer();
    },
    setSave_Cat_Skin: function() {
        this.SetDataFife(MT.GLOBAL.CONST_TEXT.Cat_Skin, MT.USER.Cat_Skin);
    },
    setSave_SkinArr: function() {
        this.SetDataFife(MT.GLOBAL.CONST_TEXT.SkinArr, MT.USER.SkinArr);
    },
    setSave_ComPer: function() {
        this.SetDataFife(MT.GLOBAL.CONST_TEXT.ComPer, MT.USER.ComPer);
    },
    setSave_TimePer: function() {
        this.SetDataFife(MT.GLOBAL.CONST_TEXT.TimePer, MT.USER.TimePer);
    },
    setSave_DogPer: function() {
        this.SetDataFife(MT.GLOBAL.CONST_TEXT.DogPer, MT.USER.DogPer);
    },
    setSave_SkatPer: function() {
        this.SetDataFife(MT.GLOBAL.CONST_TEXT.SkatPer, MT.USER.SkatPer);
    },
    setSave_NightPer: function() {
        this.SetDataFife(MT.GLOBAL.CONST_TEXT.NightPer, MT.USER.NightPer);
    },
    setSave_TrapPer: function() {
        this.SetDataFife(MT.GLOBAL.CONST_TEXT.TrapPer, MT.USER.TrapPer);
    },
    setSave_DriedGetTime: function() {
        this.SetDataFife(MT.GLOBAL.CONST_TEXT.DriedGetTime, MT.USER.DriedGetTime);
    },
    setSave_DriedGetShareTime: function() {
        this.SetDataFife(MT.GLOBAL.CONST_TEXT.DriedGetShareTime, MT.USER.DriedGetShareTime);
    },
    setSave_DriedGteVideoTime: function() {
        this.SetDataFife(MT.GLOBAL.CONST_TEXT.DriedGteVideoTime, MT.USER.DriedGteVideoTime);
    }
}
module.exports = user;