cc.Class({
    extends: cc.Component,

    properties: {
        content: {
            type: cc.Label,
            default: null
        },
        backToCur: {
            type: cc.Node,
            default: null
        }
    },


    onLoad () {
    },

    start () {
        cc.director.preloadScene('game');
        this.animationPlayCount = 1;
        this.resultMap = {
            success: {
                string: '外卖配送成功'
            },
            failed: {
                string: '外卖配送失败'
            },
            default: {
                string: '您想要干什么'
            }
        }
        this.animation = this.node.getComponent(cc.Animation);
    },

    // 设置label内容
    setContent(content = '') {
        this.content.string = content;
    },

    // 播放下降动画
     animationPlay(type) {
         if (typeof type !== 'string') {
             type = 'default';
         }
         if (this.animationPlayCount) {
             console.log(type);
             console.log(this.resultMap);
             console.log(this.resultMap[type].string);
             this.setContent(this.resultMap[type].string);
             console.log(this.content.string);
             this.animation.play('slider_down');
             this.animationPlayCount --;
         }
    },

    // 播放上升动画
    animationUpPlay() {
        if (!this.animationPlayCount) {
            this.animation.play('slider_up');
            this.animationPlayCount ++;
        }
    },

    changeToHome() {
        console.log('scene change to game');
        cc.director.loadScene('game');
    },

    update (dt) {
        console.log(this.backToCur.active, window.cfg.gameIsOver);
        if (window.cfg.gameIsOver) {
            this.backToCur.active = false;
        } else {
            this.backToCur.active = true;
        }
    },
});
