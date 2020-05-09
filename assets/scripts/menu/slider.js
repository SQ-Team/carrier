const Time = require('./time.js');

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
        },
        canvasNode: {
            type: cc.Node,
            default: null
        },
        successAudio: {
            type: cc.AudioClip,
            default: null
        },
        failedAudio: {
            type: cc.AudioClip,
            default: null
        },
        gradeLabel: {
            type: cc.Label,
            default: null
        },
        time: {
            type: cc.Node,
            default: null
        }
    },


    onLoad () {
        this.sumCount = 1;
        // 渐显(和下一个场景的 渐隐 组合成过渡效果)
        this.canvasNode.getComponent("fade").fadeFromWhite(.5);
    },

    start () {
        this.interval = null;
        cc.director.preloadScene('game');
        cc.director.preloadScene(window.cfg.currentLevel);
        this.animationPlayCount = 1;
        this.resultMap = {
            success: {
                string: '外卖配送成功',
                audio: this.successAudio
            },
            failed: {
                string: '外卖配送失败',
                audio: this.failedAudio
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
             if (!window.cfg.isMute) {
                 cc.audioEngine.play(this.resultMap[type].audio, false, 1);
             }
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
        this.canvasNode.getComponent("fade").fadeIntoWhite('game', .5);
    },

    restartGame() {
        console.log('restart');
        window.cfg.gameIsOver = false;
        clearInterval(this.interval);
        this.interval = null;
        cc.director.loadScene(window.cfg.currentLevel);
        // this.canvasNode.getComponent("fade").fadeIntoWhite(window.cfg.curentLevel, .5);
    },

    gradeSum() {
        let sum = Number(this.time.getChildByName('time').getComponent('time').getGradeTime() / 10);
        sum = Math.floor(sum);
        let num = 0;
        this.interval= setInterval(() => {
            num += 5;
            this.gradeLabel.string = `总评分：${num}`;
            if (num + 5 > sum) {
                this.gradeLabel.string = `总评分：${sum}`;
                clearInterval(this.interval);
            }
        }, 1);
    },

    update (dt) {
        // console.log(this.backToCur.active, window.cfg.gameIsOver);
        if (window.cfg.gameIsOver) {
            this.gradeLabel.active = true;
            this.backToCur.active = false;
            if (this.sumCount) {
                console.log(this.gradeLabel.active)
                this.gradeSum();
                this.sumCount--;
            }
        } else {
            this.gradeLabel.active = false;
            this.backToCur.active = true;
        }
    },
});
