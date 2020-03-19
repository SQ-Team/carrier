cc.Class({
    extends: cc.Component,

    properties: {
        targetNode: {
            type: cc.Node,
            default: null,
        },
        playCount: 1
    },

    onLoad () {
        this.node.active = true;
        console.log('flower onload')
    },

    start () {
        // 获取节点上的刚体组件
        this.body = this.getComponent(cc.RigidBody);
        console.log('flower start');
    },

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
        console.log('crash');
        setTimeout(() => {
            this.node.active = false;
        }, 1000)
    },

    update (dt) {
        let target_pos = this.targetNode.convertToWorldSpaceAR(cc.v2(0, 0));
        let floor_pos = this.node.convertToWorldSpaceAR(cc.v2(0, 0)); // 当前目标坐标（0，0）转换到世界坐标
        // console.log(target_pos, floor_pos);
        if (target_pos.x >= floor_pos.x - this.node.width && this.playCount) {
            this.body.type = cc.RigidBodyType.Dynamic;
            this.body.linearVelocity = cc.v2(0, -500);
        }
    },
});
