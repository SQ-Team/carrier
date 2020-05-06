cc.Class({
    extends: cc.Component,

    properties: {
        targetNode: {
            type: cc.Node,
            default: null,
        },
        slider: {
            type: cc.Node,
            default: null
        },
        height: 600 // 弹射高度
    },

    // onLoad () {},

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.name === 'player') {
            const body = otherCollider.node.getComponent(cc.RigidBody);
            // if (!window.cfg.isMute) {
            //     this.audioSource.play();
            // }
            const v = body.linearVelocity; // 获取当前刚体的速度
            v.y += this.height;
            body.linearVelocity = v;
            setTimeout(() => {
                otherCollider.node.active = false;
            }, 1000);
            console.log('hit');
            window.funcs.missionFailed();
            this.slider.getComponent('slider').animationPlay('failed');
        }
        if (otherCollider.node.group != 'obs') {
            setTimeout(() => {
                this.node.active = false;
            }, 1000);
        }
    },

    start () {
        this.playCount = 1;
        this.audioSource = this.node.getComponent(cc.AudioSource);
        // 获取节点上的刚体组件
        this.body = this.getComponent(cc.RigidBody);
    },

    update (dt) {
        let target_pos = this.targetNode.convertToWorldSpaceAR(cc.v2(0, 0));
        let node_pos = this.node.convertToWorldSpaceAR(cc.v2(0, 0)); // 当前目标坐标（0，0）转换到世界坐标
        if (this.playCount && Math.floor(node_pos.x - target_pos.x) < cc.winSize.width * 0.6) {
            if (!window.cfg.isMute) {
                this.audioSource.play();
            }
            this.body.linearVelocity = cc.v2(-700, 0);
            this.playCount--;
        }
    },
});
