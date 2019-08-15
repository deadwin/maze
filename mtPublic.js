// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
"use strict";
var mtPublic = cc.Class({
    onLoad: function() {
        this._resources = {}, this._preloadList = [], this._loadCount = 0, this._loadResourceProgressCallBack = [], 
        this._loadResourceEndCallBack = [], this._hint = null, this._load = null;
    },
    initView: function() {
        this._hint = "prefabs/hint", this._load = "prefabs/loading_pre";
    },
    registerLoadResourceProgressCallBack: function(t) {
        this._loadResourceProgressCallBack.push(t);
    },
    registerLoadResourceEndCallBack: function(t) {
        this._loadResourceEndCallBack.push(t);
    },
    loadResource: function(n, i, o) {
        var e = function(a, e) {
            o(a, e, n);
        };
        "SpriteFrame" === i ? cc.loader.loadRes(n, cc.SpriteFrame, e) : "SpriteAtlas" === i ? cc.loader.loadRes(n, cc.SpriteAtlas, e) : "Spine" === i ? cc.loader.loadRes(n, sp.SkeletonData, e) : "Animation" === i || "Prefab" === i || "Scene" === i || "Texture" === i || "Txt" === i || "Audio" === i ? cc.loader.loadRes(n, e) : cc.loader.load(n, e);
    },
    isUrlLegal: function(t) {
        return t && 0 < t.length;
    },
    pushPrefab: function(t) {
        this.isUrlLegal(t) && this._preloadList.push([ t, "Prefab" ]);
    },
    pushSpriteFrame: function(t) {
        this.isUrlLegal(t) && this._preloadList.push([ t, "SpriteFrame" ]);
    },
    pushSpriteAtlas: function(t) {
        this.isUrlLegal(t) && this._preloadList.push([ t, "SpriteAtlas" ]);
    },
    pushTexture: function(t) {
        this.isUrlLegal(t) && this._preloadList.push([ t, "Texture" ]);
    },
    pushScene: function(t) {
        this.isUrlLegal(t) && this._preloadList.push([ t, "Scene" ]);
    },
    preloadResources: function(o) {
        if (o && 0 < o.length) for (var e = 0; e < this._preloadList.length; e++) this._preloadList.push(o[e]);
        for (var t = 0; t < this._preloadList.length; t++) {
            var i = this._preloadList[t][0], a = this._preloadList[t][1];
            this.loadResource(i, a, this.preLoadCallBack.bind(this));
        }
    },
    preLoadCallBack: function(r, e, t) {
        if (r) console.log(r); else {
            this._loadCount++, this._resources[t] = e;
            var i = this._preloadList.length;
            if (0 < this._loadResourceProgressCallBack.length) for (var a = 0; a < this._loadResourceProgressCallBack.length; a++) (0, 
            this._loadResourceProgressCallBack[a])(this._loadCount / i);
            if (this._loadCount >= i && 0 < this._loadResourceEndCallBack.length) for (var n = this._loadResourceEndCallBack.length, o = 0; o < n; o++) (0, 
            this._loadResourceEndCallBack[o])();
        }
    },
    onDestroy: function() {}
});
module.exports = mtPublic;
