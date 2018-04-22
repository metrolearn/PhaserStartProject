class BaseTheme extends Phaser.Group {
    constructor() {
        super(game);
        this.themeName = "default";
    }
    loadMusicButtons() {
        var path = "images/themes/" + this.themeName + "/soundButtons/";
        game.load.image("musicOn", path + "musicOn.png");
        game.load.image("musicOff", path + "musicOff.png");
        game.load.image("soundOff", path + "soundOff.png");
        game.load.image("soundOn", path + "soundOn.png");
    }
}