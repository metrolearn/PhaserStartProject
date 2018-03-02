class PointBox extends Phaser.Group {
    constructor(xx, yy, text) {
        super(game);
        this.text1 = game.add.text(0, 0, text);
        this.text1.fill = model.pointTextColor;
        this.text1.fontSize=model.pointFontSize;
        
        if (model.defaultFont!="none")
        {
            this.text1.font=model.defaultFont;
        }
        this.text1.anchor.set(0.5, 0.5);
        this.add(this.text1);
        //
        //
        //
        this.x = xx;
        this.y = yy;
        var tx = game.add.tween(this).to({
            y: 0,
            alpha: 0
        }, 500, Phaser.Easing.Linear.None, true);
        tx.onComplete.add(this.tweenDone, this);
    }
    tweenDone() {
        this.destroy();
    }
}