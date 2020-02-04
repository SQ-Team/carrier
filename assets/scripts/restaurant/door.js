cc.Class({
    extends: cc.Component,

    properties: {

    },

    // onLoad () {},

    start () {
        cc.director.preloadScene('road');
    },

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
        if (window.cfg.mission) {
            this.sceneChange();
        }
    },

    sceneChange() {
        console.log('scene change to road');
        cc.director.loadScene('road');
      }

    // update (dt) {},
});
