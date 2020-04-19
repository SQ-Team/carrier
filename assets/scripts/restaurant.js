cc.Class({
  extends: cc.Component,

  properties: {
    targetNode: {
        type: cc.Node,
        default: null,
    },
    selectNode: {
        type: cc.Node,
        default: null
    }
  },

    onLoad () {
        this.selectionPlayCount = 1;
        this.animation = this.selectNode.getComponent(cc.Animation); // 下拉框动画
    },

    start () {
        this.initConfig();
    },

    initConfig() {
        window.cfg.mission = false;
        window.cfg.currentLevel = '';
    },

    update (dt) {
        let player_pos = this.targetNode.convertToWorldSpaceAR(cc.v2(0, 0)); // 当前目标坐标（0，0）转换到世界坐标
        let restaurant_pos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        // console.log(Math.floor(player_pos.x), Math.floor(restaurant_pos.x), this.node.width);
        // console.log(Math.floor(player_pos.x) >= Math.floor(restaurant_pos.x) - this.node.width / 2 && Math.floor(player_pos.x) <= Math.floor(restaurant_pos.x) + this.node.width / 2);
        if (this.selectionPlayCount && Math.floor(player_pos.x) >= Math.floor(restaurant_pos.x) - this.node.width / 2 && Math.floor(player_pos.x) <= Math.floor(restaurant_pos.x) + this.node.width / 2) {
            this.selectLevel();
            this.selectionPlayCount--;
        }
    },

    selectLevel() {
        if (!window.cfg.mission){
            // 弹出下拉框选择关卡
            this.animation.play('selection-down');
        }
    },

});
