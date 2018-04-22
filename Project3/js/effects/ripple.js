class Ripple extends Phaser.Group {
    constructor(x, y, n = 50, dist = 150, color = 0xffffff) {
        super(game);
        this.x = x;
        this.y = y;
        //
        //
        //
        this.color = color;
        for (var i = 0; i < n; i++) {
            var s = this.getSpark();
            var angle = i * (360 / n);
            //  var r = game.rnd.integerInRange(50, 100);
            var tx = dist * Math.cos(angle);
            var ty = dist * Math.sin(angle);
            var t = game.add.tween(s).to({
                y: ty,
                x: tx,
                alpha: 0
            }, 1000, Phaser.Easing.Linear.None, true);
            t.onComplete.add(this.tweenDone, this);
        }
    }
    tweenDone(target) {
        target.destroy();
        if (this.children.length == 0) {
            this.destroy();
        }
    }
    getSpark() {
        var s = game.add.graphics();
        s.beginFill(this.color, 1);
        s.drawCircle(0, 0, 5);
        s.endFill();
        this.add(s);
        return s;
    }
}