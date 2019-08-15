// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var a = function() {}, l = function() {
    cc.v2(0, 0);
}, o = function() {
    cc.v2(0, 0);
}, n = function() {
    cc.v2(0, 0);
};

cc.Class({
    extends: require("baseScene"),

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
        GameArea: cc.Node,
        GuanQian: cc.Node,
        canOperate:false,
        bgSpriteFrame:{
            default:[],
            type:cc.SpriteFrame,
        },
        backGround:cc.Sprite,
        subBg:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node = this.node.getChildByName("node");
        this.chooseSkin();
        if(CC_WECHATGAME){
            console.log(wx.getSystemInfoSync(),"xxxxxx")
            if(wx.getSystemInfoSync().model == "iPhone X"){
                this.GuanQian.getComponent(cc.Widget).top += 50;
                //this.GuanQian.getComponent(cc.Widget).updateAlignment();
            }
        }
        
        
        //console.log("gameInitgameInitgameInit")
        if (this._super(), this.drawGuanQian(), this.Cat, this.Fish, this.Dog = [], this.row, 
        this.col, this.CatPoint, this.FishPoint, this.HintCircuit = [], this.WellArr = [], 
        this.touchStart = null, this.CatDirection = -1, this.GameFootprint = [], this.FootPrintPoint = null, 
        this.HintNum = 3, this.GameWellArr = [], this.GameHintFootArr = [], this.GameTime = 0, 
        this.progressTime = 0, this.Face = null, this.Gover = null, this.skatingArr = [], 
        this.GameSkatArr = [], this.GameTrapArr = [], this.GamePitfallArr = [], this.impact = !1,
        this.trapArr = [],
        this.nigth = null, 1 == MT.USER.GuanNum) {
            //console.log("加载帮助界面");
            var n = this;
            // cc.loader.loadRes("prefabs/game/GameOneHelp", function(a, e) {
            //     var t = cc.instantiate(e);
            //     t.getComponent(GLOBAL.CONST_TEXT.GameOneHelpJs).initGameOneHelp(MT.USER.CustomsSize), 
            //     n.node.addChild(t);
            // });
        }
    },

    chooseSkin(){
        if(MT.USER.CustomsSize == 2 || MT.USER.CustomsSize == 5){
            this.backGround.spriteFrame = this.bgSpriteFrame[1];
            this.node.getChildByName("Theme1").removeFromParent();
            this.node.getChildByName("Theme2").removeFromParent();
            this.subBg.color = cc.color(184,161,112)

        }else{
            this.backGround.spriteFrame = this.bgSpriteFrame[0];
            this.subBg.color = cc.color(173,134,99)
        }
    },
    onResourceLoaded: function() {},
    initView:function(){
        //console.log("iniiiiiiiiiiiiiiiiiiiiiiiiiiii")
        WAITMGR.showWaitLayer();
        this._wall_width = "prefabs/game/wall_width", this.pushPrefab(this._wall_width), 
        this._well_heigth = "prefabs/game/well_heigth", this.pushPrefab(this._well_heigth), 
        this._cat = "prefabs/game/hero", this.pushPrefab(this._cat);
        this._fish = "prefabs/game/Fish", 
        this.pushPrefab(this._fish), this._Dog = "prefabs/game/monster", this.pushPrefab(this._Dog), 
        this._footPrint = "prefabs/game/footPrint", this.pushPrefab(this._footPrint), 
        this._pause = "prefabs/game/pause", this.pushPrefab(this._pause), this._Hint = "prefabs/game/Hint", 
        this.pushPrefab(this._Hint), this._FootPrint_Hint = "prefabs/game/FootPrint_Hint", 
        this.pushPrefab(this._FootPrint_Hint), this._GameOver = "prefabs/game/GameOver", 
        this.pushPrefab(this._GameOver), this._Face = "prefabs/game/Face", this.pushPrefab(this._Face), 
        this._iceBlock = "prefabs/game/iceBlock", this.pushPrefab(this._iceBlock), 
        this._trap = "prefabs/game/trap", this.pushPrefab(this._trap), this._pitfall = "prefabs/game/pitfall", 
        this.pushPrefab(this._pitfall), this._night = "prefabs/game/night", this.pushPrefab(this._night), 
        this.registerLoadResourceEndCallBack(this.onResourceLoaded.bind(this));
        this.preloadResources();
    },
    initMap: function() {
        this.row = MT.GLOBAL.MAP.r, this.col = MT.GLOBAL.MAP.c, this.CatPoint = this.JsonDataTransitionV2(MT.GLOBAL.MAP.s),
        this.FishPoint = this.JsonDataTransitionV2(MT.GLOBAL.MAP.f);
        this.HintCircuit[0] = this.CatPoint;
        //console.log(this.CatPoint,"cccc",MT.GLOBAL.MAP.h)
        for (var d = true, e = MT.GLOBAL.MAP.h.length, t = 0; t < e - 1; t++) {
            this.HintCircuit[t + 1];
            var i = this.JsonDataTransitionV2(MT.GLOBAL.MAP.h[t]);
            var l = Arr_YvesYu.getArrayFinallyData(this.HintCircuit);
            l ? l.x == i.x || l.y == i.y ? this.HintCircuit[t + 1] = i:
            d = this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("DriedFish").active = false : this.HintCircuit[t + 1] = i;
        }

        10 > this.HintCircuit.length && (d = this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("DriedFish").active = false), 
        d && (this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("DriedFish").active = true), 
        4 == MT.USER.CustomsSize && (this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("DriedFish").active = true);
        var n = MT.GLOBAL.MAP.w.length;
        for (t = 0; t < n; t++) {
            var o = new Array();
            o.start = this.JsonDataTransitionV2(MT.GLOBAL.MAP.w[t].o), o.end = this.JsonDataTransitionV2(MT.GLOBAL.MAP.w[t].d), 
            this.WellArr[t] = o;
        }
        if (3 == MT.USER.CustomsSize) {
            var s = MT.GLOBAL.MAP.i.length;
            for (t = 0; t < s; t++) this.skatingArr[t] = this.JsonDatafloatTurnInt(MT.GLOBAL.MAP.i[t]);
        }
        // console.log(this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("DriedFish").active,"aaaaaa")
        var r = this.darwGameWell();
        switch (3 == MT.USER.CustomsSize && this.darwGameSkating(), this.darwGameCat(), 
        // this.darwGameFish(), 2 == MT.USER.CustomsSize && this.darwGameDog(), 5 == MT.USER.CustomsSize && this.dawnGameTrap(), 
        this.darwGameFish(), 2 == MT.USER.CustomsSize && this.darwGameDog(), 5 == MT.USER.CustomsSize && this.drawTrap(), 

        1 == MT.USER.GuanNum && (r += 1), this.scheduleOnce(this.visionCatAndFishAndDog, r + .15), 
        MT.USER.CustomsSize) {
          case 1:
            63 == this.row * this.col ? this.GameTime = 300 : 130 == this.row * this.col ? this.GameTime = 400 : 252 == this.row * this.col ? this.GameTime = 600 : 414 == this.row * this.col ? this.GameTime = 800 : 616 == this.row * this.col && (this.GameTime = 1100);
            break;

          default:
            this.GameTime = 0;
        }
        if(1 == MT.USER.CustomsSize || 5 == MT.USER.CustomsSize|| 2 == MT.USER.CustomsSize){
            this.specialDriedFish();
        }
    },
    specialDriedFish(){
        this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("DriedFish").active = true;

    },


    start () {

    },
    darwGameDog: function() {
        var o = 1;
        63 == this.row * this.col ? o = 1 : 130 == this.row * this.col ? o = 2 : 252 == this.row * this.col ? o = 3 : 414 == this.row * this.col ? o = 4 : 616 == this.row * this.col && (o = 5);
        for (var e = 0; e < o; e++) {
            var t = cc.instantiate(this._resources[this._Dog]), i = this.getDogPosition();
            t.position = this.getGameCFDPoint(i), t.group = MT.MazeRecruit_Group.getMazeRecruit_Zoon(), 
            t.opacity = 0, this.GameArea.addChild(t);
            var a = new l();
            a.point = i, a.Dog = t, a.FX = -1, this.Dog.push(a);
        }
        this.schedule(this.DogRunAction, 1);
    },

    drawTrap:function(){
        //console.log(MT.GLOBAL.MAP.t,"map")
        for(let i = 0;i != MT.GLOBAL.MAP.t.length; i++){
            let trapItem = cc.instantiate(this._resources[this._trap]);
            let trapInfo = MT.GLOBAL.MAP.t[i];
            // let posX = (trapInfo.v1.x + trapInfo.v2.x) / 2;
            // let posY = (trapInfo.v1.y + trapInfo.v2.y) / 2;
            trapInfo.v1.x = trapInfo.v1.x == null ? 0 : trapInfo.v1.x;
            trapInfo.v1.y = trapInfo.v1.y == null ? 0 : trapInfo.v1.y;
            trapInfo.v2.x = trapInfo.v2.x == null ? 0 : trapInfo.v2.x;
            trapInfo.v2.y = trapInfo.v2.y == null ? 0 : trapInfo.v2.y;
            let posX = trapInfo.v1.x > trapInfo.v2.x ? trapInfo.v2.x : trapInfo.v1.x;
            let posY = trapInfo.v1.y > trapInfo.v2.y ? trapInfo.v2.y : trapInfo.v1.y;
            // posX = posX ==null ? 0: posX;
            // posY = posY ==null ? 0: posY;
            switch(trapInfo.d){
                case "d":
                //console.log("down",i);
                posY -= 0.5;
                trapItem.angle = -90;
                break;
                case "r":
                //console.log("right",i);
                posX -= 0.5;
                trapItem.angle = 0;
                break;
                case "u":
                //console.log("up",i);
                posY -= 0.45;
                trapItem.angle = 90;
                break;
                case "l":
                //console.log("left",i);
                posX -= 0.55;
                trapItem.angle = -180;
                break;
                default:
                //console.log("errorTrap",i);
                break;
            }
            trapItem.opacity = 0;
            trapItem.position = this.getGameCFDPoint(cc.v2(posX,posY));
            this.GameArea.addChild(trapItem);
            this.trapArr.push(trapItem);
        }

    },



    dawnGameTrap: function() {
        var o = 130 == this.row * this.col ? 1 : 252 == this.row * this.col ? 2 : 414 == this.row * this.col ? 3 : 616 == this.row * this.col ? 4 : 3;
        for (var e = 0; 4 > e; e++)
            for (var t, a = 0; a < o; a++) {
            switch (t = new n(), t.FX = e, t.RUN = r(Math.random() * 1), t.point = this.getTrapPoint(e), 
            t.trap = cc.instantiate(this._resources[this._trap]), e) {
              case 0:
                t.trap.angle = 0;
                break;

              case 1:
                t.trap.angle = -180, t.trap.setAnchorPoint(cc.v2(1, 0));
                break;

              case 2:
                t.trap.angle = -90, t.trap.setAnchorPoint(cc.v2(1, 0));
                break;

              case 3:
                t.trap.angle = -270;
            }
            t.trap.opacity = 0, t.trap.name = "trap" + e + "hao", t.trap.position = cc.v2(95 * t.point.x, 95 * t.point.y), 
            this.GameArea.addChild(t.trap), this.GameTrapArr.push(t);
        }
    },
    getTrapPoint: function(n) {
        var e = 0, t = 0;
        if (0 == n || 1 == n) for (t = 0 == n ? 0 : this.row; ;) {
            e = r(Math.random() * this.col - 1);
            for (var i = 0; i < this.GameTrapArr.length; i++) this.GameTrapArr[i].point.x;
            return cc.v2(e, t);
        } else if (2 == n || 3 == n) for (e = 2 == n ? 0 : this.col; ;) {
            for (t = r(Math.random() * this.row - 1), i = 0; i < this.GameTrapArr.length; i++) this.GameTrapArr[i].point.y;
            return cc.v2(e, t);
        }
    },
    stopRunTrap:function(){
        for(let i = 0;i != this.trapArr.length; i ++){
            this.trapArr[i].getComponent("trap").stopAction();
        }
    },
    resumeRunTrap:function(){
        for(let i = 0;i != this.trapArr.length; i ++){
            this.trapArr[i].getComponent("trap").startAction();
        }
    },


    runTrap:function(index){
        //console.log("runTrap",index);
        // for(let i = 0;i != this.trapArr.length;i++){
        //     // let pitfall = cc.instantiate(this._resources[this._pitfall]);
        //     // pitfall.position = cc.v2(pitfall.width,0);
        //     // this.trapArr[i].addChild(pitfall);
        //     // pitfall.group = MT.MazeRecruit_Group.getMazeRecruit_Zoon();
        //     // pitfall.getComponent("pitfall").run();

        // }
        this.trapArr[index].getComponent("trap").startAction();
    },


    runGameTrap: function() {
        for (var r = 0; r < this.GameTrapArr.length; r++) {
            var e = this.GameTrapArr[r].point.x, t = this.GameTrapArr[r].point.y, i = !0;
            if (0 == this.GameTrapArr[r].FX || 1 == this.GameTrapArr[r].FX) {
                if (1 == this.GameTrapArr[r].RUN) {
                    e++;
                    for (var s = 0; s < this.GameTrapArr.length; s++) this.GameTrapArr[s].point.x == e && this.GameTrapArr[s].point.y == t && (i = !1);
                    if (!i || e > this.col - 1) {
                        for (i = !0, e -= 2, s = 0; s < this.GameTrapArr.length; s++) this.GameTrapArr[s].point.x == e && this.GameTrapArr[s].point.y == t && (i = !1);
                        if (!i || 0 > e) continue;
                        this.GameTrapArr[r].RUN = 0;
                    }
                } else {
                    for (e--, s = 0; s < this.GameTrapArr.length; s++) this.GameTrapArr[s].point.x == e && this.GameTrapArr[s].point.y == t && (i = !1);
                    if (!i || 0 > e) {
                        for (i = !0, e += 2, s = 0; s < this.GameTrapArr.length; s++) this.GameTrapArr[s].point.x == e && this.GameTrapArr[s].point.y == t && (i = !1);
                        if (!i || e > this.col - 1) continue;
                        this.GameTrapArr[r].RUN = 1;
                    }
                }
            } else if (1 == this.GameTrapArr[r].RUN) {
                for (t++, s = 0; s < this.GameTrapArr.length; s++) this.GameTrapArr[s].point.x == e && this.GameTrapArr[s].point.y == t && (i = !1);
                if (!i || t > this.row - 1) {
                    for (i = !0, t -= 2, s = 0; s < this.GameTrapArr.length; s++) this.GameTrapArr[s].point.x == e && this.GameTrapArr[s].point.y == t && (i = !1);
                    if (!i || 0 > t) continue;
                    this.GameTrapArr[r].RUN = 0;
                }
            } else {
                for (t--, s = 0; s < this.GameTrapArr.length; s++) this.GameTrapArr[s].point.x == e && this.GameTrapArr[s].point.y == t && (i = !1);
                if (!i || 0 > t) {
                    for (i = !0, t += 2, s = 0; s < this.GameTrapArr.length; s++) this.GameTrapArr[s].point.x == e && this.GameTrapArr[s].point.y == t && (i = !1);
                    if (!i || t > this.col - 1) continue;
                    this.GameTrapArr[r].RUN = 1;
                }
            }
            if (i) {
                var n = cc.moveTo(.9, 95 * e, 95 * t);
                this.GameTrapArr[r].trap.runAction(n), this.GameTrapArr[r].point = cc.v2(e, t), 
                this.AddGamepitfall(this.GameTrapArr[r].point, this.GameTrapArr[r].FX);
            }
        }
    },
    AddGamepitfall: function(a, e) {
        if (0 == this.GamePitfallArr.length && this.schedule(this.runGamePitfall, .7), 10 > r(Math.random() * 100)) {
            var t = new o();
            switch (t.Fx = e, t.point = a, t.pitfall = cc.instantiate(this._resources[this._pitfall]), 
            e) {
              case 0:
                t.pitfall.angle = 0;
                break;

              case 1:
                t.pitfall.angle = -180, t.pitfall.setAnchorPoint(cc.v2(1, 0));
                break;

              case 2:
                t.pitfall.angle = -90, t.pitfall.setAnchorPoint(cc.v2(1, 0));
                break;

              case 3:
                t.pitfall.angle = -270;
            }
            t.pitfall.position = this.gteGamePitfallpoint(a, e), t.pitfall.group = MT.MazeRecruit_Group.getMazeRecruit_Zoon(), 
            this.GameArea.addChild(t.pitfall), this.GamePitfallArr.push(t);
        }
    },
    gteGamePitfallpoint: function(a, e) {
        return 0 == e || 1 == e ? cc.v2(95 * a.x + 50, 95 * a.y) : 2 == e || 3 == e ? cc.v2(95 * a.x, 95 * a.y + 50) : void 0;
    },
    runGamePitfall: function() {
        if (0 < this.GamePitfallArr.length) for (var o = 0; o < this.GamePitfallArr.length; o++) {
            var e = this.GamePitfallArr[o].point.x, t = this.GamePitfallArr[o].point.y;
            switch (this.GamePitfallArr[o].Fx) {
              case 0:
                t++;
                break;

              case 1:
                t--;
                break;

              case 2:
                e++;
                break;

              case 3:
                e--;
            }
            if (0 > e || t > this.row || 0 > t || e > this.col) this.GamePitfallArr[o].pitfall.removeFromParent(), 
            this.GamePitfallArr = Arr_YvesYu.removeArrayIndex(this.GamePitfallArr, o); else {
                var i = this.gteGamePitfallpoint(cc.v2(e, t), this.GamePitfallArr[o].Fx);
                this.GamePitfallArr[o].point = cc.v2(e, t);
                var a = cc.moveTo(.68, i.x, i.y);
                this.GamePitfallArr[o].pitfall.runAction(a);
            }
        }
    },
    getDogPosition: function() {
        for (var a = this.row - 2, e = this.col - 2; ;) {
            e = r(Math.random() * e) + 1, a = r(Math.random() * a) + 1;
            for (var t = 0; t < this.Dog.length; t++) this.Dog[t].point.x != e && this.Dog[t].point.y;
            if (this.CatPoint.x != e && this.CatPoint.y != a && this.FishPoint.x != e && this.FishPoint.y != a) return cc.v2(e, a);
        }
    },
    DogRunAction: function() {
        for (var a = 0; a < this.Dog.length; a++) if (!this.Dog[a].Dog.getComponent(MT.GLOBAL.CONST_TEXT.DogJs).RunState()) {
            var e = this.getDogRunPosition(a);
            e && (this.Dog[a].point = e, this.Dog[a].Dog.getComponent(MT.GLOBAL.CONST_TEXT.DogJs).setDogRunAction(this.getGameCFDPoint(e)));
        }
    },
    getDogRunPosition: function(d) {
        -1 == this.Dog[d].FX ? this.getDogRunFangXiang(d) : 20 > r(Math.random() * 100) && this.getDogRunFangXiang(d);
        for (var e = 0; 20 > e; e++) {
            var t = this.Dog[d].point.x, i = this.Dog[d].point.y, a = this.judgeIndexCanRun(this.Dog[d].FX, cc.v2(t, i));
            if (a) {
                for (var n = !1, o = 0; o < this.Dog.length; o++) if (o != d && this.Dog[o].point.x == a.x && this.Dog[o].point.y == a.y) {
                    n = !0;
                    break;
                }
                if (this.FishPoint.x == a.x && this.FishPoint.y == a.y && (n = !0), n) {
                    this.getDogRunFangXiang(d);
                    continue;
                }
                return a;
            }
            this.getDogRunFangXiang(d);
        }
    },
    GameDelayeCallFinish: function() {
        // null == this.Gover && (t.playEffect("Gamedie"), this.Cat.stopAllActions(), this.Gover = cc.instantiate(this._resources[this._GameOver]), 
        // this.Gover.getComponent(MT.GLOBAL.CONST_TEXT.GameOverJS).initGameOver_special(MT.USER.GuanNum), 
        // (this.Gover.getComponent(MT.GLOBAL.CONST_TEXT.GameOverJS).Father = this).Cat.getComponent(MT.GLOBAL.CONST_TEXT.CatJs).rundieAction(), 
        // this.node.addChild(this.Gover));
        null == this.Gover && (MT.AUDIOMGR.playEffect("Gamedie"), this.Cat.stopAllActions(), this.Gover = cc.instantiate(this._resources[this._GameOver]), 
        this.Gover.getComponent(MT.GLOBAL.CONST_TEXT.GameOverJS).initGameOver_special(MT.USER.GuanNum), 
        (this.Gover.getComponent(MT.GLOBAL.CONST_TEXT.GameOverJS).Father = this).Cat.getComponent(MT.GLOBAL.CONST_TEXT.CatJs).rundieAction(), 
        this.node.parent.addChild(this.Gover));
    },
    getDogRunFangXiang: function(a) {
        for (;;) {
            var e = r(Math.random() * 3);
            if (e != this.Dog[a].FX) return void (this.Dog[a].FX = e);
        }
    },
    judgeIndexCanRun: function(a, e) {
        var t = null;
        return 0 === a ? (e.x++, t = this.CanRuning(e, cc.v2(e.x, e.y + 1)) ? e : null) : 1 === a ? this.CanRuning(e, cc.v2(e.x, e.y + 1)) ? (e.x--, 
        t = e) : t = null : 2 === a ? (e.y++, t = this.CanRuning(e, cc.v2(e.x + 1, e.y)) ? e : null) : 3 === a ? this.CanRuning(e, cc.v2(e.x + 1, e.y)) ? (e.y--, 
        t = e) : t = null : void 0, t;
    },
    /**
     * 
     * @param {cc.v2} a 
     * @param {cc.v2} e 
     */
    CanRuning: function(a, e) {
        for (var t = 0; t < this.WellArr.length; t++) {
            if (this.WellArr[t].start.x == a.x && this.WellArr[t].start.y == a.y && this.WellArr[t].end.x == e.x && this.WellArr[t].end.y == e.y) return !1;
            if (this.WellArr[t].start.x == e.x && this.WellArr[t].start.y == e.y && this.WellArr[t].end.x == a.x && this.WellArr[t].end.y == a.y) return !1;
            if (this.WellArr[t].end.x == a.x && this.WellArr[t].end.y == a.y && this.WellArr[t].start.x == e.x && this.WellArr[t].start.y == e.y) return !1;
            if (this.WellArr[t].end.x == e.x && this.WellArr[t].end.y == e.y && this.WellArr[t].start.x == a.x && this.WellArr[t].start.y == a.y) return !1;
        }
        return !0;
    },
    
    visionCatAndFishAndDog: function() {
        var a = cc.fadeIn(.05);
        this.scheduleOnce(()=>{
            this.showWXrankPanel();
        },2);
        var self = this;
        this.Fish.getChildByName("cat").active = false;
        if(this.Cat){
            this.Cat.runAction(a.clone());
            if(4 == MT.USER.CustomsSize){
                this.nigth.opacity = 0;
                this.nigth.active = true;
                this.nigth.runAction(cc.sequence(cc.delayTime(0.1),cc.fadeIn(0.5)));
            }
        }
        if (this.Fish && (this.Fish.runAction(cc.sequence(a.clone(),cc.callFunc(function(){
            self.Fish.getChildByName("Iamhouse2").active = true;
            self.Fish.getChildByName("Iamhouse2").stopAllActions();
            self.canOperate = true;
            self.Fish.getChildByName("Iamhouse2").runAction(cc.sequence(cc.blink(2,4),cc.callFunc(function(){
                self.Fish.getChildByName("Iamhouse2").active = false;
            })));
        }))),
        this.Fish11 = this.Fish), 2 == MT.USER.CustomsSize && 0 < this.Dog.length) {
            for (var e = 0; e < this.Dog.length; e++) this.Dog[e].Dog.runAction(a.clone());
            this.setImpactState(true);
        }
        if (3 == MT.USER.CustomsSize && 0 < this.GameSkatArr.length) for (e = 0; e < this.GameSkatArr.length; e++) this.GameSkatArr[e].runAction(a.clone());
        // if (5 == MT.USER.CustomsSize) {
        //     if (0 < this.GameTrapArr.length) for (e = 0; e < this.GameTrapArr.length; e++) this.GameTrapArr[e].trap.runAction(a.clone());
        //     this.schedule(this.runGameTrap, 1), this.setImpactState(true);
        // }
        if (5 == MT.USER.CustomsSize) {
            var self = this;
            if (0 < self.trapArr.length) for (let e = 0; e < self.trapArr.length; e++) self.trapArr[e].runAction(cc.sequence(a.clone(),cc.callFunc(function(){
                self.runTrap(e)
            })));
            // this.schedule(this.runTrap,MT.GLOBAL.trapFreshTime,this.setImpactState(true));
            //this.schedule(this.runTrap,MT.GLOBAL.trapFreshTime,this.setImpactState(true));
            this.setImpactState(true);
        }
        this.canTouch = !0, 1 == MT.USER.CustomsSize ? (this.progressTime = this.GameTime, 
        this.schedule(this.timeModeTimeCall, .05), this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("Time").getComponent(cc.Label).string = this.GameTime / 20, 
        // this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("Time").active = !0, 
        this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("Time").active = false, 
        this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("progressBox").active = true,this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("progressBox").getChildByName("txtClock").getComponent(cc.Label).string = "") : (this.schedule(this.GameTimeCall, 1), 
        this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("Time").position = cc.v2(0, -100), 
        // this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("Time").active = !0), 
        this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("Time").active = false), 
        this.createFase();

    },
    setImpactState: function(t) {
        this.impact = t, cc.director.getCollisionManager().enabled = t;
    },
    ImpactOfZoon: function(a, e) {
        "hero" == e.node.name && ("monster" == a.node.name && (this.Cat.stopAllActions(), this.Cat.zIndex = 11, 
        this.GameDelayeCallFinish(), this.unschedule(this.DogRunAction), this.setImpactState(!1), 
        this.canTouch = !1), "pitfall" == a.node.name && (this.Cat.stopAllActions(), this.Cat.zIndex = 11, 
        //this.GameDelayeCallFinish(), this.unschedule(this.runGamePitfall),this.unschedule(this.runGameTrap),
        this.GameDelayeCallFinish(), this.unschedule(this.runGamePitfall),this.stopRunTrap(), // this.unschedule(this.runTrap),
        this.setImpactState(!1), this.canTouch = !1));
    },
    GameTimeCall: function() {
        this.GameTime++;
        var a, e = this.GameTime, t = "00";
        60 < e ? (a = this.AddZero(e % 60), t = this.AddZero(d(e / 60))) : a = this.AddZero(e), 
        this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("Time").getComponent(cc.Label).string = t + ":" + a;
    },
    AddZero: function(t) {
        return 10 > t ? "0" + t : "" + t;
    },
    timeModeTimeCall: function() {
        this.GameTime -= 1;
        //console.log(this.GameTime,"ttttt")
        if (this.progressBarCall(), 0 < this.GameTime) {
            if (0 == this.GameTime % 20) {
                var a = this.AddZero(this.GameTime / 20);
                this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("Time").getComponent(cc.Label).string = a;
            }
            3 == this.GameTime / 20&& MT.AUDIOMGR.playEffect("clock_ticking");
        } else this.GameDelayeCallFinish(), this.unschedule(this.timeModeTimeCall);
    },
    progressBarCall: function() {
        // this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("progressBox").getChildByName("progressBar").getComponent(cc.Sprite).fillRange = this.GameTime / this.progressTime;
        this.node.getChildByName("backGround_up").getChildByName("content").getChildByName("progressBox").getChildByName("txtClock").getComponent(cc.Label).string = this.GameTime / 10;
        
    },
    createFase: function() {
        this.Cat && (this.Face && (this.Face = null));
        this.Face = cc.instantiate(this._resources[this._Face]);
        //this.Face.getComponent(MT.GLOBAL.CONST_TEXT.FaceJs).setCat(this.Cat.getChildByName("FacePoint")), 
        this.Cat.getParent().getParent().getParent().addChild(this.Face);
        //this.setplayFaseCallTime());
    },
    playFase: function() {
        //this.Face && (this.Face.getComponent(MT.GLOBAL.CONST_TEXT.FaceJs).viisonFace(), 
        //this.scheduleOnce(this.setplayFaseCallTime, .5));
    },
    setplayFaseCallTime: function() {
        var t = r(Math.random() * 4) + 4;
        this.scheduleOnce(this.playFase, t);
    },
    JsonDataTransitionV2: function(a) {
        var e = 0, t = 0;
        return a.x && (e = a.x), a.y && (t = a.y), cc.v2(parseInt(e), parseInt(t));
    },
    JsonDatafloatTurnInt: function(a) {
        var e = 0, t = 0;
        return a.x && (e = a.x), a.y && (t = a.y), cc.v2(parseInt(e), parseInt(t));
    },
    darwGameWell: function() {
        this.canOperate = false;
        var o = .01;
        150 < this.WellArr.length && (o = 1 / this.WellArr.length);
        for (var e, a = r(Math.random() * 2), t = 0; t < this.WellArr.length; t++) {
            e = this.getWell(this.WellArr[t]),
            //console.log(e),
             (e.getComponent(MT.GLOBAL.CONST_TEXT.WellActionJs).setGoalPoint(this.getWellPosition(this.WellArr[t])), 
            1 == a) ? e.position = this.getwellStartingPosition() : 0 == a && 1 == r(Math.random() * 1) && (e.position = this.getwellStartingPosition()), 
            e.getComponent(MT.GLOBAL.CONST_TEXT.WellActionJs).startAction(.2, o * t);
            // var i = 95 * this.col;
            // 650 < i && (this.GameArea.scale = 650 / i,console.log(650/i,"scalessssss")), this.GameArea.addChild(e), this.GameWellArr.push(e);
            this.GameArea.addChild(e), this.GameWellArr.push(e);
        }
        var i = 95 * this.col;
        650 < i && (this.GameArea.scale = 650 / i,this.GameArea.x += (2 / 650 * i));
        
        return this.EffectNum_end = o * this.WellArr.length / .2, this.EffectNum = 0, this.schedule(this.playEffectCall, .2), 
        o * this.WellArr.length;
    },
    playEffectCall: function() {
        this.EffectNum++;
        MT.AUDIOMGR.playEffect("level_creation");
        this.EffectNum >= this.EffectNum_end && this.unschedule(this.playEffectCall);
    },
    darwGameSkating: function() {
        for (var a, t = 0; t < this.skatingArr.length; t++) a = this.getskating(), a.opacity = 0, 
        a.position = cc.v2(95 * this.skatingArr[t].x, 95 * this.skatingArr[t].y), this.GameArea.addChild(a, -10), 
        this.GameSkatArr.push(a);
    },
    getskating: function() {
        return cc.instantiate(this._resources[this._iceBlock]);
    },
    getWell: function(t) {
        return t.start.x == t.end.x ? cc.instantiate(this._resources[this._well_heigth]) : t.start.y == t.end.y ? cc.instantiate(this._resources[this._wall_width]) : void 0;
    },
    getWellPosition: function(a) {
        var e = this.getWellStartingPoint(a);
        return cc.v2(95 * e.x, 95 * e.y);
    },
    getWellStartingPoint: function(t) {
        return t.start.x == t.end.x ? t.start.y > t.end.y ? t.end : t.start : t.start.y == t.end.y ? t.start.x > t.end.x ? t.end : t.start : void 0;
    },
    getwellStartingPosition: function() {
        var a = 2e3;
        1 == r(Math.random() * 1) && (a = -a);
        var n = r(Math.random() * 3300);
        return cc.v2(a, n);
    },
    darwGameCat: function() {
        if (this.Cat = cc.instantiate(this._resources[this._cat]), this.Cat.position = this.getGameCFDPoint(this.CatPoint), 
        this.Cat.group = MT.MazeRecruit_Group.getMazeRecruit_Zoon(), this.Cat.getComponent(MT.GLOBAL.CONST_TEXT.CatJs).Father = this,
        this.Cat.opacity = 0, this.GameArea.addChild(this.Cat), 4 == MT.USER.CustomsSize) {
            var a = 3;
            63 == this.row * this.col ? a = 3 : 130 == this.row * this.col ? a = 2.5 : 252 == this.row * this.col ? a = 2 : 414 == this.row * this.col ? a = 1.5 : 616 == this.row * this.col && (a = 1), 
            this.nigth = cc.instantiate(this._resources[this._night]);
            var e = this.Cat.getParent().scale;
            // this.nigth.scale = this.nigth.scale / .2 / e * a,
            this.nigth.scale = 1/e + 0.2 * 1/e;
            this.Cat.addChild(this.nigth);
            this.nigth.active = false;
            console.log(this.nigth,"night")
            console.log(this.nigth.scale,"scale")
        }
    },
    darwGameFish: function() {
        this.Fish = cc.instantiate(this._resources[this._fish]), this.Fish.position = this.getGameCFDPoint(this.FishPoint), 
        this.Fish.opacity = 0, this.GameArea.addChild(this.Fish);
    },
    getGameCFDPoint: function(t) {
        //console.log(t,"ttttt")
        return cc.v2(95 * t.x + 52, 95 * t.y + 52);
    },
    drawGuanQian: function() {
        this.GuanQian.opacity = 0, this.GuanQian.getChildByName("Num").getComponent(cc.Label).string = MT.USER.GuanNum, 
        this.scheduleOnce(this.visionGuanQian, 1 / 60);
    },
    visionGuanQian: function() {
        this.GuanQian.opacity = 255;
        //var t = this.GuanQian.getChildByName("Num").width / 2;
        console.log(MT.USER.CustomsSize,"模式")
        let str = "";
        switch(MT.USER.CustomsSize){
            case 0:
            str = "普通模式-";
            break;

            case 1:
            str = "限时模式-";
            break;

            case 2:
            str = "狂欢模式-";
            break;

            case 3:
            str = "溜冰模式-";
            break;

            case 4:
            str = "探险模式-";
            break;
            case 5:
            str = "陷阱模式-";
            break;
            default:
            console.log("关卡类型错误")
            break;
        }
        this.GuanQian.getChildByName("Di").getComponent(cc.Label).string = str;
        //this.GuanQian.getChildByName("Di").x = -(t + this.GuanQian.getChildByName("Di").width / 2);
        //this.GuanQian.getChildByName("Guan").x = t + this.GuanQian.getChildByName("Guan").width / 2;
    }

    // update (dt) {},
});
