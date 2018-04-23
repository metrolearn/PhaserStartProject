class Background extends Phaser.Group {
    constructor(key) {
        super(game);
        this.image = game.add.image(0, 0, key);
        this.image.width = game.width;
        this.image.height = game.height;
        this.add(this.image);
    }
}