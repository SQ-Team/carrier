cc.Class({
    extends: cc.Component,

    properties: {
        labelNode: {
          type: cc.Node,
          default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
      console.log('chief contact');

      this.labelNode.active = true;
      console.log(this.labelNode.active);
    },

    start () {

    },

    // update (dt) {},
});
