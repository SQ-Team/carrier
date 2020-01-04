const directionMap = window.cfg.directionMap;

cc.Class({
    extends: cc.Component,

    properties: {
        // 要跟随的目标
        targetNode: {
            type: cc.Node,
            default: null,
        },
        mapNode: {
            type: cc.Node,
            default: null
        },
        up_time: 1,
        camera_move: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {
        this.end_time = 0;
    },

    moveCamera(direction, player_pos, camera_pos) {
        switch(direction) {
            case directionMap.LEFT:

                break;
            case directionMap.RIGHT:
                if (Math.floor(player_pos.x) >= Math.floor(camera_pos.x) && camera_pos.x <= this.mapNode.width) {
                    this.cameraMoveAction(player_pos);
                }
                break;
            default:
                break;
        }
    },

    cameraMoveAction(player_pos) {
        var pos = this.node.parent.convertToNodeSpaceAR(player_pos); // 再转为camera父节点的坐标
        this.node.x = pos.x;
    },

    update (dt) {
        this.end_time += dt;
        let direction = this.targetNode.getComponent('player_ctrl').direction;
        let player_pos = this.targetNode.convertToWorldSpaceAR(cc.v2(0, 0)); // 当前目标坐标（0，0）转换到世界坐标
        let camera_pos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        const winSize = cc.winSize; // 游戏窗口大小
        if (this.end_time >= this.up_time) {
            this.end_time = 0;
            console.log('player_pos.x: ', Math.floor(player_pos.x));
            console.log('camera.x: ', Math.floor(camera_pos.x));
            console.log('mapNode: ', this.mapNode.width);
            console.log('winSize: ', winSize);
            console.log('direction: ', direction);
        }
        this.moveCamera(direction, player_pos, camera_pos);
    },
});
