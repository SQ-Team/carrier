cc.Class({
    extends: cc.Component,

    properties: {
        height: 600 // 弹射高度
    },

    // onLoad () {},

    start () {
        this.audioSource = this.node.getComponent(cc.AudioSource);
    },

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.name === 'player') {
            const body = otherCollider.node.getComponent(cc.RigidBody);
            console.log(otherCollider.node);
            if (!window.cfg.isMute) {
                this.audioSource.play();
            }
            const v = body.linearVelocity; // 获取当前刚体的速度
            v.y += this.height;
            body.linearVelocity = v;
        }
    },

    // update (dt) {},
});
