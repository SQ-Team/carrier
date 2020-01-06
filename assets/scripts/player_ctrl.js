const directionMap = window.cfg.directionMap;

cc.Class({
  extends: cc.Component,

  properties: {
    direction: 0, // 方向
  },
  // onLoad () {},

  start () {
    this.direction = directionMap.NONE;
    // 获取节点上的刚体组件
    this.body = this.getComponent(cc.RigidBody);
    // 监听事件
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this), this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp.bind(this), this);
  },

  onPlayerJump() {
    console.log('player jump');
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
      case cc.macro.KEY.left:
        this.direction = directionMap.LEFT;
        break;
      case cc.macro.KEY.right:
        this.direction = directionMap.RIGHT;
        break;
      default:
        break;
    }
  },

  onPlayerWalk(dir) {
    let v = this.body.linearVelocity; // 获取当前刚体的速度
    v.x = 100 * dir;
    this.body.linearVelocity = v;
    this.node.scaleX =  dir ? dir : 1;
  },

  onKeyUp(e) {
    switch(e.keyCode) {
      case cc.macro.KEY.up:
      case cc.macro.KEY.space:
      case cc.macro.KEY.left:
      case cc.macro.KEY.right:
      default:
        this.direction = directionMap.NONE;
        break;
    }
  },

  update (dt) {
    if (this.direction !== directionMap.NONE) {
      this.onPlayerWalk(this.direction);
    }
  },
});
