// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
import ListView, {AbsAdapter} from "./friendList/FriendListView";

const ListAdapter = require('./friendList/FriendListAdapter');
class InviteUser {
    m_openId = "";
    m_name = "";
    m_icon = "";
    m_isDraw = false;
    m_shareType = 0;

    /**
     *
     */
    constructor(_openId, _name, _icon, isDraw, _shareType) {
        this.m_openId = _openId;
        this.m_name = _name;
        this.m_icon = _icon;
        this.m_isDraw = isDraw;
        this.m_shareType = _shareType;
    }
}
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
        inviteItem:cc.Prefab,
        content:cc.Node,
        // btn_receive:cc.SpriteFrame,
        // btn_receive02:cc.SpriteFrame,
        m_sendFriendQueryTime:0,
        listView:ListView,

    },

    // LIFE-CYCLE CALLBACKS:

    openInviteFriend() {
        // this.initData();
        // this.setVisible();
        if (Date.now() - this.m_sendFriendQueryTime <= 60000) {
            //UIManager.get_inst().show(UI_CONFIG.InviteUI);
            this.setVisible();
            return;
        }
        HttpServer.invitePlayerQuery(10, (res) => {
            
            this.m_sendFriendQueryTime = Date.now();
            MT.GLOBAL.inviteUser = [];
            console.log("openInviteFriend success", res.inviteUser);
            let _invite = res.inviteUser;
            if (!_invite || _invite.length == 0) {
                this.setVisible();
                this.initData();

                //UIManager.get_inst().show(UI_CONFIG.InviteUI);
                return;
            }
            // _invite = JSON.parse(_invite);
            for (let i = 0; i < _invite.length; i++) {
                let _ip = new InviteUser(_invite[i].openid, _invite[i].name, _invite[i].iconUrl, _invite[i].isDraw, _invite[i].shareType);
                MT.GLOBAL.inviteUser.push(_ip);
            }
            this.setVisible();
            this.initData();

            //UIManager.get_inst().show(UI_CONFIG.InviteUI);
        })
    },

    onLoad () {
        this.onBtnClose();
        // for(let i = 0;i != 5;i ++){
        //     let item = cc.instantiate(this.inviteItem);
        //     item.getComponent("inviteItem").updateIndex(i);
        //     this.content.addChild(item);
        // }
        // setTimeout(() => {
        //     this.content.parent.parent.getComponent(cc.ScrollView).scrollToLeft();
        // }, 0);
    },
    initData:function(){
        // let _ip = new InviteUser("", "赵建", "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIU1EtHwwlF2ANJI7arllD6XBic2djhTRDYjdsyr2Re2uxuf3WPNje496alS1fewY8eRKZTnB1po6w/132", false, 10)
        // MT.GLOBAL.inviteUser.push(_ip);

        // let _ip2 = new InviteUser("", "赵建", "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIU1EtHwwlF2ANJI7arllD6XBic2djhTRDYjdsyr2Re2uxuf3WPNje496alS1fewY8eRKZTnB1po6w/132", true, 10)
        // MT.GLOBAL.inviteUser.push(_ip2);
        let adapter = new ListAdapter();

        // let data = [];
        // for(let i = 0;i < this.e;i +=4){
        //     let tab = [];
        //     tab.a = this.a;
        //     tab.i = i;
        //     data.push(tab);
        // }
        
        let data = [];

        for(let i = 0;i < 100;i ++){
            let tab = {};
            tab.i = i;
            if(MT.GLOBAL.inviteUser[i]){
                tab.data = MT.GLOBAL.inviteUser[i];

            }else{
                tab.data = null;
            }
            data.push(tab);
        }
        //console.log(data,"data")
        adapter.setDataSet(data);
        this.listView.setAdapter(adapter);



        // for(let i = this.content.children.length;i < MT.GLOBAL.inviteUser.length + 5;i ++){
        //     let item = cc.instantiate(this.inviteItem);
        //     item.getComponent("inviteItem").updateIndex(i);
        //     this.content.addChild(item);
        // }


        // for(let i = 0;i < this.content.children.length;i ++){
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
        // this.content.children[0].getComponent("inviteItem").onDrawSuccess();
    },
    start () {
    },
    onShow:function(){
        this.openInviteFriend();
        // this.node.active = true;

    },
    setVisible:function(){
        this.node.active = true;
    },
    onBtnClose:function(){
        this.node.active = false;
    },


    // update (dt) {},
});
