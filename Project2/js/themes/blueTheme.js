class BlueTheme extends BaseTheme {
    constructor() {
        super(game);
        this.themeName = "blue";
    }
    loadTheme() {
        this.loadMusicButtons();
        game.load.image("defaultButton", "images/themes/blue/buttons/default.png");
        //
        //
        //
        model.defaultButtonTextColor = "#ffffff";
        model.primaryTextColor = "#ffffff";
        model.secondTextColor = "#000000";
        model.timerBarColor = "#ff0000";
        model.pointTextColor = "#ff0000";
        model.clockColor = "#219ADDFF";
        model.scoreColor = "#219ADDFF";
        model.progBarColor = "#1CF707";
        model.timerBarColor = "#ff0000";
        model.levelColor = "#ffffff";
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