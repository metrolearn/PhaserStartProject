class ScoreBox extends Phaser.Group {
    constructor() {
        super(game);
        this.text1 = game.add.text(0, 0, "Score:0");
        this.text1.anchor.set(0.5, 0.5);

        this.text1.fill =model.scoreColor;        
        this.text1.fontSize=model.scoreFontSize;
        if (model.defaultFont!="none")
        {
            this.text1.font=model.defaultFont;
        }
        
        //
        //
        this.add(this.text1);
        eventDispatcher.add(this.gotEvent, this);   
        
    }
    gotEvent(call, params) {
        if (call == G.SCORE_UPDATED) {
            if (model.useScoreLabel==true)
            {
                 this.text1.text = "Score:" + model.score;
            }
           else
           {
                 this.text1.text = model.score;
           }
        }
    }
}