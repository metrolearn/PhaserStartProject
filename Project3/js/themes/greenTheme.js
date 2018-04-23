class GreenTheme extends BaseTheme {
    constructor() {
        super(game);
        this.themeName = "green";
    }
    loadTheme() {
        this.loadMusicButtons();
        game.load.image("defaultButton", "images/themes/green/buttons/default.png");
        model.defaultButtonTextColor = "#ffffff";
        model.primaryTextColor = "#00000";
        model.secondTextColor = "#000000";
        model.timerBarColor = "#ff0000";
        model.pointTextColor = "#ff0000";
        model.clockColor = "#1BE618FF";
        model.scoreColor = "#1BE618FF";
        model.levelColor = "#ffffff";
        model.progBarColor = 0x1CF707;
        model.timerBarColor = 0xff0000;
        model.toastTextColor = 0xffffff;
        model.toastBarColor = 0xff0000;
        model.mainFont = "Flamenco";
        //
        //
        //
        model.titleFontSize = game.width / 24;
        model.buttonFontSize = game.width / 32;
        model.defaultFontSize = game.width / 30;
        model.scoreFontSize = game.width / 40;
        model.clockFontSize = game.width / 20;
        model.defaultFont = "Flamenco";
    }
}