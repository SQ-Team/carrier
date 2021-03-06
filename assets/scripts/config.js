window.cfg = {
    time: '', // 显示的时间
    gameInit: false, // 游戏开始界面是否被点击
    directionMap: { LEFT: -1, RIGHT: 1, NONE: 0 }, // 玩家移动方向
    mission: false, // 是否获得任务
    missionCompleted: false, // 任务是否已经完成
    gameIsOver: false, // 游戏是否已经结束（无论成功）
    levelNum: 2,
    currentLevel: '',
    isMute: false
};
window.funcs = {
    missionFailed() {
        window.cfg.missionCompleted = false;
        window.cfg.gameIsOver = true;
    },
    missionAchieved() {
        window.cfg.missionCompleted = true;
        window.cfg.gameIsOver = true;
    },
    levelInit() {
        // 初始化时，gameInit的值需要保留
        const newCfg  = {
            time: '', // 显示的时间
            directionMap: { LEFT: -1, RIGHT: 1, NONE: 0 }, // 玩家移动方向
            mission: false, // 是否获得任务
            missionCompleted: false, // 任务是否已经完成
            gameIsOver: false, // 游戏是否已经结束（无论成功）
            levelNum: 2,
            currentLevel: ''
        };
        Object.assign(window.cfg, newCfg);
    }
}
