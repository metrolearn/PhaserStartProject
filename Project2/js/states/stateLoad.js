var StateLoad = {
    preload: function() {
        model.state = "load";
        var empty = game.add.image(0, 0, "loadingEmpty");
        var full = game.add.image(0, 0, "loadingFull");
        empty.anchor.set(0.5, 0.5);
        empty.x = game.width / 2;
        empty.y = game.height / 2;
        //
        //
        full.anchor.set(0, 0.5);
        full.x = game.world.centerX - empty.width / 2;
        full.y = empty.y;
        game.load.setPreloadSprite(full);
        //PRELOAD EVERYTHING HERE
        //
        //
        //
        //
        var theme = new BlueTheme();
        theme.loadTheme();
        //Preload all text buttons
        TextButton.preloadAll();
        //Preload all icons
        //preload images
        // game.load.image("heart", "images/main/heart.png");
        this.loadMain("heart");
        game.load.audio("backgroundMusic", "audio/background/piano.mp3");
        //game.load.audio("elephant","audio/sfx/elephant.mp3");
        this.loadSFX("elephant");
    },
    loadMain(name) {
        game.load.image(name, "images/main/" + name + ".png");
    },
    loadSFX(name) {
        game.load.audio(name, "audio/sfx/" + name + ".mp3");
        model.regSound(name);
    },
    loadSFX2(name) {
        game.load.audio(name, "audio/sfx/" + name + ".wav");
        model.regSound(name);
    },
    create: function() {
        //pass the key for background music to the media manager
        mediaManager.setBackgroundMusic("backgroundMusic");
        //pass sound keys to the media manager
        //a sound object will be created
        model.sfx.forEach(function(sound) {
            mediaManager.addSound(sound);
        }.bind(this));
        if (model.devMode == true) {
            model.musicOn = false;
            game.state.start("StateMain");
        } else {
            game.state.start("StateTitle");
        }
    },
    update: function() {}
}