var StateMain = {
    preload: function() {},
    create: function() {
        //keep this line
        //to tell the game what state we are in!
        model.state = "main";

        model.musicOn=false;

        var line=new ItemLine();

        for (var i = 0; i < 10; i++) {
            var heart=game.add.sprite(0,0,"heart");
            Align.scaleToGameW(heart,.05);
            line.add(heart);            
        }
        //
        //
        //
        line.lineUpH();

        //you can also line up veritcally
        //line.lineUpV();

        Align.centerGroup(line);
    },    
    
    update: function() {}
}