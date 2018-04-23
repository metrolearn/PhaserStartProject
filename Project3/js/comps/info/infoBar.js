class InfoBar extends Phaser.Group {
    constructor() {
        super(game);
        this.scoreBox = new ScoreBox();
        this.scoreBox.x = game.width / 2;
        this.scoreBox.y = this.scoreBox.height;
        //
        //
        //
        this.clock = new Clock();
        this.clock.x = game.width / 2;
        this.clock.y = this.scoreBox.y + this.clock.height;
    }
}