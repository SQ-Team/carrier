cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (window.cfg.gameInit) {
            this.node.setPosition(0, 0);
        } else {
            this.node.setPosition(0, 640);
        }
        this.animation = this.node.getComponent(cc.Animation);
    },

    gameStart() {
        console.log('game start');
        window.cfg.gameInit = true;
        this.animation.play('game_start');
    },

    start () {

    },

    // update (dt) {},
});
