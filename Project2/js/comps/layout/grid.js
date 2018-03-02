class Grid extends Phaser.Group {
    constructor(xspace=1,yspace=1) {
        super(game);
        this.xspace=xspace;
        this.yspace=yspace;
    }
    addItem(item) {
        this.add(item);
    }
    makeGrid(cols) {
        var len = this.children.length;
        var yy = 0;
        var xx = 0;
        for (var i = 0; i < len; i++) {
            var c = this.getChildAt(i);
            c.x = xx * c.width*this.xspace;
            c.y = yy * c.height*this.yspace;
            xx++;
            if (xx == cols) {
                xx = 0;
                yy++;
            }
        }
    }
}