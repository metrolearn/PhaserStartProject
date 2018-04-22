class RedTheme extends BaseTheme {
    constructor() {
        super(game);
        this.themeName = "red";
    }
    loadTheme() {
        this.loadMusicButtons();
        game.load.image("defaultButton", "images/themes/red/buttons/default.png");
        //
        //
        //
        model.defaultButtonTextColor = "#000000";
        model.primaryTextColor = "#000000";
        model.secondTextColor = "#000000";
        model.timerBarColor = "#ff0000";
        model.pointTextColor = "#ff0000";
        model.clockColor = "#E91521FF";
        model.scoreColor = "#E91521FF";
        model.progBarColor = 0x1CF707;
        model.timerBarColor = 0xff0000;
        model.toastTextColor = 0xffffff;
        model.toastBarColor = 0xff0000;
        model.mainFont = "Flamenco";
        //
        //
        //
        model.titleFontSize = game.width / 24;
        model.buttonFontSize = game.width / 16;
        model.defaultFontSize = game.width / 30;
        model.scoreFontSize = game.width / 40;
        model.clockFontSize = game.width / 40;
    }
}