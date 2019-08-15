var GLOBAL = {
    loadScene:function(sceneName){
        WAITMGR.showWaitLayer();
        cc.director.preloadScene(sceneName,(completedCount, totalCount, item) =>{
            //console.log(completedCount,totalCount,item);
        },(error) =>{
            if(!error){
                WAITMGR.hideWaitLayer();
                cc.director.loadScene(sceneName);
            }else{
                console.log("加载失败",error)
            }
        })
    },
};

GLOBAL.constData = {
    app_id:"wx0f9d8c3d1a08e446",
    app_config : "https://appicon-1254192987.file.myqcloud.com/mazeCat.json",
    self_app : {},

    otherApps: [],
};

GLOBAL.catFace = [];
GLOBAL.houseSp = [];
GLOBAL.playerInfo = {};
GLOBAL.firstLogin = false;
GLOBAL.inviteUser = []; //好友邀请信息
GLOBAL.FRIEND_SHARE_REWARD_NUM = 2;
GLOBAL.gameGongGao = null;
GLOBAL.MAP = null;



// GLOBAL.constData.self_app = {
//     "appid": "wx0f9d8c3d1a08e446",
// 	"icon": "https://appicon-1254192987.file.myqcloud.com/xiaoguaishou.png",
// 	"name": "皮蛋历险记",
// 	"kefuma": "https://appicon-1254192987.file.myqcloud.com/xgskefuma.png",
// 	"shareImg": "https://appicon-1254192987.file.myqcloud.com/xgsShare.jpg",
// 	"showShare": false,
// },

GLOBAL.constData.CONST_WORDS ={
    hdzy:"回到主页 >>",
    model0:"普通模式",
    model1:"限时模式",
    model2:"狂欢模式",
    model3:"溜冰模式",
    model4:"探险模式",
    model5:"陷阱模式",
},
GLOBAL.tokenValidTime = 36000;

GLOBAL.TIPMESSAGE = {
    sjyc:"时间成功增加",
    limitTip:"提示次数已达上限!",
    noTrap:"陷阱已全部清除",
    trapRemove:"消除一个陷阱成功",
    noDog:"怪物已全部清除",
    dogRemove:"消除一个怪物成功",
}




GLOBAL.CONST_TEXT = {
    GuanButtonJs: "MazeRecruit_GuanButtonJs",
    GuanScrollVieJs: "MazeRecruit_GuanScrollVieJs",
    GameOverJs: "gameOver",
    initGameJs: "MazeRecruit_InitGameJs",
    WellActionJs: "wallAction",
    GameOverJS: "gameOver",
    FootPrintJs: "footPrint",
    PauseJs: "pause",
    HintJs: "hint",
    CatJs: "hero",
    FishJs: "goal",
    DogJs: "monster",
    GameOneHelpJs: "MazeRecruit_GameOneHelpJs",
    BuyTheSkinJs: "MazeRecruit_BuyTheSkinJs",
    GetMoreStar: "getMoreStar",
    DiredFish: "addHint",
    FaceJs: "face",
    Cat_Skin: "MazeRecruit_Cat_Skin",
    VideoAndShare: "video_and_share",
    ComPer: "MazeRecruit_common_mode",
    TimePer: "MazeRecruit_time_mode",
    DogPer: "MazeRecruit_dog_mode",
    SkatPer: "MazeRecruit_skating_mode",
    NightPer: "MazeRecruit_night_mode",
    TrapPer: "MazeRecruit_trap_mode",
    SkinArr: "MazeRecruit_skin",
    DriedFishNum: "MazeRecruit_dried_fishNum",
    DriedGteVideoTime: "MazeRecruit__driedGteVideoTime",
    DriedGetShareTime: "MazeRecruit__driedGetShareTime",
    DriedGetTime: "MazeRecruit__driedGetTime",
}
GLOBAL.GAME_SETTING = {
    Props_Base_Gold: 800,
    Key_OncePlayerTime: "begingGameTime",
    Key_OncePlayerTimeDay: "begingGameTimeDay",
    Key_NewPlayer: "isNewPlayer",
    Key_Gold: "Key_Gold",
    Key_Music: "Key_BgMusic",
    Key_Sound: "Key_Sound",
    _SceneScale: 1,
    _offsetX: 0,
    _offsetY: 0,
    Language_ch: !0
},
GLOBAL.normalStageNum = 100;
GLOBAL.iceStageNum = 45;
GLOBAL.trapFreshTime = 8;
GLOBAL.REWARD_NUM = 1,
GLOBAL.PRICE = 1;

GLOBAL.appraise = [
    "真棒",
    "完美",
    "优秀",
    "太厉害了",
];
module.exports = GLOBAL;