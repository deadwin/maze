"use strict";
window.MT = {};
MT.GLOBAL = require("global");
MT.USER = require("user")
MT.PUBLIC = require("mtPublic");
MT.MODULE = require("mtModule");
MT.AUDIOMGR = require("audioMgr")
MT.WXHELPER = require("wxHelper")
window.HttpServer = require("HttpServer")
window.HttpLogic = require("httpLogic")
window.WAITMGR = require("WaitMgr")
// WAITMGR.initWaitLayer();
window.Arr_YvesYu = {
    removeArrayIndex: function(n, e) {
        for (var t = [], i = 0; i < n.length; i++) i != e && t.push(n[i]);
        return t;
    },
    getArrayFirstData: function(t) {
        return 0 < t.length ? t[0] : null;
    },
    deleteArrayFirstData: function(a) {
        for (var e = [], t = 1; t < a.length; t++)
            e.push(a[t]);
        return e;
    },
    getArrayFinallyData: function(t) {
        return 0 < t.length ? t[t.length - 1] : null;
    },
    deleteArrayFinallyData: function(a) {
        for (var e = [], t = 0; t < a.length - 1; t++) e.push(a[t]);
        return e;
    }
}

window.p = Math.abs, window.r = Math.round, window.d = Math.floor;
MT.MazeRecruit_Group = {
    getMazeRecruit_Zoon: function() {
        return "zoon_group";
    }
}

MT.getCanShare = function() {
    if (cc.sys.platform !== cc.sys.WECHAT_GAME) return false;
    // if ("" == wxData.shareOnlineData) {
    //     var t = Userdefault.getIntForKey(lieyou.Key_OncePlayerTime, 0);
    //     return 480 < parseInt(getTime() / 1e3) - t;
    // }
    // return SdkManager.parseData(wxData.shareOnlineData, "share");
};
window.Hint_YvesYu = {
    m_hint: null,
    m_HintArr: [],
    initHint: function(t) {
        Hint_YvesYu.m_hint = t;
    },
    createHint: function(o, e) {
        var t = 2 < arguments.length && void 360 !== arguments[2] ? arguments[2] : 360;
        var i = 3 < arguments.length && void 640 !== arguments[3] ? arguments[3] : 640;
        if (Hint_YvesYu.m_hint) {

            var a = cc.instantiate(Hint_YvesYu.m_hint);
            if(Hint_YvesYu.m_HintArr.length != 0){
                Hint_YvesYu.m_HintArr[Hint_YvesYu.m_HintArr.length - 1].removeFromParent();
                Hint_YvesYu.m_HintArr.pop();
            }
            a.getComponent("hintAction").initHint(o, Hint_YvesYu.m_HintArr.length), a.position = cc.v2(t, i),
            //console.log(a.position,"pos");
            
            Hint_YvesYu.m_HintArr.push(a);
            e.addChild(a);
        }
    },
    deleteHint: function(a) {
        Hint_YvesYu.m_HintArr = Arr_YvesYu.removeArrayIndex(Hint_YvesYu.m_HintArr, a);
        for (var e = 0; e < Hint_YvesYu.m_HintArr.length; e++) "" != Hint_YvesYu.m_HintArr[e].name && Hint_YvesYu.m_HintArr[e].getComponent("hintAction").setindex(e);
    },
    ImprovePosition: function(a, e) {
        for (var t = Hint_YvesYu.m_HintArr.length - 1; 0 <= t; t--)
        {
            Hint_YvesYu.m_HintArr[t] && t != e && "" != Hint_YvesYu.m_HintArr[t].name && (Hint_YvesYu.m_HintArr[t].y = a + Hint_YvesYu.m_HintArr[t].y,true);
        }
         
    }
};

window.Load_YvesYu = {
    m_Loading: null,
    m_Load: null,
    initLoading: function(t) {
        Load_YvesYu.m_Loading = t;
    },
    createLoading: function(a) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0, t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0;
        console.log("加载Load"), Load_YvesYu.m_Loading && (Load_YvesYu.m_Load || (console.log("加载Load111"), 
        Load_YvesYu.m_Load = cc.instantiate(Load_YvesYu.m_Loading), console.log("------------------------"), 
        console.log(Load_YvesYu.m_Loading), console.log(Load_YvesYu.m_Load), console.log("加载Load22 +++ " + Load_YvesYu.m_Load.name), 
        console.log("加载Load33 +++ " + a.name), Load_YvesYu.m_Load.position = cc.v2(e, t), 
        a.addChild(Load_YvesYu.m_Load)));
    },
    finishLoading: function() {
        console.log("回调判断"), "" == Load_YvesYu.m_Load.name ? Load_YvesYu.m_Load = null : (console.log("11"), 
        Load_YvesYu.m_Load.getComponent("YvesYu_loadingJs").finishLoading());
    },
    setM_LoadNull: function() {
        Load_YvesYu.m_Load = null;
    }
};

MT.wxVideoId = "";

window.showModal = function(o, r) {
    var s = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : function() {}, l = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : function() {};
    wx.showModal({
        title: o,
        content: r,
        showCancel: s,
        cancelText: "取消",
        confirmText: "确定",
        success: d,
        fail: l
    });
};