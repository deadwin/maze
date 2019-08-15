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
    extends: cc.Component,

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
        txtIndex:cc.Label,
        btn_receive:cc.Node,
        userIcon:cc.Sprite,
        btnInvite:cc.Button,
        btn_receive_sp:cc.SpriteFrame,
        btn_receive_sp02:cc.SpriteFrame,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },


        //     for(let i = 0;i < this.content.children.length;i ++){
        //     if(MT.GLOBAL.inviteUser[i]){
        //         this.content.children[i].getComponent("inviteItem").setData(MT.GLOBAL.inviteUser[i]);
        //         if (MT.GLOBAL.inviteUser[i].m_isDraw) {
        //             this.content.children[i].getComponent("inviteItem").btn_receive.getComponent(cc.Sprite).spriteFrame = this.btn_receive;
        //             this.content.children[i].getComponent("inviteItem").btn_receive.getComponent(cc.Button).interactable = false;
        //         }else{
        //             this.content.children[i].getComponent("inviteItem").btn_receive.getComponent(cc.Sprite).spriteFrame = this.btn_receive02;
        //             this.content.children[i].getComponent("inviteItem").btn_receive.getComponent(cc.Button).interactable = true;
        //         }
        //     }else{
        //         this.content.children[i].getComponent("inviteItem").setData(null);
        //     }
        // }


    setData(data){
        this.m_data = data.data;
        //let _name = this.m_data.m_name;
        // if (_name.length > 4) {
        //     _name = _name.substr(0, 4);
        // }
        //console.log(data,"data")
        this.updateIndex(data.i);
        if(this.m_data == null){
            this.btn_receive.active = false;
            this.btnInvite.interactable = true;
            this.userIcon.node.parent.active = false;
        }else{
            this.btn_receive.active = true;
            if(this.m_data.m_isDraw){
                this.btn_receive.getComponent(cc.Sprite).spriteFrame = this.btn_receive_sp;
                this.btn_receive.getComponent(cc.Button).interactable = false;
            }else{
                this.btn_receive.getComponent(cc.Sprite).spriteFrame = this.btn_receive_sp02;
                this.btn_receive.getComponent(cc.Button).interactable = true;
            }
            cc.loader.load({
                url: this.m_data.m_icon,
                type: 'png'
            }, (err, texture) => {
                if (err) console.error(err);
                this.userIcon.spriteFrame = new cc.SpriteFrame(texture);
                this.userIcon.node.parent.active = true;
            });
            this.btnInvite.interactable = false;
        }
    },
    updateIndex(i){
        this.index = Number(i);
        this.txtIndex.string = Number(i) + 1;
    },
    onBtnInvite:function(){
        MT.AUDIOMGR.playEffect("button");

        let randNum = Math.floor(Math.random() * MT.GLOBAL.constData.self_app.shareImgs.length);
        MT.WXHELPER.share(MT.GLOBAL.constData.self_app.name, MT.GLOBAL.constData.self_app.shareImgs[randNum],"",function(){
            console.log("login--onBtnShare",MT.GLOBAL.constData.self_app.name,MT.GLOBAL.constData.self_app.shareImgs[randNum])
        })
    },
    onBtnGet:function(){
        this.btn_receive.getComponent(cc.Button).interactable = false;
        MT.AUDIOMGR.playEffect("button");
        HttpServer.updateFriendDraw(this.m_data.m_openId,() =>{
            this.onDrawSuccess();
        });
    },
    onDrawSuccess:function(){
        MT.USER.DriedFishNum += MT.GLOBAL.FRIEND_SHARE_REWARD_NUM;
        MT.USER.setSave_DriedFishNum();
        let m_data;
        m_data.data = null;
        m_data.i = this.index;
        MT.GLOBAL.inviteUser.every((val, index, array) => {
            if (index == this.index) {
                MT.GLOBAL.inviteUser[index].m_isDraw = true;

                m_data.data = MT.GLOBAL.inviteUser[index];

                return false;
            }
            return true;
        })
        cc.loader.loadRes("prefabs/tipLayer",cc.Prefab,function(err,pre){
            if(!err){
                let tipLayer = cc.instantiate(pre);
                cc.find("Canvas").addChild(tipLayer);
                tipLayer.getChildByName("FishTwinkle").runAction(cc.blink(1.5,3));
                tipLayer.getChildByName("btn_Sure").on("click",function(){
                    tipLayer.removeFromParent();
                },tipLayer)

            }
        })
        this.setData(m_data);
        if(this.m_data.m_isDraw) {
            this.btn_receive.getComponent(cc.Button).interactable = !this.m_data.m_isDraw;
            cc.loader.loadRes("image/textures/invite/btn_receive",cc.SpriteFrame,(err,res) =>{
                if(!err){
                    this.btn_receive.getComponent(cc.Sprite).spriteFrame = res;
                }
            })
        }
    },
    // update (dt) {},
});
