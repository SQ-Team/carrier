cc.Class({
    extends: cc.Component,

    properties: {

    },

    // onLoad () {},

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
        setTimeout(() => {
            this.node.active = false;
        }, 2000);
    },

    start () {
    },

    update (dt) {
    },
});
