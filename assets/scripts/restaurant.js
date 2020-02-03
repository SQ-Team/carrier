cc.Class({
  extends: cc.Component,

  properties: {
    targetNode: {
      type: cc.Node,
      default: null,
    },
  },

  // onLoad () {},

  start () {
    cc.director.preloadScene('restaurant');
    console.log(this.node);
  },

  update (dt) {
    let player_pos = this.targetNode.convertToWorldSpaceAR(cc.v2(0, 0)); // 当前目标坐标（0，0）转换到世界坐标
    let restaurant_pos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
    if (Math.floor(player_pos.x) >= Math.floor(restaurant_pos.x) - this.node.width / 4) this.sceneChange();
  },

  sceneChange() {
    console.log('scene change to restaurant');
    cc.director.loadScene('restaurant');
  }

});
