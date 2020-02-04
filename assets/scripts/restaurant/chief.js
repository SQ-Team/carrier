cc.Class({
    extends: cc.Component,

    properties: {
        npcNode: {
            type: cc.Node,
            default: null
        },
        labelNode: {
          type: cc.Node,
          default: null
        }
    },

    // onLoad () {},

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
        if (!this.labelNode.active){
            this.labelNode.active = true;
            this.npcNode.active = true;
            window.cfg.mission = true;
        }
        console.log(this.labelNode.active);
    },

    start () {

    },

    // update (dt) {},
});
