cc.Class({
    extends: cc.Component,

    properties: {
        headBar: {
            type: cc.Node,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log('gameInit: ', window.cfg.gameInit);
        window.funcs.levelInit();
        console.log('gameInit: ', window.cfg.gameInit);
        if (window.cfg.gameInit) {
            this.node.setPosition(0, 0);
            this.headBar.setPosition(0, 240, 0);
        } else {
            this.node.setPosition(0, 640);
            this.headBar.setPosition(0, 900, 0);
        }
        this.animation = this.node.getComponent(cc.Animation);
    },

    gameStart() {
        this.headBar.active = false;
        console.log('game start');
        window.cfg.gameInit = true;
        this.animation.play('game_start');
        setTimeout(() => {
            this.headBar.setPosition(0, 240, 0);
            this.headBar.active = true;
        }, 1000)
    },

    start () {

    },

    // update (dt) {},
});
