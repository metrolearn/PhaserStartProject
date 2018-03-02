class Model {
    constructor() {
        this.score = 0;
        this.mainFont = "Flamenco";
        this.buttonFont="Flamenco";
        
        this._musicOn = true;
        this.soundOn = true;
        this.lastUnlocked = 1;
        this.defButtonSet = 4;
        this.defButtonStyle = 3;
        //
        //
        this.defaultFont = "none";
        //
        //
        this.mainTextColor = "#ffffff";
        this.mainColor = "#ffffff";
        this.secondaryColor = "#ffff00";
        this.windowColor = "#ffffff";
        this.headerColor = "#E9B515";
        this.pointTextColor = "#ffffff";
        this.soundButtonIndex = 2;
        this.secondaryTextColor = "#ffff00";
        this.clockColor = "#ffffff";
        this.scoreColor = "#ff0000";
        this.toastTextColor=0xffffff;
        this.toastBarColor=0xff0000;
        
        //
        //
        //
        //
        this.titleFontSize = 20;
        this.buttonFontSize = 16;
        this.defaultFontSize = 12;
        this.scoreFontSize = 12;
        this.clockFontSize = 12;
        this.pointFontSize = 16;
        //
        //
        this.levelColor="#ffffff";
        this.lockFontSize=12;
        this.showUnlocked=false;
        //
        //
        //
        this.useScoreLabel = true;
        this.useTimeLabel = true;
        //
        this.sfx = [];
        //
        //levels
         this.levels = 100;
         this.pageSize=25;
         this.levelPage=0;
         this.pageTweenSpeed=250;
         this.level=0;
         
         this.levelPagesCount=Math.floor(this.levels/this.pageSize);


         if (this.levelPagesCount==this.levels/this.pageSize)
         {
            this.levelPagesCount--;
         }
    }
    upScore(points) {
        this.score += parseInt(points);
        console.log("score=" + this.score);
        eventDispatcher.dispatch(G.SCORE_UPDATED);
    }
    regSound(name) {
        this.sfx.push(name);
    }
    set musicOn(val) {
        this._musicOn = val;
        eventDispatcher.dispatch(G.MUSIC_STAT_CHANGED);
    }
    get musicOn() {
        return this._musicOn;
    }
}