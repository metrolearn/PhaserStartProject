class Clock extends Phaser.Group {
    constructor() {
        super(game);
        this.text1 = game.add.text(0, 0, "Time 00:00");
        this.text1.anchor.set(0.5, 0.5);
        //
        //
        //
        this.text1.fill = model.clockColor;
        this.text1.fontSize = model.clockFontSize;
        if (model.defaultFont != "none") {
            this.text1.font = model.defaultFont;
        }
        //
        //
        //
        this.add(this.text1);
        this.secs = 100;
        this.enabled = false;
        eventDispatcher.add(this.gotEvent, this);
        game.time.events.loop(Phaser.Timer.SECOND, this.tick, this);
        
    }
    gotEvent(call, params) {
        switch (call) {
            case G.SET_TIME:
                this.secs = parseInt(params);
                this.setText();
                break;
            case G.STOP_TIME:
                this.enabled = false;
                break;
            case G.START_TIME:
                this.enabled = true;
                break;
            case G.ADD_TIME:
                this.secs += parseInt(params);
                this.setText();
                break;
        }
    }
    tick() {
        if (this.enabled == true) {
            this.secs--;
            if (this.secs == 0) {
                this.enabled = false;
                eventDispatcher.dispatch(G.TIMES_UP);
            }
            this.setText();
        }
    }
    setText() {
        var minutes = Math.floor(this.secs / 60);
        var seconds = this.secs - minutes * 60;
        if (model.useTimeLabel==true)
        {
            this.text1.text = "Time " + this.addLeadingZeros(minutes) + ":" + this.addLeadingZeros(seconds);
        }
        else
        {
            this.time.text=this.addLeadingZeros(minutes) + ":" + this.addLeadingZeros(seconds);
        }
    }
    addLeadingZeros(val) {
        if (parseInt(val) < 10) {
            return "0" + val;
        }
        return val;
    }
    static getTimer() {
        var d = new Date();
        var n = d.getTime();
        return n;
    }
}