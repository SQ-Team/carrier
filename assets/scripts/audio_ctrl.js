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
        if (!window.cfg.isMute) {
            this.audioSource.mute = false;
            if (!this.audioSource.isPlaying) {
                this.audioSource.play();
            }
        }
        if (window.cfg.isMute) {
            this.audioSource.mute = true;
            this.audioSource.stop();
        }
        // if (!window.cfg.isMute && !this.audioSource.isPlaying) {
        //     this.audioSource.mute = false;
        //     this.audioSource.play();
        // } else {
        //     this.audioSource.mute = true;
        //     this.audioSource.stop();
        // }
    },
});
