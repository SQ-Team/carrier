cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            type: cc.Label,
            default: null
        },
        canvasNode: {
            type: cc.Node,
            default: null
        }
    },

    onLoad () {
        this.animation = this.node.getComponent(cc.Animation);
    },

    start () {
        this.animationPlayCount = 1;
    },

    update (dt) {
    },
    sceneChange() {
        console.log('scene change to game');
        // cc.director.loadScene('game');
        this.canvasNode.getComponent("fade").fadeIntoWhite('game', .5);
    }
});
