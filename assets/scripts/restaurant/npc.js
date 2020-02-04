cc.Class({
    extends: cc.Component,

    properties: {
        targetNode: {
            type: cc.Node,
            default: null,
        },
        labelNode: {
            type: cc.Node,
            default: null
        },
        playCount: 1
    },

    onLoad () {
        this.animation = this.node.getComponent(cc.Animation);
    },

    start () {
        // 获取节点上的刚体组件
        this.body = this.getComponent(cc.RigidBody);
    },

    onNpcWalk() {
        let v = this.body.linearVelocity; // 获取当前刚体的速度
        v.x = 700;
        this.body.linearVelocity = v;
        this.node.scaleX =  1;
      },

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
        console.log('contact: ', contact);
        console.log('selfCollider: ', selfCollider);
        console.log('otherCollider: ', otherCollider);
    },

    update (dt) {
        let target_pos = this.targetNode.convertToWorldSpaceAR(cc.v2(0, 0));
        let npc_pos = this.node.convertToWorldSpaceAR(cc.v2(0, 0)); // 当前目标坐标（0，0）转换到世界坐标
        if (window.cfg.mission && (target_pos.sub(npc_pos).mag() <= cc.winSize.width / 2) && this.playCount) {
           this.onNpcWalk();
            this.playCount--;
        }
    },
});
