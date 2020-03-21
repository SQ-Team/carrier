cc.Class({
    extends: cc.Component,

    properties: {
        playerNode: {
            type: cc.Node,
            default: null
        },
        slider: {
            type: cc.Node,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {
        this.animationPlayCount = 1;
    },

    update (dt) {
        let player_pos = this.playerNode.convertToWorldSpaceAR(cc.v2(0, 0)); // 当前目标坐标（0，0）转换到世界坐标
        let node_pos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        if (player_pos.x >= node_pos.x - this.node.width / 4 && this.animationPlayCount) {
            console.log('mission complete');
            window.funcs.missionAchieved();
            this.slider.getComponent('slider').animationPlay('success');
            this.animationPlayCount = 0;
        }
    },


});
