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
        this.jumpCount = 1;
        // 获取节点上的刚体组件
        this.body = this.getComponent(cc.RigidBody);
        this.animation = this.node.getComponent(cc.Animation);
        this.audioSource = this.node.getComponent(cc.AudioSource);
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

    // 只在两个碰撞体开始接触时被调用一次
  onBeginContact(contact, selfCollider, otherCollider) {
    console.log('play_ctrl: ', otherCollider.node.group);
  if (otherCollider.node.group === 'obs') {
      this.jumpCount = 1;
  }
  },

  onPlayerJump() {
    let v = this.body.linearVelocity; // 获取当前刚体的速度
    if (this.jumpCount) {
        if (!window.cfg.isMute) {
            this.audioSource.play();
        }
        v.y += 300;
        this.jumpCount --;
    }
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

    onDestroy() {
        this.unSubscribeEvent();
    },

  onPlayerWalk() {
    let v = this.body.linearVelocity; // 获取当前刚体的速度
    v.x = 200 * this.direction;
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
                this.animation.play('walk');
                this.playCount--;
            }
            if (this.canWalk) {
                this.onPlayerWalk(this.direction);
            }
        }
  },
});
