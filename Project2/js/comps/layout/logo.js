class Logo extends Phaser.Group {
    constructor(key, w = -1) {
        super(game);
        var image = game.add.image(0, 0, key);
        image.anchor.set(0.5, 0.5);
        if (w != -1) {
            image.width = game.width * w;
            image.scale.y = image.scale.x;
        }
        this.add(image);
        this.x = game.width / 2;
        this.y = game.height / 2;
    }
}