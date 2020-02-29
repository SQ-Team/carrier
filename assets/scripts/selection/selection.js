cc.Class({
    extends: cc.Component,

    properties: {
        levelPrefab: {
            type: cc.Prefab,
            default: null
        }
    },

    // onLoad () {},

    start () {
        const defaultPosition = {
            x: -300,
            y: 50
        };
        // 生成level button
        for (var i=1;i<=window.cfg.levelNum;i++) {
            const newLevel = cc.instantiate(this.levelPrefab);
            newLevel.parent = this.node;
            newLevel.setPosition(defaultPosition.x, defaultPosition.y);
            const script = newLevel.getComponent('level');
            script.setLevel(i);
            defaultPosition.x += 60;
            if (defaultPosition.x >= 300) {
                defaultPosition.y -= 60;
                defaultPosition.x = -300;
            }
        }
    },

    // update (dt) {},
});
