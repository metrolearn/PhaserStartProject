var StateMain = {
    preload: function() {},
    create: function() {
        //keep this line
        //to tell the game what state we are in!
        model.state = "main";
        var infoBar = new InfoBar();
        var soundButtons = new SoundButtons();
        eventDispatcher.add(this.gotEvent, this);
        var btnSound = new TextButton("Sound", 1, 1, "playElephant");
    },
    //listen for events
    gotEvent(call, params) {
        if (call == "playElephant") {
            eventDispatcher.dispatch(G.PLAY_SOUND, "elephant");
        }
    },
    update: function() {}
}