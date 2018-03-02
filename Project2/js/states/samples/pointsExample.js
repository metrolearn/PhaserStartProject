var StateMain = {
    preload: function() {},
    create: function() {
        //keep this line
        //to tell the game what state we are in!
        model.state = "main";
        var infoBar = new InfoBar();
        var soundButtons = new SoundButtons();
        eventDispatcher.add(this.gotEvent, this);
        var btnSound = new TextButton("Points", 1, 1, "scorePoints");
    },
    //listen for events
    gotEvent(call, params) {
        if (call == "scorePoints") {
            eventDispatcher.dispatch(G.UP_SCORE, 1);
        }
    },
    update: function() {}
}