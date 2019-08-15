const colorGreen = new cc.color(75,175,80);
const colorWhite = new cc.color(255,255,255);
const colorBlack = new cc.color(30,30,30);
cc.Class({
    extends: cc.Component,
    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        lanternBtnArr:{
            default:[],
            type:cc.Node,
        },
        // lightSpriteFrame:cc.SpriteFrame,
        // blockSpriteFrame:cc.SpriteFrame,
        data:null,
        lockSpr:cc.SpriteFrame,
    },
    // onLoad(){


    // },

    setData(data) {
        //console.log(data,"data");
        this.data = data;
        if(3 == MT.USER.CustomsSize && data.i == 8){
            this.lanternBtnArr[1].active = false;
            this.lanternBtnArr[2].active = false;
            this.lanternBtnArr[3].active = false;
            this.lanternBtnArr.pop();
            this.lanternBtnArr.pop();
            this.lanternBtnArr.pop();
        }

        if(MT.USER.CustomsSize == 2 || MT.USER.CustomsSize == 5){
            for(let i = 0;i != this.lanternBtnArr.length;i ++){
                this.lanternBtnArr[i].getChildByName("imgRoom").getComponent(cc.Sprite).spriteFrame = MT.GLOBAL.houseSp[2];
                this.lanternBtnArr[i].getChildByName("imgLock").getComponent(cc.Sprite).spriteFrame = MT.GLOBAL.houseSp[3];
            }
        }else{
            for(let i = 0;i != this.lanternBtnArr.length;i ++){
                this.lanternBtnArr[i].getChildByName("imgRoom").getComponent(cc.Sprite).spriteFrame = MT.GLOBAL.houseSp[0];
                this.lanternBtnArr[i].getChildByName("imgLock").getComponent(cc.Sprite).spriteFrame = MT.GLOBAL.houseSp[1];
            }
        }

        for(let i = 0;i != this.lanternBtnArr.length;i ++){
            let nowNum = this.data.i + i + 1;
            // this.lanternBtnArr[i].getChildByName("txtLevel").getComponent(cc.Label).string = nowNum <= this.data.a ? nowNum:"";
            this.lanternBtnArr[i].getChildByName("txtLevel").getComponent(cc.Label).string = nowNum;

            //this.lanternBtnArr[i].getChildByName("New Label").color = nowNum < this.data.a ? colorWhite : colorBlack; 
            //this.lanternBtnArr[i].color = nowNum < this.data.a ? colorGreen : colorWhite;
            let randNum = Math.floor(Math.random() * 8);
            this.lanternBtnArr[i].getChildByName("imgLock").getComponent(cc.Sprite).spriteFrame = nowNum <= this.data.a ? MT.GLOBAL.catFace[randNum] : this.lockSpr;
            this.lanternBtnArr[i].getChildByName("imgLock").active = nowNum != this.data.a;

            //console.log(this.lanternBtnArr[i].node.color)
        }

        //this.label.string = `${data}`;
        // let bestStage = cc.mt.user.getBestStage();
        // for(let i = 0;i != this.lanternBtnArr.length;i ++){
        //     if((data.startStage + i) > bestStage){
        //         this.lanternBtnArr[i].spriteFrame = this.blockSpriteFrame;
        //         this.lanternBtnArr[i].node.getChildByName("New Label").active =false;
        //     }else{
        //         this.lanternBtnArr[i].spriteFrame = this.lightSpriteFrame;
        //         this.lanternBtnArr[i].node.getChildByName("New Label").active =true;
        //         this.lanternBtnArr[i].node.getChildByName("New Label").getComponent(cc.Label).string = data.startStage + i + 1;
        //     }
        //     //this.lanternBtnArr[i].spriteFrame = 0;
        // }

    },
    onGotoGameSceneEvent:function(event){
        MT.AUDIOMGR.playEffect("button");
        //var stage = 
        //console.log(event.target.getChildByName("New Label").getComponent(cc.Label).string);
        let a = event.target.getChildByName("txtLevel").getComponent(cc.Label).string;
        //console.log(MT.USER.SUBMODEL,"tttttttttSUBMODEL")
        if(a === "" || Number(a) > this.data.a){
            console.log("还未解锁本关卡");
            return;
        }else{
            a = Number(a);
            if(3 == MT.USER.CustomsSize){
                a = a + MT.USER.SUBMODEL * 9;
            }else{
                a = a + MT.USER.SUBMODEL * 20;
            }
            console.log("当前关卡已解锁:",a);
        }
        var e;
        switch (console.log("____第" + a + "关"), MT.USER.CustomsSize) {
          case 0:
            e = "classic", console.log("读取数据____金典____" + a);
            break;

          case 1:
            e = "time_trial", console.log("读取数据____限时____" + a);
            break;

          case 2:
            e = "enemies", console.log("读取数据____狂欢____" + a);
            break;

          case 3:
            e = "ice_floor", console.log("读取数据____溜冰____" + a);
            break;

          case 4:
            e = "fog", console.log("读取数据____黑夜____" + a);
            break;

          case 5:
            e = "traps", console.log("读取数据____陷阱____" + a);
        }

        3 == MT.USER.CustomsSize ? MT.GLOBAL.iceStageNum < a && (a = MT.GLOBAL.iceStageNum) : MT.GLOBAL.normalStageNum < a && (a = MT.GLOBAL.normalStageNum), 1 > a && (a = 1), 
        MT.USER.GetMap(e, a, this.startGame);


        // let bestStage = cc.mt.user.getBestStage();
        // let currStage = Number(i) + this.data.startStage;
        // if(currStage > bestStage){
        //     // let canvas = cc.find("Canvas");
        //     // cc.mt.notice.showNotice(canvas,cc.mt.constData.noticeConfig.MAXLEVEL_WARNING)
        //     return;
        // }
        // cc.mt.user.setCurrentStage(currStage);
        // MT.GLOBAL.loadScene("gameScene")
    },
    startGame: function() {
        if(MT.GLOBAL.MAP){
            MT.GLOBAL.loadScene("gameScene");
        }
    }

});
