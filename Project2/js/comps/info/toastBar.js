class ToastBar extends Phaser.Group {
    constructor() {
        super(game);
        this.graphics = game.add.graphics();
        //	this.drawBar();
        this.alpha = 0;
        this.text1 = game.add.text(0, 0, "Toast");
        this.text1.fill = "#ffffff";
        this.text1.fontSize = "22px";
        this.text1.x = game.width / 2;
        this.text1.anchor.set(0.5, 0);
        this.add(this.graphics);
        this.add(this.text1);
        eventDispatcher.add(this.gotEvent, this);
    }
    drawBar(color) {
        this.graphics.clear();
        this.graphics.beginFill(color, 1);
        this.graphics.drawRect(0, 0, game.width, game.height * .05);
        this.graphics.endFill();
    }
    fadeOut() {
        var tween = game.add.tween(this).to({
            alpha: 0
        }, 500, Phaser.Easing.Linear.None, true);
    }
    fadeInDone() {
        game.time.events.add(Phaser.Timer.SECOND / 2, this.fadeOut, this);
    }
    //listen for events
    gotEvent(call, params) {
        console.log(call);
        if (call == G.SHOW_TOAST) {
            this.text1.text = params.message;
            if (params.color) {
                console.log(params.color);
                this.drawBar(params.color);
            } else {
                this.drawBar(model.toastBarColor);
            }
            //
            //
            //
            if (params.textColor) {
                this.text1.fill = params.textColor;
            } else {
                this.text1.fill = model.toastTextColor;
            }
            //
            //
            //
            this.alpha = 0;
            this.visible = true;
            //tween
            var tween = game.add.tween(this).to({
                alpha: 1
            }, 500, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.fadeInDone, this);
        }
    }
}