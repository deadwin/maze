var waitMgr = {
    initWaitLayer:function(){
      var self = this;
      cc.loader.loadRes("prefabs/waitLayer",cc.Prefab,(err,pfb) =>{
          if(!err){
            this.waitLayer = cc.instantiate(pfb);
          }else{
              console.log(err);
          }
      })  
    },

    showWaitLayer:function(){
        if(!this.waitLayer.position) return;
        this.waitLayer.position = cc.v2(0,0);
        if(this.waitLayer.parent){
            this.hideWaitLayer();
        }

        this.runAni();
        cc.find("Canvas").addChild(this.waitLayer);
    },
    hideWaitLayer:function(){
        this.stopAni();
        this.waitLayer.removeFromParent();
    },
    runAni(){
        this.waitLayer.getChildByName("loading").stopAllActions();
        this.waitLayer.getChildByName("loading").runAction(cc.repeatForever(cc.rotateBy(1,-720)));
    },
    stopAni(){
        this.waitLayer.getChildByName("loading").stopAllActions();
    },
    

};

module.exports = waitMgr;