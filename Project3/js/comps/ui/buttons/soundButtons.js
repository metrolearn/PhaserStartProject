class SoundButtons extends Phaser.Group {
    constructor() {
        super(game);
        //
        //
        this.soundIcon = new ImageToggle("soundOn", "soundOff",G.TOGGLE_SOUND);
        // this.soundIcon.scale.set(0.5, 0.5);
        Align.scaleToGameW(this.soundIcon, 0.109375);
        this.soundIcon.x = this.soundIcon.width / 2;
        this.soundIcon.y = this.soundIcon.height / 2;
        //
        //
        //
        this.musicIcon = new ImageToggle("musicOn", "musicOff", G.TOGGLE_MUSIC);
        Align.scaleToGameW(this.musicIcon, 0.109375);
        //this.musicIcon.scale.set(0.5, 0.5);
        this.musicIcon.x = game.width - this.musicIcon.width / 2;
        this.musicIcon.y = this.musicIcon.height / 2;
        this.add(this.musicIcon);
        this.add(this.soundIcon);
        this.soundIcon.setTo(model.soundOn);
        this.musicIcon.setTo(model.musicOn);
        //Align.getScaleToGameW(this.musicIcon);
        //Align.scaleToGameW(this.soundIcon, 0.109375);
    }
}