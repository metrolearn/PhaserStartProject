class AlignGrid extends Phaser.Group {
    constructor(cols = 3, rows = 3, par = null) {
        super(game);
        if (par == null) {
            par = game;
        }
        this.cw = par.width / cols;
        this.ch = par.height / rows;
        this.par = par;
        this.rows = rows;
        this.cols = cols;
    }
    placeAt(xx, yy, obj) {
        var x2 = this.cw * xx + this.cw / 2;
        var y2 = this.ch * yy + this.ch / 2;
        obj.x = x2;
        obj.y = y2;
    }
    placeAtIndex(index, obj) {
        var yy = Math.floor(index / this.cols);
        var xx = index - (yy * this.cols);
        this.placeAt(xx, yy, obj);
    }
    show() {
        this.graphics = game.add.graphics();
        this.graphics.lineStyle(4, 0xff0000, 1);
        //
        //
        for (var i = 0; i < this.par.width; i += this.cw) {
            console.log(i);
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.par.height);
        }
        for (var i = 0; i < this.par.height; i += this.ch) {
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.par.width, i);
        }
        this.add(this.graphics);
    }
    showNumbers() {
        this.show();
        var n = 0;
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                var numText = game.add.text(0, 0, n);
                numText.anchor.set(0.5, 0.5);
                numText.fill = "#ff0000";
                this.add(numText);
                this.placeAt(j, i, numText);
                n++;
            }
        }
    }
}