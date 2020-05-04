cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.audioSource = this.node.getComponent(cc.AudioSource);
    },

    update (dt) {
        if (window.cfg.isMute) {
            this.audioSource.mute = true;
        } else {
            this.audioSource.mute = false;
        }
    },
});
