var StateMain = {
    preload: function() {},
    create: function() {
        //keep this line
        //to tell the game what state we are in!
        model.state = "main";
        
        
        var grid=new Grid();

        for (var i = 0; i < 25; i++) {
            var heart=game.add.sprite(0,0,"heart");
            Align.scaleToGameW(heart,.1);
            grid.add(heart);            
        }
        grid.makeGrid(5);

        Align.centerGroup(grid);
    },    
    
    update: function() {}
}