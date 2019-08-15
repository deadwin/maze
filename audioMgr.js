var t = require("dictionary");
var audioMgr = {
    _pathList: new t(),
    _playMusic: null,
    _playEffects: new t(),
    _isMusicSilence: !1,
    _defaultMusicVolume: 1,
    loadAudio: function(t, e) {
        cc.loader.loadRes(t, function(n, o) {
            if (n) console.error(n.message || n);
            else {
                console.log(o,"====")
                var t = o.split("/"), 
                i = t[t.length - 1].split(".")[0];
                this._pathList.set(i, o), e && e();
            }
        }.bind(this));
    },
    playMusic: function(o, e, t) {
        // var i = this._pathList.get(o);
        // e = e || !1, this._defaultMusicVolume = t || 1;
        // var a = this._isMusicSilence ? 0 : this._defaultMusicVolume;
        // return null == i ? console.log("music " + o + " is not exit") : void (this.stopMusic(), 
        // this._playMusic = cc.audioEngine.play(i, e, a));
        var self = this;
        e = e || !1, this._defaultMusicVolume = t || 1;
        var a = this._isMusicSilence ? 0 : this._defaultMusicVolume;
        cc.loader.loadRes("sounds/" + o,cc.AudioClip,function(err,sound){
            if(!err){
                self._playMusic = cc.audioEngine.play(sound,e,a);
            }
        })
    },
    stopMusic: function() {
        null != this._playMusic && (cc.audioEngine.stop(this._playMusic), this._playMusic = null);
    },
    playEffect: function(r, e, t, i) {
        // if (!this._isSoundSilence) {
        //     var a = this._pathList.get(r);
        //     if (e = e || !1, t = t || 1, null == a) return console.log("effect " + r + "is not exit");
        //     this._isSoundSilence && (t = 0);
        //     var n = cc.audioEngine.play(a, e, t);
        //     this._playEffects.set(r, n), cc.audioEngine.setFinishCallback(n, function() {
        //         i && i();
        //     });
        // }
        if(!this._isSoundSilence){
            var self = this;
            cc.loader.loadRes("sounds/" + r,cc.AudioClip,function(err,sound){
                if(!err){
                    self._playEffects.set(r,cc.audioEngine.play(sound));
                }
            })
        }

    },
    stopEffect: function(a) {
        var e = this._playEffects.get(a);
        null != e && (cc.audioEngine.stop(e), this._playEffects.remove(a));
    },
    stopAllEffects: function() {
        for (var t in this._playEffects.getIterator()) this.stopEffect(t);
    },
    stopAll: function() {
        cc.audioEngine.stopAll(), this._playMusic = null, this._playEffects.clear();
    },
    setMusicSilence: function(t) {
        (this._isMusicSilence = t) ? this.setMusicVolume(0) : this.setMusicVolume(this._defaultMusicVolume);
    },
    setSoundSilence: function(t) {
        (this._isSoundSilence = t) && this.stopAllEffects();
    },
    getSoundSilence: function() {
        return this._isSoundSilence;
    },
    isMusicSilence: function() {
        return this._isMusicSilence;
    },
    pauseAll: function() {
        this.setSilence(!0);
    },
    resumeAll: function() {
        this.setSilence(!1);
    },
    setMusicVolume: function(t) {
        null != this._playMusic && cc.audioEngine.setVolume(this._playMusic, t);
    },
    getMusicVolume: function() {
        return null == this._playMusic ? 0 : cc.audioEngine.getVolume(this._playMusic);
    }
};
module.exports = audioMgr;