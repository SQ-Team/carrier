const directionMap = window.cfg.directionMap;

cc.Class({
  extends: cc.Component,

  properties: {
    targetNode: {
      type: cc.Node,
      default: null,
    },
    direction: directionMap.LEFT, // 方向
    playCount: 1,
    canWalk: true
  },
  // onLoad () {},

    start () {
        // 获取节点上的刚体组件
        this.body = this.getComponent(cc.RigidBody);
    },

    subscribeEvent() {
        // 监听事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this), this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp.bind(this), this);
    },

    unSubscribeEvent() {
        // 监听事件
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this), this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp.bind(this), this);
    },

  onPlayerJump() {
    let v = this.body.linearVelocity; // 获取当前刚体的速度
    v.y += 300;
    this.body.linearVelocity = v;
  },

  onKeyDown(e) {
    switch(e.keyCode) {
    case cc.macro.KEY.up:
    case cc.macro.KEY.space:
      this.onPlayerJump();
      break;
    default:
      break;
    }
  },

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
        this.body.linearVelocity = cc.v2(0, 0);
        // this.canWalk = false;
        this.unSubscribeEvent();
    },

  onPlayerWalk() {
    let v = this.body.linearVelocity; // 获取当前刚体的速度
    v.x = 100 * this.direction;
    this.body.linearVelocity = v;
    this.node.scaleX =  this.direction;
  },

  onKeyUp(e) {
    switch(e.keyCode) {
    case cc.macro.KEY.up:
    case cc.macro.KEY.space:
    case cc.macro.KEY.left:
    case cc.macro.KEY.right:
    default:
      break;
    }
  },

    update (dt) {
        let npc_pos = this.node.convertToWorldSpaceAR(cc.v2(0, 0)); // 当前目标坐标（0，0）转换到世界坐标
        let camera_pos = this.targetNode.convertToWorldSpaceAR(cc.v2(0, 0));
        if (camera_pos.x + cc.winSize.width / 2 >= npc_pos.x - this.node.width) {
            if (this.playCount) {
                this.subscribeEvent();
                this.playCount--;
            }
            if (this.canWalk) {
                this.onPlayerWalk(this.direction);
            }
        }
  },
});
