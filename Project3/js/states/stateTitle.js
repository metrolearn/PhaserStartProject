var StateTitle = {
    create: function() {
    	model.state="title";
        var soundButtons = new SoundButtons();
        var buttonStart = new TextButton("Start", -1, -1, G.START_GAME);
        Align.center(buttonStart);
    }
}