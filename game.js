// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var o = function() {};
cc.Class({
    extends: require("gameInit"),

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
        wxRankPanelPrefab:cc.Prefab,
        //btnGiftBox:cc.Node,
        tipLayerPrefab:cc.Prefab,
    },
    showWXrankPanel:function(){
        if(this.wxRankPanel == null){
            this.wxRankPanel = cc.instantiate(this.wxRankPanelPrefab);
            this.wxRankPanel.position = cc.v2(0,0);
            this.node.parent.getChildByName("wxRankNode").addChild(this.wxRankPanel);
        }
        this.wxRankPanel.getComponent("wxRank").onGetWXFriendInfo();
        this.wxRankPanel.getComponent("wxRank").onShowRandRank();
        // setTimeout(() => {
        //     if(this.wxRankPanel && this.wxRankPanel.getComponent("wxRank")){
        //         this.wxRankPanel.getComponent("wxRank").hide();
        //     }
        // }, 10000);
        this.scheduleOnce(()=>{
            if(this.wxRankPanel && this.wxRankPanel.getComponent("wxRank")){
                this.wxRankPanel.getComponent("wxRank").hide();
            }
        },9)
        // setTimeout(() => {
            
        //     this.wxRankPanel.active = true;
            
        //     //this.scheduleOnce(this.showRandRank,60)
        // }, 2000);
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



    onLoad: function() {
        console.log("gamegame")
        this._super();
        this.footArr = [];
        this.footItemArr = [];
        MT.WXHELPER.createRewardedVideoAd();
        //this.showWXrankPanel();
    },

    onResourceLoaded: function(currentCount,totalCount) {
        if(currentCount < totalCount) return;
        //console.log("资源加载完毕");
        WAITMGR.hideWaitLayer();
        this.initMap(), this.TouchEventInDoubleMode();
        this.setCatStatus();
    },
    TouchEventInDoubleMode: function() {
        this.node.on("touchstart", function(t) {
            this.canTouch && this.handleTouchStart(t);
        }, this), this.node.on("touchmove", function(t) {
            this.canTouch && this.handleTouchMove(t);
        }, this), this.node.on("touchend", function(t) {
            this.canTouch && this.handleTouchEnd(t);
        }, this), this.node.on("touchcancel", function(t) {
            this.canTouch && this.handleTouchCancel(t);
        }, this);
    },
    handleTouchStart: function(t) {
        this.touchStart = t.touch.getLocation();
    },
    handleTouchMove: function() {},
    handleTouchCancel: function() {},
    handleTouchEnd: function(n) {
        var e = n.touch.getLocation(), t = p(e.x - this.touchStart.x), i = p(e.y - this.touchStart.y);
        (50 < t || 50 < i) && (i < t ? 0 < e.x - this.touchStart.x ? (console.log("向右移动→→→→→→→→"), 
        this.CatDirection = 0) : (console.log("←←←←←←←←向左移动"), this.CatDirection = 1) : 0 < e.y - this.touchStart.y ? (console.log("向上移动↑↑↑↑↑↑↑↑↑↑↑↑↑"), 
        this.CatDirection = 2) : (console.log("向下移动↓↓↓↓↓↓↓↓↓↓↓"), this.CatDirection = 3),
        this.CarRuning());
    },
    CarRuning: function() {
        let r = this.CatPoint.x;
        let e = this.CatPoint.y;
        let t = this.judgeIndexCanRun(this.CatDirection, cc.v2(r, e));
        if (console.log(" 位置++X == " + this.CatPoint.x + "++Y" + this.CatPoint.y), null != t) {
            this.canTouch = !1, console.log("移动到++X == " + t.x + "++Y" + t.y), r = this.CatPoint.x, 
            e = this.CatPoint.y;
            var i = cc.v2(r, e);
            this.FootPrintPoint = i;
            let time = 0.2;
            this.drawFoot(this.CatPoint,t,time);
            this.CatPoint = t;
            for (let a = 0; a < this.Dog.length; a++)
            //console.log(this.Dog[a].point,"怪物位置",i),
                if (this.Dog[a].point.x == i.x && i.y == this.Dog[a].point.y){
                    return this.GameDelayeCallFinish(), 
                    void this.unschedule(this.DogRunAction);
                }
            //this.DarwFootPrint(time);
            //console.log(t,"tt",this.CatPoint);
            let n = this.getGameCFDPoint(t);
            let action = cc.moveTo(time, n.x, n.y);
            this.Cat.getComponent(MT.GLOBAL.CONST_TEXT.CatJs).hideAcion();
            let self  =  this;
            this.Cat.getComponent(MT.GLOBAL.CONST_TEXT.CatJs).setDirection(n);
            this.Cat.runAction(cc.sequence(action, cc.callFunc(function() {
                self.setCatStatus();
                self.CatRanCall();
            }.bind(this))));// this.Face.getComponent(MT.GLOBAL.CONST_TEXT.FaceJs).deleteHelp(!0);
        } else this.canTouch = !0;
    },
    setCatStatus:function(){
        var self = this;
        for(let i = 0;i != 4;i ++){
            //console.log(self.CatPoint)
            let value = self.judgeIndexCanRun(i,cc.v2(self.CatPoint.x,self.CatPoint.y))
            if(value){
                let bShow = true;
                for(let j = 0;j != self.footArr.length;j ++){
                    if(self.footArr[j].x == value.x && self.footArr[j].y == value.y){
                        bShow = false;
                        break;
                    }
                }
                //console.log(value,"value",i)
                if(bShow){
                    self.Cat.getComponent(MT.GLOBAL.CONST_TEXT.CatJs).showAction(i);
                }
            }
        }
    },

    drawFoot:function(preVec,vec,time){
        if(this.footArr.length == 0){
            var t = cc.instantiate(this._resources[this._footPrint]);
            t.getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).initFooprint(this.CatDirection);
            t.getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).runFootPrintAction(time);
            t.position = this.getGameCFDPoint(this.FootPrintPoint);
            t.zIndex = -2, this.GameArea.addChild(t)
            this.footArr.push(preVec);
            this.footItemArr.push(t);
        }
        else{
            //console.log(this.footArr[this.footArr.length -1],vec,preVec)
            if(this.footArr[this.footArr.length -1].x == vec.x && this.footArr[this.footArr.length -1].y == vec.y){
                this.footItemArr[this.footArr.length - 1].getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).deleteSelf(time);
                this.footItemArr.pop();
                this.footArr.pop();
            }else{
                var t = cc.instantiate(this._resources[this._footPrint]);
                t.getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).initFooprint(this.CatDirection);
                t.getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).runFootPrintAction(time);
                t.position = this.getGameCFDPoint(this.FootPrintPoint);
                t.zIndex = -2, this.GameArea.addChild(t)
                this.footArr.push(preVec);
                this.footItemArr.push(t);
            }
        //     var t = cc.instantiate(this._resources[this._footPrint]);
        //     t.getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).initFooprint(this.CatDirection), 
        //     t.getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).runFootPrintAction(time), t.position = this.getGameCFDPoint(this.FootPrintPoint), 
        //     t.zIndex = -2, this.GameArea.addChild(t), e.point = this.FootPrintPoint, e.module = t;
        //     //console.log("创建新脚步")

        // //console.log(this.GameFootprint.length,this.GameFootprint,"lengthlengthlengthlength")
        //     this.GameFootprint[this.GameFootprint.length - 1].module.getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).deleteSelf(time),this.GameFootprint.pop();
        }
        //console.log(this.footArr,"fffff")
    },

    CatRanCall: function() {
        if (this.GameThroughTesting() && null == this.Gover) {
            // if (this.Cat.zIndex = 11, d.playEffect("pass"), this.Gover = cc.instantiate(this._resources[this._GameOver]), 
            this.Cat.zIndex = 11;
            this.Cat.active = false;


            MT.AUDIOMGR.playEffect("pass");
            if (this.Gover = cc.instantiate(this._resources[this._GameOver]),
            this.Gover.getComponent(MT.GLOBAL.CONST_TEXT.GameOverJS).initGameOver(MT.USER.GuanNum), 
            this.saveGameResult(),
            (this.Gover.getComponent(MT.GLOBAL.CONST_TEXT.GameOverJS).Father = this).node.parent.addChild(this.Gover), 
            this.Fish) {
                // var r = cc.scaleTo(.2, .1);
                // this.Fish.runAction(r);
                let randNum = Math.floor(Math.random() * MT.GLOBAL.catFace.length);
                this.Fish.getChildByName("cat").getComponent(cc.Sprite).spriteFrame = MT.GLOBAL.catFace[randNum];
                this.Fish.getChildByName("cat").active = true;
            }
            1 == MT.USER.CustomsSize ? this.unschedule(this.timeModeTimeCall) : this.unschedule(this.GameTimeCall), 
            2 == MT.USER.CustomsSize && this.unschedule(this.DogRunAction), 4 == MT.USER.CustomsSize && this.nigth.removeFromParent(), 
            //5 == MT.USER.CustomsSize && (this.unschedule(this.runGamePitfall), this.unschedule(this.runGameTrap));
            5 == MT.USER.CustomsSize && (this.unschedule(this.runGamePitfall),this.stopRunTrap());// this.unschedule(this.runTrap));

        } else {
            var e, t = 0, i = this.CatPoint.x, a = this.CatPoint.y, n = cc.v2(i, a);
            (1 != this.CatDirection && (n.x++, this.CanRuning(n, cc.v2(n.x, n.y + 1)) && (t++, 
            e = 0), n = cc.v2(i, a)), 0 != this.CatDirection && (this.CanRuning(n, cc.v2(n.x, n.y + 1)) && (t++, 
            e = 1), n = cc.v2(i, a)), 3 != this.CatDirection && (n.y++, this.CanRuning(n, cc.v2(n.x + 1, n.y)) && (t++, 
            e = 2), n = cc.v2(i, a)), 2 != this.CatDirection && (this.CanRuning(n, cc.v2(n.x + 1, n.y)) && (t++, 
            e = 3), n = cc.v2(i, a)), 1 == t) ? 3 == MT.USER.CustomsSize && this.checkSating() && this.CatDirection != e ? (MT.AUDIOMGR.playEffect("corner"), 
            this.canTouch = !0, this.Face && this.Face.getComponent(MT.GLOBAL.CONST_TEXT.FaceJs).visionHilp()) : (this.CatDirection != e&& MT.AUDIOMGR.playEffect("corner"), 
            this.CatDirection = e, this.CarRuning()) : 3 == MT.USER.CustomsSize && this.checkSating() ? (i = this.CatPoint.x, 
            a = this.CatPoint.y, this.judgeIndexCanRun(this.CatDirection, cc.v2(i, a)) ? this.CarRuning() : (MT.AUDIOMGR.playEffect("corner"), 
            this.canTouch = !0, this.Face && this.Face.getComponent(MT.GLOBAL.CONST_TEXT.FaceJs).visionHilp())) : (MT.AUDIOMGR.playEffect("corner"), 
            this.canTouch = !0, this.Face && this.Face.getComponent(MT.GLOBAL.CONST_TEXT.FaceJs).visionHilp());
        }
    },
    checkSating: function() {
        for (var t = 0; t < this.skatingArr.length; t++) 
            if (this.CatPoint.x == this.skatingArr[t].x && this.CatPoint.y == this.skatingArr[t].y)
            {
                return true;
            }
        return false;
    },
    GameThroughTesting: function() {
        return this.CatPoint.x == this.FishPoint.x && this.FishPoint.y == this.CatPoint.y;
    },
    DarwFootPrint: function(time) {
        var a = this.seekSelfFootPrint(), e = this.seekFootPrintArr();
        if (a){
            if(e.module){
                e.module.getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).deleteSelf(time), 
                e.module =null;
                this.GameFootprint.pop();
                //console.log("111")
            }
            //console.log("22222")
        } else {
            e.module && (e.module.getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).deleteSelf(time),this.GameFootprint.pop(), 
            e.module = null);
            var t = cc.instantiate(this._resources[this._footPrint]);
            t.getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).initFooprint(this.CatDirection), 
            t.getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).runFootPrintAction(time), t.position = this.getGameCFDPoint(this.FootPrintPoint), 
            t.zIndex = -2, this.GameArea.addChild(t), e.point = this.FootPrintPoint, e.module = t;
            //console.log("创建新脚步")
        }

        //console.log(this.GameFootprint.length,this.GameFootprint,"lengthlengthlengthlength")

        if(this.GameFootprint[this.GameFootprint.length -1].module == null){
            this.GameFootprint.pop();
            this.GameFootprint[this.GameFootprint.length - 1].module.getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).deleteSelf(time),this.GameFootprint.pop();
        }
    },
    // seekFootPrintArr: function() {
    //     console.log(this.GameFootprint,this.FootPrintPoint,"aaaaaaaaaaaaaa")
    //     var a = this.GameFootprint.length;
    //     if (0 == a) {
    //         var e = new o();
    //         console.log('return4')
    //         return this.GameFootprint.push(e), e;
    //     }
    //     for (var t = 0; t < a; t++) {
    //         if (!this.GameFootprint[t].point){
    //             console.log("return 1")
    //             // if(this.GameFootprint[t -1].module && this.GameFootprint[t].module == null){
    //             //     this.GameFootprint[t-1].module.getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).deleteSelf();
    //             // }
    //             return this.GameFootprint[t];
    //         }

    //         if (this.GameFootprint[t].point.x == this.FootPrintPoint.x && this.GameFootprint[t].point.y == this.FootPrintPoint.y) {
    //             console.log("return2")
    //             return this.GameFootprint[t];
    //         }
    //     }
    //     console.log('创建新foot')
    //     return e = new o(), this.GameFootprint.push(e), e;
    // },
    seekFootPrintArr: function() {
        var a = this.GameFootprint.length;
        if (0 == a) {
            var e = new o();
            //console.log('return4')
            return this.GameFootprint.push(e), e;
        }
        for (var t = 0; t < a; t++) {
            if (!this.GameFootprint[t].point){
                //console.log("return 1")
                return this.GameFootprint[t];
            }

            if (this.GameFootprint[t].point.x == this.FootPrintPoint.x && this.GameFootprint[t].point.y == this.FootPrintPoint.y) {
                //console.log("return2")
                return this.GameFootprint[t];
            }
        }
        //console.log('创建新foot')
        var e = new o();
        this.GameFootprint.push(e);
        return e;
    },
    seekSelfFootPrint: function() {
        //console.log(this.CatPoint,this.GameFootprint.length)
        var a = this.GameFootprint.length;
        if (0 == a) return false;
        for (var e = 0; e < a; e++)
            if(null != this.GameFootprint[e].module && this.GameFootprint[e].point.x == this.CatPoint.x && this.GameFootprint[e].point.y == this.CatPoint.y){
                return true;
            }
        return false;
    },
    onButtonPause: function() {
        if(this.canOperate == false){
            return;
        }
        MT.AUDIOMGR.playEffect("button");
        var t = cc.instantiate(this._resources[this._pause]);
        (t.getComponent(MT.GLOBAL.CONST_TEXT.PauseJs).Father = this).node.parent.addChild(t), 
        this.pauseAllAction();
    },
    buttonPauseOff: function() {
        this.recoverTimeCall();
    },
    GameReset: function() {
        this.canOperate = false;
        var t = this.deleteGameData();
        this.GameemptyData(), this.scheduleOnce(this.ThenextlevelGame, t + .4);
    },
    newGame: function() {
        var t = this.deleteGameData();
        this.scheduleOnce(this.GamewellActionCall, t + .4);
    },
    onBtnReset:function(){
        console.log("是否确定重新开始?")
        if(!this.canOperate){
            return;
        }
        this.GameReset();
    },
    deleteGameData: function() {
        var n, e = cc.fadeOut(.3);
        if (this.Cat && this.Cat.runAction(e), this.Fish && (this.Fish.runAction(e.clone()), 
        this.Fish.opacity = 0), 2 == MT.USER.CustomsSize && 0 < this.Dog.length) for (var t = 0; t < this.Dog.length; t++) this.Dog[t].Dog.runAction(e.clone());
        if (3 == MT.USER.CustomsSize && 0 < this.GameSkatArr.length) for (t = 0; t < this.GameSkatArr.length; t++) this.GameSkatArr[t].runAction(e.clone());
        if (5 == MT.USER.CustomsSize) {
            //if (0 < this.GameTrapArr.length) for (t = 0; t < this.GameTrapArr.length; t++) this.GameTrapArr[t].trap.runAction(e.clone());
            if (0 < this.trapArr.length) for (t = 0; t < this.trapArr.length; t++) this.trapArr[t].runAction(e.clone());


            if (0 < this.GamePitfallArr.length) for (t = 0; t < this.GamePitfallArr.length; t++) this.GamePitfallArr[t].pitfall.runAction(e.clone());
        }
        this.Face && (this.Face.getComponent(MT.GLOBAL.CONST_TEXT.FaceJs).deleteSelf(), 
        this.unschedule(this.setplayFaseCallTime), this.Face = null);
        var i = .01;
        for (150 < this.GameWellArr.length && (i = 1 / this.GameWellArr.length), t = 0; t < this.GameWellArr.length; t++) this.GameWellArr[t].getComponent(MT.GLOBAL.CONST_TEXT.WellActionJs).finishAction(.2, n = i * t);
        for (this.EffectNum_end = n * this.WellArr.length / .2, this.EffectNum = 0, this.schedule(this.playEffectCall, .2), 
        t = 0; t < this.footItemArr.length; t++){
            this.footItemArr[t].getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).deleteSelf(0);
        }
        this.footArr = [];
        this.footItemArr = [];
        for (t = 0; t < this.GameHintFootArr.length; t++)
        {
            null != this.GameHintFootArr[t] && this.GameHintFootArr[t].getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).deleteSelf(0);
        } 
        return n;
    },

    saveGameResult:function(){
        MT.USER.GuanNum++;
        switch (MT.USER.CustomsSize) {
            case 0:
              if(MT.USER.GuanNum % 20 == 0 && MT.USER.ComPer[MT.USER.SUBMODEL] == 19){
                  MT.USER.ComPer[MT.USER.SUBMODEL] = 20;
              }else if(MT.USER.GuanNum % 20 == 1 && MT.USER.ComPer[MT.USER.SUBMODEL] == 20){
                  MT.USER.ComPer[MT.USER.SUBMODEL] = 21;
              }else{
                  MT.USER.GuanNum % 20 > MT.USER.ComPer[MT.USER.SUBMODEL] && (MT.USER.ComPer[MT.USER.SUBMODEL] = MT.USER.GuanNum % 20);
              }
              console.log("____金典"), 
              MT.USER.setSave_ComPer();
              break;
  
            case 1:
            if(MT.USER.GuanNum% 20 == 0 && MT.USER.TimePer[MT.USER.SUBMODEL] == 19){
              MT.USER.TimePer[MT.USER.SUBMODEL] = 20;
              }else if(MT.USER.GuanNum% 20 == 1 && MT.USER.TimePer[MT.USER.SUBMODEL] == 20){
                  MT.USER.TimePer[MT.USER.SUBMODEL] = 21;
              }else{
                  MT.USER.GuanNum % 20 > MT.USER.TimePer[MT.USER.SUBMODEL] && (MT.USER.TimePer[MT.USER.SUBMODEL] = MT.USER.GuanNum % 20);
              }
              console.log("____金典"), 
              MT.USER.setSave_TimePer();
              break;
  
            case 2:
            if(MT.USER.GuanNum% 20 == 0 && MT.USER.DogPer[MT.USER.SUBMODEL] == 19){
              MT.USER.DogPer[MT.USER.SUBMODEL] = 20;
              }else if(MT.USER.GuanNum% 20 == 1 && MT.USER.DogPer[MT.USER.SUBMODEL] == 20){
                  MT.USER.DogPer[MT.USER.SUBMODEL] = 21;
              }else{
                  MT.USER.GuanNum % 20 > MT.USER.DogPer[MT.USER.SUBMODEL] && (MT.USER.DogPer[MT.USER.SUBMODEL] = MT.USER.GuanNum % 20);
              }
              console.log("____疯狗"), 
              MT.USER.setSave_DogPer();
              break;
  
            case 3:
            if(MT.USER.GuanNum% 9 == 0 && MT.USER.SkatPer[MT.USER.SUBMODEL] == 8){
              MT.USER.SkatPer[MT.USER.SUBMODEL] = 9;
              }else if(MT.USER.GuanNum% 9 == 1 && MT.USER.SkatPer[MT.USER.SUBMODEL] == 9){
                  MT.USER.SkatPer[MT.USER.SUBMODEL] = 10;
              }else{
                  MT.USER.GuanNum % 9 > MT.USER.SkatPer[MT.USER.SUBMODEL] && (MT.USER.SkatPer[MT.USER.SUBMODEL] = MT.USER.GuanNum % 9);
              }
              console.log("____溜冰"), 
              MT.USER.setSave_SkatPer();
              break;
  
            case 4:
            if(MT.USER.GuanNum% 20 == 0 && MT.USER.NightPer[MT.USER.SUBMODEL] == 19){
              MT.USER.NightPer[MT.USER.SUBMODEL] = 20;
              }else if(MT.USER.GuanNum% 20 == 1 && MT.USER.NightPer[MT.USER.SUBMODEL] == 20){
                  MT.USER.NightPer[MT.USER.SUBMODEL] = 21;
              }else{
                  MT.USER.GuanNum % 20 > MT.USER.NightPer[MT.USER.SUBMODEL] && (MT.USER.NightPer[MT.USER.SUBMODEL] = MT.USER.GuanNum % 20);
              }
              console.log("____黑夜"), 
              MT.USER.setSave_NightPer();
              break;
  
            case 5:
            if(MT.USER.GuanNum% 20 == 0 && MT.USER.TrapPer[MT.USER.SUBMODEL] == 19){
              MT.USER.TrapPer[MT.USER.SUBMODEL] = 20;
              }else if(MT.USER.GuanNum% 20 == 1 && MT.USER.TrapPer[MT.USER.SUBMODEL] == 20){
                  MT.USER.TrapPer[MT.USER.SUBMODEL] = 21;
              }else{
                  MT.USER.GuanNum % 20 > MT.USER.TrapPer[MT.USER.SUBMODEL] && (MT.USER.TrapPer[MT.USER.SUBMODEL] = MT.USER.GuanNum % 20);
              }
              console.log("____陷阱"), 
              MT.USER.setSave_TrapPer();
              break;
          }
          var txtPassedStage = 0;
          //= MT.USER.ComPer + MT.USER.TimePer + MT.USER.DogPer + MT.USER.SkatPer + MT.USER.NightPer + MT.USER.TrapPer - 6;
          for(let i = 0;i != MT.USER.ComPer.length;i ++){
              txtPassedStage = txtPassedStage + MT.USER.ComPer[i] +MT.USER.TimePer[i] + MT.USER.DogPer[i] + MT.USER.SkatPer[i] + MT.USER.NightPer[i] + MT.USER.TrapPer[i];
          }
          txtPassedStage -= 30;
          MT.WXHELPER.setUserCloudStorage(MT.WXHELPER.MessageInfoType.score,txtPassedStage)
          MT.USER.saveToServer();
    },
    GamewellActionCall: function() {
        var t;
        this.GameemptyData();
        switch (MT.USER.CustomsSize) {
          case 0:
            t = "classic";
            break;

          case 1:
            t = "time_trial";
            break;

          case 2:
            t = "enemies";
            break;

          case 3:
            t = "ice_floor";
            break;

          case 4:
            t = "fog";
            break;

          case 5:
            t = "traps";
        }
        //console.log(MT.USER.GuanNum,"tttttttttttttttttttttt",MT.USER.ComPer,MT.USER.SUBMODEL)
        if(3 == MT.USER.CustomsSize){
            1 == MT.USER.GuanNum % 9 && MT.GLOBAL.loadScene("selectionScene")
        }else{
            1 == MT.USER.GuanNum % 20 && MT.GLOBAL.loadScene("selectionScene");
        }
        1 > MT.USER.GuanNum && (MT.USER.GuanNum = 1);
        MT.USER.GetMap(t, MT.USER.GuanNum, this.ThenextlevelGame.bind(this));


        // 3 == MT.USER.CustomsSize ? 1 == MT.USER.GuanNum % 9 && MT.GLOBAL.loadScene("selectionScene") : 1 == MT.USER.GuanNum % 20 && MT.GLOBAL.loadScene("selectionScene"), 
        // 1 > MT.USER.GuanNum && (MT.USER.GuanNum = 1), MT.USER.GetMap(t, MT.USER.GuanNum, this.ThenextlevelGame.bind(this));
    },
    ThenextlevelGame: function() {
        this.unschedule(this.playEffectCall);
        console.log(this.node.getChildByName("backGround_up"))
        this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("DriedFish").getComponent(MT.GLOBAL.CONST_TEXT.DiredFish).DownFishNum(); 
        this.drawGuanQian();
        this.initMap();
        this.setCatStatus();
    },
    GameemptyData: function() {
        if (this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("Time").active = !1, 
        this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("progressBox").active = false, 
        this.GameHintFootArr = [], this.GameFootprint = [], this.GameWellArr = [], this.HintNum = 3,
        this.footArr = [],this.footItemArr = [],
        this.CatDirection = -1, this.touchStart = null, this.WellArr = [], this.HintCircuit = [], 
        this.row = 0, this.col = 0, this.CatPoint = null, this.FishPoint = null, this.Gover = null, 
        this.impact = !1, this.Fish.getComponent(MT.GLOBAL.CONST_TEXT.FishJs).deleteSelf(), 
        this.Fish = null, this.Face && (this.Face.getComponent(MT.GLOBAL.CONST_TEXT.FaceJs).deleteSelf(), 
        this.Face = null), this.nigth = null, this.Cat.getComponent(MT.GLOBAL.CONST_TEXT.CatJs).deleteSelf(), 
        this.Cat = null, 2 == MT.USER.CustomsSize && 0 < this.Dog.length) {
            for (var t = 0; t < this.Dog.length; t++) this.Dog[t].Dog.getComponent(MT.GLOBAL.CONST_TEXT.DogJs).deleteSelf();
            this.Dog = [];
        }
        if (3 == MT.USER.CustomsSize && this.GameSkatArr.length) {
            for (t = 0; t < this.GameSkatArr.length; t++) this.GameSkatArr[t].removeFromParent();
            this.GameSkatArr = [], this.skatingArr = [];
        }
        if (5 == MT.USER.CustomsSize) {
            //if (0 < this.GameTrapArr.length) for (t = 0; t < this.GameTrapArr.length; t++) this.GameTrapArr[t].trap.removeFromParent();
            if(0 < this.trapArr.length){
                for(let t = 0;t <this.trapArr.length; t++){
                    this.trapArr[t].removeFromParent();
                }
            }
            this.trapArr = [];
            if (0 < this.GamePitfallArr.length) for (t = 0; t < this.GamePitfallArr.length; t++) this.GamePitfallArr[t].pitfall.removeFromParent();
            this.GameTrapArr = [], this.GamePitfallArr = [];
        }
    },
    onButtonHint: function() {
        // if (d.playEffect("button"), 0 < this.HintNum) {
            if (MT.AUDIOMGR.playEffect("button"), 0 < this.HintNum) {
            var t = cc.instantiate(this._resources[this._Hint]);
            t.getComponent(MT.GLOBAL.CONST_TEXT.HintJs).Father = this, t.getComponent(MT.GLOBAL.CONST_TEXT.HintJs).initHint(this.HintNum), 
            this.node.addChild(t), this.pauseAllAction();
        } else(Hint_YvesYu.createHint("本局提示次数已用完!", this.node));
    },
    pauseAllAction: function() {
        1 == MT.USER.CustomsSize ? this.unschedule(this.timeModeTimeCall) : this.unschedule(this.GameTimeCall), 
        2 == MT.USER.CustomsSize && (this.unschedule(this.DogRunAction), this.setImpactState(!1)), 
        // 5 == MT.USER.CustomsSize && (this.unschedule(this.runGamePitfall), this.unschedule(this.runGameTrap), 
        5 == MT.USER.CustomsSize && (this.unschedule(this.runGamePitfall), this.stopRunTrap(),// this.unschedule(this.runTrap),
        this.setImpactState(!1));
    },
    recoverTimeCall: function() {
        1 == MT.USER.CustomsSize ? this.schedule(this.timeModeTimeCall, 0.05) : this.schedule(this.GameTimeCall, 1), 
        2 == MT.USER.CustomsSize && (this.schedule(this.DogRunAction, 1), this.setImpactState(!0)), 
        // 5 == MT.USER.CustomsSize && (this.schedule(this.runGamePitfall, .7), this.schedule(this.runGameTrap, 1), 
        5 == MT.USER.CustomsSize && (this.schedule(this.runGamePitfall, .7), this.resumeRunTrap(), // this.schedule(this.runTrap, MT.GLOBAL.trapFreshTime), 
        this.setImpactState(!0));
    },
    // UseHint: function() {
    //     // if (d.playEffect("level_complete"), 4 == MT.USER.CustomsSize) return this.nigth.scale += 3, 
    //     if (4 == MT.USER.CustomsSize) return this.nigth.scale += 3, 
    //     void this.HintNum--;
    //     if (this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("DriedFish").getComponent(MT.GLOBAL.CONST_TEXT.DiredFish).DownFishNum(), 
    //     1 < this.HintCircuit.length) {
    //         var l = 0, e = this.HintCircuit.length / this.HintNum;
    //         this.HintNum--;
    //         for (var t, m = 0; m < e; m++) {
    //             t = Arr_YvesYu.getArrayFirstData(this.HintCircuit), this.HintCircuit = Arr_YvesYu.deleteArrayFirstData(this.HintCircuit);
    //             var i = Arr_YvesYu.getArrayFirstData(this.HintCircuit);
    //             if (!t) break;
    //             i || (i = this.FishPoint);
    //             var n = null;
    //             if (t.y == i.y ? t.x < i.x ? n = 0 : t.x > i.x && (n = 1) : t.x == t.x && (t.y < i.y ? n = 2 : t.y > i.y && (n = 3)), 
    //             null != n) {
    //                 var o = cc.instantiate(this._resources[this._FootPrint_Hint]);
    //                 o.getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).initFooprint(n), o.position = this.getGameCFDPoint(t), 
    //                 o.zIndex = -1, o.opacity = 0;
    //                 var s = cc.sequence(cc.delayTime(l), cc.fadeIn(.2), cc.callFunc(function(t) {
    //                     t.getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).runFootPrintAction(0);
    //                 }.bind(this, o)));
    //                 l += .2, o.runAction(s), this.GameArea.addChild(o), this.GameHintFootArr.push(o);
    //             }
    //         }
    //     } else Hint_YvesYu.createHint("提示线路,已经全部显示完毕!", this.node);
    // },
    UseHint: function() {
        // if (d.playEffect("level_complete"), 4 == MT.USER.CustomsSize) return this.nigth.scale += 3, 
        // MT.GLOBAL.PRICE <= MT.USER.DriedFishNum ? (MT.USER.DriedFishNum -= MT.GLOBAL.PRICE, 
        // MT.USER.setSave_DriedFishNum()) :(console.log("数量不足"), Hint_YvesYu.createHint("提示数量不足!", this.node),return);
        if(this.canOperate == false){
            return;
        }
        if(MT.GLOBAL.PRICE <= MT.USER.DriedFishNum){
            // MT.USER.DriedFishNum -= MT.GLOBAL.PRICE;
            // MT.USER.setSave_DriedFishNum();
        }else{
            Hint_YvesYu.createHint("小鱼干数量不足!", this.node);
            return;
        }
        
        MT.AUDIOMGR.playEffect("level_complete")
        if(this.HintNum <= 0){
            console.log("提示完毕不能再提示");
            Hint_YvesYu.createHint(MT.GLOBAL.TIPMESSAGE.limitTip, this.node);
            return;
        }
        if (4 == MT.USER.CustomsSize){
            console.log("增加黑暗");
            this.nigth.scale *= 1.4;
        }else if (1 == MT.USER.CustomsSize){        //限时模式
            let time = 0;
            63 == this.row * this.col ? time = 100 : 130 == this.row * this.col ? time = 133 : 252 == this.row * this.col ? time = 200 :
            414 == this.row * this.col ? time = 267: 616 == this.row * this.col && (time = 367);
            this.GameTime += time;
            time /= 10;
            Hint_YvesYu.createHint(MT.GLOBAL.TIPMESSAGE.sjyc + time + "秒!", this.node);
        }else if(5 == MT.USER.CustomsSize){ 
            //console.log(this.trapArr,"asdfsadf")
            if(this.trapArr.length == 0){
                Hint_YvesYu.createHint(MT.GLOBAL.TIPMESSAGE.noTrap, this.node);
                return;
            }else{
                this.trapArr[this.trapArr.length - 1].removeFromParent();
                this.trapArr.pop();
                Hint_YvesYu.createHint(MT.GLOBAL.TIPMESSAGE.trapRemove, this.node);
            }
        }else if(2 == MT.USER.CustomsSize){
            if(this.Dog.length == 0){
                Hint_YvesYu.createHint(MT.GLOBAL.TIPMESSAGE.noDog, this.node);
                return;
            }else{
                this.Dog[this.Dog.length - 1].Dog.removeFromParent();
                this.Dog.pop();
                Hint_YvesYu.createHint(MT.GLOBAL.TIPMESSAGE.dogRemove, this.node);
            }
        }
        else{
            if (1 < this.HintCircuit.length) {
                var l = 0;
                var e = this.HintCircuit.length / this.HintNum;
               // console.log(this.HintCircuit,this.HintNum,"=======",e)
                for (var t, m = 0; m < e; m++) {
                    t = Arr_YvesYu.getArrayFirstData(this.HintCircuit);
                    this.HintCircuit = Arr_YvesYu.deleteArrayFirstData(this.HintCircuit);
                    var i = Arr_YvesYu.getArrayFirstData(this.HintCircuit);
                    if (!t) 
                    break;
                    i || (i = this.FishPoint);
                    var n = null;
                    t.y == i.y ? t.x < i.x ? n = 0 : t.x > i.x && (n = 1) : t.x == t.x && (t.y < i.y ? n = 2 : t.y > i.y && (n = 3));
                    if (null != n) {
                        //console.log(t,"tttttttttttt",i)
                        var o = cc.instantiate(this._resources[this._FootPrint_Hint]);
                        o.getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).initFooprint(n), o.position = this.getGameCFDPoint(t), 
                        o.zIndex = -1, o.opacity = 0;
                        var s = cc.sequence(cc.delayTime(l), cc.fadeIn(.2), cc.callFunc(function(t) {
                            t.getComponent(MT.GLOBAL.CONST_TEXT.FootPrintJs).runFootPrintAction(0);
                        }.bind(this, o)));
                        l += .2, o.runAction(s), this.GameArea.addChild(o), this.GameHintFootArr.push(o);
                    }
                }
            }else{
                console.log("提示完毕不能再提示");
                Hint_YvesYu.createHint("提示线路,已经全部显示完毕!", this.node);
                return;
            }
        }
        //console.log(this.HintNum,"hnnnnn")
        this.HintNum--;
        MT.USER.DriedFishNum -= MT.GLOBAL.PRICE;
        MT.USER.setSave_DriedFishNum();
        this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("DriedFish").getComponent(MT.GLOBAL.CONST_TEXT.DiredFish).DownFishNum();     

    },
    start: function() {},

    onBtnWatchVideo:function(){
        if(!this.tipLayer){
            this.tipLayer = cc.instantiate(this.tipLayerPrefab);
            this.tipLayer.position = cc.v2(0,0);
            this.node.addChild(this.tipLayer);
            
        }
        this.tipLayer.getComponent("tip").onShow();
    },

    // update (dt) {},
});
