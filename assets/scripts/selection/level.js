cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            type: cc.Label,
            default: null
        }
    },

    // onLoad () {},

    start () {
    },

    setLevel(num) {
        this.label.string = num;
    },

    setSceneByLevel() {
        window.cfg.mission = true;
        // 播放下拉框收回动画
        const animation = this.node.parent.getComponent(cc.Animation);
        animation.play('selection-up');
        // 预加载场景
        window.cfg.currentLevel = `level_${this.label.string}`;
        cc.director.preloadScene(window.cfg.currentLevel);
    }

    // update (dt) {},
});
