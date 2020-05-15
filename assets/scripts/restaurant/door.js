cc.Class({
    extends: cc.Component,

    properties: {
        canvasNode: {
            type: cc.Node,
            default: null
        }
    },

    onLoad () {
        // 渐显(和下一个场景的 渐隐 组合成过渡效果)
        this.canvasNode.getComponent("fade").fadeFromWhite(.5);
    },

    start () {},

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
        if (window.cfg.mission) {
            console.log(window.cfg.mission);
            this.sceneChange();
        }
    },

    sceneChange() {
        this.canvasNode.zIndex = 100;
        this.canvasNode.getComponent("fade").fadeIntoWhite(window.cfg.currentLevel, .5);
        // cc.director.loadScene(window.cfg.currentLevel);
    }

    // update (dt) {},
});
