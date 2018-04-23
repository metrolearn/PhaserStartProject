class ItemLine extends Phaser.Group {
    constructor() {
        super(game);
    }
    addItem(item) {
        this.add(item);
    }
    lineUpV() {
        var len = this.children.length;
        var yy = 0;
        for (var i = 0; i < len; i++) {
            var c = this.getChildAt(i);
            c.y = yy;
            yy += c.height;
        }
    }
    lineUpH() {
        var len = this.children.length;
        var xx = 0;
        for (var i = 0; i < len; i++) {
            var c = this.getChildAt(i);
            c.x = xx;
            xx += c.width;
        }
    }
    makeGrid(maxWidth = 200) {
        var len = this.children.length;
        var yy = 0;
        var xx = 0;
        for (var i = 0; i < len; i++) {
            var c = this.getChildAt(i);
            c.x = xx;
            c.y = yy;
            xx += c.width;
            if (xx > maxWidth) {
                xx = 0;
                yy += c.height;
            }
        }
    }
}