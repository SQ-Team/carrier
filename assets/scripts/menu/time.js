// 先onload后start
cc.Class({
    extends: cc.Component,

    properties: {
        timeLabel: {
            type: cc.Label,
            default: null
        },
        briefLabel: {
            type: cc.Label,
            default: null
        },
        slider: {
            type: cc.Node,
            default: null
        },

        passingVelocity: 2, // 刷新时间

        deadline: 5 // 关卡时间
    },

    start () {},

    onLoad() {
        this.updateSecond = 0;
        this.time = this.getCurrentTime();
        this.initTime = this.time;
        this.setTime();
        this.setBrief(this.time, this.deadline);
    },
    // 设置任务简介
    setBrief(time, deadline) {
        this.endTime = time + deadline * 60 * 1000;
        this.briefLabel.string = `请在${this.timeFormat(this.endTime)}之前\n将外卖送至指定地点`;
    },
    // 时间格式化
    timeFormat(time) {
        const date = new Date(time);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    },
    // 获取当前时间
    getCurrentTime() {
        const time = new Date();
        return time.getTime();
    },
    // 设置时间
    setTime() {
        const time = new Date(this.time);
        this.timeLabel.string = this.timeFormat(time);
    },

    getCostTime() {
        console.log(this.time, this.initTime, this.endTime);
        if (this.time > this.endTime) {
            return 0;
        } else {
            return this.time - this.initTime;
        }
    },

    getGradeTime() {
        if (this.time > this.endTime) {
            return 0;
        } else {
            return this.endTime - this.time;
        }
    },


    update (dt) {
        // 每 passingVelocity 秒更新一次时间
        if (this.updateSecond > this.passingVelocity) {
            this.updateSecond = 0;
            this.time += 60 * 1000;
            this.setTime();
            if (this.time && this.time > this.endTime) {
                console.log('time out');
                window.funcs.missionFailed();
                this.slider.getComponent('slider').animationPlay('failed');
            }
        }
        this.updateSecond += dt;
    },
});
