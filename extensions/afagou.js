// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
        rotationNode:cc.Node,
        txtProgress:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.txtProgress.string = "0%"
        this._super();
    },


    preloadPrefabs:function(){

    },
    onResourceLoaded: function(currentCount,totalCount) {
        //console.log(currentCount,totalCount,"总数");
        this.txtProgress.string = (currentCount / totalCount * 100 / 2).toFixed(0) + "%";
        if(currentCount == totalCount){
            this.preloadScene();
        }

    },

    initView:function(){
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


    preloadScene:function(){
        cc.director.preloadScene("selectionScene",(completedCount,totalCount) =>{
        },(error) =>{
            if(!error){
                this.loading();
            }
        });
    },

    loading(){
        this.txtProgress.string = "50%";
        cc.director.preloadScene("loginScene",(completedCount, totalCount, item) =>{
            //console.log(completedCount,totalCount,item);
            this.txtProgress.string = (completedCount / totalCount * 100 / 2 + 50).toFixed(0) + "%";
        },(error) =>{
            if(!error){
                setTimeout(() => {
                    cc.director.loadScene("loginScene");
                }, 300);

            }else{
                console.log("加载失败",error)
                this.loading();
            }
        })
    },
    start () {
        this.rotationNode.runAction(cc.repeatForever(cc.rotateBy(2,360)));
    },

    // update (dt) {},
});
