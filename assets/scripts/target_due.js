cc.Class({
    extends: cc.Component,

    properties: {
        playerNode: {
            type: cc.Node,
            default: null
        },
        successNode: {
            type: cc.Node,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.animation = this.successNode.getComponent(cc.Animation);
    },

    start () {
        cc.director.preloadScene('game');
        this.animationPlayCount = 1;
    },

    update (dt) {
        let player_pos = this.playerNode.convertToWorldSpaceAR(cc.v2(0, 0)); // 当前目标坐标（0，0）转换到世界坐标
        let node_pos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        this.successNode.position.x = player_pos.x;
        if (player_pos.x >= node_pos.x - this.node.width / 4 && this.animationPlayCount) {
            this.animation.play('success');
            this.animationPlayCount --;
        }
    },

    sceneChange() {
        console.log('scene change to game');
        cc.director.loadScene('game');
    }
});
