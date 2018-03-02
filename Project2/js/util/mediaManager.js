class MediaManager {
    constructor() {
        this.soundArray=[];
        eventDispatcher.add(this.gotEvent, this);
    }
    gotEvent(call, params) {
        switch (call) {
            case G.PLAY_SOUND:
                this.playSound(params);
                break;
            case G.MUSIC_STAT_CHANGED:
                this.updateMusic();
                break;
        }
    }
    addSound(key) {
        this.soundArray[key] = game.add.audio(key);
    }
    playSound(key) {
        if (model.soundOn == true) {
            this.soundArray[key].play();
        }
    }
    setBackgroundMusic(key) {
       
        this.musicPlaying = false;
        if (this.backgroundMusic) {
            this.backgroundMusic.stop();
        }
        this.backgroundMusic = game.add.audio(key);
        this.backgroundMusic.volume = .5;
        this.backgroundMusic.loop = true;
        this.updateMusic();
    }
    updateMusic() {
        if (model.musicOn == true) {
            if (this.musicPlaying == false) {
                this.musicPlaying = true;
                if (this.backgroundMusic) {
                    this.backgroundMusic.play();
                }
            }
        } else {
            this.musicPlaying = false;
            if (this.backgroundMusic) {
                this.backgroundMusic.stop();
            }
        }
    }
}