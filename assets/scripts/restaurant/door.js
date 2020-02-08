cc.Class({
    extends: cc.Component,

    properties: {

    },

    // onLoad () {},

    start () {},

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
        if (window.cfg.mission) {
            this.sceneChange();
        }
    },

    sceneChange() {
        cc.director.loadScene(window.cfg.currentLevel);
      }

    // update (dt) {},
});
