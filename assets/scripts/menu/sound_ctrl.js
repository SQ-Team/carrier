cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.sound_on = this.node.getChildByName('sound_on');
        if (window.cfg.isMute) {
            this.sound_on.active = false;
        } else {
            this.sound_on.active = true;
        }
    },

    muteChange() {
        window.cfg.isMute = !window.cfg.isMute;
        if (window.cfg.isMute) {
            this.sound_on.active = false;
        } else {
            this.sound_on.active = true;
        }
    },

    update (dt) {
    },

});
