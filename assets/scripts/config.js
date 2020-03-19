window.cfg = {
    time: '', // 显示的时间
    gameInit: false, // 游戏开始界面是否被点击
    directionMap: { LEFT: -1, RIGHT: 1, NONE: 0 }, // 玩家移动方向
    mission: false, // 是否获得任务
    missionCompleted: false, // 任务是否已经完成
    gameIsOver: false, // 游戏是否已经结束（无论成功）
    levelNum: 5,
    currentLevel: ''
};
window.funcs = {
    missionFailed() {
        window.cfg.missionCompleted = false;
        window.cfg.gameIsOver = true;
    },
    levelInit() {
        window.cfg = {
            time: '', // 显示的时间
            directionMap: { LEFT: -1, RIGHT: 1, NONE: 0 }, // 玩家移动方向
            mission: false, // 是否获得任务
            missionCompleted: false, // 任务是否已经完成
            gameIsOver: false, // 游戏是否已经结束（无论成功）
            levelNum: 5,
            currentLevel: ''
        };
    }
}
