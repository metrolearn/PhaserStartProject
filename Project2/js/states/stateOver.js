var StateOver = {
    create: function() {
    	model.state="over";
    	var buttonStart=new TextButton("Play Again",1,1,G.START_GAME);
    	Align.center(buttonStart);

    }
}