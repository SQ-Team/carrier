cc.Class({
    extends: cc.Component,

    properties: {
        npcNode: {
            type: cc.Node,
            default: null
        },
        selectNode: {
            type: cc.Node,
            default: null
        }
    },

    onLoad () {
        this.animation = this.selectNode.getComponent(cc.Animation); // 下拉框动画
    },

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
        if (!window.cfg.mission){
            // 弹出下拉框选择关卡
            this.animation.play('selection-down');
            this.npcNode.active = true;
            window.cfg.mission = true;
        }
    },

    start () {
        this.npcNode.active = false;
    },

    // update (dt) {},
});
